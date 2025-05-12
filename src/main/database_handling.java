package main;
import java.util.List;

public interface database_handling 

{
    Boolean insert_into_db(user user);
    //inserts information provided by user into table
    List retrieve_from_db(String user);
    //retrieves information given a user



}
