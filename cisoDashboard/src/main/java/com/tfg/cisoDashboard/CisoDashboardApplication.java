package com.tfg.cisoDashboard;

import com.tfg.cisoDashboard.Jwt.SecretKeyGenerator;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class CisoDashboardApplication {


	public static void main(String[] args) {
		new SecretKeyGenerator();
		SpringApplication.run(CisoDashboardApplication.class, args);
	}

}
