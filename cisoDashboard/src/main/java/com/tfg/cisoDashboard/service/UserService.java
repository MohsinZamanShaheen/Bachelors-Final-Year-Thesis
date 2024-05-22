package com.tfg.cisoDashboard.service;

import com.tfg.cisoDashboard.dto.UserUpdateDto;
import com.tfg.cisoDashboard.model.Photo;
import com.tfg.cisoDashboard.model.User;
import com.tfg.cisoDashboard.repository.PhotoRepository;
import com.tfg.cisoDashboard.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PhotoRepository photoRepository;
    public User findUserById(Long id) throws Exception {
        return userRepository.findById(id).orElseThrow(() -> new Exception("User not found"));
    }
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    @Override
    public UserDetails loadUserByUsername(String username) {
        return userRepository.findByUsername(username).get();
    }
    protected User getCurrentUserFromConext(){
        Object obj = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User currentUser = null;
        if(obj instanceof User){
            currentUser = (User) obj;
        }
        return currentUser;
    }

    public User getCurrent(){
        return getCurrentUserFromConext();
    }

    public User updateUser(UserUpdateDto userUpdateDTO) {
        User user = getCurrentUserFromConext();
        user.setName(userUpdateDTO.getName());
        user.setPhoneNumber(userUpdateDTO.getPhoneNumber());
        //user.setCompany(userUpdateDTO.getCompany());
        user.setDescription(userUpdateDTO.getBio());
        return userRepository.save(user);
    }

    public User updateUserPhoto(MultipartFile file) {
        User user = getCurrentUserFromConext();
        try {
            Photo photo = new Photo();
            photo.setData(file.getBytes());
            photo.setFileType(file.getContentType());
            photo.setFileName(file.getOriginalFilename());
            photo = photoRepository.save(photo);
            user.setPhoto(photo);
            return userRepository.save(user);
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload photo", e);
        }
    }

    public User deleteUserPhoto() {
        User user = getCurrentUserFromConext();
        Photo photo = user.getPhoto();
        if (photo != null) {
            user.setPhoto(null);
            userRepository.save(user);
            photoRepository.delete(photo);
        }
        return user;
    }

    public UserDetails loadUserByEmail(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }
        return org.springframework.security.core.userdetails.User
                .withUsername(user.getUsername())
                .password(user.getPassword())
                .authorities(user.getRole().name())
                .accountExpired(false)
                .accountLocked(false)
                .credentialsExpired(false)
                .disabled(false)
                .build();
    }

}
