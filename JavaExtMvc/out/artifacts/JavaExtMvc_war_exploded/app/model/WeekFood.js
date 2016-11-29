Ext.define('ExtFrame.model.WeekFood', {
    extend: 'Ext.data.Model',
    idProperty: 'pid',
    fields: [
        {name:'pid', type: 'int'},
        {name:'id', type: 'string'},
        {name:'recordId' ,type: 'string'},
        {name:'dayTime' ,type: 'date'},
        {name:'foodId' ,type: 'string'},
        {name:'foodName' ,type: 'string'},
        {name:'weekId' ,type: 'string'},
        {name:'timePoint' ,type: 'string'}
    ]
});