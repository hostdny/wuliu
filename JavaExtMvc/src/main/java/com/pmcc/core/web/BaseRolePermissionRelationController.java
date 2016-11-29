package com.pmcc.core.web;

import com.pmcc.core.domain.BaseRolePermissionRelation;
import com.pmcc.core.manager.BaseRolePermissionRelationManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 角色权限关系表
 * Created by LvXL on 2016/6/22.
 */
@Controller
@RequestMapping("rolePermissionRelation")
public class BaseRolePermissionRelationController extends BaseAjaxController<BaseRolePermissionRelation, String>{

    @Autowired
    BaseRolePermissionRelationManager rolePermissionRelationManager;
}
