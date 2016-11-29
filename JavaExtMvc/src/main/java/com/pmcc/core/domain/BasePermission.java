package com.pmcc.core.domain;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

/**
 * 权限表
 * Created by yaonan on 2015/12/18.
 */
@Entity
@Table(name = "BASE_PERMISSION")
@org.hibernate.annotations.Cache(region = "com.pmcc.core.domain.BasePermission", usage = CacheConcurrencyStrategy.READ_WRITE)
public class BasePermission implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GenericGenerator(name = "systemUUID", strategy = "uuid")
    @GeneratedValue(generator = "systemUUID")
    @Column(name = "OID")
    private String id;

    @Column(name = "NAME")
    private String name;  //权限名称

    @Column(name = "DESCRIPTION")
    private String description;//权限描述

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

    //菜单和权限关系
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "permission")
    @org.hibernate.annotations.Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<BasePermissionModuleRelation> permissionModuleRelations = new HashSet<BasePermissionModuleRelation>();

    //权限和角色关系
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "permission")
    @org.hibernate.annotations.Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<BaseRolePermissionRelation> rolePermissionRelations = new HashSet<BaseRolePermissionRelation>();

    public Set<BasePermissionModuleRelation> getPermissionModuleRelations() {
        return permissionModuleRelations;
    }

    public void setPermissionModuleRelations(Set<BasePermissionModuleRelation> permissionModuleRelations) {
        this.permissionModuleRelations = permissionModuleRelations;
    }

    public Set<BaseRolePermissionRelation> getRolePermissionRelations() {
        return rolePermissionRelations;
    }

    public void setRolePermissionRelations(Set<BaseRolePermissionRelation> rolePermissionRelations) {
        this.rolePermissionRelations = rolePermissionRelations;
    }

    public BasePermission() {
    }

    public BasePermission(String id) {
        this.id = id;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @JsonSerialize(using = com.pmcc.utils.CustomDateSerializer.class)
    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
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
