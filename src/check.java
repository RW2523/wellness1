import java.sql.*;
 
public class check {
    public static void main(String arg[])
    {
        Connection connection = null;
        try {
            // below two lines are used for connectivity.
            Class.forName("com.mysql.cj.jdbc.Driver");
            connection = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/world",
                "test", "test");
 
            // mydb is database
            // mydbuser is name of database
            // mydbuser is password of database
 
            Statement statement;
            statement = connection.createStatement();
            ResultSet resultSet;
            resultSet = statement.executeQuery(
                "select * from city where name ='Vallejo'");
            int Pop;
            String Name;
            while (resultSet.next()) {
                Pop = resultSet.getInt("Population");
                Name = resultSet.getString("Name").trim();
                System.out.println("Pop : " + Pop
                                   + " Name : " + Name);
            }
            resultSet.close();
            statement.close();
            connection.close();
        }
        catch (Exception exception) {
            System.out.println(exception);
        }
    } 
} 
