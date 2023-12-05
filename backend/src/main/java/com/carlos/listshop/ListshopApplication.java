package com.carlos.listshop;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.carlos.listshop")
public class ListshopApplication {

	public static void main(String[] args) {
		SpringApplication.run(ListshopApplication.class, args);
	}

}
