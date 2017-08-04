import React from 'react';
import {connect} from 'react-redux';
import {setState} from "../actions";
import {ajax} from "../utils";
class RemovePopup extends React.Component {
  render() {
    return (
      <div className="popup remove-popup" onClick={(e) => this.props.close(e)}>
        <div className="popup__wrapper remove-popup__wrapper">
          <h3 className="popup__title">Remove event?</h3>
          <div className="popup__buttons">
            <p className="header__btn" onClick={() => this.props.remove()}>Remove</p>
            <p className="header__btn popup__close">Cancel</p>
          </div>
        </div>
      </div>
    );
  }
}
// const mapStateToProps = state => {
//   return {
//     events: state.events,
//     layout: state.layout
//   }
// }

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    remove: () => {
      ajax(`http://${window.location.host}/remove`, "POST", {removeId: ownProps.removeId}).then((response) => {
        dispatch(setState({removeId: null, showRemovePopup: false, events: JSON.parse(response)}));
      });
    },
    close: (e) => {
      if (e.target.classList.contains("popup")||e.target.classList.contains("popup__close"))
      dispatch(setState({removeId: null, showRemovePopup: false}));
    }
  }
}
const RemovePopupContainer = connect(null, mapDispatchToProps)(RemovePopup);
export default RemovePopupContainer;
