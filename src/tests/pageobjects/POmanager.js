const { InventoryPage } = require('./inventoryPage');
const { LoginPage } = require('./loginPage')

class POmanager {
  constructor(page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.inventoryPage = new InventoryPage(this.page)
  }

  getLoginPage() {
    return this.loginPage
  }

  getInventoryPage() {
    return this.inventoryPage
  }
}

module.exports = {POmanager};