package com.pmcc.utils;

/**
 * 公共变量
 * Created by LvXL on 2016/7/13.
 */
public class CommonVariables {

    //=================================设备监控=============================
    public static final long IRS_MONITOR_TIME = 5 * 60 * 1000;      // 检察院 设备监控 时间间隔(毫秒)

    //=================================信息发布=============================
    public static final String IRS_INFORMATION_ALERT = "有新的信息发布";      // 检察院 信息发布系统 内容
    public static final String IRS_INFORMATION_TITLE = "信息发布";      // 检察院 信息发布系统 标题

    //=================================附件表业务模块=============================
    public static final String BUSINESS_MODEL_IRS = "0";      // 检察院 信息发布系统
    public static final String BUSINESS_MODEL_CAR = "1";      // 检察院 车辆管理系统
    public static final String BUSINESS_MODEL_FOODS = "2";      // 检察院 每周美食菜单管理
    public static final String BUSINESS_MODEL_USER_PHOTO = "3";      // 人员头像
    public static final String BUSINESS_MODEL_GOVERNMENT = "4";      // 廉政举报
    public static final String BUSINESS_MODEL_ATTORNEYBOX = "5";      // 检察长信箱
    public static final String BUSINESS_MODEL_SYSTEMFOLDER = "6";    //云盘
    public static final String BUSINESS_MODEL_MESSAGE = "7";         //站内信
    public static final String BUSINESS_MODEL_SUMMARIZEREPORT = "8";         //日志
    public static final String BUSINESS_MODEL_WEBPAGE = "9";//网页端上传附件
    public static final String BUSINESS_MODEL_VOUCHER = "10";//后台行贿犯罪档案查询预约凭证上传附件

    //=================================信息发布系统上传业务类型=============================
    public static final String BUSINESS_MODEL_IRS_PIC = "0";// 图片
    public static final String BUSINESS_MODEL_IRS_MV = "1";// 视频
    public static final String BUSINESS_MODEL_IRS_TEXT = "2";// 文本
    public static final String BUSINESS_MODEL_IRS_DOC = "3";// word
    public static final String BUSINESS_MODEL_IRS_EXCEL = "4";// excel
    public static final String BUSINESS_MODEL_IRS_ZIP = "5";// ZIP
    public static final String BUSINESS_MODEL_WEB_PAGE = "6";// 网页上传 其他
    public static final String BUSINESS_MODEL_CMS_PDF = "7";//后台行贿犯罪档案查询预约凭证上传附件


    //=================================车辆管理系统上传业务类型=============================
    public static final String BUSINESS_MODEL_CAR_PIC = "3";// 图片

    //=================================人员头像上传业务类型=============================
    public static final String BUSINESS_TYPE_USER_PHOTO = "0";// 图片

    //=================================信息发布系统推送类型=============================
    public static final String JPUSH_TYPE_INFORMATION_RELEASE = "0";// 信息发布
    public static final String JPUSH_TYPE_INFORMATION_MONITOR = "1";// 设备监测

    //===============================静态数组上传的文件类型===========================


    public static final String[]   BUSINESS_MODEL_IMAGE={"jpg","png","gif", "jepg"}; // 上传文件类型为图片
    public static final String[]   BUSINESS_MODEL_TXT={"txt"}; // 上传文件类型为文本
    public static final String[]   BUSINESS_MODEL_DOC={"doc","docx"}; // 上传文件类型为文档
    public static final String[]   BUSINESS_MODEL_ECL={"xsl","xslx"}; // 上传文件类型为表格
    public static final String[]   BUSINESS_MODEL_RAR={"rar","zip"}; // 上传文件类型为压缩包
    public static final String[]   BUSINESS_MODEL_VIDEO={"flv","avi","wmv", "mp4"}; // 上传文件类型为视频






}
