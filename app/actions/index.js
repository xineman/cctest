export const setState = (state) => {
  return {
    type: "SET_STATE",
    state: state
  }
}
export const setNewEvent = (event) => {
  return {
    type: "SET_NEWEVENT",
    event: event
  }
}
