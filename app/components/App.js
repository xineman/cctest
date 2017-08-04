import React from 'react';
import {connect} from 'react-redux'
import SignedInMenu from "../components/SignedInMenu";
import LoginForm from "../components/LoginForm";
import Calendar from "../components/Calendar";
import RemovePopup from "../components/RemovePopup";
import AddPopup from "../components/AddPopup";
class App extends React.Component {

  render() {
    return (
      <main>
        <header className="header">
          <h1 className="header__title">Calendar</h1>
          {this.props.username && <SignedInMenu events={this.props.events} />}
        </header>
        {this.props.username && <p className="header__descr">Click "Add" to add new event, "Export" to export all your events as JSON, or click the event to remove it.</p>}
        {this.props.username && <Calendar events={this.props.events} />}
        {!this.props.username && <LoginForm />}
        {this.props.showRemovePopup && <RemovePopup removeId={this.props.removeId} />}
        {this.props.showAddPopup && <AddPopup newEvent={this.props.newEvent}/>}

      </main>
    );
  }
}
const mapStateToProps = state => {
  return {
    username: state.username,
    events: state.events,
    showRemovePopup: state.showRemovePopup,
    showAddPopup: state.showAddPopup,
    removeId: state.removeId,
    newEvent: state.newEvent
  }
}
const AppContainer = connect(mapStateToProps)(App);
export default AppContainer;
