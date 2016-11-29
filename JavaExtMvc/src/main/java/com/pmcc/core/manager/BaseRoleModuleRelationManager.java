package com.pmcc.core.manager;

import com.pmcc.core.dao.BaseRoleModuleRelationDao;
import com.pmcc.core.domain.BaseRoleModuleRelation;
import com.pmcc.utils.ResultBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;

/**
 * 角色菜单关系表
 * Created by LvXL on 2016/6/23.
 */
@Transactional
@Service
public class BaseRoleModuleRelationManager extends BaseManager<BaseRoleModuleRelation, String>{

    @Autowired
    BaseRoleModuleRelationDao roleModuleRelationDao;


    @Transactional(propagation = Propagation.REQUIRED)
    public int saveRoleModule(String roleId, String moduleIds) {

        String res = "";
        // 先删除
        String sql = " DELETE FROM base_role_module_relation WHERE role_id = '" + roleId + "' ";
        roleModuleRelationDao.executeSQL(sql, null);
        // 再新增
        if(moduleIds != null && !"".equals(moduleIds)){
            String[] arr = moduleIds.split(",");
            for (String s : arr) {
                res += roleModuleRelationDao.onlysave(new BaseRoleModuleRelation(roleId, s));
            }
        }
        if(res != null && !"".equals(res)){
            return 1;
        }else{
            return 0;
        }
    }

}
