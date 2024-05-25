package com.tfg.cisoDashboard.controller;

import com.tfg.cisoDashboard.dto.PasswordChangeDto;
import com.tfg.cisoDashboard.dto.UserDto;
import com.tfg.cisoDashboard.dto.UserUpdateDto;
import com.tfg.cisoDashboard.model.Photo;
import com.tfg.cisoDashboard.model.User;
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

    @GetMapping("/getAll")
    public List<User> getAllUsers_profile() {
        return userService.getAllUsers();
    }
    @GetMapping("/getTeam")
    public List<User> getAllUsersTeam() {
        return userService.getAllUsers();
    }

    @GetMapping("/getActual")
    public ResponseEntity<UserDto> getCurrentUser() {
        return ResponseEntity.ok(userService.getCurrentUserDTO());
    }

    @GetMapping("/getProfilePhoto")
    public ResponseEntity<Photo> getProfilePhoto() {
        return ResponseEntity.ok(userService.getUserPhoto());
    }

    @PutMapping("/update")
    public User updateUserInfo(@RequestBody UserUpdateDto userUpdateDTO) {
        return userService.updateUser(userUpdateDTO);
    }
    @PostMapping("/addphoto")
    public ResponseEntity<Photo> updateUserPhoto(@RequestParam("file") MultipartFile file) throws IOException {
        return ResponseEntity.ok(userService.updateUserPhoto(file));
    }
    @DeleteMapping("/deletephoto")
    public User deleteUserPhoto() {
        return userService.deleteUserPhoto();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        try {
            User current = userService.getCurrentUser();
            if (current.getId() == id) {
                return ResponseEntity.status(401).body("You cannot delete yourself.");
            }
            userService.deleteUser(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error deleting user");
        }
    }

    @PutMapping("/{id}/role")
    public ResponseEntity<?> updateUserRole(@PathVariable Long id, @RequestBody UserDto userDto) {
        try {
            userService.updateUserRole(id, userDto.getRole());
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error updating user role");
        }
    }
}
