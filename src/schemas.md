table schemas
credentials->user_credentials
-name string
-username string, 
-password string, 
-email email
,doctorname string
-doctor is foreign key with doctor_credentials
-name is primary key

create table user_credentials (name varchar(255) not null,username varchar (255) not null primary key, password varchar(255) not null, email varchar(255) not null, doctorname varchar(255));
create index before creating foreign key
alter table user_credentials add index username_index (username);

doctor_credentials->
-username string, password string, email email, name string
-name is primary key
create table doctor_credentials (name varchar(255) not null ,username varchar (255) not null primary key, password varchar(255) not null, email varchar(255) not null);

health_data
-patient string, sleepcycle string,HeartRate float, stepcount int, date_entered date
//patient is foreign key with patient.name
-added doctor_name as string


meeting_information
-patient string, doctor string, meetinglink string, date date
patient is foreign key with uer_credentials
doctor is foreign key with Doctor_credentials.name
create table meeting_information (patient varchar(255) not null,doctor varchar (255) not null, meeting_link varchar(255) not null, meeting_date date not null);
