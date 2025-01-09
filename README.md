# Contact Management System

A simple and efficient Contact Management System built with Node.js and Express, featuring user authentication, CRUD operations for managing contacts, and JWT-based authentication.

## Features

1. **User Registration and Login**:
   - Users can register and are redirected to the login page.
   - Upon successful login, a JWT access token is generated and stored in the browser's cookies.
   - The user is redirected to the Dashboard after a successful login.

2. **JWT Authentication**:
   - JWT access token is used for authenticating API requests.
   - The token is stored in cookies and must be included in the headers for all CRUD operations.

3. **CRUD Operations**:
   - **Create Contact**: Allows users to add new contacts.
   - **Get Contact**: Displays all the contacts stored in the system.
   - **Update Contact**: Allows users to modify an existing contact's details.
   - **Delete Contact**: Allows users to delete a contact.
   - **Get Specific Contact**: Fetch a single contact by ID.
