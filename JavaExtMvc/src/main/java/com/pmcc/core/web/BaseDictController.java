package com.pmcc.core.web;

import com.pmcc.core.domain.BaseDict;
import com.pmcc.core.manager.BaseDictManager;
import com.pmcc.utils.AppUtils;
import com.pmcc.utils.DictNode;
import com.pmcc.utils.OnlineUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.util.WebUtils;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * 字典表
 * Created by LvXL on 2016/6/22.
 */
@Controller
@RequestMapping("dict")
public class BaseDictController extends BaseAjaxController<BaseDict, String> {

    @Autowired
    BaseDictManager dictManager;

    @Override
    public String beforeSave(BaseDict model, HttpServletRequest request) {

        if (id == null) {
            OnlineUser user = AppUtils.getOnlineUser(WebUtils.getSessionId(request));
            model.setCreateId(user.getUserId());
            model.setCreateName(user.getUserCName());
            model.setCreateTime(new Date());
            model.setDelFlag(0);
        }
        return null;
    }

    /**
     * treeGird
     *
     * @param parentId
     * @return
     */
    @RequestMapping(value = "/queryToTreeGrid", method = RequestMethod.GET)
    @ResponseBody
    public List<BaseDict> queryToTreeGrid(String parentId) {

        return dictManager.queryToTreeGrid(parentId);
    }

    /**
     * 查询下拉框
     *
     * @param dictType
     * @return
     */
    @RequestMapping(value = "/queryToCombo", method = RequestMethod.GET)
    @ResponseBody
    public List<BaseDict> queryToCombo(String dictType) {

        return dictManager.queryToCombo(dictType);
    }

    /**
     * 查询下拉框
     *
     * @param dictType
     * @return
     */
    @RequestMapping(value = "/queryCombo", method = RequestMethod.GET)
    @ResponseBody
    public List<DictNode> queryCombo(String dictType) {

        List<DictNode> resList = new ArrayList<DictNode>();

        List<BaseDict> dictList = dictManager.queryToCombo(dictType);

        if (dictList != null && dictList.size() > 0)  {
            for (BaseDict baseDict : dictList) {
                resList.add(new DictNode(baseDict.getId(), baseDict.getDictName(), baseDict.getDictValue(), baseDict.getDictCode(), baseDict.getDictType()));
            }
        }
        return resList;
    }

}
