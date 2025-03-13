# Opinion Trading Backend

## Overview
The Opinion Trading Backend is a Node.js application built with Express.js that serves as the backend for an opinion trading system. It integrates with MongoDB for data storage, utilizes WebSockets for real-time updates, and connects to external APIs for live sports data.

## Features
- User registration and authentication with JWT
- Role-based access control for admin and user functionalities
- Real-time updates using WebSockets
- Integration with external sports data APIs
- Trade execution and settlement based on event outcomes
- Comprehensive error handling and logging

## Project Structure
```
opinion-trading-backend
├── src
│   ├── config
│   │   └── db.ts
│   ├── controllers
│   │   ├── authController.ts
│   │   ├── dataController.ts
│   │   ├── eventController.ts
│   │   ├── oddsController.ts
│   │   └── tradeController.ts
│   ├── middlewares
│   │   ├── authMiddleware.ts
│   │   └── errorMiddleware.ts
│   ├── models
│   │   ├── eventModel.ts
│   │   ├── tradeModel.ts
│   │   ├── userModel.ts
│   │   └── oddsModel.ts
│   ├── routes
│   │   ├── adminRoutes.ts
│   │   ├── authRoutes.ts
│   │   ├── dataRoutes.ts
│   │   ├── eventRoutes.ts
│   │   ├── oddsRoutes.ts
│   │   └── tradeRoutes.ts
│   ├── services
│   │   ├── apiService.ts
│   │   ├── authService.ts
│   │   ├── dataService.ts
│   │   ├── eventService.ts
│   │   ├── oddsService.ts
│   │   └── tradeService.ts
│   ├── sockets
│   │   └── socketHandler.ts
│   ├── utils
│   │   ├── logger.ts
│   │   └── apiClient.ts
│   ├── app.ts
│   └── server.ts
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd opinion-trading-backend
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Create a `.env` file in the root directory and configure your environment variables.

## Usage
1. Start the server:
   ```
   npm run dev
   ```
2. Access the API at `http://localhost:3000`.

## API Endpoints
- **Authentication**
  - `POST /api/auth/register` - Register a new user
  - `POST /api/auth/login` - Log in a user

- **Events**
  - `GET /api/events` - Fetch all events
  - `POST /api/events` - Create a new event (Admin only)

- **Trades**
  - `POST /api/trades` - Place a new trade
  - `GET /api/trades` - Fetch user trades

## WebSocket
Connect to the WebSocket server for real-time updates on events and trades.

## Logging
All API calls and WebSocket events are logged using Winston for better monitoring and debugging.

## Deployment
The backend is ready for deployment on cloud providers such as AWS, Render, or Heroku. Ensure to set the environment variables in the production environment.


## Architecture and Data Flow
The backend is built using Node.js and Express.js, with MongoDB as the database. The application uses JWT for authentication and role-based access control for admin functionalities. WebSockets are used for real-time updates on events and trades. The backend integrates with external sports data APIs to fetch live scores, events, and odds.

### Data Flow
1. User registers or logs in to the system.
2. User can view available events and place trades on live events.
3. Admin can create new events, manage trades, and view trade details.
4. The system fetches live sports data from external APIs and stores it in MongoDB.
5. WebSocket connections are used to push real-time updates to the frontend.

### Challenges and Solutions
- **Challenge:** Handling real-time updates for events and trades.
  - **Solution:** Implemented WebSocket connections using Socket.IO to push real-time updates to the frontend.
- **Challenge:** Integrating with external sports data APIs.
  - **Solution:** Created a service to fetch data from external APIs and store it in MongoDB. Used mock data if the live API is unavailable.
- **Challenge:** Implementing role-based access control.
  - **Solution:** Used JWT for authentication and created middleware to authorize roles for admin functionalities.