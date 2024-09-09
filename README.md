## Frontend Application (React.Js)

**Please run the project with the command: `npm start`**

### Login

The login functionality allows users to access the application using their credentials.

- **Username:**
  - Must be a valid email address.
  - Validation ensures a correct email format.
- **Password:**
  - Must contain only alphanumeric characters (`a-z`, `A-Z`, `0-9`).
  - Minimum length of 8 characters is enforced.

### Register

The registration process allows new users to create an account.

- **Full Name:**
  - Users must enter their full name.
- **Username:**
  - Must be a valid email address.
  - Validation ensures a correct email format.
- **Password:**
  - Must contain only alphanumeric characters (`a-z`, `A-Z`, `0-9`).
  - Minimum length of 8 characters is enforced.
- **Confirm Password:**
  - Must match the entered password for verification.
- **Language:**
  - Users can choose their preferred language from a selection (`EN` or `DE`).
- **Mobile Number:**
  - Optional field.
  - If provided, validation ensures a valid mobile number format (specific format details can be added here).
- **Verification Email:**
  - Upon successful registration, a verification email is sent to the user's registered email address.

### User Module

When a user successfully logs in, the application displays their profile information in the language chosen during registration.

### Admin Module

The admin module provides administrative functionalities.

- Upon successful login, an admin user can view a table listing all registered users.
- Admins can toggle the active status of user accounts, granting or revoking access.

**Note:** This documentation provides a high-level overview of the login, registration, user, and admin functionalities. Specific implementation details may vary and can be further elaborated upon in separate sections.
