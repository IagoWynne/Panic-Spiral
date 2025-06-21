# Setup
## Running the App
- Make duplicate of `example.env` with the filename `.env`
- In `.env` change:
    - `POSTGRES_USER` and `POSTGRES_PASSWORD` to a user/password combination of your choice
    - `API_DATABASE_USER` and `API_DATABASE_PASSWORD` to a user/password combination of your choice (for dev work, you could use the postgres ones)
- Navigate to `./website` and run `npm install && npm run prebuild`
- Return to the root directory
- Run `docker compose up -d`

This automatically runs:
- The website in dev mode (with hot reload) on port 25880
- The api on port 25881

## Running the App with a GUI for the database
- In `.env` change `PGADMIN_DEFAULT_EMAIL` to an email of your choice (doesn't have to be a real email) and `PGADMIN_DEFAULT_PASSWORD` to a password of your choice
- Run `docker compose -f compose.yml -f compose.pgadmin.yml -f up -d`