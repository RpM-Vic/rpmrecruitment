import { Schema, model } from 'mongoose';

const LogSchema = new Schema(
  {
    priority: {
      type: String,
      enum: ['warning', 'error', 'info'], 
      required: [true, 'priority is mandatory'],
      trim: true,
    },
    message: {
      type: String,
      required: [true, 'message is mandatory'],
      trim: true,
    },
    data: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export default model('Log', LogSchema);
