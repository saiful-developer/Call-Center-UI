# CallCenterTask - UI

CallCenterTask is a web-based application built with **Angular 20** and **Bootstrap**, designed to manage and streamline call center operations through role-based dashboards and messaging features.

This repository contains the **frontend (UI)** source code for the CallCenterTask project.

## 🔑 Features

- 🔐 **Login system** (JWT-based, handled in backend)
- 👥 **Role-based routing**
  - **Agent**
    - Dashboard
    - Profile
    - Send Message
  - **Supervisor**
    - Dashboard
    - Profile
    - Send Message
  - **Admin**
    - Dashboard
    - Profile
    - User Management
      - User List (Search, Filter, Export to CSV/PDF)
      - Create / Edit / Delete Users
    - Message Management (View All User Messages)
- 📱 **Responsive UI** with Bootstrap

> Each role has a separate interface and routing path.

## ⚙️ Tech Stack

- [Angular 20](https://angular.io/)
- [Bootstrap 5](https://getbootstrap.com/)
- [TypeScript](https://www.typescriptlang.org/)
