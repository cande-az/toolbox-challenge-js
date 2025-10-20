import {
  FETCH_FILES_REQUEST,
  FETCH_FILES_SUCCESS,
  FETCH_FILES_FAILURE,
  FETCH_FILES_LIST_SUCCESS,
  SET_FILE_FILTER,
  SET_SELECTED_FILE,
  CLEAR_ERROR,
} from "./actionTypes";

// Action creators síncronos simples
export const fetchFilesRequest = () => ({
  type: FETCH_FILES_REQUEST,
});

export const fetchFilesSuccess = (data) => ({
  type: FETCH_FILES_SUCCESS,
  payload: data,
});

export const fetchFilesFailure = (error) => ({
  type: FETCH_FILES_FAILURE,
  payload: error,
});

export const setFileFilter = (filter) => ({
  type: SET_FILE_FILTER,
  payload: filter,
});

export const fetchFilesListSuccess = (files) => ({
  type: FETCH_FILES_LIST_SUCCESS,
  payload: files,
});

export const setSelectedFile = (fileName) => ({
  type: SET_SELECTED_FILE,
  payload: fileName,
});

export const clearError = () => ({
  type: CLEAR_ERROR,
});
