package com.cloud.comsumer.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.util.concurrent.TimeUnit;

@Component
public class RedisUtils {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    public boolean hasKey(String key){
        return redisTemplate.hasKey(key);
    }

    public Object get(String key){
        return key ==null ? null : redisTemplate.opsForValue().get(key);
    }

    public boolean set(String key, Object value){

        try{
            redisTemplate.opsForValue().set(key, value);
            return true;
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }

    public boolean set(String key, Object value, Long expireTime){

        try {
            redisTemplate.opsForValue().set(key,value);
            redisTemplate.expire(key, expireTime, TimeUnit.SECONDS);
        } catch (Exception e){
            e.printStackTrace();
            return false;
        }
        return true;
    }
}
