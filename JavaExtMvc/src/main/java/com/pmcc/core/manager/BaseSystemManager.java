package com.pmcc.core.manager;

import com.pmcc.core.dao.BaseSystemDao;
import com.pmcc.core.domain.BaseSystem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 系统管理表
 * Created by LvXL on 2016/6/23.
 */
@Transactional
@Service
public class BaseSystemManager extends BaseManager<BaseSystem, String>{

    @Autowired
    BaseSystemDao systemDao;
}
