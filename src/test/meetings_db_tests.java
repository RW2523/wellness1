package test;
import static org.junit.Assert.*;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Date;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import main.classes.telehealth_record;
import main.classes.user;
import main.classes.user_health_info;
import main.database_connections.telehealth_handling;
import main.database_connections.usersdb;
public class meetings_db_tests 
{
   @Test 
   public void testmeetinginsert()
   {
     user patient=new user("name","user", "pass", "email", "patient");
     user doctor=new user("drname","user", "pass", "email", "doctor");
     
     String meetinglink="meeting link here";
     String datestring="2025-07-05";
     Date date=Date.valueOf(datestring);
     telehealth_record meetingtoinsert=new telehealth_record(patient, "drname", meetinglink, date);
     patient.addmeetinginfo(meetingtoinsert);
     patient.setdrname("drname");
     telehealth_handling testhandler=new telehealth_handling();
     Boolean result=testhandler.insert_into_db(patient);
     assertEquals(true,result);
   }
    @Test 
   public void testmeetingretrievalpatient()
   {
     user patient=new user("name","user", "pass", "email", "patient");
     user doctor=new user("drname","user", "pass", "email", "doctor");
     
     String meetinglink="meeting link here";
     String datestring="2025-07-05";
     Date date=Date.valueOf(datestring);
     telehealth_record meetingtoinsert=new telehealth_record(patient, "drname", meetinglink, date);
     patient.addmeetinginfo(meetingtoinsert);
     patient.setdrname("drname");
     telehealth_handling testhandler=new telehealth_handling();
     List<telehealth_record> results=new ArrayList<>();
     results=testhandler.retrieve_patient_from_db(patient.getusername(),patient.getpass());
     System.out.println("results"+results);
     assertEquals(patient.getname(),results.get(0).getuser().getname());
     assertEquals(doctor.getname(),results.get(0).getpartner());
     //ssertEquals(stepcount,results.get(0).getstepcount());
     assertEquals(date,results.get(0).getdate());
     /*
     user result=testhandler.retrieve_patient_from_db(patient.getname());
     assertEquals(true,result);   */
   }
   @Test 
   public void testmeetingretrievaldoctor()
   {
     //instantiate variables
     user patient=new user("name","user", "pass", "email", "patient");
     user doctor=new user("drname","user", "pass", "email", "doctor");
     
     String meetinglink="meeting link here";
     String datestring="2025-07-05";
     Date date=Date.valueOf(datestring);
     telehealth_record meetingtoinsert=new telehealth_record(doctor, "name", meetinglink, date);
     patient.addmeetinginfo(meetingtoinsert);
     patient.setdrname("drname");
     //create testhandler
     telehealth_handling testhandler=new telehealth_handling();
     List<telehealth_record> results=new ArrayList<>();
     results=testhandler.retrieve_doctor_from_db(doctor.getname(),doctor.getpass());
     System.out.println("results"+results);
     assertEquals(patient.getname(),results.get(0).getuser().getname());
     assertEquals(doctor.getname(),results.get(0).getpartner());
     //ssertEquals(stepcount,results.get(0).getstepcount());
     assertEquals(date,results.get(0).getdate());
     /*
     user result=testhandler.retrieve_patient_from_db(patient.getname());
     assertEquals(true,result);   */
   }

    

}
