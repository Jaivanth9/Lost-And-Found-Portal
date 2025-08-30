import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  photo: { type: String, required: true },
  type: { type: String, enum: ['lost', 'found'], default: 'lost' },
  status: { type: String, enum: ['pending','approved', 'rejected'], default: 'pending' },
  claimantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Item = mongoose.model("Item", itemSchema);

export default Item;
