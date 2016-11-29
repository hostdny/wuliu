package com.pmcc.core.dao;

import com.pmcc.utils.BeanUtils;
import com.pmcc.utils.ReflectionUtils;
import com.pmcc.utils.ResultBean;
import org.hibernate.*;
import org.hibernate.criterion.*;
import org.hibernate.impl.CriteriaImpl;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.util.Assert;

import javax.annotation.Resource;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * 基础 dao 实现
 * Created by Admin on 2016/1/22.
 */
@Repository
public abstract class BaseDao<T, PK extends Serializable> implements BaseDaoInterface<T, PK> {

    public HibernateTemplate hibernateTemplate;

    @Resource
    public void setHibernateTemplate(HibernateTemplate hibernateTemplate) {
        this.hibernateTemplate = hibernateTemplate;
    }

    protected Class<T> entityClass;

    public BaseDao() {
//        ParameterizedType type = (ParameterizedType) this.getClass().getGenericSuperclass();
//        entityClass = (Class<T>) type.getActualTypeArguments()[0];
        this.entityClass = ReflectionUtils.getSuperClassGenricType(super.getClass());
    }

    public BaseDao(HibernateTemplate hibernateTemplate, Class<T> entityClass) {
        this.entityClass = entityClass;
    }

    public Criteria createCriteria(Criterion... criterions) {
        Criteria criteria = hibernateTemplate.getSessionFactory().getCurrentSession().createCriteria(this.entityClass);
        Criterion[] var6 = criterions;
        int var5 = criterions.length;

        for (int var4 = 0; var4 < var5; ++var4) {
            Criterion c = var6[var4];
            criteria.add(c);
        }
        return criteria;
    }

    /**
     * 保存
     *
     * @param entity
     */
    public void save(T entity) {
        try {
            hibernateTemplate.saveOrUpdate(entity);
            hibernateTemplate.flush();
        } catch (Exception var3) {
            hibernateTemplate.clear();
            hibernateTemplate.saveOrUpdate(entity);
        }
    }

    /**
     * 仅执行保存新增
     *
     * @param entity
     */
    public String onlysave(T entity) {
        String res = "";
        try {
            res = hibernateTemplate.save(entity).toString();
            hibernateTemplate.flush();
        } catch (Exception var3) {
            hibernateTemplate.clear();
            res = hibernateTemplate.save(entity).toString();
        }
        return res;
    }

    /**
     * 分页查询
     *
     * @param criteria
     * @param pageNo
     * @param pageSize
     * @return
     */
    public ResultBean pagedQuery(Criteria criteria, int pageNo, int pageSize) {
        CriteriaImpl impl = null;
        if (criteria instanceof CriteriaImpl) {
            impl = (CriteriaImpl) CriteriaImpl.class.cast(criteria);
        }

        Projection projection = impl.getProjection();

        List orderEntries;
        try {
            orderEntries = (List) BeanUtils.forceGetProperty(impl, "orderEntries");
            BeanUtils.forceSetProperty(impl, "orderEntries", new ArrayList());
        } catch (Exception var12) {
            throw new InternalError(" Runtime Exception impossibility throw ");
        }
        // 查询总页数
        Integer totalCount = this.getCount(criteria);
        criteria.setProjection(projection);
        if (projection == null) {
            criteria.setResultTransformer(CriteriaSpecification.ROOT_ENTITY);
        }

        try {
            BeanUtils.forceSetProperty(impl, "orderEntries", orderEntries);
        } catch (Exception var11) {
            throw new InternalError(" Runtime Exception impossibility throw ");
        }

        if (totalCount.intValue() < 1) {
            return new ResultBean();
        } else {
            int start = (pageNo - 1) * pageSize;
            List result = criteria.setFirstResult(start).setMaxResults(pageSize).list();
            ResultBean resultBean = new ResultBean();
            resultBean.setRows(result);
            resultBean.setTotal((long) totalCount.intValue());
            return resultBean;
        }
    }

    /**
     * 查询总页数
     *
     * @param criteria
     * @return
     */
    public Integer getCount(Criteria criteria) {
        Object result = criteria.setProjection(Projections.rowCount()).uniqueResult();
        return Integer.valueOf(((Number) result).intValue());
    }

    /**
     * 通过ID批量更新字段
     *
     * @param column
     * @param ids
     * @param val
     */
    public void updateByColumn(String column, Object val, final Object[] ids) {
        final String hql = String.format("update %s  set %s=%s where id in (:ids)", entityClass.getName(), column, val);
        hibernateTemplate.execute(new HibernateCallback() {
            public Object doInHibernate(Session session) throws HibernateException {
                Query query = session.createQuery(hql);
                query.setParameterList("ids", ids);
                return query.executeUpdate();
            }
        });
    }

    public void delete(PK id) {
        this.delete(this.get(id));
    }

    public void delete(T entity) {
        hibernateTemplate.delete(entity);
        hibernateTemplate.flush();
    }

    public T get(PK id) {
        return hibernateTemplate.get(this.entityClass, id);
    }

    public <T> T get(Class<T> entityClass, Serializable id) {
        return id == null ? null : hibernateTemplate.get(entityClass, id);
    }

    /**
     * 执行SQL:update或delete
     *
     * @param sql
     * @param parameters
     */
    public int executeSQL(final String sql, final List parameters) {
        int result = 0;
        result = (int) hibernateTemplate.execute(new HibernateCallback() {
            public Object doInHibernate(Session session) throws HibernateException {
                SQLQuery query = session.createSQLQuery(sql);

                if (parameters != null && parameters.size() > 0) {
                    for (int i = 0; i < parameters.size(); i++) {
                        query.setParameter(i, parameters.get(i));
                    }
                }
                return query.executeUpdate();
            }
        });
        return result;
    }

    /**
     * 通过SQL查询
     *
     * @param sql
     * @return
     */
    public List queryByCriteriaSQL(final String sql, Class cls) {

        Criteria criteria = hibernateTemplate.getSessionFactory().getCurrentSession().createCriteria(cls);
        criteria.add(Restrictions.sqlRestriction(sql));
        return criteria.list();
    }
    public List queryBySQL(final String sql, final List parameters) {
        List list = (List) hibernateTemplate.execute(new HibernateCallback() {
            public Object doInHibernate(Session session) throws HibernateException {
                Query query = session.createSQLQuery(sql);

                if (parameters != null && parameters.size() > 0) {
                    for (int i = 0; i < parameters.size(); i++) {
                        query.setParameter(i, parameters.get(i));
                    }
                }
                return query.list();
            }
        });

        return list;
    }

    /**
     * 通过HQL查询
     *
     * @param hql
     * @param parameters
     * @return
     */
    public List queryByHQL(final String hql, final List parameters) {
        List list = (List) hibernateTemplate.execute(new HibernateCallback() {
            public Object doInHibernate(Session session) throws HibernateException {
                Query query = session.createQuery(hql);

                if (parameters != null && parameters.size() > 0) {
                    for (int i = 0; i < parameters.size(); i++) {
                        query.setParameter(i, parameters.get(i));
                    }
                }
                return query.list();
            }
        });

        return list;
    }

    /**
     * 批量保存
     *
     * @param entitys
     * @return 返回保存的数量
     */
    public int saveAll(List<T> entitys) {

        int res = 0;
        for (int t = 0; t < entitys.size(); t++) {
            hibernateTemplate.save(entitys.get(t));
            if (t % 50 == 0) {
                hibernateTemplate.flush();
                hibernateTemplate.clear();
            }
            res++;
        }
        return res;
    }

}
