package com.pmcc.core.manager;

import com.pmcc.core.dao.BasePersonInfoDetailDao;
import com.pmcc.core.domain.BasePersonInfoDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * 用户表详细
 * Created by LvXL on 2016/6/22.
 */
@Transactional
@Service
public class BasePersonInfoDetailManager extends BaseManager<BasePersonInfoDetail, String> {

    @Autowired
    BasePersonInfoDetailDao personInfoDetailDao;

    /**
     * 条件查询
     *
     * @param detail
     * @return
     */
    public List<BasePersonInfoDetail> query(BasePersonInfoDetail detail) {
        return personInfoDetailDao.query(detail);
    }
}
