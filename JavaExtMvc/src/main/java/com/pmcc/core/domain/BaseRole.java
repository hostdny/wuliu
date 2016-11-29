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
 * 角色表
 * Created by yaonan on 2015/12/18.
 */
@Entity
@Table(name = "BASE_ROLE")
@org.hibernate.annotations.Cache(region = "com.pmcc.core.domain.BaseRole", usage = CacheConcurrencyStrategy.READ_WRITE)
public class BaseRole implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GenericGenerator(name = "systemUUID", strategy = "uuid")
    @GeneratedValue(generator = "systemUUID")
    @Column(name = "OID")
    private String id;

    @Column(name = "CODE")
    private String code;// 角色编号

    @Column(name = "NAME")
    private String name;//角色名称

    @Column(name = "STATE")
    private Integer state;//状态

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

    @Column(name = "SYSTEM_CODE")
    private String systemCode;//系统编码

    @Transient
    private String permissionsId;

    //角色和用户
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "role")
    @org.hibernate.annotations.Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<BasePersonRoleRelation> personRoleRelations = new HashSet<BasePersonRoleRelation>();

    // 角色和权限
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "role")
    @org.hibernate.annotations.Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<BaseRolePermissionRelation> rolePermissionRelations = new HashSet<BaseRolePermissionRelation>();

    // 角色和组织
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "role")
    @org.hibernate.annotations.Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<BaseRoleOrgRelation> roleOrgRelations = new HashSet<BaseRoleOrgRelation>();

    // 角色菜单关系
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "role")
    @org.hibernate.annotations.Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<BaseRoleModuleRelation> roleModuleRelations = new HashSet<BaseRoleModuleRelation>();

    public Set<BaseRoleModuleRelation> getRoleModuleRelations() {
        return roleModuleRelations;
    }

    public void setRoleModuleRelations(Set<BaseRoleModuleRelation> roleModuleRelations) {
        this.roleModuleRelations = roleModuleRelations;
    }

    public Set<BasePersonRoleRelation> getPersonRoleRelations() {
        return personRoleRelations;
    }

    public void setPersonRoleRelations(Set<BasePersonRoleRelation> personRoleRelations) {
        this.personRoleRelations = personRoleRelations;
    }

    public Set<BaseRolePermissionRelation> getRolePermissionRelations() {
        return rolePermissionRelations;
    }

    public void setRolePermissionRelations(Set<BaseRolePermissionRelation> rolePermissionRelations) {
        this.rolePermissionRelations = rolePermissionRelations;
    }

    public Set<BaseRoleOrgRelation> getRoleOrgRelations() {
        return roleOrgRelations;
    }

    public void setRoleOrgRelations(Set<BaseRoleOrgRelation> roleOrgRelations) {
        this.roleOrgRelations = roleOrgRelations;
    }

    public BaseRole() {
    }

    public BaseRole(String id) {
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }

    @JsonSerialize(using = com.pmcc.utils.CustomDateSerializer.class)
    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public String getPermissionsId() {
        return permissionsId;
    }

    public void setPermissionsId(String permissionsId) {
        this.permissionsId = permissionsId;
    }

    public String getSystemCode() {
        return systemCode;
    }

    public void setSystemCode(String systemCode) {
        this.systemCode = systemCode;
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
