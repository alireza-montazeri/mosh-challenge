import { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import { Button } from "./ui/button";
import { Camera, RotateCcw, Check, Loader2, Upload, ImageIcon } from "lucide-react";
import { useUploadSnapshotMutation } from "@/api/Upload";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";

interface CameraCaptureProps {
  onCapture: (imageUrl: string) => void;
  capturedImage: string | null;
  label: string;
}

export function CameraCapture({ onCapture, capturedImage, label }: CameraCaptureProps) {
  const webcamRef = useRef<Webcam>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [activeTab, setActiveTab] = useState("camera");

  const [upload, { isLoading: isUploading }] = useUploadSnapshotMutation();

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

  const startCamera = useCallback(() => {
    setIsStreaming(true);
  }, []);

  const stopCamera = useCallback(() => {
    setIsStreaming(false);
  }, []);

  const dataURLtoFile = (dataurl: string, filename: string): File => {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const capturePhoto = useCallback(async () => {
    if (webcamRef.current) {
      try {
        const imageSrc = webcamRef.current.getScreenshot();
        if (imageSrc) {
          // Convert base64 to file
          const file = dataURLtoFile(imageSrc, `${label.toLowerCase().replace(" ", "_")}_${Date.now()}.jpg`);

          // Upload to backend
          const formData = new FormData();
          formData.append("image", file);

          upload(formData)
            .unwrap()
            .then((data) => onCapture(data.url))
            .catch((error) => {
              console.error("Upload failed:", error);
            });

          // Set captured image
          stopCamera();
        }
      } catch (error) {
        console.error("Error capturing photo:", error);
      }
    }
  }, [label, onCapture, stopCamera, upload]);

  const retakePhoto = useCallback(() => {
    onCapture("");
    startCamera();
  }, [onCapture, startCamera]);

  const triggerFileInput = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileSelect = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      // Validate file type
      if (!file.type.startsWith("image/")) return;

      // Validate file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) return;

      // Upload to backend
      const formData = new FormData();
      formData.append("image", file);
      upload(formData)
        .unwrap()
        .then((data) => onCapture(data.url))
        .catch((error) => {
          console.error("Upload failed:", error);
        });
    },
    [upload, onCapture]
  );

  return (
    <div className="space-y-4">
      {!capturedImage ? (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="camera" className="flex items-center gap-2">
              <Camera className="h-4 w-4" />
              Camera
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Upload
            </TabsTrigger>
          </TabsList>

          <TabsContent value="camera" className="mt-4">
            <div className="aspect-video bg-muted rounded-lg overflow-hidden relative">
              {isStreaming ? (
                <Webcam
                  ref={webcamRef}
                  audio={false}
                  screenshotFormat="image/jpeg"
                  videoConstraints={videoConstraints}
                  className="w-full h-full object-cover"
                  onUserMedia={() => console.log("Camera started")}
                  onUserMediaError={(error) => {
                    console.error("Camera error:", error);
                    setIsStreaming(false);
                  }}
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <Camera className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Camera preview</p>
                  </div>
                </div>
              )}

              {isUploading && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                    <p className="text-sm">Uploading photo...</p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-2 mt-4">
              {!isStreaming ? (
                <Button onClick={startCamera} className="flex-1" disabled={isUploading} type="button">
                  <Camera className="h-4 w-4 mr-2" />
                  Start Camera
                </Button>
              ) : (
                <Button onClick={capturePhoto} className="flex-1" disabled={isUploading} type="button">
                  {isUploading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Capture Photo
                    </>
                  )}
                </Button>
              )}
            </div>
          </TabsContent>

          <TabsContent value="upload" className="mt-4">
            <div className="aspect-video bg-muted rounded-lg overflow-hidden relative border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50 transition-colors">
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">Choose an image file</p>
                  <p className="text-xs text-muted-foreground">JPG, PNG, GIF up to 10MB</p>
                </div>
              </div>

              {isUploading && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                    <p className="text-sm">Uploading image...</p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-2 mt-4">
              <Button onClick={triggerFileInput} className="flex-1" disabled={isUploading} type="button">
                <Upload className="h-4 w-4 mr-2" />
                Choose File
              </Button>
            </div>

            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
          </TabsContent>
        </Tabs>
      ) : (
        <>
          <div className="aspect-video bg-muted rounded-lg overflow-hidden relative">
            <img
              src={capturedImage || "/placeholder.svg"}
              alt={`Captured ${label}`}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex gap-2">
            <Button
              onClick={retakePhoto}
              variant="outline"
              className="flex-1 bg-transparent"
              disabled={isUploading}
              type="button"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Replace Photo
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
