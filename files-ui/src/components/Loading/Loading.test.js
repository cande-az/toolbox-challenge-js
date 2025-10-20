import React from "react";
import { render, screen } from "@testing-library/react";
import Loading from "./Loading";

describe("Loading", () => {
  test("renders spinner and loading text", () => {
    render(<Loading />);

    const spinner = screen.getByRole("status");
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass("spinner-border");

    expect(screen.getByText("Loading files data...")).toBeInTheDocument();

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("has correct container structure", () => {
    render(<Loading />);

    expect(screen.getByText("Loading files data...")).toBeInTheDocument();
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  test("spinner has correct animation and classes", () => {
    render(<Loading />);

    const spinner = screen.getByRole("status");
    expect(spinner).toHaveClass("spinner-border", "mb-3", "spinner-brand");
  });
});
