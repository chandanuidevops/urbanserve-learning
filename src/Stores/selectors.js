import { createSelector } from 'reselect'

const selectToken = (state)=>state.AuthReducer.token;

export {selectToken}
