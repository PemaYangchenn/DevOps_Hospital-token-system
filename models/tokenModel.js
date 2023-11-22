const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    // token_id: {
    //     type: Number,
    //     unique: true,
    //     index: true,
    // },
    date: {
        type: String,
        required: [true, 'the date is required'],
    },
    departmentR: {
        type: String,
        required: [true, 'the department is required'],
    },
    username: {
        type: String,
    },
    cid: {
        type: String,
    },
    phoneno: {
        type: Number,
    },
});

// Define a pre-save hook to generate and increment the 'token_id' field
// tokenSchema.pre('save', async function (next) {
//     try {
//         if (!this.token_id && this.token_id !== 0) {
//             // Find the highest 'token_id' for the given department and date
//             const highestTokenId = await this.constructor
//                 .findOne(
//                     { departmentR: this.departmentR, date: this.date },
//                     'token_id -_id'
//                 )
//                 .sort({ token_id: -1 });

//             // Set the 'token_id' field to the highest 'token_id' + 1 or 1 if there is no previous record
//             this.token_id = highestTokenId ? highestTokenId.token_id + 1 : 1;
//         }

//         next();
//     } catch (error) {
//         next(error); // Pass the error to the next middleware or handler
//     }
// });


const Token = mongoose.model('Token', tokenSchema);
module.exports = Token;
