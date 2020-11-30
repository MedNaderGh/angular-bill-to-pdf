const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Commandes = new Schema({
  reference: {
    type: String,
    unique: true,
    required: true
  },
 produits: {
    type: String,
    required: true
  },
},{
    collection: 'commandes'
});
module.exports = mongoose.model('Commandes', Commandes);