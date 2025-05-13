package com.example.auth.config;

import com.example.auth.model.Activity;
import com.example.auth.model.OverviewStat;
import com.example.auth.model.OverviewTotal;
import com.example.auth.model.WorkoutDistribution;
import com.example.auth.repository.ActivityRepository;
import com.example.auth.repository.OverviewStatRepository;
import com.example.auth.repository.OverviewTotalRepository;
import com.example.auth.repository.WorkoutDistributionRepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DatabaseSeeder {

    // @Bean
    // CommandLineRunner seedDatabase(
    //         ActivityRepository activityRepo,
    //         OverviewStatRepository overviewStatRepo,
    //         OverviewTotalRepository overviewTotalRepo,
    //         WorkoutDistributionRepository workoutRepo
    // ) {
    //     return args -> {
    //         if (activityRepo.count() == 0) {
    //             activityRepo.save(new Activity("Cycling Challenge", 45, "36 km / weeks", "17/36 km", 2, "cycling"));
    //             activityRepo.save(new Activity("Running Streak", 13, "12 km / month", "2/12 km", 17, "running"));
    //             activityRepo.save(new Activity("Step Goals", 90, "3600 steps / weeks", "3200/3600 steps", 3, "walking"));
    //         }

    //         if (overviewStatRepo.count() == 0) {
    //             overviewStatRepo.save(new OverviewStat("Jan", 3000));
    //             overviewStatRepo.save(new OverviewStat("Feb", 5000));
    //             overviewStatRepo.save(new OverviewStat("Mar", 7000));
    //             overviewStatRepo.save(new OverviewStat("Apr", 9000));
    //             overviewStatRepo.save(new OverviewStat("May", 8000));
    //         }

    //         if (overviewTotalRepo.count() == 0) {
    //             overviewTotalRepo.save(new OverviewTotal(75, 90, 95));
    //         }

    //         if (workoutRepo.count() == 0) {
    //             workoutRepo.save(new WorkoutDistribution("Cardio", 30));
    //             workoutRepo.save(new WorkoutDistribution("Stretching", 40));
    //             workoutRepo.save(new WorkoutDistribution("Treadmill", 30));
    //             workoutRepo.save(new WorkoutDistribution("Strength", 20));
    //         }
    //     };
    // }
}
