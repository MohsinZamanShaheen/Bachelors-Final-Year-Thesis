package com.tfg.cisoDashboard.Jwt;

import java.security.SecureRandom;

public class SecretKeyGenerator {
    
    private static final String SECRET_KEY;

    static {
        byte[] secretKeyBytes = new byte[128];
        SecureRandom secureRandom = new SecureRandom();
        secureRandom.nextBytes(secretKeyBytes);
        SECRET_KEY = java.util.Base64.getEncoder().encodeToString(secretKeyBytes);
    }
    public static String getSecretKey(){
        return SECRET_KEY;
    }
}
