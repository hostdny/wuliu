Ext.define('ExtFrame.model.Test', {
    extend: 'Ext.data.Model',
    idProperty: 'oid',
    fields: [
        {name:'oid', type: 'string'},
        {name:'name' ,type: 'string'},
        {name:'age' ,type: 'int'},
        {name:'address' ,type: 'string'},
       {name:'createTime' ,type: 'string'}
       ]
});