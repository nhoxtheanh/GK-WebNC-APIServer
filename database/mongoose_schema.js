const mongoose = require("mongoose");
require("mongoose-long")(mongoose);
const SchemaTypes = mongoose.Schema.Types;
const AutoIncrement = require("mongoose-sequence")(mongoose);

// User
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    fullName: String,
    gender: String,
    birthDate: Date,
    address: String,
    createdDate: Date,
}, { collection: "Users" }, { toJSON: { virtuals: true }, toObject: { virtuals: true } });

userSchema.index({ coords: "2dsphere" });
userSchema.plugin(AutoIncrement, { inc_field: "userID" });
mongoose.model("User", userSchema);

// Board
const boardSchema = new mongoose.Schema({
    ownerID:  { type: SchemaTypes.Long, min: 0, default: 0 },  ////////////////////////////////////////////////////////////////////////////// String or Int???
    name: { type: String, required: true, maxlength: 128 },
    createdAt: { type: Number, default: Date.now },
    isActive: { type: Boolean, default: true },
}, { collection: "Boards" }, { toJSON: { virtuals: true }, toObject: { virtuals: true } });

boardSchema.index({ coords: "2dsphere" });
boardSchema.plugin(AutoIncrement, { inc_field: "boardID" });
mongoose.model("Board", boardSchema);

// Card
const cardSchema = new mongoose.Schema({
    boardID:  { type: SchemaTypes.Long, min: 0, default: 0 },  ////////////////////////////////////////////////////////////////////////////// String or Int???
    columnIndex: Number,
    content: String,
    isActive: { type: Boolean, default: true },
}, { collection: "Cards" }, { toJSON: { virtuals: true }, toObject: { virtuals: true } });

cardSchema.index({ coords: "2dsphere" });
cardSchema.plugin(AutoIncrement, { inc_field: "cardID" });
mongoose.model("Card", cardSchema);


// Insert data
// var User = mongoose.model("User", userSchema);
// var today = new Date();
// var UserData = {
//     username: 'nhoxtheanh',
//     email: 'nhoxtheanh@facebook.com',
//     password: '12345',
//     fullName: 'Đỗ Thế Anh',
//     gender: 'Nam',
//     birthDate: today,
//     address: 'Thành phố Hồ Chí Minh',
//     createdDate: today,
// }
// var userCollections = new User(UserData);
// userCollections.save(function (err, data) {
//     if (err) return console.error(err);
// });

// var Board = mongoose.model("Board", boardSchema);
// var BoardData = {
//     ownerID:  1, 
//     name: 'Board 2',
//     //createdAt:   '',
// }
// var boardCollections = new Board(BoardData);
// boardCollections.save(function (err, data) {
//     if (err) return console.error(err);
// });

// var Card = mongoose.model("Card", cardSchema);
// var CardData = {
//     boardID:  1,
//     columnIndex: 1,
//     content: 'This is the first content.',
// }
// var cardCollections = new Card(CardData);
// cardCollections.save(function (err, data) {
//     if (err) return console.error(err);
// });