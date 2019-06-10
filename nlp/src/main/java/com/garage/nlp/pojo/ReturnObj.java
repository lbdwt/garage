package com.garage.nlp.pojo;

public class ReturnObj<T> {

    private String code;
    private String ms;
    private T data;

    public ReturnObj(){
        this.code = "200";
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMs() {
        return ms;
    }

    public void setMs(String ms) {
        this.ms = ms;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    @Override
    public String toString() {
        return "ReturnObj{" +
                "code='" + code + '\'' +
                ", ms='" + ms + '\'' +
                ", data=" + data +
                '}';
    }

}
