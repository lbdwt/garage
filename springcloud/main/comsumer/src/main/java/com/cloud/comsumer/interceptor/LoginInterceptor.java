package com.cloud.comsumer.interceptor;

import com.alibaba.fastjson.JSON;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@Component
public class LoginInterceptor extends HandlerInterceptorAdapter {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        System.out.println("进入拦截器");
        Cookie[] cookies = request.getCookies();
        System.out.println("cookies:"+ JSON.toJSONString(cookies));
        HttpSession session = request.getSession();
        String id = session.getId();
        System.out.println(id);
        return true;
    }
}
