import React, { Component } from "react";
import "./styles.css";

import Single from "rc-calendar";
import { addDays, startOfDay, isBefore } from "date-fns";
import moment from "moment";
import cx from "classnames";

const Calendar = ({
  selectedValues,
  showClear,
  onSelect,
  className,
  mode,
  showDateInput,
  defaultValue,
  disabledDate
}) => {
  const classes = cx(".rc-calendar", className && className);
  return (
    <Single
      showClear
      onSelect={onSelect}
      className={classes}
      showDateInput={showDateInput}
      defaultValue={defaultValue}
      disabledDate={disabledDate}
    />
  );
};

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
      isSelectingDate: false
    };
    this.handleDateChange = this.handleDateChange.bind(this);
    this.disabledDate.bind(this);
  }

  disabledDate(current) {
    const nextDate = startOfDay(addDays(new Date(), 1));
    if (!current) return false;
    return isBefore(current, nextDate);
  }

  handleDateChange() {
    this.setState({ isSelectingDate: true });
  }

  renderCalendar = () => {
    return (
      <div className="calendarContainer">
        <Calendar
          onSelect={(moments) => {
            if (moments) {
              const dateUTC = moment.utc(moments._d).format();
              return this.setState({ date: dateUTC, isSelectingDate: false });
            }
            return this.setState({ isSelectingDate: false });
          }}
          className="calendar"
          defaultValue={moment(new Date()).add(1, "days")}
          disabledDate={this.disabledDate}
        />
      </div>
    );
  };

  render() {
    const { date, isSelectingDate } = this.state;
    return (
      <div className="calendarSelect" onClick={this.handleDateChange}>
        {isSelectingDate && this.renderCalendar()}
        {(moment(date).isValid() && moment(date).format("MM/DD/YY")) ||
          "Select a Date*"}
      </div>
    );
  }
}

export default function App() {
  return (
    <div className="App">
      <Container />
    </div>
  );
}
