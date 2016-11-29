package com.pmcc.utils;

import java.util.Date;

/**
 * 树
 * Created by yaonan on 2016/1/4.
 */
public class TreeNode {
    private String id;
    private String text;
    private String oid;
    private String code;
    private String name;
    private String parentOid;
    private Integer LT;
    private Integer RT;
    private Integer sortCode;
    private Integer state;
    private Boolean checked;
    private  Boolean expanded; // 是否展开, true:展开,false:不展开

    private Boolean leaf;// true:没有子项,false:有子项
    private Integer treeLevel;
    private Date createTime;

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

    public String getOid() {
        return oid;
    }

    public void setOid(String oid) {
        this.oid = oid;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getParentOid() {
        return parentOid;
    }

    public void setParentOid(String parentOid) {
        this.parentOid = parentOid;
    }

    public Integer getLT() {
        return LT;
    }

    public void setLT(Integer LT) {
        this.LT = LT;
    }

    public Integer getRT() {
        return RT;
    }

    public void setRT(Integer RT) {
        this.RT = RT;
    }

    public Integer getSortCode() {
        return sortCode;
    }

    public void setSortCode(Integer sortCode) {
        this.sortCode = sortCode;
    }

    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }


    public Boolean getExpanded() {
        return expanded;
    }

    public void setExpanded(Boolean expanded) {
        this.expanded = expanded;
    }


    public Boolean getLeaf() {
        return leaf;
    }

    public void setLeaf(Boolean leaf) {
        this.leaf = leaf;
    }

    public Boolean getChecked() {
        return checked;
    }

    public void setChecked(Boolean checked) {
        this.checked = checked;
    }

    public Integer getTreeLevel() {
        return treeLevel;
    }

    public void setTreeLevel(Integer treeLevel) {
        this.treeLevel = treeLevel;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }


}
