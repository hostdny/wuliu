package com.pmcc.core.web;

import com.pmcc.core.domain.BaseButtons;
import com.pmcc.core.manager.BaseButtonsManager;
import com.pmcc.utils.AppUtils;
import com.pmcc.utils.OnlineUser;
import com.pmcc.utils.ResultBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.util.WebUtils;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.List;

/**
 * 功能按钮表
 * Created by LvXL on 2016/6/22.
 */
@Controller
@RequestMapping("buttons")
public class BaseButtonsController extends BaseAjaxController<BaseButtons, String>{

    @Autowired
    BaseButtonsManager buttonsManager;


    @Override
    public String beforeSave(BaseButtons model, HttpServletRequest request) {

        if (id == null) {
            OnlineUser user = AppUtils.getOnlineUser(WebUtils.getSessionId(request));
            model.setCreateId(user.getUserId());
            model.setCreateName(user.getUserCName());
            model.setCreateTime(new Date());
            model.setCreateUnitId(user.getDepId());
            model.setCreateUnitName(user.getDepCName());
            model.setDelFlag(0);
        }
        return null;
    }

    /**
     * 查询按钮下拉框
     * @param buttons
     * @param request
     * @return
     */
    @RequestMapping(value = "/queryToCombo", method = RequestMethod.GET)
    @ResponseBody
    public List<BaseButtons> queryToCombo(BaseButtons buttons, HttpServletRequest request){
        return buttonsManager.query(buttons);
    }

    /**
     * 判断英文名称、事件名称是否存在
     *
     * @param eName       英文名称
     * @param eventMethod 事件名称
     * @param id          主键
     * @param flag        0：判断英文名称，1：判断事件名称
     * @return
     */
    @RequestMapping(value = "/isExist", method = RequestMethod.GET)
    @ResponseBody
    public ResultBean isExist(String eName, String eventMethod, String id, String flag) {

        ResultBean resultBean = new ResultBean();
        resultBean.setResultCode(ResultBean.SUCCESS);
        BaseButtons buttons = null;
        if ("0".equals(flag)) {
            // 英文名称是否存在
            buttons = new BaseButtons();
            buttons.seteName(eName);
            List<BaseButtons> list = buttonsManager.query(buttons);
            if (list != null && list.size() > 0) {
                if (!list.get(0).getId().equals(id)) {
                    resultBean.setResultCode(ResultBean.FAIL);
                }
            }
        } else if ("1".equals(flag)) {
            // 事件名称是否存在
            buttons = new BaseButtons();
            buttons.setEventMethod(eventMethod);
            List<BaseButtons> list = buttonsManager.query(buttons);
            if (list != null && list.size() > 0) {
                if (!list.get(0).getId().equals(id)) {
                    resultBean.setResultCode(ResultBean.FAIL);
                }
            }
        }
        return resultBean;
    }

    @Override
    public String[] getExcludes() {
        return new String[]{"hibernateLazyInitializer", "permissionModuleRelations"};
    }

    @Override
    public String[] getExcludesLoad() {
        return new String[]{"hibernateLazyInitializer", "permissionModuleRelations"};
    }

}
