const { expect } = require('@playwright/test');

export class InventoryPage {
  constructor(page) {
    this.page = page;
    this.userNameTxt = '#user-name';
    this.passwordTxt = '#password';
    this.loginButton = '#login-button';
    this.filterBar = page.locator('.product_sort_container');
  }

  async gotoURL() {
    await Promise.all(
      [
        this.page.waitForTimeout(5000),
      ]
    );
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(username, password) {
    await this.page.fill(this.userNameTxt, username);
    await this.page.fill(this.passwordTxt, password);
    await Promise.all(
      [
        this.page.waitForNavigation(),
        this.page.click("#login-button"),
      ]
    );
  }

  async getProductsList() {
    await this.page.waitForSelector('.inventory_list');
    const products = await this.page.$eval('.inventory_list', 
      navElm => {
        let name = []
        let price = []
        let itemPrice = navElm.getElementsByClassName("inventory_item_price");
        let alt = navElm.getElementsByTagName("img");
        for (let item of alt) {
          name.push(item.alt);
        }

        for (let item of itemPrice) {
          price.push(item.innerText);
        }

        return Object.assign(...name.map((n, i) => ({ [n]: price[i] })));
      })
    console.log('products --->>>>', products);
  }

  async getProductsListAddToCartButtons() {
    await this.page.waitForSelector('.inventory_list');
    const itemButton = await this.page.$eval('.inventory_list', 
      navElm => {
        let itemText = []
        let name = []
        let itemButton = navElm.getElementsByTagName("button");

        for (let item of itemButton) {
          name.push(item.name);
        }

        for (let item of itemButton) {
          itemText.push(item.innerText);
        }

        return Object.assign(...name.map((n, i) => ({ [n]: itemText[i] })));
      })
    console.log('Add to cart buttons --->>>>', itemButton);
  }

  async getBurgerMenuButton() {
    await expect(this.page.locator('.bm-burger-button')).toBeVisible();
    await expect(this.page.locator('.bm-menu-wrap')).toHaveAttribute('aria-hidden', 'true');
    await this.page.locator('.bm-burger-button').click();
    await expect(this.page.locator('.bm-menu-wrap')).toHaveAttribute('aria-hidden', 'false');
    await expect(this.page.locator(".bm-menu")).toBeVisible();
  }

  async getBurgerMenuList() {
    await this.page.waitForSelector('.bm-item-list');
    const productsBurgerMenu = await this.page.$eval('.bm-item-list', 
      navElm => {
        let title = []
        let url = []
        let titleInList = navElm.getElementsByTagName("a");
        for (let item of titleInList) {
          title.push(item.innerText);
        }

        for (let item of titleInList) {
          url.push(item.href);
        }

        return Object.assign(...title.map((n, i) => ({ [n]: url[i] })));
      })
    console.log('products list in burger menu --->>>>', productsBurgerMenu);

    await this.page.waitForSelector('//nav[@class="bm-item-list"]/a');
    await expect(this.page.locator("//nav[@class='bm-item-list']/a")).toContainText(['All Items', 'About', 'Logout', 'Reset App State']);
    await this.page.waitForSelector("#react-burger-cross-btn");
    await this.page.locator('#react-burger-cross-btn').click();
    await expect(this.page.locator('.bm-menu-wrap')).toHaveAttribute('aria-hidden', 'true');
  }

  async getFilterBar() {
    await expect(this.page.locator('//select[@class="product_sort_container"]/option')).toContainText([
      'Name (A to Z)', 
      'Name (Z to A)', 
      'Price (low to high)', 
      'Price (high to low)'
    ]);
  }

  async getAtoZFilter() {
    await this.page.locator('.product_sort_container').selectOption('az');
    await this.page.waitForSelector('.inventory_list');
    const azFiltered = await this.page.$eval('.inventory_list', 
      navElm => {
        let name = []
        let productName = navElm.getElementsByClassName("inventory_item_name");

        for (let item of productName) {
          name.push(item.innerText);
        }

        return Object.assign(...name.map((n, i) => ({ [n]: [i] })));
      })
    console.log('A-z filtered list --->>>>', azFiltered);

    await expect(this.page.locator("//div[@class='inventory_list']/div[@class='inventory_item']//div[@class='inventory_item_name']")).toContainText([
      'Sauce Labs Backpack', 
      'Sauce Labs Bike Light', 
      'Sauce Labs Bolt T-Shirt', 
      'Sauce Labs Fleece Jacket',
      'Sauce Labs Onesie', 
      'Test.allTheThings() T-Shirt (Red)'
    ]);
  }

  async getZtoAFilter() {
    await this.page.locator('.product_sort_container').selectOption('za');
    await this.page.waitForSelector('.inventory_list');
    const zaFiltered = await this.page.$eval('.inventory_list', 
      navElm => {
        let name = []
        let productName = navElm.getElementsByClassName("inventory_item_name");

        for (let item of productName) {
          name.push(item.innerText);
        }

        return Object.assign(...name.map((n, i) => ({ [n]: [i] })));
      })
    console.log('Z-a filtered list --->>>>', zaFiltered);

    await expect(this.page.locator("//div[@class='inventory_list']/div[@class='inventory_item']//div[@class='inventory_item_name']")).toContainText([
      'Test.allTheThings() T-Shirt (Red)', 
      'Sauce Labs Onesie', 
      'Sauce Labs Fleece Jacket', 
      'Sauce Labs Bolt T-Shirt', 
      'Sauce Labs Bike Light',
      'Sauce Labs Backpack'
    ]);
  }

  async getLowToHighFilter() {
    await this.page.locator('.product_sort_container').selectOption('lohi');
    await this.page.waitForSelector('.inventory_list');
    const lowToHigh = await this.page.$eval('.inventory_list', 
      navElm => {
        let name = []
        let price = []
        let itemPrice = navElm.getElementsByClassName("inventory_item_price");
        let alt = navElm.getElementsByTagName("img");
        for (let item of alt) {
          name.push(item.alt);
        }

        for (let item of itemPrice) {
          price.push(item.innerText);
        }

        return Object.assign(...name.map((n, i) => ({ [n]: price[i] })));
      })
    console.log('Low to high filtered --->>>>', lowToHigh);
 
    await expect(this.page.locator("//div[@class='inventory_list']/div[@class='inventory_item']//div[@class='inventory_item_price']")).toContainText([
      '$7.99', 
      '$9.99', 
      '$15.99', 
      '$15.99', 
      '$29.99',
      '$49.99'
    ]);
  }

  async getHighToLowFilter() {
    await this.page.locator('.product_sort_container').selectOption('hilo');
    await this.page.waitForSelector('.inventory_list');
    const highToLow = await this.page.$eval('.inventory_list', 
      navElm => {
        let name = []
        let price = []
        let itemPrice = navElm.getElementsByClassName("inventory_item_price");
        let alt = navElm.getElementsByTagName("img");
        for (let item of alt) {
          name.push(item.alt);
        }

        for (let item of itemPrice) {
          price.push(item.innerText);
        }

        return Object.assign(...name.map((n, i) => ({ [n]: price[i] })));
      })
    console.log('High to low filtered --->>>>', highToLow);
  
    await expect(this.page.locator("//div[@class='inventory_list']/div[@class='inventory_item']//div[@class='inventory_item_price']")).toContainText([
      '$49.99', 
      '$29.99', 
      '$15.99', 
      '$15.99', 
      '$9.99',
      '$7.99'
    ]);
  }

  async getFooterLinks() {
    await this.page.waitForSelector('.social');
    const socialNetworkLinks = await this.page.$eval('.social', 
      navElm => {
        let href = []
        let name = []
        let atag = navElm.getElementsByTagName("a");
        for (let item of atag) {
          href.push(item.innerText);
        }

        for (let item of atag) {
          name.push(item.href);
        }

        return Object.assign(...href.map((n, i) => ({ [n]: name[i] })));
      })
    console.log('Icons with social network links --->>>>', socialNetworkLinks);
    await expect(this.page.locator('//footer/img')).toHaveAttribute('src', '/static/media/SwagBot_Footer_graphic.2e87acec.png');
  }

  async addProductsToShoppingCart() {
    for (const button of await this.page.locator('//div[@class="pricebar"]/button').all())
  await button.click();
  await Promise.all(
    [
      this.page.waitForNavigation(),
      this.page.locator("//a[@class='shopping_cart_link']").click()
    ]
  );
  
  await expect(this.page).toHaveURL('https://www.saucedemo.com/cart.html');

  await this.page.waitForSelector('.cart_list');
  const cartItems = await this.page.$eval('.cart_list', 
    navElm => {
      let name = []
      let quantity = []
      let itemName = navElm.getElementsByClassName("inventory_item_name");
      let itemQuantity = navElm.getElementsByClassName('cart_quantity');
      for (let item of itemName) {
        name.push(item.innerText);
      }

      for (let item of itemQuantity) {
        quantity.push(item.innerText);
      }

      return Object.assign(...name.map((n, i) => ({ [n]: quantity[i] })));
    })
  console.log('Cart items quantity --->>>>', cartItems);
  }
}