package com.pmcc.utils;

import java.util.List;

/**
 * 组织树
 * Created by yaonan on 2016/1/4.
 */
public class OrgTreeNode extends  TreeNode{
    private String id;
    private Integer orgLevel;
    private Integer orgNo;
    private String englishName;
    private List<OrgTreeNode> children;
    private String shortName;
    private String description;


    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }

    public Integer getOrgLevel() {
        return orgLevel;
    }

    public List<OrgTreeNode> getChildren() {
        return children;
    }

    public void setChildren(List<OrgTreeNode> children) {
        this.children = children;
    }

    public void setOrgLevel(Integer orgLevel) {
        this.orgLevel = orgLevel;
    }

    public Integer getOrgNo() {
        return orgNo;
    }

    public void setOrgNo(Integer orgNo) {
        this.orgNo = orgNo;
    }

    public String getEnglishName() {
        return englishName;
    }

    public void setEnglishName(String englishName) {
        this.englishName = englishName;
    }

    public String getShortName() {
        return shortName;
    }

    public void setShortName(String shortName) {
        this.shortName = shortName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }


}
