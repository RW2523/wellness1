package main.database_connections;
import java.util.List;

import main.classes.user;

public interface database_handling 

{
    Boolean insert_into_db(user user);
    //inserts information provided by user into table
    Object retrieve_from_db(String user);
    //retrieves information given a user



}
