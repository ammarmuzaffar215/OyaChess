import React from "react";
import { render, screen } from "@testing-library/react";

import PuzzlesPage from "../PuzzlesPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders puzzles page", async () => {
  const store = init({ models });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <PuzzlesPage />
      </MemoryRouter>
    </Provider>,
  );
  expect(screen.getByRole("puzzles-datatable")).toBeInTheDocument();
  expect(screen.getByRole("puzzles-add-button")).toBeInTheDocument();
});
