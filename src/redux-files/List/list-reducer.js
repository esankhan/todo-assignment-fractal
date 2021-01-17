import {
  ADD_BUCKET,
  ADD_TASK,
  SET_ERROR,
  UNSET_ERROR,
  DELETE_BUCKET,
} from "./list-action-type";

export const INITIAL_STATE = {
  Buckets: [
    {
      bucketId: "General_bucket",
      bucketName: "General",
      list: [
        {
          listId: "test_1",
          listTitle: "This is an active task-test",
          isActive: true,
        },
        {
          listId: "test_2",
          listTitle: "This is an inActive Task test",
          isActive: false,
        },
      ],
    },
  ],
  isError: false,
  errorText: "",
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_BUCKET:
      return {
        ...state,
        Buckets: [...state.Buckets, action.payload],
      };
    case ADD_TASK:
      return {
        ...state,
        Buckets: [...action.payload],
      };
    case DELETE_BUCKET:
      return {
        ...state,
        Buckets: [...action.payload],
      };
    case SET_ERROR:
      return {
        ...state,
        isError: true,
        errorText: action.payload,
      };
    case UNSET_ERROR:
      return {
        ...state,
        isError: false,
        errorText: "",
      };
    default:
      return state;
  }
};

export default reducer;
