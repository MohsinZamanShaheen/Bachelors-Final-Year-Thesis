package com.tfg.cisoDashboard.controller;
import com.tfg.cisoDashboard.Jwt.JwtTokenProvider;
import com.tfg.cisoDashboard.Responses.AuthResponse;
import com.tfg.cisoDashboard.dto.*;
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
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
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
        return ResponseEntity.ok(authService.registerUser(userRegisterDto));
    }
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> loginUser(@RequestBody UserLoginDto userLoginDto, HttpServletResponse response) {
        return ResponseEntity.ok(authService.loginUser(userLoginDto, response));
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        new SecurityContextLogoutHandler().logout(request, response, authentication);
        Cookie cookie = new Cookie("token", null);
        cookie.setMaxAge(0);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        response.addCookie(cookie);
        return ResponseEntity.ok("Logout successful");
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/createUser")
    public ResponseEntity<?> createUser(@RequestBody NewUserDto newUserDto, @RequestHeader("X-Organization-ID") Long organizationId) {
        authService.registerNewUser(newUserDto,organizationId);
        return ResponseEntity.ok("User created successfully");
    }
    @GetMapping("/verify-token")
    public ResponseEntity<UserDto> verifyToken(HttpServletRequest request) throws Exception {
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
            User user = service.findUserById(Long.parseLong(userid));
            UserDto userDto = service.convertToDTO(user);
            return ResponseEntity.ok(userDto);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
    @PostMapping("/change-password")
    public ResponseEntity<String> changePassword(@RequestBody PasswordChangeDto passwordChangeRequest) {
        boolean isChanged = authService.changePassword(passwordChangeRequest);
        if (isChanged) {
            return ResponseEntity.ok("Password changed successfully.");
        } else {
            return ResponseEntity.badRequest().body("Failed to change password.");
        }
    }
}
