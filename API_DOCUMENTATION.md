# DineUp Application APIs

## Base URL
Backend Base URL: https://backenddineup.up.railway.app

## Customer APIs

### 1. User Authentication & Onboarding
- POST /api/register/: Register a new customer account.
- POST /api/token/: Authenticate a user and retrieve access and refresh tokens.
- POST /api/forgot-password/: Send a password reset email.
- POST /api/reset-password/: Reset password using the token sent via email.
- POST /api/social-auth/google/: Authenticate using Google OAuth tokens.

### 2. Profile Management
- GET /api/profile/: Retrieve the customer's profile information.
- PUT/PATCH /api/profile/: Update profile details.
- POST /api/change-password/: Change the user's password.

### 3. Restaurant Browsing
- GET /api/restaurants/: Retrieve a list of available restaurants.
- GET /api/restaurants/{restaurant_id}/: Retrieve detailed information about a specific restaurant.
- GET /api/search/: Search for restaurants or menu items.

### 4. Menu Management
- GET /api/items/{item_id}/: Retrieve details of a specific menu item.

### 5. Order Management
- POST /api/cart/items/: Add an item to the cart.
- GET /api/cart/: Retrieve the current cart contents.
- PUT/PATCH /api/cart/items/{cart_item_id}/: Update the quantity or customizations of an item in the cart.
- DELETE /api/cart/items/{cart_item_id}/: Remove an item from the cart.
- POST /api/orders/: Place an order based on the current cart contents.
- GET /api/orders/: Retrieve a list of past orders.
- GET /api/orders/{order_id}/status/: Get the current status of an order.

### 6. Reviews and Ratings
- POST /api/reviews/: Submit a review for a restaurant.
- GET /api/restaurants/{restaurant_id}/reviews/: Retrieve reviews for a specific restaurant.

### 7. Favorites Management
- POST /api/favorites/: Add a restaurant or item to favorites.
- DELETE /api/favorites/{favorite_id}/: Remove a favorite.
- GET /api/favorites/: Retrieve a list of favorites.

### 8. Recommendations
- GET /api/recommendations/: Get personalized recommendations.

### 9. Apply Promo Code
- POST /api/cart/apply-promo/: Apply a promotional code to the current cart.

### 10. Logout
- POST /api/token/blacklist/: Invalidate the refresh token to log out the user.

## Staff APIs

### 1. Authentication & Profile Management
- POST /api/staff/login/: Authenticate a staff member and retrieve access and refresh tokens.
- GET /api/staff/profile/: Retrieve the staff member's profile information.
- PUT/PATCH /api/staff/profile/: Update profile details.
- POST /api/staff/change-password/: Change the staff member's password.

### 2. Order Management
- GET /api/staff/orders/: Retrieve a list of current orders for the staff's restaurant.
- GET /api/staff/orders/{order_id}/: Get details of a specific order.
- PATCH /api/staff/orders/{order_id}/status/: Update the status of an order.

### 3. Menu Management
- GET /api/staff/menu-items/: Retrieve the menu items for the staff's restaurant.
- POST /api/staff/menu-items/: Add a new menu item.
- GET /api/staff/menu-items/{menu_item_id}/: Get details of a specific menu item.
- PUT/PATCH /api/staff/menu-items/{menu_item_id}/: Update a menu item.
- DELETE /api/staff/menu-items/{menu_item_id}/: Remove a menu item.

### 4. Table Management
- GET /api/staff/tables/: Retrieve the status of tables in the staff's restaurant.
- PATCH /api/staff/tables/{table_id}/status/: Update the status of a table.

### 5. Reservation Management
- GET /api/staff/reservations/: Retrieve a list of reservations for the staff's restaurant.
- PATCH /api/staff/reservations/{reservation_id}/status/: Confirm or cancel a reservation.

### 6. Reporting & Analytics
- GET /api/staff/reports/sales/: Get sales data for the staff's restaurant.

### 7. Notifications & Alerts
- GET /api/staff/notifications/: Retrieve notifications for the staff member.

### 8. Settings & Preferences
- PUT/PATCH /api/staff/settings/notifications/: Update notification preferences.
- PUT/PATCH /api/staff/settings/preferences/: Set preferred language and theme.

### 9. Logout
- POST /api/staff/logout/: Log out the staff member.

## Admin APIs

### 1. Authentication
- POST /api/admin/login/: Authenticate an admin user and retrieve access and refresh tokens.
- POST /api/admin/password-reset/: Initiate password reset for admin users.

### 2. User Management
- GET /api/admin/users/: Retrieve a list of all users.
- POST /api/admin/users/: Add a new user.
- GET /api/admin/users/{user_id}/: Get details of a specific user.
- PUT/PATCH /api/admin/users/{user_id}/: Update user details.
- DELETE /api/admin/users/{user_id}/: Delete a user account.

### 3. Restaurant Management
- GET /api/admin/restaurants/: Get all restaurants.
- POST /api/admin/restaurants/: Add a new restaurant.
- GET /api/admin/restaurants/{restaurant_id}/: Get details of a specific restaurant.
- PUT/PATCH /api/admin/restaurants/{restaurant_id}/: Update restaurant details.
- DELETE /api/admin/restaurants/{restaurant_id}/: Remove a restaurant.

### 4. Order Monitoring
- GET /api/admin/orders/: Retrieve all orders.
- GET /api/admin/orders/{order_id}/: Get details of a specific order.
- PATCH /api/admin/orders/{order_id}/status/: Update the status of an order.

### 5. Global Menu Management
- GET/POST /api/admin/menu/categories/: View or create menu categories.
- PUT/PATCH/DELETE /api/admin/menu/categories/{category_id}/: Update or delete a menu category.

### 6. Support & Feedback Management
- GET /api/admin/support-tickets/: Retrieve all support tickets.
- GET /api/admin/support-tickets/{ticket_id}/: Get details of a specific support ticket.
- POST /api/admin/support-tickets/{ticket_id}/responses/: Send a response to a support ticket.
- PATCH /api/admin/support-tickets/{ticket_id}/status/: Update the status of a support ticket.

### 7. Reporting & Analytics
- GET /api/admin/reports/overview/: Get key performance metrics of the platform.
- GET /api/admin/reports/restaurants/{restaurant_id}/: Get performance data for a specific restaurant.

### 8. Notifications & Alerts
- POST /api/admin/notifications/: Send a notification to users or staff.

### 9. Settings & Configurations
- GET /api/admin/settings/: Get current platform settings.
- PUT/PATCH /api/admin/settings/: Update global settings.

### 10. Logout
- POST /api/admin/logout/: Log out the admin user.

## IDs Used in Endpoints

- {restaurant_id}: The unique identifier of a restaurant.
- {item_id}: The unique identifier of a menu item (customer APIs).
- {menu_item_id}: The unique identifier of a menu item (staff APIs).
- {order_id}: The unique identifier of an order.
- {cart_item_id}: The unique identifier of an item in the user's cart.
- {user_id}: The unique identifier of a user.
- {favorite_id}: The unique identifier of a favorite entry (could be a restaurant or item).
- {table_id}: The unique identifier of a table in a restaurant.
- {reservation_id}: The unique identifier of a reservation.
- {category_id}: The unique identifier of a menu category.
- {ticket_id}: The unique identifier of a support ticket.
