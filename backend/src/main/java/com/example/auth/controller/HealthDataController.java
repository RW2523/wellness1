package com.example.auth.controller;

import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class HealthDataController {

    @PostMapping("/devices/register")
    public String registerDevice(@RequestBody Map<String, Object> deviceData) {
        System.out.println("Device Registered: " + deviceData);
        return "Device Registered Successfully!";
    }

    @PostMapping("/health/upload")
    public String uploadHealthData(@RequestBody Map<String, Object> healthData) {
        System.out.println("Health Data Received: " + healthData);
        return "Health Data Uploaded Successfully!";
    }
}
