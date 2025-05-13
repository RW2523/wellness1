This project contains the backend work for accessing the database and creating users.
The mysql database we will be connecting to is called user_info.
it contains 4 tables, user_credentials(represents patient account info), doctor_credentials (represents doctor account info), health_data (stores patient health records) and meeting _info (holds meeting information) the schema for these tables can be found in schema.md
The backend access revolves around the user class, which contains a user's login information, their name, a list of the health information they have entered, and a list of the meetings that they have scheduled, and whether or not the user is a doctor or a patient. 
The health information is stored in a user_health_info struct which contains the sleepcycle (String), heartrate(float), stepcount(int) and date(sql date) entered by the user. This data is then appended to the user's health information list
The meeting information is stored a telehealth_record struct which contains a user (can be a doctor or patient), the partner (can be doctor or patient) the meeting link, and an sql date indicating the meeting date. These records are appended to the users telehealth_records list and then entered into the database. 
The project also incldes several methods for database access depending on the type of data we want to access all implementing a database_handling interface with three methods, insert_into_db, which inserts a user's information into a table, retireve_patient_from_db, which retrieves information a patient would need to access, and retrieve_doctor_from_db, which retrieves information that a doctor would need to access.
The classes that implement these methods are health_information, telehealth_handling, and usersdb. 
Usersdb handles the creation of new users in mysql, inserting their information into the correct table, and retrieving their information from the correct table depnding on whether the user is a doctor or a patient. 
Health_information inserts a users health records into the database, retrieves all matching health records depending on if a user is a patient or a doctor, and returns that information
Telehealth_handling inserts meeting information into the database and retrieves meeting information depending on if the suer is a patient or a doctor. If the user is a patient it returns all of their meetings with doctors, and if the suer is a doctor, it returns all of their meetings with patients. 

the 
