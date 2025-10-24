Spinning up the db:

```sh
docker compose up
```

This should start the postgres db and run the migrations to create the initial shader schema, user, and table

Connect to the db as root can be done via:
```sh
psql -h localhost -p 5432 -d postgres -U postgres -W 
```

Fixing up flyway migration stuff while just messing around:
```sh
DELETE FROM flyway_schema_history WHERE version = '
```