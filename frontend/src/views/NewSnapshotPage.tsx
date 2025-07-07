import { useNavigate, Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { ArrowLeft, Camera, FileText } from "lucide-react";
import { CameraCapture } from "../components/CameraCapture";
import { useCreateSnapshotMutation } from "@/api/FetchSnapshot";
import { Input } from "../components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const snapshotFormData = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  front: z.string().min(1, "Front photo is required"),
  top: z.string().min(1, "Top photo is required"),
});

export default function NewSnapshotPage() {
  const navigate = useNavigate();

  const [createSnapshot] = useCreateSnapshotMutation();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(snapshotFormData),
    defaultValues: {
      title: "",
      description: "",
      front: "",
      top: "",
    },
  });

  const onSubmit = async (formData: z.infer<typeof snapshotFormData>) => {
    createSnapshot(formData)
      .unwrap()
      .then(() => navigate(`/`))
      .catch((error) => {
        console.error("Failed to create snapshot:", error);
      });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">New Snapshot</h1>
          <p className="text-muted-foreground">Take photos to track your progress</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Snapshot Details
            </CardTitle>
            <CardDescription>Add a title and optional description for this snapshot</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">
                Title <span className="text-red-500">*</span>
              </Label>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <div className="space-y-2">
                    <Input id="title" placeholder="e.g., Month 3 Progress, After Treatment Session 5..." {...field} />
                    {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
                  </div>
                )}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <div className="space-y-2">
                    <Textarea
                      id="description"
                      placeholder="e.g., Started new medication, noticed changes in density..."
                      rows={3}
                      {...field}
                    />
                    {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
                  </div>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Photo Capture Section */}
        <div className="grid gap-8 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Front View
                <span className="text-red-500">*</span>
              </CardTitle>
              <CardDescription>Take a photo facing the camera directly</CardDescription>
            </CardHeader>
            <CardContent>
              <Controller
                name="front"
                control={control}
                render={({ field }) => (
                  <div className="space-y-2">
                    <CameraCapture
                      onCapture={(imageUrl) => field.onChange(imageUrl, { snapshotFormData: false })}
                      capturedImage={field.value}
                      label="Front Photo"
                    />
                    {errors.front && <p className="text-sm text-red-500">{errors.front.message}</p>}
                  </div>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Top View
                <span className="text-red-500">*</span>
              </CardTitle>
              <CardDescription>Take a photo from above showing the top of your head</CardDescription>
            </CardHeader>
            <CardContent>
              <Controller
                name="top"
                control={control}
                render={({ field }) => (
                  <div className="space-y-2">
                    <CameraCapture
                      onCapture={(imageUrl) => field.onChange(imageUrl, { snapshotFormData: false })}
                      capturedImage={field.value}
                      label="Top Photo"
                    />
                    {errors.top && <p className="text-sm text-red-500">{errors.top.message}</p>}
                  </div>
                )}
              />
            </CardContent>
          </Card>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting} size="lg" className="gap-2">
            {isSubmitting ? "Creating..." : "Create Snapshot"}
          </Button>
        </div>
      </form>
    </div>
  );
}
