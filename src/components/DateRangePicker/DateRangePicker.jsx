import { useEffect, useRef, useState } from "react";
import { DateRangePicker } from "react-date-range";

import format from "date-fns/format";
import { addDays } from "date-fns";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./DateRangePicker.scss";

const DateRangePickerComp = ({daterange}) => {
  // date state
  const [range, setRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);

  console.log(daterange(range));

  const getRange = () =>
  {
    daterange(range)
    
  }
  console.log(range);
  // open close
  const [open, setOpen] = useState(false);

  // get the target element to toggle
  const refOne = useRef(null);

  useEffect(() => {
    // event listeners
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  // hide dropdown on ESC press
  const hideOnEscape = (e) => {
    // console.log(e.key)
    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  // Hide dropdown on outside click
  const hideOnClickOutside = (e) => {
    // console.log(refOne.current)
    // console.log(e.target)
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };

  return (
    <div className="calendarWrap">
      <div className="calendarInput">
        <img src="/images/icons/calendar.svg" alt="" />
        <input
       // className="placeholdertext"
         value={
          range[0].startDate && range[0].endDate
            ? `${format(range[0].startDate, "dd/MM/yyyy")} to ${format(range[0].endDate, "dd/MM/yyyy")}`
            : null
        }
           placeholder="Select date range"
          readOnly
          className="inputBox"
          onClick={() => setOpen((open) => !open)}
        />
      </div>

      <div ref={refOne} className="dateRangePicker">
        {open && (
          <DateRangePicker
            onChange={(item) => {setRange([item.selection]);daterange(range);}}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={range}
            months={2}
            direction="horizontal"
            className="calendarElement"
          />
        )}
      </div>
    </div>
  );
};

export default DateRangePickerComp;
