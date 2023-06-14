package com.ngx.rh;

import com.ngx.rh.repositories.TeacherRepository;
import com.ngx.rh.seeders.FamilySeeder;
import com.ngx.rh.seeders.TeacherSeeder;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
@EnableDiscoveryClient
public class HumanResourcesApplication {

	public static void main(String[] args) {
		ApplicationContext context = SpringApplication.run(HumanResourcesApplication.class, args);

		TeacherRepository repository = context.getBean(TeacherRepository.class);
		if (repository.count() > 0)
			return;

		TeacherSeeder teacherSeeder = context.getBean(TeacherSeeder.class);
		FamilySeeder familySeeder = context.getBean(FamilySeeder.class);

		teacherSeeder.seed();
		familySeeder.seed();
	}

	@Bean
	@LoadBalanced
	public RestTemplate restTemplate() {
		return new RestTemplate();
	}

}
