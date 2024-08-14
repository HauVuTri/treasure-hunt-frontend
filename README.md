# Treasure Hunt Frontend

## Overview

This is the frontend application for the Treasure Hunt project. It is built using React.js and Material-UI. The frontend interacts with the backend API to perform treasure map calculations, manage user sessions, and display historical results.

## Features

- User login and authentication
- Dynamic treasure map input and calculation
- Display of historical calculation results
- Responsive UI built with Material-UI
- Loading indicator while performing API calls

## Technologies Used

- React.js
- Material-UI
- Axios for API calls

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/treasure-hunt-frontend.git
   cd treasure-hunt-frontend
   ```
2. Install dependencies:
```
npm install
```
3. Set up environment variables:
REACT_APP_API_BASE_URL=https://localhost:7234/api

4.Run the application:
```
npm start 
```


**Key Features**
Authentication
Users can log in using their credentials. The app uses JWT for session management.
The LoginPage component handles user authentication.
Treasure Map Calculation
The MatrixInput component allows users to input the dimensions of the treasure map and the chest numbers.
The ResultDisplay component shows the fuel needed to retrieve the treasure based on the backend calculations.
Calculation History
The application stores and displays a history of past treasure map calculations.
Users can revert to a previous map configuration directly from the history list.
Loading Indicator
The app displays a loading overlay (using Material-UI's Backdrop and CircularProgress) when interacting with the API, ensuring a smooth user experience.