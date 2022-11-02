"use strict";
exports.__esModule = true;
exports.BooksCategory = void 0;
var mongoose_1 = require("mongoose");
var booksSchema = new mongoose_1["default"].Schema({
    title: {
        type: String
    },
    cover: {
        type: String
    },
    author: [{
            type: String
        }],
    category: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: Number
    },
    ratingcount: {
        type: Number
    },
    rating: {
        type: Number
    },
    reviews: [
        {
            type: mongoose_1["default"].Schema.Types.ObjectId,
            ref: "Reviews"
        }
    ]
});
// const booksSchema=new mongoose.Schema({
//     title:{
//         type:String,
//     },
//     cover:{
//         type:String,
//     },
//     category:[
//         {type:String}
//     ],
//     description:{
//         type:String,
//     }
// })
var categorySchema = new mongoose_1["default"].Schema({
    title: {
        type: String
    },
    books: [
        {
            id: {
                type: mongoose_1["default"].Schema.Types.ObjectId,
                ref: "Books"
            },
            price: {
                type: Number
            },
            ratingcount: {
                type: Number
            },
            rating: {
                type: Number
            }
        }
    ]
});
mongoose_1["default"].models = {};
var Books = mongoose_1["default"].model('booksdata', booksSchema);
exports.BooksCategory = mongoose_1["default"].model('booksCategory', categorySchema);
exports["default"] = Books;
