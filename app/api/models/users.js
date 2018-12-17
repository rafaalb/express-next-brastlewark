const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
 name: {
  type: String,
  trim: true,
  required: true,
 },
 email: {
  type: String,
  trim: true,
  required: true,
  unique: true,
 },
 role: {
   type: String,
   required: true,
 },
 clientId: {
   type: String,
   required: true,
 },
});

module.exports = mongoose.model('User', UserSchema);
