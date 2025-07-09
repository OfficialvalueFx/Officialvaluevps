# Dating Website Environment Setup

This project provides a Dockerized environment for developing and running the dating website application. It includes services for the backend, frontend, database, caching, search, and message queuing.

## Prerequisites

*   [Docker](https://docs.docker.com/get-docker/) installed on your system.
*   [Docker Compose](https://docs.docker.com/compose/install/) (usually included with Docker Desktop).

## Services

The `docker-compose.yml` file defines the following services:

*   **`backend`**: The Node.js/Express application.
    *   Builds from `./backend/Dockerfile`.
    *   Accessible on `http://localhost:3000`.
    *   Source code is mounted from the local `./backend` directory.
*   **`frontend`**: The frontend application (React/Vue/Angular - placeholder).
    *   Builds from `./frontend/Dockerfile`.
    *   Accessible on `http://localhost:8080` (adjust port in `docker-compose.yml` and `frontend/Dockerfile` if needed).
    *   Source code is mounted from the local `./frontend` directory.
    *   **Note**: The `frontend/Dockerfile` and `frontend/package.json` `start` script are placeholders. You'll need to configure them for your specific frontend framework.
*   **`mysql`**: MySQL database.
    *   Uses the official `mysql:8.0` image.
    *   Data is persisted in the `mysql_data` Docker volume.
    *   Port: `3306` (accessible from other containers as `mysql:3306`).
    *   Credentials (defined in `docker-compose.yml`):
        *   Root password: `rootpassword`
        *   User: `user`
        *   Password: `password`
        *   Database: `dating_app_db`
*   **`redis`**: Redis cache.
    *   Uses the official `redis:6-alpine` image.
    *   Data is persisted in the `redis_data` Docker volume.
    *   Port: `6379` (accessible from other containers as `redis:6379`).
*   **`elasticsearch`**: Elasticsearch search engine.
    *   Uses `docker.elastic.co/elasticsearch/elasticsearch:7.17.0`.
    *   Data is persisted in the `es_data` Docker volume.
    *   Ports: `9200` (HTTP), `9300` (Transport).
*   **`rabbitmq`**: RabbitMQ message broker.
    *   Uses `rabbitmq:3.9-management-alpine`.
    *   Data is persisted in the `rabbitmq_data` Docker volume.
    *   Ports: `5672` (AMQP), `15672` (Management UI - accessible at `http://localhost:15672`).

## Getting Started

1.  **Clone the repository (if applicable) or ensure you have all files.**
2.  **Navigate to the project root directory** (where `docker-compose.yml` is located).
3.  **Update placeholder files:**
    *   **Backend:**
        *   Update `backend/server.js` with your actual backend logic.
        *   Update `backend/package.json` with your dependencies and run `npm install` locally if you want your `package-lock.json` to be copied into the image (or rely on `npm install` within Docker).
    *   **Frontend:**
        *   Replace `frontend/App.js` (or create `index.html`, `main.js`, etc.) with your actual frontend code.
        *   Update `frontend/package.json` with your framework, dependencies, and ensure the `start` and `build` scripts are correctly configured for your chosen framework (e.g., React, Vue, Angular).
        *   Update `frontend/Dockerfile` if your framework requires a different port or start command.
4.  **Build and start the services:**
    ```bash
    docker-compose up --build
    ```
    The `--build` flag ensures images are rebuilt if you've made changes to Dockerfiles or application code that needs to be part of the image. For subsequent starts, `docker-compose up` is usually sufficient unless Dockerfiles change.

5.  **Access the services:**
    *   Backend: `http://localhost:3000`
    *   Frontend: `http://localhost:8080` (or your configured port)
    *   RabbitMQ Management: `http://localhost:15672` (default credentials: guest/guest)
    *   MySQL can be accessed via a client on port `3306` (e.g., using DBeaver, TablePlus, or `mysql` CLI).
    *   Elasticsearch: `http://localhost:9200`
    *   Redis: `localhost:6379`

## Development Workflow

*   **Live Reloading:**
    *   The `backend` and `frontend` services mount the local source code directories into the containers.
    *   For the backend, `nodemon` is included in the placeholder `backend/package.json`. If you use it (`npm run dev` as the start command in `Dockerfile` or `docker-compose.yml`), it will watch for changes and restart the Node.js server.
    *   For the frontend, most modern development servers (like those from `create-react-app`, Vue CLI, Angular CLI) support hot module replacement or live reloading. Ensure your `npm start` script in `frontend/package.json` runs such a server.
*   **Installing Dependencies:**
    *   **Backend:** Add dependencies to `backend/package.json`. They will be installed when the image is built. If you need to install a new dependency while containers are running, you can:
        1.  Add it to `package.json`.
        2.  Run `docker-compose exec backend npm install <your-package-name>`.
        3.  Remember to rebuild the image (`docker-compose up --build`) next time to include it in the image.
    *   **Frontend:** Similar to the backend, add to `frontend/package.json` and either rebuild or `docker-compose exec frontend npm install <your-package-name>`.

## Stopping the Environment

*   To stop the services, press `Ctrl+C` in the terminal where `docker-compose up` is running.
*   To stop and remove the containers:
    ```bash
    docker-compose down
    ```
*   To stop and remove containers and volumes (deletes all data in MySQL, Redis, Elasticsearch, RabbitMQ):
    ```bash
    docker-compose down -v
    ```

## Troubleshooting

*   **Port Conflicts:** If any of the default ports (`3000`, `8080`, `3306`, `6379`, `9200`, `9300`, `5672`, `15672`) are already in use on your machine, you can change the host-side port mapping in `docker-compose.yml`. For example, to change the backend port from `3000` to `3001` on your host:
    ```yaml
    services:
      backend:
        ports:
          - "3001:3000" # Host:Container
    ```
*   **Elasticsearch `max_map_count` error:** On some Linux systems, Elasticsearch might require a higher `vm.max_map_count`. See [Elasticsearch documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/vm-max-map-count.html) for instructions on how to change this.
*   **Build issues:** Check the output of `docker-compose up --build` for any errors during the image building process. Ensure `package.json` files are correct and all necessary files are being copied in the `Dockerfiles`.
*   **Service connection issues:** Ensure services are on the same `app-network` in `docker-compose.yml` and use the service names (e.g., `mysql`, `redis`) as hostnames for inter-container communication.

This README provides a starting point. You should expand it with more specific details about your application as it develops.
