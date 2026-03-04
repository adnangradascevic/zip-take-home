import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App.jsx";
import { formatUsd } from "./utils/formatUsd.js";

describe("formatUsd", () => {
  it("formats USD currency", () => {
    expect(formatUsd(49)).toBe("$49.00");
  });
});

describe("App purchase widget", () => {
  it("renders initial subtotal for qty=1", () => {
    render(<App />);
    expect(screen.getByTestId("subtotal").textContent).toBe("$49.00");
  });

  it("increases quantity and updates subtotal", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /increase/i }));
    expect(screen.getByTestId("subtotal").textContent).toBe("$98.00");
  });

  it("does not go below 1", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /decrease/i }));
    expect(screen.getByTestId("subtotal").textContent).toBe("$49.00");
  });
});
