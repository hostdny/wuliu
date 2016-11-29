package com.pmcc.core.web;

import com.pmcc.core.domain.BasePersonOrgRelation;
import com.pmcc.core.manager.BasePersonOrgRelationManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 用户和组织机构关系表
 * Created by LvXL on 2016/6/22.
 */
@Controller
@RequestMapping("personOrgRelation")
public class BasePersonOrgRelationController extends BaseAjaxController<BasePersonOrgRelation, String>{

    @Autowired
    BasePersonOrgRelationManager personOrgRelationManager;
}
