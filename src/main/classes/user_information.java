package main.classes;
//hold list of all current users and doctors
import java.util.List;
import java.util.ArrayList;

public class user_information
{
    private List<user> user_info=new ArrayList<>();
    public user_information()
    {
        
    }
    public List<user> getuserlist()
    {
        return this.user_info;
    }

    public void adduser(user user)
    {
        this.user_info.add(user);

    }
   


}
