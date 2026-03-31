package com.ticketmgt;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = "com.ticketmgt")
@EnableJpaRepositories(basePackages = "com.ticketmgt")
@EntityScan(basePackages = "com.ticketmgt")
@EnableJpaAuditing
public class TicketMgtApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(TicketMgtApiApplication.class, args);
    }

}
