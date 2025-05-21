import React from "react";
import { render, screen } from "@testing-library/react";

import PackagesPage from "../PackagesPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders packages page", async () => {
  const store = init({ models });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <PackagesPage />
      </MemoryRouter>
    </Provider>,
  );
  expect(screen.getByRole("packages-datatable")).toBeInTheDocument();
  expect(screen.getByRole("packages-add-button")).toBeInTheDocument();
});
