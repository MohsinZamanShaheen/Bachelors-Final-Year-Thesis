package com.tfg.cisoDashboard.service;

import com.tfg.cisoDashboard.Jwt.JwtTokenProvider;
import com.tfg.cisoDashboard.Responses.AuthResponse;
import com.tfg.cisoDashboard.dto.NewUserDto;
import com.tfg.cisoDashboard.dto.PasswordChangeDto;
import com.tfg.cisoDashboard.model.Organization;
import com.tfg.cisoDashboard.model.Role;
import com.tfg.cisoDashboard.repository.OrganizationRepository;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.tfg.cisoDashboard.model.User;
import com.tfg.cisoDashboard.repository.UserRepository;
import com.tfg.cisoDashboard.dto.UserRegisterDto;
import com.tfg.cisoDashboard.dto.UserLoginDto;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrganizationRepository organizationRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtService;
    private final AuthenticationManager authenticationManager;
    @Autowired
    private UserService userService;

    public AuthResponse registerUser(UserRegisterDto userRegisterDto) {
        if (userRepository.existsByEmail(userRegisterDto.getEmail()) || userRepository.existsByUsername(userRegisterDto.getUsername())) {
            throw new IllegalArgumentException("User already exists");
        }

        Organization organization = new Organization();
        organization.setName(userRegisterDto.getOrganizationName());
        organizationRepository.save(organization);

        User user = User.builder()
                .username(userRegisterDto.getUsername())
                .email(userRegisterDto.getEmail())
                .password(passwordEncoder.encode(userRegisterDto.getPassword()))
                .role(Role.ADMIN)
                .organizations(Set.of(organization))
                .build();
        userRepository.save(user);

        String token = jwtService.createToken(user);

        return AuthResponse.builder()
                .token(token)
                .build();

    }
    public AuthResponse loginUser(UserLoginDto userLoginDto, HttpServletResponse response) {

        User user = userRepository.findByEmail(userLoginDto.getEmail());
        if (user == null) {
            throw new IllegalArgumentException("Invalid email or password");
        }
        if (!passwordEncoder.matches(userLoginDto.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid email or password");
        }
        UserDetails userDetails = userService.loadUserByEmail(userLoginDto.getEmail());
        System.out.printf("USERNAME ES: " + userDetails.getUsername());
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userDetails.getUsername(), userLoginDto.getPassword()));
        String token = jwtService.createToken(user);
        response.addHeader("Set-Cookie", "token=" + token + "; HttpOnly; Path=/; Max-Age=" + (86400)); // Cookie valid for 1 day
        return AuthResponse.builder()
                .token(token)
                .build();
    }

    public AuthResponse registerNewUser(NewUserDto newUserDto, Long organizationId) {
        if (userRepository.existsByEmail(newUserDto.getEmail()) || userRepository.existsByUsername(newUserDto.getUsername())) {
            throw new IllegalArgumentException("User already exists");
        }
        Organization organization = organizationRepository.findById(organizationId).orElse(null);
        User user = User.builder()
                .username(newUserDto.getUsername())
                .email(newUserDto.getEmail())
                .phoneNumber(newUserDto.getContact())
                .name(newUserDto.getFirstName() + newUserDto.getLastName())
                .password(passwordEncoder.encode(newUserDto.getPassword()))
                .organizations(Set.of(organization))
                .role(newUserDto.getRole())
                .build();
        userRepository.save(user);

        String token = jwtService.createToken(user);

        return AuthResponse.builder()
                .token(token)
                .build();

    }

    public boolean changePassword(PasswordChangeDto passwordChangeRequest) {
        User user = userService.getCurrentUser();

        if (user != null) {
            if (passwordEncoder.matches(passwordChangeRequest.getCurrentPassword(), user.getPassword())) {
                if (passwordChangeRequest.getNewPassword().equals(passwordChangeRequest.getConfirmPassword())) {
                    user.setPassword(passwordEncoder.encode(passwordChangeRequest.getNewPassword()));
                    userRepository.save(user);
                    return true;
                }
            }
        }
        return false;
    }
}
