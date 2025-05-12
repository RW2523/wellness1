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
        List<String> output=test.retrieve_from_db(user.getusername());
        
        assertEquals(user.getusername(),output.get(0));
        assertEquals(user.getpass(),output.get(1));
        assertEquals(user.getemail(),output.get(2));
        assertEquals(user.getrole(),output.get(3));
    }
    
}
