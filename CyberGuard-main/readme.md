# CyberGuard

CyberGuard is a full-stack application for data breach detection and digital identity protection. It allows users to check if their personal information (email, phone, credit card) has been compromised in known data breaches, receive breach notifications, and view detailed security reports.

---

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

---

## Features

-**Data Breach Detection:** Check if your email, phone, or credit card has been leaked.

-**Breach Notifications:** Get alerts when your data appears in new breaches.

-**Detailed Reports:** View comprehensive breach and risk analysis.

-**User Authentication:** Secure login and signup with Firebase.

-**Modern UI:** Responsive React frontend with Tailwind CSS.

-**Admin Dashboard:** (Optional) For managing breach data.

---

## Project Structure

```

CyberGuard-main/

│

├── backend/           # Python backend for scraping/scheduling (optional)

│   ├── app.py

│   ├── config.py

│   ├── requirements.txt

│   └── ...

│

├── client/            # React frontend

│   ├── src/

│   ├── public/

│   ├── package.json

│   ├── tailwind.config.js

│   └── ...

│

├── server/            # Node.js/Express backend API

│   ├── app.js

│   ├── server.js

│   ├── models/

│   │   └── breachDataModel.js

│   ├── routes/

│   │   └── searchRoutes.js

│   ├── package.json

│   └── ...

│

└── README.md

```

---

## Tech Stack

-**Frontend:** React, TypeScript, Tailwind CSS, Vite, Firebase Auth

-**Backend:** Node.js, Express, MongoDB (Mongoose)

-**Python Backend (optional):** For scraping/scheduling breach data

-**Other:** Lucide React Icons, Styled JSX

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- MongoDB (local or Atlas)
- Python 3.10+ (for backend scrapers, optional)

### 1. Clone the Repository

```bash

gitclonehttps://github.com/yourusername/CyberGuard.git

cdCyberGuard-main

```

### 2. Setup the Server (API)

```bash

cdserver

npminstall

# Create a .env file with your MongoDB URI and other secrets

npmrundev

```

### 3. Setup the Client (Frontend)

```bash

cd../client

npminstall

# Copy .env.sample to .env and set your API endpoint if needed

npmrundev

```

### 4. (Optional) Setup the Python Backend

```bash

cd../backend

pipinstall-rrequirements.txt

# Run scrapers or scheduler as needed

pythonapp.py

```

---

## Environment Variables

### Server (`server/.env`)

```

MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/cyberguard

PORT=5000

```

### Client (`client/.env`)

```

VITE_API_URL=http://localhost:5000

# Firebase config variables as needed

```

---

## Scripts

### Server

-`npm run dev` — Start Express server with nodemon

### Client

-`npm run dev` — Start React development server

-`npm run build` — Build for production

-`npm run lint` — Lint code

---

## API Endpoints

### Search Breaches

-`GET /api/search?email=example@email.com`

-`GET /api/search?phone=1234567890`

-`GET /api/search?q=keyword`

**Response:**

```json

{

  "success": true,

  "count": 1,

  "breached": true,

  "searchTerm": "example@email.com",

  "searchType": "email",

  "data": [ ... ],

  "message": "Breaches found"

}

```

### Health Check

-`GET /api/health`

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License

[MIT](LICENSE)

---

<<<<<<< HEAD

**CyberGuard** — Protecting your digital identity from data breaches and cyber threats.

=======

**CyberGuard** — Protecting your digital identity from data breaches and cyber threats.

>>>>>>> 15d430ec090a35bef606cf2b7da356f184b7ef90
>>>>>>>
>>>>>>
>>>>>
>>>>
>>>
>>
>
