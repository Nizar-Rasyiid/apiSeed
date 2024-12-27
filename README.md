# Plant and Product Store API

A RESTful API built with Express.js for managing plants (pohon) and products (barang) inventory with ordering capabilities.

## Setup

1. Clone the repository
2. Install dependencies:
```bash
npm install express sequelize mysql2 cors
```

3. Configure database in each model file (default configuration):
```javascript
const sequelize = new Sequelize("seed", "root", "", {
  host: "localhost",
  dialect: "mysql"
});
```

4. Run the server:
```bash
node app.js
```

Server will run on `http://localhost:3000`

## API Endpoints

### Products (Barang)

- **GET** `/barang` - Get all products
- **GET** `/barang/:id` - Get product by ID
- **POST** `/barang` - Create new product
  ```json
  {
    "title": "Product Name",
    "description": "Product Description",
    "gambar": "image_url",
    "stock": 100,
    "harga": 50000
  }
  ```
- **PUT** `/barang/:id` - Update product
- **DELETE** `/barang/:id` - Delete product

### Plants (Pohon)

- **GET** `/pohon` - Get all plants
- **GET** `/pohon/:id` - Get plant by ID
- **POST** `/pohon` - Create new plant
  ```json
  {
    "title": "Plant Name",
    "desc": "Plant Description",
    "gambar": "image_url",
    "stock": 50,
    "harga": 75000
  }
  ```
- **PUT** `/pohon/:id` - Update plant
- **DELETE** `/pohon/:id` - Delete plant

### Orders

- **POST** `/orders` - Create new order
  ```json
  {
    "productType": "barang|pohon",
    "productId": 1,
    "quantity": 2,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "shippingMethod": "regular",
    "paymentMethod": "transfer"
  }
  ```
- **GET** `/orders/:id` - Get order details
- **GET** `/products/:type/:id` - Get product details (type: "barang" or "pohon")

## Error Handling

The API returns appropriate HTTP status codes:

- 200: Success
- 201: Created
- 204: No Content
- 400: Bad Request
- 404: Not Found
- 500: Server Error

## Database Schema

### Barang (Products)
- title (string)
- description (text)
- gambar (string)
- stock (integer)
- harga (decimal)

### Pohon (Plants)
- title (string)
- desc (text)
- gambar (string)
- stock (integer)
- harga (decimal)

### Orders
- productType (enum: "barang"/"pohon")
- productId (integer)
- quantity (integer)
- totalPrice (decimal)
- firstName (string)
- lastName (string)
- email (string)
- shippingMethod (string)
- paymentMethod (string)
- status (enum: "pending"/"completed"/"cancelled")
