# Generator API Documentation

The generator module provides a REST API to control the generation of logs, metrics, and traces.

## Base URL
`http://localhost:8081`

## Endpoints

### 1. Update Configuration
Updates the generator's state, data generation frequency, and enables/disables specific services.

- **URL**: `/config`
- **Method**: `POST`
- **Content-Type**: `application/json`
- **Request Body**:
  ```json
  {
    "running": true,
    "rate": 1000,
    "services": {
      "nginx": {"enabled": true, "response_time": 0},
      "kafka": {"enabled": true, "response_time": 0},
      "digital": {"enabled": true, "response_time": 500},
      "core": {"enabled": true, "response_time": 0},
      "atm": {"enabled": true, "response_time": 0},
      "postgres": {"enabled": true, "response_time": 0}
    }
  }
  ```
  - `running` (boolean): Set to `true` to start generation, `false` to stop.
  - `rate` (integer): Time interval between data generation in milliseconds.
  - `services` (object): A mapping of service names to objects with:
    - `enabled` (boolean): `true` to enable, `false` to disable/interrupt.
    - `response_time` (integer): Artificial delay in milliseconds for the service.

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
