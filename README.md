# 🧠 Sirenta – Assistant Lab Recruitment System

**Sirenta** is a web-based application designed to streamline the recruitment and selection process of laboratory assistants at the Informatics Department of Universitas Muhammadiyah Malang. This system digitizes every stage—from registration to multi-phase evaluations—ensuring an efficient, structured, and transparent selection process.

---

## 🚀 Key Features

### ✅ Participant Registration
- Online registration form for lab assistant applicants.
- Input validation and eligibility check.

### ✅ Participant Progress
- Visual timeline of participant progress.
- Stage-specific information and status updates.

### ✅ Selection Stage Management
- Stage 1: Written Test
- Stage 2: Microteaching and Interview
- Stage 3: Internship & Team Projects
- Admins can control each stage status (`open`, `inactive`, `completed`).
- Stage-by-stage participant evaluation and pass/fail decision.
- Reset participant status back to `in_progress` if needed.

### ✅ Authentication and Role-based Access
- Separate login roles for Admins, Judges, and Participants.
- Authentication handled with **Zustand** and **Cookies**.

### 🛠️ Question Bank Management *(In Development)*
- Create/Edit/Delete question collections.
- Add/Edit individual questions.
- View question details in modals.
- Integrated with `questions`, `choices`, and `answers` tables.

---

## 🧱 Technologies Used

### 🔧 Frontend
- **React.js** + **Tailwind CSS**
- **Zustand** (state management)
- **Axios** (API communication)
- **React Router DOM**

### 🔧 Backend
- **Node.js** + **Express**
- **Sequelize ORM**
- **MySQL**

---

## 🗃️ Database Structure (Overview)

- `users` – Stores participant, admin, and judge accounts.
- `user_progress` – Tracks participant status for each stage.
- `recruitment_sessions` – Recruitment session details.
- `stages` – Phase definitions of the recruitment process.
- `questions`, `answers`, `choices` – Used for the written test module.

---

## ⚠️ Status

> This project is still under active development. Some modules, such as **Question Management** and the **Judge Dashboard**, are currently being implemented.

---

## 📸 Screenshots

- **Participant Dashboard – Recruitment & Registration Open – Not Registered**
![image](https://github.com/user-attachments/assets/3bedd7c6-3027-4f2e-a65d-5390f793b31b)

- **Participant Dashboard – Recruitment Open, Registration Closed – Not Registered**
![image](https://github.com/user-attachments/assets/3305409d-9ba0-4291-b528-0b25c53038a9)

- **Participant Dashboard – Registered**
![image](https://github.com/user-attachments/assets/aac60513-0fa1-4840-8862-283340c22c6e)

- **Participant Registration Page**
![image](https://github.com/user-attachments/assets/2cfc6d6d-e4ec-46f7-9512-d514610ea0c0)

- **Admin Dashboard**
![image](https://github.com/user-attachments/assets/27a167b2-f9f1-4917-8dcb-387d97f7a05c)

- **Admin – Session Management**
![image](https://github.com/user-attachments/assets/1c206710-32bb-4bb4-b7d4-4c4d0346601d)

- **Admin – Stage Management**
![image](https://github.com/user-attachments/assets/b796a258-0f17-4b64-82c9-8a11cfda9314)

- **Judge Dashboard (In Progress)**
![image](https://github.com/user-attachments/assets/0d7843f2-71e8-4fd9-9ebc-76a6006ac9f5)

---

## 👨‍💻 Development Team

- **Erdy Muhammad Fakhri** (202310370311071)  
  _Informatics Student, Universitas Muhammadiyah Malang_  
  📧 erdyfai@gmail.com

- **Shofwan Alif Alfani** (202310370311238)  
  _Informatics Student, Universitas Muhammadiyah Malang_  
  📧 shofwanaliffigma@gmail.com

- **Atika Rokhma** (202310370311445)  
  _Informatics Student, Universitas Muhammadiyah Malang_  
  📧 atikarohmah2004@gmail.com

---

## 📄 License

This project was developed as part of an academic initiative. It is intended for educational and institutional use, but may be extended or adapted for broader applications.
