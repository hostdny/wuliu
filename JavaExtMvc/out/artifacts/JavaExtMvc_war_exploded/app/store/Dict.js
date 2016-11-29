/**
 * Created by LvXL on 2016/2/2.
 */
Ext.define('ExtFrame.store.Dict', {
    extend: 'Ext.data.Store',
    requires: ['ExtFrame.model.Dict'],
    model: 'ExtFrame.model.Dict',
    autoLoad: true
});