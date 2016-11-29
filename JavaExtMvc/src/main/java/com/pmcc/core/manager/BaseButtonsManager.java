package com.pmcc.core.manager;

import com.pmcc.core.dao.BaseButtonsDao;
import com.pmcc.core.domain.BaseButtons;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


/**
 * 功能按钮表
 * Created by LvXL on 2016/6/22.
 */
@Transactional
@Service
public class BaseButtonsManager extends BaseManager<BaseButtons, String>{

    @Autowired
    BaseButtonsDao buttonsDao;

    /**
     *
     * @param buttons
     * @return
     */
    public List<BaseButtons> query(BaseButtons buttons){
        return buttonsDao.query(buttons);
    }
}
