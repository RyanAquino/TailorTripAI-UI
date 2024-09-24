import { Scheduler } from "@aldabil/react-scheduler";
import { useEffect, useRef, useState } from "react";
import { Typography } from "@mui/material";
import { format } from "date-fns";
import { SchedulerRef } from "@aldabil/react-scheduler/types";
import { Button } from "@material-tailwind/react";

const SchedulerPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const data = [{}];

  useEffect(() => {
    setIsLoading(true);

    // fetching data

    setIsLoading(false);
  }, []);

  const calendarRef = useRef<SchedulerRef>(null);

  return (
    <div className="flex flex-col">
      <Scheduler
        ref={calendarRef}
        selectedDate={new Date("2024-10-07")}
        editable={false}
        agenda={false}
        day={{
          startHour: 9,
          endHour: 24,
          step: 60,
          hourRenderer: (props) => {
            return props === "09:00 AM" ? (
              <Typography variant="caption">Maps</Typography>
            ) : (
              <Typography variant="caption">{props}</Typography>
            );
          },
          headRenderer: (props) => {
            return (
              <>
                <p className="text-sm">{format(props, "dd EEE")}</p>
                <p
                  onClick={() => window.open("https://google.com", "_blank")}
                  className="text-sm text-blue-600 cursor-pointer"
                >
                  Map
                </p>
              </>
            );
          },
        }}
        week={{
          startHour: 9,
          endHour: 24,
          step: 60,
          hourRenderer: (props) => {
            return props === "09:00 AM" ? (
              <Typography variant="caption">Maps</Typography>
            ) : (
              <Typography variant="caption">{props}</Typography>
            );
          },
          headRenderer: (props) => {
            return (
              <>
                <p
                  onClick={() =>
                    calendarRef.current?.scheduler.handleGotoDay(props)
                  }
                  className="text-sm hover:underline"
                >
                  {format(props, "dd EEE")}
                </p>
                <p
                  onClick={() => window.open("https://google.com", "_blank")}
                  className="text-sm text-blue-600 cursor-pointer"
                >
                  Map
                </p>
              </>
            );
          },
          weekStartOn: 1,
        }}
        events={[
          {
            event_id: 2,
            title: "Event 2",
            start: new Date("2024/9/22 09:00"),
            end: new Date("2024/9/22 10:00"),
          },
          {
            event_id: 3,
            title: "Event 3",
            start: new Date("2024/9/22 18:00"),
            end: new Date("2024/9/22 20:00"),
          },
          {
            event_id: 6,
            title: "Event 6",
            start: new Date("2024/9/21 14:00"),
            end: new Date("2024/9/21 15:00"),
          },
        ]}
      />
    </div>
  );
};

export default SchedulerPage;
