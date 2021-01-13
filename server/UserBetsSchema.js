const mongoose = require('mongoose');

const UserBetsSchema = new mongoose.Schema(
    {
        user_id: {type: mongoose.ObjectId, required: true},
        bets: [{
            date: Date, 
            kind: {
                type: String,
                enum: ['ML', 'SPREAD', 'TOTAL']
            },
            line: Number,
            overunder: {
                type: String,
                enum: ['OVER', 'UNDER']
            },
            game_id: mongoose.ObjectId,
            odds: Number,
            units: Number,
            status: {
                type: String,
                enum: ['WIN', 'LOSE', 'PUSH', 'PENDING']}
        }]
    }
)

module.exports = mongoose.model('UserBets', UserBetsSchema);