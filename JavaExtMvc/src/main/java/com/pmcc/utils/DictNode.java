package com.pmcc.utils;

/**
 * 字典下拉框用
 * Created by LvXL on 2016/8/26.
 */
public class DictNode {

    private String id;//字典主键

    private String text;//字典名称

    private String value;//字典值

    private String dictCode;//字典编码

    private String dictType;//字典所属类型

    public DictNode() {
    }
    public DictNode(String id, String text, String value, String dictCode, String dictType) {
        this.id = id;
        this.text = text;
        this.value = value;
        this.dictCode = dictCode;
        this.dictType = dictType;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getDictCode() {
        return dictCode;
    }

    public void setDictCode(String dictCode) {
        this.dictCode = dictCode;
    }

    public String getDictType() {
        return dictType;
    }

    public void setDictType(String dictType) {
        this.dictType = dictType;
    }

}
