# Market for the Poor (Team 32, CSC309)

- Weiyi Hu
- Jae Hyun Ma
- Xuhui Zhang
- Junkai Li

### Overall

The purpose of our website is to support the poverty worldwide through connecting companies and non-profit organizations supporting the people suffering from poverty. Our website will allow the seller of essential goods such as food, drink and clothings to sell their cancelled or refunded orders at a cheaper cost to non-profit organizations. 

### User Profiling

We will have two basic levels of users: regular and admin users.

- Regular users: 
    - Sellers (companies)
    - Buyers (non-profit organizations)
- Admin user: there is one admin user for administrative works of website.

A regular user will have the following fields.

- Profile picture
- Username (unique)
- Password (at least 6 characters)
- Role (Seller / Buyer)
- Email address (not necessarily unique, alternative way of contact)
- Messages (Main way of contact)
    - Seller ⇔ seller
    - Seller ⇔ buyer
    - Buyer ⇔ buyer
- Requests / Offers
    - Status: Pending, Finished.
- Account status (Good, Banned)

### User Authentication and Authorization

Regular user functionalities and limits are as followed.

- Register or modify their personal information (profile) upon or after the registration.
- View the profile of other users by clicking their names.
- Send messages to other users
- Post offers / requests
- Book an order by accepting the posted offer - buyer
- Confirm the order - seller
- Regular users will not be able to make more than one account
- Regular users will have login in order to use functionalities provided above

### Data

We will create our own data set as provided below.

Posts
- Requests
    - Post id
    - Post time
    - Title
    - Description
    - Type of post
    - Quantity
    - Category
    - Price
        - Fixed price
        - Free
        - Please contact
- Offers
    - Post id
    - Post time
    - Pictures
    - Title
    - Description
    - Type of post
    - Quantity
    - Category
    - Price
        - Fixed price
        - Free
        - Please contact

Here is the detail of the category

- Food
    - Canned & Jar Good
    - Beverages
    - Dairy
    - Meat
- Electronics
    - Computers
    - Phones
- Clothings
    - Men
    - Women
    - Unisex
    - Child
- Furnitures
- Tools
- Other

### Views

A detailed wireframe diagram will be attached below. Here is the overview of the views our website will have.

Regular user views

- Welcome page (sign up / sign in)
- Main / feed page
- Post page (requests / offers)
- Profile dashboard
- Message Box
- Posts/ finalized order Box 

Admin user views

- Admin dashboard

### Admin

- View all types of posts (requests / offers)
- Delete / edit posts
- Delete / ban regular users


### Additional features

Searching keywords

Searching category

Searching users

Filtering based on category / price

Sorting posts by post date / price

### Wireframe Link

[wireframe](https://balsamiq.cloud/s7q0z89)
