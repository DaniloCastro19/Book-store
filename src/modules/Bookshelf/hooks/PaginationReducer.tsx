import { useCallback, useReducer } from "react";

type PaginationState = {
  page: number;
};

type PaginationAction =
  | {
      type: "NEXT_PAGE";
    }
  | {
      type: "PREV_PAGE";
    }
  | {
      type: "RESET_PAGE";
    }
  | {
      type: "SET_PAGE";
      payload: number;
    }

function paginationReducer(
  state: PaginationState,
  action: PaginationAction,
): PaginationState {
  switch (action.type) {
    case "NEXT_PAGE":
      return { page: state.page + 1 };
    case "PREV_PAGE":
      return { page: Math.max(0, state.page - 1) };
    case "RESET_PAGE":
      return { page: 0 };
    case "SET_PAGE":
      return { page: Math.max(0, action.payload) };
    default:
      return state;
  }
}

const initialState: PaginationState = {
  page: 0,
};

export function usePagination () {
  const [state, dispatch] = useReducer(paginationReducer, initialState);
  const nextPage = useCallback(() => {
    dispatch({ type: "NEXT_PAGE" });
  }, []);

  const prevPage = useCallback(() => {
    dispatch({ type: "PREV_PAGE" });
  }, []);

  const setPage = useCallback((page: number) => {
    dispatch({ type: "SET_PAGE", payload: page });
  }, []);

  const resetPage = useCallback(() => {
    dispatch({ type: "RESET_PAGE" });
  }, []);

  return {
    page: state.page,
    nextPage,
    prevPage,
    setPage,
    resetPage,
  };
}
