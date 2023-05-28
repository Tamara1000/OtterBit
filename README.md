# OtterBit
# OtterBeat Music Platform

OtterBeat is a web-based music platform that allows users to search for their favorite artists' songs catalog. It is built as a mobile and desktop website using Node.js, Express.js, PostgreSQL, and JavaScript.

## Table of Contents
1. [Installation](#installation)
2. [Usage](#usage)
3. [API Endpoints](#api-endpoints)
4. [Database Schema](#database-schema)
5. [Contributing](#contributing)
6. [License](#license)

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
Install the dependencies:

bash
Copy code
npm install
Set up the PostgreSQL database:

Create a new database in PostgreSQL.
Update the database connection configuration in the .env file.
Run the database migrations:

bash
Copy code
npx sequelize-cli db:migrate
Start the server:

bash
Copy code
npm start
The server will start running on http://localhost:3000.

Usage
Open your web browser and navigate to http://localhost:3000.
Use the search bar to search for an artist's name.
The list of the artist's songs will be displayed, including the song ID, title, duration, and release year.
Click the "Add to Favorites" button next to a song to add it to your favorites list. Clicking the button again will remove the song from your favorites list.
API Endpoints
The following API endpoints are available:

GET /artists/:artistName/songs: Retrieves a list of an artist's songs.
POST /users/:userId/favorites/:songId: Adds a song to a user's favorites list.
DELETE /users/:userId/favorites/:songId: Removes a song from a user's favorites list.
GET /users/:userId/favorites: Retrieves a user's favorites list.
Refer to the API documentation for more details on each endpoint.

Database Schema
The project uses a PostgreSQL database with the following schema:

ARTISTS: Stores information about artists.
SONGS: Stores information about songs, including their relationship with artists.
USERS: Stores user information, including the user's favorites list.
FAVORITES: Stores the relationship between users and their favorite songs.
Refer to the provided SQL schema in the project to create the necessary tables in your PostgreSQL database.

Contributing
Contributions to the OtterBeat project are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

License
This project is licensed under the MIT License.

sql
Copy code

Feel free to modify and customize the README file based on your specific project
