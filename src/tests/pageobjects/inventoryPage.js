const { expect } = require('@playwright/test');

export class InventoryPage {
  constructor(page) {
    this.page = page;
    this.userNameTxt = '#user-name';
    this.passwordTxt = '#password';
    this.loginButton = '#login-button';
    this.filterBar = page.locator('.product_sort_container');
    this.cartIcon = page.locator('//span[@class="shopping_cart_badge"]');
    this.firstName = "#first-name";
    this.lastName = "#last-name";
    this.postalCode = "#postal-code";
  }

  async gotoURL() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(username, password) {
    await this.page.fill(this.userNameTxt, username);
    await this.page.fill(this.passwordTxt, password);
    await this.page.click("#login-button");
    
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

  async getAscendingFilter() {
    await this.page.waitForSelector('.product_sort_container');
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

  async getDescendingFilter() {
    await this.page.waitForSelector('.product_sort_container');
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
    await this.page.waitForSelector('.product_sort_container');
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
    await this.page.waitForSelector('.product_sort_container')
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
    await button.click()
 
  await expect(this.cartIcon).toHaveText("6");
  await Promise.all(
    [
      this.page.waitForNavigation(),
      this.page.locator("//a[@class='shopping_cart_link']").click()
    ]
  );
  
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

  async removeProductsFromShoppingCart() {
    for (const button of await this.page.locator('//div[@class="pricebar"]/button').all())
  await button.click();
  await expect(this.cartIcon).toHaveText("6");
  await Promise.all(
    [
      this.page.waitForURL('https://www.saucedemo.com/cart.html'),
      this.page.locator("//a[@class='shopping_cart_link']").click(),
    ]
  )
    
  await expect(this.cartIcon).toHaveText("6");
  
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
  console.log('Cart items name with quantity --->>>>', cartItems);
  
  const countAddedItems = await this.page.locator('//div[@class="cart_item"]').count();
  console.log("Total added items quantity -->>", countAddedItems);
  
  await this.page.locator('//*[@id="remove-sauce-labs-bike-light"]').click();
  await this.page.locator('//*[@id="remove-sauce-labs-backpack"]').click();
  await this.page.locator('//*[@id="remove-sauce-labs-bolt-t-shirt"]').click();
  await this.page.locator('//*[@id="remove-sauce-labs-fleece-jacket"]').click();
  await this.page.locator('//*[@id="remove-sauce-labs-onesie"]').click();
  await this.page.locator('//*[@id="remove-test.allthethings()-t-shirt-(red)"]').click();

  const countDeletedItems = await this.page.locator('//div[@class="removed_cart_item"]').count();
  console.log("Total deleted items quantity -->>", countDeletedItems);
  await expect(countDeletedItems).toBe(6);
  await expect(this.page.locator(".cart_item")).not.toBeVisible();
  await expect(this.cartIcon).not.toBeVisible();
  }

  async getProductFromProductList() {
    const productName = "Sauce Labs Onesie";
  const products = this.page.locator('//div[@class="inventory_item"]');
  const count = await products.count();

  for(let i = 0; i < count; ++i) {
   if(await products.nth(i).locator('//div[@class="inventory_item_name"]').textContent() === productName) {
    await products.nth(i).locator('//div[@class="pricebar"]/button').click();
    break;
   }
  }
  await expect(this.cartIcon).toHaveText("1");

  await Promise.all(
    [
      this.page.waitForURL('https://www.saucedemo.com/cart.html'),
      this.page.locator("//a[@class='shopping_cart_link']").click(),
    ]
  )
  
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
  console.log('Cart items name with quantity --->>>>', cartItems);
  const countAddedItems = await this.page.locator('//div[@class="cart_item"]').count();
  console.log("Total added items quantity -->>", countAddedItems);
  expect(countAddedItems).toBe(1);
  

  }

  async orderProduct() {
    const checkoutButton = await this.page.locator("#checkout");
    await expect(this.page.locator('.inventory_item_price')).toHaveText('$7.99');
    checkoutButton.click();
    await expect(this.page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
    await expect(this.page.locator('//button[@id="cancel"]')).toHaveText('Cancel');
    let cancelButton = await this.page.evaluate(
      () => document.getElementById('cancel').innerText
    )
    expect(cancelButton).toEqual('CANCEL')
    console.log("Cancel button on 'checkout-step-one' page-->>", cancelButton)
    await expect(this.page.locator('//input[@id="continue"]')).toHaveAttribute('type', 'submit');

    let continueButton = await this.page.evaluate(
      () => {
        const input = document.getElementById('continue')
        return input.getAttribute('name')
      }
    )
    expect(continueButton).toEqual('continue')
    console.log("Continue button on 'checkout-step-one' page-->>", continueButton)
    
    await this.page.fill(this.firstName, "Niko");
    await this.page.fill(this.lastName, "Someone");
    await this.page.fill(this.postalCode, "79035");
  
    await this.page.locator('//input[@id="continue"]').click();
    await expect(this.page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');

    await expect(this.page.locator('//button[@id="cancel"]')).toHaveText('Cancel');
    let cancelButton2 = await this.page.evaluate(
      () => document.getElementById('cancel').innerText
    )
    expect(cancelButton2).toEqual('CANCEL')
    console.log("Cancel button on 'checkout-step-two' page-->>", cancelButton2)

    let finishButton = await this.page.evaluate(
      () => document.getElementById('finish').innerText
    )
    expect(finishButton).toEqual('FINISH')
    console.log("Finish button on 'checkout-step-two' page-->>", finishButton)
    
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
  console.log('Cart items name with quantity --->>>>', cartItems);
  await expect(this.page.locator('.inventory_item_name')).toHaveText("Sauce Labs Onesie");
  const cartQuantity = await this.page.locator('.cart_quantity').innerText();
  expect(cartQuantity).toBe('1');
  await(expect(this.page.locator('.inventory_item_price'))).toHaveText('$7.99');

  const summaryInfo = await this.page.$eval('.summary_info', 
    navElm => {
      let itemPrice = []
      let taxPrice = []
      let totalPrice = []
      let price = navElm.getElementsByClassName("summary_subtotal_label");
      let tax = navElm.getElementsByClassName("summary_tax_label");
      let total = navElm.getElementsByClassName('summary_total_label');
      for (let item of price) {
        itemPrice.push(item.innerText);
      }

      for (let item of tax) {
        taxPrice.push(item.innerText);
      }

      for (let item of total) {
        totalPrice.push(item.innerText);
      }

    return Object.assign(...itemPrice.map((n, i) => ({ [n]: `${taxPrice[i]},  ${totalPrice[i]}` })));
  })
  console.log('Summary info --->>>>', summaryInfo);

  await this.page.locator("#finish").click();
  await expect(this.page).toHaveURL("https://www.saucedemo.com/checkout-complete.html");
  await expect(this.page.locator(".complete-header")).toHaveText('THANK YOU FOR YOUR ORDER');
  await expect (this.page.locator(".complete-text")).toHaveText(
    "Your order has been dispatched, and will arrive just as fast as the pony can get there!"
    );
  await expect(this.page.locator('//img[@class="pony_express"]')).toHaveAttribute("alt", 'Pony Express');
  await expect(this.page.locator("#back-to-products")).toHaveText("Back Home");
  await expect(this.page.locator("#back-to-products")).toBeVisible();
  }
}