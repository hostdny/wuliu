package com.pmcc.utils;

/**
 * 按钮工具类
 * Created by LvXL on 2016/7/1.
 */
public class ButtonUtils {

    private String id;
    private String name;
    private boolean checked;

    public ButtonUtils() {
    }

    public ButtonUtils(String id, String name, boolean checked) {
        this.id = id;
        this.name = name;
        this.checked = checked;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isChecked() {
        return checked;
    }

    public void setChecked(boolean checked) {
        this.checked = checked;
    }
}
