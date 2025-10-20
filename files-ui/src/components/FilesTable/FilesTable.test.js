import React from "react";
import { render, screen } from "@testing-library/react";
import FilesTable from "./FilesTable";

describe("FilesTable", () => {
  const mockData = [
    {
      fileName: "test1.csv",
      text: "Sample text 1",
      number: 12345,
      hex: "70ad29aacf0b690b0467fe2b2767f765",
    },
    {
      fileName: "test2.csv",
      text: "Sample text 2",
      number: 67890,
      hex: "a1b2c3d4e5f6789012345678901234ab",
    },
  ];

  test('shows "No data available" alert when data is empty', () => {
    render(<FilesTable data={[]} />);

    expect(screen.getByText("No data available")).toBeInTheDocument();
    expect(
      screen.getByText("No files data found. Please try again later.")
    ).toBeInTheDocument();
  });

  test('shows "No data available" alert when data is null', () => {
    render(<FilesTable data={null} />);

    expect(screen.getByText("No data available")).toBeInTheDocument();
    expect(
      screen.getByText("No files data found. Please try again later.")
    ).toBeInTheDocument();
  });

  test('shows "No data available" alert when data is undefined', () => {
    render(<FilesTable data={undefined} />);

    expect(screen.getByText("No data available")).toBeInTheDocument();
    expect(
      screen.getByText("No files data found. Please try again later.")
    ).toBeInTheDocument();
  });

  test("renders table with data correctly", () => {
    render(<FilesTable data={mockData} />);

    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();
    expect(table).toHaveClass("table", "table-brand", "mb-0");
  });

  test("renders table headers correctly", () => {
    render(<FilesTable data={mockData} />);

    expect(screen.getByText("File Name")).toBeInTheDocument();
    expect(screen.getByText("Text")).toBeInTheDocument();
    expect(screen.getByText("Number")).toBeInTheDocument();
    expect(screen.getByText("Hex")).toBeInTheDocument();
  });

  test("renders table rows with correct data", () => {
    render(<FilesTable data={mockData} />);

    expect(screen.getByText("test1.csv")).toBeInTheDocument();
    expect(screen.getByText("Sample text 1")).toBeInTheDocument();
    expect(screen.getByText("12345")).toBeInTheDocument();
    expect(
      screen.getByText("70ad29aacf0b690b0467fe2b2767f765")
    ).toBeInTheDocument();

    expect(screen.getByText("test2.csv")).toBeInTheDocument();
    expect(screen.getByText("Sample text 2")).toBeInTheDocument();
    expect(screen.getByText("67890")).toBeInTheDocument();
    expect(
      screen.getByText("a1b2c3d4e5f6789012345678901234ab")
    ).toBeInTheDocument();
  });

  test("renders ResultsCounter with correct count", () => {
    render(<FilesTable data={mockData} />);

    expect(screen.getByText("Showing 2 results")).toBeInTheDocument();
  });

  test("has correct table structure and classes", () => {
    render(<FilesTable data={mockData} />);

    const table = screen.getByRole("table");
    expect(table).toHaveClass("table", "table-brand", "mb-0");
  });

  test("renders single row correctly", () => {
    const singleRowData = [mockData[0]];
    render(<FilesTable data={singleRowData} />);

    expect(screen.getByText("test1.csv")).toBeInTheDocument();
    expect(screen.getByText("Sample text 1")).toBeInTheDocument();
    expect(screen.getByText("12345")).toBeInTheDocument();
    expect(
      screen.getByText("70ad29aacf0b690b0467fe2b2767f765")
    ).toBeInTheDocument();

    expect(screen.getByText("Showing 1 result")).toBeInTheDocument();
  });
});
