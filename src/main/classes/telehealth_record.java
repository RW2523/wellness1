package main.classes;
import java.util.List;
import java.util.ArrayList;
import java.sql.Date;

public class telehealth_record 
{
    //telehealth record 
    user user=null;
    user doctor;
    String partner;
    String meeting_link;
    Date date;
    //date format 'YYYY-MM-DD HH:mm:ss' 
    //user is either patient or doctor depending
    //hols a user, the partner they meet with, the meeting link, and the date
    public telehealth_record(user user, String partner, String meeting_link, Date date)
    {
        
        this.user=user;
        this.partner=partner;
        this.meeting_link=meeting_link;
        this.date=date;

    }
    //get meeting information from meeting object
    public user getuser()
    {
        return this.user;
    }

    public String getpartner()
    {
        return this.partner;
    }
     public void setpartner(String partner)
    {
        this.partner=partner;
    }
    public String getmeetinglink()
    {
        return this.meeting_link;
    }
    public Date getdate()
    {
        return this.date;

    }
    //set meeting information
    public void setuser(user user)
    {
         this.user=user;
    }

    public void setdoctor(user doctor)
    {
        this.doctor=doctor;
    }
    public void setmeetinglink(String meetinglink)
    {
        this.meeting_link=meetinglink;
    }
    public void setdate(Date date)
    {
        this.date=date;

    }



}
