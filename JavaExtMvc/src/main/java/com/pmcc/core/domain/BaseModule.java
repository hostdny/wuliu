package com.pmcc.core.domain;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.hibernate.annotations.*;

import javax.persistence.*;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * 菜单功能表
 * Created by yaonan on 2015/12/18.
 */
@Entity
@Table(name = "BASE_MODULE")
@org.hibernate.annotations.Cache(region = "com.pmcc.core.domain.BaseModule", usage = CacheConcurrencyStrategy.READ_WRITE)
public class BaseModule implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GenericGenerator(name = "systemUUID", strategy = "uuid")
    @GeneratedValue(generator = "systemUUID")
    @Column(name = "OID")
    private String id;

    @Column(name = "CODE")
    private String code;//编号

    @Column(name = "CNAME")
    private String cName;//名称

    @Column(name = "ENAME")
    private String eName;//英文名称

    @Column(name = "ICO")
    private String ico;//图标

    @Column(name = "PATHHANDLER")
    private String pathHandler;//操作方法

    @Column(name = "DESCRIPTION")
    private String description;//描述

    @Column(name = "URL")
    private String url;//ACTION路径

    @Column(name = "PARENTOID")
    private String parentOid;//上级菜单

    @Column(name = "LT")
    private Integer lt;//左根

    @Column(name = "RT")
    private Integer rt;//右根

    @Column(name = "TREELEVEL")
    private Integer treeLevel;//树层级

    @Column(name = "SORT_NO")
    private Integer sortNo;//排序编号

    @Column(name = "STATE")
    private Integer state;//状态

    @Column(name = "FLAG")
    private Integer flag;//功能标识 0菜单 1工具栏按钮 2请求 3行操作按钮 4页面按钮

    @Column(name = "BUTTON_ID")
    private String buttonId;//按钮ID

    @Column(name = "CREATE_ID")
    private String createId;//创建人

    @Column(name = "CREATE_NAME")
    private String createName;//创建人名称

    @Column(name = "CREATE_TIME")
    private Date createTime;//创建时间

    @Column(name = "CREATE_UNIT_ID")
    private String createUnitId;//创建人单位

    @Column(name = "CREATE_UNIT_NAME")
    private String createUnitName;//创建人单位名称

    @Column(name = "REMARK")
    private String remark;//备注

    @Column(name = "DEL_FLAG")
    private Integer delFlag;//删除标记

    //权限和菜单关系
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "module")
    @org.hibernate.annotations.Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<BasePermissionModuleRelation> permissionModuleRelations = new HashSet<BasePermissionModuleRelation>();

    //角色和菜单关系
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "module")
    @org.hibernate.annotations.Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<BaseRoleModuleRelation> roleModuleRelations = new HashSet<BaseRoleModuleRelation>();

    /* 下拉树用 */
    @Transient
    private Boolean expanded;// 是否展开
    @Transient
    private Boolean leaf;// 是否最末端
    @Transient
    private String text;// 显示文本

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

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Set<BaseRoleModuleRelation> getRoleModuleRelations() {
        return roleModuleRelations;
    }

    public void setRoleModuleRelations(Set<BaseRoleModuleRelation> roleModuleRelations) {
        this.roleModuleRelations = roleModuleRelations;
    }

    public Set<BasePermissionModuleRelation> getPermissionModuleRelations() {
        return permissionModuleRelations;
    }

    public void setPermissionModuleRelations(Set<BasePermissionModuleRelation> permissionModuleRelations) {
        this.permissionModuleRelations = permissionModuleRelations;
    }

    public BaseModule() {
    }

    public BaseModule(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getcName() {
        return cName;
    }

    public void setcName(String cName) {
        this.cName = cName;
    }

    public String geteName() {
        return eName;
    }

    public void seteName(String eName) {
        this.eName = eName;
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

    public String getParentOid() {
        return parentOid;
    }

    public void setParentOid(String parentOid) {
        this.parentOid = parentOid;
    }

    public Integer getLt() {
        return lt;
    }

    public void setLt(Integer lt) {
        this.lt = lt;
    }

    public Integer getRt() {
        return rt;
    }

    public void setRt(Integer rt) {
        this.rt = rt;
    }

    public Integer getTreeLevel() {
        return treeLevel;
    }

    public void setTreeLevel(Integer treeLevel) {
        this.treeLevel = treeLevel;
    }

    public Integer getSortNo() {
        return sortNo;
    }

    public void setSortNo(Integer sortNo) {
        this.sortNo = sortNo;
    }

    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
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

    public String getCreateId() {
        return createId;
    }

    public void setCreateId(String createId) {
        this.createId = createId;
    }

    public String getCreateName() {
        return createName;
    }

    public void setCreateName(String createName) {
        this.createName = createName;
    }

    @JsonSerialize(using = com.pmcc.utils.CustomDateSerializer.class)
    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public String getCreateUnitId() {
        return createUnitId;
    }

    public void setCreateUnitId(String createUnitId) {
        this.createUnitId = createUnitId;
    }

    public String getCreateUnitName() {
        return createUnitName;
    }

    public void setCreateUnitName(String createUnitName) {
        this.createUnitName = createUnitName;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public Integer getDelFlag() {
        return delFlag;
    }

    public void setDelFlag(Integer delFlag) {
        this.delFlag = delFlag;
    }
}
