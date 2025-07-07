import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

import { ArrowLeft, Calendar, Camera, Edit } from "lucide-react";
import { DeleteSnapshotButton } from "../components/DeleteSnapshotButton";
import { useReadSnapshotQuery } from "@/api/FetchSnapshot";

export default function SnapshotDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: snapshotList, isLoading } = useReadSnapshotQuery({ snapshotId: id ?? "" });
  const snapshot = snapshotList?.[0];

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!snapshot) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Snapshot not found</h1>
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {snapshot.title} <span className="text-gray-500 font-normal text-base">#{snapshot._id}</span>
            </h1>
            <div className="flex items-center gap-4 mt-2 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(snapshot.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
              <div className="flex items-center gap-2">
                <Edit className="h-4 w-4" />
                {new Date(snapshot.updatedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>
        </div>
        <DeleteSnapshotButton snapshotId={snapshot._id} onDelete={() => navigate("/")} />
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 capitalize">
              <Camera className="h-5 w-5" />
              Front View
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-muted rounded-lg overflow-hidden">
              <img
                src={snapshot.front || "/placeholder.svg"}
                alt={`Front view`}
                className="w-full h-full object-cover"
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 capitalize">
              <Camera className="h-5 w-5" />
              Top View
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-muted rounded-lg overflow-hidden">
              <img src={snapshot.top || "/placeholder.svg"} alt={`Top view`} className="w-full h-full object-cover" />
            </div>
          </CardContent>
        </Card>
      </div>

      {snapshot.description && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground whitespace-pre-wrap">{snapshot.description}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
