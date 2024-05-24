package com.tfg.cisoDashboard.security;

import com.tfg.cisoDashboard.model.User;
import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityUtils {
    public static Long getCurrentUserIdFromContext() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof User) {
            return ((User) principal).getId();
        } else {
            return null;
        }
    }
}
