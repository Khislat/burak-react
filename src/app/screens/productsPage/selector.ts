import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";

const selectProductsPage = (state: AppRootState) => state.productsPage;

export const retriveRestaurant = createSelector(
	selectProductsPage,
	(productsPage) => productsPage.restaurant
);
export const retriveChosenProduct = createSelector(
	selectProductsPage,
	(productsPage) => productsPage.chosenProduct
);
export const retriveProducts = createSelector(
	selectProductsPage,
	(productsPage) => productsPage.products
);
