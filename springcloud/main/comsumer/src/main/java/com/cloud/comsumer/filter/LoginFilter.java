package com.cloud.comsumer.filter;

import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@WebFilter(urlPatterns = "/*")
public class LoginFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        System.out.println("进入过滤器");
        if(!(servletRequest instanceof HttpServletRequest)){
            filterChain.doFilter(servletRequest,servletResponse);
        }else {
            RequestWrapper requestWrapper = new RequestWrapper((HttpServletRequest) servletRequest);
            if(requestWrapper==null){
                filterChain.doFilter(servletRequest,servletResponse);
            }else{
                filterChain.doFilter(requestWrapper,servletResponse);
            }
        }
    }

    @Override
    public void destroy() {

    }
}
