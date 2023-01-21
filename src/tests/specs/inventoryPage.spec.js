import { test, expect } from "@playwright/test";
const { InventoryPage } = require('../pageobjects/inventoryPage');

let inventoryPage;

test.setTimeout(60000);

test.beforeEach(async ({ page }) => {
 inventoryPage = new InventoryPage(page);
  await inventoryPage.gotoURL();
  await inventoryPage.login('standard_user', 'secret_sauce');
});

test("Should contain products list, burger menu and filter", async({ page }) => {
  await inventoryPage.getProductsList();
  await inventoryPage.getProductsListAddToCartButtons();
  await inventoryPage.getBurgerMenuButton();
  await inventoryPage.getBurgerMenuList();
  await inventoryPage.getFilterBar();
  });

test("Should be able to filter products in product list", async({ page }) => {
  await inventoryPage.getAscendingFilter();
  await inventoryPage.getDescendingFilter();
  await inventoryPage.getLowToHighFilter();
  await inventoryPage.getHighToLowFilter();
});

test("Footer should have icons with social network links", async({ page }) => {
  await inventoryPage.getFooterLinks();
});

test("Should be able to add product to cart by pressing on [Add to cart] button", async({ page }) => {
  await inventoryPage.addProductsToShoppingCart();
});

test('Should be able to delete product from the shopping cart', async({ page }) => {
  await inventoryPage.removeProductsFromShoppingCart();
  })

test.only('Should be able to order the product', async({ page }) => {
  await inventoryPage.getProductFromProductList();
  await inventoryPage.orderProduct();
})