(function (factory) {
    // Multiple loading methods are supported depending on
    // what is available globally. While moment is loaded
    // here, the instance can be passed in at config time.
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery', 'jquery-ui'], factory);
    }
    else if (typeof exports === 'object') {
        // Node/CommonJS
        module.exports = factory(require('jquery'), require('jquery-ui'));
    }
    else {
        // Browser globals
        window.popup = factory(jQuery, null);
    }
}(function ($, $ui) {
	var Popup = function () {
        this.config = {
        	width: '',
        	height: '',
            title: '',
        	content: '',
            hasCloseBtn: false,
            skin: 'window-default',
            alertBtnText: '确定',
            confirmBtnText: '确定',
            confirmHandle: null,
            cancleBtnText: '取消',
            promptBtnText: '确定',
            hasMask: true,
            isDraggable: true,
            dragHandler: ''
        };
        this.handlers = {};
        this.boundingBox = null;
	}

	$.extend(
        Popup.prototype,
        {   
            render: function (container) {
                this.renderUI();
                this.bindUI();
                this.syncUI();
                $('body').append(this.boundingBox);
                $('.window-boundingBox').css({
                    width: this.config.width || '',
                    height: this.config.height || '',
                    left: this.config.x
                        || this.config.width
                        ? 'calc(50% - ' + this.config.width / 2 + 'px)'
                        : 'calc(50% - ' + $('.window-boundingBox').outerWidth() / 2 + 'px)',
                    top: this.config.y 
                        || this.config.height
                        ? 'calc(50% - ' + this.config.height / 2 + 'px)'
                        : 'calc(50% - ' + $('.window-boundingBox').outerHeight() / 2 + 'px)'

                });
            },
            renderUI: function () {
                var footerContent = '';
                switch (this.config.winType) {
                    case 'alert':
                        footerContent = ''
                            + '<button class="window-alert window-btn">'
                            +      this.config.alertBtnText 
                            + '</button>';
                        break;
                    case 'confirm':
                        footerContent = ''
                            + '<button class="window-confirm window-btn">' 
                            +      this.config.confirmBtnText 
                            + '</button>' 
                            + '<button class="window-cancle window-btn">' 
                            +      this.config.cancleBtnText 
                            + '</button>';
                        break;
                    case 'prompt': 
                        footerContent = ''
                            + '<button class="window-prompt window-btn">' 
                            +      this.config.promptBtnText 
                            + '</button>' 
                            + '<button class="window-cancle window-btn">' 
                            +      this.config.cancleBtnText 
                            + '</button>';
                        this.config.content = ''
                            + '<p class="window-content">' + this.config.content + '</p>' 
                            + '<input type="text" class="window-text">';
                        break;
                }

                this.boundingBox = $(''
                    + '<div class="window-boundingBox">'
                        + '<div class="window-header">' + this.config.title + '</div>'
                        + '<div class="window-body">'
                        +      '<div class="window-middle">' + this.config.content + '</div>'
                        + '</div>'
                        + '<div class="window-footer">' + footerContent + '</div>'               
                    + '</div>'
                );
                if (this.config.hasMask) {
                    this.mask = $('<div class="window-mask"></div>');
                    $('body').prepend(this.mask);
                }
                if (this.config.hasCloseBtn) {
                    var closeBtn = $('<span class="window-close">×</span>');
                    this.boundingBox.find('.window-header').append(closeBtn);
                }

                this.input = this.boundingBox.find('input');
            },
            bindUI: function () {
                var that = this;
                this.boundingBox.delegate('.window-alert', 'click', function () {
                    that.fire('alert');
                    that.destroy();
                }).delegate('.window-close', 'click', function () {
                    that.fire('close');
                    that.destroy();
                }).delegate('.window-confirm', 'click', function () {
                    that.fire('confirm');
                    that.destroy();
                }).delegate('.window-cancle', 'click', function () {
                    that.fire('cancle');
                    that.destroy();
                }).delegate('.window-prompt', 'click', function () {
                    that.fire('prompt', that.input.val());
                    that.destroy();
                });

                that.config.confirmHandle && that.on('confirm', that.config.confirmHandle);
            },
            syncUI: function () {
                if (this.config.skin) {
                    this.boundingBox.addClass(this.config.skin);
                }
                if (this.config.isDraggable) {
                    if (this.config.dragHandler) {
                        this.boundingBox.draggable({
                            containment: 'window',
                            handle: this.config.dragHandler
                        });
                    }
                    else {
                        this.boundingBox.draggable({
                            containment: 'window'
                        });
                    }
                    // 由于jquery ui会给弹窗增加position: relative样式
                    // 影响页面显示，故删除该样式设置
                    this.boundingBox.css('position', '');
                }

            },
            on: function (type, handler) {
                if (!this.handlers[type]) {
                    this.handlers[type] = [];
                }
                this.handlers[type].push(handler);
                return this;
            },
            fire: function (type, data) {
                var handlers = this.handlers[type];
                if (Array.isArray(handlers)) {
                    handlers.forEach(function (value) {
                        value(data);
                    });
                }
            },
            destroy: function () {
                this.destructor();
                this.boundingBox.off();
                this.boundingBox.remove();
            },
            destructor: function () {
                this.mask && this.mask.remove();
            },
            alert: function (config) {
                $.extend(this.config, config, {winType: 'alert'});
                this.render();
                return this;
            },
            confirm: function (config) {
                $.extend(this.config, config, {winType: 'confirm'});
                this.render();
                return this;
            },
            prompt: function (config) {
                $.extend(this.config, config, {winType: 'prompt'});
                this.render();
                this.input.focus();
                return this;
            }
     	});
    
	return new Popup();
}));
