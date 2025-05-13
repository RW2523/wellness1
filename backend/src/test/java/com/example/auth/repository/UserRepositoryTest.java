package com.example.auth.repository;

import com.example.auth.AuthApplication;
import com.example.auth.model.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(classes = AuthApplication.class)
public class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    public void testSaveAndFindByEmail() {
        User user = new User();
        String uniqueEmail = "testuser_" + System.currentTimeMillis() + "@example.com";
        user.setName("RepoTest");
        user.setEmail(uniqueEmail);
        user.setPassword("testpass");

        userRepository.save(user);

        Optional<User> foundUser = userRepository.findByEmail(uniqueEmail);
        assertThat(foundUser).isNotNull();
        assertThat(foundUser.get().getEmail()).isEqualTo(uniqueEmail);
    }
}
