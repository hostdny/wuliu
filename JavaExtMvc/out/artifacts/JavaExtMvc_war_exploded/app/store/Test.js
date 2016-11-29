Ext.define('ExtFrame.store.Test', {
    extend: 'Ext.data.Store',
    requires: ['ExtFrame.model.Test'],
    model: 'ExtFrame.model.Test',
    autoLoad: true
});