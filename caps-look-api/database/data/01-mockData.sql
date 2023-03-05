BEGIN;
--site
INSERT INTO site (site_name, country_name) VALUES ('Nazareth','israel'),('Rannana','israel'),('Pune','india');
--project
INSERT INTO project (project_name,planned_site_mix,start_date, project_iterations_count) VALUES
('VR','{"Nazareth":"10","Pune":"5"}','2021-08-17',2),('SES','{"Nazareth":"12","Rannana":"2"}','2021-05-10',2),
('ARM','{"Rannana":"4","Pune":"10"}','2022-03-25',2),('OPTIMA','{"Nazareth":"15","Pune":"6"}','2022-07-27',1);
--application
INSERT INTO application (application_name, project_id) VALUES
('OMS',1),('ODB',1),('T1',3),('V3',3),('OSO',2),('ODO',2),('PLTD',4);
--iteration
INSERT INTO iteration (iteration_name, project_id, iteration_number, iteration_start_date, iteration_end_date) VALUES
('iteration-27',1,1,'2021-08-17','2021-09-06'),('iteration-27',1,2,'2021-09-07','2021-09-13'),
('iteration-28',1,1,'2021-09-14','2021-10-04');
INSERT INTO iteration (iteration_name, project_id, iteration_number, iteration_start_date, iteration_end_date) VALUES
('iteration-20',2,1,'2021-05-10','2021-05-17'),('iteration-20',2,2,'2021-05-18','2021-06-07'),
('iteration-20',2,3,'2021-06-08','2021-07-01'),('iteration-21',2,1,'2021-07-02','2021-07-15');
INSERT INTO iteration (iteration_name, project_id, iteration_number, iteration_start_date, iteration_end_date) VALUES
 ('iteration-25',3,1,'2022-03-25','2022-04-08'),('iteration-25',3,2,'2022-04-09','2022-05-01'),
('iteration-26',3,1,'2022-05-20','2021-06-25'),('iteration-26',3,2,'2022-06-26','2022-07-20');
INSERT INTO iteration (iteration_name, project_id, iteration_number, iteration_start_date, iteration_end_date) VALUES
 ('iteration-30',4,1,'2022-07-27','2022-08-15'),('iteration-30',4,2,'2022-08-16','2022-09-01');
--milestone
INSERT INTO milestone (milestone_name, project_id, milestone_date, description) VALUES
('pi27-deployment',1,'2021-08-17','the deployment of pi 27'),
('pi27-release',1,'2021-09-06','the first version release'),
('pi27-cut-off',1,'2021-09-13','the cut-off of pi 27'),
('pi28-deployment',1,'2021-09-14','the deployment of pi 27'),
('pi28-features',1,'2021-09-26','adding some features'),
('pi28-cut-off',1,'2021-10-04','the cut-off of pi 28'),
('pi20-deployment',2,'2021-05-10','the deployment of pi 20'),
('pi20-release',2,'2021-05-20','the first version release'),
('pi20-cut-off',2,'2021-07-01','the cut-off of pi 20'),
('pi21-deployment',2,'2021-07-02','the deployment of pi 21'),
('pi21-features',2,'2021-07-10','adding some features'),
('pi21-cut-off',2,'2021-07-15','the cut-off of pi 21'),
('pi25-deployment',3,'2022-03-25','the deployment of pi 25'),
('pi25-release',3,'2022-04-15','the first version release'),
('pi25-cut-off',3,'2022-05-01','the cut-off of pi 25'),
('pi26-deployment',3,'2022-05-20','the deployment of pi 26'),
('pi26-features',3,'2022-06-30','adding some features'),
('pi26-cut-off',3,'2022-07-20','the cut-off of pi 26'),
('pi30-deployment',4,'2022-07-27','the deployment of pi 30'),
('pi30-release',4,'2022-08-20','the first version release'),
('pi30-cut-off',4,'2022-09-01','the cut-off of pi 30');
--job
INSERT INTO job (job_name) VALUES ('scrum master'),('developer'),('scrum tester'),('manager'),('architect'),('specialist');
--employees
INSERT INTO employee (id_number, employee_name, email, phone, productivity, site_id, job_id, project_id, access_tier) VALUES
('69807','Majd', 'majd@gmail.com','0501234567', '50', 3,1,1,'scrum_master'),
('95384','Haitham', 'haitham@gmail.com','0501234567', '0', 3,2,1,'no_access'),
('159556','Yosra', 'yosra@gmail.com','0501234567', '90', 3,2,1,'no_access'),
('148725','Saher', 'saher@gmail.com','0501234567', '90', 3,2,1,'no_access'),
('153117','Joumana', 'joumana@gmail.com','0501234567', '90', 3,2,1,'no_access'),
('159808','Noor', 'noor@gmail.com','0501234567', '0', 3,2,1,'no_access'),
('102589','Mahmood', 'mahmood@gmail.com','0501234567', '90', 3,3,1,'no_access'),
('456714', 'Mario', 'mario@gmail.com','0501234567', '50', 3,1,2,'scrum_master'),
('09876', 'Amal', 'amal@gmail.com','0501234567', '0', 3,6,2,'no_access'),
('123456', 'Hani', 'hani@gmail.com','0501234567', '70', 1,2,2,'no_access'),
('24678', 'Ahmad', 'ahmad@gmail.com','0501234567', '90', 1,2,2,'no_access'),
('1684334', 'Moayad', 'moayad@gmail.com','0501234567', '90', 1,2,2,'no_access'),
('98652', 'Salma', 'salma@gmail.com','0501234567', '0', 1,5,2,'no_access'),
('116884', 'Mohammed Awawdy', 'awawdy@gmail.com','0501234567', '90', 1,3,2,'no_access'),
('69807','Tawfik', 'tawfik@gmail.com','0501234567', '50', 1,1,3,'scrum_master'),
('12345','Leen', 'leen@gmail.com','0501234567', '0', 1,4,3,'no_access'),
('234567','Helal', 'helal@gmail.com','0501234567', '80', 3,2,3,'no_access'),
('87654','Wael', 'wael@gmail.com','0501234567', '90', 3,2,3,'no_access'),
('4560987','Mohammed Zoabi', 'zoabi@gmail.com','0501234567', '70', 3,2,3,'no_access'),
('8765098','Astbrq', 'astbrq@gmail.com','0501234567', '0', 3,5,3,'no_access'),
('234567','Souhel', 'souhel@gmail.com','0501234567', '90', 3,3,3,'no_access'),
('754325', 'Riham', 'riham@gmail.com','0501234567', '50', 3,1,4,'scrum_master'),
('14262', 'Ghazi', 'ghazi@gmail.com','0501234567', '0', 3,6,4,'no_access'),
('09873', 'Asmaa', 'asmaa@gmail.com','0501234567', '80', 1,2,4,'no_access'),
('246782', 'Nur', 'nur@gmail.com','0501234567', '90', 1,2,4,'no_access'),
('098765', 'Samar', 'samar@gmail.com','0501234567', '0', 1,2,4,'no_access'),
('383216', 'Naim', 'naim@gmail.com','0501234567', '90', 1,5,4,'no_access'),
('976431', 'abdalla', 'abdalla@gmail.com','0501234567', '90', 1,3,4,'no_access'),
('000000', 'Khalid', 'khalid@gmail.com','0501234567', '0', 3,1,null,'resource_manager'),
('111111', 'Sally', 'sally@gmail.com','0501234567', '0', 3,1,null,'project_manager');
--scrum
INSERT INTO scrum (scrum_name, scrum_master_id, project_id, application_id) VALUES
('Agno', 1, 1, 1),('sky', 15,2,5),('Panay', 8,3,3),('Jalapeos', 22,4,7);
--employee_scrum
INSERT INTO employee_scrum (employee_id, scrum_id) VALUES
(1,1),(2,1),(3,1),(4,1),(5,1),(6,1),(7,1),
(8,3),(9,3),(10,3),(11,3),(12,3),(13,3),(14,3),
(15,2),(16,2),(17,2),(18,2),(19,2),(20,2),(21,2),
(22,4),(23,4),(24,4),(25,4),(26,4),(27,4),(28,4);
--users
INSERT INTO users (employee_id, email, password) VALUES
(1, 'majd@gmail.com', '$2b$10$P6Qy.j8DI5BtKYi08/UGhuQ94QDDVmhNNObW3gvDtSrO6OB2n.x96'),      --password: "majd"
(8, 'mario@gmail.com', '$2b$10$JJXMcAAyAvKhAnHmOjY5TuKKxNNv20YwRnQZtDXKICT2ZVkRGiv2a'),     --password: "mario"
(15, 'tawfik@gmail.com', '$2b$10$6YCWLAGC7b9wS12TS8H5VOEEeG0v989fyc9TWuPDw9FIV87dL3arC'),   --password: "tawfik"
(22, 'riham@gmail.com', '$2b$10$lR.Tp43V5wcQXG33nZetOe5cQ/rhQ6PpuBhPfKvVsPHhl8jSc1PMm'),    --password: "riham"
(29, 'khalid@gmail.com', '$2b$10$5ZXDDayBVkmROPxSPXpdXeBHEVzL.hQtWirCEr.pLQqxpS89.YrOG'),   --password: "khalid"
(30, 'sally@gmail.com', '$2b$10$w.bzMY3RLihEHB.Xm9KdHedzp1dONPQcrJtdm3XmKjZbt4WVusHZe');    --password: "sally"
-- absence
INSERT INTO absence (absence_name, site_id, mandatory, absence_start_date, absence_end_date) VALUES
('Christmas', 1, 'mandatory','2023-12-25','2023-12-31'),
('Christmas', 2, 'mandatory','2023-12-25','2023-12-31'),
('Christmas', 3, 'optional','2023-12-25','2023-12-31'),
('Kippur', 1, 'optional','2023-09-24','2023-09-25'),
('Kippur', 2, 'optional','2023-09-24','2023-09-25'),
('Easter', 1, 'mandatory','2023-04-09','2023-04-16'),
('Easter', 2,'mandatory','2023-04-09','2023-04-16'),
('Easter', 3, 'optional','2023-04-09','2023-04-16'),
('Diwali', 3, 'mandatory', '2023-11-10','2023-11-14'),
('Passover', 1, 'optional','2023-04-09','2023-04-16'),
('Passover', 2, 'mandatory','2023-04-09','2023-04-16');
commit;