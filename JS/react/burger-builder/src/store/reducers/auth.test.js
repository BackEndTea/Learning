import authReducer, {initialState} from './auth'
import * as actionTypes  from "../actions/actionTypes";

describe('authReducer', () => {
  it('should return the intial state', () => {
    expect(authReducer(undefined, {})).toEqual(initialState);
    expect(authReducer(initialState, {
      type:actionTypes.AUTH_SUCCESS,
      idToken: 'some-token',
      userId: 'some-user-id',
    })).toEqual({
      token: 'some-token',
      userId: 'some-user-id',
      error: null,
      loading: false,
      authRedirectPath: '/',
    });
  });
});
