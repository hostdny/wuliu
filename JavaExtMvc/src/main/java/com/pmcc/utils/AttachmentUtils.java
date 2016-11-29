package com.pmcc.utils;

/**
 * app视频查询用
 * Created by LvXL on 2016/7/13.
 */
public class AttachmentUtils {

    private String url;// 视频地址，文字信息(html格式)
    private int time;// 图片播放之间(秒)
    private String flag;// 图片视频标记 0：图片，1：视频，2：文字信息
    private String name;// 名称
    private int screenSize;// 屏幕尺寸（寸）

    public AttachmentUtils() {
    }

    public AttachmentUtils(String url, int time, String flag, String name, int screenSize) {
        this.url = url;
        this.time = time;
        this.flag = flag;
        this.name = name;
        this.screenSize = screenSize;
    }

    public int getScreenSize() {
        return screenSize;
    }

    public void setScreenSize(int screenSize) {
        this.screenSize = screenSize;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public int getTime() {
        return time;
    }

    public void setTime(int time) {
        this.time = time;
    }

    public String getFlag() {
        return flag;
    }

    public void setFlag(String flag) {
        this.flag = flag;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
