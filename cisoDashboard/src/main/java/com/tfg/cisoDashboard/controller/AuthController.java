package com.tfg.cisoDashboard.controller;
import com.tfg.cisoDashboard.Jwt.JwtTokenProvider;
import com.tfg.cisoDashboard.Responses.AuthResponse;
import com.tfg.cisoDashboard.dto.UserLoginDto;
import com.tfg.cisoDashboard.dto.UserRegisterDto;
import com.tfg.cisoDashboard.model.User;
import com.tfg.cisoDashboard.service.AuthService;
import com.tfg.cisoDashboard.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    @Autowired
    private AuthService authService;
    private final JwtTokenProvider tokenProvider;
    private final UserService service;

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

    @GetMapping("/verify-token")
    public ResponseEntity<User> verifyToken(HttpServletRequest request) throws Exception {

        String token = null;
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("token".equals(cookie.getName())) {
                    token = cookie.getValue();
                }
            }
        }
        if (token != null && tokenProvider.validateToken(token)) {
            String userid = tokenProvider.getUserIdFromToken(token);
            User user = service.findById(Long.parseLong(userid));
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}
