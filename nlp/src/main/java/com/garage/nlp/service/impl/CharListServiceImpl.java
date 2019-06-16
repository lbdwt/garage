package com.garage.nlp.service.impl;

import com.alibaba.fastjson.JSON;
import com.garage.nlp.dao.CharListDao;
import com.garage.nlp.pojo.ReturnObj;
import com.garage.nlp.service.CharListService;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CharListServiceImpl implements CharListService {

    @Autowired
    private CharListDao charListDao;

    @Override
    public ReturnObj commit(String text) {

        ReturnObj returnObj = new ReturnObj();
        String[] textSplit = text.split("[^\\u4e00-\\u9fa5]+");
        System.out.println(JSON.toJSONString(textSplit));
        for (String str : textSplit) {
            if(StringUtils.isBlank(str.trim())){
                continue;
            }
            String[] charArr = str.split("");
            int pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
            Map<String, Integer> singleMap = new LinkedHashMap<>();
            Map<String, Integer> doubleMap = new LinkedHashMap<>();
            Map<String, Integer> tribleMap = new LinkedHashMap<>();
            Map<String, Integer> fouthMap = new LinkedHashMap<>();

            for (int i = 0; i < charArr.length; i++) {
                String cur = charArr[i];
                pos1 = str.indexOf(cur, pos1);
                pos2 = Math.min(i + 2, str.length());
                pos3 = Math.min(i + 3, str.length());
                pos4 = Math.min(i + 4, str.length());
                String char2 = str.substring(i, pos2);
                String char3 = str.substring(i, pos3);
                String char4 = str.substring(i, pos4);

                if (pos1 != -1) {
                    if (singleMap.get(cur) == null) {
                        singleMap.put(cur, 1);
                    } else {
                        singleMap.put(cur, singleMap.get(cur) + 1);
                    }
                    if (doubleMap.get(char2) == null) {
                        doubleMap.put(char2, 1);
                    } else {
                        doubleMap.put(char2, doubleMap.get(char2) + 1);
                    }
                    if (tribleMap.get(char3) == null) {
                        tribleMap.put(char3, 1);
                    } else {
                        tribleMap.put(char3, tribleMap.get(char3) + 1);
                    }
                    if (fouthMap.get(char4) == null) {
                        fouthMap.put(char4, 1);
                    } else {
                        fouthMap.put(char4, fouthMap.get(char4) + 1);
                    }
                }
            }
            charListDao.doWordStatistics(singleMap);
            charListDao.doWordStatistics(doubleMap);
            charListDao.doWordStatistics(tribleMap);
            charListDao.doWordStatistics(fouthMap);
        }
        return returnObj;
    }
}
