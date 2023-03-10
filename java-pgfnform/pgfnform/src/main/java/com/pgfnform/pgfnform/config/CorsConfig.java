package com.pgfnform.pgfnform.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@EnableWebMvc
@Configuration
public class CorsConfig extends WebMvcConfigurerAdapter {

	@Override     
	public void addCorsMappings(CorsRegistry registry) 
	{         
		registry.addMapping("/**").allowedMethods("GET", "POST","PUT", "DELETE");     
	}
}