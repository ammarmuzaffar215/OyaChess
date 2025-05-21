import React from "react";
import { render, screen } from "@testing-library/react";

import MaterialsPage from "../MaterialsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders materials page", async () => {
  const store = init({ models });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <MaterialsPage />
      </MemoryRouter>
    </Provider>,
  );
  expect(screen.getByRole("materials-datatable")).toBeInTheDocument();
  expect(screen.getByRole("materials-add-button")).toBeInTheDocument();
});
