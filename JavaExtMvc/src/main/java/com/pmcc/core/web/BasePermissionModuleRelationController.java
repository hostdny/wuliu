package com.pmcc.core.web;

import com.pmcc.core.domain.BasePermissionModuleRelation;
import com.pmcc.core.manager.BasePermissionModuleRelationManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 权限功能菜单关系表
 * Created by LvXL on 2016/6/22.
 */
@Controller
@RequestMapping("permissionModuleRelation")
public class BasePermissionModuleRelationController extends BaseAjaxController<BasePermissionModuleRelation, String>{

    @Autowired
    BasePermissionModuleRelationManager permissionModuleRelationManager;

}
