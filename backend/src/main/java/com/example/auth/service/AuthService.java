package com.example.auth.service;

import com.example.auth.model.MealLog;
import com.example.auth.model.User;
import com.example.auth.repository.MealLogRepository;
import com.example.auth.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MealLogRepository mealLogRepository;

    public String register(User user) {
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            return "User already exists";
        }
        userRepository.save(user);
        return "User registered successfully";
    }

    public String login(String email, String password) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent() && user.get().getPassword().equals(password)) {
            return "Login successful ID=" + String.valueOf(user.get().getId());
        }
        return "Invalid credentials";
    }

    public void saveMealLog(MealLog mealLogDto) {
        MealLog mealLog = new MealLog();
        mealLog.setFoodName(mealLogDto.getFoodName());
        mealLog.setMealType(mealLogDto.getMealType());
        mealLog.setMealTime(mealLogDto.getMealTime()); // assuming conversion
        mealLog.setQuantityInGrams(mealLogDto.getQuantityInGrams());
        mealLog.setUser_id(mealLogDto.getUser_id());

        // User user = userRepository.findById(mealLogDto.getId())
        //     .orElseThrow(() -> new RuntimeException("User not found"));
        List<MealLog> mealLogs = mealLogRepository.findAll();
        for (MealLog mealLog1 : mealLogs) {
            System.out.println(mealLog1);
        }

        mealLogRepository.save(mealLog);
    }

    public List<MealLog> getAllMealLogs() {
        return mealLogRepository.findAll();
    }
}