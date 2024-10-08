package com.tfg.cisoDashboard.Jwt;

import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.JWSSigner;
import com.nimbusds.jose.JWSVerifier;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import org.springframework.beans.factory.annotation.Value;
import com.tfg.cisoDashboard.model.User;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class JwtTokenProvider {

    @Value("${jwt.expiration}")
    private long validityInMilliseconds;

    public String createToken(User user) {
        try {
            String key = SecretKeyGenerator.getSecretKey();
            JWSSigner signer = new MACSigner(key);

            List<String> roles = user.getAuthorities().stream()
                    .map(authority -> authority.getAuthority())
                    .collect(Collectors.toList());
            Date now = new Date();
            Date validity = new Date(now.getTime() + validityInMilliseconds);
            JWTClaimsSet claimsSet = new JWTClaimsSet.Builder()
                    .subject(user.getId().toString())
                    .issueTime(now)
                    .expirationTime(validity)
                    .claim("roles", roles)
                    .build();
            SignedJWT signedJWT = new SignedJWT(new JWSHeader(JWSAlgorithm.HS256), claimsSet);
            signedJWT.sign(signer);

            return signedJWT.serialize();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public boolean validateToken(String token) {
        try {
            JWSVerifier verifier = new MACVerifier(SecretKeyGenerator.getSecretKey());
            SignedJWT signedJWT = SignedJWT.parse(token);
            return signedJWT.verify(verifier);
        } catch (Exception e) {
            return false;
        }
    }

    public String getUserIdFromToken(String token) {
        try {
            SignedJWT signedJWT = SignedJWT.parse(token);
            JWTClaimsSet claims = signedJWT.getJWTClaimsSet();
            return claims.getSubject();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public List<String> getRolesFromToken(String token) {
        try {
            SignedJWT signedJWT = SignedJWT.parse(token);
            JWTClaimsSet claims = signedJWT.getJWTClaimsSet();
            return claims.getStringListClaim("roles");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
