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
 * 用户表
 * Created by LvXL on 2016/6/22.
 */
@Entity
@Table(name = "BASE_PERSON_INFO")
public class BasePersonInfo implements Serializable {

    @Id
    @GenericGenerator(name = "systemUUID", strategy = "uuid")
    @GeneratedValue(generator = "systemUUID")
    @Column(name = "OID")
    private String id;

    @Column(name = "USER_CNAME")
    private String userCName;//用户中文名

    @Column(name = "USER_ENAME")
    private String userEName;//用户英文名

    @Column(name = "USER_PWD")
    private String userPwd;//用户密码

    @Column(name = "STATE")
    private Integer state;//状态

    @Column(name = "USER_CARD")
    private String userCard;//身份证号

    @Column(name = "USER_SEX")
    private Integer userSex;//用户性别

    @Column(name = "USER_BIRTHDAY")
    private Date userBirthday;//出生日期

    @Column(name = "POLITICAL_AFFILIATION")
    private String politicalAffiliation;//政治面貌

    @Column(name = "DEGREE")
    private String degree;//文化程度

    @Column(name = "USER_DEGREE")
    private String userDegree;//用户职位

    @Column(name = "NATION")
    private String nation;//民族

    @Column(name = "SAFETY_CODE")
    private String safetyCode;//安全码(密码预留信息)

    @Column(name = "USER_CODE")
    private String userCode;//用户编码

    @Column(name = "USER_DESCRIPTION")
    private String userDescription;//用户描述

    @Column(name = "TELEPHONE")
    private String telephone;//用户电话

    @Column(name = "OFFICIAL")
    private Integer official;//高管标记

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

    @Column(name = "SORT_NO")
    private Integer sortNo;//排序

    @Column(name = "DEL_FLAG")
    private Integer delFlag;//删除标记

    //角色和用户
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "person")
    @org.hibernate.annotations.Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<BasePersonRoleRelation> personRoleRelations = new HashSet<BasePersonRoleRelation>();

    //用户和机构关系
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "person")
    @org.hibernate.annotations.Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<BasePersonOrgRelation> personOrgRelations = new HashSet<BasePersonOrgRelation>();

    /* ------------- */
    @Transient
    private String hidEName;//隐藏英文名
    @Transient
    private String orgId;//机构id
    @Transient
    private String orgName;//机构名称
    @Transient
    private String roles;//拥有角色


    @Transient
    private String nameAndMid;//姓名+身份证号 拼串


    public Integer getSortNo() {
        return sortNo;
    }

    public void setSortNo(Integer sortNo) {
        this.sortNo = sortNo;
    }

    public String getUserDegree() {
        return userDegree;
    }

    public void setUserDegree(String userDegree) {
        this.userDegree = userDegree;
    }

    public String getNameAndMid() {
        return userCName+userCard;
    }

    public void setNameAndMid(String nameAndMid) {
        this.nameAndMid = nameAndMid;
    }

    public BasePersonInfo() {
    }
    public BasePersonInfo(String id) {
        this.id = id;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getRoles() {
        return roles;
    }

    public void setRoles(String roles) {
        this.roles = roles;
    }

    public String getOrgId() {
        return orgId;
    }

    public void setOrgId(String orgId) {
        this.orgId = orgId;
    }

    public String getOrgName() {
        return orgName;
    }

    public void setOrgName(String orgName) {
        this.orgName = orgName;
    }

    public String getHidEName() {
        return userEName;
    }

    public void setHidEName(String hidEName) {
        this.hidEName = hidEName;
    }

    public Set<BasePersonRoleRelation> getPersonRoleRelations() {
        return personRoleRelations;
    }

    public void setPersonRoleRelations(Set<BasePersonRoleRelation> personRoleRelations) {
        this.personRoleRelations = personRoleRelations;
    }

    public Set<BasePersonOrgRelation> getPersonOrgRelations() {
        return personOrgRelations;
    }

    public void setPersonOrgRelations(Set<BasePersonOrgRelation> personOrgRelations) {
        this.personOrgRelations = personOrgRelations;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserCName() {
        return userCName;
    }

    public void setUserCName(String userCName) {
        this.userCName = userCName;
    }

    public String getUserEName() {
        return userEName;
    }

    public void setUserEName(String userEName) {
        this.userEName = userEName;
    }

    public String getUserPwd() {
        return userPwd;
    }

    public void setUserPwd(String userPwd) {
        this.userPwd = userPwd;
    }

    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }

    public String getUserCard() {
        return userCard;
    }

    public void setUserCard(String userCard) {
        this.userCard = userCard;
    }

    public Integer getUserSex() {
        return userSex;
    }

    public void setUserSex(Integer userSex) {
        this.userSex = userSex;
    }

    @JsonSerialize(using = com.pmcc.utils.CustomDateSerializer.class)
    public Date getUserBirthday() {
        return userBirthday;
    }

    public void setUserBirthday(Date userBirthday) {
        this.userBirthday = userBirthday;
    }

    public String getPoliticalAffiliation() {
        return politicalAffiliation;
    }

    public void setPoliticalAffiliation(String politicalAffiliation) {
        this.politicalAffiliation = politicalAffiliation;
    }

    public String getDegree() {
        return degree;
    }

    public void setDegree(String degree) {
        this.degree = degree;
    }

    public String getNation() {
        return nation;
    }

    public void setNation(String nation) {
        this.nation = nation;
    }

    public String getSafetyCode() {
        return safetyCode;
    }

    public void setSafetyCode(String safetyCode) {
        this.safetyCode = safetyCode;
    }

    public String getUserCode() {
        return userCode;
    }

    public void setUserCode(String userCode) {
        this.userCode = userCode;
    }

    public String getUserDescription() {
        return userDescription;
    }

    public void setUserDescription(String userDescription) {
        this.userDescription = userDescription;
    }

    public Integer getOfficial() {
        return official;
    }

    public void setOfficial(Integer official) {
        this.official = official;
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
