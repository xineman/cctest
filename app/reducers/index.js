const initialState = {
  username: null,
  events: [
    {
      id: "0",
      title: "My first event!",
      start: "1",
      duration: "1"
    }
  ],
  layout: null,
  newEvent: {
    title: "",
    start: "",
    end: ""
  }
}

function calendarApp(state = initialState, action) {
  switch (action.type) {
    case "SET_STATE":
      return {
        ...state,
        ...action.state
      }
    case "SET_NEWEVENT":
      return {...state, newEvent: { ...state.newEvent, ...action.event}}
  }
  return state;
}

export default calendarApp
