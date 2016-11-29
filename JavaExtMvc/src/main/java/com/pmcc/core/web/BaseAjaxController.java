package com.pmcc.core.web;

import com.pmcc.core.manager.BaseManagerInterface;
import com.pmcc.utils.*;
import net.sf.json.JSONArray;
import org.hibernate.Criteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.web.bind.ServletRequestDataBinder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.multiaction.MultiActionController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.beans.PropertyDescriptor;
import java.io.Serializable;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * 基础控制器
 * Created by Admin on 2016/1/22.
 */
public abstract class BaseAjaxController<T, PK extends Serializable> extends MultiActionController {

    public Criteria criteria;
    protected String id;
    public String ids;
    public T entity;

    protected String[] excludes = new String[]{"hibernateLazyInitializer"};

    protected final Logger logger = LoggerFactory.getLogger(this.getClass());

    public BaseAjaxController() {
    }

    @Autowired
    BaseManagerInterface<T, PK> baseManager;

    /**
     * 在所有方法执行前执行，处理要用到的数据
     *
     * @param request
     * @throws Exception
     */
    @ModelAttribute
    public void prepare(HttpServletRequest request) throws Exception {
        this.criteria = baseManager.createCriteria();
        this.id = request.getParameter("id");
        if ("".equals(id)) {
            id = null;
        }
        this.ids = request.getParameter("ids");
        if (id != null && !"".equals(id)) {
            entity = baseManager.get((PK) id);
        }
    }

    @InitBinder
    protected void initBinder(HttpServletRequest request,
                              ServletRequestDataBinder binder) throws Exception {
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");
        df.setLenient(false);
        CustomDateEditor editor = new CustomDateEditor(df, true);
        binder.registerCustomEditor(Date.class, editor);
    }

    /**
     * 保存和修改
     *
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/save", method = RequestMethod.POST)
    @ResponseBody
    public ResultBean save(T model, HttpServletRequest request) throws Exception {
        // 返回结果
        ResultBean resultBean = new ResultBean();
        resultBean.setResultCode(ResultBean.FAIL);
        //修改保存
        if (id != null && !id.equals("")) {
            // 修改:绑定参数
            this.bind(request, entity);
            this.beforeSave(entity, request);
            baseManager.save(entity);
            resultBean.setResultCode(ResultBean.SUCCESS);
            this.afterSave(1, entity, request, resultBean);
        } else {
            //新增保存
            org.apache.commons.beanutils.BeanUtils.setProperty(model, "id", null);
            this.beforeSave(model, request);
            baseManager.save(model);
            resultBean.setResultCode(ResultBean.SUCCESS);
            this.afterSave(0, model, request, resultBean);
        }
        return resultBean;
    }

    /**
     * 删除数据
     *
     * @param request
     * @throws Exception
     */
    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    @ResponseBody
    public ResultBean delete(HttpServletRequest request) throws Exception {

        ResultBean resultBean = new ResultBean();
        resultBean.setResultCode(ResultBean.SUCCESS);
        String[] str = this.beforeDelete(request);
        String[] arr;
        if (str != null && str.length > 0) {
            // 逻辑删除
            if (ids != null && !"".equals(ids)) {
                arr = ids.split(",");
                baseManager.delete(str, arr);
                resultBean.setsCount(arr.length);
                this.afterDelete(ids, request);
            }
        } else {
            // 物理删除
            if (ids != null && !"".equals(ids)) {
                arr = ids.split(",");
                for (int i = 0; i < arr.length; i++) {
                    baseManager.delete((PK) arr[i]);
                    this.afterDelete(arr[i], request);
                }
                resultBean.setsCount(arr.length);
            }
        }
        return resultBean;
    }

    /**
     * 通过ID查询数据
     *
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/loadData", method = RequestMethod.GET)
    public void loadData(HttpServletRequest request, HttpServletResponse response) throws Exception {
        Object model = baseManager.get((PK) id);
        if (model != null) {
            response.setContentType("text/html;charset=UTF-8");
            //(Object bean, Writer writer, String[] excludes, String datePattern)
            JsonUtils.write(model, response.getWriter(), this.getExcludesLoad(), this.getDatePattern());
        } else {
            response.getWriter().print("{success:true,mes:\'加载失败！\'}");
        }
    }

    public String beforeQuery(Criteria criteria, HttpServletRequest request) {
        return null;
    }


    /**
     * 查询
     *
     * @param model
     * @param page
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/pagedQueryByBean", method = RequestMethod.GET)
    public void pagedQueryByBean(T model, Page page, HttpServletRequest request, HttpServletResponse response) throws Exception {

        // 返回值
        ResultBean resultBean = new ResultBean();

        int cache = request.getParameter("cache") == null ? -1 : 1; //

        String sWhere = HttpUtil.getString(request, "swhere", ""); // 查询条件

        String sort = page.getSort(); // 排序字段
        if (sort != null && !"".equals(sort)) {
            JSONArray arr = JSONArray.fromObject(sort);
            if (arr != null) {
                List<Map<String, Object>> list = (List) arr;
                for (Map<String, Object> map : list) {
                    String property = map.get(StringUtil.PROPERTY) == null ? "" : (String) map.get(StringUtil.PROPERTY);
                    String dir = map.get(StringUtil.DIRECTION) == null ? "" : (String) map.get(StringUtil.DIRECTION);
                    //String.equalsIgnoreCase() 不区分大小写的比较两个字符串是否相等
                    if (dir != null && dir.equalsIgnoreCase(StringUtil.ASC)) {
                        // 正序
                        this.criteria.addOrder(Order.asc(property));
                    } else if (dir != null && dir.equalsIgnoreCase(StringUtil.DESC)) {
                        // 倒序
                        this.criteria.addOrder(Order.desc(property));
                    }
                }
            }
        }

        String var10 = this.beforeQuery(this.criteria, request);
        if (var10 == null) {
            Field[] field = model.getClass().getDeclaredFields();

            if (!"".equals(sWhere)) {
                // 以拼接字符串形式传递参数
                this.criteria = this.addWhere(criteria, sWhere, model);
            } else {
                // 以实体属性名方式传递参数
                for (int i = 0; i < field.length; ++i) {
                    String name = field[i].getName();
                    String tempName = null;
                    String value = null;
                    Class clazz = BeanUtils.findPropertyType(name, model.getClass());
                    if (!JsonUtils.isString(clazz) && !JsonUtils.isPrimivite(clazz) && !JsonUtils.isDate(clazz) && !JsonUtils.isTimestamp(clazz) && clazz != java.sql.Date.class) {
                        tempName = name + ".id";
                        value = String.valueOf(request.getParameter(tempName));
                    } else {
                        tempName = name;
                        value = String.valueOf(request.getParameter(name));
                    }
                    if (value != null && !"".equals(value) && !"null".equals(value)) {
                        PropertyDescriptor propertyDescriptor = new PropertyDescriptor(name, model.getClass());
                        this.criteria = this.buildWhere(this.criteria, propertyDescriptor, tempName, value);
                    }
                }
            }
            if (cache == 1) {
                this.criteria.setCacheable(true);
                this.criteria.setCacheRegion(model.getClass().getName());
            }

            resultBean = baseManager.pagedQuery(this.criteria, page.getPage(), page.getLimit());
            resultBean.setCurPage(page.getPage());
            this.afterQuery(resultBean, request);

            response.setContentType("text/html;charset=UTF-8");
            JsonUtils.write(resultBean, response.getWriter(), this.getExcludes(), this.getDatePattern());
        } else {
            response.getWriter().print("{success:true,msg:\'" + var10 + "\'}");
        }

    }

    /**
     * 执行SQL:update或delete
     *
     * @param request
     * @param response
     */
    @RequestMapping(value = "/executeSQL", method = RequestMethod.POST)
    public void executeSQL(HttpServletRequest request, HttpServletResponse response) {

        Map<String, Object> map = this.beforeExecuteSQL(request);
        if (map != null) {
            String sql = map.get(StringUtil.SQL) == null ? "" : (String) map.get(StringUtil.SQL);
            List parameters = map.get(StringUtil.PARAMETERS) == null ? null : (List) map.get(StringUtil.PARAMETERS);

            if (sql != null && !"".equals(sql)) {
                baseManager.executeSQL(sql, parameters);
            }
        }
    }


    /**
     * 通过SQL查询
     *
     * @param request
     * @param response
     * @throws Exception
     */
    @RequestMapping(value = "/queryBySQL", method = RequestMethod.GET)
    public void queryBySQL(HttpServletRequest request, HttpServletResponse response) throws Exception {

        ResultBean resultBean = new ResultBean();
        Map<String, Object> map = this.beforeExecuteSQL(request);

        if (map != null) {
            String sql = map.get(StringUtil.SQL) == null ? "" : (String) map.get(StringUtil.SQL);
            List parameters = map.get(StringUtil.PARAMETERS) == null ? null : (List) map.get(StringUtil.PARAMETERS);

            if (sql != null && !"".equals(sql)) {

                List list = baseManager.queryBySQL(sql, parameters);
                resultBean.setResultCode(ResultBean.SUCCESS);
                resultBean.setRows(list);
                response.setContentType("text/html;charset=UTF-8");
                JsonUtils.write(resultBean, response.getWriter(), this.getExcludes(), this.getDatePattern());
            } else {
                response.getWriter().print("{success:true,msg:''}");
            }
        } else {
            response.getWriter().print("{success:true,msg:''}");
        }
    }

    /**
     * 如果执行SQL，必须返回SQL语句
     *
     * @param request
     * @return sql:map.put(StringUtil.SQL, sql);参数:map.put(StringUtil.PARAMETERS, parameters)
     */
    public Map<String, Object> beforequeryBySQL(HttpServletRequest request) {
        return null;
    }

    /**
     * 如果执行SQL，必须返回SQL语句
     *
     * @param request
     * @return sql:map.put(StringUtil.SQL, sql);参数:map.put(StringUtil.PARAMETERS, parameters)
     */
    public Map<String, Object> beforeExecuteSQL(HttpServletRequest request) {
        return null;
    }

    public void afterQuery(ResultBean resultBean, HttpServletRequest request) {

    }

    /**
     * 添加条件
     *
     * @param criteria
     * @param sWhere
     * @return
     */
    public Criteria addWhere (Criteria criteria, String sWhere, T model) throws Exception {
        String[] arr = sWhere.split("<<");
        if (arr != null && arr.length > 0) {
            for (String str : arr) {
                String[] param = str.split("\\|");
                if (param != null && param.length > 0) {
                    if (param.length > 2) {
                        // 参数有值，添加条件，否则不添加，跳过
                        PropertyDescriptor propertyDescriptor = new PropertyDescriptor(param[0], model.getClass());
                        criteria = this.buildWhere(criteria, propertyDescriptor, param[0], StringUtil.toEncoding(param[2]));
                    }
                }
            }
        }
        return criteria;
    }

    /**
     * 添加条件
     *
     * @param criteria
     * @param propertyDescriptor
     * @param filterT            属性名
     * @param filterV            值
     * @return
     */
    public Criteria buildWhere(Criteria criteria, PropertyDescriptor propertyDescriptor, String filterT, String filterV) {
        try {
            Class e = propertyDescriptor.getPropertyType();
            if (JsonUtils.isString(e)) {
                criteria = criteria.add(Restrictions.like(filterT, "%" + filterV + "%"));
            } else if (JsonUtils.isInt(e)) {
                criteria = criteria.add(Restrictions.eq(filterT, new Integer(filterV)));
            } else if (JsonUtils.isShort(e)) {
                criteria = criteria.add(Restrictions.eq(filterT, new Short(filterV)));
            } else if (JsonUtils.isLong(e)) {
                criteria = criteria.add(Restrictions.eq(filterT, new Long(filterV)));
            } else if (JsonUtils.isFloat(e)) {
                criteria = criteria.add(Restrictions.eq(filterT, new Float(filterV)));
            } else if (JsonUtils.isDouble(e)) {
                criteria = criteria.add(Restrictions.eq(filterT, new Double(filterV)));
            } else if (JsonUtils.isBoolean(e)) {
                criteria = criteria.add(Restrictions.eq(filterT, new Boolean(filterV)));
            } else if (JsonUtils.isByte(e)) {
                criteria = criteria.add(Restrictions.eq(filterT, new Byte(filterV)));
            } else if (!JsonUtils.isDate(e) && !JsonUtils.isTimestamp(e) && e != java.sql.Date.class) {
                criteria = criteria.add(Restrictions.eq(filterT, filterV));
            }
        } catch (Exception var7) {
            criteria = criteria.add(Restrictions.eq(filterT, filterV));
        }

        return criteria;
    }

    /**
     * 批量保存
     *
     * @param list
     * @return
     * @throws Exception
     */
    public int saveAll(List<T> list) throws Exception {

        int res = 0;
        baseManager.saveAll(list);
        return res;
    }

    public String[] getExcludes() {
        return this.excludes;
    }

    public String[] getExcludesLoad() {
        return this.excludes;
    }

    public String getDatePattern() {
        return "yyyy-MM-dd";
    }

    public String beforeSave(T model, HttpServletRequest request) {
        return null;
    }

    public void afterSave(int flag, T model, HttpServletRequest request, ResultBean resultBean) {
    }

    public String[] beforeDelete(HttpServletRequest request) {
        return null;
    }

    public void afterDelete(String id, HttpServletRequest request) {
    }

    public String beforeLoadDate(Object model, HttpServletRequest request) {
        return null;
    }

    public void afterLoadDate() {
    }
}
