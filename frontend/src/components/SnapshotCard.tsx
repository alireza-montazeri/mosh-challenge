import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Calendar } from "lucide-react";
import type { TSnapshotInfo } from "@/api/types";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";

export default function SnapshotCard({ snapshot }: { snapshot: TSnapshotInfo }) {
  return (
    <Card className="hover:shadow-lg transition-shadow overflow-hidden gap-2">
      <div className="relative w-full -mt-6">
        <Carousel>
          <CarouselContent>
            <CarouselItem>
              <Link to={`/snapshots/${snapshot._id}`}>
                <img
                  src={snapshot.front}
                  alt={`Front view`}
                  className="w-full aspect-video bg-muted overflow-hidden object-cover"
                />
              </Link>
            </CarouselItem>
            <CarouselItem>
              <Link to={`/snapshots/${snapshot._id}`}>
                <img
                  src={snapshot.top}
                  alt={`Top view`}
                  className="w-full aspect-video bg-muted overflow-hidden object-cover"
                />
              </Link>
            </CarouselItem>
          </CarouselContent>

          <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 border-none" />
          <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 border-none" />
        </Carousel>
      </div>
      <Link to={`/snapshots/${snapshot._id}`}>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-semibold">{snapshot.title}</CardTitle>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="size-3" />
              {new Date(snapshot.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {snapshot.description && (
            <CardDescription className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {snapshot.description}
            </CardDescription>
          )}
        </CardContent>
      </Link>
    </Card>
  );
}
