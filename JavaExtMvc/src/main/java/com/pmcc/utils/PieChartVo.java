package com.pmcc.utils;

/**
 * 饼状图返回实体
 * Created by LvXL on 2016/7/11.
 */
public class PieChartVo {

    private String ptype;
    private int num;
    private double precent;//百分比

    public String getPtype() {
        return ptype;
    }

    public void setPtype(String ptype) {
        this.ptype = ptype;
    }

    public int getNum() {
        return num;
    }

    public void setNum(int num) {
        this.num = num;
    }

    public double getPrecent() {
        return precent;
    }

    public void setPrecent(double precent) {
        this.precent = precent;
    }
}
