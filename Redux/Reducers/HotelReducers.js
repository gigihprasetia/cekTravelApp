const initialState = {
  hotelRules: {
    room: 1,
    adult: 1,
    children: 1,
    startDate: new Date(),
    endDate: () => {
      const today = new Date();
      const Tomorrow = new Date();
      Tomorrow.setDate(today.getDate() + 1);
      return Tomorrow;
    },
  },
};

const HotelReducers = (state = initialState, actions) => {
  return state;
};

export default HotelReducers;
