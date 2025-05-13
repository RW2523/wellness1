package com.example.auth.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.example.auth.model.OverviewStat;
import com.example.auth.model.OverviewTotal;
import com.example.auth.model.WorkoutDistribution;
import com.example.auth.repository.ActivityRepository;
import com.example.auth.repository.OverviewStatRepository;
import com.example.auth.repository.OverviewTotalRepository;
import com.example.auth.repository.WorkoutDistributionRepository;

import com.example.auth.model.Activity;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class WellnessController {

    @Autowired private ActivityRepository activityRepo;
    @Autowired private OverviewStatRepository overviewStatRepo;
    @Autowired private OverviewTotalRepository overviewTotalRepo;
    @Autowired private WorkoutDistributionRepository workoutRepo;

    @GetMapping("/activities")
    public List<Activity> getActivities() {
        List<Activity> activities = activityRepo.findAll();
        if (activities.isEmpty()) {
            activities = List.of(
                new Activity("Running", 70, "10 km", "7 km", 3, "Cardio"),
                new Activity("Swimming", 50, "20 laps", "10 laps", 5, "Cardio"),
                new Activity("Yoga", 90, "30 sessions", "27 sessions", 1, "Flexibility")
            );
        }
        return activities;
    }

    @GetMapping("/overviews")
    public Map<String, Object> getOverview() {
        List<OverviewStat> stats = overviewStatRepo.findAll();
        List<OverviewTotal> totals = overviewTotalRepo.findAll();

        if (totals.isEmpty()) {
            OverviewTotal fallbackTotal = new OverviewTotal(60, 75, 85);
            totals = List.of(fallbackTotal);
        }

        if (stats.isEmpty()) {
            stats = List.of(
                new OverviewStat("January", 10000),
                new OverviewStat("February", 8500),
                new OverviewStat("March", 9200),
                new OverviewStat("April", 11000),
                new OverviewStat("May", 9500)
            );
        }

        OverviewTotal total = totals.get(0);

        List<String> months = stats.stream().map(OverviewStat::getMonth).toList();
        List<Integer> steps = stats.stream().map(OverviewStat::getSteps).toList();

        Map<String, Object> response = new HashMap<>();
        response.put("months", months);
        response.put("steps", steps);
        response.put("timeProgress", total.getTimeProgress());
        response.put("stepProgress", total.getStepProgress());
        response.put("targetProgress", total.getTargetProgress());

        return response;
    }

    @GetMapping("/workout-distribution")
    public Map<String, Object> getWorkoutDistribution() {
        List<WorkoutDistribution> data = workoutRepo.findAll();

        if (data.isEmpty()) {
            data = List.of(
                new WorkoutDistribution("Cardio", 45),
                new WorkoutDistribution("Strength", 35),
                new WorkoutDistribution("Flexibility", 20)
            );
        }

        List<String> labels = data.stream().map(WorkoutDistribution::getLabel).collect(Collectors.toList());
        List<Integer> values = data.stream().map(WorkoutDistribution::getValue).collect(Collectors.toList());

        Map<String, Object> response = new HashMap<>();
        response.put("labels", labels);
        response.put("values", values);

        return response;
    }
}
