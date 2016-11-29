package com.pmcc.core.manager;

import com.pmcc.core.dao.BaseDictDao;
import com.pmcc.core.domain.BaseDict;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

/**
 * 字典表
 * Created by LvXL on 2016/6/22.
 */
@Transactional
@Service
public class BaseDictManager extends BaseManager<BaseDict, String> {

    @Autowired
    BaseDictDao dictDao;

    /**
     * treeGird
     *
     * @param parentId
     * @return
     */
    public List<BaseDict> queryToTreeGrid(String parentId) {

        BaseDict dict = new BaseDict();
        dict.setParentId(parentId);
        List<BaseDict> list = dictDao.query(dict);
        for (BaseDict baseDict : list) {
            baseDict.setParentId(baseDict.getId());
            List<BaseDict> childList = dictDao.query(baseDict);
            if (childList != null && childList.size() > 0) {
                // 有子菜单
                baseDict.setExpanded(false);
                baseDict.setLeaf(false);
                baseDict.setChecked(false);
            } else {
                // 没有子菜单
                baseDict.setExpanded(true);
                baseDict.setLeaf(true);
                baseDict.setChecked(false);
            }
            // 父节点
            BaseDict pDict = dictDao.get(baseDict.getParentId());
            if(pDict != null){
                baseDict.setParentName(pDict.getDictName());
            }
        }
        return dictDao.query(dict);
    }

    /**
     * 查询下拉框
     *
     * @param dictType
     */
    public List<BaseDict> queryToCombo(String dictType) {
        return dictDao.queryToCombo(dictType);
    }

    /**
     *根据type 和value 查字典对象
     * @param dictType
     * @param value
     * @return
     */
    public BaseDict queryByValueAndCode(String dictType, String value) {
        return  dictDao.queryByValueAndCode(dictType,value);
    }
}
