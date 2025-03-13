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
│   │   ├── eventController.ts
│   │   └── tradeController.ts
│   ├── middlewares
│   │   ├── authMiddleware.ts
│   │   └── errorMiddleware.ts
│   ├── models
│   │   ├── eventModel.ts
│   │   ├── tradeModel.ts
│   │   └── userModel.ts
│   ├── routes
│   │   ├── adminRoutes.ts
│   │   ├── authRoutes.ts
│   │   └── eventRoutes.ts
│   ├── services
│   │   ├── authService.ts
│   │   ├── eventService.ts
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
   npm run start
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

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.