package com.pmcc.utils;

/**
 * 发文统计结果
 * 改为公用统计信息类,可复用
 * 缺陷,扩展性不高,出现新属性需继承实现,
 * 业务中极少数可能才会出现新属性
 * Created by chuchuang on 16/7/25.
 */
public class ViewSendsFilesList {

    private String year;//年份

    private int bangongshi;//办公室

    private int zhengzhichu;//政治处

    private int jishuke;//技术科

    private int jicaike;//计财科

    private int houqinfuwuzhongxin;//后勤服务中心

    private int jianchashi;//监察室

    private int zhenjianju;//侦监局

    private int gongsuju;//公诉局

    private int fantanju;//反贪局

    private int fanduju;//反渎局

    private int xingshizhijingjianchaju;//刑事执行检察局

    private int minxingke;//民行科

    private int kongshenke;//控申科

    private int yufangju;//预防局

    private int anguanzhongxin;//案管中心

    private int fajingdadui;//法警大队
    private int yuanlingdao;//院领导

    private int total;//合计

    public ViewSendsFilesList() {
    }

    public ViewSendsFilesList(String year) {
        this.year = year;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public int getBangongshi() {
        return bangongshi;
    }

    public void setBangongshi(int bangongshi) {
        this.bangongshi = bangongshi;
    }

    public int getZhengzhichu() {
        return zhengzhichu;
    }

    public void setZhengzhichu(int zhengzhichu) {
        this.zhengzhichu = zhengzhichu;
    }

    public int getJishuke() {
        return jishuke;
    }

    public void setJishuke(int jishuke) {
        this.jishuke = jishuke;
    }

    public int getJicaike() {
        return jicaike;
    }

    public void setJicaike(int jicaike) {
        this.jicaike = jicaike;
    }

    public int getHouqinfuwuzhongxin() {
        return houqinfuwuzhongxin;
    }

    public void setHouqinfuwuzhongxin(int houqinfuwuzhongxin) {
        this.houqinfuwuzhongxin = houqinfuwuzhongxin;
    }

    public int getJianchashi() {
        return jianchashi;
    }

    public void setJianchashi(int jianchashi) {
        this.jianchashi = jianchashi;
    }

    public int getZhenjianju() {
        return zhenjianju;
    }

    public void setZhenjianju(int zhenjianju) {
        this.zhenjianju = zhenjianju;
    }

    public int getGongsuju() {
        return gongsuju;
    }

    public void setGongsuju(int gongsuju) {
        this.gongsuju = gongsuju;
    }

    public int getFantanju() {
        return fantanju;
    }

    public void setFantanju(int fantanju) {
        this.fantanju = fantanju;
    }

    public int getFanduju() {
        return fanduju;
    }

    public void setFanduju(int fanduju) {
        this.fanduju = fanduju;
    }

    public int getXingshizhijingjianchaju() {
        return xingshizhijingjianchaju;
    }

    public void setXingshizhijingjianchaju(int xingshizhijingjianchaju) {
        this.xingshizhijingjianchaju = xingshizhijingjianchaju;
    }

    public int getMinxingke() {
        return minxingke;
    }

    public void setMinxingke(int minxingke) {
        this.minxingke = minxingke;
    }

    public int getKongshenke() {
        return kongshenke;
    }

    public void setKongshenke(int kongshenke) {
        this.kongshenke = kongshenke;
    }

    public int getYufangju() {
        return yufangju;
    }

    public void setYufangju(int yufangju) {
        this.yufangju = yufangju;
    }

    public int getAnguanzhongxin() {
        return anguanzhongxin;
    }

    public void setAnguanzhongxin(int anguanzhongxin) {
        this.anguanzhongxin = anguanzhongxin;
    }

    public int getFajingdadui() {
        return fajingdadui;
    }

    public void setFajingdadui(int fajingdadui) {
        this.fajingdadui = fajingdadui;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public int getYuanlingdao() {
        return yuanlingdao;
    }

    public void setYuanlingdao(int yuanlingdao) {
        this.yuanlingdao = yuanlingdao;
    }
}
