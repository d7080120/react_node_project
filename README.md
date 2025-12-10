# SurveySphere – Full Stack Survey Platform

SurveySphere is a full-stack application that allows organizations to create, distribute, and analyze surveys in real time.  
The platform includes a public survey interface, an admin dashboard for management & analytics, multi-language support, live result visualizations, export options, and more.

## Project Structure

SurveySphere
 ┣ backend/                  
 ┣ frontend/                 
 ┣ database/                 
 ┣ images/                   
 ┣ .env                      
 ┣ README.md                 
 ┗ package.json

## Main Features

| Feature | Description |
|--------|-------------|
| Survey creation & management | Admin can create surveys with various question types |
| Multi-language support | Interface & surveys displayed according to user language |
| Real-time results display | Updated charts and responses streamed instantly |
| Admin dashboard & analytics | View response stats, participation, charts, metrics |
| Export survey data | CSV & PDF export built in |
| Notifications system | When a new survey is created, participants receive notification |
| Access control | Admin screens protected, public survey screens accessible |
| Responsive UI | Works on desktop and mobile |

## Screenshots

> Images stored in `/images`

![Public Survey UI](./images/public-survey.png)  
![Admin Dashboard](./images/admin-dashboard.png)  
![Live Analytics](./images/live-analytics.png)  
![Survey List](./images/survey-list.png)  

## Tech Stack

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Socket.IO for real-time updates

### Frontend
- React + Redux Toolkit
- React Router
- TailwindCSS UI
- Axios for API communication

## Installation & Setup

### 1 Clone repository
```
git clone https://github.com/youruser/SurveySphere.git
cd SurveySphere
```

### 2 Install dependencies
```
cd backend && npm install
cd ../frontend && npm install
```

### 3️ Configure `.env` files  
Backend:
```
MONGO_URI=
JWT_SECRET=
PORT=5000
```
Frontend:
```
VITE_API_URL=http://localhost:5000
```

### 4️ Start dev mode
```
cd backend && npm run dev
cd ../frontend && npm run dev
```

