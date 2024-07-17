# Mirkina Radionica - A web store for handmade nursery gear

## Brief 

In here, you will find a brief description of the core features of the web app, along with the general ideas for future implementation

### Description

The app was envisioned as a web store that showcases products that had been made for clients at some point in time. The basic idea of the store is to present the features of particular products, while also displaying a wide variety of products that have been made so far since almost none of the products are exactly the same.

## Overview

**_Home-page_**

The home page acts as a warm welcome and a short description of the business. It contains multiple buttons pointing to the shop, along with a form at the bottom which serves as a newsletter sign-up for customers that wish to be kept informed about innovations.

https://github.com/Mikuul99/mirkina-radionica/assets/101178689/325f0034-b872-44e1-9a71-17d6874bae35


https://github.com/Mikuul99/mirkina-radionica/assets/101178689/1d73d110-8f68-4582-99f5-e6a32d035278

https://github.com/Mikuul99/mirkina-radionica/assets/101178689/61085276-48c7-4915-bf60-aad9f8727e29

**_Shop_**

The shop section represents the store in its full potential. It serves to display products from the database. The shop consists of the main panel which responsively displays prodcuts, and a side panel which contains a widget for fitlering and sorting the products. The fitler can be set to display prodcuts according to the category, and the sorter can be set to display products in the rising or falling trend in regard to the price, as well as to display the newest products first.

https://github.com/Mikuul99/mirkina-radionica/assets/101178689/ae0e601e-1ca9-46ec-93e6-8a1f99cb47f2

https://github.com/Mikuul99/mirkina-radionica/assets/101178689/418a95c4-1287-49ee-8c0c-969f977ad309

**_Product-page_**

By clicking on a product card in the store, the app displays a detailed product preview. The details are a part of the Product Model and every product has its unique characteristics that are displayed dynamically. These details are in the form of images that can be previewed through an image gallery, and text details displayed below the images.

https://github.com/Mikuul99/mirkina-radionica/assets/101178689/623baa66-d4f7-4ab6-aab1-efab4a014e33

**_Contact-page_**

In the navigation bar, there are 3 pages that serve as further information to the client and the first one is the contact page. The contact page is a static page that contains closer information on the business like clickable Instagram and Facebook page links as well as the email address and location. 

![Github portfolio](https://github.com/Mikuul99/mirkina-radionica/assets/101178689/d7913d7f-eb6e-43cf-97a9-52ad56e3b012)

![Contact-Page_Responsive](https://github.com/Mikuul99/mirkina-radionica/assets/101178689/ed229bd1-de16-46c4-b78f-589f22bb8396)

**_Info-page_**

Another page providing further information is the info page. This is also a static page that allows users to read a brief story about the business' history, current progress and the envisioned future.

https://github.com/Mikuul99/mirkina-radionica/assets/101178689/1febeaa5-4cbb-4532-a51f-d58d14376d79

![Info-Page-Responsive](https://github.com/Mikuul99/mirkina-radionica/assets/101178689/4021f658-0e22-4af4-8e47-f22620f402cb)

**_Help-page_**

The help page serves as an informational page about the delivery of the products. The cards in this page provide further insight into the cost of the delivery, the delivery time and a redirect clients to contact us if they need any further assistance. The cards also contain buttons that redirect to the shop and the contact page.

https://github.com/Mikuul99/mirkina-radionica/assets/101178689/9fe30e06-358d-4d9f-acdf-1242160ee98b

![Help-Page-Responsive](https://github.com/Mikuul99/mirkina-radionica/assets/101178689/0a577dba-d364-4175-be8f-04af371cf03a)

**Login-page_**

The login page is currently hidden from view and it's only accessible through the manual navigation to the /login route. It's momentary purpose is only to authenticate an administrator who wants to manage the products in the database. Once on the login page, the administrator is prompted to enter their email address and password and depending on the input the dialog will either allow access to the admin-panel or throw an error for better understanding such as an incorrect email or password disclaimer.

https://github.com/user-attachments/assets/76ef5313-7747-44df-82c7-a8dfc9acb00f

**_Admin-panel_**

The admin-panel serves a backoffice for administrators of the page to manage the products by adding, updating or deleting them whenever needed. It displays the same product cards with addition of 2 buttons per card for deleting and updating a desired product. Instead of a filter and sorter, the side panel now contains 2 buttons for adding a new product and logging out of the admin page.

![Github portfolio](https://github.com/user-attachments/assets/97dda7d8-124e-46f1-901c-1c7da8abcfab)
