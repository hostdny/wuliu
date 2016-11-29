package com.pmcc.utils;

import cn.jpush.api.JPushClient;
import cn.jpush.api.common.resp.APIConnectionException;
import cn.jpush.api.common.resp.APIRequestException;
import cn.jpush.api.push.PushResult;
import cn.jpush.api.push.model.Platform;
import cn.jpush.api.push.model.PushPayload;
import cn.jpush.api.push.model.audience.Audience;
import cn.jpush.api.push.model.notification.Notification;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 推送
 * Created by LvXL on 2016/5/26.
 */
public class JPush {

    public static final Logger LOG = LoggerFactory.getLogger(JPush.class);

    public static final String _masterSecret = SystemPropertyUtil.getProperty("masterSecret");
    public static final String _appKey = SystemPropertyUtil.getProperty("appKey");

    public static void main(String[] args) {
        String maseterSecret="8b98b500c566acc15aa5f310";
        String appKey="bbd25f3f4c652dcbe6a5d463";
        JPushClient jpushClient = new JPushClient(maseterSecret, appKey);
        List<String> list=new ArrayList<>();
        list.add("160a3797c80ab1d4a62");
       // PushPayload payload = buildPushObject_android_all_alert_TitleWithExtras("12312", "123123123", extras);
       PushPayload payload = buildPushObject_android_registrationIds_alertWithTitle("wangbin tuisong ", "特定", list);
        try {
            PushResult result = jpushClient.sendPush(payload);
            LOG.info("Got result - " + result);

        } catch (APIConnectionException e) {
            // Connection error, should retry later
            LOG.error("Connection error, should retry later", e);

        } catch (APIRequestException e) {
            // Should review the error, and fix the request
            LOG.error("Should review the error, and fix the request", e);
            LOG.info("HTTP Status: " + e.getStatus());
            LOG.info("Error Code: " + e.getErrorCode());
            LOG.info("Error Message: " + e.getErrorMessage());
        }
        // sendAndroidMessageWithAlias("啊阿斯大法阿斯大法阿斯达发","我们今天测试一下极光推送","8b98b500c566acc15aa5f310","bbd25f3f4c652dcbe6a5d463");
    }


    public static void sendAndroidMessageWithRegistrationIds(String mesg1,String mesg2,List<String> list) {
        String masterSecret=SystemPropertyUtil.getProperty("masterSecret");
        String appKey=SystemPropertyUtil.getProperty("appKey");
        JPushClient jpushClient = new JPushClient(masterSecret, appKey);
        PushPayload payload = buildPushObject_android_registrationIds_alertWithTitle(mesg1, mesg2, list);
        try {
            PushResult result = jpushClient.sendPush(payload);
            LOG.info("Got result - " + result);

        } catch (APIConnectionException e) {
            // Connection error, should retry later
            LOG.error("Connection error, should retry later", e);

        } catch (APIRequestException e) {
            // Should review the error, and fix the request
            LOG.error("Should review the error, and fix the request", e);
            LOG.info("HTTP Status: " + e.getStatus());
            LOG.info("Error Code: " + e.getErrorCode());
            LOG.info("Error Message: " + e.getErrorMessage());
        }
        // sendAndroidMessageWithAlias("啊阿斯大法阿斯大法阿斯达发","我们今天测试一下极光推送","8b98b500c566acc15aa5f310","bbd25f3f4c652dcbe6a5d463");
    }
    /**
     * 安卓，指定名称 自定义消息
     *
     * @param alias      别名
     * @param msgContent 自定义消息
     */
    public static void sendAndroidMessageWithAlias(String alias, String msgContent) {

        JPushClient jpushClient = new JPushClient(_masterSecret, _appKey);

        try {
            jpushClient.sendAndroidMessageWithAlias("", msgContent, alias);
        } catch (APIConnectionException e) {
            e.printStackTrace();
        } catch (APIRequestException e) {
            e.printStackTrace();
        }
    }

    /**
     * 安卓，推送所有 自定义消息，监控设备用
     *
     * @param msgContent 自定义消息
     */
    public static void sendMessageAll(String msgContent) {

        JPushClient jpushClient = new JPushClient(_masterSecret, _appKey);

        try {
            jpushClient.sendMessageAll("{\"flag\":\"1\"}");
        } catch (APIConnectionException e) {
            e.printStackTrace();
        } catch (APIRequestException e) {
            e.printStackTrace();
        }
    }

    /**
     * 安卓，指定名称
     *
     * @param alias  别名
     * @param alert  内容
     * @param title  标题
     * @param extras 其他参数
     */
    public static void sendPushToAndroidWithAlias(String alias, String alert, String title, Map<String, String> extras) {

        JPushClient jpushClient = new JPushClient(_masterSecret, _appKey);

        PushPayload payload = buildPushObject_android_alias_alert_TitleWithExtras(alias, alert, title, extras);
        try {
            PushResult result = jpushClient.sendPush(payload);
            LOG.info("Got result - " + result);

        } catch (APIConnectionException e) {
            LOG.error("Connection error. Should retry later. ", e);

        } catch (APIRequestException e) {
            LOG.error("Error response from JPush server. Should review and fix it. ", e);
            LOG.info("HTTP Status: " + e.getStatus());
            LOG.info("Error Code: " + e.getErrorCode());
            LOG.info("Error Message: " + e.getErrorMessage());
            LOG.info("Msg ID: " + e.getMsgId());
        }
    }

    /**
     * 安卓推送，推送到所有人
     *
     * @param alert  内容
     * @param title  标题
     * @param extras 其他参数
     */
    public static void sendPushToAndroidAll(String alert, String title, Map<String, String> extras) {

        JPushClient jpushClient = new JPushClient(_masterSecret, _appKey);

        PushPayload payload = buildPushObject_android_all_alert_TitleWithExtras(alert, title, extras);
        try {
            PushResult result = jpushClient.sendPush(payload);
            LOG.info("Got result - " + result);

        } catch (APIConnectionException e) {
            LOG.error("Connection error. Should retry later. ", e);

        } catch (APIRequestException e) {
            LOG.error("Error response from JPush server. Should review and fix it. ", e);
            LOG.info("HTTP Status: " + e.getStatus());
            LOG.info("Error Code: " + e.getErrorCode());
            LOG.info("Error Message: " + e.getErrorMessage());
            LOG.info("Msg ID: " + e.getMsgId());
        }
    }

    /**
     * 安卓推送，指定别名
     *
     * @param alias  别名
     * @param alert  内容
     * @param title  标题
     * @param extras 其他参数
     * @return
     */
    public static PushPayload buildPushObject_android_alias_alert_TitleWithExtras(String alias, String alert, String title, Map<String, String> extras) {
        return PushPayload.newBuilder()
                .setPlatform(Platform.android())
                .setAudience(Audience.alias(alias))
                .setNotification(Notification.android(alert, title, extras))
                .build();
    }

    /**
     * 安卓推送，推送到所有人
     *
     * @param alert  内容
     * @param title  标题
     * @param extras 其他参数
     * @return
     */
    public static PushPayload buildPushObject_android_all_alert_TitleWithExtras(String alert, String title, Map<String, String> extras) {
        return PushPayload.newBuilder()
                .setPlatform(Platform.android())
                .setAudience(Audience.all())
                .setNotification(Notification.android(alert, title, extras))
                .build();
    }

    /**
     * 安卓推送，推送到指定类型标签设备
     * @return
     */
    public static PushPayload buildPushObject_android_tag_alertWithTitle(String alert,String title) {
        return PushPayload.newBuilder()
                .setPlatform(Platform.android())
                .setAudience(Audience.tag("tag1"))
                .setNotification(Notification.android(alert, title, null))
                .build();
    }

    /**
     * 安卓推送，推送到指定极光集合id设备
     * @param alert
     * @param title
     * @param registrationIds
     * @return
     */
    public static PushPayload buildPushObject_android_registrationIds_alertWithTitle(String alert,String title,List<String> registrationIds) {
        return PushPayload.newBuilder()
                .setPlatform(Platform.android())
                .setAudience(Audience.registrationId(registrationIds))
                .setNotification(Notification.android(alert, title, null))
                .build();
    }

}
