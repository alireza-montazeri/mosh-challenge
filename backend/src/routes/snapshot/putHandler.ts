import { Request, Response } from "express";
import { SnapshotModel } from "./model";
import z from "zod";

const queryParamsSchema = z.object({
  snapshotId: z.string().min(1, "snapshot ID is required"),
});

const bodyParamsSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  description: z.string().optional(),
  front: z.string().min(1, "Front image is required").optional(),
  top: z.string().min(1, "Top image is required").optional(),
});

export const updateSnapshot = async (req: Request, res: Response): Promise<any> => {
  try {
    const queryParams = queryParamsSchema.parse(req.query);
    const bodyParams = bodyParamsSchema.parse(req.body);

    const updatedAt = new Date().toISOString();

    const updated = await SnapshotModel.findByIdAndUpdate(
      queryParams.snapshotId,
      { ...bodyParams, updatedAt },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Snapshot not found" });
    res.status(200).json({ message: "Snapshot updated successfully", data: updated });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error("Error updating snapshot:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
