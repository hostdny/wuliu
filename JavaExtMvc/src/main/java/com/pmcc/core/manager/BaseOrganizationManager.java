package com.pmcc.core.manager;

import com.pmcc.core.dao.BaseOrganizationDao;
import com.pmcc.core.domain.BaseOrganization;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * 组织机构表
 * Created by LvXL on 2016/6/22.
 */
@Transactional
@Service
public class BaseOrganizationManager extends BaseManager<BaseOrganization, String> {

    @Autowired
    BaseOrganizationDao organizationDao;

    /**
     * 移动机构位置
     *
     * @param id
     * @param moveType
     * @return
     */
    @Transactional(propagation = Propagation.REQUIRED)
    public Boolean orgTreeMove(String id, String moveType) {
        return organizationDao.orgTreeMove(id, moveType);
    }

    /**
     * 查询组织机构树
     *
     * @param organization
     * @return
     */
    @Transactional(readOnly = true)
    public List<BaseOrganization> queryOrgToCombo(BaseOrganization organization) {

        List<BaseOrganization> list = organizationDao.query(organization);
        if (list != null && list.size() > 0) {
            for (BaseOrganization baseOrganization : list) {
                organization.setParentId(baseOrganization.getId());
                List<BaseOrganization> childList = organizationDao.query(organization);
                if(childList != null && childList.size() > 0){
                    baseOrganization.setExpanded(false);
                    baseOrganization.setLeaf(false);
                }else{
                    baseOrganization.setExpanded(true);
                    baseOrganization.setLeaf(true);
                }
                BaseOrganization org = organizationDao.get(baseOrganization.getParentId());
                if(org != null){
                    baseOrganization.setParentName(org.getcName());
                }
            }
        }
        return list;
    }

    /**
     * 查询组织机构根据机构号
     * @param orgno
     * @return
     */
    public List<BaseOrganization> queryByOrgNo(String orgno){
        BaseOrganization baseOrganization=new BaseOrganization();
        baseOrganization.setOrgNo(orgno);
        List<BaseOrganization> list = organizationDao.query(baseOrganization);
        return  list;
    }


    /**
     * 查询组织机构树和该机构下的人
     * 李海跃
     * @param organization
     * @return
     */
    @Transactional(readOnly = true)
    public List<BaseOrganization> queryPersonByOrg(BaseOrganization organization) {
        List<BaseOrganization> list = organizationDao.queryPersonByOrg(organization);
        return list;
    }
}
