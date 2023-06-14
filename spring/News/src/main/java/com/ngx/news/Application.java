package com.ngx.news;

import com.ngx.news.repositories.PostRepository;
import com.ngx.news.seeders.PostSeeder;
import org.springframework.beans.factory.annotation.Qualifier;
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

		PostRepository repository = context.getBean(PostRepository.class);
		if (repository.count() > 0)
			return;

		PostSeeder seeder = context.getBean(PostSeeder.class);
		seeder.seed();
	}

	@Bean
	@LoadBalanced
	public RestTemplate loadBalancedRestTemplate() {
		return new RestTemplate();
	}
	@Bean
	@Qualifier("nonLoadBalancedRestTemplate")
	public RestTemplate restTemplate() {
		return new RestTemplate();
	}

}
