package com.pmcc.utils;

import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Properties;

/**
 * 读取配置文件工具类
 * by LvXL
 */
public class SystemPropertyUtil {
	private static Map configMap = new HashMap();
	private static Properties prop = new Properties();
	private final static String filePath = "systemConfig.properties";
	
	public static void initSysconfig() {
		ClassLoader cl = Thread.currentThread().getContextClassLoader();
		InputStream in = null;
		in = cl.getResourceAsStream(filePath);
		try {
			prop.load(in);
			
			Iterator it = prop.keySet().iterator();
			while (it.hasNext()) {
				String key = (String) it.next();
				
				configMap.put(key, prop.get(key));
			}
			in.close();
		} catch (IOException e) {
			e.printStackTrace();
		} 
	}
	public static Map getSysConfig() {
		initSysconfig();
		return configMap;
	}
	
	public static String getAdmin() {
		initSysconfig();
		String admin = prop.getProperty("system.admin").trim();
		if("".equals(admin)){
			return "admin";
		}else{
			return admin;
		}
	}
	
	public static String getProjectManager(){
		initSysconfig();
		String admin = prop.getProperty("project.roleid").trim();
		return admin;
	}

	public static String getExportExcelDir() {
		initSysconfig();
		return prop.getProperty("system.attachFile.exportExcel").trim();
	}
	
	public static String getProperty(String property) {
		initSysconfig();
		return prop.getProperty(property).trim();
	}	
	
	public static void main(String[] args) throws UnsupportedEncodingException {
		String str = SystemPropertyUtil.getProperty("window.location");
		System.out.println(str);
//		System.out.println(SystemPropertyUtil.getExportExcelDir());
	}

}
