package com.pmcc.core.manager;

import com.pmcc.core.dao.BaseRolePermissionRelationDao;
import com.pmcc.core.domain.BaseRolePermissionRelation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 角色权限关系表
 * Created by LvXL on 2016/6/22.
 */
@Transactional
@Service
public class BaseRolePermissionRelationManager extends BaseManager<BaseRolePermissionRelation, String>{

    @Autowired
    BaseRolePermissionRelationDao rolePermissionRelationDao;
}
