package com.garage.nlp;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
@MapperScan("com.garage.nlp.dao")
public class NlpApplication {

    public static void main(String[] args) {
        SpringApplication.run(NlpApplication.class, args);
    }

}
