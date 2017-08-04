import React from 'react';
import Event from './Event';
import {connect} from 'react-redux'
import {setState} from "../actions";
import {appendLayout} from "../actions";
import {ajax} from "../utils";
class Calendar extends React.Component {
  componentWillUpdate(nextProps, nextState) {
    if (nextProps.events!=this.props.events)
      this.props.setupLayout(nextProps.events);
  }
  render() {
    return (
      <article className="calendar">
        <ul className="calendar__timeline">
          <li className="calendar__time">8:00</li>
          <li className="calendar__time calendar__time_small">8:30</li>
          <li className="calendar__time">9:00</li>
          <li className="calendar__time calendar__time_small">9:30</li>
          <li className="calendar__time">10:00</li>
          <li className="calendar__time calendar__time_small">10:30</li>
          <li className="calendar__time">11:00</li>
          <li className="calendar__time calendar__time_small">11:30</li>
          <li className="calendar__time">12:00</li>
          <li className="calendar__time calendar__time_small">12:30</li>
          <li className="calendar__time">1:00</li>
          <li className="calendar__time calendar__time_small">1:30</li>
          <li className="calendar__time">2:00</li>
          <li className="calendar__time calendar__time_small">2:30</li>
          <li className="calendar__time">3:00</li>
          <li className="calendar__time calendar__time_small">3:30</li>
          <li className="calendar__time">4:00</li>
          <li className="calendar__time calendar__time_small">4:30</li>
          <li className="calendar__time calendar__time_last">5:00</li>
        </ul>
        <div className="calendar__events-container">
          <ul className="calendar__hours">
            <li className="calendar__hour"></li>
            <li className="calendar__hour"></li>
            <li className="calendar__hour"></li>
          </ul>
          <ul className="calendar__events">
            {this.props.layout && this.props.events.map(e => <Event key={e._id}  duration={e.duration} start={e.start} title={e.title} _id={e._id} />)}
            {/* {this.props.layout && this.props.events.map(e => <Event key={e._id}  {...e} />)} */}
            {/* <li data-start="8:00" data-end="9:00" data-text="Exercise" className="calendar__event"><span>Exercise</span></li> */}
            {/* <li data-start="9:20" data-end="10:20" data-text="Skype call" className="calendar__event calendar__event_s"><span>Skype call</span></li> */}
            {/* <li data-start="9:20" data-end="10:20" data-text="Lunch with Taylor Swift" className="calendar__event calendar__event_s calendar__event_right"><span>Lunch with Taylor Swift</span></li> */}
          </ul>
        </div>
      </article>
    );
  }
}
const mapStateToProps = state => {
  return {
    events: state.events,
    layout: state.layout
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    // eventClick: (id) => {
    //   ajax(`http://${window.location.host}/remove`, "POST", {removeId: id}).then((response) => {
    //     dispatch(setState({events: JSON.parse(response)}));
    //   });
    // },
    setupLayout: (allEvents) => {
      let layout = [];
      for (var i = 0; i < 540; i++) {//540 minutes in day
        let events = allEvents.filter(e=>e.start<=i && e.start+e.duration-1>=i);
        if (events.length>1) {
          for (var j = 0; j < events.length; j++) {
            let evLayout = layout.find(l => l.id==events[j]._id);
            if (!evLayout || evLayout.width > 1/events.length) {
              layout = layout.filter(l => l.id!=events[j]._id);
              layout.push({id:events[j]._id, order: j, width:1/events.length});
            }
          }
        }
      }
      dispatch(setState({layout}));
    }
  }
}
const CalendarContainer = connect(mapStateToProps, mapDispatchToProps)(Calendar);
export default CalendarContainer;
