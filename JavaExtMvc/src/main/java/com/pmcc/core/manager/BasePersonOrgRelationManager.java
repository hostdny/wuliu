package com.pmcc.core.manager;

import com.pmcc.core.dao.BasePersonOrgRelationDao;
import com.pmcc.core.domain.BasePersonOrgRelation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 * 用户和组织机构关系表
 * Created by LvXL on 2016/6/22.
 */
@Transactional
@Service
public class BasePersonOrgRelationManager extends BaseManager<BasePersonOrgRelation, String> {

    @Autowired
    BasePersonOrgRelationDao personOrgRelationDao;

    /**
     * 通过人员id删除人员机构关系
     *
     * @param personId
     */
    @Transactional(propagation = Propagation.REQUIRED)
    public void deleteByPersonId(String personId) {

        personOrgRelationDao.executeSQL(" DELETE FROM base_person_org_relation WHERE person_id = '" + personId + "' ", null);
    }

}
