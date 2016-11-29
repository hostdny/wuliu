Ext.define('ExtFrame.model.OmDuty', {
    extend: 'Ext.data.Model',
    idProperty: 'dutyId',
    fields: [
        {name:'dutyId', type: 'string'},
        {name:'cadresType' ,type: 'string'},
        {name:'dutyName' ,type: 'string'},
        {name:'dutyPy' ,type: 'string'},
        {name:'dutyRank' ,type: 'string'},
        {name:'remark' ,type: 'string'}
       ]
});