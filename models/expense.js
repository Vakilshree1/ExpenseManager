const mongoose = require('mongoose')

const expenseSchema = mongoose.Schema({
    amount:{
        type:Number,
        required:true
    },
    category:{
        type: String,
        enum: ['Food','Fees', 'Transport', 'Entertainment', 'Utilities', 'Others'],
        required: true
    },
    comments:{
        type:String,
        required:false
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
},{
    timestamps: true
})

module.exports = mongoose.model('Expense',expenseSchema)