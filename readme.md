## 📚 Library Management Backend server

A simple backend server for a library management system — built with **Node.js**, **Express.js**, and **MongoDB (Mongoose)**.

### Live link: 

#### 🛠️ Technologies used: Mongoose, Express js , Node js, TypeSript.

#### ✨ Features :

- 📖 **Admin**

  - Manage books
  - Book Return confirmation
  - manage subscription packages
  - see users with borrow history

- 📦 **User**

  - purchase a subscription plan
  - Able to Borrow books based on subscription limit
  - my currently borrowed books
  - see my borrow history



#### ⚙️ How to Set Up Locally

- First you have to install node and github in your machine.
- then git clone the repository or download the zip file
- in root folder go to the terminal, hit - `npm i` then `npm run dev`
- create a `.env` file in the root and provide credentials based on `env.ts` located on `src/app/config/env.ts`
- access api locally at `http://localhost:5000/api/` in your browser.

<!--==========  requirements ===========-->

<!-- polish -->

1. remove unecessary comments
2. proper checkAuth() in all routes
   routes with checkAuth() -> frontend use client

3. block user -> if blocked then don't let them borrow
<!-- 4. add image_url in books -->
4. polish loader for every page
5. if not logged in , then try to subscripbe - show error
6. if basic user try to buy baci plan again give error
7. register page

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
