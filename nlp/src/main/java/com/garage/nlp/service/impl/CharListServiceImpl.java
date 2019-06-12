package com.garage.nlp.service.impl;

import com.garage.nlp.dao.CharListDao;
import com.garage.nlp.dto.WordVector;
import com.garage.nlp.pojo.ReturnObj;
import com.garage.nlp.service.CharListService;
import com.garage.nlp.utils.TextHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CharListServiceImpl implements CharListService {

    @Autowired
    private CharListDao charListDao;

    @Override
    public ReturnObj commit(String text) {
        ReturnObj returnObj = new ReturnObj();
        Map<String, List<WordVector>> wordVectorListMap = TextHandler.wordVectorGenerator(text);
        int i = charListDao.addCharRecord(wordVectorListMap);
        Map<String, Integer> bodyMap = TextHandler.convertBody(wordVectorListMap);
        charListDao.doWordStatisticsRound1(bodyMap);
        return returnObj;
    }


}
