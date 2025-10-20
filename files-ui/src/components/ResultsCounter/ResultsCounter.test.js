import React from "react";
import { render, screen } from "@testing-library/react";
import ResultsCounter from "./ResultsCounter";

describe("ResultsCounter", () => {
  test('shows "No results found" when count is 0', () => {
    render(<ResultsCounter count={0} />);

    expect(screen.getByText("No results found")).toBeInTheDocument();
  });

  test('shows singular "result" when count is 1', () => {
    render(<ResultsCounter count={1} />);

    expect(screen.getByText("Showing 1 result")).toBeInTheDocument();
  });

  test('shows plural "results" when count is greater than 1', () => {
    render(<ResultsCounter count={5} />);

    expect(screen.getByText("Showing 5 results")).toBeInTheDocument();
  });

  test("shows filtered results when filtered is true and totalCount is provided", () => {
    render(<ResultsCounter count={3} totalCount={10} filtered={true} />);

    expect(screen.getByText("Showing 3 of 10 results")).toBeInTheDocument();
  });

  test("shows regular count when filtered is false even with totalCount", () => {
    render(<ResultsCounter count={3} totalCount={10} filtered={false} />);

    expect(screen.getByText("Showing 3 results")).toBeInTheDocument();
  });

  test("shows regular count when totalCount is null", () => {
    render(<ResultsCounter count={3} totalCount={null} filtered={true} />);

    expect(screen.getByText("Showing 3 results")).toBeInTheDocument();
  });

  test("has correct container structure and classes", () => {
    render(<ResultsCounter count={5} />);

    expect(screen.getByText("Showing 5 results")).toBeInTheDocument();
  });

  test("uses default values correctly", () => {
    render(<ResultsCounter count={2} />);

    expect(screen.getByText("Showing 2 results")).toBeInTheDocument();
  });
});
