/**
 * Created by Admin on 2016/2/1.
 */
Ext.define('ExtFrame.model.MyTest', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: ['id', 'name', 'age', 'address', 'createTime', 'creator','creatorUnit']
});