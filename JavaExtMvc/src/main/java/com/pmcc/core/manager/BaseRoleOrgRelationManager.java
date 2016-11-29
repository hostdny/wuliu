package com.pmcc.core.manager;

import com.pmcc.core.dao.BaseRoleOrgRelationDao;
import com.pmcc.core.domain.BaseRoleOrgRelation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 角色、机构关系
 * Created by LvXL on 2016/6/22.
 */
@Transactional
@Service
public class BaseRoleOrgRelationManager extends BaseManager<BaseRoleOrgRelation, String>{

    @Autowired
    BaseRoleOrgRelationDao roleOrgRelationDao;
}
