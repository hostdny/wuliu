package com.pmcc.utils;

import com.pmcc.core.domain.BasePermission;

import java.util.List;

/**
 * 菜单树
 * Created by yaonan on 2016/1/4.
 */
public class ModuleTreeNode extends  TreeNode{
    private String id;
    private String ename;
    private String ico;
    private String pathHandler;
    private String description;
    private String url;
    private Integer flag;
    private String buttonId;
    private List<BasePermission> permissions;
    private List<ModuleTreeNode> children;
    private String iconCls;
    private String parentName;

    public String getParentName() {
        return parentName;
    }

    public void setParentName(String parentName) {
        this.parentName = parentName;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEname() {
        return ename;
    }

    public void setEname(String ename) {
        this.ename = ename;
    }

    public String getIco() {
        return ico;
    }

    public void setIco(String ico) {
        this.ico = ico;
    }

    public String getPathHandler() {
        return pathHandler;
    }

    public void setPathHandler(String pathHandler) {
        this.pathHandler = pathHandler;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Integer getFlag() {
        return flag;
    }

    public void setFlag(Integer flag) {
        this.flag = flag;
    }

    public String getButtonId() {
        return buttonId;
    }

    public void setButtonId(String buttonId) {
        this.buttonId = buttonId;
    }

    public List<ModuleTreeNode> getChildren() {
        return children;
    }

    public void setChildren(List<ModuleTreeNode> children) {
        this.children = children;
    }

    public List<BasePermission> getPermissions() {
        return permissions;
    }

    public void setPermissions(List<BasePermission> permissions) {
        this.permissions = permissions;
    }

    public String getIconCls() {
        return iconCls;
    }

    public void setIconCls(String iconCls) {
        this.iconCls = iconCls;
    }
}
