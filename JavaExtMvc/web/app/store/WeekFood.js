Ext.define('ExtFrame.store.WeekFood', {
    extend: 'Ext.data.Store',
    requires: ['ExtFrame.model.WeekFood'],
    model: 'ExtFrame.model.WeekFood',
    autoLoad: true
});