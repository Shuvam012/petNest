🐾 PetNest – Full Stack MERN E-Commerce Platform


  PetNest is a full-featured MERN stack e-commerce platform designed for pet products, featuring role-based authentication, a powerful admin dashboard, product & order management, and a clean, responsive UI.
    
  This project demonstrates real-world backend + frontend integration, secure APIs, and scalable architecture.

🚀 Features

👤 User Features

    User authentication (Register / Login / Logout)
    
    Browse products with filters (category, pet type, price)
    
    Product details page
    
    Cart management (Add / Remove / Update quantity)
    
    Secure checkout flow
    
    Order placement

    Order history with status tracking
    (Placed → Shipped → Delivered / Cancelled)
    
    Cancel order before delivery

🛠 Admin Features

    Secure admin authentication
    
    Admin dashboard with analytics:
    
    Total users
    
    Total orders
    
    Revenue
    
    Orders by status (Placed, Shipped, Delivered, Cancelled)
    
    Active products count
    
    Product management:
    
    Add product (with Cloudinary image upload)
    
    Edit product details
    
    Soft delete product

    Order management:

    View all orders
    
    Update order status
    
    Role-based protected routes

🧩 Tech Stack

Frontend

    React (Vite)
    
    Tailwind CSS
    
    Axios
    
    React Router DOM
    
    Lucide Icons

Backend

    Node.js
    
    Express.js
    
    MongoDB & Mongoose
    
    JWT Authentication
    
    Cloudinary (Image Uploads)
    
    Multer (File Handling)

🔐 Authentication & Security

    JWT-based authentication
    
    HTTP-only cookies
    
    Role-based access (Admin / User)
    
    Protected API routes
    
    Input validation & error handling

🖼 Image Uploads

    Product images are uploaded using Cloudinary
    
    Multer + Cloudinary Storage integration
    
    Secure and scalable media handling

📦 Order Lifecycle

        Placed → Shipped → Delivered
                ↘ Cancelled

    Admins can update order status, while users can track their orders in real time.

⚙️ Environment Variables

    Create a .env file in the backend directory:

    PORT=5000
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    
    ADMIN_EMAIL=admin@example.com
    ADMIN_PASSWORD=admin_password
    
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_api_key
    CLOUDINARY_API_SECRET=your_api_secret

Backend Setup

    cd backend
    npm install
    npm run dev

Frontend Setup

    cd frontend
    npm install
    npm run dev

📈 Future Enhancements

    Payment gateway integration (Stripe / Razorpay)
    
    Product reviews & ratings
    
    Wishlist feature
    
    Admin analytics charts
    
    Email notifications
    
    Pagination & advanced search    
