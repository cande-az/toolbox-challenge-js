import {
  FETCH_FILES_REQUEST,
  FETCH_FILES_SUCCESS,
  FETCH_FILES_FAILURE,
  FETCH_FILES_LIST_SUCCESS,
  SET_FILE_FILTER,
  SET_SELECTED_FILE,
  CLEAR_ERROR,
} from "./actionTypes";

// Estado inicial
const initialState = {
  data: [],
  loading: false,
  error: null,
  filter: "",
  filesList: [],
  selectedFile: "",
};

// Reducer para manejar el estado de archivos
const filesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FILES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_FILES_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };

    case FETCH_FILES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case SET_FILE_FILTER:
      return {
        ...state,
        filter: action.payload,
      };

    case FETCH_FILES_LIST_SUCCESS:
      return {
        ...state,
        filesList: action.payload,
      };

    case SET_SELECTED_FILE:
      return {
        ...state,
        selectedFile: action.payload,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export default filesReducer;
