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

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;
    
    @Autowired
    private PhotoService photoService;

    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        return userService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) {
        return userService.findById(id)
                .map(existingUser -> {
                    existingUser.setName(user.getName());
                    existingUser.setDescription(user.getDescription());
                    return ResponseEntity.ok(userService.updateUser(existingUser));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/photo")
    public ResponseEntity<User> uploadPhoto(@PathVariable Long id, @RequestParam("file") MultipartFile file) throws IOException {
        return userService.findById(id)
                .map(user -> {
                    Photo photo = null;
                    try {
                        photo = new Photo(null, file.getOriginalFilename(), file.getContentType(), file.getBytes());
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                    photo = photoService.savePhoto(photo);
                    user.setPhoto(photo);
                    return ResponseEntity.ok(userService.updateUser(user));
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
