package com.example.auth.model;

import jakarta.persistence.*;

@Entity
@Table(name = "overview_totals")
public class OverviewTotal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int timeProgress;
    private int stepProgress;
    private int targetProgress;

    // ✅ Default constructor (required by JPA)
    public OverviewTotal() {}

    // ✅ Custom constructor (used in seeding)
    public OverviewTotal(int timeProgress, int stepProgress, int targetProgress) {
        this.timeProgress = timeProgress;
        this.stepProgress = stepProgress;
        this.targetProgress = targetProgress;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getTimeProgress() {
        return timeProgress;
    }

    public void setTimeProgress(int timeProgress) {
        this.timeProgress = timeProgress;
    }

    public int getStepProgress() {
        return stepProgress;
    }

    public void setStepProgress(int stepProgress) {
        this.stepProgress = stepProgress;
    }

    public int getTargetProgress() {
        return targetProgress;
    }

    public void setTargetProgress(int targetProgress) {
        this.targetProgress = targetProgress;
    }
}
