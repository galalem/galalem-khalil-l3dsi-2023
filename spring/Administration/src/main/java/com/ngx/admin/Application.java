package com.ngx.admin;

import com.ngx.admin.entities.Establishment;
import com.ngx.admin.repositories.EstablishmentRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
@EnableDiscoveryClient
public class Application {

	public static void main(String[] args) {
		ApplicationContext context = SpringApplication.run(Application.class, args);

		EstablishmentRepository establishmentRepository = context.getBean(EstablishmentRepository.class);
		if (!establishmentRepository.existsById(1L))
			establishmentRepository.save(new Establishment());

	}

	@Bean
	@LoadBalanced
	public RestTemplate restTemplate() {
		return new RestTemplate();
	}
}


