export const DATA_LOAD_SUCCESS = 'DATA_LOAD_SUCCESS';
export const DO_DATA_POLLING = 'DO_DATA_POLLING';

export const loadIssLocationData = () => dispatch => {
  return fetch('http://api.open-notify.org/iss-now.json')
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(
      data => {
        dispatch({ type: DATA_LOAD_SUCCESS, data });
      },
      error => {
        alert(`Error loading data: ${error.message}`);
      },
    );
};
