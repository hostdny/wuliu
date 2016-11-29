package com.pmcc.core.domain;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * 组织机构表
 * Created by LvXL on 2016/6/22.
 */
@Entity
@Table(name = "BASE_ORGANIZATION")
public class BaseOrganization implements Serializable {

    @Id
    @GenericGenerator(name = "systemUUID", strategy = "uuid")
    @GeneratedValue(generator = "systemUUID")
    @Column(name = "OID")
    private String id;

    @Column(name = "CODE")
    private String code;//机构编号

    @Column(name = "CNAME")
    private String cName;//机构中文名称

    @Column(name = "ENAME")
    private String eName;//机构英文名称

    @Column(name = "ORGNO")
    private String orgNo;//机构号

    @Column(name = "SHORT_NAME")
    private String shortName;//机构简称

    @Column(name = "DESCRIPTION")
    private String description;//机构说明

    @Column(name = "PARENT_ID")
    private String parentId;//上级机构ID

    @Column(name = "LT")
    private Integer lt;//左根

    @Column(name = "RT")
    private Integer rt;//右根

    @Column(name = "TREELEVEL")
    private Integer treeLevel;//树形层级

    @Column(name = "ORGLEVEL")
    private Integer orgLevel;//机构级别(省市县等)

    @Column(name = "SORT_NO")
    private Integer sortNo;//排序编号

    @Column(name = "STATE")
    private Integer state;//状态

    @Column(name = "SYSTEM_CODE")
    private String systemCode;//系统编码

    @Column(name = "MANAGER_UNIT_CODE")
    private String managerUnitCode;//可管理机构编码

    @Column(name = "MANAGER_UNIT_ID")
    private String managerUnitId;//可管理机构ID

    @Column(name = "MANAGER_UNIT_NAME")
    private String managerUnitName;//可管理机构名称

    @Column(name = "COUNT_UNIT_CODE")
    private String countUnitCode;//统计机构编码

    @Column(name = "COUNT_UNIT_ID")
    private String countUnitId;//统计机构ID

    @Column(name = "COUNT_UNIT_NAME")
    private String countUnitName;//统计机构名称

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

    // 角色和组织
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "organization")
    @org.hibernate.annotations.Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<BaseRoleOrgRelation> roleOrgRelations = new HashSet<BaseRoleOrgRelation>();

    // 组织机构和人员关系
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "organization")
    @org.hibernate.annotations.Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<BasePersonOrgRelation> personOrgRelations = new HashSet<BasePersonOrgRelation>();

    /* comboTree用 */
    @Transient
    private Boolean expanded;// 是否展开
    @Transient
    private Boolean leaf;// 是否最末端
    @Transient
    private String text;// 显示文本

    @Transient
    private String parentName;// 父级机构名称

    @Transient
    private List<BasePersonInfo> persons;// 组织机构下的人员

    public List<BasePersonInfo> getPersons() {
        return persons;
    }

    public void setPersons(List<BasePersonInfo> persons) {
        this.persons = persons;
    }

    public BaseOrganization() {
    }
    public BaseOrganization(String id) {
        this.id = id;
    }

    public String getParentName() {
        return parentName;
    }

    public void setParentName(String parentName) {
        this.parentName = parentName;
    }

    public String getText() {
        return cName;
    }

    public void setText(String text) {
        this.text = text;
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

    public Set<BaseRoleOrgRelation> getRoleOrgRelations() {
        return roleOrgRelations;
    }

    public void setRoleOrgRelations(Set<BaseRoleOrgRelation> roleOrgRelations) {
        this.roleOrgRelations = roleOrgRelations;
    }

    public Set<BasePersonOrgRelation> getPersonOrgRelations() {
        return personOrgRelations;
    }

    public void setPersonOrgRelations(Set<BasePersonOrgRelation> personOrgRelations) {
        this.personOrgRelations = personOrgRelations;
    }

    public String getSystemCode() {
        return systemCode;
    }

    public void setSystemCode(String systemCode) {
        this.systemCode = systemCode;
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

    public String getOrgNo() {
        return orgNo;
    }

    public void setOrgNo(String orgNo) {
        this.orgNo = orgNo;
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

    public String getParentId() {
        return parentId;
    }

    public void setParentId(String parentId) {
        this.parentId = parentId;
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

    public Integer getOrgLevel() {
        return orgLevel;
    }

    public void setOrgLevel(Integer orgLevel) {
        this.orgLevel = orgLevel;
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

    public String getManagerUnitCode() {
        return managerUnitCode;
    }

    public void setManagerUnitCode(String managerUnitCode) {
        this.managerUnitCode = managerUnitCode;
    }

    public String getManagerUnitId() {
        return managerUnitId;
    }

    public void setManagerUnitId(String managerUnitId) {
        this.managerUnitId = managerUnitId;
    }

    public String getManagerUnitName() {
        return managerUnitName;
    }

    public void setManagerUnitName(String managerUnitName) {
        this.managerUnitName = managerUnitName;
    }

    public String getCountUnitCode() {
        return countUnitCode;
    }

    public void setCountUnitCode(String countUnitCode) {
        this.countUnitCode = countUnitCode;
    }

    public String getCountUnitId() {
        return countUnitId;
    }

    public void setCountUnitId(String countUnitId) {
        this.countUnitId = countUnitId;
    }

    public String getCountUnitName() {
        return countUnitName;
    }

    public void setCountUnitName(String countUnitName) {
        this.countUnitName = countUnitName;
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
