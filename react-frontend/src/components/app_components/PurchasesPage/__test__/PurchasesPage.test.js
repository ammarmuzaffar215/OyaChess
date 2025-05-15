import React from "react";
import { render, screen } from "@testing-library/react";

import PurchasesPage from "../PurchasesPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders purchases page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <PurchasesPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("purchases-datatable")).toBeInTheDocument();
    expect(screen.getByRole("purchases-add-button")).toBeInTheDocument();
});
