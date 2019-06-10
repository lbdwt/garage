package com.garage.nlp.dto;

public class WordVector {

    private String foreWard;
    private String body;
    private String afterWard;

    private String frontCombine;
    private String afterCombine;

    public String getForeWard() {
        return foreWard;
    }

    public void setForeWard(String foreWard) {
        this.foreWard = foreWard;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public String getAfterWard() {
        return afterWard;
    }

    public void setAfterWard(String afterWard) {
        this.afterWard = afterWard;
    }

    public String getFrontCombine() {
        return frontCombine;
    }

    public String getAfterCombine() {
        return afterCombine;
    }

    @Override
    public String toString() {
        return "WordVector{" +
                "foreWard='" + foreWard + '\'' +
                ", body='" + body + '\'' +
                ", afterWard='" + afterWard + '\'' +
                ", frontCombine='" + frontCombine + '\'' +
                ", afterCombine='" + afterCombine + '\'' +
                '}';
    }

}
