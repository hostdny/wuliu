Ext.define('ExtFrame.model.Role', {
    extend: 'Ext.data.Model',
    fields: ['oid', 'code', 'name', 'state', 'createTime']
    //,hasMany: { model: 'Permission', name: 'gePermissions', autoLoad: false },
});