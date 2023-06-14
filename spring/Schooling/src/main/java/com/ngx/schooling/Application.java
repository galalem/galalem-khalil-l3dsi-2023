package com.ngx.schooling;

import com.ngx.schooling.entities.Grading;
import com.ngx.schooling.repositories.GradingRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.ApplicationContext;

@SpringBootApplication
@EnableDiscoveryClient
public class Application {
	public static void main(String[] args) {
		ApplicationContext context = SpringApplication.run(Application.class, args);

		GradingRepository gradingRepository = context.getBean(GradingRepository.class);
		if (gradingRepository.count() == 0) {
			gradingRepository.save(new Grading(1L, "Notes Alphabétiques (A-F)", false, "[\"A\", \"B\", \"C\", \"D\", \"F\"]", false));
			gradingRepository.save(new Grading(2L, "Pourcentage", true, "{\"min\": 0, \"max\": 100, \"step\": 1}", false));
			gradingRepository.save(new Grading(3L, "Moyenne pondérée cumulative (GPA)", true, "{\"min\": 0, \"max\": 4, \"step\": 0.1}", false));
			gradingRepository.save(new Grading(4L, "Réussite/échec", false, "[\"Réussite\", \"Échec\"]", false));
			gradingRepository.save(new Grading(5L, "Échelle de 20 points", true, "{\"min\": 0, \"max\": 20, \"step\": 0.25}", false));
			gradingRepository.save(new Grading(6L, "Échelle de 10 points", true, "{\"min\": 0, \"max\": 10, \"step\": 0.25}", false));
			gradingRepository.save(new Grading(7L, "Échelle de 7 points", true, "{\"min\": 0, \"max\": 7, \"step\": 1}", false));
			gradingRepository.save(new Grading(8L, "Descripteurs qualitatifs", false, "[\"Novice\", \"Intermédiaire\", \"Avancé\", \"Expert\"]", false));
		}
	}

}


