import { Scheduler } from "@aldabil/react-scheduler";
import { useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import { SchedulerRef } from "@aldabil/react-scheduler/types";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";

const SchedulerPage = () => {
  const calendarRef = useRef<SchedulerRef>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [mapUrls, setMapUrls] = useState({});
  const [selectedEvent, setSelectedEvent] = useState(undefined);
  const [weekStart, setWeekStart] = useState(1);
  const [dayView, setDayView] = useState(false);

  useEffect(() => {
    if (!location.state) {
      navigate("/");
      return;
    }

    const schedulerData = location.state.schedulerData;
    const dates = [];
    const locEvents = [];
    const mapUrlsMapping = {};
    let initDate = undefined;

    for (const [key, value] of Object.entries(schedulerData)) {
      const locations = value["locations"];
      const mapUrl = value["gmaps_url"];

      for (const locData of locations) {
        const startDate = new Date(`${key} ${locData["from"]}`);
        const endDate = new Date(`${key} ${locData["to"]}`);
        const event = {
          event_id: locData["event_id"],
          title: locData["Name"],
          start: startDate,
          end: endDate,
          subtitle: locData["Description"],
          deletable: false,
        };
        dates.push(startDate);
        if (initDate === undefined || startDate < initDate) {
          initDate = startDate;
        }
        locEvents.push(event);
      }
      mapUrlsMapping[key] = mapUrl;
    }
    setMapUrls(mapUrlsMapping);
    setEvents(locEvents);
    setSelectedEvent(initDate);
    setWeekStart(initDate.getDay());
  }, [location.state, navigate]);

  const handleMap = (date) => {
    const dt = format(date, "MMMM d, yyyy");
    window.open(mapUrls[dt], "_blank");
  };

  const handleReset = () => {
    navigate(location.pathname, {});
    navigate("/");
  };

  const handleView = () => {
    calendarRef.current.scheduler.handleState(dayView ? "week" : "day", "view");
    setDayView(!dayView);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row p-2 justify-end gap-2">
        <Button>Save</Button>
        <Button onClick={handleReset}>Generate new plan</Button>
        <Button onClick={handleView}>
          {dayView ? "Week View" : "Day View"}
        </Button>
      </div>
      <div className="flex flex-col lg:p-8 border-solid border-2 ">
        {Object.keys(events).length > 0 ? (
          <Scheduler
            ref={calendarRef}
            selectedDate={selectedEvent}
            editable={false}
            agenda={false}
            disableViewNavigator={true}
            day={{
              startHour: 10,
              endHour: 24,
              step: 60,
              headRenderer: (props) => {
                return (
                  <>
                    <p className="text-sm">{format(props, "dd EEE")}</p>
                    <p
                      onClick={() => handleMap(props)}
                      className="text-sm text-blue-600 cursor-pointer"
                    >
                      Open Map
                    </p>
                  </>
                );
              },
            }}
            week={{
              startHour: 10,
              endHour: 24,
              step: 60,
              headRenderer: (props) => {
                return (
                  <>
                    <p
                      onClick={() => {
                        setDayView(!dayView);
                        calendarRef.current?.scheduler.handleGotoDay(props);
                      }}
                      className="text-sm hover:underline"
                    >
                      {format(props, "dd EEE")}
                    </p>
                    <p
                      onClick={() => handleMap(props)}
                      className="text-sm text-blue-600 cursor-pointer"
                    >
                      Map
                    </p>
                  </>
                );
              },
              weekStartOn: weekStart,
            }}
            events={events}
          />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default SchedulerPage;
