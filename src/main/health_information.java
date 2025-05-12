package main;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import java.util.Date;

public class health_information implements database_handling{
//adds input data to the health database and gets it for the user
//
//schema:username foreign key, string sleepcycle, heartrate float, int stepcount, date date

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
                //db is user infor->stores credentials and health info
    
            //create statement
            String insertstatement="INSERT INTO credentials VALUES (?, ?, ?, ?)";
            PreparedStatement preparedStatement = connection.prepareStatement(insertstatement);
            //insert values to be entered
            preparedStatement.setString(1,user.getusername());
            preparedStatement.setString(2,user.getpass());
            preparedStatement.setString(3,user.getemail());
            preparedStatement.setString(4,user.getrole());
            int rowsAffected = preparedStatement.executeUpdate();
            
            
            preparedStatement.close();
            connection.close();
             if (rowsAffected>0)
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
    public List retrieve_from_db(String user) 
    {
        Connection connection = null;
        List<String>userinfo=new ArrayList<>();

        try {
            // below two lines are used for connectivity.
            Class.forName("com.mysql.cj.jdbc.Driver");
            connection = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/user_info",
                "test", "test");
                //db is user infor->stores credentials and health info
    
            //create statement
            String insertstatement="Select * from credentials where username = ?";
            PreparedStatement preparedStatement = connection.prepareStatement(insertstatement);
            //insert values to be entered
            preparedStatement.setString(1,user);
           
            ResultSet resultSet = preparedStatement.executeQuery();
            // ... process the data

             while (resultSet.next()) 
             {
                String username = resultSet.getString("username");
                String password = resultSet.getString("password");
                String email = resultSet.getString("email");
                String role = resultSet.getString("role");
                userinfo.add(username);
                userinfo.add(password);
                userinfo.add(email);
                userinfo.add(role);


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
