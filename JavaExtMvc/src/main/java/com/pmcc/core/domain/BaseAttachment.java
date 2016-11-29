package com.pmcc.core.domain;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * 系统附件
 * Created by LvXL on 2016/6/22.
 */
@Entity
@Table(name = "BASE_ATTACHMENT")
public class BaseAttachment implements Serializable {

    @Id
    @GenericGenerator(name = "systemUUID", strategy = "uuid")
    @GeneratedValue(generator = "systemUUID")
    @Column(name = "OID")
    private String id;

    @Column(name = "BUSINESS_MODEL")
    private String businessModel;//业务模块

    @Column(name = "BUSINESS_TYPE")
    private String businessType;//业务类型

    @Column(name = "BUSINESS_DATA_ID")
    private String businessData;//业务数据ID

    @Column(name = "FILE_NAME")
    private String fileName;//附件名称

    @Column(name = "FILE_URL")
    private String fileUrl;//附件地址

    @Column(name = "FILE_MATH_NAME")
    private String fileMathName;//附件转换名称

    @Column(name = "FILE_TYPE")
    private String fileType;//附件类型

    @Column(name = "FILE_SIZE")
    private Long fileSize;//附件大小

    @Column(name = "DOWNLOAD_COUNT")
    private Integer downloadCount;//下载次数

    @Column(name = "UNIT_ID")
    private String unitId;//单位

    @Column(name = "UNIT_CODE")
    private String unitCode;//单位编码

    @Column(name = "UNIT_NAME")
    private String unitName;//单位名称

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

    @Transient
    private String fileSizeShow;
    @Transient
    private String attIds;

    public BaseAttachment() {
    }
    public BaseAttachment(String id) {
        this.id = id;
    }

    public String getAttIds() {
        return attIds;
    }

    public void setAttIds(String attIds) {
        this.attIds = attIds;
    }

    public String getFileSizeShow() {
        return fileSizeShow;
    }

    public void setFileSizeShow(String fileSizeShow) {
        this.fileSizeShow = fileSizeShow;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getBusinessModel() {
        return businessModel;
    }

    public void setBusinessModel(String businessModel) {
        this.businessModel = businessModel;
    }

    public String getBusinessType() {
        return businessType;
    }

    public void setBusinessType(String businessType) {
        this.businessType = businessType;
    }

    public String getBusinessData() {
        return businessData;
    }

    public void setBusinessData(String businessData) {
        this.businessData = businessData;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getFileUrl() {
        return fileUrl;
    }

    public void setFileUrl(String fileUrl) {
        this.fileUrl = fileUrl;
    }

    public String getFileMathName() {
        return fileMathName;
    }

    public void setFileMathName(String fileMathName) {
        this.fileMathName = fileMathName;
    }

    public String getFileType() {
        return fileType;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    public Long getFileSize() {
        return fileSize;
    }

    public void setFileSize(Long fileSize) {
        this.fileSize = fileSize;
    }

    public Integer getDownloadCount() {
        return downloadCount;
    }

    public void setDownloadCount(Integer downloadCount) {
        this.downloadCount = downloadCount;
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
