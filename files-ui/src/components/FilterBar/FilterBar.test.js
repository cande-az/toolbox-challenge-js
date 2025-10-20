import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import FilterBar from "./FilterBar";

jest.mock("../../hooks/useQueryParams", () => ({
  useQueryParams: () => ({
    getQueryParam: jest.fn(() => null),
    setQueryParam: jest.fn(),
  }),
}));
const createMockStore = (initialState = {}) => {
  const defaultState = {
    files: {
      filesList: ["test1.csv", "test2.csv", "test3.csv"],
      selectedFile: null,
      ...initialState.files,
    },
  };

  const reducer = (state = defaultState, action) => {
    switch (action.type) {
      case "SET_SELECTED_FILE":
        return {
          ...state,
          files: {
            ...state.files,
            selectedFile: action.payload,
          },
        };
      default:
        return state;
    }
  };

  return createStore(reducer, defaultState);
};

const renderWithRedux = (component, { initialState = {} } = {}) => {
  const store = createMockStore(initialState);
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};

describe("FilterBar", () => {
  test("renders filter label and dropdown", () => {
    renderWithRedux(<FilterBar />);

    expect(screen.getByText("Filters:")).toBeInTheDocument();
    expect(screen.getByText("All files")).toBeInTheDocument();
  });

  test('shows "All files" as default when no file is selected', () => {
    renderWithRedux(<FilterBar />);

    const dropdownToggle = screen.getByText("All files");
    expect(dropdownToggle).toBeInTheDocument();
  });

  test("shows selected file name when a file is selected", () => {
    const initialState = {
      files: {
        filesList: ["test1.csv", "test2.csv", "test3.csv"],
        selectedFile: "test1.csv",
      },
    };

    renderWithRedux(<FilterBar />, { initialState });

    expect(screen.getByText("test1.csv")).toBeInTheDocument();
  });

  test("renders dropdown menu with all files when opened", () => {
    renderWithRedux(<FilterBar />);

    const dropdownToggle = screen.getByRole("button", { name: /all files/i });
    fireEvent.click(dropdownToggle);

    expect(screen.getAllByText("All files")).toHaveLength(2);
    expect(screen.getByText("test1.csv")).toBeInTheDocument();
    expect(screen.getByText("test2.csv")).toBeInTheDocument();
    expect(screen.getByText("test3.csv")).toBeInTheDocument();
  });

  test("has correct dropdown structure and classes", () => {
    renderWithRedux(<FilterBar />);

    const dropdownToggle = screen.getByText("All files");
    expect(dropdownToggle).toHaveClass(
      "btn",
      "btn-outline-primary",
      "btn-brand"
    );
    expect(dropdownToggle).toHaveAttribute("id", "file-filter-dropdown");
  });

  test("has correct container structure", () => {
    renderWithRedux(<FilterBar />);

    const container = screen.getByText("Filters:").closest(".row");
    expect(container).toHaveClass("row", "mb-4");

    const filterBar = container.querySelector(".filter-bar-brand");
    expect(filterBar).toBeInTheDocument();
  });

  test("handles empty files list gracefully", () => {
    const initialState = {
      files: {
        filesList: [],
        selectedFile: null,
      },
    };

    renderWithRedux(<FilterBar />, { initialState });

    expect(screen.getByText("All files")).toBeInTheDocument();

    const dropdownToggle = screen.getByRole("button", { name: /all files/i });
    fireEvent.click(dropdownToggle);

    expect(screen.getAllByText("All files")).toHaveLength(2);
  });

  test("dispatches action when file is selected", () => {
    const { store } = renderWithRedux(<FilterBar />);

    const dropdownToggle = screen.getByText("All files");
    fireEvent.click(dropdownToggle);

    const fileOption = screen.getByText("test1.csv");
    fireEvent.click(fileOption);

    const state = store.getState();
    expect(state.files.selectedFile).toBe("test1.csv");
  });

  test('dispatches action when "All files" is selected', () => {
    const initialState = {
      files: {
        filesList: ["test1.csv", "test2.csv", "test3.csv"],
        selectedFile: "test1.csv",
      },
    };

    const { store } = renderWithRedux(<FilterBar />, { initialState });

    const dropdownToggle = screen.getByText("test1.csv");
    fireEvent.click(dropdownToggle);

    const allFilesOption = screen.getByText("All files");
    fireEvent.click(allFilesOption);

    const state = store.getState();
    expect(state.files.selectedFile).toBe("");
  });
});
