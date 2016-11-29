package com.pmcc.utils;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

public class DateUtil {

	public static final String YYYY_MM_DD = "yyyy-MM-dd";
	public static final String YYYYMMDD = "yyyyMMdd";
	public static final String YYYY_MM_DD_HH_MM_SS = "yyyy-MM-dd HH:mm:ss";
	public final static int YEAR = 1;
	public final static int MONTH = 2;

	public static SimpleDateFormat getDateFormat(String parttern)
			throws RuntimeException {
		return new SimpleDateFormat(parttern);
	}

	/**
	 * 时间转指定格式字符串
	 * 
	 * @param date
	 * @param parttern
	 * @return
	 */
	public static String DateToString(Date date, String parttern) {
		String formatDate = null;
		if (date != null) {
			try {
				formatDate = getDateFormat(parttern).format(date);
			} catch (Exception e) {
				formatDate = new String();
			}
		}
		return formatDate;
	}

	/**
	 * 字符串转指定格式时间
	 * 
	 * @param date
	 * @param parttern
	 * @return
	 */
	public static Date StringToDate(String date, String parttern) {
		Date formatDate = null;
		if (date != null) {
			try {
				formatDate = getDateFormat(parttern).parse(date);
			} catch (Exception e) {
				formatDate = new Date();
			}
		}
		return new Date(formatDate.getTime());
	}

	/**
	 * 获取一月的开始和结束日期
	 * 
	 * @param time
	 * @return
	 */
	public static Date[] getBetweenMonthTime(Date time) {
		Date[] times = new Date[2];
		times[0] = getMonthStartTime(time);
		times[1] = getMonthEndTime(time);
		return times;
	}

	/**
	 * 获取一天的开始和结束时间
	 * 
	 * @param time
	 * @return
	 */
	public static Date[] getBetweenDayTime(Date time) {
		Date[] times = new Date[2];
		times[0] = getStartDayTime(time);
		times[1] = getEndDayTime(time);
		return times;
	}

	/**
	 * 获取一年的开始和结束时间
	 * 
	 * @param time
	 * @return
	 */
	public static Date[] getBetweenYearTime(Date time) {
		Date[] times = new Date[2];
		times[0] = getYearStartTime(time);
		times[1] = getYearEndTime(time);
		return times;
	}

	/**
	 * 获取某天的开始时间
	 * 
	 * @param time
	 * @return
	 */
	public static Date getStartDayTime(Date time) {
		// TimeZone.setDefault(TimeZone.getTimeZone("GMT+8"));
		Calendar c = Calendar.getInstance();
		c.setTime(isNullDate(time));
		c.set(Calendar.HOUR_OF_DAY, 0);
		c.set(Calendar.MINUTE, 0);
		c.set(Calendar.SECOND, 0);
		return StringToDate(
				DateToString(new Date(c.getTime().getTime()),
						YYYY_MM_DD_HH_MM_SS), YYYY_MM_DD_HH_MM_SS);
	}

	/**
	 * 获取某天的结束时间
	 * 
	 * @param time
	 * @return
	 */
	public static Date getEndDayTime(Date time) {
		Calendar c = Calendar.getInstance();
		c.setTime(isNullDate(time));
		c.set(Calendar.HOUR_OF_DAY, 23);
		c.set(Calendar.MINUTE, 59);
		c.set(Calendar.SECOND, 59);
		return StringToDate(
				DateToString(new Date(c.getTime().getTime()),
						YYYY_MM_DD_HH_MM_SS), YYYY_MM_DD_HH_MM_SS);
	}

	/**
	 * 获取某月的开始时间
	 * 
	 * @param time
	 * @return
	 */
	public static Date getMonthStartTime(Date time) {
		Calendar c = Calendar.getInstance();
		c.setTime(isNullDate(time));
		c.set(Calendar.DATE, 1);
		c.set(Calendar.HOUR_OF_DAY, 0);
		c.set(Calendar.MINUTE, 0);
		c.set(Calendar.SECOND, 0);
		return StringToDate(
				DateToString(new Date(c.getTime().getTime()),
						YYYY_MM_DD_HH_MM_SS), YYYY_MM_DD_HH_MM_SS);
	}

	/**
	 * 获取某月的结束时间
	 * 
	 * @param time
	 * @return
	 */
	public static Date getMonthEndTime(Date time) {
		Calendar c = Calendar.getInstance();
		c.setTime(isNullDate(time));
		c.set(Calendar.DATE, 1);
		c.add(Calendar.MONTH, 1);
		c.add(Calendar.DAY_OF_MONTH, -1);
		c.set(Calendar.HOUR_OF_DAY, 23);
		c.set(Calendar.MINUTE, 59);
		c.set(Calendar.SECOND, 59);
		return StringToDate(
				DateToString(new Date(c.getTime().getTime()),
						YYYY_MM_DD_HH_MM_SS), YYYY_MM_DD_HH_MM_SS);
	}

	/**
	 * 获取某年的开始时间
	 * 
	 * @param time
	 * @return
	 */
	public static Date getYearStartTime(Date time) {
		Calendar c = Calendar.getInstance();
		c.setTime(isNullDate(time));
		c.set(Calendar.MONTH, 0);
		c.set(Calendar.DATE, 1);
		c.set(Calendar.HOUR_OF_DAY, 0);
		c.set(Calendar.MINUTE, 0);
		c.set(Calendar.SECOND, 0);
		return StringToDate(
				DateToString(new Date(c.getTime().getTime()),
						YYYY_MM_DD_HH_MM_SS), YYYY_MM_DD_HH_MM_SS);
	}

	/**
	 * 获取某年的结束时间
	 * 
	 * @param time
	 * @return
	 */
	public static Date getYearEndTime(Date time) {
		Calendar c = Calendar.getInstance();
		c.setTime(isNullDate(time));
		c.set(Calendar.MONTH, 11);
		c.set(Calendar.DATE, 31);
		c.set(Calendar.HOUR_OF_DAY, 23);
		c.set(Calendar.MINUTE, 59);
		c.set(Calendar.SECOND, 59);
		return StringToDate(
				DateToString(new Date(c.getTime().getTime()),
						YYYY_MM_DD_HH_MM_SS), YYYY_MM_DD_HH_MM_SS);
	}

	private static Date isNullDate(Date time) {
		if (time == null) {
			return getCurrentTime();
		}
		return time;
	}

	/**
	 * 获取当前时间
	 * 
	 * @return
	 */
	public static Date getCurrentTime() {
		Calendar c = Calendar.getInstance();
		c.set(Calendar.HOUR_OF_DAY, 0);
		c.set(Calendar.MINUTE, 0);
		c.set(Calendar.SECOND, 0);
		return StringToDate(
				DateToString(new Date(c.getTime().getTime()),
						YYYY_MM_DD_HH_MM_SS), YYYY_MM_DD_HH_MM_SS);
	}

	/**
	 * 获取时间
	 * 
	 * @param year
	 *            数字
	 * @param month
	 *            数字
	 * @return
	 */
	public static Date getTime(int year, int month) {
		Calendar c = Calendar.getInstance();

		c.set(Calendar.YEAR, year);
		c.set(Calendar.MONTH, month - 1);
		c.set(Calendar.HOUR_OF_DAY, 0);
		c.set(Calendar.MINUTE, 0);
		c.set(Calendar.SECOND, 0);
		return StringToDate(
				DateToString(new Date(c.getTime().getTime()),
						YYYY_MM_DD_HH_MM_SS), YYYY_MM_DD_HH_MM_SS);
	}

	public static Date getTime(int year, int month, int day) {
		Calendar c = Calendar.getInstance();
		if (year != 0) {
			c.set(Calendar.YEAR, year);
		}
		if (month != 0) {
			c.set(Calendar.MONTH, month - 1);
		}
		if (day != 0) {
			c.set(Calendar.DATE, day);
		}
		c.set(Calendar.HOUR_OF_DAY, 0);
		c.set(Calendar.MINUTE, 0);
		c.set(Calendar.SECOND, 0);
		return StringToDate(
				DateToString(new Date(c.getTime().getTime()),
						YYYY_MM_DD_HH_MM_SS), YYYY_MM_DD_HH_MM_SS);
	}

	/**
	 * 设置时分秒
	 * @param hour
	 * @param minute
	 * @param second
     * @return
     */
	public static Date getTimes(int hour, int minute,int second) {
		Calendar c = Calendar.getInstance();
		Calendar cal = Calendar.getInstance();
		cal.setTime(new Date());
		c.set(Calendar.HOUR_OF_DAY, hour);
		c.set(Calendar.MINUTE, minute);
		c.set(Calendar.SECOND, second);
		return StringToDate(
				DateToString(new Date(c.getTime().getTime()),
						YYYY_MM_DD_HH_MM_SS), YYYY_MM_DD_HH_MM_SS);
	}

	/**
	 * 获取时间
	 * 
	 * @param time
	 * @return 2014-04-1 00:00:00
	 */
	public static Date getYMTime(Date time) {
		Calendar c = Calendar.getInstance();
		c.setTime(time);
		c.set(Calendar.DATE, 0);
		c.set(Calendar.HOUR_OF_DAY, 0);
		c.set(Calendar.MINUTE, 0);
		c.set(Calendar.SECOND, 0);
		return StringToDate(
				DateToString(new Date(c.getTime().getTime()),
						YYYY_MM_DD_HH_MM_SS), YYYY_MM_DD_HH_MM_SS);
	}

	/**
	 * 获取某个时间所在月的天数
	 * 
	 * @param time
	 * @return
	 */
	public static int getNumberOfDay(Date time) {
		Calendar c = Calendar.getInstance();
		c.setTime(isNullDate(time));
		c.set(Calendar.HOUR_OF_DAY, 0);
		c.set(Calendar.MINUTE, 0);
		c.set(Calendar.SECOND, 0);
		return c.getActualMaximum(Calendar.DATE);
	}

	/**
	 * 获取年
	 * 
	 * @param time
	 * @return
	 */
	public static int getYear(Date time) {
		Calendar c = Calendar.getInstance();
		c.setTime(isNullDate(time));
		return c.get(Calendar.YEAR);
	}

	/**
	 * 获取月
	 * 
	 * @param time
	 * @return
	 */
	public static int getMonth(Date time) {
		Calendar c = Calendar.getInstance();
		c.setTime(isNullDate(time));
		c.setTime(time);
		return (c.get(Calendar.MONTH) + 1);
	}

	/**
	 * 获取天
	 * @param time
	 * @return
	 */
	public static int getDay(Date time){
		Calendar c = Calendar.getInstance();
		c.setTime(isNullDate(time));
		return c.get(Calendar.DAY_OF_MONTH);
	}
	
	/**
	 * 比较两个时间的大小
	 * 
	 * @param oldDate
	 * @param newDate
	 * @return
	 */
	public static int compareYM(Date oldDate, Date newDate) {
		long res = getYMTime(newDate).getTime() - getYMTime(oldDate).getTime();
		if (res > 0) {
			// 比之前日期大
			return 1;
		} else if (res == 0) {
			// 与之前日期相等
			return 0;
		} else {
			// 与之前日期小
			return -1;
		}

	}

	public static int compareDate(Date date, Date now) {
		long res = now.getTime() - date.getTime();
		if (res > 0) {
			// 比之前日期大
			return 1;
		} else if (res == 0) {
			// 与之前日期相等
			return 0;
		} else {
			// 与之前日期小
			return -1;
		}

	}
	
	public static int compareTime(Date oldDate, Date newDate) {
		long res = newDate.getTime() - oldDate.getTime();
		if (res > 0) {
			// 比之前日期大
			return 1;
		} else if (res == 0) {
			// 与之前日期相等
			return 0;
		} else {
			// 与之前日期小
			return -1;
		}

	}

	/**
	 * 增加天数
	 * 
	 * @param time
	 *            时间
	 * @param days
	 *            天数
	 * @return
	 */
	public static Date addDay(Date time, int days) {
		Calendar c = Calendar.getInstance();
		c.setTime(time);
		c.add(Calendar.DATE, days);
		return StringToDate(
				DateToString(new Date(c.getTime().getTime()),
						YYYY_MM_DD_HH_MM_SS), YYYY_MM_DD_HH_MM_SS);

	}


	public static Date addHour(Date time, int hours) {
		Calendar c = Calendar.getInstance();
		c.setTime(time);
		c.add(Calendar.HOUR, hours);
		return StringToDate(
				DateToString(new Date(c.getTime().getTime()),
						YYYY_MM_DD_HH_MM_SS), YYYY_MM_DD_HH_MM_SS);

	}
	public static Date addMinute(Date time, int minute) {
		Calendar c = Calendar.getInstance();
		c.setTime(time);
		c.add(Calendar.MINUTE, minute);
		return StringToDate(
				DateToString(new Date(c.getTime().getTime()),
						YYYY_MM_DD_HH_MM_SS), YYYY_MM_DD_HH_MM_SS);

	}
	/**
	 * 增加月数
	 * 
	 * @param time
	 *            时间
	 * @param monthes
	 *            月
	 * @return
	 */
	public static Date addMonth(Date time, int monthes) {
		Calendar c = Calendar.getInstance();
		c.setTime(time);
		c.add(Calendar.MONTH, monthes);
		return StringToDate(
				DateToString(new Date(c.getTime().getTime()),
						YYYY_MM_DD_HH_MM_SS), YYYY_MM_DD_HH_MM_SS);

	}
	

	/**
	 * 计算天数
	 * 
	 * @return  
	 */
	public static int betweenOfDay(Date time1, Date time2) {
		Calendar to1 = new GregorianCalendar();
		to1.setTime(time1);
		Calendar to2 = new GregorianCalendar();
		to2.setTime(time2);
		int res = to2.get(Calendar.DAY_OF_YEAR) - to1.get(Calendar.DAY_OF_YEAR);
		if (res < 0) {
			res = (res * -1);
		}
		return res;

	}

	/**
	 * 判断是否工作日，周一至周五是工作日，周六周日非工作日
	 * @param time
	 * @return
	 */
	public static  boolean isWeekDay(Date time){
		Calendar c = Calendar.getInstance();
		c.setTime(time);
		int  weekday=c.get(Calendar.DAY_OF_WEEK);
		if(Calendar.MONDAY==weekday){
			return true;
		}else if(Calendar.TUESDAY==weekday){
			return true;
		}else if(Calendar.MONDAY==weekday){
			return true;
		}else if(Calendar.WEDNESDAY==weekday){
			return true;
		}else if(Calendar.THURSDAY==weekday){
			return true;
		}else if(Calendar.FEBRUARY==weekday){
			return true;
		}else{
			return false;
		}
	}

	/**
	 * 给一个时间点去处理
	 * 处理时间点
	 * @return
     */
	public static Date dealWorkTime(String time){
		time = "2016-03-12 " + time;
		Date sTime = DateUtil.StringToDate(time,"yyyy-MM-dd HH:mm:ss");
		int hours = sTime.getHours();
		int min = sTime.getMinutes();
		int miao = sTime.getSeconds();
		Date time1 = DateUtil.getTimes(hours,min,miao);
		return time1;
	}

	public static void main(String[] args) {
		
		// TODO
		Date d = addMonth(new Date(), 6);
		System.out.println("------" + DateToString(new Date(d.getTime()), YYYY_MM_DD_HH_MM_SS));
	}

}