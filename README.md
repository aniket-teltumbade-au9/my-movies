I've removed all placeholders and updated the **Features** and **Technology Stack** sections with your specific details, ensuring the README is ready for submission.

-----

# 🍿 Movie Database Application (MERN Stack Assignment)

This repository contains a full-stack web application built using the **MERN stack** (MongoDB, Express, React, Node.js) designed to manage a database of movies.

## ✨ Features

The application provides the following core functionalities for movie management:

1.  **Register:** Users can create a new account.
2.  **Login:** Users can sign in to access personalized features.
3.  **Logout:** Users can securely sign out.
4.  **Add Movies:** Authenticated users can submit new movie entries to the database.
5.  **List Movies (User-Specific):** View a paginated list of movies *added by the current user*.
6.  **Pagination:** Efficiently browse long lists of movies with page controls.

-----

## 🛠 Technology Stack

### Frontend (Client)

  * **React.js**
  * **State Management:** **Context API**
  * **Styling:** **Tailwind CSS**

### Backend (Server)

  * **Node.js**
  * **Express.js**
  * **Database:** **MongoDB** (via Mongoose ODM)
  * **Authentication:** **JWT (JSON Web Tokens)** 
  * **Image Handling:** **Cloudinary** (for movie posters and assets)

-----

## 🚀 Getting Started

You can run this application using **Docker** for a quick setup or by installing dependencies **locally**.

### Option 1: Using Docker (Recommended)

This method uses `docker-compose` to build and run the client, server, and a MongoDB container.

1.  **Environment Files:** Create two new files in the project root directory:

      * `server.env`
      * `client.env`

2.  **Configuration:** Fill in the environment variables for your services:

      * **`server.env`**
        ```env
        PORT=5000
        NODE_ENV=development
        MONGO_URI=[Your MongoDB Connection String]
        CLOUDINARY_CLOUD_NAME=[Your Cloudinary Cloud Name]
        CLOUDINARY_API_KEY=[Your Cloudinary API Key]
        CLOUDINARY_API_SECRET=[Your Cloudinary API Secret]
        JWT_SECRET=[A strong, unique secret string for JWT signing]
        ```
      * **`client.env`**
        ```env
        VITE_SERVER_URL=http://localhost:5000/api
        ```

3.  **Run Application:** Execute the following commands in the project root:

    ```bash
    # 1. Pull the necessary images
    docker-compose pull

    # 2. Build, create, and start containers in detached mode
    docker-compose up -d
    ```

4.  **Access:** The application will be available at `http://localhost:3000`.

-----

### Option 2: Local System Setup

If you prefer to run the client and server separately on your local machine:

#### A. Backend Server Setup

1.  Navigate to the server directory:

    ```bash
    cd movie-app-server
    ```

2.  Install server dependencies:

    ```bash
    npm i
    ```

3.  **Environment:** Create a file named **`.env`** in the `movie-app-server` directory and populate it with your credentials (same as the `server.env` variables above).

4.  Start the server (runs with `nodemon` for development):

    ```bash
    npm run start:dev
    ```

    The server will run on `http://localhost:5000`.

#### B. Frontend Client Setup

1.  Navigate to the client directory:

    ```bash
    cd ../movie-app-client
    ```

2.  Install client dependencies:

    ```bash
    npm i
    ```

3.  **Environment:** Create a file named **`.env`** in the `movie-app-client` directory.

4.  Start the client application:

    ```bash
    npm run dev
    ```

    The client will typically run on `http://localhost:3000`.

-----

## 🛑 Important Notes for Reviewer

  * **Credentials:** You must provide valid **MongoDB URI** and **Cloudinary credentials** in the respective environment files for the application to function completely.
  * **Authentication Flow:** The server uses JWTs for secure user authentication and authorization.

-----

## 👤 Author

  * **Aniket Teltumbade**
  * **Email:** aniketteltumbade@outlook.com