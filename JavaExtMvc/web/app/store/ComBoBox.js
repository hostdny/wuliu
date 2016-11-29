Ext.define('ExtFrame.store.ComBoBox', {
    extend: 'Ext.data.Store',
    requires: ['ExtFrame.model.ComBoBox'],
    model: 'ExtFrame.model.ComBoBox',
    storeId: 'comBo',
    data: ['dictName'],
    autoLoad: true
})