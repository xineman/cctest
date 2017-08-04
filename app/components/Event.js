import React from 'react';
import {connect} from 'react-redux';
import {setState} from "../actions";
class Event extends React.Component {
  render() {
    return (
      //1 minute has 2px height
      <li style={{
        width: this.props.layout ? this.props.layout.width*100+"%" : "",
        left: this.props.layout ? this.props.layout.width*this.props.layout.order*100+"%" : "",
        height: this.props.duration*2+"px",
        top: this.props.start*2+"px"
      }} onClick={()=>this.props.eventClick()} data-start="8:00" data-end="9:00" data-text={this.props.title} className="calendar__event"><span>{this.props.title}</span></li>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    layout: state.layout ? state.layout.find(l=>l.id==ownProps._id) : null
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    eventClick: () => {
      dispatch(setState({removeId: ownProps._id, showRemovePopup: true}));
    }
  }
}
const EventContainer = connect(mapStateToProps, mapDispatchToProps)(Event);
export default EventContainer;
