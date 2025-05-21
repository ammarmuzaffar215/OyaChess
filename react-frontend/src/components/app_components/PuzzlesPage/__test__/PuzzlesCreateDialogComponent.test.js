import React from "react";
import { render, screen } from "@testing-library/react";

import PuzzlesCreateDialogComponent from "../PuzzlesCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders puzzles create dialog", async () => {
  const store = init({ models });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <PuzzlesCreateDialogComponent show={true} />
      </MemoryRouter>
    </Provider>,
  );
  expect(
    screen.getByRole("puzzles-create-dialog-component"),
  ).toBeInTheDocument();
});
