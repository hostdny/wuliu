package com.pmcc.core.manager;

import com.pmcc.core.dao.BasePermissionDao;
import com.pmcc.core.domain.BasePermission;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 权限表
 * Created by LvXL on 2016/6/22.
 */
@Transactional
@Service
public class BasePermissionManager extends BaseManager<BasePermission, String>{

    @Autowired
    BasePermissionDao permissionDao;

}
