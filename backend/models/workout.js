let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let WorkoutSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  week: {
    type: {Number, min:1, max:6},
    required: true
  },
  day: {
    type: {Number, min:1, max:3},
    required: true
  },
  column: {
    type: {Number, min:1, max:3},
    required: true
  },
  sets: {
    type: [Number],
    require: true
  }
});

module.exports = mongoose.model('Workout', WorkoutSchema);
