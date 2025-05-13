package com.example.auth.repository;

import com.example.auth.model.MealLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

// public interface MealLogRepository extends JpaRepository<MealLog, Long> {}

public interface MealLogRepository extends JpaRepository<MealLog, Long> {
    Optional<MealLog> findById(Long id);
}
