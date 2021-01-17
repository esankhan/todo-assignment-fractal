import { createSelector } from "reselect";
//import { INITIAL_STATE } from "./list-reducer";
//const buckets = (state) =>
// state && state.Buckets ? state.Buckets : INITIAL_STATE;
const buckets = (state) => state.reducer;
console.log(buckets);
export const getAllBuckets = createSelector(buckets, (state) => state.Buckets);
export const getIsError = createSelector(buckets, (state) => state.isError);
export const getErrorText = createSelector(buckets, (state) => state.errorText);
