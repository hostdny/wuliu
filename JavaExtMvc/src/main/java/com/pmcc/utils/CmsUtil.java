package com.pmcc.utils;

import java.util.List;

public class CmsUtil
{

    private String name;//显示名称
    private String type;//没有父级，则是自己，有父级，是自身。
    private String parentOid;//没有父的为null，有父的是父级的id
    private String pid;//主键
    private String akey;
    private String bkey;
    private String url;
    private String remark;
    private Double sortNo;
    private List<CmsUtil> children;
    private Boolean expanded;//是否展开
    private Boolean leaf;//是否是叶子
    private String iconCls;
    private int isMain;
    private String code;
    private Integer isNeedLogin;
    private Integer isShow;
    private String artilceContext;

    public Integer getIsShow() {
        return isShow;
    }

    public void setIsShow(Integer isShow) {
        this.isShow = isShow;
    }

    public String getArtilceContext() {
        return artilceContext;
    }

    public void setArtilceContext(String artilceContext) {
        this.artilceContext = artilceContext;
    }

    public Integer getIsNeedLogin() {
        return isNeedLogin;
    }

    public void setIsNeedLogin(Integer isNeedLogin) {
        this.isNeedLogin = isNeedLogin;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public Double getSortNo() {
        return sortNo;
    }

    public void setSortNo(Double sortNo) {
        this.sortNo = sortNo;
    }

    public String getBkey() {
        return bkey;
    }

    public void setBkey(String bkey) {
        this.bkey = bkey;
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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public List<CmsUtil> getChildren() {
        return children;
    }

    public void setChildren(List<CmsUtil> children) {
        this.children = children;
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

    public String getIconCls() {
        return "noIcon";
    }

    public void setIconCls(String iconCls) {
        this.iconCls = iconCls;
    }

    public String getPid() {
        return pid;
    }

    public void setPid(String pid) {
        this.pid = pid;
    }

    public int getIsMain() {
        return isMain;
    }

    public void setIsMain(int isMain) {
        this.isMain = isMain;
    }

    public String getParentOid() {
        return parentOid;
    }

    public void setParentOid(String parentOid) {
        this.parentOid = parentOid;
    }

    public String getAkey() {
        return akey;
    }

    public void setAkey(String akey) {
        this.akey = akey;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}

