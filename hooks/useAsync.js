import { useEffect } from "react";
import { useReducer } from "react";
import { useState } from "react";

export const TYPE_LOAD = {
  IDLE: "IDLE",
  LOADING: "LOADING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
  RETRY: "RETRY",
};

const asyncReducer = (state, action) => {
  switch (action.type) {
    case "IDLE":
      return {
        ...state,
        status: TYPE_LOAD.IDLE,
      };
    case "LOADING":
      return {
        ...state,
        status: TYPE_LOAD.LOADING,
      };
    case "SUCCESS":
      return {
        ...state,
        status: TYPE_LOAD.SUCCESS,
      };
    case "ERROR":
      return {
        ...state,
        status: TYPE_LOAD.ERROR,
      };
    case "RETRY":
      return {
        ...state,
        status: TYPE_LOAD.RETRY,
      };
    default:
      return state;
  }
};
const intialState = {
  data: null,
  status: TYPE_LOAD.IDLE,
};

export function useAsync(callback, depth = []) {
  const [state, dispatch] = useReducer(asyncReducer, intialState);

  useEffect(() => {
    console.log("useAsync 실행됨");
    fetchData();
  }, depth);

  const fetchData = async () => {
    try {
      dispatch({ type: TYPE_LOAD.LOADING, ...state });
      const result = await callback();
      dispatch({ type: TYPE_LOAD.IDLE, data: result, ...state });
    } catch (error) {
      console.error(error);
      dispatch({ type: TYPE_LOAD.ERROR, ...state });
    }
  };

  return [state, dispatch];
}
