import mongoose from "mongoose";

const SnapshotSchema = new mongoose.Schema({
  front: { type: String, required: true },
  top: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  createdAt: { type: String },
  updatedAt: { type: String },
});

export const SnapshotModel = mongoose.model("Snapshot", SnapshotSchema);

export type Snapshot = {
  id: string;
  front: string;
  top: string;
  title?: string;
  description?: string;
  createdAt: Date;
};
