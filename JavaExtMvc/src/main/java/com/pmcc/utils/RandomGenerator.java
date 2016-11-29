package com.pmcc.soft.core.utils;

import java.util.Calendar;
import java.util.Random;

/**
 * 产生10位随机数
 * @author LvXL
 * @2014-9-23 下午5:47:53
 */
public class RandomGenerator {

	public static String getRandom(){
		
		String str = "";
		long lo = Math.round(Math.random()*1000);
		str = String.valueOf(lo);
		
		return str;
	}
	
	public static String getFixLenthString() {  
	      
	    Random rm = new Random();  
	      
	    // 获得随机数  
	    double pross = (1 + rm.nextDouble()) * Math.pow(10, 10);  
	  
	    // 将获得的获得随机数转化为字符串  
	    String fixLenthString = String.valueOf(pross);  
	  
	    // 返回固定的长度的随机数  
	    return fixLenthString.substring(2, 12);  
	}
	
	/**
	 * 按规则生成合同编号
	 * @return
	 */
	public static String getContractNo(String unit){
		
		String res = "";
		// 日期
		Calendar c = Calendar.getInstance(); 
		int y,m,d = 0;
		y = c.get(Calendar.YEAR);
		m = c.get(Calendar.MONTH) + 1;
		d = c.get(Calendar.DATE);
		String ys = String.valueOf(y);
		String ms = String.valueOf(m);
		String ds = String.valueOf(d);
		if(m < 10){
			ms = "0" + ms;
		}
		if(d < 10){
			ds = "0" + ds;
		}
		res = ys + ms + ds;
		res = unit + res;
		return res;
	}
	
	public static void main(String[] args) {
		
		System.out.println(getContractNo("dst"));
	}
	
}
