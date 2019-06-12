package com.garage.nlp.utils;

import com.garage.nlp.dto.WordVector;
import org.springframework.util.StringUtils;

import javax.swing.plaf.TextUI;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class TextHandler {

    public static Map<String, List<WordVector>> wordVectorGenerator(String text) {
        Map<String, List<WordVector>> wordVectorMap = new HashMap<>();
        if(StringUtils.isEmpty(text)){
            return wordVectorMap;
        }
        String[] split = text.split("");
        WordVector wordVector = null;
        for(int i=0; i<split.length; i++){
            String curWord = split[i];
            if(!ToolUtil.isChineseCharacter(curWord)){
                continue;
            }
            wordVector = new WordVector();
            String foreward = i>0 ? split[i-1] : null;
            String afterward = i<(split.length-1) ? split[i+1] : null;
            if(!ToolUtil.isChineseCharacter(foreward)){
                foreward = "";
            }
            if(!ToolUtil.isChineseCharacter(afterward)){
                afterward = "";
            }
            wordVector.setForeWard(foreward);
            wordVector.setBody(curWord);
            wordVector.setAfterWard(afterward);
            if(wordVectorMap.get(curWord)==null){
                wordVectorMap.put(curWord,new ArrayList<WordVector>());
            }
            wordVectorMap.get(curWord).add(wordVector);
        }
        return wordVectorMap;
    }

    public static Map<String, Integer> wordStatistics(Map<String, List<WordVector>> wordVectorMap){
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
    public static Map<String, Integer> convertBody(Map<String, List<WordVector>> wordVectorListMap){
        Map<String, Integer> bodyMap = new HashMap<>();
        for(Map.Entry<String, List<WordVector>> entry : wordVectorListMap.entrySet()){
            String key = entry.getKey();
            bodyMap.put(key, entry.getValue().size());
        }
        return bodyMap;
    }
}
