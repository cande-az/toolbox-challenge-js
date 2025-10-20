import React from "react";
import { render, screen } from "@testing-library/react";
import FileCard from "./FileCard";

describe("FileCard", () => {
  const mockData = {
    fileName: "test1.csv",
    text: "Sample text",
    number: 12345,
    hex: "70ad29aacf0b690b0467fe2b2767f765",
  };

  test("renders all data fields correctly", () => {
    render(<FileCard data={mockData} index={0} />);

    expect(screen.getByText("test1.csv")).toBeInTheDocument();
    expect(screen.getByText("Sample text")).toBeInTheDocument();
    expect(screen.getByText("12345")).toBeInTheDocument();
    expect(
      screen.getByText("70ad29aacf0b690b0467fe2b2767f765")
    ).toBeInTheDocument();
  });

  test("renders field labels correctly", () => {
    render(<FileCard data={mockData} index={0} />);

    expect(screen.getByText("File Name")).toBeInTheDocument();
    expect(screen.getByText("Text")).toBeInTheDocument();
    expect(screen.getByText("Number")).toBeInTheDocument();
    expect(screen.getByText("Hex")).toBeInTheDocument();
  });

  test("renders card with correct structure", () => {
    render(<FileCard data={mockData} index={0} />);

    expect(screen.getByText("test1.csv")).toBeInTheDocument();
    expect(screen.getByText("Sample text")).toBeInTheDocument();
    expect(screen.getByText("12345")).toBeInTheDocument();
    expect(
      screen.getByText("70ad29aacf0b690b0467fe2b2767f765")
    ).toBeInTheDocument();
  });

  test("renders hex value with correct classes for text breaking", () => {
    render(<FileCard data={mockData} index={0} />);

    const hexElement = screen.getByText("70ad29aacf0b690b0467fe2b2767f765");
    expect(hexElement).toHaveClass("fw-normal", "small", "text-break");
  });

  test("handles different data types correctly", () => {
    const dataWithDifferentTypes = {
      fileName: "file2.csv",
      text: "Another text",
      number: 0,
      hex: "a1b2c3d4e5f6789012345678901234ab",
    };

    render(<FileCard data={dataWithDifferentTypes} index={2} />);

    expect(screen.getByText("file2.csv")).toBeInTheDocument();
    expect(screen.getByText("Another text")).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
    expect(
      screen.getByText("a1b2c3d4e5f6789012345678901234ab")
    ).toBeInTheDocument();
  });
});
