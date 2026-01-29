🐾 PetNest – Backend API

  PetNest is a full-stack e-commerce backend for pet products (food, medicine, accessories, clothes, etc.) with role-based access, secure authentication, admin dashboard, and Cloudinary image uploads.

🚀 Features
🔐 Authentication & Authorization

  User Signup / Login / Logout
  
  JWT authentication using HTTP-only cookies
  
  Role-based access (user, admin)
  
  Secure admin-only routes

🛍️ Product Management

  Admin CRUD operations for products
  
  Products categorized by:
  
  Pet type (Dog, Cat, etc.)
  
  Category (Food, Medicine, Accessories, Clothes)
  
  Cloudinary image upload
  
  🛒 Cart System
  
  Add / remove products from cart
  
  Quantity update
  
  User-specific cart

📦 Orders

Place order from cart

Order status management:

    pending
    
    processing
    
    shipped
    
    delivered
    
    Payment status (mock / normal for now)

📊 Admin Dashboard

    Total users & admins
    
    Total products
    
    Total orders
    
    Revenue stats
    
    Order status analytics

🧰 Tech Stack

    Node.js
    
    Express.js
    
    MongoDB + Mongoose
    
    JWT Authentication
    
    Cloudinary
    
    Multer
    
    bcrypt
    
    Cookie-parser

📁 Project Structure
Backend/
│── src/
│   ├── config/
│   │   ├── db.js
│   │   └── cloudinary.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── cartController.js
│   │   ├── orderController.js
│   │   └── adminController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── adminMiddleware.js
│   │   └── uploadMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Cart.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── adminProductRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── orderRoutes.js
│   │   └── adminRoutes.js
│   ├── utils/
│   │   └── createAdmin.js
│   └── server.js
│── .env
│── .gitignore
│── package.json

🔑 Environment Variables

Create a .env file inside Backend/

    PORT=5000
    MONGO_URI=mongodb://localhost:27017/petNest_DB
    JWT_SECRET=your_jwt_secret
    
    CLOUDINARY_CLOUD_NAME=xxxx
    CLOUDINARY_API_KEY=xxxx
    CLOUDINARY_API_SECRET=xxxx

▶️ Run Locally
    npm install
    npm run dev


Server will run at:

    http://localhost:5000

📮 API Endpoints

Auth
    POST   /api/auth/signup
    POST   /api/auth/login
    POST   /api/auth/logout

Products (Public)
    GET    /api/products
    GET    /api/products/:id

Products (Admin)
    POST   /api/admin/products
    PUT    /api/admin/products/:id
    DELETE /api/admin/products/:id

Cart
    POST   /api/cart/add
    GET    /api/cart
    DELETE /api/cart/remove/:productId

Orders
    POST   /api/orders
    GET    /api/orders/my
    GET    /api/admin/orders
    PUT    /api/admin/orders/:id/status (admin)

Admin Stats
GET    /api/admin/stats

👤 Admin Seeding

Create admin using:

     node src/utils/createAdmin.js


(Admin password is hashed & stored securely)

🧠 Future Improvements

- Razorpay / Stripe payment gateway

- Product reviews & ratings

- Wishlist
  
- Email notifications
