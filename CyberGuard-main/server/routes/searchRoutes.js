const express = require('express');
const router = express.Router();
const BreachData = require('../models/breachDataModel');

router.get('/', async (req, res) => {
  try {
    const { email, phone, q, keyword } = req.query;

    // Support both 'q' and 'keyword' as generic search
    let searchTerm = (q || keyword || email || phone || '').toString().trim();
    const originalSearchTerm = searchTerm;
    let searchType = '';
    console.log('--- SEARCH DEBUG ---');
    console.log('Search term:', searchTerm);

    if (!searchTerm) {
      return res.status(400).json({
        success: false,
        message: 'Email, phone, or search term is required',
      });
    }

    const isEmailSearch = /\S+@\S+\.\S+/.test(searchTerm);
    const isPhoneSearch = /^\d{7,15}$/.test(searchTerm);
    const isCreditCardSearch = /^\d{12,19}$/.test(searchTerm);

    // If searching by q or keyword, treat as generic: check all fields
    const isGenericSearch = !!(q || keyword);
    const allResults = await BreachData.find({}).lean();
    console.log('All DB records count:', allResults.length);
    let matchedRecords = [];
    let breached = false;

    allResults.forEach(record => {
      let foundInEmail = false, foundInPhone = false, foundInCard = false;
      if (isGenericSearch || isEmailSearch) {
        foundInEmail = record.emails.some(e => e.toLowerCase() === searchTerm.toLowerCase());
      }
      if (isGenericSearch || isPhoneSearch) {
        foundInPhone = record.phone_numbers.some(p => p === searchTerm);
      }
      if (isGenericSearch || isCreditCardSearch) {
        foundInCard = record.credit_cards.some(c => c === searchTerm);
      }
      if (foundInEmail || foundInPhone || foundInCard) {
        breached = true;
        matchedRecords.push({
          _id: record._id,
          name: `Breach #${record._id.toString().slice(-6)}`,
          date: record.createdAt ? record.createdAt.toISOString().split('T')[0] : '',
          affectedAccounts: record.emails.length + record.phone_numbers.length + record.credit_cards.length,
          dataTypes: [
            ...(record.emails.length ? ['Emails'] : []),
            ...(record.phone_numbers.length ? ['Phone Numbers'] : []),
            ...(record.credit_cards.length ? ['Credit Cards'] : [])
          ],
          isBreached: true,
          foundIn: {
            email: foundInEmail,
            phone: foundInPhone,
            creditCard: foundInCard
          },
          stats: {
            totalEmails: record.emails.length,
            totalPhones: record.phone_numbers.length,
            totalCreditCards: record.credit_cards.length
          }
        });
        console.log('Matched record:', record._id, { foundInEmail, foundInPhone, foundInCard });
      }
    });
    console.log('Final breached:', breached);

    res.json({
      success: true,
      count: matchedRecords.length,
      breached,
      searchTerm: originalSearchTerm,
      searchType,
      data: matchedRecords.length ? matchedRecords : null,
      message: breached ? 'Data breach detected' : 'No breaches found'
    });

  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;