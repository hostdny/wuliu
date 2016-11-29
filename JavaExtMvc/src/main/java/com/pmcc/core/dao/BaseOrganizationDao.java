package com.pmcc.core.dao;

import com.pmcc.core.domain.BaseOrganization;
import com.pmcc.core.domain.BasePersonInfo;
import com.pmcc.core.domain.BasePersonOrgRelation;
import org.hibernate.SQLQuery;
import org.hibernate.criterion.CriteriaSpecification;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 组织机构表
 * Created by LvXL on 2016/6/22.
 */
@Repository
public class BaseOrganizationDao extends BaseDao<BaseOrganization, String> {

    @Autowired
    BasePersonInfoDao basePersonInfoDao;
    public List<BaseOrganization> query(BaseOrganization organization){

        DetachedCriteria criteria = DetachedCriteria.forClass(BaseOrganization.class);
        if(organization.getParentId() != null && !"".equals(organization.getParentId())){
            criteria.add(Restrictions.eq("parentId", organization.getParentId()));
        }
        if(organization.getOrgNo() != null && !"".equals(organization.getOrgNo())){
            criteria.add(Restrictions.eq("orgNo", organization.getOrgNo()));
        }
        criteria.add(Restrictions.eq("delFlag", 0));
        return (List<BaseOrganization>) hibernateTemplate.findByCriteria(criteria);
    }

    /**
     * 移动机构位置
     *
     * @param moveType
     * @return
     */
    public Boolean orgTreeMove(String id, String moveType) {
        String sql = "{CALL TreeNodeMove(?,?,?,?)}";
        SQLQuery query = hibernateTemplate.getSessionFactory().getCurrentSession().createSQLQuery(sql);
        query.setString(0, "BASE_ORGANIZATION");
        query.setString(1, "oid");
        query.setString(2, id);
        if (moveType.equals("up")) {
            query.setInteger(3, -1);
        } else {
            query.setInteger(3, 1);
        }
        int i = query.executeUpdate();
        if (i > 0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 查询组织机构树和该机构下的人
     * 李海跃
     * @param organization
     * @return
     */
    public List<BaseOrganization> queryPersonByOrg(BaseOrganization organization){
        DetachedCriteria criteria = DetachedCriteria.forClass(BaseOrganization.class);
        if(organization.getParentId() != null && !"".equals(organization.getParentId())){
            criteria.add(Restrictions.eq("parentId", organization.getParentId()));
        }
        criteria.add(Restrictions.eq("delFlag", 0));
        List<BaseOrganization> list = (List<BaseOrganization>)hibernateTemplate.findByCriteria(criteria);
        for(int i = 0 ; i<list.size();i++){
            String sql = " DEL_FLAG=0 AND OID in (SELECT PERSON_ID from base_person_org_relation where ORG_ID='"+list.get(i).getId()+"')";
            List<BasePersonInfo> personList = basePersonInfoDao.queryByCriteriaSQL(sql,BasePersonInfo.class);
            list.get(i).setPersons(personList);
        }
        return list;
    }

}
