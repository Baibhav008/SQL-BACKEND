## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

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
