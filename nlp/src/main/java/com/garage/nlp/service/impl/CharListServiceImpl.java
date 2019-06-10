package com.garage.nlp.service.impl;

import com.garage.nlp.dao.CharListDao;
import com.garage.nlp.dto.WordVector;
import com.garage.nlp.pojo.ReturnObj;
import com.garage.nlp.service.CharListService;
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
        Map<String, List<WordVector>> wordVectorListMap = wordVectorGenerator(text);
        return returnObj;
    }

    private Map<String,List<WordVector>> wordVectorGenerator(String text) {
        Map<String, List<WordVector>> wordVectorMap = new HashMap<>();
        if(StringUtils.isEmpty(text)){
            return wordVectorMap;
        }
        String[] split = text.split("");
        WordVector wordVector = null;
        for(int i=0; i<split.length; i++){
            String curWord = split[i];
            String codeStr = Integer.toHexString(curWord.toCharArray()[0]);
            int unicode = Integer.parseInt(codeStr, 16);
            if(unicode<0x4E00 || unicode>0x9FA5){
                continue;
            }
            wordVector = new WordVector();
            String forward = i>0 ? split[i-1] : null;
            String afterward = i<(split.length-1) ? split[i+1] : null;
            wordVector.setForeWard(forward);
            wordVector.setBody(curWord);
            wordVector.setAfterWard(afterward);
            if(wordVectorMap.get(curWord)==null){
                wordVectorMap.put(curWord,new ArrayList<WordVector>());
            }
            wordVectorMap.get(curWord).add(wordVector);
        }
        return wordVectorMap;
    }

    public Map<String, Integer> wordStatistics(Map<String, List<WordVector>> wordVectorMap){
        Map<String,Integer> wordStatisticsMap = new HashMap<>();
        for ( Map.Entry<String, List<WordVector>> entry : wordVectorMap.entrySet()) {
            for(WordVector wordVector : entry.getValue()){
                String frontCombine = wordVector.getFrontCombine();
                String afterCombine = wordVector.getAfterCombine();
                if(wordStatisticsMap.get(frontCombine)==null){
                    wordStatisticsMap.put(frontCombine,0);
                }
                if(wordStatisticsMap.get(afterCombine)==null){
                    wordStatisticsMap.put(afterCombine,0);
                }
                wordStatisticsMap.put(frontCombine, wordStatisticsMap.get(frontCombine)+1);
                wordStatisticsMap.put(afterCombine, wordStatisticsMap.get(afterCombine)+1);
            }
        }
        return wordStatisticsMap;
    }
}
