import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ErrorMessage from "./ErrorMessage";

describe("ErrorMessage", () => {
  test("renders error message correctly", () => {
    const errorMessage = "Network error occurred";
    render(<ErrorMessage error={errorMessage} />);

    expect(screen.getByText("Error loading data")).toBeInTheDocument();

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  test("renders retry button when onRetry is provided", () => {
    const mockOnRetry = jest.fn();
    const errorMessage = "Test error";

    render(<ErrorMessage error={errorMessage} onRetry={mockOnRetry} />);

    const retryButton = screen.getByText("Try Again");
    expect(retryButton).toBeInTheDocument();
    expect(retryButton).toHaveClass("btn", "btn-outline-danger", "btn-sm");
  });

  test("does not render retry button when onRetry is not provided", () => {
    const errorMessage = "Test error";

    render(<ErrorMessage error={errorMessage} />);

    expect(screen.queryByText("Try Again")).not.toBeInTheDocument();
  });

  test("calls onRetry when retry button is clicked", () => {
    const mockOnRetry = jest.fn();
    const errorMessage = "Test error";

    render(<ErrorMessage error={errorMessage} onRetry={mockOnRetry} />);

    const retryButton = screen.getByText("Try Again");
    fireEvent.click(retryButton);

    expect(mockOnRetry).toHaveBeenCalledTimes(1);
  });

  test("has correct alert structure and classes", () => {
    const errorMessage = "Test error";

    render(<ErrorMessage error={errorMessage} />);

    const alert = screen.getByRole("alert");
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveClass(
      "alert",
      "alert-danger",
      "text-center",
      "alert-brand"
    );
  });
});
