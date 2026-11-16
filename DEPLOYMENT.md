# CodeSphere Deployment Guide 🚀

This repository is configured for flexible, zero-friction deployment. You can deploy CodeSphere in several ways depending on your architecture preference:

1. **Decoupled (Recommended for Free Tier)**: Frontend on **Vercel** / **Netlify** + Backend on **Render** / **Railway** + Database on **MongoDB Atlas**.
2. **Unified Single Service**: Both Frontend and Backend served together from one web service (e.g. **Render**, **Railway**, **Heroku**).
3. **Containerized (Docker)**: Deploy anywhere (VPS, AWS, DigitalOcean, Coolify) with **Docker & Docker Compose**.

---

## Pre-requisites: MongoDB Database

CodeSphere requires a MongoDB database. For production, **MongoDB Atlas** provides a free forever M0 cluster:

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a free account.
2. Create a new **M0 Free Cluster**.
3. Under **Database Access**, create a database user with username and password.
4. Under **Network Access**, add `0.0.0.0/0` (Allow Access from Anywhere) to permit cloud servers to connect.
5. Under **Clusters > Connect > Drivers**, copy the connection string. It looks like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/codesphere?retryWrites=true&w=majority
   ```

---

## Option 1: Decoupled Deployment (Vercel + Render)

### Step 1: Deploy Backend (Render)

1. Push your repository to GitHub.
2. Sign in to [Render](https://render.com).
3. Click **New + > Web Service**.
4. Connect your GitHub repository.
5. Configure the service:
   - **Name**: `codesphere-backend`
   - **Root Directory**: `server`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Plan**: `Free`
6. Add the following **Environment Variables**:
   | Variable | Value | Notes |
   | :--- | :--- | :--- |
   | `NODE_ENV` | `production` | Recommended |
   | `PORT` | `10000` | Or leave empty (Render sets it) |
   | `MONGO_URI` | `mongodb+srv://...` | Your Atlas connection string |
   | `JWT_SECRET` | `generate-a-strong-random-key` | Used to sign JWTs |
   | `CLIENT_URL` | `https://your-frontend.vercel.app` | (Update after deploying frontend) |
   | `GITHUB_TOKEN` | *(optional)* | Personal Access Token to avoid GitHub rate limits |
7. Click **Create Web Service**.
8. Once deployed, note your backend URL (e.g. `https://codesphere-backend.onrender.com`). You can verify by visiting `https://codesphere-backend.onrender.com/api/health`.

### Step 2: Deploy Frontend (Vercel)

1. Sign in to [Vercel](https://vercel.com).
2. Click **Add New... > Project** and select your GitHub repository.
3. Configure the project:
   - **Framework Preset**: `Vite`
   - **Root Directory**: Click `Edit` and select `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add the **Environment Variable**:
   | Variable | Value |
   | :--- | :--- |
   | `VITE_API_BASE_URL` | `https://codesphere-backend.onrender.com/api` |
5. Click **Deploy**.
6. Once deployed, copy your Vercel URL (e.g., `https://codesphere.vercel.app`) and update the `CLIENT_URL` variable in your Render backend settings so CORS allows requests.

*(Note: SPA routing is pre-configured via `frontend/vercel.json` and `frontend/public/_redirects` to prevent 404s on page refresh.)*

---

## Option 2: Unified Deployment (Single Service on Render)

In this mode, Express serves both the REST API (`/api/*`) and the compiled React frontend from a single web service.

### Using Render Blueprint (`render.yaml`)

1. Go to **Render > Blueprints > New Blueprint Instance**.
2. Select your repository. Render will automatically detect `render.yaml`.
3. Fill in your `MONGO_URI` in the prompt and click **Apply**.

### Or Manual Render Setup:
- **Root Directory**: leave blank (root of repo)
- **Build Command**: `npm run build`
- **Start Command**: `npm start`
- **Environment Variables**:
  - `NODE_ENV`: `production`
  - `MONGO_URI`: `mongodb+srv://...`
  - `JWT_SECRET`: `your_random_secret_string`
  - `VITE_API_BASE_URL`: `/api`

---

## Option 3: Docker & Docker Compose (Any VPS / Cloud Server)

A production-ready `Dockerfile` and `docker-compose.yml` are included.

### Run with Docker Compose (includes local MongoDB):

```bash
# 1. Clone repository
git clone <your-repo-url>
cd CodeSphere-main

# 2. Build and start containers in background
docker compose up -d --build

# 3. View status and logs
docker compose ps
docker compose logs -f app
```

Your app will be live at `http://localhost:5001`.

### Build standalone Docker image:

```bash
docker build -t codesphere:latest .
docker run -p 5001:5001 \
  -e MONGO_URI="mongodb+srv://..." \
  -e JWT_SECRET="your_secret_key" \
  codesphere:latest
```

---

## Environment Variables Reference

| Variable | Scope | Required | Description | Example |
| :--- | :--- | :--- | :--- | :--- |
| `MONGO_URI` | Server | **Yes** | MongoDB connection URI | `mongodb+srv://user:pass@cluster.mongodb.net/codesphere` |
| `JWT_SECRET` | Server | **Yes** | Secret string for auth tokens | `mySecretKey456` |
| `PORT` | Server | No (Default: 5001) | HTTP listen port | `5001` or `10000` |
| `CLIENT_URL` | Server | No (Default: allow all) | Allowed CORS origins (comma-separated) | `https://codesphere.vercel.app` |
| `GITHUB_TOKEN` | Server | No | GitHub PAT for higher API rate limits | `ghp_xxxx` |
| `NODE_ENV` | Server | No | Environment mode | `production` |
| `VITE_API_BASE_URL` | Frontend | No (Default: `http://localhost:5001/api`) | Backend API base URL | `https://api.mycodesphere.com/api` or `/api` |

---

## Health Check & Verification

Once deployed, you can verify your service health via:

- **Health Check Endpoint**: `GET /api/health`
  ```json
  {
    "status": "ok",
    "uptime": 124,
    "timestamp": "2026-11-16T17:09:18.120Z"
  }
  ```
