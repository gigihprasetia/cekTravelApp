const initialUser = {
  isAuthenticated: {
    token: '',
  },
  dataUser: {
    statusUser: false,
    data: {},
  },
};

export const UserReducers = (state = initialUser, actions) => {
  if (actions.type === 'auth') {
    return {
      ...state,
      isAuthenticated: {
        token: actions.data,
      },
    };
  } else if (actions.type === 'setUserData') {
    return {
      ...state,
      dataUser: {
        statusUser: true,
        data: actions.data,
      },
    };
  } else if (actions.type === 'revoke') {
    return {
      isAuthenticated: {
        token: '',
      },
      dataUser: {
        statusUser: false,
        data: {},
      },
    };
  } else {
    return state;
  }
};

export default UserReducers;
