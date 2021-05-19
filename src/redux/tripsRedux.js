/* SELECTORS */

export const getAllTrips = ({trips}) => trips;

export const getFilteredTrips = ({trips, filters}) => {
  let output = trips;

  const selectedTag = filters.tags[1];
  if (filters.searchPhrase) {
    const pattern = new RegExp(filters.searchPhrase, 'i');
    output = output.filter(trip => pattern.test(trip.name));
  }

  if (selectedTag) {
    output = output.filter((trip) => {
      return trip.tags.indexOf(selectedTag) > -1;
    });
  }
  output = output.filter((trip) => {
    return trip.days >= filters.duration.from && trip.days <= filters.duration.to;
  });
  return output;
};

/////////////////////////////////////////////////////////////////////////////////////

export const getTripById = ({trips}, tripId) => {
  const filtered = trips.filter(trip => trip.id == tripId);

  // TODO - filter trips by tripId

  return filtered.length ? filtered[0] : {error: true};
};

////////////////////////////////////////////////////////////////////////////////////////////////

export const getTripsForCountry = ({trips}, countryCode) => {
  const filtered = trips.filter(trip => trip.country.code == countryCode);

  // TODO - filter trips by countryCode

  console.log('filtering trips by countryCode:', countryCode, filtered);
  return filtered.length ? filtered : [{error: true}];
};

/* ACTIONS */

/*
// action name creator
const reducerName = 'trips';
const createActionName = name => `app/${reducerName}/${name}`;

// action types


// action creators


// reducer
export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    default:
      return statePart;
  }
}
 */
