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

import main.user;
import main.usersdb;

public class userdbtests
{
    @Test
    public void createuser_assignprivilegestest()
    {
        user user=new user("user", "pass", "email", "role");
        usersdb test=new usersdb();
        Boolean correct=true;
        Boolean result=test.create_user(user);
        assertEquals(correct,result);

    }
    @Test
     public void createuser_assignprivilegesdoctortest()
    {
        user user=new user("drtest", "pass", "test_email", "doctor");
        usersdb test=new usersdb();
        Boolean correct=true;
        Boolean result=test.create_user(user);
        assertEquals(correct,result);

    }

    @Test
    public void testinsertrow()
    {
        user user=new user("user", "pass", "email", "role");
        usersdb test=new usersdb();
        Boolean correct=true;
        Boolean result=test.insert_into_db(user);
        assertEquals(correct,result);
    }
    @Test
    public void testretrieverow()
    {
        user user=new user("user", "pass", "email", "role");
        usersdb test=new usersdb();
        user retreieveduser=test.retrieve_from_db(user.getusername());
        
        assertEquals(user.getusername(),retreieveduser.getusername());
        assertEquals(user.getpass(),retreieveduser.getpass());
        assertEquals(user.getemail(),retreieveduser.getemail());
        assertEquals(user.getrole(),retreieveduser.getrole());
    }
    
}
