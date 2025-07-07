import { Request, Response } from "express";
import { SnapshotModel } from "./model";
import z from "zod";

const bodyParamsSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  front: z.string().min(1, "Front image is required"),
  top: z.string().min(1, "Top image is required"),
});

export const createSnapshot = async (req: Request, res: Response): Promise<any> => {
  try {
    const bodyParams = bodyParamsSchema.parse(req.body);
    const { title, description, front, top } = bodyParams;
    const createdAt = new Date().toISOString();
    const updatedAt = new Date().toISOString();

    const snapshot = new SnapshotModel({
      title,
      description,
      front,
      top,
      createdAt,
      updatedAt,
    });

    await snapshot.save();
    res.status(201).json({ message: "Snapshot created successfully", data: snapshot });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error("Error creating snapshot:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
