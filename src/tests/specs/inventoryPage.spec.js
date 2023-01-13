import { test, expect } from "@playwright/test";
const { InventoryPage } = require('../pageobjects/inventoryPage');

let inventoryPage;

test.beforeEach(async ({ page }) => {
  inventoryPage = new InventoryPage(page);
  await inventoryPage.gotoURL();
  await inventoryPage.login('standard_user', 'secret_sauce');
});

test("Should contain products list, burger menu and filter", async({ page }) => {
  await inventoryPage.getProductsList();
  await inventoryPage.getBurgerMenuButton();
  await inventoryPage.getBurgerMenuList();
  await inventoryPage.getFilterBar();
  });

test("Should be able to filter products in product list", async({ page }) => {
  await inventoryPage.getAtoZFilter();
  await inventoryPage.getZtoAFilter();
  await inventoryPage.getLowToHighFilter();
  await inventoryPage.getHighToLowFilter();
});
