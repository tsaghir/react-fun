import moment from 'moment';
export const getLocationAPI = () =>
  fetch('http://api.open-notify.org/iss-now.json').then(response =>
    response.json(),
  );

export const fetchCometData = () =>
  fetch('https://data.nasa.gov/resource/y77d-th95.json')
    .then(response => response.json())
    .then(rawData => {
      return rawData.map(item => {
        return {
          id: item.name,
          latitude: item.reclat,
          longitude: item.reclong,
          size: Math.round(item.mass ? Math.sqrt(item.mass) / 70 : 1),
          year: moment(item.year).format('YYYY'),
        };
      });
    });
