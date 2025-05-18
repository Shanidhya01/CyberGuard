const express = require('express');
const router = express.Router();
const BreachData = require('../models/breachDataModel');

/**
 * @route GET /api/search
 * @description Check for breached data
 * @param {string} email - Email to search
 * @param {string} phone - Phone number to search
 * @param {string} creditCard - Credit card to search
 * @returns {Object} Returns breach status and details
 */
router.get('/', async (req, res) => {
  try {
    const { email, phone, creditCard } = req.query;
    
    // Validate at least one search parameter exists
    if (!email && !phone && !creditCard) {
      return res.status(400).json({ 
        success: false,
        message: 'At least one search parameter (email, phone, or credit card) is required'
      });
    }

    // Build query with exact matching
    const query = {
      $or: []
    };

    if (email) {
      query.$or.push({ emails: email.toLowerCase().trim() });
    }
    if (phone) {
      const cleanPhone = phone.replace(/[^\d+]/g, '');
      query.$or.push({ phone_numbers: cleanPhone });
    }
    if (creditCard) {
      const cleanCard = creditCard.replace(/\s+/g, '');
      query.$or.push({ credit_cards: cleanCard });
    }

    // Execute search with optimized projection
    const results = await BreachData.find(query)
      .select('emails phone_numbers credit_cards source severity createdAt')
      .lean();

    // Check which parameters actually matched
    const matchedEmail = email ? results.some(r => 
      r.emails.includes(email.toLowerCase().trim())
    ) : false;

    const matchedPhone = phone ? results.some(r => 
      r.phone_numbers.some(p => p === phone.replace(/[^\d+]/g, ''))
    ) : false;

    const matchedCard = creditCard ? results.some(r => 
      r.credit_cards.includes(creditCard.replace(/\s+/g, ''))
    ) : false;

    const isBreached = matchedEmail || matchedPhone || matchedCard;

    // Format response
    const response = {
      success: true,
      breached: isBreached,
      matches: {
        email: matchedEmail,
        phone: matchedPhone,
        creditCard: matchedCard
      },
      results: isBreached ? results.map(r => ({
        _id: r._id,
        source: r.source,
        severity: r.severity,
        date: r.createdAt.toISOString().split('T')[0],
        counts: {
          emails: r.emails.length,
          phones: r.phone_numbers.length,
          cards: r.credit_cards.length
        }
      })) : null,
      searchedFor: {
        ...(email && { email }),
        ...(phone && { phone }),
        ...(creditCard && { creditCard })
      }
    };

    res.json(response);

  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      ...(process.env.NODE_ENV === 'development' && { error: error.message })
    });
  }
});

module.exports = router;