const mongoose = require('mongoose');

//enter game schema here
const GameSchema = new mongoose.Schema({

});

//check if the entry is a duplicate or not
GameSchema.pre('save', function(next) {
  // Check if document is new or a new password has been set
  if (this.isNew) {
    // Saving reference to this because of changing scopes
    const document = this;
  } else {
    next();
  }
});

module.exports = mongoose.model('Game', GameSchema);