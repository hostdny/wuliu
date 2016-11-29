package com.pmcc.utils;

/**
 * 折线图返回实体
 * Created by LvXL on 2016/7/11.
 */
public class BrokenLineVo {

    private int month;// 月份
    private int total;// 总数量
    private int finish;//完成数量
    private int unfinished;//未完成数量

    public int getMonth() {
        return month;
    }

    public void setMonth(int month) {
        this.month = month;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public int getFinish() {
        return finish;
    }

    public void setFinish(int finish) {
        this.finish = finish;
    }

    public int getUnfinished() {
        return unfinished;
    }

    public void setUnfinished(int unfinished) {
        this.unfinished = unfinished;
    }
}
