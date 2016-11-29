package com.pmcc.core.web;

import com.pmcc.core.domain.BaseAttachment;
import com.pmcc.core.manager.BaseAttachmentManager;
import com.pmcc.utils.*;
import org.hibernate.Criteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.util.WebUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * 系统附件
 * Created by LvXL on 2016/6/22.
 */
@Controller
@RequestMapping("attachment")
public class BaseAttachmentController extends BaseAjaxController<BaseAttachment, String> {

    @Autowired
    BaseAttachmentManager attachmentManager;

    /**
     * 文件上传 js插件
     *
     * @param request
     * @return
     * @throws IOException
     */
    @RequestMapping(value = "/upload", method = RequestMethod.POST)
    @ResponseBody
    public ResultBean upload(MultipartHttpServletRequest request) throws IOException {

        // 当前登录人
        OnlineUser user = AppUtils.getOnlineUser(WebUtils.getSessionId(request));
        ResultBean resultBean = new ResultBean();
        resultBean.setResultCode(ResultBean.SUCCESS);
        resultBean.setResultDesc("上传成功！");
        //业务模块
        String businessModel = HttpUtil.getString(request, "businessModel", "");
        //业务类型
        String businessType = HttpUtil.getString(request, "businessType", "");
        //业务数据ID
        String businessData = HttpUtil.getString(request, "businessData", "");

        Map<String, MultipartFile> map = request.getFileMap();

        for (Map.Entry<String, MultipartFile> entry : map.entrySet()) {
            MultipartFile file = entry.getValue();
            //原文件名称
            String originalFilename = new String(file.getOriginalFilename());
            String[] arr = originalFilename.split("\\.");
            // 文件类型
            String fileType = arr.length > 1 ? arr[arr.length - 1] : "";
            // 存放在服务器端的文件名
            String serverFileName = fileType == "" ? UUIDGenerator.getUUID() : UUIDGenerator.getUUID() + "." + fileType;
            // 创建文件夹  年-月-日
            String folder = DateUtil.DateToString(new Timestamp(new Date().getTime()), "yyyy-MM-dd");
            // 数据库存放路径：年-月-日/文件名
            String filePath = "/" + folder + "/" + serverFileName;
            // 服务器存放附件文件夹
            String path = SystemPropertyUtil.getProperty("uploadFile");
            // 附件实体
            BaseAttachment att = new BaseAttachment();
            att.setBusinessModel(businessModel);
            att.setBusinessType(businessType);
            att.setBusinessData(businessData);
            att.setFileName(originalFilename);
            att.setFileUrl(filePath);
            att.setFileMathName(serverFileName);
            att.setFileType(fileType);
            att.setFileSize(file.getSize());
            att.setDownloadCount(0);
            att.setUnitId(user.getDepId());
            att.setUnitName(user.getDepCName());
            att.setCreateId(user.getUserId());
            att.setCreateName(user.getUserCName());
            att.setCreateTime(new Date());
            att.setDelFlag(0);
            attachmentManager.save(att);
            // 附件id返回到前台
            resultBean.setResultData(att.getId());
            File targetFile = new File(path, filePath);
            if (!targetFile.exists()) {
                targetFile.mkdirs();
            }
            // 上传文件
            try {
                file.transferTo(targetFile);
            } catch (Exception e) {
                resultBean.setResultCode(ResultBean.FAIL);
                resultBean.setResultDesc("上传失败！");
                e.printStackTrace();
            }
        }
        return resultBean;
    }

    /**
     * 单文件上传
     *
     * @param file
     * @param request
     * @param response
     * @return
     * @throws IOException
     */
    @RequestMapping(value = "/uploadFile", method = RequestMethod.POST)
    @ResponseBody
    public ResultBean uploadFile(@RequestParam(value = "file", required = false) MultipartFile file,
                                 HttpServletRequest request, HttpServletResponse response) throws IOException {

        ResultBean resultBean = new ResultBean();
        resultBean.setResultCode(ResultBean.SUCCESS);
        resultBean.setResultDesc("上传成功！");
        //业务模块
        String businessModel = HttpUtil.getString(request, "businessModel", "");
        //业务类型
        String businessType = HttpUtil.getString(request, "businessType", "");
        //业务数据ID
        String businessData = HttpUtil.getString(request, "businessData", "");

        // 上传人、机构
        OnlineUser user = AppUtils.getOnlineUser(WebUtils.getSessionId(request));
        // 原文件名称
        String originalFilename = new String(file.getOriginalFilename());
        String[] arr = originalFilename.split("\\.");
        // 文件类型
        String fileType = arr.length > 1 ? arr[arr.length - 1] : "";
        // 存放在服务器端的文件名
        String serverFileName = fileType == "" ? UUIDGenerator.getUUID() : UUIDGenerator.getUUID() + "." + fileType;
        // 创建文件夹  年-月-日
        String folder = DateUtil.DateToString(new Timestamp(new Date().getTime()), "yyyy-MM-dd");
        // 数据库存放路径：年-月-日/文件名
        String filePath = "/" + folder + "/" + serverFileName;
        // 服务器存放附件文件夹
        String path = SystemPropertyUtil.getProperty("uploadFile");

        // 附件实体
        BaseAttachment att = new BaseAttachment();
        att.setBusinessModel(businessModel);
        att.setBusinessType(businessType);
        att.setBusinessData(businessData);
        att.setFileName(originalFilename);
        att.setFileUrl(filePath);
        att.setFileMathName(serverFileName);
        att.setFileType(fileType);
        att.setFileSize(file.getSize());
        att.setDownloadCount(0);
        att.setUnitId(user.getDepId());
        att.setUnitName(user.getDepCName());
        att.setCreateId(user.getUserId());
        att.setCreateName(user.getUserCName());
        att.setCreateTime(new Date());
        att.setDelFlag(0);
        attachmentManager.save(att);

        File targetFile = new File(path, filePath);
        if (!targetFile.exists()) {
            targetFile.mkdirs();
        }
        // 上传文件
        try {
            file.transferTo(targetFile);
        } catch (Exception e) {
            resultBean.setResultCode(ResultBean.FAIL);
            resultBean.setResultDesc("上传失败！");
            e.printStackTrace();
        }
        // 附件主键
        resultBean.setResultData(att.getId());
        resultBean.setObject(att);
        return resultBean;
    }

    /**
     *
     * @param request
     * @return
     */
    @RequestMapping(value = "/queryByDataId", method = RequestMethod.GET)
    @ResponseBody
    public List<BaseAttachment> queryByDataId(HttpServletRequest request) {
        String businessData = HttpUtil.getString(request, "businessData", "");
        String virtualPath = SystemPropertyUtil.getProperty("virtualPath");
        if (businessData != null && !"".equals(businessData)) {
            List<BaseAttachment> list = attachmentManager.queryByDataId(businessData);
            for (BaseAttachment baseAttachment : list) {
                baseAttachment.setFileUrl(virtualPath+baseAttachment.getFileUrl());
            }
            return list;
        }
        return new ArrayList<>();
    }

    /**
     * 条件查询附件列表
     *
     * @param attachment
     * @param request
     * @return
     */
    @RequestMapping(value = "/query", method = RequestMethod.GET)
    @ResponseBody
    public List<BaseAttachment> query(BaseAttachment attachment, HttpServletRequest request) {

        List<BaseAttachment> list = new ArrayList<BaseAttachment>();
        String businessData = HttpUtil.getString(request, "businessData", "");
        String attIds = HttpUtil.getString(request, "attIds", "");
        if("".equals(businessData) && "".equals(attIds)){
            return list;
        }
        list = attachmentManager.query(attachment);
        if(list != null && list.size() > 0){
            for (BaseAttachment baseAttachment : list) {
                String url = "/uploadFile/" + baseAttachment.getFileUrl();
                baseAttachment.setFileUrl(url);
            }
        }
        return list;
    }

    @Override
    public String beforeQuery(Criteria criteria, HttpServletRequest request) {

        return null;
    }

    @Override
    public void afterQuery(ResultBean resultBean, HttpServletRequest request) {

        List<BaseAttachment> list = resultBean.getRows();
        if (list != null && list.size() > 0) {
            for (BaseAttachment baseAttachment : list) {
                // 文件大小处理
                baseAttachment.setFileSizeShow(CommonUtils.getPrintSize(baseAttachment.getFileSize()));
                // 文件路径处理
                String virtualPath = SystemPropertyUtil.getProperty("virtualPath");
                baseAttachment.setFileUrl(virtualPath == null ? baseAttachment.getFileUrl() : virtualPath + baseAttachment.getFileUrl());
            }
        }
    }

}
