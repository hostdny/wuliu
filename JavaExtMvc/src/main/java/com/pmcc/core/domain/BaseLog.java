package com.pmcc.core.domain;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * 系统操作记录表
 * Created by LvXL on 2016/6/22.
 */
@Entity
@Table(name = "BASE_LOG")
public class BaseLog implements Serializable {

    @Id
    @GenericGenerator(name = "systemUUID", strategy = "uuid")
    @GeneratedValue(generator = "systemUUID")
    @Column(name = "OID")
    private String id;

    @Column(name = "OPERATE_DESC")
    private String operateDesc;//操作描述

    @Column(name = "IDS")
    private String ids;//IDS

    @Column(name = "UNIT_ID")
    private String unitId;//机构ID

    @Column(name = "UNIT_CODE")
    private String unitCode;//机构编码

    @Column(name = "UNIT_NAME")
    private String unitName;//机构名称

    @Column(name = "COMPANY_ID")
    private String companyId;//公司ID

    @Column(name = "COMPANY_NAME")
    private String companyName;//公司名称

    @Column(name = "IP")
    private String ip;//访问IP

    @Column(name = "MAC")
    private String mac;//访问MAC

    @Column(name = "IMEI")
    private String imei;//手机串号

    @Column(name = "SOURCE")
    private String source;//来源

    @Column(name = "BUSINESS_MODEL")
    private Integer businessModel;//业务模块

    @Column(name = "BUSINESS_TYPE")
    private String businessType;//业务类型

    @Column(name = "RESULT")
    private String result;//访问返回结果

    @Column(name = "PARAMETERS")
    private String parameters;//访问参数

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

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getOperateDesc() {
        return operateDesc;
    }

    public void setOperateDesc(String operateDesc) {
        this.operateDesc = operateDesc;
    }

    public String getIds() {
        return ids;
    }

    public void setIds(String ids) {
        this.ids = ids;
    }

    public String getUnitId() {
        return unitId;
    }

    public void setUnitId(String unitId) {
        this.unitId = unitId;
    }

    public String getUnitCode() {
        return unitCode;
    }

    public void setUnitCode(String unitCode) {
        this.unitCode = unitCode;
    }

    public String getUnitName() {
        return unitName;
    }

    public void setUnitName(String unitName) {
        this.unitName = unitName;
    }

    public String getCompanyId() {
        return companyId;
    }

    public void setCompanyId(String companyId) {
        this.companyId = companyId;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public String getMac() {
        return mac;
    }

    public void setMac(String mac) {
        this.mac = mac;
    }

    public String getImei() {
        return imei;
    }

    public void setImei(String imei) {
        this.imei = imei;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public Integer getBusinessModel() {
        return businessModel;
    }

    public void setBusinessModel(Integer businessModel) {
        this.businessModel = businessModel;
    }

    public String getBusinessType() {
        return businessType;
    }

    public void setBusinessType(String businessType) {
        this.businessType = businessType;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public String getParameters() {
        return parameters;
    }

    public void setParameters(String parameters) {
        this.parameters = parameters;
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
}
