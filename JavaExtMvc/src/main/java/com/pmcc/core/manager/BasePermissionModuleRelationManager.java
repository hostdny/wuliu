package com.pmcc.core.manager;

import com.pmcc.core.dao.BasePermissionModuleRelationDao;
import com.pmcc.core.domain.BasePermissionModuleRelation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 权限功能菜单关系表
 * Created by LvXL on 2016/6/22.
 */
@Transactional
@Service
public class BasePermissionModuleRelationManager extends BaseManager<BasePermissionModuleRelation, String>{

    @Autowired
    BasePermissionModuleRelationDao permissionModuleRelationDao;
}
