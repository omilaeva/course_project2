# Course Project 2

The course project from the **Web Software Development** course.

This web application provides a list of topics and allows users to 
create one-choice questions within those topics. These questions can 
be answered by the user or others. Additionally, the application offers 
basic statistics, such as:
- Total number of available topics.
- Total number of available questions.
- Total number of answers submitted.

The application also includes an API for:
- Retrieving random questions.
- Answering random questions.

---

## 🚀 Demo on Render

Check out the live version of the application:  
[**https://course-project2.onrender.com/**](https://course-project2.onrender.com/)

---

## 🛠️ Run Locally

To run the web application on your local machine, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/omilaeva/course_project2.git
    ```
2. Navigate into the project directory:

    ```bash
    cd course_project2
   ```
   
3. Build the Docker containers:

    ```bash
    docker compose build
   ```
   
4. Start the application:

    ```bash
    docker compose up
   ```
   
The application should now be running locally on
[**http://localhost:7777**](http://localhost:7777)

## 🧪 Run Unit Tests
To run unit tests, use the following commands:

1. Navigate into the drill-and-practice directory:
    ```bash
   cd drill-and-practice
    ```
2. Execute the tests:
    ```bash
   deno test --import-map=mock.importmap.json -A
    ```

## 🔍 Run End-To-End Tests
To run end-to-end (E2E) tests, execute the following commands from the project's root directory:

1. Build the Docker containers:

    ```bash
    docker compose build
   ```
   
2. Run the E2E tests:
    ```bash
   docker compose run --entrypoint=npx e2e-playwright playwright test && docker compose rm -sf
   ```