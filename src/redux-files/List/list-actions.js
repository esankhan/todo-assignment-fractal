import {
  ADD_BUCKET,
  ADD_TASK,
  SET_ERROR,
  UNSET_ERROR,
  DELETE_BUCKET,
} from "./list-action-type";

const addBucket = (data) => {
  return {
    type: ADD_BUCKET,
    payload: data,
  };
};

const addTask = (data) => {
  return {
    type: ADD_TASK,
    payload: data,
  };
};

const setError = (data) => {
  return {
    type: SET_ERROR,
    payload: data,
  };
};

export const unsetError = (data) => {
  return {
    type: UNSET_ERROR,
  };
};

const deleteBucket = (data) => {
  return {
    type: DELETE_BUCKET,
    payload: data,
  };
};

//thunk functions===
export const addBucketThunk = (data) => {
  return (dispatch, getState) => {
    let state = getState();
    let listOfBuckets = state.reducer.Buckets;
    let ifExist = listOfBuckets.findIndex((item) => item.bucketName === data);
    if (ifExist === -1) {
      let newBucket = {
        bucketId: "" + new Date(),
        bucketName: data,
        list: [],
      };
      dispatch(addBucket(newBucket));
    } else {
      dispatch(setError("Bucket already Exist"));
    }
  };
};

export const addTaskThunk = ({ taskText, value }) => {
  return (dispatch, getState) => {
    let state = getState();
    let listOfBuckets = state.reducer.Buckets;
    let bucket = listOfBuckets.find((element) => element.bucketName === value);
    let bucketIndex = listOfBuckets.findIndex(
      (element) => element.bucketName === value
    );
    let newTask = {
      listId: "" + new Date(),
      listTitle: taskText,
      isActive: true,
    };
    bucket.list.push(newTask);
    listOfBuckets.splice(bucketIndex, 1, bucket);
    console.log(listOfBuckets);
    dispatch(addTask(listOfBuckets));
  };
};

export const DeleteBucketThunk = (value) => {
  //console.log(value);
  return (dispatch, getState) => {
    let state = getState();
    let listOfBuckets = state.reducer.Buckets;
    let newBuckets = listOfBuckets.filter(
      (element) => element.bucketName !== value
    );
    console.log(newBuckets);
    dispatch(deleteBucket(newBuckets));
  };
};

export const completeTaskThunk = ({ title, value }) => {
  return (dispatch, getState) => {
    let state = getState();
    let listOfBuckets = state.reducer.Buckets;
    let bucket = listOfBuckets.find((element) => element.bucketName === value);
    let bucketIndex = listOfBuckets.findIndex(
      (element) => element.bucketName === value
    );
    //console.log(bucketIndex);
    let newList = listOfBuckets[bucketIndex].list.find(
      (element) => element.listTitle === title
    );

    let newListIndex = listOfBuckets[bucketIndex].list.findIndex(
      (element) => element.listTitle === title
    );
    console.log(newListIndex);
    newList.isActive = !newList.isActive;
    // bucket.list.push(newTask);
    listOfBuckets[bucketIndex].list.splice(newListIndex, 1, newList);
    dispatch(addTask(listOfBuckets));
  };
};
