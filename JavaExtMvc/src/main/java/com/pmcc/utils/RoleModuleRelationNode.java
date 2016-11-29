package com.pmcc.utils;

import java.util.ArrayList;
import java.util.List;

/**
 * 角色菜单分配用
 * Created by LvXL on 2016/7/1.
 */
public class RoleModuleRelationNode {

    private String id;
    private String text;
    private String name;
    private Boolean checked;
    private List<ButtonUtils> toolbarBtns = new ArrayList<ButtonUtils>();
    private List<ButtonUtils> operationBtns = new ArrayList<ButtonUtils>();
    private List<ButtonUtils> pageBtns = new ArrayList<ButtonUtils>();
    private List<ButtonUtils> actions = new ArrayList<ButtonUtils>();
    private List<RoleModuleRelationNode> children;
    private Boolean expanded;
    private Boolean leaf;

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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean getChecked() {
        return checked;
    }

    public void setChecked(Boolean checked) {
        this.checked = checked;
    }

    public List<ButtonUtils> getToolbarBtns() {
        return toolbarBtns;
    }

    public void setToolbarBtns(List<ButtonUtils> toolbarBtns) {
        this.toolbarBtns = toolbarBtns;
    }

    public List<ButtonUtils> getOperationBtns() {
        return operationBtns;
    }

    public void setOperationBtns(List<ButtonUtils> operationBtns) {
        this.operationBtns = operationBtns;
    }

    public List<ButtonUtils> getPageBtns() {
        return pageBtns;
    }

    public void setPageBtns(List<ButtonUtils> pageBtns) {
        this.pageBtns = pageBtns;
    }

    public List<ButtonUtils> getActions() {
        return actions;
    }

    public void setActions(List<ButtonUtils> actions) {
        this.actions = actions;
    }

    public Boolean getExpanded() {
        return expanded;
    }

    public void setExpanded(Boolean expanded) {
        this.expanded = expanded;
    }

    public List<RoleModuleRelationNode> getChildren() {
        return children;
    }

    public void setChildren(List<RoleModuleRelationNode> children) {
        this.children = children;
    }

    public Boolean getLeaf() {
        return leaf;
    }

    public void setLeaf(Boolean leaf) {
        this.leaf = leaf;
    }
}
