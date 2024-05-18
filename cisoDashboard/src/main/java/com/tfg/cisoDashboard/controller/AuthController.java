package com.tfg.cisoDashboard.controller;
import com.tfg.cisoDashboard.Responses.AuthResponse;
import com.tfg.cisoDashboard.dto.UserLoginDto;
import com.tfg.cisoDashboard.dto.UserRegisterDto;
import com.tfg.cisoDashboard.model.User;
import com.tfg.cisoDashboard.service.AuthService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> registerUser(@RequestBody UserRegisterDto userRegisterDto, HttpServletResponse response) {
        System.out.println("Register call received");
        return ResponseEntity.ok(authService.registerUser(userRegisterDto));
    }
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> loginUser(@RequestBody UserLoginDto userLoginDto, HttpServletResponse response) {
        System.out.println("Login call received");
        return ResponseEntity.ok(authService.loginUser(userLoginDto, response));
    }
}
