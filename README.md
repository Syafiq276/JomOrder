# JomOrder — Malaysian "Warung" POS Ecosystem

JomOrder is a robust, data-driven POS and operations management system designed specifically for Malaysian F&B businesses ("Warungs"). Built with Laravel 12, React 18, and Inertia.js, it provides a seamless bridge between front-of-house staff, the kitchen, and the business owner.

---

## 🚀 Core Modules

### 1. 🚶 Staff POS Interface
A high-efficiency interface for table management and order entry.
*   **Table Occupancy:** Visual Pulse/Badge indicators for busy tables.
*   **Smart Merging:** Automatically append new items to active table sessions.
*   **Checkout System:** Consolidated billing with Cash and QR payment support.
*   **Platform Tracking:** Native support for **Grab** and **Foodpanda** orders.

### 2. 👨‍🍳 Kitchen Display System (KDS)
Real-time coordination for the kitchen crew.
*   **AJAX Polling:** Instant order arrival (5s interval).
*   **'NEW' Flags:** Distinct red tagging for items added to existing orders.
*   **Item-Level Progress:** Track individual item cooking status.
*   **Delivery Mode:** specialized ticket themes for Grab/Panda dispatch.

### 3. 📊 Admin Dashboard & Analytics
A premium command center for business intelligence.
*   **Financial Reporting:** Track Revenue, Cost of Goods (COGS), and Gross Profit.
*   **Visual Charts:** Custom SVG graphs comparing performance across platforms.
*   **Time Filtering:** Toggle between Today, This Month, and Annual performance.
*   **Menu & Vendor Management:** Centralized control over pricing, availability, and supplier costs.

---

## 🔐 Security & Roles
Implemented with Role-Based Access Control (RBAC):
*   **Admin:** Full access to financial reports, menu editing, and vendor management.
*   **Staff:** Access to the POS ordering and checkout interface.
*   **Kitchen:** Access to the KDS status board.

---

## 🛠 Tech Stack
*   **Backend:** Laravel 12, MySQL
*   **Frontend:** React 18, Inertia.js 2.0 (The Modern Monolith)
*   **Styling:** Vanilla CSS + Tailwind for premium, warm aesthetics.
*   **Real-time:** Optimized AJAX Polling.

---

## 📦 Installation & Setup

1. **Clone & Install Dependencies**
   ```bash
   git clone https://github.com/Syafiq276/JomOrder.git
   cd JomOrder
   composer install
   npm install
   ```

2. **Environment Configuration**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

3. **Database Setup**
   ```bash
   php artisan migrate --seed
   ```
   *Note: Default admin credentials can be found in `DatabaseSeeder.php`.*

4. **Run Development Server**
   ```bash
   npm run dev
   # In another terminal:
   php artisan serve
   ```

---

## 🎨 Design System
JomOrder uses a **Warm Earthy Palette** inspired by Malaysian hospitality:
*   **Soft Beige / Cream:** Backgrounds.
*   **Cocoa Brown:** Secondary accents and text.
*   **Gold / Amber:** Primary actions and CTA.
*   **Glassmorphism:** Modern card designs with subtle blurs.

---

## 📄 License
Open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
