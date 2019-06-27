package com.cloud.comsumer.controller;

import com.cloud.comsumer.dto.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.UUID;

@Controller
@RequestMapping("/")
public class PageController {

    @RequestMapping("index")
    public String index(){
        return "index";
    }

    @RequestMapping("/login")
    public void login(@RequestBody User user){

        UUID uuid = UUID.randomUUID();
        System.out.println(uuid);
    }
}
