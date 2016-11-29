package com.pmcc.utils;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class OnlineUser {

    private String sessionId;
    private String userId;
    private String userEName;
    private String userCName;
    private String depCName;
    private String depEName;
    private String depId;
    private List<String> roleIds;
    private String ip;
    private String sysCode;
    private String userDegree;
    private  String telephone;
    private  String appJpushKey;
    private  String userType;

    public OnlineUser() {
        roleIds = new ArrayList<String>();
    }

    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    public String getUserId() {
        if (userId == null)
            userId = "00000000000000000000";
        return userId;
    }

    public String getUserDegree() {
        return userDegree;
    }

    public void setUserDegree(String userDegree) {
        this.userDegree = userDegree;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getDepId() {
        return depId;
    }

    public void setDepId(String depId) {
        this.depId = depId;
    }

    public List<String> getRoleIds() {
        return roleIds;
    }

    public void setRoleIds(List<String> roleIds) {
        this.roleIds = roleIds;
    }

    public String getUserEName() {
        return userEName;
    }

    public void setUserEName(String userEName) {
        this.userEName = userEName;
    }

    public String getUserCName() {
        if (userCName == null)
            userCName = "\u7CFB\u7EDF\u7BA1\u7406\u5458";
        return userCName;
    }

    public void setUserCName(String userCName) {
        this.userCName = userCName;
    }

    public String getDepCName() {
        return depCName;
    }

    public void setDepCName(String depCName) {
        this.depCName = depCName;
    }

    public String getDepEName() {
        return depEName;
    }

    public void setDepEName(String depEName) {
        this.depEName = depEName;
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public String getSysCode() {
        return sysCode;
    }

    public void setSysCode(String sysCode) {
        this.sysCode = sysCode;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getAppJpushKey() {
        return appJpushKey;
    }

    public void setAppJpushKey(String appJpushKey) {
        this.appJpushKey = appJpushKey;
    }

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }
}

