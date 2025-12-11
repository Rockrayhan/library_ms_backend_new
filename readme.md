## 📚 Library Management Backend API

A simple backend API for managing books in a library system — built with **Node.js**, **Express.js**, and **MongoDB (Mongoose)**.

### Live link: https://assignment-3-library.vercel.app/api/books

#### 🛠️ Technologies used: Mongoose, Express js , Node js.

#### ✨ Features :

- 📖 **Books**
  - Create, update, delete books
  - View all books with filtering and sorting support
  - Get a single book by ID (with validation)
- 📦 **Borrow**

  - Borrow a book with quantity and due date
  - Automatically manage availability and stock
  - Save borrow records

- 📊 **Reports**
  - View borrow summary (with total quantity borrowed per book)

#### ⚙️ How to Set Up Locally

- First you have to install node and github in your machine.
- then git clone the repository or download the zip file
- in root folder go to the terminal, hit - `npm i` then `npm run dev`
- in src/server.ts - mongoose.connect('') - here in the ('') quote give your mongodb altus connection.
- access api locally at `http://localhost:5000/api/books` in your browser.







<!-- user -->

id
name
email
password
role: "admin" | "user"
subscription: ObjectId (Subscription)
paymentInfo

<!-- subscription -->

id
planName
borrowLimit
expiresAt
stripeSessionId
active: boolean

<!-- book -->

title
author
genre
description
in_stock
availableCopies
available

<!-- borrow -->

user
book
quantity
dueDate
returned






<!--==========  requirements ===========-->

<!-- polish -->

1. remove unecessary comments
2. proper checkAuth() in all routes 
   routes with checkAuth() -> frontend use client 

3. block user -> if blocked then don't let them borrow   
<!-- 4. add image_url in books -->
5. polish loader for every page
6. if not logged in , then try to subscripbe - show error
7. if basic user try to buy baci plan again give error
8. register page


<!--=========  user ============= -->
1. see borrow limit

<!-- 2. my currently borrowed books -->

<!-- 3. see my borrow history -->

4. payment integration

<!--=========  admin ============= -->

1. manage books (crud)

<!-- 2. return a book.  -->

2. manage subscription packages

<!-- 3. see users with borrow history -->

<!-- 4. all borrow history -->


