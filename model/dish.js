const mongoose = require('mongoose');
// var textSearch = require('mongoose-text-search');

const Schema = mongoose.Schema;

const DishSchema = new Schema({
    name: {type:String, set:toLower},
    content: { type: String, get: obfuscate},
    rating: { type: Number, default: 0},
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    reviews: [{ type:Schema.Types.ObjectId,ref:'review' }]
});

// DishSchema.plugin(textSearch);
DishSchema.index({name:'text', content:'text'});

function obfuscate (cc) {
    // console.log(cc);
  return '****-****-****-' + cc.slice(cc.length-4, cc.length);
}
function toLower (v) {
  return v.toLowerCase();
}

const Dish = mongoose.model('dish', DishSchema);

module.exports = Dish;