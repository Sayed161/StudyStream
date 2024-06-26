# Online School Platform

Welcome to the Online School Platform! This Django-based project is designed to facilitate e-learning by providing users with access to various courses, interactive quizzes, resources, and instructor interaction. Below is an overview of the features and functionalities implemented in this platform:

## 1. User Registration and Authentication:
- Users can register for an account, which involves providing necessary details.
- Upon registration, users receive an email verification link to activate their accounts.
- Registered users can log in and log out securely.

## 2. Course Creation:
- Admin have the ability to create courses for their students.
- Course creation includes providing details such as title, description, department, and other relevant information.

## 3. Course Management:
- Admin can update and delete courses they have created.
- Admin have access only to the courses they have added.

## 4. Course Listings:
- All available courses are displayed on the homepage.
- Each course is presented with its title, description, department, and other essential information.
- Students can filter courses by department.

## 5. Deployment and Submit:
- The Online School platform is deployed on a secure and scalable hosting platform for accessibility.

## Deployment:
To deploy the Online School platform locally, follow these steps:
1. Clone this repository to your local machine.
2. Install the necessary dependencies by running `pip install -r requirements.txt`.
3. Set up a database according to the provided schema.
4. Configure the environment variables for database connection and email services.
5. Run the Django development server using `python manage.py runserver`.
6. Access the platform via the provided URL.

## Technologies Used:
- Framework: Django
- Frontend: HTML, CSS, JavaScript
- Backend: Python
- Database: SQLite
- Email Services: SMTP



