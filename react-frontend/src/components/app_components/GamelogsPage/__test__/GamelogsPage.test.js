import React from "react";
import { render, screen } from "@testing-library/react";

import GamelogsPage from "../GamelogsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders gamelogs page", async () => {
  const store = init({ models });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <GamelogsPage />
      </MemoryRouter>
    </Provider>,
  );
  expect(screen.getByRole("gamelogs-datatable")).toBeInTheDocument();
  expect(screen.getByRole("gamelogs-add-button")).toBeInTheDocument();
});
