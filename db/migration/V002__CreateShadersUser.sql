CREATE USER shader_user WITH PASSWORD 'replace_me';

GRANT USAGE
    ON SCHEMA shaders
    TO shader_user;

ALTER DEFAULT PRIVILEGES IN SCHEMA shaders GRANT SELECT ON TABLES TO shader_user;