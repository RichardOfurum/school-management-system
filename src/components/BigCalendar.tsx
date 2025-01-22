// "use client";

// import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import { useState } from "react";

// const localizer = momentLocalizer(moment);

// const BigCalendar = ({
//   data,
// }: {
//   data: { title: string; start: Date; end: Date }[];
// }) => {
//   const [view, setView] = useState<View>(Views.WORK_WEEK);

//   const handleOnChangeView = (selectedView: View) => {
//     setView(selectedView);
//   };

//   // Convert UTC to local time
//   const convertToLocalTime = (event: { title: string; start: Date; end: Date }) => ({
//     ...event,
//     start: new Date(event.start), // Automatically converted to local time
//     end: new Date(event.end), // Automatically converted to local time
//   });

//   const localData = data.map(convertToLocalTime);

//   console.log(localData);

//   return (
//     <Calendar
//       localizer={localizer}
//       events={localData}
//       startAccessor="start"
//       endAccessor="end"
//       views={["work_week", "day"]}
//       view={view}
//       style={{ height: "98%" }}
//       onView={handleOnChangeView}
//       min={new Date(2025, 0, 20, 8, 0, 0)} // Corrected month (January is 0-indexed)
//       max={new Date(2025, 0, 20, 18, 0, 0)}
//     />
//   );
// };

// export default BigCalendar;


"use client";

import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";

const localizer = momentLocalizer(moment);

const BigCalendar = ({
  data,
}: {
  data: { title: string; start: Date; end: Date }[];
}) => {
  const [view, setView] = useState<View>(Views.WORK_WEEK);

  const handleOnChangeView = (selectedView: View) => {
    setView(selectedView);
  };

  console.log(data);
  return (
    <Calendar
      localizer={localizer}
      events={data}
      startAccessor="start"
      endAccessor="end"
      views={["work_week", "day"]}
      view={view}
      style={{ height: "98%" }}
      onView={handleOnChangeView}
      min={new Date(2025, 1, 0, 8, 0, 0)}
      max={new Date(2040, 12, 0, 18, 0, 0)}
    />
  );
};

export default BigCalendar;
