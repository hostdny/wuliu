package com.pmcc.core.manager;

import com.pmcc.core.dao.BasePersonInfoDao;
import com.pmcc.core.domain.BasePersonInfo;
import com.pmcc.utils.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

/**
 * 用户表
 * Created by LvXL on 2016/6/22.
 */
@Transactional
@Service
public class BasePersonInfoManager extends BaseManager<BasePersonInfo, String> {

    @Autowired
    BasePersonInfoDao personInfoDao;

    /**
     * 查询
     *
     * @param personInfo
     * @return
     */
    @Transactional(readOnly = true)
    public List<BasePersonInfo> query(BasePersonInfo personInfo) {

        return personInfoDao.query(personInfo);
    }

    /**
     * 根据账户查询
     * @param userEname
     * @return
     */
    @Transactional(readOnly = true)
    public List<BasePersonInfo> queryByName(String userEname) {

        return personInfoDao.queryByName(userEname);
    }


    /**
     * 登录查询
     *
     * @param userEName
     * @return
     */
    @Transactional(readOnly = true)
    public BasePersonInfo queryByUserEName(String userEName) {

        BasePersonInfo personInfo = new BasePersonInfo();
        personInfo.setUserEName(userEName);
        List<BasePersonInfo> list = personInfoDao.query(personInfo);
        if (list != null && list.size() > 0) {
            return list.get(0);
        }
        return null;
    }

}
