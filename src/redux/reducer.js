const initialState = {
    isLoggedIn: false,
    user: {}
}

const LOGGED_IN = 'LOGGED_IN';
const LOGGED_OUT = 'LOGGED_OUT';

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOGGED_IN:
           return {...state, isLoggedIn: true, user: action.payload};
        case LOGGED_OUT: 
            return {...state, isLoggedIn: false, user: {}};
        default:
            return state;
    }
}

export function loggedIn (user) {
    return {
        type: LOGGED_IN,
        payload: user
    }
}

export function loggedOut () {
    return {
        type: LOGGED_OUT
    }
}