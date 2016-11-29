/**
 * Created by LvXL on 2016/2/4.
 */
Ext.define('ExtFrame.store.DictTree', {
    extend: 'Ext.data.TreeStore',
    requires: ['ExtFrame.model.Dict'],
    model: 'ExtFrame.model.Dict',
    autoLoad: true
});