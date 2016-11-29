package com.pmcc.core.manager;

import com.pmcc.core.dao.BaseAttachmentDao;
import com.pmcc.core.domain.BaseAttachment;
import com.pmcc.utils.CommonVariables;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * 系统附件
 * Created by LvXL on 2016/6/22.
 */
@Transactional
@Service
public class BaseAttachmentManager extends BaseManager<BaseAttachment, String> {

    @Autowired
    BaseAttachmentDao attachmentDao;



    /**
     * 条件查询
     *
     * @param attachment
     * @return
     */
    public List<BaseAttachment> query(BaseAttachment attachment) {
        return attachmentDao.query(attachment);
    }

    /**
     * 根据业务数据ID 查询
     * @param businessData
     * @return
     */
    public List<BaseAttachment> queryByDataId(String businessData){
        return attachmentDao.queryByDataId(businessData);
    }

    public static void main(String[] args) {

//        File source = new File("D:\\uploadFile\\20160627安康生活.mp4");
//        Encoder encoder = new Encoder();
//        try {
//            MultimediaInfo m = encoder.getInfo(source);
//            long ls = m.getDuration();
//            System.out.println(ls);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
    }

    public void deleteByBusinessData(String id) {
        String sql="delete from BASE_ATTACHMENT where BUSINESS_DATA_ID ='"+id+"'";
         attachmentDao.executeSQL(sql,null);
    }

    /**根据业务数据ID与业务类型 业务模块查询 网页端使用 只有一条
     *
     * @param businessData
     * @return
     */
    public BaseAttachment queryByDataIdAndType(String businessData){
        List<BaseAttachment> list = attachmentDao.queryByDataIdAndType(businessData);
        if(list!=null&&list.size()>0){
            return list.get(0);
        }
        return null;
    }

    /**根据业务数据ID与业务类型 业务模块查询 网页端使用 只有一条
     *
     * @param businessData
     * @return
     */
    public List<BaseAttachment> queryByDataIdAndTypes(String businessData){
        List<BaseAttachment> list = attachmentDao.queryByDataIdAndType(businessData);
        if(list!=null&&list.size()>0){
            return list;
        }
        return null;
    }
}
