# Angular Task - Vodafone

![Alt text](https://logos-world.net/wp-content/uploads/2020/09/Vodafone-Logo.png)

## Project Description

This Angular web application, developed as part of the Vodafone hiring process, displays user posts fetched from an API. It includes features like username display, user profile images, post images, and comments, with random images fetched using the [API Ninjas Random Image API](https://api.api-ninjas.com/v1/randomimage?category) and cached as blobs.

## How to Run the Source Code

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/waleedHAlmenawy/angular-task-vodafone
   cd your-repo

   ```
2. **Install Dependencies:**
   ```bash
    npm install

   ```
3. **Run the Development Server**
   ```bash
   ng serve --open

   ```

## How to Build the Source Code

1. **Build the Project:**
   ```bash
    ng build

   ```

## How to Test the Source Code

1. **Run Unit Tests:**
   ```bash
    ng test

   ```

## User Flow

1. The user opens the web application.
2. The navbar loads usernames from the API.
3. The user clicks on a username.
4. The posts made by the selected user are displayed.
5. Each post shows the username, user profile image, post image, post text with a character limit, and a button to show comments.
6. The user can click the button to view comments for a specific post.

## Task Breakdown

| Task                                 | Description                                                                                                          |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| Create Angular Project               | Set up a new Angular project.                                                                                        |
| Create Navbar Page                   | Develop a web page with a navbar.                                                                                    |
| Load Usernames                       | Fetch usernames from the API: [Users API](https://jsonplaceholder.typicode.com/users).                               |
| Load User Posts                      | Load posts by username from the API: [Posts API](https://jsonplaceholder.typicode.com/posts?userId=userId).          |
| Post Details                         | Display each post with:                                                                                              |
|                                      | - Username or email                                                                                                  |
|                                      | - User profile image and post image (random from unsplash.com)                                                       |
|                                      | - Post text with a character limit (using a pipe)                                                                    |
|                                      | - Button to show comments                                                                                            |
| Load Post Comments                   | Fetch comments for a post from the API: [Comments API](https://jsonplaceholder.typicode.com/comments?postId=postId). |
| Cache API Responses                  | Cache responses to avoid redundant API calls.                                                                        |
| Responsive UI                        | Implement a neat, responsive UI using SASS (without Angular Material).                                               |
| Unit Testing & Deployment (Optional) | Implement unit tests and deploy the application (e.g., using Firebase).                                              |
