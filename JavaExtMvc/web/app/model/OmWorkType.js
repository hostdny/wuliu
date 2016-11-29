Ext.define('ExtFrame.model.OmWorkType', {
    extend: 'Ext.data.Model',
    idProperty: 'worktypeId',
    fields: [
        {name:'worktypeId', type: 'string'},
        {name:'worktypeName' ,type: 'string'},
        {name:'worktypePy' ,type: 'string'},
        {name:'worktypeBigcat' ,type: 'string'},
        {name:'worktypeCatalog' ,type: 'string'}
    ]
});