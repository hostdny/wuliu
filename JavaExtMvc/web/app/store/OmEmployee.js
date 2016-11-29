Ext.define('ExtFrame.store.OmEmployee', {
    extend: 'Ext.data.Store',
    requires: ['ExtFrame.model.OmEmployee'],
    model: 'ExtFrame.model.OmEmployee',
    autoLoad: true
});