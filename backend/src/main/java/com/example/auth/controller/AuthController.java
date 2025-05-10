package com.example.auth.controller;

import com.example.auth.model.User;
import com.example.auth.service.AuthService;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;


import org.springframework.boot.SpringApplication;
import org.springframework.http.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public Map<String, String> register(@RequestBody User user) {
        String message = authService.register(user);
        return Map.of("message", message);
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> loginData) {
        String message = authService.login(loginData.get("email"), loginData.get("password"));
        return Map.of("message", message);
    }

    static class InputData {
        public List<Double> features;
    }

    @PostMapping("/trigger-ml")
    public ResponseEntity<?> triggerModel(@RequestBody InputData input) {
        try {
            RestTemplate restTemplate = new RestTemplate();
            String mlUrl = "http://localhost:5002/predict";

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<InputData> request = new HttpEntity<>(input, headers);

            ResponseEntity<String> response = restTemplate.postForEntity(mlUrl, request, String.class);
            return ResponseEntity.ok(response.getBody());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                .body("Error contacting ML service: " + e.getMessage());
        }
    }



    // @PostMapping("/pred")
    // public void pred(@RequestBody String input) {
    //     try {
    //     RestTemplate restTemplate = new RestTemplate();
    //     String mlUrl = "http://localhost:5002/predict";
    
    //     HttpHeaders headers = new HttpHeaders();
    //     headers.setContentType(MediaType.APPLICATION_JSON);
    //     HttpEntity<String> request = new HttpEntity<>("", headers);
    
    //     ResponseEntity<String> response = restTemplate.postForEntity(mlUrl, request, String.class);
    //     ResponseEntity.ok(response.getBody());
                
    //     } catch (Exception e) {
    //         System.out.println("Error contacting ML service: " + e.getMessage());
    //     }
    // }

    @PostMapping("/pred")
    public Map<String, String> pred(@RequestBody Map<String, Object> inputData) {
        try {
            System.out.println("Input data: " + inputData);
            RestTemplate restTemplate = new RestTemplate();
            String mlUrl = "http://host.docker.internal:5002/predict"; // Adjust if needed

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            // ObjectMapper mapper = new ObjectMapper();
            // Map<String, Object> parsed = mapper.readValue(inputData, Map.class);

            // System.out.println("Input data: " + parsed);

            // ✅ Default input payload
            // Map<String, Object> payload = Map.of(
            //     "features", List.of("Male", "Doctor", "Normal", "Normal", 25, 7, 3, 3)
            // );

            Map<String, Object> payload = (Map<String, Object>) inputData.get("payload");

            HttpEntity<Map<String, Object>> request = new HttpEntity<>(payload, headers);
            ResponseEntity<String> response = restTemplate.postForEntity(mlUrl, request, String.class);

            // ✅ Parse response JSON to extract prediction
            ObjectMapper objectMapper = new ObjectMapper();
            Map<String, Object> responseBody = objectMapper.readValue(response.getBody(), Map.class);
            Object prediction = ((List<?>) responseBody.get("prediction")).get(0);

            return Map.of("prediction", prediction.toString());

        } catch (Exception e) {
            e.printStackTrace();
            return Map.of("error", "ML service error: " + e.getMessage());
        }
}


}