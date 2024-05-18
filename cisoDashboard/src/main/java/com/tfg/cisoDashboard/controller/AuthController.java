package com.tfg.cisoDashboard.controller;
import com.tfg.cisoDashboard.model.User;
import com.tfg.cisoDashboard.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UserService userService;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        if (userService.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email is already taken.");
        }
        userService.registerUser(user);
        return ResponseEntity.ok("User registered successfully.");
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) {
        return userService.findByEmail(user.getEmail())
                .filter(foundUser -> passwordEncoder.matches(user.getPassword(), foundUser.getPassword()))
                .map(foundUser -> ResponseEntity.ok("Login successful"))
                .orElse(ResponseEntity.status(401).body("Invalid email or password"));
    }
}
