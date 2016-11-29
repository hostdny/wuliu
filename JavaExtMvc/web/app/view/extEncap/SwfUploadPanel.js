Ext.define('ExtFrame.view.extEncap.SwfUploadPanel', {
    extend: 'Ext.window.Window',
    alias: 'widget.swfUploadPanel',
    alternateClassName: 'Ext.form.SwfUploadPanel',
    uploadUrl: 'uploadFiles.action',//文件上传到服务器上的URL
    postParams: {},//随文件上传提交的参数
    flashUrl: 'swfupload.swf',//flash文件地址
    filePostName: 'uploadFile.upload',
    fileSize: '5000 MB',//允许上传文件的最大的大小
    fileTypes: '*.*',//允许上传文件的类型
    fileTypesDescription: '所有文件',//允许上传文件类型说明
    allowNumber: 0,//0表示不限制文件个数
    btnOKHandler: Ext.emptyFn,//点击确定按钮的动作
    btnCancelHandler: Ext.emptyFn,//点击取消按钮的动作
    title: '文件上传',
    iconCls: '',
    layout: 'fit',
    width : Ext.getBody().getWidth()/2,
    height : Ext.getBody().getHeight()/2,
    progressInfo: {
        filesTotal: 0,//总文件数量
        filesUploaded: 0,//上传了的文件的数量
        bytesTotal: 0,//总文件大小
        bytesUploaded: 0,//上传了的文件大小
        currentCompleteBytes: 0,//当前已完成文件的大小
        lastBytes: 0,
        lastElapsed: 1,
        lastUpdate: null,
        timeElapsed: 1
    },
    initComponent: function () {
        this.callParent();

        this.store = new Ext.data.SimpleStore({
            fields: ['fileId', 'fileName', 'fileType', 'fileSize', 'fileState', 'fileSrc'],
            pruneModifiedRecords: true,
            listeners: {
                scope: this,
                'add': this.doControlBtns,
                'remove': this.doControlBtns
            }
        });
        //数据表顶部工具条
        this.topBar = new Ext.Toolbar({
            defaults: {
                scope: this
            }
        });

        //数据表底部工具条
        this.bottomBar = new Ext.Toolbar({
            defaultType : 'displayfield',
            items : ['时间:',{
                ref : 'time',
                value : '00:00:00'
            },'-','速度:',{
                ref : 'speed',
                value : '0 KB/s'
            },'-','状态:',{
                ref : 'state',
                value : '0 KB / 0KB'
            }]
        });
        this.cm = new Ext.grid.ColumnModel({
            defaults: {
                sortable: true
            },
            columns: [new Ext.grid.RowNumberer({width: 22}), {
                header: '文件名称',
                dataIndex: 'fileName',
                width: 150
            }, {
                header: '文件类型',
                dataIndex: 'fileType',
                width: 60
            }, {
                header: '文件大小',
                dataIndex: 'fileSize',
                width: 80,
                renderer: this.renderFileSize
            }, {
                header: '进度',
                dataIndex: '',
                renderer: this.renderProgressBar
            }, {
                header: '状态',
                dataIndex: 'fileState',
                width: 70,
                renderer: this.renderFileState
            }, {
                header: '',
                dataIndex: '',
                width: 30,
                renderer: function (value, metadata, record) {
                    switch (record.data.fileState) {
                        case SWFUpload.FILE_STATUS.COMPLETE :
                            return '<div class="oa-good" style="width:20px;height:20px;">&nbsp;</div>';
                        case SWFUpload.FILE_STATUS.IN_PROGRESS :
                            return '<div class="oa-loading" style="width:16px;height:16px;">&nbsp;</div>';
                        case SWFUpload.FILE_STATUS.CANCELLED :
                            return '<div class="oa-no" style="width:14px;height:14px;">&nbsp;</div>';
                        case SWFUpload.FILE_STATUS.ERROR :
                            return '<div class="oa-bad" style="width:16px;height:16px;">&nbsp;</div>';
                    }
                }
            }]
        });

        //数据表
        this.grid = new Ext.grid.GridPanel({
            tbar: this.topBar,
            bbar : this.bottomBar,
            cm: this.cm,
            store: this.store,
            enableColumnHide: false,
            viewConfig: {
                forceFit: true,
                emptyText: '<div style="text-align:center; padding:20px">请选择要上传的文件</div>'
            },
            listeners: {
                scope: this,
                'render': this.initSwfSettings
            }
        });

        this.add(this.grid);
        //if (Ext.isEmpty(this.buttons)) {
        //    this.addButton({text: '确定', scope: this}, this.doConfirmUploadPanel);
        //    this.addButton({text: '取消', scope: this}, this.doCloseUploadPanel);
        //}

        this.on('show', this.initProgressInfo, this);
    },

    //重写window的doClose方法
    doClose: function () {
        if (!this.isDestroyed) {
            if (this.fireEvent('beforedestroy', this) !== false) {
                this.destroying = true;
                if (this.rendered) {
                    this.hide();
                    //this.clearAnchor();
                    this.grid.getView().destroy();
                    Ext.destroy(this.focusEl);
                    Ext.destroy(this.resizer);
                    Ext.destroy(this.dd);
                    Ext.destroy(this.proxy);
                    Ext.destroy(this.mask);
                }

                if (this.ownerCt && this.ownerCt.remove) {
                    this.ownerCt.remove(this, false);
                }
                if (this.rendered) {
                    this.el.remove();
                    if (this.actionMode == 'container' || this.removeMode == 'container') {
                        this.container.remove();
                    }
                }
                // Stop any buffered tasks
                if (this.focusTask && this.focusTask.cancel) {
                    this.focusTask.cancel();
                }
                this.onDestroy();
                Ext.ComponentMgr.unregister(this);
                this.fireEvent('destroy', this);
                this.purgeListeners();
                this.destroying = false;
                this.isDestroyed = true;
            }
        }
        return;
        Ext.get(this.id).remove();
        return;
        Ext.getCmp(this.id).close();
    },

    //第一步:初始化flash上传组件设置
    initSwfSettings: function () {
        this.topBar.add({
            text: '添加',
            ref: 'addFile',
            iconCls: 'file-add'
        }, '-', {
            text: '删除',
            ref: 'removeFile',
            iconCls: 'OperaionDelete',
            handler: this.doRemove
        }, '-', {
            text: '上传',
            ref: 'uploadFile',
            state: 'upload',
            iconCls: 'OperaionArrowUp',
            disabled: true,
            handler: this.doUpload
        });
        this.topBar.doLayout();
        var grid = this.grid;
        alert(grid);
        debugger;
        var bar = grid.getTopToolbar();
        var em = this.grid.getTopToolbar().items.first().el.child('em');
        var placeHolderId = Ext.id();
        em.setStyle({
            position: 'relative',
            display: 'block'
        });
        em.createChild({
            tag: 'div',
            id: placeHolderId
        });
        this.swfupload = new SWFUpload({
            upload_url: this.uploadUrl,
            post_params: Ext.isEmpty(this.postParams) ? {} : this.postParams,
            flash_url: this.flashUrl,
            file_post_name: this.filePostName,
            file_size_limit: this.fileSize,
            file_types: this.fileTypes,
            file_types_description: this.fileTypesDescription,
            file_upload_limit: this.allowNumber,//允许同时上传文件的数量，默认值为0，即不限制。当文件队列中的文件数，正在上传的文件以及已经上传成功的文件数只和超过了该值后，便不在允许添加文件
            file_queue_limit: this.allowNumber,//允许队列存在的文件数量，默认值为0，即不限制。当文件队列中的文件数超过该值便不再允许添加文件
//          use_query_string:true,
            debug: false,
            button_width: '48',
            button_height: '20',
            button_placeholder_id: placeHolderId,
            button_window_mode: SWFUpload.WINDOW_MODE.TRANSPARENT,
            button_cursor: SWFUpload.CURSOR.HAND,
            button_disabled: false,//按钮是否禁用，默认值为false
            //button_action : //设置Flash Button点击以后的动作，默认值为SWFUpload.BUTTON_ACTION.SELECT_FILES（多文件上传）
            //requeue_on_error, //是否将上传失败的的文件重新添加到上传队列的顶端，默认值为true。当文件上传失败或者停止上传触发uploadError事件，是否将上传失败的的文件重新添加到上传队列的顶端，当然调用cancelUpload方法触发uploadError事件，不会将文件重新添加到上传队列中，而是会丢弃
            custom_settings: {
                scope_handler: this
            },
            swfupload_loaded_handler: this.onFlashCompleteInit,
            file_dialog_start_handler: this.onBeforeFileWindowOpen,

            file_queued_handler: this.onAddFileToQueue,
            file_queue_error_handler: this.onAddFileToQueueError,
            file_dialog_complete_handler: this.onAddFileToQueueComplete,

            upload_start_handler: this.doUpload,
            upload_progress_handler: this.doUploadProgress,
            upload_error_handler: this.doUploadError,
            upload_success_handler: this.doUploadSuccess,
            upload_complete_handler: this.doUploadComplete
        });
        this.swfupload.uploadStopped = false;
        //Ext.getCmp(this.swfupload.movieName).setStyle({
        //    position: 'absolute',
        //    top: '-2px',
        //    left: '-2px'
        //});
    },

    //初始化进度信息
    initProgressInfo: function () {
        this.progressInfo = {
            filesTotal: 0,//总文件数量
            filesUploaded: 0,//上传了的文件的数量
            bytesTotal: 0,//总文件大小
            bytesUploaded: 0,//上传了的文件大小
            currentCompleteBytes: 0,//当前已完成文件的大小
            lastBytes: 0,
            lastElapsed: 1,
            lastUpdate: null,
            timeElapsed: 1
        }
    },

    /**
     * flash文件初始化完成之后调用
     */
    onFlashCompleteInit: Ext.emptyFn,

    /**
     * 打开浏览窗口之前调用
     */
    onBeforeFileWindowOpen: Ext.emptyFn,

    //第二步:添加文件到数据表中
    onAddFileToQueue: function (file) {
        var thiz = this.customSettings.scope_handler;
        thiz.grid.store.add(new thiz.grid.store.recordType({
            fileId: file.id,
            fileName: file.name,
            fileSize: file.size,
            fileType: file.type,
            fileState: file.filestatus
        }));

        thiz.progressInfo.filesTotal += 1;//文件总数
        thiz.progressInfo.bytesTotal += file.size;//文件总大小

        thiz.doUpdateProgressInfo();//添加了文件后根据进度信息进新一次进度显示
    },

    //添加一个文件到队列中出现错误
    onAddFileToQueueError: function (file, errorCode, message) {
        var thiz = this.customSettings.scope_handler;
        var errorMsg = '';
        switch (errorCode) {
            case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED :
                errorMsg = String.format('尝试添加太多的文件进入队列，只可以添加<b>{0}</b>个文件', message);
                break;
            case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT :
                errorMsg = String.format('<b>{0}</b>大小超出限制，只可以添加不超过<b>{1}</b>的文件', file.name, thiz.fileSize);
                break;
            case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE :
                errorMsg = String.format('<b>{0}</b>是0字节文件,不能上传0字节的文件', file.name);
                break;
            case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE :
                errorMsg = String.format('<b>{0}</b>是无效文件类型', file.name);
                break;
            default :
                errorMsg = '添加文件时出现未知错误';
        }

        Ext.Msg.show({
            title: '提示',
            msg: errorMsg,
            buttons: Ext.Msg.OK,
            fn: Ext.emptyFn,
            icon: Ext.MessageBox.INFO
        });
    },

    //添加文件到数据表动作完成
    onAddFileToQueueComplete: function (selectedFilesCount, queuedFilesCount) {
        //alert("selectedFilesCount:" + selectedFilesCount + "  queuedFilesCount:" + queuedFilesCount );
    },

    //第三步:点击上传按钮，开始上传
    doUpload: function () {
        if (this.swfupload) {
            var btn = this.topBar.uploadFile;//取得按钮对象
            if (btn && btn.state == 'upload') {
                this.swfupload.uploadStopped = false;
                var post_params = this.swfupload.settings.post_params;
                this.swfupload.setPostParams(post_params);
                this.swfupload.startUpload();

                btn.setText('停止');
                btn.state = 'pause'
                btn.setIconClass('oa-pause');
            } else {
                this.swfupload.uploadStopped = true;
                this.swfupload.stopUpload();
                btn.setText('上传');
                btn.state = 'upload',
                    btn.setIconClass('oa-img-upload');
            }
            this.doControlBtns(false);
        }
    },

    //从数据表中移除文件
    doRemove: function () {
        var records = this.grid.getSelected(true);//取得选定的所有的记录
        if (records.length < 1) {
            Ext.uxMsg.tip(Ext.uxMsg.INFO, '请选择要移除的文件');
            return;
        }
        Ext.each(records, function (record) {
            if (record.data.fileState != SWFUpload.FILE_STATUS.IN_PROGRESS /*&& record.data.fileState != SWFUpload.FILE_STATUS.QUEUED.COMPLETE*/) {
                this.swfupload.cancelUpload(record.data.fileId);//此句一定要加上,它会触会doUploadError事件
                if (record.data.fileState != SWFUpload.FILE_STATUS.CANCELLED) {


                    this.progressInfo.filesTotal -= 1;
                    this.progressInfo.bytesTotal -= record.data.fileSize;
                    switch (record.data.fileState) {
                        case SWFUpload.FILE_STATUS.CANCELLED:
                            this.progressInfo.bytesUploaded -= this.progressInfo.currentCompleteBytes;
                            break;
                        case SWFUpload.FILE_STATUS.ERROR :
                        case SWFUpload.FILE_STATUS.COMPLETE:
                            this.progressInfo.bytesUploaded -= record.data.fileSize;
                            break;
                    }

                    //record.set('fileState',SWFUpload.FILE_STATUS.CANCELLED);
                    //record.commit();
                    this.store.remove(record);
                    this.doUpdateProgressInfo();
                }
            }
        }, this);
        this.grid.getView().refresh();
    },

    /**上传过程中进度
     * @param {} file 文件对象
     * @param {} completeBytes 已经上传的字节数(当前文件已上传了的大小)
     * @param {} bytesTotal 总共要上传的字节数(当前文件总大小)
     */
    doUploadProgress: function (file, completeBytes, bytesTotal) {
        //处理数据表里列进度条
        var thiz = this.customSettings.scope_handler;
//      try{
        var percent = Math.ceil((completeBytes / bytesTotal) * 100);
        Ext.getDom('progressBar_' + file.id).style.width = percent + "%";
        Ext.getDom('progressText_' + file.id).innerHTML = percent + " %";
        var record = thiz.store.getById(Ext.getDom('fileId_' + file.id).parentNode.id);
        record.set('fileState', file.filestatus);

        //生成基本进度相关信息
        var bytes_added = completeBytes - thiz.progressInfo.currentCompleteBytes;
        thiz.progressInfo.bytesUploaded += Math.abs(bytes_added < 0 ? 0 : bytes_added);
        thiz.progressInfo.currentCompleteBytes = completeBytes;

        if (thiz.progressInfo.lastUpdate) {
            thiz.progressInfo.lastElapsed = thiz.progressInfo.lastUpdate.getElapsed();
            thiz.progressInfo.timeElapsed += thiz.progressInfo.lastElapsed;
        }
        thiz.progressInfo.lastBytes = bytes_added;
        thiz.progressInfo.lastUpdate = new Date();

        thiz.doUpdateProgressInfo();//更新底部工具条上进度信息

//      }catch(e){
//
//      }
    },

    //更新上传进度信息
    doUpdateProgressInfo: function () {
        var pInfo = {};
        pInfo.filesUploaded = String.leftPad(this.progressInfo.filesUploaded, 3, '&nbsp;');
        pInfo.filesTotal = this.progressInfo.filesTotal;

        pInfo.bytesUploaded = String.leftPad(Ext.util.Format.fileSize(this.progressInfo.bytesUploaded), 6, '&#160;');
        pInfo.bytesTotal = Ext.util.Format.fileSize(this.progressInfo.bytesTotal);

        pInfo.timeElapsed = this.formatTime(this.progressInfo.timeElapsed);
        pInfo.speedAverage = Ext.util.Format.fileSize(Math.ceil(1000 * this.progressInfo.bytesUploaded / this.progressInfo.timeElapsed)) + '/s';
        pInfo.timeLeft = this.formatTime((this.progressInfo.bytesUploaded === 0) ? 0 : this.progressInfo.timeElapsed * (this.progressInfo.bytesTotal - this.progressInfo.bytesUploaded) / this.progressInfo.bytesUploaded);
        var caleSpeed = 1000 * this.progressInfo.lastBytes / this.progressInfo.lastElapsed;
        pInfo.speedLast = Ext.util.Format.fileSize(caleSpeed < 0 ? 0 : caleSpeed) + '/s';

        //时间信息
        this.bottomBar.time.setValue(pInfo.timeLeft);
        //速度信息
        this.bottomBar.speed.setValue(pInfo.speedAverage);
        //状态信息
        this.bottomBar.state.setValue(pInfo.bytesUploaded + '&nbsp;/&nbsp;' + pInfo.bytesTotal);
        //总进度条信息
        var p = (this.progressInfo.bytesUploaded / this.progressInfo.bytesTotal) || 0;
        this.bottomBar.progressBar.updateProgress(p, p >= 1 ? '完成&nbsp;100 %' : String.format('{0} %', Math.ceil(p * 100)));
    },

    //当一个文件上传失败后调用此方法,cancelUpload方法调用后也会触发此事件
    doUploadError: function (file, errorCode, message) {
        var thiz = this.customSettings.scope_handler;
        var tipMsg = null;
        try {
            var record = thiz.store.getById(Ext.getDom('fileId_' + file.id).parentNode.id);
            record.set('fileState', file.filestatus);
            switch (errorCode) {
                case SWFUpload.UPLOAD_ERROR.UPLOAD_STOPPED :
                    tipMsg = String.format('<div id="fileId_{0}"/><font color="red">{1}上传失败,上传被终止</font>', record.data.fileId, record.data.fileName);
//                  alert(thiz.progressInfo.bytesUploaded +'\t' + thiz.progressInfo.lastBytes + '\t' + thiz.progressInfo.currentCompleteBytes);
                    thiz.progressInfo.bytesUploaded -= thiz.progressInfo.currentCompleteBytes;
                    break;
                case SWFUpload.UPLOAD_ERROR.MISSING_UPLOAD_URL :
                    tipMsg = String.format('<div id="fileId_{0}"/><font color="red">{1}上传失败,丢失URL</font>', record.data.fileId, record.data.fileName);
                    break;
                case SWFUpload.UPLOAD_ERROR.IO_ERROR :
                    tipMsg = String.format('<div id="fileId_{0}"/><font color="red">{1}上传失败,IO异常</font>', record.data.fileId, record.data.fileName);
                    break;
                case SWFUpload.UPLOAD_ERROR.SECURITY_ERROR :
                    tipMsg = String.format('<div id="fileId_{0}"/><font color="red">{1}上传失败,安全错误</font>', record.data.fileId, record.data.fileName);
                    break;
                case SWFUpload.UPLOAD_ERROR.UPLOAD_LIMIT_EXCEEDED :
                    tipMsg = String.format('<div id="fileId_{0}"/><font color="red">{1}上传失败,大小限制异常</font>', record.data.fileId, record.data.fileName);
                    break;
                case SWFUpload.UPLOAD_ERROR.UPLOAD_FAILED :
                    tipMsg = String.format('<div id="fileId_{0}"/><font color="red">{1}上传失败,上传异常</font>', record.data.fileId, record.data.fileName);
                    break;
                case SWFUpload.UPLOAD_ERROR.SPECIFIED_FILE_ID_NOT_FOUND :
                    tipMsg = String.format('<div id="fileId_{0}"/><font color="red">{1}上传失败,文件编号丢失</font>', record.data.fileId, record.data.fileName);
                    break;
                case SWFUpload.UPLOAD_ERROR.FILE_VALIDATION_FAILED :
                    tipMsg = String.format('<div id="fileId_{0}"/><font color="red">{1}上传失败,验证失败</font>', record.data.fileId, record.data.fileName);
                    break;
                case SWFUpload.UPLOAD_ERROR.FILE_CANCELLED:
                    tipMsg = String.format('<div id="fileId_{0}"/><font color="red">{1}上传失败,文件取消</font>', record.data.fileId, record.data.fileName);
                    break;
            }
        } catch (e) {

        } finally {
            thiz.doUpdateProgressInfo();
        }

        if (!Ext.isEmpty(tipMsg)) {
            Ext.Msg.show({
                title: '提示',
                msg: tipMsg,
                width: 320,
                buttons: Ext.Msg.OK,
                fn: Ext.emptyFn,
                icon: Ext.MessageBox.INFO
            });
        }
//      alert('onUploadError,errorCode:' + errorCode + ",message:" + message  + ",file.filestatus:" + file.filestatus);
    },

    /**当一个文件上传成功后调用些方法
     * @param {} file 文件对象
     * @param {} responseText 服务端响应的信息
     * @param {} isResponsed 是否有服务端响应信息
     */
    doUploadSuccess: function (file, responseText, isResponsed) {
        var thiz = this.customSettings.scope_handler;
        try {
            var record = thiz.store.getById(Ext.getDom('fileId_' + file.id).parentNode.id);
            if (Ext.util.JSON.decode(responseText).success) {
                thiz.progressInfo.filesUploaded += 1;
                thiz.doUpdateProgressInfo();
                record.set('fileState', file.filestatus);
                record.commit();
            }
        } catch (e) {
            record.set('fileState', SWFUpload.FILE_STATUS.ERROR);
            record.commit();
        }
        thiz.doUpdateProgressInfo();
    },

    //当一个文件上传完成后如果队列中还有待上传的文件再次调用上传方法
    doUploadComplete: function (file) {
        if (this.getStats().files_queued > 0 && this.uploadStopped == false) {
            this.startUpload();
        } else if (this.getStats().files_queued == 0) {
            var thiz = this.customSettings.scope_handler;
            var btn = thiz.topBar.uploadFile;
            btn.setText('上传');
            btn.state = 'upload',
                btn.setIconClass('oa-img-upload');
            thiz.doControlBtns(false);
        }
    },

    //数据表里进度条列渲染函数
    renderProgressBar: function (v, cellmeta, record) {
        var returnValue = '';
        switch (record.data.fileState) {
            case SWFUpload.FILE_STATUS.COMPLETE:
                if (Ext.isIE) {
                    returnValue =
                        '<div class="x-progress-wrap" style="height: 18px">' +
                        '<div class="x-progress-inner">' +
                        '<div style="width: 100%;" class="x-progress-bar x-progress-text">' + '100 %'
                    '</div>' +
                    '</div>' +
                    '</div>';
                } else {
                    returnValue =
                        '<div class="x-progress-wrap" style="height: 18px">' +
                        '<div class="x-progress-inner">' +
                        '<div id="progressBar_' + record.data.fileId + '" style="width: 100%;" class="x-progress-bar">' +
                        '</div>' +
                        '<div id="progressText_' + record.data.fileId + '" style="width: 100%;" class="x-progress-text x-progress-text-back" />100 %</div>'
                    '</div>' +
                    '</div>';
                }
                break;
            default :
                returnValue =
                    '<div class="x-progress-wrap" style="height: 18px">' +
                    '<div class="x-progress-inner">' +
                    '<div id="progressBar_' + record.data.fileId + '" style="width: 0%;" class="x-progress-bar">' +
                    '</div>' +
                    '<div id="progressText_' + record.data.fileId + '" style="width: 100%;" class="x-progress-text x-progress-text-back" />0 %</div>'
                '</div>' +
                '</div>';
                break;
        }
        return returnValue;
    },

    //数据表文件大小渲染函数
    renderFileSize: function (v, meta, record) {
        return '<div id="fileSize_' + record.data.fileId + '">' + Ext.util.Format.fileSize(v) + '</div>';
    },

    //数据表里文件状态渲染函数
    renderFileState: function (v, meta, record) {
        var returnValue = '';
        switch (v) {
            case SWFUpload.FILE_STATUS.QUEUED:
                returnValue = String.format('<span id="{0}"><div id="fileId_{1}"/>等待上传</span>', record.id, record.data.fileId);
                break;
            case SWFUpload.FILE_STATUS.CANCELLED:
                returnValue = String.format('<span id="{0}"><div id="fileId_{1}"/>取消上传</span>', record.id, record.data.fileId);
                break;
            case SWFUpload.FILE_STATUS.COMPLETE:
                returnValue = String.format('<span id="{0}"><div id="fileId_{1}"/>成功上传</span>', record.id, record.data.fileId);
                break;
            case SWFUpload.FILE_STATUS.IN_PROGRESS :
                returnValue = String.format('<span id="{0}"><div id="fileId_{1}"/>正在上传</span>', record.id, record.data.fileId);
                break;
            default :
                returnValue = String.format('<span id="{0}"><div id="fileId_{1}"/><font color="red">上传失败</font></span>', record.id, record.data.fileId);
                break;
        }
        return returnValue;

    },

    //控制工具条上的按钮状态
    doControlBtns: function (isAddBtn) {
        if (Ext.isEmpty(isAddBtn) || isAddBtn) {
            var count = this.store.getCount();
            this.topBar.uploadFile.setDisabled(count < 1);
        } else {
            var b = this.topBar.uploadFile.state == 'pause';
            this.topBar.addFile.setDisabled(b);
            this.topBar.removeFile.setDisabled(b);
            document.getElementById(this.swfupload.movieName).style.top = b ? '30px' : '-2px';
        }
    },

    //格式化时间
    formatTime: function (milliseconds) {
        var seconds = parseInt(milliseconds / 1000, 10);
        var h = 0, m = 0, s = 0, result = [];
        if (3599 < seconds) {
            h = parseInt(seconds / 3600, 10);
            seconds -= h * 3600;
        }
        if (59 < seconds) {
            m = parseInt(seconds / 60, 10);
            seconds -= m * 60;
        }
        result.push(String.leftPad(h, 2, '0'), ':', String.leftPad(m, 2, '0'), ':', String.leftPad(seconds, 2, '0'));
        return result.join('');
    }
});