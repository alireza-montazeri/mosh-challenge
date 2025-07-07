import { Request, Response } from "express";
import { SnapshotModel } from "./model";
import { z } from "zod";

// Define the schema for snapshot deletion
const queryParamsSchema = z.object({
  snapshotId: z.string().min(1, "snapshot ID is required"),
});

export const deleteSnapshot = async (req: Request, res: Response): Promise<any> => {
  try {
    const queryParams = queryParamsSchema.parse(req.query);
    const deleted = await SnapshotModel.findByIdAndDelete(queryParams.snapshotId);
    if (!deleted) return res.status(404).json({ error: "Snapshot not found" });
    res.status(200).json({ message: "Snapshot deleted successfully", data: deleted });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error("Error deleting snapshot:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
