# Judiciary Information System (JIS) 🏛️

A modern web-based Judiciary Information System designed to streamline judicial workflows including case management, scheduling, and secure user authentication for Judges, Lawyers, and Registrars.

---

## 🚀 Tech Stack

- **Frontend:** Angular, HTML, CSS, Bootstrap, TypeScript  
- **Backend:** Laravel (PHP)
- **Database:** PostgreSQL
- **Version Control:** Git

---

## 📌 Features

### ✅ Core Modules
- **Login & Signup:**  
  Secure user authentication with separate access for Judges, Lawyers, and Registrars.

- **Profile Page:**  
  Personalized profile management for each user role.

- **Case List:**  
  View and manage current, past, and upcoming court cases.

- **Add Schedules:**  
  Add or update hearing schedules with date/time and case references.

- **Case Snapshot:**  
  View detailed case information including involved parties, status, and hearing history.

- **Search & Filter Cases:**  
  Quickly locate historical and ongoing cases through powerful search and filter tools.

---

## 📂 Project Structure (Major Modules)

```bash
├── backend (Laravel)
│   ├── app/
│   ├── routes/
│   └── database/
├── frontend (Angular)
│   ├── src/
│   │   ├── app/
│   │   │   ├── auth/        # Login, Signup
│   │   │   ├── profile/     # Profile page
│   │   │   ├── cases/       # Case list and snapshots
│   │   │   └── schedules/   # Add/view hearing schedules
│   └── assets/
├── README.md
└── .gitignore
