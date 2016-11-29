package com.pmcc.utils;

import com.google.gson.Gson;

import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.text.DecimalFormat;
import java.util.HashMap;
import java.util.Map;

public class CommonUtils {

	public static String convertNull(String str) {
		if (str == null) {
			str = "";
		}
		return str.trim();
	}

	/**
	 * B 转为 KB、MB、GB、TB
	 *
	 * @param size 数据大小，单位为B
	 * @return
	 */
	public static String getPrintSize(long size) {

		DecimalFormat df = new DecimalFormat("#.00");
		double s = 0;
		if (size < 1024) {
			// 以B为单位
			return String.valueOf(size) + "B";
		} else {
			s = size / (float) 1024;
		}
		if (s < 1024) {
			// 以KB为单位，保留最后2位小数，
			return df.format(s) + "KB";
		} else {
			s = s / 1024;
		}
		if (s < 1024) {
			//以MB为单位，保留最后2位小数，
			return df.format(s) + "MB";
		} else {
			s = s / 1024;
		}
		if (s < 1024) {
			//以GB为单位，保留最后2位小数，
			return df.format(s) + "GB";
		} else {
			s = s / 1024;
			return df.format(s) + "TB";
		}
	}

	/**
	 * 获取推送参数
	 *
	 * @param jsonType json数据格式，通过配置文件获取
	 * @param params 传入的数据
	 * @return
	 */
	public static Map<String, String> getExtras(String jsonType, Object... params) {
		jsonType = SystemPropertyUtil.getProperty(jsonType);
		String json = String.format(jsonType, params);
		return new Gson().fromJson(json, HashMap.class);
	}

	public static void main(String[] args) {
		System.out.println(getPrintSize(2000));
	}

}
