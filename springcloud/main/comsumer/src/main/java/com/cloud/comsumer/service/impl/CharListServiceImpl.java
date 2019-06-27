package com.cloud.comsumer.service.impl;

import com.cloud.comsumer.dao.CharListDao;
import com.cloud.comsumer.pojo.ReturnObj;
import com.cloud.comsumer.service.CharListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.Map;

@Service
public class CharListServiceImpl implements CharListService {

    @Autowired
    CharListDao charListDao;

    public ReturnObj commit(String text){
        ReturnObj returnObj = new ReturnObj();
        String[] textSplit = text.split("[^\\u4e00-\\u9fa5]+");

        for(String str : textSplit){
            String[] charArr = str.split("");
            int pos1 = 0, pos2=0, pos3=0,pos4=0;
            Map<String,Integer> singleMap = new LinkedHashMap<>();
            Map<String,Integer> doubleMap = new LinkedHashMap<>();
            Map<String,Integer> tribleMap = new LinkedHashMap<>();
            Map<String,Integer> fouthMap = new LinkedHashMap<>();

            for(int i=0; i<charArr.length; i++){
                String cur = charArr[i];
                pos1 = str.indexOf(cur, pos1);
                pos2 = Math.min(i+2, str.length());
                pos3 = Math.min(i+3, str.length());
                pos4 = Math.min(i+4, str.length());
                if(pos1!=-1){
                    if(singleMap.get(cur)==null){
                        singleMap.put(cur,1);
                    }else{
                        singleMap.put(cur,singleMap.get(cur)+1);
                    }
                    if(doubleMap.get(cur)==null){
                        doubleMap.put(cur,1);
                    }else{
                        doubleMap.put(cur,doubleMap.get(cur)+1);
                    }
                    if(tribleMap.get(cur)==null){
                        tribleMap.put(cur,1);
                    }else{
                        tribleMap.put(cur,tribleMap.get(cur)+1);
                    }
                    if(fouthMap.get(cur)==null){
                        fouthMap.put(cur,1);
                    }else{
                        fouthMap.put(cur,fouthMap.get(cur)+1);
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
