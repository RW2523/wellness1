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

import main.classes.user;
import main.database_connections.usersdb;

public class userdbtests
{
    @Test
    public void createuser_assignprivilegestest()
    {
        //run query SELECT User, Host FROM mysql.user;
        //if user user shows up, use the follwoing command:drop user 'user'@localhost;
        //use show grants for 'user'@'localhost' to see privileges granted
        user user=new user("name","user", "pass", "email", "patient");
        usersdb test=new usersdb();
        Boolean correct=true;
        Boolean result=test.create_user(user);
        assertEquals(correct,result);

    }
    @Test
     public void createuser_assignprivilegesdoctortest()
    {
        user user=new user("doctor","drtest", "pass", "test_email", "doctor");
        usersdb test=new usersdb();
        Boolean correct=true;
        Boolean result=test.create_user(user);
        assertEquals(correct,result);

    }

    @Test
    public void testinsertrowpatient()
    {
        user user=new user("name","user", "pass", "email", "patient");
        usersdb test=new usersdb();
        Boolean correct=true;
        Boolean result=test.insert_into_db(user);
        assertEquals(correct,result);
    }
    @Test
    public void testinsertrowdoctor()
    {
        user user=new user("doctor","drtest", "pass", "test_email", "doctor");
        usersdb test=new usersdb();
        Boolean correct=true;
        Boolean result=test.insert_into_db(user);
        assertEquals(correct,result);
    }
    @Test
    public void testretrievepatientrow()
    {
        user user=new user("name","user", "pass", "email", "patient");
        usersdb test=new usersdb();
        user retreieveduser=test.retrieve_patient_from_db(user.getusername(),user.getpass());
        
        assertEquals(user.getusername(),retreieveduser.getusername());
        assertEquals(user.getpass(),retreieveduser.getpass());
        assertEquals(user.getemail(),retreieveduser.getemail());
        assertEquals(user.getrole(),retreieveduser.getrole());
    }
     @Test
    public void testretrievedrrow()
    {
        user doctor=new user("doctor","drtest", "pass", "test_email", "doctor");
        usersdb test=new usersdb();
        user retreieveduser=test.retrieve_doctor_from_db(doctor.getusername(),doctor.getpass());
        
        assertEquals(doctor.getusername(),retreieveduser.getusername());
        assertEquals(doctor.getpass(),retreieveduser.getpass());
        assertEquals(doctor.getemail(),retreieveduser.getemail());
        assertEquals(doctor.getrole(),retreieveduser.getrole());
    }
    
    
}
