package com.tfg.cisoDashboard.service;

import com.tfg.cisoDashboard.dto.PasswordChangeDto;
import com.tfg.cisoDashboard.dto.PhotoDto;
import com.tfg.cisoDashboard.dto.UserDto;
import com.tfg.cisoDashboard.dto.UserUpdateDto;
import com.tfg.cisoDashboard.model.Organization;
import com.tfg.cisoDashboard.model.Photo;
import com.tfg.cisoDashboard.model.Role;
import com.tfg.cisoDashboard.model.User;
import com.tfg.cisoDashboard.repository.OrganizationRepository;
import com.tfg.cisoDashboard.repository.PhotoRepository;
import com.tfg.cisoDashboard.repository.UserRepository;
import com.tfg.cisoDashboard.security.SecurityUtils;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PhotoRepository photoRepository;
    @Autowired
    private OrganizationRepository organizationRepository;

    public List<User> getAllUsersByOrganization(Long organizationId) {
        return userRepository.findAll().stream()
                .filter(user -> user.getOrganizations().stream()
                        .anyMatch(org -> org.getId().equals(organizationId)))
                .collect(Collectors.toList());
    }

    public List<Organization> getUserOrganizations(Long userId) throws Exception {
        User user = userRepository.findById(userId).orElseThrow(() -> new Exception("User not found"));
        return new ArrayList<>(user.getOrganizations());
    }
    public User findUserById(Long id) throws Exception {
        return userRepository.findById(id).orElseThrow(() -> new Exception("User not found"));
    }
    @Override
    public UserDetails loadUserByUsername(String username) {
        return userRepository.findByUsername(username).get();
    }

    public User getCurrentUser(){
        Long currentUserId = SecurityUtils.getCurrentUserIdFromContext();
        if (currentUserId == null) {
            return null;
        }
        User currentUser = userRepository.findById(currentUserId).orElse(null);
        return currentUser;
    }

    public Photo getUserPhoto(){
        User currentUser = getCurrentUser();
        return currentUser.getPhoto();
    }

    public UserDto getCurrentUserDTO() {
        User currentUser = getCurrentUser();
        if (currentUser != null && currentUser.getPhoto() != null) {
            Hibernate.initialize(currentUser.getPhoto());
        }
        return convertToDTO(currentUser);
    }

    public UserDto convertToDTO(User user) {
        if (user == null) {
            return null;
        }
        UserDto userDTO = new UserDto();
        userDTO.setId(user.getId());
        userDTO.setUsername(user.getUsername());
        userDTO.setName(user.getName());
        userDTO.setEmail(user.getEmail());
        userDTO.setRole(user.getRole());
        userDTO.setPhoneNumber(user.getPhoneNumber());
        userDTO.setBio(user.getBio());

        if (user.getPhoto() != null) {
            PhotoDto photoDTO = new PhotoDto();
            photoDTO.setId(user.getPhoto().getId());
            photoDTO.setFileName(user.getPhoto().getFileName());
            photoDTO.setFileType(user.getPhoto().getFileType());
            photoDTO.setData(user.getPhoto().getData());
            userDTO.setPhoto(photoDTO);
        }

        return userDTO;
    }

    public User updateUser(UserUpdateDto userUpdateDTO) {
        User currentUser = getCurrentUser();
        currentUser.setName(userUpdateDTO.getName());
        currentUser.setPhoneNumber(userUpdateDTO.getPhoneNumber());
        currentUser.setBio(userUpdateDTO.getBio());
        return userRepository.save(currentUser);
    }

    public Photo updateUserPhoto(MultipartFile file) {
        User currentUser = getCurrentUser();
        try {
            Photo photo = new Photo();
            photo.setFileType(file.getContentType());
            photo.setFileName(file.getOriginalFilename());
            photo.setData(file.getBytes());
            //photoRepository.save(photo);
            currentUser.setPhoto(photo);
            userRepository.save(currentUser);
            return photo;
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload photo", e);
        }
    }

    public User deleteUserPhoto() {
        User currentUser = getCurrentUser();
        Photo photo = currentUser.getPhoto();
        if (photo != null) {
            currentUser.setPhoto(null);
            userRepository.save(currentUser);
            photoRepository.delete(photo);
        }
        return currentUser;
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

    public void deleteUser(Long userId, Long organizationId) {
        User user = userRepository.findById(userId).orElse(null);
        Organization organization = organizationRepository.findById(organizationId).orElse(null);

        if (user == null || organization == null) {
            throw new RuntimeException("User or Organization not found");
        }

        if (user.getOrganizations().contains(organization)) {
            user.getOrganizations().remove(organization);
            if (user.getOrganizations().isEmpty()) {
                userRepository.deleteById(userId);
            } else {
                userRepository.save(user);
            }
        } else {
            throw new RuntimeException("User is not part of the specified organization");
        }
    }


    public void updateUserRole(Long userId, Role role, Long organizationId) {
        User user = userRepository.findById(userId).orElse(null);
        Organization organization = organizationRepository.findById(organizationId).orElse(null);

        if (user == null || organization == null) {
            throw new RuntimeException("User or Organization not found");
        }

        if (user.getOrganizations().contains(organization)) {
            user.setRole(role);
            userRepository.save(user);
        } else {
            throw new RuntimeException("User is not part of the specified organization");
        }
    }


}
