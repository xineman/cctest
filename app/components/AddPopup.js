import React from 'react';
import {connect} from 'react-redux';
import {setState, setNewEvent} from "../actions";
import {ajax} from "../utils";
class AddPopup extends React.Component {
  render() {
    return (
      <div className="popup add-popup" onClick={(e) => this.props.close(e)}>
        <div className="popup__wrapper add-popup__wrapper">
          <h3 className="popup__title">New event</h3>
          <form>
            <div className="form__block">
              <label className="form__label">Title</label>
              <input id="event__title" type="text" className="form__input" placeholder="Event title" onChange={(e) => this.props.change(e)} value={this.props.newEvent.title}/>
            </div>
            <div className="form__block">
              <label className="form__label">Start time:</label>
              <input id="event__start" type="text" className="form__input" placeholder="8:00" onChange={(e) => this.props.change(e)} value={this.props.newEvent.start}/>
            </div>
            <div className="form__block">
              <label className="form__label">End time:</label>
              <input id="event__end" type="text" className="form__input" placeholder="8:30" onChange={(e) => this.props.change(e)} value={this.props.newEvent.end}/>
            </div>
            <div className="popup__buttons">
              <p className="header__btn" onClick={() => this.props.create()}>Create</p>
              <p className="header__btn popup__close">Cancel</p>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {newEvent: state.newEvent}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    create: () => {
      let start = ownProps.newEvent.start.split(":");
      start = (parseInt(start[0]) - 8) * 60 + parseInt(start[1]);
      let end = ownProps.newEvent.end.split(":");
      end = (parseInt(end[0]) - 8) * 60 + parseInt(end[1]);
      if (isNaN(start) || isNaN(end) || end<start) {
        alert("Check your fields and try again!");
      } else {
        ajax(`http://${window.location.host}/add`, "POST", {
          event: {
            title: ownProps.newEvent.title,
            start: start,
            duration: end - start
          }
        }).then((response) => {
          dispatch(setState({showAddPopup: false, events: JSON.parse(response)}));
        });
      }
    },
    change: (e) => {
      switch (e.target.id) {
        case "event__title":
          dispatch(setNewEvent({title: e.target.value}));
          break;
        case "event__start":
          dispatch(setNewEvent({start: e.target.value}));
          break;
        case "event__end":
          dispatch(setNewEvent({end: e.target.value}));
          break;
        default:

      }
    },
    close: (e) => {
      if (e.target.classList.contains("popup") || e.target.classList.contains("popup__close"))
        dispatch(setState({showAddPopup: false}));
      }
    }
}
const AddPopupContainer = connect(mapStateToProps, mapDispatchToProps)(AddPopup);
export default AddPopupContainer;
