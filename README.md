# Krishipal: Agriculture Advisory Platform

## Introduction
Krishipal is an innovative web-based application designed to serve the agricultural community. The platform integrates essential features such as e-commerce for agricultural goods and an advisory system for best farming practices. It aims to provide a comprehensive solution for farmers to access vital information, streamline the procurement of agricultural supplies, and engage in a connected agricultural community.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features
- **User Registration and Authentication:** Including Google authentication.
- **Product Management and E-commerce Functionalities:** Search, filter, add to cart, and checkout.
- **Blog and Community Engagement:** Viewing and commenting on blogs.
- **Admin Functionalities:** CRUD operations on products, users, and blogs.
- **Secure Online Payment:** Integration with PayPal for transactions.
- **Feedback System:** Product reviews and blog comments.
- **Sustainable Farming Practices:** Access to information on crop management and market trends.

## Technology Stack
- **Languages:** HTML, CSS, JavaScript
- **Frontend Technologies:** React, Redux, Vite, TailwindCSS
- **Backend Technologies:** Node.js, Express.js, Mongoose
- **Database:** MongoDB Atlas
- **Hosting and Deployment:** Render, Namecheap
- **Third-Party Services:** PayPal Payment Interface, Firebase Google Auth
- **Version Control:** Git, GitHub

## Installation
To set up the Krishipal platform locally, follow these steps:

1. **Clone the Repository:**
    ```sh
    git clone https://github.com/yourusername/krishipal.git
    cd krishipal
    ```

2. **Install Dependencies:**
    ```sh
    npm install
    cd frontend
    npm install
    cd ..
    ```

3. **Set Up Environment Variables:**
    Create a `.env` file in the root directory and add the following variables:
    ```sh
    NODE_ENV
    PORT
    MONGO_URL=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    PAYPAL_CLIENT_ID=your_paypal_client_id
    PAYPAL_APP_SECRET=your_paypal_secret
    PAYPAL_API_URL=paypal_api_url
    VITE_FIREBASE_API_KEY=vite_firebase_key
    VITE_APP_API_URL=your_frontend_url
    ```

4. **Run the Application:**
    ```sh
    npm run dev (concurrently)
    ```

## Usage
- **User Actions:**
    - Register and log in to the platform.
    - Browse products, add to cart, and checkout.
    - View and comment on blog posts.
- **Admin Actions:**
    - Manage users, products, and blog posts.
    - View and update orders.
    - Approve or delete blog posts.

## Contributing
Contributions are welcome! To contribute to Krishipal, please follow these steps:

1. Fork the repository.
2. Create a new branch:
    ```sh
    git checkout -b feature-name
    ```
3. Make your changes and commit them:
    ```sh
    git commit -m 'Add some feature'
    ```
4. Push to the branch:
    ```sh
    git push origin feature-name
    ```
5. Open a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE] file for details.

---

Thank you for using Krishipal! We hope this platform helps you achieve better productivity and sustainability in your agricultural endeavors. For any issues or feedback, please contact us for further queries.
