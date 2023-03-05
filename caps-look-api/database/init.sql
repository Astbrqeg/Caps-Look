
BEGIN;

DROP TABLE IF EXISTS job, site,  application, iteration, milestone, scrum, employee,
employee_scrum, absence, employee_absence, users,project, pgmigrations  CASCADE;
DROP TYPE IF EXISTS role_access_tier,cost_level_enum CASCADE;

CREATE TABLE job (
   id SERIAL PRIMARY KEY,
   job_name VARCHAR(255)
   );

CREATE TABLE site (
   id SERIAL PRIMARY KEY,
   site_name VARCHAR(255),
   country_name VARCHAR(255)
);

CREATE TABLE project (
   id SERIAL PRIMARY KEY,
   project_name VARCHAR(255),
   planned_site_mix jsonb,
   start_date DATE,
   project_iterations_count INTEGER
   
);

CREATE TABLE iteration (
   id SERIAL PRIMARY KEY,
   iteration_name VARCHAR(255),
   project_id INTEGER REFERENCES project(id),
   iteration_number INTEGER,
   iteration_start_date DATE,
   iteration_end_date DATE
);

CREATE TABLE milestone (
   id SERIAL PRIMARY KEY,
   milestone_name VARCHAR(255),
   project_id INTEGER REFERENCES project(id),
   milestone_date DATE,
   description TEXT
);

CREATE TABLE application(
  id SERIAL PRIMARY KEY,
  application_name VARCHAR(255),
  project_id INTEGER REFERENCES project(id)
);

CREATE TYPE role_access_tier AS ENUM('scrum_master','project_manager','resource_manager','no_access');

CREATE TABLE employee (
  id SERIAL PRIMARY KEY,
  id_number VARCHAR(50),
  employee_name VARCHAR(255),
  email TEXT,
  phone VARCHAR(15) NOT NULL,
  productivity VARCHAR (10) NOT NULL,
  site_id INTEGER REFERENCES site(id),
  job_id INTEGER REFERENCES job(id),
  project_id INTEGER REFERENCES project(id) default null,
  access_tier role_access_tier DEFAULT 'no_access'
);

CREATE TABLE scrum (
  id SERIAL PRIMARY KEY,
  scrum_name VARCHAR(255),
  scrum_master_id INTEGER REFERENCES employee(id),
  project_id INTEGER REFERENCES project(id),
  application_id INTEGER REFERENCES application(id)
);

CREATE TABLE employee_scrum(
    id SERIAL PRIMARY KEY,
    employee_id INTEGER REFERENCES employee(id),
    scrum_id INTEGER REFERENCES scrum(id)
);

CREATE TABLE absence(
  id SERIAL PRIMARY KEY,
  absence_name VARCHAR(255),
  site_id INTEGER REFERENCES site(id),
  mandatory boolean default false,
  absence_start_date DATE,
  absence_end_date DATE
);

CREATE TABLE employee_absence(
  id SERIAL PRIMARY KEY,
  employee_id INTEGER REFERENCES employee(id),
  absence json NOT NULL    --[["absence":"cause"],["absence":"cause"],["absence":"cause"]]
);

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  employee_id INTEGER REFERENCES employee(id),
  email TEXT,
  password VARCHAR(255) 
);

commit;














