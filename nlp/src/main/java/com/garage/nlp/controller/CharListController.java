package com.garage.nlp.controller;

import com.garage.nlp.pojo.ReturnObj;
import com.garage.nlp.service.CharListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class CharListController {

    @Autowired
    CharListService charListService;

    @RequestMapping("commit")
    public ReturnObj commit(@RequestBody String text){
        return charListService.commit(text);
    }
}
