Ext.define('ExtFrame.model.OmSpecialty', {
    extend: 'Ext.data.Model',
    idProperty: 'specId',
    fields: [
        {name:'specId', type: 'string'},
        {name:'specCode' ,type: 'string'},
        {name:'specName' ,type: 'string'}
    ]
});