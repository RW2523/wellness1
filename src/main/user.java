package main;
import java.util.List;
import java.util.ArrayList;
public class user {
    //!resultSet.isBeforeFirst()

    private final String username; //hold username
    private final String password; //hold password
    private final String role; //rold role
    private final String email; // hold email
    private final List<health_info> health_info=new ArrayList<>();
    public user(String username, String pass, String email, String role)
    {
        this.username=username;
        this.password=pass;
        this.email=email;
        this.role=role;
    }
    public String getusername()
    {
        return this.username;
    }
    public String getpass()
    {
        return this.password;
    }
     public String getemail()
    {
        return this.email;
    }
     public String getrole()
    {
        return this.role;
    }
    public boolean addhealthinfo(health_info healthinfo)
    {
        if (this.health_info.contains(healthinfo))
        {
            System.out.println("health data already added to the list");
            return false;
        }
        else
        {
            this.health_info.add(healthinfo);
            return true;

        }
    }
    public  List<health_info> gethealthinfolist()
    {
        return this.health_info;
    }


}
