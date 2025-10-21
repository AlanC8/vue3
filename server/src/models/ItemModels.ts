import mongoose from 'mongoose';

const AnythingSchema = new mongoose.Schema(
  {},
  { strict: false, collection: 'items' }
);

export const ItemModel = mongoose.model('Item', AnythingSchema);