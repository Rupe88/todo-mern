# Todo App with Enhanced Features

This Todo App demonstrates full-stack development capabilities with the MERN stack, incorporating advanced features such as Role-Based Access Control (RBAC), file handling, search with sorting and filtering, custom notifications, and additional functionalities like email verification, password reset, and an AI chatbot.
![Screenshot From 2024-11-14 21-16-29](https://github.com/user-attachments/assets/508c5145-b3db-4a33-b28f-762985b482ce)


## Features

1. **User Authentication**:
   - Register, Login, and JWT with cookie-based session management server side.
   - Role-Based Access Control:
     - `Admin`: Manage all users and todos search , filter and more .
     - `Owner`: Manage their own todos , specific user todo and view all todos related to specific user.

2. **Todo Module**:
   - Users can create, read, update, and delete todos.
   - Each todo contains:
     - Title, Description, Due Date, Priority, and Status.
   - File upload (using Multer) to attach files to todos.

3. **Search, Sort, and Filter**:
   - Search todos by title and description.
   - Sort todos by due date.
   - Filter todos by creation date and status.

4. **Notification Service**:
   - Send a "Welcome" notification to new users upon registration.
   - Display notifications upon user login.

5. **Additional Functionalities**:
   - **Email Verification** using Nodemailer.
   - **Password Reset** and **Forgot Password**.
   - **AI Chatbot** for interacting with the user.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/todo-app.git
   cd mero-task
   cd fontend
   npm install
   cd backend
   npm iststall
   and then do both npm run dev

2. .env
   ```bash
    PORT=3000
    MONGO_URI=
   JWT_SECRET=
    USER_EMAIL=
    EMAIL_PASS=
    CLIENT_URL=http://localhost:5173
   OPENAI_API_KEY=  



3. .Api Testing For Auth
   ```bash
   router.post("/register", registerUser);
   router.post("/login", loginUser);
   router.post("/logout", logoutUser);
   router.get("/user", protect, getUser);
   router.patch("/user", protect, updateUser);
   // Sample route to search users by email (example: /auth/search?email=someuser@gmail.com)

   // admin route
   router.delete("/admin/users/:id", protect, adminMiddleware , deleteUser);

   // get all users
   router.get("/admin/users", protect, creatorMiddleware, getAllUsers);

   // login status
   router.get("/login-status", userLoginStatus);

   // email verification
   router.post("/verify-email", protect, verifyEmail);

   // veriify user --> email verification
   router.post("/verify-user/:verificationToken", verifyUser);

   // forgot password
   router.post("/forgot-password", forgotPassword);

   //reset password
   router.post("/reset-password/:resetPasswordToken", resetPassword);

    // change password ---> user must be logged in
   router.patch("/change-password", protect, changePassword);

   router.get("/:userId/profile", protect, getUserProfileWithTodos);
     

3. .Api Testing For Task Route
   ```bash
   
   router.post("/create", protect, upload.single("file"), createTask);
   router.get("/tasks",protect, getTasks);
   router.get("/:id", protect, getTask);
   router.patch("/:id", protect, upload.single("file"), updateTask);
   router.delete("/:id", protect, deleteTask);

3. .User Interface
   ![Screenshot From 2024-11-14 00-30-22](https://github.com/user-attachments/assets/4eef2a49-b4dd-417e-b713-7606e88559ac)
   ![Screenshot From 2024-11-14 00-30-48](https://github.com/user-attachments/assets/13ae7da2-78c6-46d8-a20b-dadc5cb2cc9b)
   ![Screenshot From 2024-11-14 00-30-14](https://github.com/user-attachments/assets/b996b312-ff20-4151-b4ce-be616e12100e)
   ![Screenshot From 2024-11-14 21-36-06](https://github.com/user-attachments/assets/779a575e-92ca-4fd0-832f-da12801fb911)
   ![Screenshot From 2024-11-14 21-24-44](https://github.com/user-attachments/assets/de3ea4ff-951f-438e-ba50-7beb4cfb20dd)
   ![Screenshot From 2024-11-14 12-52-44](https://github.com/user-attachments/assets/73e094da-cb43-424c-93a3-15801143b295)


Thabk You :)




