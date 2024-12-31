# TalentForce

An **employee and department management system** that allows organizations to efficiently manage employees' records, department details, and associated data.

---

## Tech Stack

### Front-end

- **Angular**: Used for creating dynamic, component-based UI.
- **Bootstrap**: For styling and creating responsive layouts.

### Back-end

- **Spring Boot**: Handles API logic, database connections, and validation.
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
| `contract_type`     | Enum          | Contract type (PERMANENT/TEMPORARY) |
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

### Build and Run with Docker

#### 1. **Clone the Repository**

```bash
git clone https://github.com/gianni-jin/talentforce.git
cd talentforce
```

#### 2. **Build Docker Images**

1. Build the backend image:
   ```bash
   docker build -t talentforce-backend ./backend
   ```
2. Build the frontend image:
   ```bash
   docker build -t talentforce-frontend ./frontend
   ```

#### 3. **Create and Run Containers**

1. Create a Docker network:
   ```bash
   docker network create talentforce-network
   ```
2. Run the MySQL container:
   ```bash
   docker run --name mysql-container \
     --network talentforce-network \
     -e MYSQL_ROOT_PASSWORD=root \
     -e MYSQL_DATABASE=emp_management \
     -d mysql:8.0
   ```
3. Run the backend container:
   ```bash
   docker run --name backend-container \
     --network talentforce-network \
     -e SPRING_PROFILES_ACTIVE=docker \
     -e MYSQL_HOST=mysql-container \
     -e MYSQL_PORT=3306 \
     -e MYSQL_DATABASE=emp_management \
     -e MYSQL_USERNAME=root \
     -e MYSQL_PASSWORD=root \
     -p 8080:8080 \
     -d talentforce-backend
   ```
4. Run the frontend container:
   ```bash
   docker run --name frontend-container \
     --network talentforce-network \
     -p 4200:80 \
     -d talentforce-frontend
   ```

#### 4. **Access the Application**

- Open your browser and navigate to:
  - **Frontend**: [http://localhost:4200](http://localhost:4200)
  - **Backend API**: [http://localhost:8080](http://localhost:8080)


---

## License

This project is licensed under the MIT License.

