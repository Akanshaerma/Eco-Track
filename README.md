# 🌿 Eco-Health Portal & Carbon Footprint Tracker

A full-stack, industry-standard sustainable analytical platform designed to calculate, monitor, and log monthly environmental carbon footprints while seamlessly integrating dynamic user health vitals inside a single unified dashboard interface.

🔗 **Live Deployment Link:** [eco-track-sand-omega.vercel.app](https://eco-track-sand-omega.vercel.app/)

---

## 🚀 Application Screenshots

### 🔑 Secure Authentication Gate
<kbd>
  <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop" alt="Auth Interface" width="100%"/>
</kbd>

### 📊 Eco-Health Analytics Dashboard & Dynamic Vitals Panel
<kbd>
  <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop" alt="Dashboard Interface" width="100%"/>
</kbd>

---

## 🛠️ Tech Stack & Production Architecture

The system architecture decouples analytical logic using modern software paradigms:

| Layer | Technology | Primary Purpose |
| :--- | :--- | :--- |
| **Frontend UI** | React.js (v18+) | Component-driven component rendering layer |
| **Styling** | Tailwind CSS Framework | Utility-first responsive typography and flex-grids |
| **State Engine** | React Hooks (`useState`, `useEffect`) | Real-time dynamic biometric and lookup state handling |
| **Asynchronous I/O** | Axios Client Library | Robust JSON payload handshakes with REST endpoints |
| **Backend API** | Node.js / Express Server | Secure transaction management and middleware scaling |
| **Database Server** | MongoDB Atlas | Persistent analytics schemas and footprint history caching |
| **Cloud Hosting** | Vercel Platform | Continuous deployment (CI/CD) and live caching |

---

## ✨ Core Key Features Implemented

* **Dynamic Biometrics Indexing Layer:** Profile matrix updates user metrics natively. Implements a logical lookup date parsing algorithm determining calculated user age automatically via DOB string computation.
* **Separation of Concerns Layering:** Combines analytical logs tables fetched directly from active cloud databases side-by-side with localized calculations.
* **Carbon Mathematical Formula Pipeline:** Converts raw utility usage matrices (Travel distance, Power wattage, Food/Organic waste tonnage) seamlessly into standardized carbon metrics.
* **Mobile-First Flex-Grid Core Layout:** Clean micro-interactions, sleek emerald-themed contextual warnings, custom dropdown components, and sticky responsive sections.

---

## ⚙️ Local Development Setup Instructions

Follow these commands to configure the development pipeline micro-services locally:

```bash
# 1. Clone the active remote repository tree
git clone [https://github.com/Akanshaerma/Eco-Track.git](https://github.com/Akanshaerma/Eco-Track.git)

# 2. Change directory into the frontend asset tree
cd "Eco-Tracker frontend"

# 3. Synchronize package dependencies
npm install

# 4. Initiate the local asset hot-reloading development server
npm run dev
