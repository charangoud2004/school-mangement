# School Management API

This project provides REST APIs for managing school data, including adding and listing schools with location-based sorting.

## Migration to PostgreSQL

Initially, this project was built using MySQL on Railway. However, due to the exhaustion of free credits on Railway, I was forced to migrate to PostgreSQL on Render at the last moment. This unexpected change led to adjustments in database configurations and queries to ensure compatibility with PostgreSQL.

## Features
- Add new schools with name, address, latitude, and longitude
- List all schools with proximity-based sorting
- Hosted on Render with a PostgreSQL database

## Tech Stack
- Node.js
- Express.js
- PostgreSQL
- Render (for deployment)

## Installation & Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/charangoud2004/school-mangement.git
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables in a `.env` file:
   ```sh
   DATABASE_URL=<your_postgresql_connection_string>
   PORT=5000
   ```
4. Run the server:
   ```sh
   npm start
   ```

