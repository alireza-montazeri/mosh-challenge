import { Request, Response } from "express";
import { SnapshotModel } from "./model";
import { z } from "zod";

const queryParamsSchema = z.object({
  snapshotId: z.string().optional(),
});

export const getSnapshots = async (req: Request, res: Response): Promise<any> => {
  try {
    const queryParams = queryParamsSchema.parse(req.query);
    if (queryParams.snapshotId) {
      const snapshot = await SnapshotModel.findById(queryParams.snapshotId);
      if (!snapshot) {
        return res.status(404).json({ message: "Snapshot not found" });
      }
      return res.status(200).json([snapshot]);
    }
    const snapshots = await SnapshotModel.find().sort({ createdAt: -1 });
    res.status(200).json(snapshots);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error("Error fetching snapshots:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
