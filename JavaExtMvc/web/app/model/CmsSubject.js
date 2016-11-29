Ext.define('ExtFrame.model.CmsSubject', {
    extend: 'Ext.data.Model',
    idProperty: 'oid',
    fields: ['oid', 'siteName', 'subjectName', 'createName', 'createTime']
    //manyToMany: 'Org'
    //hasMany: [{
    //    name: 'Orgs',
    //    reference: 'ExtFrame.model.Org',
    //    model: 'ExtFrame.model.Org'
    //}]
});