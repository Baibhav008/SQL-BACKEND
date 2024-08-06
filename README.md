## API Endpoints

### Signup API

- **Endpoint**: `POST /api/signup`
- **Request Format**:
  ```json
  {
    "email": "test@mail.com",
    "username": "test",
    "password": "12345678"
  }
  ```
- **Response Format (Success)**:
  ```json
  {
    "status": "Account successfully created",
    "status_code": 200,
    "user_id": "12345"
  }
  ```

### Login API

- **Endpoint**: `POST /api/login`
- **Request Format**:
  ```json
  {
    "username": "test",
    "password": "12345678"
  }
  ```
- **Response Format (Success)**:
  ```json
  {
    "status": "Login successful",
    "status_code": 200,
    "user_id": "12345",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
  }
  ```
- **Response Format (Failure)**:
  ```json
  {
    "status": "Incorrect username/password provided. Please retry",
    "status_code": 401
  }
  ```
