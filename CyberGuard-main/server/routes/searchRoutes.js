const express = require('express');
const router = express.Router();
const BreachData = require('../models/breachDataModel');

router.get('/', async (req, res) => {
  try {
    const { email, phone, q } = req.query;

    let searchTerm = (q || email || phone || '').toString().trim();
    const originalSearchTerm = searchTerm;
    console.log('Search term:', searchTerm);
    console.log('Type of search term:', searchType);
    
    if (!searchTerm) {
      return res.status(400).json({
        success: false,
        message: 'Email, phone, or search term is required',
      });
    }

    const isEmailSearch = /\S+@\S+\.\S+/.test(searchTerm);
    const isPhoneSearch = /^\d{7,15}$/.test(searchTerm);
    const isCreditCardSearch = /^\d{12,19}$/.test(searchTerm);

    let searchQuery = {};
    let searchType = '';

    if (isEmailSearch) {
      searchTerm = searchTerm.toLowerCase(); // force lowercase for case-insensitive match
      searchQuery = { emails: { $regex: new RegExp(`${searchTerm}$`, 'i') } }; // case-insensitive exact match
      searchType = 'email';
    } else if (isPhoneSearch) {
      searchQuery = { phone_numbers: searchTerm };
      searchType = 'phone';
    } else if (isCreditCardSearch) {
      searchQuery = { credit_cards: searchTerm };
      searchType = 'creditCard';
    } else {
      return res.status(400).json({
        success: false,
        message: 'Invalid search term format. Use a valid email, phone number, or credit card.',
      });
    }

    const results = await BreachData.find(searchQuery).lean();

    const formattedResults = results.map(record => {
      const foundInEmail = record.emails.some(e => e.toLowerCase() === searchTerm);
      const foundInPhone = record.phone_numbers.includes(searchTerm);
      const foundInCard = record.credit_cards.includes(searchTerm);

      return {
        _id: record._id,
        name: `Breach #${record._id.toString().slice(-6)}`,
        date: record.createdAt.toISOString().split('T')[0],
        affectedAccounts: record.emails.length + record.phone_numbers.length + record.credit_cards.length,
        dataTypes: [
          ...(record.emails.length ? ['Emails'] : []),
          ...(record.phone_numbers.length ? ['Phone Numbers'] : []),
          ...(record.credit_cards.length ? ['Credit Cards'] : [])
        ],
        isBreached: foundInEmail || foundInPhone || foundInCard,
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
      };
    });

    const breached = formattedResults.some(result => result.isBreached);

    res.json({
      success: true,
      count: formattedResults.length,
      breached,
      searchTerm: originalSearchTerm,
      searchType,
      data: formattedResults.length ? formattedResults : null,
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