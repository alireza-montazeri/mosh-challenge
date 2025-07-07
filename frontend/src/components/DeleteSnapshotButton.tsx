import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { useDeleteSnapshotMutation } from "@/api/FetchSnapshot";
interface DeleteSnapshotButtonProps {
  snapshotId: string;
  onDelete: () => void;
}

export function DeleteSnapshotButton({ snapshotId, onDelete }: DeleteSnapshotButtonProps) {
  const [deleteSnapshot, { isLoading: isDeleting }] = useDeleteSnapshotMutation();

  const handleDelete = async () => {
    deleteSnapshot({ snapshotId })
      .unwrap()
      .then(() => {
        onDelete();
      })
      .catch((error) => {
        console.error("Failed to delete snapshot:", error);
      });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm">
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Snapshot</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this snapshot? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
