package test;

import static org.junit.Assert.*;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import java.sql.Date;

import main.classes.user;
import main.classes.user_health_info;
import main.database_connections.health_information;
import main.database_connections.usersdb;

public class health_infodbtests
 
{
    @Test
    
    public void testinsertrow()
    {
        //tests inserting new health row into database
        user user=new user("name","user", "pass", "email", "role");
        user.setdrname("doctor");
        health_information test=new health_information();
        String datestring="2025-07-05";
        Float heartrate=99.9f;
        Date date=Date.valueOf(datestring);
        user_health_info test_health_info=new user_health_info("sleepcycle", heartrate, 5000,date);
        user.addhealthinfo(test_health_info);
        Boolean result=test.insert_into_db(user);
        assertEquals(true,result);

    }
    @Test
    public void testretrieverowpatient()
    {
        user user=new user("name","user", "pass", "email", "role");
        health_information test=new health_information();
        //inititalize health information
        String Sleepcycle="sleepcycle";
        Float heartrate=99.9f;
        int stepcount=5000;
        String datestring="2025-07-05";
        
        Date date=Date.valueOf(datestring);
        user_health_info test_health_info=new user_health_info(Sleepcycle, heartrate, 5000,date);
        user.addhealthinfo(test_health_info);
        List<user_health_info> results=new ArrayList<>();
        results=test.retrieve_patient_from_db(user.getusername(),user.getpass());
        
        assertEquals(Sleepcycle,results.get(0).getsleepcycle());
        assertEquals(heartrate,results.get(0).getheartRate());
        assertEquals(stepcount,results.get(0).getstepcount());
        assertEquals(date,results.get(0).getdate());
    }
    @Test
    public void testretrieverowdoctor()
    {
        //user user=new user("name","user", "pass", "email", "role");
        health_information test=new health_information();
        //inititalize health information
        user doctor=new user("doctor","drtest", "pass", "test_email", "doctor");

        //String drname="doctor";
        //user.setdrname(drname);
        String Sleepcycle="sleepcycle";
        Float heartrate=99.9f;
        int stepcount=5000;
        String datestring="2025-07-05";
        
        Date date=Date.valueOf(datestring);
        user_health_info test_health_info=new user_health_info(Sleepcycle, heartrate, 5000,date);
        doctor.addhealthinfo(test_health_info);
        List<user_health_info> results=new ArrayList<>();
        results=test.retrieve_doctor_from_db(doctor.getusername(),doctor.getpass());
        
        assertEquals(Sleepcycle,results.get(0).getsleepcycle());
        assertEquals(heartrate,results.get(0).getheartRate());
        assertEquals(stepcount,results.get(0).getstepcount());
        assertEquals(date,results.get(0).getdate());
    }
    


}
