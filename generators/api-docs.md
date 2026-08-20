# Generator API Documentation

The generator module provides a REST API to control the generation of logs, metrics, and traces.

## Base URL
`http://localhost:8081`

## Endpoints

### 1. Update Configuration
Updates the generator's state and data generation frequency.

- **URL**: `/config`
- **Method**: `POST`
- **Content-Type**: `application/json`
- **Request Body**:
  ```json
  {
    "running": true,
    "rate": 1000
  }
  ```
  - `running` (boolean): Set to `true` to start generation, `false` to stop.
  - `rate` (integer): Time interval between data generation in milliseconds.

- **Success Response**:
  - **Code**: `200 OK`
  - **Content**: The updated configuration object.

### 2. Get Status
Returns the current configuration of the generator.

- **URL**: `/status`
- **Method**: `GET`
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "running": true,
      "rate": 1000
    }
    ```

## Data Persistence
The generated data is persisted in the `./data` directory relative to the project root:
- `data/logs.txt`
- `data/metrics.txt`
- `data/traces.txt`
