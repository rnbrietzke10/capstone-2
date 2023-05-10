\echo 'Delete and recreate texas_anglers_app db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE texas_anglers_app;
CREATE DATABASE texas_anglers_app;
\connect texas_anglers_app

\i texas-anglers-app-schema.sql
\i texas-anglers-app-seed.sql

\echo 'Delete and recreate texas_anglers_app_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE texas_anglers_app_test;
CREATE DATABASE texas_anglers_app_test;
\connect texas_anglers_app_test

\i texas_anglers_app-schema.sql
