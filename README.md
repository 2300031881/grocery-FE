# BigBasket Clone - Full Stack Application

A modern e-commerce web application inspired by BigBasket, built with React frontend and designed to work with Spring Boot backend and MySQL database.

## 🚀 Features

### Frontend (React)
- **Modern UI/UX**: Clean, responsive design matching BigBasket's aesthetic
- **Product Catalog**: Browse products by categories with search functionality
- **Shopping Cart**: Add/remove items with quantity management
- **User Authentication**: Login/signup with social media integration
- **Product Details**: Detailed product information with ratings and reviews
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop

### Backend Structure (Spring Boot - Guide)
- **RESTful APIs**: Complete API endpoints for all frontend operations
- **User Management**: Authentication and user profile management
- **Product Management**: CRUD operations for products and categories
- **Shopping Cart**: Persistent cart functionality
- **Order Management**: Order creation and tracking
- **MySQL Integration**: Database operations with JPA/Hibernate

## 🛠️ Technology Stack

### Frontend
- **React 18**: Modern React with functional components and hooks
- **React Router**: Client-side routing
- **Context API**: State management for cart and authentication
- **CSS3**: Modern styling with flexbox and grid
- **Local Storage**: Persistent cart and user session

### Backend (Recommended)
- **Spring Boot 3**: Java backend framework
- **Spring Security**: Authentication and authorization
- **Spring Data JPA**: Database operations
- **MySQL**: Relational database
- **Maven**: Dependency management

## 🚦 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Java 17+ (for backend)
- MySQL 8.0+ (for backend)

### Frontend Setup (Current)
The React frontend is already set up and running. You can:

1. Browse products by category
2. Search for specific items
3. Add items to cart
4. View cart and manage quantities
5. Mock user authentication

### Backend Setup (Guide)

To complete the full-stack application, you'll need to create a Spring Boot backend:

#### 1. Project Structure
```
backend/
├── src/main/java/com/bigbasket/
│   ├── BigBasketApplication.java
│   ├── config/
│   │   ├── SecurityConfig.java
│   │   └── WebConfig.java
│   ├── controller/
│   │   ├── AuthController.java
│   │   ├── ProductController.java
│   │   ├── CartController.java
│   │   ├── CategoryController.java
│   │   └── OrderController.java
│   ├── dto/
│   │   ├── LoginRequest.java
│   │   ├── UserResponse.java
│   │   └── ProductResponse.java
│   ├── entity/
│   │   ├── User.java
│   │   ├── Product.java
│   │   ├── Category.java
│   │   ├── CartItem.java
│   │   └── Order.java
│   ├── repository/
│   │   ├── UserRepository.java
│   │   ├── ProductRepository.java
│   │   ├── CategoryRepository.java
│   │   └── CartItemRepository.java
│   └── service/
│       ├── UserService.java
│       ├── ProductService.java
│       ├── CartService.java
│       └── AuthService.java
```

#### 2. Key Dependencies (pom.xml)
```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
    </dependency>
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-api</artifactId>
        <version>0.11.5</version>
    </dependency>
</dependencies>
```

#### 3. Database Configuration (application.yml)
```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/bigbasket_db
    username: your_username
    password: your_password
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
  security:
    jwt:
      secret: your_jwt_secret_key
```

#### 4. Sample API Endpoints

**Authentication**
- POST `/api/auth/login` - User login
- POST `/api/auth/register` - User registration
- POST `/api/auth/logout` - User logout

**Products**
- GET `/api/products` - Get all products
- GET `/api/products/{id}` - Get product by ID
- GET `/api/products/search?query=keyword` - Search products
- GET `/api/categories/{id}/products` - Get products by category

**Cart**
- GET `/api/cart` - Get user's cart
- POST `/api/cart/items` - Add item to cart
- PUT `/api/cart/items/{id}` - Update cart item
- DELETE `/api/cart/items/{id}` - Remove item from cart

**Orders**
- POST `/api/orders` - Create new order
- GET `/api/orders` - Get user's orders
- GET `/api/orders/{id}` - Get order details

## 📱 Features Showcase

### Current Frontend Features
- **Header**: Search bar, location selector, cart icon with count
- **Categories**: Sidebar navigation with grocery categories
- **Products**: Grid layout with images, pricing, and ratings
- **Cart**: Modal with quantity controls and price calculation
- **Authentication**: Login/signup modal with social options
- **Responsive**: Mobile-first design with breakpoints

### Mock Data
The frontend currently uses mock data for demonstration. Key features:
- 8 sample products across different categories
- Realistic pricing with discounts
- Stock status and ratings
- Category filtering and search

## 🎨 Design Highlights

- **Color Scheme**: BigBasket's signature green (#84c225) theme
- **Typography**: Clean, readable fonts with proper hierarchy
- **Layout**: Grid-based responsive design
- **Interactions**: Hover effects, smooth transitions, and micro-animations
- **UX**: Intuitive navigation and clear call-to-action buttons

## 🔧 Customization

### Connecting to Real Backend
1. Update `src/services/api.js` with your Spring Boot API endpoints
2. Modify the API base URL in environment variables
3. Replace mock data with actual API calls
4. Implement proper error handling and loading states

### Environment Variables
Create a `.env` file in the root directory:
```
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_ENVIRONMENT=development
```

## 📈 Future Enhancements

### Frontend
- Payment integration (Stripe/Razorpay)
- Order tracking and history
- Product reviews and ratings
- Wishlist functionality
- Advanced filtering and sorting

### Backend
- Email notifications
- Inventory management
- Admin dashboard
- Analytics and reporting
- Multi-vendor support

## 📝 API Integration Guide

To connect this frontend with your Spring Boot backend:

1. **Replace Mock Data**: Remove mock data from components and implement API calls
2. **Error Handling**: Add proper error boundaries and loading states
3. **Authentication**: Implement JWT token management
4. **State Management**: Consider Redux for complex state management
5. **Testing**: Add unit and integration tests

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For questions and support, please open an issue in the GitHub repository.

---

**Note**: This is a demonstration project inspired by BigBasket. The frontend is fully functional with mock data, and the backend structure is provided as a guide for implementation.