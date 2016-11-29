package com.pmcc.core.web;

import com.pmcc.core.domain.BaseRoleOrgRelation;
import com.pmcc.core.manager.BaseRoleOrgRelationManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 角色、机构关系
 * Created by LvXL on 2016/6/22.
 */
@Controller
@RequestMapping("roleOrgRelation")
public class BaseRoleOrgRelationController extends BaseAjaxController<BaseRoleOrgRelation, String>{

    @Autowired
    BaseRoleOrgRelationManager roleOrgRelationManager;
}
