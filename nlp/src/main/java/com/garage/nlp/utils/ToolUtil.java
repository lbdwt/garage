package com.garage.nlp.utils;

import org.apache.commons.lang.StringUtils;

public class ToolUtil {

    public static int getUnicode(String character){
        if(StringUtils.isBlank(character)){
            return -1;
        }
        String codeStr = Integer.toHexString(character.toCharArray()[0]);
        int unicode = Integer.parseInt(codeStr, 16);
        return unicode;
    }

    public static boolean isChineseCharacter(String character){
        int unicode = getUnicode(character);
        if(unicode<0x4E00 || unicode>0x9FA5){
            return false;
        }
        return true;
    }

}
