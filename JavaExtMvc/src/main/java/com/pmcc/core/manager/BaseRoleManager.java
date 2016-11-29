package com.pmcc.core.manager;

import com.pmcc.core.dao.BasePersonRoleRelationDao;
import com.pmcc.core.dao.BaseRoleDao;
import com.pmcc.core.dao.BaseRoleModuleRelationDao;
import com.pmcc.core.domain.BaseRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * 角色表
 * Created by LvXL on 2016/6/22.
 */
@Transactional
@Service
public class BaseRoleManager extends BaseManager<BaseRole, String> {

    @Autowired
    BaseRoleDao roleDao;

    @Autowired
    BasePersonRoleRelationDao personRoleRelationDao;

    @Autowired
    BaseRoleModuleRelationDao roleModuleRelationDao;

    @Transactional(readOnly = true)
    public List<BaseRole> query(BaseRole role) {
        return roleDao.query(role);
    }

}
