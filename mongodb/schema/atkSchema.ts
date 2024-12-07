import mongoose from 'mongoose';

const atkSchema = new mongoose.Schema({
  Atk_Value: Number,
  Atk_EnemySelection: [ {label: String} ],
  Atk_Difficulty: Number
});

const AtkModel = mongoose.model('Atk', atkSchema);

export default AtkModel;