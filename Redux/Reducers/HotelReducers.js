const Tomorow = () => {
  const today = new Date();
  const Tomorrow = new Date();
  const Tomorrow2 = new Date();
  Tomorrow.setDate(today.getDate() + 1);
  Tomorrow2.setDate(today.getDate() + 2);
  return {
    Tomorrow,
    Tomorrow2,
  };
};

const {Tomorrow, Tomorrow2} = Tomorow();

const initialState = {
  hotelRules: {
    location: '',
    baby: 0,
    adult: 1,
    children: 0,
    startDate: Tomorrow,
    endDate: Tomorrow2,
    total_night: 1,
  },
  selectedRoom: {
    id: '',
    code: '',
    floor: '',
    room_type: '',
    descriptionKamar: '',
  },
};

const HotelReducers = (state = initialState, actions) => {
  // console.log(actions);
  if (actions.type === 'setDate') {
    // console.log(1);
    return {
      ...state,
      hotelRules: {
        ...state.hotelRules,
        startDate: actions.startDate,
        endDate: actions.endDate,
        total_night: actions.total_night,
      },
    };
  } else if (actions.type === 'setPerson') {
    // console.log(2);

    return {
      ...state,
      hotelRules: {
        ...state.hotelRules,
        adult: actions.adult < 1 ? 1 : actions.adult > 8 ? 8 : actions.adult,
        children:
          actions.children < 0
            ? 0
            : actions.children > 8
            ? 8
            : actions.children,
        baby: actions.baby < 0 ? 0 : actions.baby > 8 ? 8 : actions.baby,
      },
    };
  } else if (actions.type === 'locationHotel') {
    // console.log(actions.data);
    return {
      ...state,
      hotelRules: {
        ...state.hotelRules,
        location: actions.data,
      },
    };
  } else if (actions.type === 'selectedRoom') {
    return {
      ...state,
      selectedRoom: {
        id: actions.data.id,
        code: actions.data.code,
        floor: actions.data.floor,
        room_type: actions.data.room_type,
        descriptionKamar: actions.descriptionKamar,
      },
    };
  } else if (actions.type === 'resetState') {
    return (state = {
      ...state,
      hotelRules: {
        location: '',
        baby: 0,
        adult: 1,
        children: 0,
        startDate: Tomorrow,
        endDate: Tomorrow2,
        total_night: 1,
      },
      selectedRoom: {
        id: '',
        code: '',
        floor: '',
        room_type: '',
        descriptionKamar: '',
      },
    });
  } else {
    // console.log(3);

    return state;
  }
};

export default HotelReducers;
