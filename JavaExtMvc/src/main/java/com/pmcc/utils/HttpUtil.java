package com.pmcc.utils;


import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.util.*;

/**
 * Created by Admin on 2016/1/29.
 */
public final class HttpUtil {

    /**
     * 获取客户端IP地址.<br>
     * 支持多级反向代理
     *
     * @param request HttpServletRequest
     * @return 客户端真实IP地址
     */
    public static String getRemoteAddr(final HttpServletRequest request) {
        try {
            String remoteAddr = request.getHeader("X-Forwarded-For");
            // 如果通过多级反向代理，X-Forwarded-For的值不止一个，而是一串用逗号分隔的IP值，此时取X-Forwarded-For中第一个非unknown的有效IP字符串
            if (isEffective(remoteAddr) && (remoteAddr.indexOf(",") > -1)) {
                String[] array = remoteAddr.split(",");
                for (String element : array) {
                    if (isEffective(element)) {
                        remoteAddr = element;
                        break;
                    }
                }
            }
            if (!isEffective(remoteAddr)) {
                remoteAddr = request.getHeader("X-Real-IP");
            }
            if (!isEffective(remoteAddr)) {
                remoteAddr = request.getRemoteAddr();
            }
            return remoteAddr;
        } catch (Exception e) {
            return "";
        }
    }

    /**
     * 获取客户端源端口
     *
     * @param request
     * @return
     */
    public static Long getRemotePort(final HttpServletRequest request) {
        try {
            String port = request.getHeader("remote-port");
            try {
                return Long.parseLong(port);
            } catch (NumberFormatException ex) {
                return 0l;
            }
        } catch (Exception e) {
            return 0l;
        }
    }

    /**
     * 远程地址是否有效.
     *
     * @param remoteAddr 远程地址
     * @return true代表远程地址有效，false代表远程地址无效
     */
    private static boolean isEffective(final String remoteAddr) {
        boolean isEffective = false;
        if ((null != remoteAddr) && (!"".equals(remoteAddr.trim()))
                && (!"unknown".equalsIgnoreCase(remoteAddr.trim()))) {
            isEffective = true;
        }
        return isEffective;
    }

    public String getRemoteHost(HttpServletRequest request) {
        String ip = request.getHeader("x-forwarded-for");
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }
        return ip.equals("0:0:0:0:0:0:0:1") ? "127.0.0.1" : ip;
    }

    /***
     * 返回请求路径
     * @param request
     * @return
     */
    public static String getURL(HttpServletRequest request) {
        StringBuffer sb = request.getRequestURL();
        String queryString = request.getQueryString();
        if(queryString!=null)
            return sb.toString() + "?" + queryString;
        return sb.toString();
    }

    /**
     * 获取整型参数值
     * 如果没有发现则设置为默认值
     */
    public static int getInt(HttpServletRequest request, String paramName, int defaultValue) {
        String s = request.getParameter(paramName);
        if(s==null || s.equals(""))
            return defaultValue;
        return Integer.parseInt(s);
    }

    /**
     * Get String parameter from request. If specified parameter name
     * is not found, the default value will be returned.
     */
    public static String getString(HttpServletRequest request, String paramName, String defaultValue) {
        String str = request.getParameter(paramName);
        if(str==null || str.equals(""))
            return defaultValue.trim();
        String encoding = request.getCharacterEncoding();
        try {
            if("ISO-8859-1".equalsIgnoreCase(encoding)){
                str = new String(str.getBytes("ISO-8859-1"),"UTF-8");
            }
            str = str.trim();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return str;
    }
    /**
     * Get String parameter from request. If specified parameter name
     * is not found or empty, an Exception will be thrown.
     */
    public static String getString(HttpServletRequest request, String paramName) {
        String s = request.getParameter(paramName);
        if(s==null || s.equals(""))
            throw new NullPointerException("Null parameter: " + paramName);
        return s;
    }

    /**
     * Get Boolean parameter from request. If specified parameter name
     * is not found, an Exception will be thrown.
     */
    public static boolean getBoolean(HttpServletRequest request, String paramName) {
        String s = request.getParameter(paramName);
        return Boolean.parseBoolean(s);
    }

    /**
     * Get Boolean parameter from request. If specified parameter name
     * is not found, the default value will be returned.
     */
    public static boolean getBoolean(HttpServletRequest request, String paramName, boolean defaultValue) {
        String s = request.getParameter(paramName);
        if(s==null || s.equals(""))
            return defaultValue;
        return Boolean.parseBoolean(s);
    }

    /**
     * Get float parameter from request. If specified parameter name
     * is not found, an Exception will be thrown.
     */
    public static float getFloat(HttpServletRequest request, String paramName) {
        String s = request.getParameter(paramName);
        return Float.parseFloat(s);
    }

    /**
     * 获取浮点型参数值
     * 如果没有发现则设置为默认值
     */
    public static float getFloat(HttpServletRequest request, String paramName, float defaultValue) {
        String s = request.getParameter(paramName);
        if(s==null || s.equals(""))
            return defaultValue;
        return Float.parseFloat(s);
    }
    /**
     * Get float parameter from request. If specified parameter name
     * is not found, an Exception will be thrown.
     */
    public static double getDouble(HttpServletRequest request, String paramName) {
        String s = request.getParameter(paramName);
        return Double.parseDouble(s);
    }

    /**
     * 获取浮点型参数值
     * 如果没有发现则设置为默认值
     */
    public static double getDouble(HttpServletRequest request, String paramName, float defaultValue) {
        String s = request.getParameter(paramName);
        if(s==null || s.equals(""))
            return defaultValue;
        return Double.parseDouble(s);
    }

    /**
     * Get float parameter from request. If specified parameter name
     * is not found, an Exception will be thrown.
     */
    public static List<String> getList(HttpServletRequest request, String paramName, String splitstr) {
        String str = request.getParameter(paramName);
        if(str==null||str.equals("")){
            return new ArrayList<String>();
        }
        String encoding = request.getCharacterEncoding();
        try {
            if("ISO-8859-1".equalsIgnoreCase(encoding)){
                str = new String(str.getBytes("ISO-8859-1"),"UTF-8");
            }
            str = str.trim();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return StringUtil.toList(str, splitstr);
    }

    /**
     * Get float parameter from request. If specified parameter name
     * is not found, an Exception will be thrown.
     */
    public static String[] getArray(HttpServletRequest request, String paramName,String splitstr) {
        String str = request.getParameter(paramName);
        if(str==null||str.equals("")){
            return null ;
        }
        String[] result=str.split(splitstr);
        return result;
    }
    /**
     * 获取时间类型参数
     * @param request
     * @param paramName
     * @param defaultValue
     * @return Date类型
     */
    public static Date getDate(HttpServletRequest request, String paramName, String defaultValue){
        Date result = null;
        String str = request.getParameter(paramName);
        if (str == null || str.equals("")) {
            return null;
        } else if (str.length() == 10) {
            result = DateUtil.StringToDate(str, DateUtil.YYYY_MM_DD);
        }else if(str.length() > 10){
            result = DateUtil.StringToDate(str, DateUtil.YYYY_MM_DD_HH_MM_SS);
        }
        return result;
    }
    /***
     * 获取所有的参数
     * @param request
     * @return
     */
    public static Map<String,Object> convertModel(HttpServletRequest request){
        Map<String,Object> model = new HashMap<String,Object>();
        Enumeration<String> names=request.getParameterNames();
        while(names.hasMoreElements()){
            String key=names.nextElement();
            Object value=request.getParameter(key);
            model.put(key, value);
        }
        return model;
    }

}