package com.tfg.cisoDashboard.controller;

import com.tfg.cisoDashboard.model.Photo;
import com.tfg.cisoDashboard.model.User;
import com.tfg.cisoDashboard.service.PhotoService;
import com.tfg.cisoDashboard.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private PhotoService photoService;

    @GetMapping("getTeam")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
}
