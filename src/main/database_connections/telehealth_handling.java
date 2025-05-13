package main.database_connections;
import java.nio.FloatBuffer;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.sql.Date;
import java.util.List;

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
            List<user_health_info> datatoinsert=user.gethealthinfolist();
            int rowsaffected=0;
            String insertstatement="INSERT INTO health_data VALUES (?, ?, ?, ?,?)";

            PreparedStatement preparedStatement = connection.prepareStatement(insertstatement);
            for (int i=0;i<datatoinsert.size();i++)
            {

                user_health_info insert_health_info=datatoinsert.get(i);
                //set insert values
                preparedStatement.setString(1,user.getusername());
                preparedStatement.setString(2,insert_health_info.getsleepcycle());
                preparedStatement.setFloat(3,insert_health_info.getheartRate());
                preparedStatement.setInt(4,insert_health_info.getstepcount());
                preparedStatement.setDate(5,insert_health_info.getdate());
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
    public List<user_health_info> retrieve_from_db(String user) 
    {
        Connection connection = null;
        List<user_health_info>userinfo=new ArrayList<>();

        try {
            // below two lines are used for connectivity.
            Class.forName("com.mysql.cj.jdbc.Driver");
            connection = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/user_info",
                "test", "test");
                //db is user infor->stores credentials and health info
    
            //create statement
            String retrievestatement="Select * from health_data where username = ?";
            PreparedStatement preparedStatement = connection.prepareStatement(retrievestatement);
            //insert values to be entered
            preparedStatement.setString(1,user);
           
            ResultSet resultSet = preparedStatement.executeQuery();
            // ... process the data

             while (resultSet.next()) 
             {
                
                String username = resultSet.getString("username");
                String sleepcycle = resultSet.getString("sleepcycle");
                Float heartRate= resultSet.getFloat("HeartRate");
                int stepcount = resultSet.getInt("stepcount");
                Date date = resultSet.getDate("date_entered");
                user_health_info datatoinsert= new user_health_info(sleepcycle,heartRate,stepcount,date);
         
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

