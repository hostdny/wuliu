package com.pmcc.core.dao;

import com.pmcc.core.domain.BaseAttachment;
import com.pmcc.utils.CommonVariables;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 系统附件
 * Created by LvXL on 2016/6/22.
 */
@Repository
public class BaseAttachmentDao extends BaseDao<BaseAttachment, String> {

    /**
     * 条件查询
     *
     * @param attachment
     * @return
     */
    public List<BaseAttachment> query(BaseAttachment attachment) {

        DetachedCriteria criteria = DetachedCriteria.forClass(BaseAttachment.class);

        if (attachment.getBusinessModel() != null) {
            criteria.add(Restrictions.eq("businessModel", attachment.getBusinessModel()));
        }
        if (attachment.getBusinessType() != null) {
            criteria.add(Restrictions.eq("businessType", attachment.getBusinessType()));
        }
        if (attachment.getBusinessData() != null) {
            criteria.add(Restrictions.eq("businessData", attachment.getBusinessData()));
        }
        if(attachment.getAttIds() != null && !"".equals(attachment.getAttIds())){
            String[] arr = attachment.getAttIds().split(",");
            criteria.add(Restrictions.in("id", arr));
        }
        criteria.add(Restrictions.eq("delFlag", 0));
        criteria.addOrder(Order.desc("createTime"));

        return (List<BaseAttachment>) hibernateTemplate.findByCriteria(criteria);
    }
    public List<BaseAttachment> queryByDataId(String businessData){
        DetachedCriteria criteria = DetachedCriteria.forClass(BaseAttachment.class);
        criteria.add(Restrictions.eq("delFlag",0));
        criteria.add(Restrictions.eq("businessData",businessData));
        criteria.add(Restrictions.eq("businessType",CommonVariables.BUSINESS_MODEL_WEB_PAGE));
        criteria.add(Restrictions.eq("businessModel", CommonVariables.BUSINESS_MODEL_WEBPAGE));
        return (List<BaseAttachment>) this.hibernateTemplate.findByCriteria(criteria);
    }

    public List<BaseAttachment> queryByDataIdAndType(String businessData){
        DetachedCriteria criteria = DetachedCriteria.forClass(BaseAttachment.class);
        criteria.add(Restrictions.eq("delFlag",0));
        criteria.add(Restrictions.eq("businessData",businessData));
        criteria.add(Restrictions.eq("businessType",CommonVariables.BUSINESS_MODEL_CMS_PDF));
        criteria.add(Restrictions.eq("businessModel", CommonVariables.BUSINESS_MODEL_VOUCHER));
        return (List<BaseAttachment>) this.hibernateTemplate.findByCriteria(criteria);
    }



}
