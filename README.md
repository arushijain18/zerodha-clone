# 📈 Zerodha Clone

A full-stack clone of [Zerodha](https://zerodha.com) — India's largest stock broker — built to replicate its landing page, trading dashboard, and core order/holdings workflow. This project is split into three independent apps that work together: a marketing **frontend**, a trading **dashboard**, and a Node/Express **backend** API.

---

##  Project Structure

```
Zerodha Clone/
├── backend/        # Express + MongoDB API, JWT authentication
├── dashboard/       # React app — Holdings, Positions, Orders, Watchlist
└── frontend/        # React app — Landing page, Signup/Login
```

Each folder is a self-contained app with its own `package.json` and runs on its own port.

| App         | Port  | Purpose                                    |
|-------------|-------|---------------------------------------------|
| `frontend`  | 3000  | Public landing page + signup/login flow     |
| `dashboard` | 3001  | Authenticated trading dashboard             |
| `backend`   | 3002  | REST API, MongoDB models, JWT auth          |

---

##  Features

-  **Mobile-number based login** with JWT authentication
-  **Live Holdings** view with cost, LTP, P&L, and a bar chart of stock prices
-  **Orders** placed via a draggable Buy/Sell action window
-  **Positions** tracking with live profit/loss coloring
-  **Per-user data isolation** — every holding, order, and position is scoped to the logged-in user's mobile number
-  A pixel-close recreation of Zerodha's actual landing page — hero, investment options, steps, benefits, account types, and FAQs

---

##  Tech Stack

**Frontend & Dashboard**
- React
- React Router DOM
- Axios
- Bootstrap / custom CSS
- Chart.js (via a custom `VerticalGraph` component)

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JSON Web Tokens (`jsonwebtoken`)
- CORS, dotenv, body-parser

---

##  Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/arushijain18/zerodha-clone.git
cd zerodha-clone
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```env
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=3002
```

Start the server:

```bash
npm start
```

### 3. Set up the dashboard

```bash
cd ../dashboard
npm install
npm start
```

Runs on **http://localhost:3001**

### 4. Set up the frontend

```bash
cd ../frontend
npm install
npm start
```

Runs on **http://localhost:3000**

>  Start all three apps for the full flow to work: `frontend` → login → redirects to `dashboard`, which talks to `backend`.

---

##  Authentication Flow

1. User enters a 10-digit mobile number on the **frontend** signup page.
2. Frontend calls `POST /login` on the backend — a user record is created (if new) and a **JWT** is issued.
3. The token is passed to the dashboard via URL param and stored in `localStorage`.
4. All dashboard API calls (`/allHoldings`, `/allOrders`, `/allPositions`, `/newOrder`) send the token as a `Bearer` header.
5. Backend middleware verifies the token and scopes every query to that user's mobile number.
6. Logging out clears the token and redirects back to the frontend.

---

##  API Endpoints

| Method | Endpoint        | Auth required | Description                     |
|--------|-----------------|:---:|-----------------------------------------|
| POST   | `/login`        | ❌  | Login/signup via mobile number, returns JWT |
| GET    | `/allHoldings`  | ✅  | Get the logged-in user's holdings       |
| GET    | `/allPositions` | ✅  | Get the logged-in user's positions      |
| GET    | `/allOrders`    | ✅  | Get the logged-in user's orders         |
| POST   | `/newOrder`     | ✅  | Place a new Buy/Sell order              |

---

##  Key Folders

```
backend/
├── model/          # Mongoose models (Holdings, Orders, Positions)
├── schemas/         # Mongoose schemas
└── index.js         # Express app, routes, auth middleware

dashboard/
└── src/components/  # Holdings, Orders, Positions, WatchList, Menu, BuyActionWindow...

frontend/
└── src/landing_page/  # Home, Signup, Pricing, Products, About, Support pages
```

---

##  Acknowledgements

Built as a learning project to recreate Zerodha's UI/UX and core trading-dashboard mechanics. Not affiliated with or endorsed by Zerodha Broking Ltd.

---

##  License

This project is for educational purposes only.


## Author
made by Arushi Jain
