# Aurora Library Backend

Aurora Library is a virtual library backend built using Node.js, Express, and MongoDB. It provides a RESTful API for managing books and user authentication.

## Features
- **Book Management:** Create, retrieve, and manage books with file uploads (image and PDF).
- **User Authentication:** Sign up and log in with JWT-based authentication.
- **File Uploads:** Image and PDF uploads handled with `multer`.

## Project Structure
```plaintext
/aurora-library-backend
├── db/                   # Database connection setup
├── model/                # Mongoose schemas for books and users
├── routes/               # Express route handlers for books and authentication
├── uploads/              # Uploaded files (images and PDFs)
├── .env                  # Environment variables
├── index.js             # Main server file
├── package.json          # Project dependencies
```

## Getting Started
### Prerequisites
- Node.js
- MongoDB Atlas or Local MongoDB

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with:
   ```plaintext
   PORT=5000
   MONGO_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
   ```
4. Run the server:
   ```bash
   npm start
   ```

## API Endpoints

### Book Routes
- `POST /api/books/create`: Create a new book with image and PDF upload.
- `GET /api/books/all`: Get all books.
- `GET /api/books/:id`: Get a single book by ID.

### Auth Routes
- `POST /api/auth/signup`: Register a new user.
- `POST /api/auth/login`: Login and receive a JWT token.

### Models

#### Book Model
```javascript
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    image: { type: String, required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    pdf: { type: String, required: true }
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
```

#### User Model
```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
```

## Middleware and Packages Used
- `express`: Web framework for Node.js.
- `mongoose`: MongoDB object modeling.
- `cors`: Cross-Origin Resource Sharing.
- `dotenv`: Environment variable management.
- `multer`: File uploads.
- `bcryptjs`: Password hashing.
- `jsonwebtoken`: JWT-based authentication.


## Contributing
Contributions are welcome! Fork the repo and create a pull request.



