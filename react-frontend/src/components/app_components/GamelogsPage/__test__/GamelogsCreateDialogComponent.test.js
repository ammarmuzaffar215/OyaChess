import React from "react";
import { render, screen } from "@testing-library/react";

import GamelogsCreateDialogComponent from "../GamelogsCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders gamelogs create dialog", async () => {
  const store = init({ models });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <GamelogsCreateDialogComponent show={true} />
      </MemoryRouter>
    </Provider>,
  );
  expect(
    screen.getByRole("gamelogs-create-dialog-component"),
  ).toBeInTheDocument();
});
