import {
  CLUB_LIST_REQUEST,
  CLUB_LIST_SUCCESS,
  CLUB_LIST_FAIL,
} from '../constants/clubConstants';

export const clubListReducer = (state = { clubs: [] }, action) => {
  switch (action.type) {
    case CLUB_LIST_REQUEST:
      return { loading: true, clubs: [] };
    case CLUB_LIST_SUCCESS:
      return { loading: false, clubs: action.payload };
    case CLUB_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
