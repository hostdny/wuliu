Ext.define('ExtFrame.model.OmPttitle', {
    extend: 'Ext.data.Model',
    idProperty: 'pttId',
    fields: [
        {name:'pttId', type: 'string'},
        {name:'pttCode' ,type: 'string'},
        {name:'pttName' ,type: 'string'}
       ]
});