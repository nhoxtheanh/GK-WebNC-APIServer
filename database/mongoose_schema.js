const mongoose = require("mongoose");
require("mongoose-long")(mongoose);
const SchemaTypes = mongoose.Schema.Types;
const AutoIncrement = require("mongoose-sequence")(mongoose);

// User
const userSchema = new mongoose.Schema({
    username: String,
    email: { type: String, default: "" },
    password: String,
    fullname: String,
    gender: { type: String, default: "" },
    birthDate: Date,
    address: { type: String, default: "" },
    createdDate: Date,
}, { collection: "Users" }, { toJSON: { virtuals: true }, toObject: { virtuals: true } });

userSchema.index({ coords: "2dsphere" });
userSchema.plugin(AutoIncrement, { inc_field: "userID" });
mongoose.model("User", userSchema);

// Board
const boardSchema = new mongoose.Schema({
    ownerID:  { type: SchemaTypes.Long, min: 0, default: 0 },
    name: { type: String, required: true, maxlength: 128 },
    createdAt: { type: Number, default: Date.now },
    isActive: { type: Boolean, default: true },
}, { collection: "Boards" }, { toJSON: { virtuals: true }, toObject: { virtuals: true } });

boardSchema.index({ coords: "2dsphere" });
boardSchema.plugin(AutoIncrement, { inc_field: "boardID" });
mongoose.model("Board", boardSchema);

// Column
const columnSchema = new mongoose.Schema({
    boardID:  { type: SchemaTypes.Long, min: 0, default: 0 },
    name: { type: String, required: true, maxlength: 128 },
    color: { type: String, default: 'white' },
    isActive: { type: Boolean, default: true },
}, { collection: "Columns" }, { toJSON: { virtuals: true }, toObject: { virtuals: true } });

columnSchema.index({ coords: "2dsphere" });
columnSchema.plugin(AutoIncrement, { inc_field: "columnID" });
mongoose.model("Column", columnSchema);

// Card
const cardSchema = new mongoose.Schema({
    columnID:  { type: SchemaTypes.Long, min: 0, default: 0 },
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
//     fullname: 'Đỗ Thế Anh',
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
//     name: 'Board 1',
// }
// var boardCollections = new Board(BoardData);
// boardCollections.save(function (err, data) {
//     if (err) return console.error(err);
// });

// var Column = mongoose.model("Column", columnSchema);
// var ColumnData = {
//     boardID:  1, 
//     name: 'Column 1',
// }
// var columnCollections = new Column(ColumnData);
// columnCollections.save(function (err, data) {
//     if (err) return console.error(err);
// });
// var ColumnData2 = {
//     boardID:  1, 
//     name: 'Column 2',
// }
// var columnCollections2 = new Column(ColumnData2);
// columnCollections2.save(function (err, data) {
//     if (err) return console.error(err);
// });
// var ColumnData3 = {
//     boardID:  1, 
//     name: 'Column 3',
// }
// var columnCollections3 = new Column(ColumnData3);
// columnCollections3.save(function (err, data) {
//     if (err) return console.error(err);
// });

// var Card = mongoose.model("Card", cardSchema);
// var CardData = {
//     columnID:  1,
//     content: 'This is the first content.',
// }
// var cardCollections = new Card(CardData);
// cardCollections.save(function (err, data) {
//     if (err) return console.error(err);
// });
// var CardData = {
//     columnID:  2,
//     content: 'This is the second content.',
// }
// var cardCollections = new Card(CardData);
// cardCollections.save(function (err, data) {
//     if (err) return console.error(err);
// });
// var CardData = {
//     columnID:  3,
//     content: 'This is the third content.',
// }
// var cardCollections = new Card(CardData);
// cardCollections.save(function (err, data) {
//     if (err) return console.error(err);
// });