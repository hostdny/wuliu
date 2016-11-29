package com.pmcc.core.manager;

import com.pmcc.core.dao.BasePersonRoleRelationDao;
import com.pmcc.core.domain.BasePersonRoleRelation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

/**
 * 用户角色关系表
 * Created by LvXL on 2016/6/22.
 */
@Transactional
@Service
public class BasePersonRoleRelationManager extends BaseManager<BasePersonRoleRelation, String> {

    @Autowired
    BasePersonRoleRelationDao personRoleRelationDao;

    /**
     * 保存人员角色关系
     *
     * @param personIds
     * @param roleIds
     */
    @Transactional(propagation = Propagation.REQUIRED)
    public int saveRelation(String personIds, String roleIds) {
        int res = 0;
        if (personIds != null && !"".equals(personIds)) {
            String[] persons = personIds.split(",");
            if (persons.length > 0) {
                String[] roles = roleIds.split(",");
                if (roles.length > 0) {
                    for (String person : persons) {
                        // 先删除
                        personRoleRelationDao.executeSQL(" DELETE FROM BASE_PERSON_ROLE_RELATION WHERE PERSON_ID = '" + person + "' ", null);
                        for (String role : roles) {
                            // 新增
                            personRoleRelationDao.save(new BasePersonRoleRelation(person, role));
                        }
                    }
                }else{
                    res = 1;
                }
            }else{
                res = 1;
            }
        }
        return res;
    }

    /**
     * 判断此平台有无角色权限
     *
     * @param personId
     * @param systemCode
     * @return
     */
    @Transactional(readOnly = true)
    public List<BasePersonRoleRelation> queryByPersonSystemCode(String personId, String roleCode) {

        String sql = " SELECT b.* FROM base_role a, base_person_role_relation b WHERE a.OID = b.ROLE_ID AND a.CODE = ? AND b.PERSON_ID = ? ";
        List list = new ArrayList();
        list.add(roleCode);
        list.add(personId);
        return personRoleRelationDao.queryBySQL(sql, list);
    }
}
