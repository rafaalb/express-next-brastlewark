const mongoose = require('mongoose');

const { Schema } = mongoose;

const PolicySchema = new Schema({
 amountInsured: {
  type: Number,
  trim: true,
 },
 email: {
  type: String,
  trim: true,
 },
 inceptionDate: {
  type: Date,
  trim: true,
 },
 installmentPayment: {
   type: Boolean,
   required: true,
 },
 clientId: {
   type: String,
 },
});

module.exports = mongoose.model('Policy', PolicySchema);
