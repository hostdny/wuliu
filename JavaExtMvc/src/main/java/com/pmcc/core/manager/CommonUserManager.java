package com.pmcc.core.manager;

import com.pmcc.core.dao.CommonUserDao;
import com.pmcc.core.domain.CommonUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * 普通用户
 * Created by LvXL on 2016/8/10.
 */
@Transactional
@Service
public class CommonUserManager extends BaseManager<CommonUser, String> {

    @Autowired
    CommonUserDao commonUserDao;

    /**
     * 条件查询
     *
     * @param user
     * @return
     */
    public List<CommonUser> query(CommonUser user) {

        return commonUserDao.query(user);
    }

    public List<CommonUser> judgeJurisdiction (CommonUser user){
        return  commonUserDao.judgeJurisdiction(user);
    }
    /**
     * 手机端查询所有委员会人员
     * @return
     */
    public List<CommonUser> queryAll (){
        return commonUserDao.queryAll();
    }

    public CommonUser queryByEname(String ename) {
        return commonUserDao.queryByEname(ename);
    }
}
