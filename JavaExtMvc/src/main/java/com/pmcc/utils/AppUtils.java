package com.pmcc.utils;

import java.util.LinkedHashMap;
import java.util.Map;
import  com.pmcc.utils.OnlineUser;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.HttpServletRequest;


public class AppUtils {

	protected final Logger logger = LoggerFactory.getLogger(getClass());

	private static Map<String, Object> onlineUsers = new LinkedHashMap<String, Object>();

	public static  Map<String, Object> getOnlineUsers() {
		return onlineUsers;
	}

	public static void addOnlineUser(String sessionId, OnlineUser online) {
		if (!onlineUsers.containsKey(sessionId)) {
			OnlineUser onlineUser = new OnlineUser();
			onlineUser.setIp(online.getIp());
			onlineUser.setDepCName(online.getDepCName());
			onlineUser.setDepEName(online.getDepEName());
			onlineUser.setDepId(online.getDepId());
			onlineUser.setRoleIds(online.getRoleIds());
			onlineUser.setSessionId(online.getSessionId());
			onlineUser.setUserId(online.getUserId());
			onlineUser.setSysCode(online.getSysCode());
			onlineUser.setUserCName(online.getUserCName());
			onlineUser.setUserEName(online.getUserEName());
			onlineUser.setUserDegree(online.getUserDegree());
			onlineUser.setTelephone(online.getTelephone());
			onlineUsers.put(sessionId, onlineUser);
		}
	}

	public static OnlineUser getOnlineUser(String sessionId) {
		return (OnlineUser) onlineUsers.get(sessionId);
	}

	public static void removeOnlineUser(String sessionId) {
		onlineUsers.remove(sessionId);
	}

	public static String getRemortIP(HttpServletRequest request) {
		if (request.getHeader("x-forwarded-for") == null) {
			return request.getRemoteAddr();
		}
		return request.getHeader("x-forwarded-for");
	}
}
