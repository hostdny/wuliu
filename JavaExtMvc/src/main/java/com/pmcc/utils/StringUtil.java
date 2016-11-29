package com.pmcc.utils;

import org.apache.commons.lang.StringUtils;

import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by Admin on 2016/1/28.
 */
public class StringUtil {

    public static final String SQL = "sql"; // sql语句
    public static final String PARAMETERS = "parameters"; // 参数
    public static final String COLUMN = "column"; // 字段
    public static final String VALUE = "value"; // 值
    public static final String PROPERTY = "property"; // 排序字段
    public static final String DIRECTION = "direction"; // 排序方式
    public static final String ASC = "asc"; // 正序
    public static final String DESC = "desc"; // 倒序

    public static List toMapValues(String inStr, String splitstr,
                                   String elesplitstr) {
        ArrayList resultlist = new ArrayList();
        if (inStr == null || inStr.equals("")) {
            return null;
        }
        if (inStr.indexOf(splitstr) == -1) {
            return null;
        }
        StringTokenizer str = new StringTokenizer(inStr.trim(), splitstr);
        while (str.hasMoreTokens()) {
            String tmpstr = str.nextToken();
            int i = tmpstr.indexOf(elesplitstr);
            if (i != -1) {
                HashMap map = new HashMap();
                map.put(tmpstr.substring(0, i), tmpstr.substring(i + 1));
                resultlist.add(map);
            }
        }
        return resultlist;
    }

    /**
     * 字符串转 List<String>
     * @param inStr
     * @param splitstr
     * @return
     */
    public static ArrayList<String> toList(String inStr, String splitstr) {

        ArrayList<String> resulist = new ArrayList<String>();
        if (inStr == null || inStr.equals("")) {
            return resulist;
        }
        if (inStr.indexOf(splitstr) == -1) {
            resulist.add(inStr);
            return resulist;
        }
        StringTokenizer str = new StringTokenizer(inStr.trim(), splitstr);
        while (str.hasMoreTokens()) {
            resulist.add(str.nextToken());
        }
        return resulist;
    }
    public static ArrayList toIntList(String inStr, String splitstr) {
        ArrayList resulist = new ArrayList();
        if (inStr == null || inStr.equals("")) {
            return resulist;
        }
        if (inStr.indexOf(splitstr) == -1) {
            if(isInteger(inStr)){
                resulist.add(Integer.valueOf(inStr));
            }
            return resulist;
        }
        String strs[]=inStr.split(splitstr);
        for(String str: strs){
            if(isInteger(str)){
                resulist.add(Integer.valueOf(str));
            }
        }
        return resulist;
    }
    public static boolean isInteger(String str) {
        try{
            Integer.valueOf(str);
            return true;
        }catch(NumberFormatException e){
            return false;
        }
    }
    /**
     * 判断字符串是否为数字
     * @param str
     * @return
     */
    public static boolean isNumber(String str) {
        for(int t=0;t<str.length();t++){
            if(!Character.isDigit(str.charAt(t))){
                return false;
            }
        }
        return true;
    }


    public static Calendar toDate(String qktdatestart) {
        Calendar calendar = Calendar.getInstance();
        String tmpkey = qktdatestart;

        int y = 0, m = 1, d = 1;
        if (tmpkey != null) {
            StringTokenizer st = new StringTokenizer(tmpkey, "-");
            if (st.hasMoreTokens()) {
                y = Integer.parseInt(st.nextToken());
            }
            if (st.hasMoreTokens()) {
                m = Integer.parseInt(st.nextToken()) - 1;
            }
            if (st.hasMoreTokens()) {
                d = Integer.parseInt(st.nextToken());
            }
            calendar.set(y, m, d, 0, 0, 0);

        }
        return calendar;
    }
    /**
     * Get float parameter from request. If specified parameter name
     * is not found, an Exception will be thrown.
     */
    public static String[] getArray(String str,String splitstr) {
        if(str==null||str.equals("")){
            return null ;
        }
        String[] result=str.split(splitstr);
        return result;
    }

    public static String generator(){
        StringBuffer now = new StringBuffer(new SimpleDateFormat("yyyyMMddHHmmssSSS").format(new Date()));
        int a = (int)(Math.random() * 90000.0D + 10000.0D);
        int b = (int)(Math.random() * 90000.0D + 10000.0D);
        int c = (int)(Math.random() * 90000.0D + 10000.0D);
        return (now.append(a).append(b).append(c)).toString();
    }
    /***
     * 自定义ID
     * @return
     */
    public static String getCustomId(){
        StringBuffer now = new StringBuffer(new SimpleDateFormat("yyyyMMddHHmmssSSS").format(new Date()));
        int a = (int)(Math.random() * 90000.0D + 10000.0D);
        return (now.append(a)).toString();
    }

    /**
     * 字符串乱码判断，并转码
     * 用getBytes(encoding)：返回字符串的一个byte数组
     * 当b[0]为  63时，应该是转码错误
     * A、不乱码的汉字字符串：
     * 1、encoding用GB2312时，每byte是负数；
     * 2、encoding用ISO8859_1时，b[i]全是63。
     * B、乱码的汉字字符串：
     * 1、encoding用ISO8859_1时，每byte也是负数；
     * 2、encoding用GB2312时，b[i]大部分是63。
     * C、英文字符串
     * 1、encoding用ISO8859_1和GB2312时，每byte都大于0；
     * <p/>
     * 总结：给定一个字符串，用getBytes("iso8859_1")
     * 1、如果b[i]有63，不用转码；  A-2
     * 2、如果b[i]全大于0，那么为英文字符串，不用转码；  B-1
     * 3、如果b[i]有小于0的，那么已经乱码，要转码。  C-1
     *
     * @param str
     * @return UTF-8格式的字符串
     */
    public static String toEncoding(String str) {
        if (str == null) return null;
        String retStr = str;
        byte b[];
        try {
            b = str.getBytes("ISO8859_1");
            for (int i = 0; i < b.length; i++) {
                byte b1 = b[i];
                if (b1 == 63) {
                    break;    //1
                } else if (b1 > 0) {
                    continue;//2
                } else if (b1 < 0) {        //不可能为0，0为字符串结束符
                    retStr = new String(b, "UTF-8");
                    break;
                }
            }
        } catch (UnsupportedEncodingException e) {
            return retStr;
        }
        return retStr;
    }

    /**
     *
     * @param theString
     * @return String
     */
    public static String unicodeToUtf8(String theString) {
        char aChar;
        int len = theString.length();
        StringBuffer outBuffer = new StringBuffer(len);
        for (int x = 0; x < len;) {
            aChar = theString.charAt(x++);
            if (aChar == '\\') {
                aChar = theString.charAt(x++);
                if (aChar == 'u') {
                    // Read the xxxx
                    int value = 0;
                    for (int i = 0; i < 4; i++) {
                        aChar = theString.charAt(x++);
                        switch (aChar) {
                            case '0':
                            case '1':
                            case '2':
                            case '3':
                            case '4':
                            case '5':
                            case '6':
                            case '7':
                            case '8':
                            case '9':
                                value = (value << 4) + aChar - '0';
                                break;
                            case 'a':
                            case 'b':
                            case 'c':
                            case 'd':
                            case 'e':
                            case 'f':
                                value = (value << 4) + 10 + aChar - 'a';
                                break;
                            case 'A':
                            case 'B':
                            case 'C':
                            case 'D':
                            case 'E':
                            case 'F':
                                value = (value << 4) + 10 + aChar - 'A';
                                break;
                            default:
                                throw new IllegalArgumentException(
                                        "Malformed   \\uxxxx   encoding.");
                        }
                    }
                    outBuffer.append((char) value);
                } else {
                    if (aChar == 't')
                        aChar = '\t';
                    else if (aChar == 'r')
                        aChar = '\r';
                    else if (aChar == 'n')
                        aChar = '\n';
                    else if (aChar == 'f')
                        aChar = '\f';
                    outBuffer.append(aChar);
                }
            } else
                outBuffer.append(aChar);
        }
        return outBuffer.toString();
    }

    public static void main(String[] args) throws UnsupportedEncodingException {
        String str = "{\"code\":1,\"msg\":\"Sucess\",\"counts\":23,\"data\":{\"cityId\":\"CH010100\",\"cityName\":\"\\u5317\\u4eac\",\"sj\":\"2016-11-12 15:00:00\",\"list\":[{\"tq1\":\"\\u6674\",\"tq2\":\"\\u973e\",\"qw1\":\"12\",\"qw2\":\"2\",\"fl1\":\"\\u5fae\\u98ce\",\"fl2\":\"\\u5fae\\u98ce\",\"fx1\":\"\\u65e0\\u6301\\u7eed\\u98ce\\u5411\",\"fx2\":\"\\u65e0\\u6301\\u7eed\\u98ce\\u5411\",\"date\":\"2016-11-12\"},{\"tq1\":\"\\u973e\",\"tq2\":\"\\u973e\",\"qw1\":\"11\",\"qw2\":\"3\",\"fl1\":\"\\u5fae\\u98ce\",\"fl2\":\"3-4\\u7ea7\",\"fx1\":\"\\u65e0\\u6301\\u7eed\\u98ce\\u5411\",\"fx2\":\"\\u5317\\u98ce\",\"date\":\"2016-11-13\"}]}}";

        System.out.println(unicodeToUtf8(str));
    }

}
