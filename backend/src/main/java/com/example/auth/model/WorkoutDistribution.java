package com.example.auth.model;

import jakarta.persistence.*;

@Entity
@Table(name = "workout_distribution")
public class WorkoutDistribution {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String label;
    private int value;

    // ✅ Default constructor (required by JPA)
    public WorkoutDistribution() {}

    // ✅ Parameterized constructor (for seeding)
    public WorkoutDistribution(String label, int value) {
        this.label = label;
        this.value = value;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }
}
