package com.tfg.cisoDashboard;

import com.tfg.cisoDashboard.Jwt.SecretKeyGenerator;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CisoDashboardApplication {


	public static void main(String[] args) {
		new SecretKeyGenerator();
		SpringApplication.run(CisoDashboardApplication.class, args);
	}

}
