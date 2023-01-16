> ## TC#01
>
>> ### 'Homepage' has 'SwagLabs' title, username, password fields, submit button
>
> Preconditions:
>
> Go to https://www.saucedemo.com/
> 
> Steps:
> 
> 1. Pay attention that 'SwagLabs' title exists at the top of the page
>
> 2. Pay attention that field 'Username' exists and has 'Username' placeholder 
> 
> 3. Pay attention that field 'Password' exists and has 'Password' placeholder 
> 
> 4. Pay attention that submit button exists and has type="submit"
>
> Expected result:
> 
> 1. 'SwagLabs' title, username, password fields and button are existing on the 'Homepage'
> 
------------------------------------------------------------------------------------------
>
> ## TC#02
>
>> ### Should able to login with accepted credentials
>
> Test data:
>
>    username: Standard_user
>
>    password: secret_sauce
>
> Steps:
>
> 1. Go to https://www.saucedemo.com/
>
> 2. Fill 'Username' and 'Password' fields with test data
>
> 3. Click on [Login] button (button has 'Login' text)
>
> Expected result:
>
> 1. Sign in form closes - user is on 'inventory' page (https://www.saucedemo.com/inventory.html) - user successfully login.
>
------------------------------------------------------------------------------------------
>
> ## TC#03
>
>> ### Should not be able to login with not existing username & existing password - page shows error message
>
> Test data:
>
>    username: new_user
>
>    password: secret_sauce
>
> Steps:
>
> 1. Go to https://www.saucedemo.com/
>
> 2. Fill 'Username' and 'Password' fields with test data
>
> 3. Click on [Login] button (button has 'Login' text)
>
> Expected result:
>
> 1. Page shows error message 'Epic sadface: Username and password do not match any user in this service' - user unsuccessfully login.
>
------------------------------------------------------------------------------------------
>
> ## TC#04
>
>> ### Should not be able to login with not existing password & existing username - page shows error message
>
> Test data:
>
>    username: standard_user
>
>    password: password
>
> Steps:
>
> 1. Go to https://www.saucedemo.com/
>
> 2. Fill 'Username' and 'Password' fields with test data
>
> 3. Click on [Login] button (button has 'Login' text)
>
> Expected result:
>
> 1. Page shows error message 'Epic sadface: Username and password do not match any user in this service' - user unsuccessfully login.
>
------------------------------------------------------------------------------------------
>
> ## TC#05
>
>> ### Should not be able to login with blank password field & existing username - page shows error message
>
> Test data:
>
>    username: standard_user
>
> Steps:
>
> 1. Go to https://www.saucedemo.com/
>
> 2. Fill 'Username' field with test data
>
> 3. Leave 'Password' field blank
>
> 4. Click on [Login] button (button has 'Login' text)
>
> Expected result:
>
> 1. Page shows error message 'Epic sadface: Password is required' - user unsuccessfully login.
>
------------------------------------------------------------------------------------------
>
> ## TC#06
>
>> ### Should not be able to login with blank username field & existing password- page shows error message
>
> Test data:
>
>    password: secret_sauce
>
> Steps:
>
> 1. Go to https://www.saucedemo.com/
>
> 2. Leave 'Username' field blank
>
> 3. Fill 'Password' field with test data
>
> 4. Click on [Login] button (button has 'Login' text)
>
> Expected result:
>
> 1. Page shows error message 'Epic sadface: Username is required' - user unsuccessfully login.
>
------------------------------------------------------------------------------------------
>
> ## TC#07
>
>> ### Inventory page has products list, burger menu and filter bar
>
> Preconditions:
> 
> 1. Make sure that user is logged in
> 
> 2. Go to https://www.saucedemo.com/inventory.html (Inventory page)
>
> Steps:
>
> 1. Pay attention that "Inventory page" has products list
> 
> 2. Pay attention that all products on "Inventory page" has 'Add to cart' buttons, images & prices
> 
> 3. Pay attention that "Inventory page" has burger menu with mandatory page's list
> 
> 4. Pay attention that 'Inventory page' has footer with social network links and image
>
> Expected result:
>
> 1. Page has product list with 'add to cart' buttons, prices and images, burger menu and footer with social network links (icons)
>
------------------------------------------------------------------------------------------
>
> ## TC#08
>
>> ### User should be able to filter products by price and alphabet
>
> Preconditions:
> 
> 1. Make sure that user is logged in
> 
> 2. Go to https://www.saucedemo.com/inventory.html (Inventory page)
>
> Steps:
>
> 1. Click on the filter bar at the top-right of the page
> 
> 2. Choose "Name (A to Z)" option
> 
> 3. Choose "Name (Z to A)" option
> 
> 4. Choose "Price (low to high)" option
> 
> 5. Choose "Price (high to low)" option
>
> Expected result:
>
> 1. Page filters products via alphabet order(from A to Z and vice versa) and via prices (from low to high and vice versa)
>
------------------------------------------------------------------------------------------
>
> ## TC#09
>
>> ### User should be able to add products to the shopping cart
>
> Preconditions:
> 
> 1. Make sure that user is logged in
> 
> 2. Go to https://www.saucedemo.com/inventory.html (Inventory page)
>
> Steps:
>
> 1. Click on the ["Add to cart"] button below any product in list
> 
> 2. Make sure the 'Shopping cart icon' at the top-right of the page shows quantity number
> 
> 3. Click on the 'Shopping cart' icon
> 
> 4. Make sure the url is "https://www.saucedemo.com/cart.html"
> 
> 5. Make sure the cart page shows product and it's quantity
>
> Expected result:
>
> 1. User be able to add the product to the shopping cart - shopping cart page shows added product and it's quantity
>
------------------------------------------------------------------------------------------