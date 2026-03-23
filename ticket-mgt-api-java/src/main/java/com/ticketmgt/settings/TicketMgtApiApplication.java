package com.ticketmgt.settings;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class TicketMgtApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(TicketMgtApiApplication.class, args);
    }

}
