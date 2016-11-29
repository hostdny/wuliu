Ext.define('ExtFrame.model.User', {
    extend: 'Ext.data.Model',
    idProperty: 'oid',
    fields: ['oid', 'name', 'userName', 'userPwd', 'state', 'createTime'],
    manyToMany: 'Org'
    //hasMany: [{
    //    name: 'Orgs',
    //    reference: 'ExtFrame.model.Org',
    //    model: 'ExtFrame.model.Org'
        
    //}]
});