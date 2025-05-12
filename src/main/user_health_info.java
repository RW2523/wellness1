package main;
import java.util.ArrayList;
import java.util.List;
import java.util.Date;
public class user_health_info 
{
    //schema:username foreign key, 
    //string sleepcycle, 
    //heartrate float, 
    //int stepcount, 
    //date date

    private String sleepcycle;
    private Float heartRate;
    private int stepcount;
    private Date date;

    public user_health_info(String sleepcycle, Float heartRate, int stepcount,Date date)
    {
        this.sleepcycle=sleepcycle;
        this.heartRate=heartRate;
        this.stepcount=stepcount;
        this.date=date;

    }

    //getter methods 
    public String getsleepcycle()
    {
        return this.sleepcycle;
    }

    public Float getheartRate()
    {
        return this.heartRate;
    }
    public int getstepcount()
    {
        return this.stepcount;
    }
    public Date getdate()
    {
        return this.date;

    }
}
