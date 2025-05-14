package com.example.auth.controller;

import com.example.auth.model.HealthData;
import com.example.auth.repository.HealthDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class HealthDataController {

    @Autowired
    private HealthDataRepository healthDataRepository;

    @PostMapping("/devices/register")
    public String registerDevice(@RequestBody Map<String, Object> deviceData) {
        System.out.println("Device Registered: " + deviceData);
        return "Device Registered Successfully!";
    }

    @PostMapping("/health/upload")
    public String uploadHealthData(@RequestBody Map<String, Object> healthDataMap) {
        try {
            HealthData data = new HealthData();
            data.setUserId((String) healthDataMap.get("userId"));
            data.setSteps((int) healthDataMap.get("steps"));
            data.setHeartRate((int) healthDataMap.get("heartRate"));
            data.setRespiratoryRate((int) healthDataMap.get("respiratoryRate"));
            data.setOxygenSaturation((int) healthDataMap.get("oxygenSaturation"));
            data.setWalkingDistance((int) healthDataMap.get("walkingDistance"));
            data.setWaterIntake((int) healthDataMap.get("waterIntake"));
            data.setCaloriesIntake((int) healthDataMap.get("caloriesIntake"));
            data.setActiveEnergy((int) healthDataMap.get("activeEnergy"));

            healthDataRepository.save(data);
            return "Health Data Uploaded Successfully!";
        } catch (Exception e) {
            return "Failed to upload health data: " + e.getMessage();
        }
    }
}
