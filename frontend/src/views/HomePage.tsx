import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Camera, Plus } from "lucide-react";
import { useReadSnapshotQuery } from "@/api/FetchSnapshot";
import SnapshotCard from "@/components/SnapshotCard";

export default function HomePage() {
  const { data: snapshots = [] } = useReadSnapshotQuery({});

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 475.1 229.2"
            xmlSpace="preserve"
            className="w-full h-auto max-w-[60px] md:max-w-[100px] lg:max-w-[100px] fill-green-900"
          >
            <polygon points="438.2,2.4 438.2,96.1 413.5,96.1 413.5,2.4 376.6,2.4 376.6,226.8 413.5,226.8 413.5,133.1 438.2,133.1 438.2,226.8 475.1,226.8 475.1,2.4 "></polygon>
            <path d="M205.2,37c6.8,0,12.3,5.5,12.3,12.3v130.6c-0.2,6.8-5.9,12.2-12.7,12c-6.5-0.2-11.8-5.4-12-12V49.3 C193,42.5,198.5,37,205.2,37 M205.2,0L205.2,0c-27.2,0-49.2,22-49.2,49.2v130.7c0,27.2,22,49.3,49.2,49.3l0,0 c27.2,0,49.3-22.1,49.3-49.3V49.3C254.5,22,232.4,0,205.2,0L205.2,0z"></path>
            <path d="M359.2,156.7L305,55.1c-3.1-6.1-0.7-13.5,5.4-16.6c5.9-3,13.2-0.8,16.4,5l5.7,10.6L365,36.7l-5.7-10.6 C351.1,10.6,335.2,0.6,317.6,0h-0.1c-8.6-0.3-17.2,1.7-24.8,5.8l0,0c-24,12.8-33.1,42.6-20.3,66.6l54.2,101.7 c3,6.1,0.6,13.5-5.5,16.5c-5.9,2.9-13,0.8-16.2-4.9l-6.1-11.5l-32.6,17.4l6.1,11.5c8.3,15.5,24.2,25.5,41.8,26.1h0.1 c8.6,0.3,17.2-1.7,24.8-5.8l0,0C362.9,210.6,372,180.7,359.2,156.7"></path>
            <polygon points="103.3,2.4 70.1,140.4 36.9,2.4 0,2.4 0,226.8 36.9,226.8 36.9,141.6 55.7,226.8 84.6,226.8 103.3,141.6 103.3,226.8 140.2,226.8 140.2,2.4 "></polygon>
          </svg>

          <div>
            <h1 className="text-3xl font-bold tracking-tight">Hair Loss Progress Tracker</h1>
            <p className="text-muted-foreground mt-2">Track your treatment progress with photo snapshots</p>
          </div>
        </div>
        <Link to="/snapshots/new">
          <Button size="lg" className="gap-2">
            <Plus className="h-4 w-4" />
            New Snapshot
          </Button>
        </Link>
      </div>

      <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {snapshots.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Camera className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No snapshots yet</h3>
              <p className="text-muted-foreground mb-4">Start tracking your progress by taking your first snapshot</p>
              <Link to="/snapshots/new">
                <Button>Take First Snapshot</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          snapshots.map((snapshot) => <SnapshotCard key={snapshot._id} snapshot={snapshot} />)
        )}
      </div>
    </div>
  );
}
