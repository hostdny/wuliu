package com.pmcc.core.web;

import com.pmcc.core.domain.BaseButtons;
import com.pmcc.core.domain.BasePermission;
import com.pmcc.core.manager.BasePermissionManager;
import com.pmcc.utils.AppUtils;
import com.pmcc.utils.OnlineUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.util.WebUtils;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;

/**
 * 权限表
 * Created by LvXL on 2016/6/22.
 */
@Controller
@RequestMapping("permission")
public class BasePermissionController extends BaseAjaxController<BasePermission, String>{

    @Autowired
    BasePermissionManager permissionManager;

    @Override
    public String beforeSave(BasePermission model, HttpServletRequest request) {

        if (id == null) {

        }
        return null;
    }
}
