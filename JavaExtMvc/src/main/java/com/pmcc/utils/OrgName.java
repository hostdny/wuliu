package com.pmcc.utils;

/**
 * 部门枚举类型
 * Created by cc on 16/7/25.
 */
public enum OrgName {
    BGS("办公室", "Bangongshi"), JCS("监察室", "Jianchashi"),
    ZJJ("侦监局", "Zhenjianju"), GSJ("公诉局", "Gongsuju"),
    FTJ("反贪局", "Fantanju"), FDJ("反渎局", "Fanduju"),
    XSZXJCJ("刑事执行检察局", "Xingshizhijingjianchaju"),
    MXK("民行科", "Minxingke"), KSK("控申科", "Kongshenke"),
    YFJ("预防局", "Yufangju"), AGZX("案管中心", "Anguanzhongxin"),
    FJDD("法警大队", "Fajingdadui"), ZZC("政治处", "Zhengzhichu"),
    JSK("技术科", "Jishuke"), JCK("计财科", "Jicaike"),
    HQFWZX("后勤服务中心", "Houqinfuwuzhongxin");
    private String name;
    private String english_Name;

    OrgName(String s, String english_Name) {
        this.name = s;
        this.english_Name = english_Name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public static OrgName getOrgEnum(String name) {
        for (OrgName on : OrgName.values()) {
            if (on.getName().equals(name)) {
                return on;
            }
        }
        return null;
    }

    public String getEnglish_Name() {
        return english_Name;
    }

    public void setEnglish_Name(String english_Name) {
        this.english_Name = english_Name;
    }
}
