package com.example.auth.model;

import jakarta.persistence.*;

@Entity
@Table(name = "health_data")
public class HealthData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userId;

    private int steps;
    private int heartRate;
    private int respiratoryRate;
    private int oxygenSaturation;
    private int walkingDistance;
    private int waterIntake;
    private int caloriesIntake;
    private int activeEnergy;

    // Constructors
    public HealthData() {}

    public HealthData(String userId, int steps, int heartRate, int respiratoryRate,
                      int oxygenSaturation, int walkingDistance, int waterIntake,
                      int caloriesIntake, int activeEnergy) {
        this.userId = userId;
        this.steps = steps;
        this.heartRate = heartRate;
        this.respiratoryRate = respiratoryRate;
        this.oxygenSaturation = oxygenSaturation;
        this.walkingDistance = walkingDistance;
        this.waterIntake = waterIntake;
        this.caloriesIntake = caloriesIntake;
        this.activeEnergy = activeEnergy;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public int getSteps() {
        return steps;
    }

    public void setSteps(int steps) {
        this.steps = steps;
    }

    public int getHeartRate() {
        return heartRate;
    }

    public void setHeartRate(int heartRate) {
        this.heartRate = heartRate;
    }

    public int getRespiratoryRate() {
        return respiratoryRate;
    }

    public void setRespiratoryRate(int respiratoryRate) {
        this.respiratoryRate = respiratoryRate;
    }

    public int getOxygenSaturation() {
        return oxygenSaturation;
    }

    public void setOxygenSaturation(int oxygenSaturation) {
        this.oxygenSaturation = oxygenSaturation;
    }

    public int getWalkingDistance() {
        return walkingDistance;
    }

    public void setWalkingDistance(int walkingDistance) {
        this.walkingDistance = walkingDistance;
    }

    public int getWaterIntake() {
        return waterIntake;
    }

    public void setWaterIntake(int waterIntake) {
        this.waterIntake = waterIntake;
    }

    public int getCaloriesIntake() {
        return caloriesIntake;
    }

    public void setCaloriesIntake(int caloriesIntake) {
        this.caloriesIntake = caloriesIntake;
    }

    public int getActiveEnergy() {
        return activeEnergy;
    }

    public void setActiveEnergy(int activeEnergy) {
        this.activeEnergy = activeEnergy;
    }
}
