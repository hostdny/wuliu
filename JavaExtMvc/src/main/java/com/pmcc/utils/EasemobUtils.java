package com.pmcc.utils;

import net.sf.json.JSONObject;
import org.apache.http.*;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;

/**
 * 环信工具类
 * Created by LvXL on 2016/8/3.
 */
public class EasemobUtils {

    public static void main(String[] args) {
       // System.out.println(updatePwd("test1117", "123123"));
        insert("weiyuan3","e10adc3949ba59abbe56e057f20f883e");
    }

    /**
     * 获取token
     *
     * @return
     */
    public static String getToken() {

        String token = "";
        String tokenUrl = SystemPropertyUtil.getProperty("easemob.token.url");
        String client_id = SystemPropertyUtil.getProperty("client_id");
        String client_secret = SystemPropertyUtil.getProperty("client_secret");

        JSONObject jsonParam = new JSONObject();
        jsonParam.put("grant_type", "client_credentials");
        jsonParam.put("client_id", client_id);
        jsonParam.put("client_secret", client_secret);

        JSONObject json = easemobPost(jsonParam, tokenUrl, null);
        token = json.get("access_token").toString();

        return token;
    }

    /**
     * 新增环信人员信息
     *
     * @param username
     * @param password
     * @return
     */
    public static JSONObject insert(String username, String password) {
        String token = getToken();
        String insertUrl = SystemPropertyUtil.getProperty("easemob.insert.url");

        JSONObject jsonParam = new JSONObject();
        jsonParam.put("username", username);
        jsonParam.put("password", password);

        return easemobPost(jsonParam, insertUrl, token);
    }

    /**
     * 修改环信人员信息
     *
     * @param username
     * @param newpassword
     * @return
     */
    public static JSONObject updatePwd(String username, String newpassword) {

        String token = getToken();
        String updateUrl = SystemPropertyUtil.getProperty("easemob.update.url");
        updateUrl = updateUrl + "/" + username + "/password";

        JSONObject jsonParam = new JSONObject();
        jsonParam.put("newpassword", newpassword);

        return easemobPost(jsonParam, updateUrl, token);
    }

    /**
     * post请求
     *
     * @param jsonParam
     * @param url
     * @return
     */
    public static JSONObject easemobPost(JSONObject jsonParam, String url, String token) {

        JSONObject json = null;
        HttpClient httpClient = new DefaultHttpClient();
        HttpPost post = new HttpPost(url);
        StringEntity entity = new StringEntity(jsonParam.toString(), "utf-8");// 解决中文乱码问题
        entity.setContentEncoding("UTF-8");
        entity.setContentType("application/json");
        post.setEntity(entity);
        post.setHeader("Content-Type", "application/json");
        if (token != null) {
            post.addHeader("Authorization", "Bearer " + token);
        }
        try {
            HttpResponse res = httpClient.execute(post);
            HttpEntity httpEntity = res.getEntity();
            String responseContent = EntityUtils.toString(httpEntity, "UTF-8");// 返回内容
            json = JSONObject.fromObject(responseContent);
        } catch (Exception e) {

        } finally {
            // 关闭连接 ,释放资源
            httpClient.getConnectionManager().shutdown();
            return json;
        }
    }

}
