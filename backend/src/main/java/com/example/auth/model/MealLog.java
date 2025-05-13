package com.example.auth.model;

import jakarta.persistence.*;

@Entity
@Table(name = "meal")
public class MealLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String foodName;
    private String mealType;
    private String mealTime;
    private int quantityInGrams;
    private Long user_id;

    // @ManyToOne
    // @JoinColumn(name = "user_id", nullable = false)
    // private User user;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFoodName() { return foodName; }
    public void setFoodName(String foodName) { this.foodName = foodName; }

    public String getMealType() { return mealType; }
    public void setMealType(String mealType) { this.mealType = mealType; }

    public String getMealTime() { return mealTime; }
    public void setMealTime(String mealTime) { this.mealTime = mealTime; }

    public int getQuantityInGrams() { return quantityInGrams; }
    public void setQuantityInGrams(int quantityInGrams) { this.quantityInGrams = quantityInGrams; }

    public Long getUser_id() { return user_id; }
    public void setUser_id(Long user_id) { this.user_id = user_id; }
}
