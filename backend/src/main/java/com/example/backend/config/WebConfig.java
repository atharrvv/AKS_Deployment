package com.example.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {

    @Bean
    public WebMvcConfigurer webMvcConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                // Allowing all origins, headers, and methods
                registry.addMapping("/**")
                        .allowedOrigins("*")  // Allow all origins
                        .allowedHeaders("*")  // Allow all headers
                        .allowedMethods("*")  // Allow all HTTP methods
                        .allowCredentials(false);  // Allow credentials (cookies, HTTP authentication, etc.)
            }
        };
    }

}
