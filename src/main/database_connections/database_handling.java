package main.database_connections;
import java.util.List;

import main.classes.user;

public interface database_handling 

{
    Boolean insert_into_db(user user);
    //inserts information provided by user into table
    Object retrieve_patient_from_db(String patient);
    //retrieves information given a user
    Object retrieve_doctor_from_db(String doctor);
    //retrieves information from db given doctor
    



}
