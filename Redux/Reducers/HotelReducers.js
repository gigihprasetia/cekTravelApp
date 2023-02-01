const Tomorow = () => {
  const today = new Date();
  const Tomorrow = new Date();
  Tomorrow.setDate(today.getDate() + 1);
  return Tomorrow;
};

const initialState = {
  hotelRules: {
    room: 1,
    adult: 1,
    children: 1,
    startDate: new Date(),
    endDate: Tomorow(),
  },
};

const HotelReducers = (state = initialState, actions) => {
  if (actions.type === 'setDate') {
    console.log(1);
    return {
      ...state,
      hotelRules: {
        ...state.hotelRules,
        startDate: actions.startDate,
        endDate: actions.endDate,
      },
    };
  } else if (actions.type === 'setPerson') {
    console.log(2);

    return {
      ...state,
      hotelRules: {
        ...state.hotelRules,
        adult: actions.adult < 1 ? 1 : actions.adult > 8 ? 8 : actions.adult,
        children:
          actions.children < 1
            ? 1
            : actions.children > 8
            ? 8
            : actions.children,
        room: actions.room < 1 ? 1 : actions.room > 8 ? 8 : actions.room,
      },
    };
  } else {
    // console.log(3);

    return state;
  }
};

export default HotelReducers;
