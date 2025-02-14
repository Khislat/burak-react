import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";

const selectProductsPage = (state: AppRootState) => state.productsPage;

export const retriveRestaurant = createSelector(
	selectProductsPage,
	(ProductsPage) => ProductsPage.restaurant
);
export const retriveChosenProduct = createSelector(
	selectProductsPage,
	(ProductsPage) => ProductsPage.chosenProduct
);
export const retriveProducts = createSelector(
	selectProductsPage,
	(ProductsPage) => ProductsPage.products
);
