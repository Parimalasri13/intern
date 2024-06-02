# Movie Library Web Application

This is a movie library web application built using React for the frontend, Node.js for the backend, and MongoDB for the database. It allows users to sign in or sign up, search for movies using the OMDB API, create lists of movies, and manage the privacy settings of their lists.

## Features

1. **User Authentication**: Users can sign in or sign up to access the application.
2. **Movie Search**: After logging in, users can search for movies using the OMDB API and view details of the searched movies.
3. **Create Movie Lists**: Users can create lists of movies similar to YouTube playlists.
4. **Privacy Settings**: Users can set their lists as either public (visible to anyone with the list link) or private (only visible to the creator).
5. **Nice Layout**: The application features a user-friendly layout inspired by popular websites and applications.

## Tech Stack

- **Frontend**: React
- **Backend**: Node.js
- **Database**: MongoDB
- **API**: OMDB API

## Steps to Run

1. **Clone the Repository**: `https://github.com/Parimalasri13/intern.git`
2. **Install Dependencies**: 
   - Navigate to the frontend directory: `cd frontend` 
   - Install frontend dependencies: `npm install`
   - Navigate back to the root directory: `cd ..`
   - Navigate to the backend directory: `cd backend`
   - Install backend dependencies: `npm install`
3. **Set Up Environment Variables**: Create a `.env` file in the backend directory and add your MongoDB connection URI and any other necessary environment variables.
4. **Run the Application**:
   - Start the backend server: `npm run dev` (inside the backend directory)
   - Start the frontend server: `npm start` (inside the frontend directory)
5. **Access the Application**: Visit `http://localhost:3000` in your web browser to access the application.



## Links


- [Live Demo](https://fun-and-chill.vercel.app/)
