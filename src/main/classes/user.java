package main.classes;
import java.util.List;
import java.util.ArrayList;
public class user {
    //!resultSet.isBeforeFirst()

    private final String username; //hold username
    private final String password; //hold password
    private final String role; //rold role
    private final String email; // hold email
    private final List<user_health_info> health_info=new ArrayList<>();
    private final List<telehealth_record> scheduled_meetings=new ArrayList<>();
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
    //health info adding
    public boolean addhealthinfo(user_health_info healthinfo)
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
    public  List<user_health_info> gethealthinfolist()
    {
        return this.health_info;
    }
    //meeting informationadding

     public boolean addmeetinginfo(telehealth_record meetinginfo)
    {
        if (this.scheduled_meetings.contains(meetinginfo))
        {
            System.out.println("meeting data already added to the list");
            return false;
        }
        else
        {
            this.scheduled_meetings.add(meetinginfo);
            return true;

        }
    }
    
    public  List<telehealth_record> getmeetinginfo()
    {
        return this.scheduled_meetings;
    }


}