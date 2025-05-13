package main.database_connections;
import java.nio.FloatBuffer;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.sql.Date;
import java.util.List;

import main.classes.telehealth_record;
import main.classes.user;
import main.classes.user_health_info;

public class telehealth_handling implements database_handling{
//adds input data to the health database and gets it for the user
//
//schema:patient foreign key, doctor foreign key, 

    @Override
    public Boolean insert_into_db(user user)
    {
       Connection connection = null;
        try {
            // below two lines are used for connectivity.
            Class.forName("com.mysql.cj.jdbc.Driver");
            connection = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/user_info",
                "test", "test");
                //db is user info->stores credentials and health info
    
            //create statement
            List<telehealth_record> datatoinsert=user.getmeetinginfo();
            int rowsaffected=0;
            String insertstatement="INSERT INTO meeting_information VALUES (?, ?, ?,?)";

            PreparedStatement preparedStatement = connection.prepareStatement(insertstatement);
            for (int i=0;i<datatoinsert.size();i++)
            {

                telehealth_record insert_meeting_info=datatoinsert.get(i);
                //set insert values
                //preparedStatement.setString(1,user.getname());
                preparedStatement.setString(1,insert_meeting_info.getuser().getname());
                preparedStatement.setString(2,insert_meeting_info.getuser().getdrname());
                preparedStatement.setString(3,insert_meeting_info.getmeetinglink());
                preparedStatement.setDate(4,insert_meeting_info.getdate());
                rowsaffected += preparedStatement.executeUpdate();

            }
            
            
            preparedStatement.close();
            connection.close();
             if (rowsaffected>0)
            {
                return true;
            
            }
        }
        catch (Exception exception) {
            System.out.println(exception);
        } //access database with credentials
        //insert list information as row
        //return true if successful
        return false;
    }
  
    @Override
    public List<telehealth_record> retrieve_patient_from_db(String patient) 
    {
        Connection connection = null;
        List<telehealth_record>userinfo=new ArrayList<>();

        try {
            // below two lines are used for connectivity.
            Class.forName("com.mysql.cj.jdbc.Driver");
            connection = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/user_info",
                "test", "test");
                //db is user infor->stores credentials and health info
    
            //create statement
            String retrievestatement="Select * from meeting_information where patient=?";
            PreparedStatement preparedStatement = connection.prepareStatement(retrievestatement);
            //insert values to be entered
            preparedStatement.setString(1,patient);
           
            ResultSet resultSet = preparedStatement.executeQuery();
            // ... process the data
             while (resultSet.next()) 
             {
                String patient_name = resultSet.getString("patient");
                System.out.println(patient_name);
                usersdb usersdb=new usersdb();
                user patient_user=usersdb.retrieve_patient_from_db(patient_name);
                System.out.println(patient_user.getname());
                String doctor = resultSet.getString("doctor");
                user doctor_user=usersdb.retrieve_doctor_from_db(doctor);
                String meeting_link= resultSet.getString("meeting_link");               
                Date date = resultSet.getDate("meeting_date");
                telehealth_record datatoinsert= new telehealth_record(patient_user,doctor_user,meeting_link,date);
                userinfo.add(datatoinsert);
            }
            resultSet.close();
            preparedStatement.close();
            connection.close();
             
          
        }
        catch (Exception exception) {
            //System.out.println("exception");
            System.out.println(exception);
        } //access database with credentials
        //insert list information as row
        //return true if successful
        return userinfo;

}
public List<telehealth_record> retrieve_doctor_from_db(String doctor) 
    {
        Connection connection = null;
        List<telehealth_record>userinfo=new ArrayList<>();

        try {
            // below two lines are used for connectivity.
            Class.forName("com.mysql.cj.jdbc.Driver");
            connection = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/user_info",
                "test", "test");
                //db is user infor->stores credentials and health info
    
            //create statement
            String retrievestatement="Select * from meeting_information where doctor = ?";
            PreparedStatement preparedStatement = connection.prepareStatement(retrievestatement);
            //insert values to be entered
            preparedStatement.setString(1,doctor);
           
            ResultSet resultSet = preparedStatement.executeQuery();
            // ... process the data

             while (resultSet.next()) 
             {
                String patient_name = resultSet.getString("patient");
                usersdb usersdb=new usersdb();
                user patient_user=usersdb.retrieve_patient_from_db(patient_name);
                String doctor_name = resultSet.getString("doctor");
                user doctor_user=usersdb.retrieve_doctor_from_db(doctor_name);
                String meeting_link= resultSet.getString("Meeting_link");               Date date = resultSet.getDate("meeting_date");
                telehealth_record datatoinsert= new telehealth_record(patient_user,doctor_user,meeting_link,date);
                userinfo.add(datatoinsert);
            }
            resultSet.close();
            preparedStatement.close();
            connection.close();
             
          
        }
        catch (Exception exception) {
            System.out.println(exception);
        } //access database with credentials
        //insert list information as row
        //return true if successful
        return userinfo;

}
}

