package com.example.auth.model;

import jakarta.persistence.*;

@Entity
@Table(name = "overview_stats")
public class OverviewStat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String month;
    private int steps;

    // ✅ Default constructor required by JPA
    public OverviewStat() {}

    // ✅ Constructor for seeding
    public OverviewStat(String month, int steps) {
        this.month = month;
        this.steps = steps;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public int getSteps() {
        return steps;
    }

    public void setSteps(int steps) {
        this.steps = steps;
    }
}
