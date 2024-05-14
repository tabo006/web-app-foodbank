# web-app-project
Abraham food bank app

## App description:

The web application includes 3 different user interfaces. One for the administrators, one for volunteers, and one for the clients.
The landing page of the website includes basic information on the service, and has buttons to redirect users to their desired usage of the website.
Functionalities of the administrators' user interface include the following:

Viewing submitted orders
Approving submitted orders
Editing submitted orders
Deleting submitted orders
Adding comments on orders
Adding items to the clients' list of available items
Changing the status of available items to the following: Out of stock, in stock, high stock, or low stock. All of these states have different implications on the client side of the web application
Editing the description, name, and maximum limit of items
Changing the status of the food bank from in-stock to out-of-stock. Changing the status to out-of-stock disables the clients from submitting forms

Functionalities of the volunteers's user interface include the following:

Viewing approved orders
Editing approved orders
Adding comments on approved orders
Changing the status of approved orders to complete

Functionalities of the client's user interface include the following:

Submitting orders
Adding items to order while respecting limits
Removing items from an order
Adding comments to order
Viewing items in stock
Input field for items with various selections
Input field for alternative options in the case that an item is low in stock
Alerts that ask the client to reduce their quantities in case they go over their limits
Clients have the option to indicate that they are registered as a family which then increases their limits.


to run server run the following in the server directory through terminal: node index.js
to run web app run the following code in the client/src directory: npm start

This app was designed a grocery order system for a small size food bank, the app is tested although it was never deployed for actual use as some contract issues arose with the organization to whom the app was destined for.

The following are the login credentials for the admina and volunteer accounts:
Username: Foodbank@seuo-uosu.com
Password: Foodbank2023

Note: I have not added a database insertion file, so you would need to run the DDL sql file in the  client folder to create the database and then manualyy insert your chosen username and password for the admin and volunteer accounts
 
