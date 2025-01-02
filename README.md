# TalentForce

An **employee and department management system** that allows organizations to efficiently manage employees' records, department details, and associated data.

---

## Tech Stack

### Front-end

- **Typescript and Angular**: Used for creating dynamic, component-based UI.
- **Bootstrap**: For styling and creating responsive layouts.

### Back-end

- **Java and Spring Boot**: Handles API logic, database connections, and validation.
- **JPA (Hibernate)**: Provides ORM functionality.
- **MySQL**: Relational database for storing data.

---

## Features

### 1. **Employee Management**

- Add, Update, Delete, and View employees.
- Includes all employee fields:
  - First Name, Last Name, Age, Gender, Email, Location, Leave Days Left, Contract Type, Salary, Hire Date, Employment Status, and Department.
- Supports validation for critical fields.

### 2. **Department Management**

- Add, Update, Delete, and View departments.
- View all employees associated with a specific department.

### 3. **Search Functionality**

- Search for employees by ID, Name, or Location.
- Search for departments by ID.

### 4. **Real-Time Updates**

- Employee and department data is updated dynamically without requiring page reloads.

### 5. **Organized Tables**

- Neatly formatted tables with options to:
  - View all employees.
  - View employees filtered by department.

---

## Database Schema

Here is a simple schema overview:

### **Employee Table**

| Column              | Type          | Description                         |
| ------------------- | ------------- | ----------------------------------- |
| `employee_id`       | Long          | Auto-generated unique ID            |
| `first_name`        | String        | Employee's first name               |
| `last_name`         | String        | Employee's last name                |
| `age`               | Long          | Employee's age                      |
| `gender`            | String (M/F)  | Employee's gender                   |
| `email`             | String        | Employee's email                    |
| `location`          | String        | Employee's location                 |
| `leave_days_left`   | Integer       | Remaining leave days                |
| `contract_type`     | Enum          | Contract type (PERMANENT/TEMPORARY/INTERNSHIP) |
| `salary`            | BigDecimal    | Employee's salary                   |
| `hire_date`         | String (Date) | Date of hire                        |
| `employment_status` | Enum          | Status (ACTIVE/TERMINATED/RETIRED)  |
| `department_id`     | Long (FK)     | Reference to the department         |

### **Department Table**

| Column          | Type   | Description              |
| --------------- | ------ | ------------------------ |
| `department_id` | Long   | Auto-generated unique ID |
| `name`          | String | Department name          |

---

## Getting Started

### Prerequisites

- **Docker**: Ensure Docker is installed and running.
- **Git**: Ensure Git is installed.

### Updated Docker Compose Instructions

#### **1. Clone the Repository**
```bash
git clone https://github.com/gianni-jin/TalentForce-V2.0
cd TalentForce-V2.0
```

#### **2. Run Both Backend and Frontend with Docker Compose**

##### **Backend**
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Use Docker Compose to build and run the backend services:
   ```bash
   docker-compose up --build
   ```

##### **Frontend**
1. Open another terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Use Docker Compose to build and run the frontend services:
   ```bash
   docker-compose up --build
   ```

#### **3. Access the Application**
- **Frontend**: [http://localhost:4200](http://localhost:4200)
- **Backend API**: [http://localhost:8080](http://localhost:8080)

---

## License

This project is licensed under the MIT License.

