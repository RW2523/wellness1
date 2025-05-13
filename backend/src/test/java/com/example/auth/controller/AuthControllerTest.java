package com.example.auth.controller;

import com.example.auth.AuthApplication;
import com.example.auth.model.User;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.hamcrest.Matchers.containsString;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import static org.junit.jupiter.api.Assertions.assertTrue;
import org.springframework.test.web.servlet.MvcResult;

@SpringBootTest(classes = AuthApplication.class)
@AutoConfigureMockMvc
public class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testRegisterUser() throws Exception {
        User user = new User();
        user.setName("Test User");
        user.setEmail("testuser@example.com");
        user.setPassword("testpass");

        MvcResult result = mockMvc.perform(post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(user)))
                .andReturn();

        int status = result.getResponse().getStatus();
        String content = result.getResponse().getContentAsString();

        // Assert status is either 200 or 409
        assertTrue(status == 200 || status == 409, "Expected status 200 or 409, but got: " + status);

        // Optionally check the message content
        assertTrue(content.contains("User registered successfully") || content.contains("User already exists"),
                "Unexpected response message: " + content);
    }

    @Test
    public void testLoginUserInvalid() throws Exception {
        User user = new User();
        user.setEmail("nonexistent@example.com");
        user.setPassword("wrongpass");

        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(user)))
                .andExpect(status().isUnauthorized())
                .andExpect(content().string(containsString("Invalid credentials")));
    }
}
