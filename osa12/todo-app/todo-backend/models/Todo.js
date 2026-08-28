const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  text: { type: String, required: true },
  done: { type: Boolean, default: false },
});

schema.set('toJSON', {
  transform: (document, returned) => {
    returned.id = returned._id.toString();
    delete returned._id;
    delete returned.__v;
  },
});

module.exports = mongoose.model('Todo', schema);
