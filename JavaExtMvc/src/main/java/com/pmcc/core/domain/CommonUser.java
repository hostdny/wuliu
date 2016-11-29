package com.pmcc.core.domain;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * 普通用户
 * Created by LvXL on 2016/8/10.
 */
@Entity
@Table(name = "COMMON_USER")
public class CommonUser implements Serializable {

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
    private Integer state;// 状态 0启用 1禁用

    @Column(name = "USER_CARD")
    private String userCard;//身份证号

    @Column(name = "USER_SEX")
    private Integer userSex;// 用户性别(0:男，1:女)

    @Column(name = "USER_BIRTHDAY")
    private Date userBirthday;//出生日期

    @Column(name = "POLITICAL_AFFILIATION")
    private String politicalAffiliation;//政治面貌

    @Column(name = "DEGREE")
    private String degree;//文化程度

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

    @Column(name = "USER_MAIL")
    private String userMail;//用户邮箱

    @Column(name = "USER_QQ")
    private String userQQ;//用户QQ

    @Column(name = "USERPHOTO_URL")
    private String userPhotoUrl;//头像路径

    @Column(name = "OFFICIAL")
    private Integer official;//高管标记 0人大代表1政协委员

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

    @Column(name = "USER_UNIT_NAME")
    private String userUnitName;//工作单位

    @Column(name = "STATUS")
    private Integer status;//审核状态0审核中1通过2拒绝

    @Column(name = "USER_TYPE")
    private String userType;//用户分类 0:公共用户 1:代表委员 2:矫正用户 3:司法所 4:律师 5:工作人员

    @Column(name = "USER_POSITION")
    private String userPosition;//用户职位/职称

    @Column(name = "APP_JPUSH_KEY")
    private String appJpushKey;//极光推送id

    public String getUserPosition() {
        return userPosition;
    }

    public void setUserPosition(String userPosition) {
        this.userPosition = userPosition;
    }

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getUserUnitName() {
        return userUnitName;
    }

    public void setUserUnitName(String userUnitName) {
        this.userUnitName = userUnitName;
    }

    public CommonUser() {
    }

    public CommonUser(String id) {
        this.id = id;
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

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getUserMail() {
        return userMail;
    }

    public void setUserMail(String userMail) {
        this.userMail = userMail;
    }

    public String getUserQQ() {
        return userQQ;
    }

    public void setUserQQ(String userQQ) {
        this.userQQ = userQQ;
    }

    public String getUserPhotoUrl() {
        return userPhotoUrl;
    }

    public void setUserPhotoUrl(String userPhotoUrl) {
        this.userPhotoUrl = userPhotoUrl;
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

    public String getAppJpushKey() {
        return appJpushKey;
    }

    public void setAppJpushKey(String appJpushKey) {
        this.appJpushKey = appJpushKey;
    }
}
