/**
 * Created by LvXL on 2016/2/2.
 */
Ext.define('ExtFrame.model.Dict', {
    extend: 'Ext.data.Model',
    fields: ['id', 'parentId', 'dictName', 'dictCode', 'parentCode',
            'sortno', 'status', 'rank', 'createTime', 'creator']
});