const mongoose = require('mongoose');
const { Schema } = mongoose;

const breachDataSchema = new Schema({
  emails: {
    type: [String],
    required: true,
    index: true,
    validate: {
      validator: function(emails) {
        return emails.every(email => 
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        );
      },
      message: props => `${props.value} contains invalid email addresses`
    }
  },
  phone_numbers: {
    type: [String],
    required: true,
    index: true,
    validate: {
      validator: function(phones) {
        return phones.every(phone => 
          /^[\d+]{7,15}$/.test(phone.replace(/[^\d+]/g, ''))
        );
      },
      message: props => `${props.value} contains invalid phone numbers`
    }
  },
  credit_cards: {
    type: [String],
    required: true,
    validate: {
      validator: function(cards) {
        return cards.every(card => 
          /^\d{12,19}$/.test(card.replace(/\s+/g, ''))
        );
      },
      message: props => `${props.value} contains invalid credit card numbers`
    }
  },
  source: {
    type: String,
    enum: ['dark_web', 'leaked_database', 'third_party', 'unknown'],
    default: 'unknown'
  },
  severity: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium',
    index: true
  },
  description: String
}, {
  timestamps: true,
  autoIndex: true
});

// Pre-save hook for data normalization
breachDataSchema.pre('save', function(next) {
  // Normalize emails
  this.emails = [...new Set(this.emails.map(e => e.toLowerCase().trim()))];
  
  // Normalize phone numbers (remove all non-digit/non-plus characters)
  this.phone_numbers = [...new Set(this.phone_numbers.map(p => 
    p.replace(/[^\d+]/g, '')
  ))];
  
  // Normalize credit cards (remove all whitespace)
  this.credit_cards = [...new Set(this.credit_cards.map(c => 
    c.replace(/\s+/g, '')
  ))];
  
  // Auto-set severity based on data volume
  const totalRecords = this.emails.length + this.phone_numbers.length;
  if (totalRecords > 10000) this.severity = 'critical';
  else if (totalRecords > 5000) this.severity = 'high';
  
  next();
});

// Indexes
breachDataSchema.index({ emails: 1 });
breachDataSchema.index({ phone_numbers: 1 });
breachDataSchema.index({ credit_cards: 1 });

// Static methods for direct querying
breachDataSchema.statics = {
  findByEmail: function(email) {
    return this.find({ emails: email.toLowerCase().trim() });
  },
  findByPhone: function(phone) {
    const cleanPhone = phone.replace(/[^\d+]/g, '');
    return this.find({ phone_numbers: cleanPhone });
  },
  findByCreditCard: function(card) {
    const cleanCard = card.replace(/\s+/g, '');
    return this.find({ credit_cards: cleanCard });
  }
};

module.exports = mongoose.model('BreachData', breachDataSchema);