# Smart House Monitoring System
This is a Smart House Monitoring project developed using Angular for the frontend and Node.js with MongoDB for the backend. The system allows for the management of users, rooms, and provides a dashboard for monitoring.

## Features
**User Management: Add, edit, and delete users.
**Room Management: Add, configure, and monitor rooms with devices (e.g., lights, fans, air conditioners, televisions).
**Dashboard: Real-time monitoring of room statuses and device states.
## Technologies Used
**Frontend: Angular
**Backend: Node.js
**Database: MongoDB
## Prerequisites
Ensure you have the following installed on your system:

Node.js 
Angular CLI 
MongoDB (running locally or on a cloud instance)

## Installation
# 1. Clone the Repository
```git clone https://github.com/your-username/smart-house-monitoring.git```

# 2. Backend Setup
Navigate to the backend folder:
````cd backend````
Install dependencies:
````npm install````
Start MongoDB:
Ensure your MongoDB server is running locally or in the cloud.

Configure MongoDB connection:
Open the ConnexionMongo.js file and update the MongoDB connection string if necessary.

Start the backend server:
````node ConnexionMongo.js````
# 3. Frontend Setup
Navigate to the frontend folder:
````cd frontend````
Install dependencies:
````npm install````
Start the Angular development server:
````ng serve````
Open your browser and navigate to:
````http://localhost:4200````
