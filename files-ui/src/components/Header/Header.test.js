import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Header", () => {
  test("renders title and description correctly", () => {
    render(<Header />);

    expect(screen.getByText("React Test App")).toBeInTheDocument();

    expect(
      screen.getByText("Manage and filter your CSV files")
    ).toBeInTheDocument();

    expect(screen.getByText("📁")).toBeInTheDocument();
  });

  test("has correct header structure", () => {
    render(<Header />);

    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass(
      "header-gradient",
      "text-white",
      "text-center",
      "py-4",
      "mb-4"
    );
  });
});
