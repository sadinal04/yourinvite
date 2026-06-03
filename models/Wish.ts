import mongoose, { Schema, Document, Model } from "mongoose";

export interface IWish extends Document {
  slug: string;
  name: string;
  wish: string;
  createdAt: Date;
}

const WishSchema: Schema = new Schema(
  {
    slug: { type: String, required: true, index: true },
    name: { type: String, required: true },
    wish: { type: String, required: true },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

const Wish: Model<IWish> = mongoose.models.Wish || mongoose.model<IWish>("Wish", WishSchema);

export default Wish;
