;
(function($) {
    var customParams;
    var defaultParams = {
        title: "提示标题",
        className: 'dialog-con',
        content: "",
        width: 400,
        height: 300,
        isDrag: false,
        confirmFun: new Object,
        cancelFun: new Object
    };

    $.cDialog = {
        //弹出提示框
        _alert: function(params) {
            Show(params, "Alert");
        },
        //弹出确认框
        _confirm: function(params) {
            Show(params, "Confirm");
        },
        _tips: function(params) {
            Show(params, "Tips");
        },
        //关闭弹出框
        _close: function() {
            $("#dialogLayer,#dialogCon").remove();
        }
    };

    //初始化参数
    function Init(params) {
        customParams = $.extend({}, defaultParams, params);
    };
    //显示弹出框
    function Show(params, caller) {
        Init(params);
        var screenWidth = $(window).width();
        var screenHeight = $(window).height();
        //在屏幕中显示的位置（正中间）
        var positionLeft = (screenWidth - customParams.width) / 2 + $(document).scrollLeft();
        var positionTop = (screenHeight - customParams.height) / 2 + $(document).scrollTop();
        if (caller == "Tips") {
            initTipsHtml(positionLeft, positionTop, customParams.width, customParams.height, customParams.content)
        } else {
            initHtml(positionLeft, positionTop, customParams.className, customParams.width, customParams.height, customParams.title, customParams.content);
        }


        if (caller != "Confirm") {
            $('#btnCancel').remove();
        }
        setDialogEvent(caller);
    }

    function initHtml(pl, pt, cname, width, height, title, content) {
        var htmlTpl = [];
        htmlTpl.push('<div id="dialogLayer" class="dialog-layer"></div>');
        htmlTpl.push('<div id="dialogCon" class="' + cname + '" style="left:' + pl + 'px;top:' + pt + 'px;width:' + width + 'px;height:' + height + 'px;">');
        htmlTpl.push('     <div id="title" class="dc-tit">');
        htmlTpl.push('         <h3>' + title + '</h3>');
        htmlTpl.push('         <i class="close">X</i>');
        htmlTpl.push('</div>');
        htmlTpl.push('<div class="dc-con">');
        htmlTpl.push(content);
        htmlTpl.push('</div>');
        htmlTpl.push('<div class="dc-bot">');
        htmlTpl.push('         <a href="javascript:;" target="_self" class="dc-btn dc-btn-confrim" id="btnConfirm">确定</a>');
        htmlTpl.push('         <a href="javascript:;" target="_self" class="dc-btn dc-btn-cancel" id="btnCancel">取消</a>');
        htmlTpl.push('     </div>');
        htmlTpl.push('</div>');
        $("body").append(htmlTpl.join("\n"));
    }

    function initTipsHtml(pl, pt, width, height, content) {
        var tipsHtml = [];
        tipsHtml.push('<div id="tipsBox" class="tips-box" style="position: absolute;left:' + pl + 'px;top:' + pt + 'px;width:' + width + 'px;height:' + height + 'px;">');
        tipsHtml.push('     <div class="tips-box-bg" style="position: absolute;left:0;top:0;width:' + width + 'px;height:' + height + 'px;"></div>');
        tipsHtml.push('     <div class="tips-box-con" style="position: absolute;left:0;top:0;width:' + width + 'px;height:' + height + 'px;">');
        tipsHtml.push(content);
        tipsHtml.push('     </div>');
        tipsHtml.push('</div>');
        $("body").append(tipsHtml.join("\n"));
        CloseTips();
    }

    function Close() {
        $.cDialog._close();
    }

    function CloseTips() {
        setTimeout(function() {
            $('#tipsBox').fadeOut().delay(800).remove();
        }, 2000);
    }
    //设置弹窗事件
    function setDialogEvent(caller) {
        //添加按钮关闭事件
        $("#dialogCon .close").click(function() {
            Close();
        });
        //添加ESC关闭事件
        $(window).keydown(function(event) {
            var event = event || window.event;
            if (event.keyCode === 27) {
                Close();
            }
        });
        //添加窗口resize时调整对话框位置
        $(window).resize(function() {
            var screenWidth = $(window).width();
            var screenHeight = $(window).height();
            var positionLeft = parseInt((screenWidth - customParams.Width) / 2 + $(document).scrollLeft());
            var positionTop = parseInt((screenHeight - customParams.Height) / 2 + $(document).scrollTop());
            $("#dialogCon").css({
                "top": positionTop + "px",
                "left": positionLeft + "px"
            });
        });
        if (customParams.isDrag) {
            $("#dialogCon #title").css('cursor', 'move').DragAnim($("#dialogCon"));
        };
        if (caller != "Dialog") {
            $("#dialogCon #btnConfirm").click(function() {
                Close();
                if ($.isFunction(customParams.confirmFun)) {
                    customParams.confirmFun();
                }
            })
        }
        if (caller == "Confirm") {
            $("#dialogCon #btnCancel").click(function() {
                Close();
                if ($.isFunction(customParams.cancelFun)) {
                    customParams.cancelFun();
                }
            })
        }
    }
})(jQuery);
//拖动层
(function($) {
    $.fn.extend({
        DragAnim: function(objMoved) {
            return this.each(function() {
                //鼠标按下时的位置
                var mouseDownPosiX;
                var mouseDownPosiY;
                //移动的对象的初始位置
                var objPosiX;
                var objPosiY;
                //移动的对象
                var obj = $(objMoved) == undefined ? $(this) : $(objMoved);
                //是否处于移动状态
                var status = false;

                //鼠标移动时计算移动的位置
                var tempX;
                var tempY;

                $(this).mousedown(function(e) {
                    status = true;
                    mouseDownPosiX = e.pageX;
                    mouseDownPosiY = e.pageY;
                    objPosiX = obj.css("left").replace("px", "");
                    objPosiY = obj.css("top").replace("px", "");
                }).mouseup(function() {
                    status = false;
                });
                $("body").mousemove(function(e) {
                    if (status) {
                        tempX = parseInt(e.pageX) - parseInt(mouseDownPosiX) + parseInt(objPosiX);
                        tempY = parseInt(e.pageY) - parseInt(mouseDownPosiY) + parseInt(objPosiY);
                        obj.css({
                            "left": tempX + "px",
                            "top": tempY + "px"
                        });
                    }
                    //判断是否超出窗体
                    //计算出弹出层距离右边的位置
                    var dialogRight = parseInt($(window).width()) - (parseInt(obj.css("left")) + parseInt(obj.width()));
                    //计算出弹出层距离底边的位置
                    var dialogBottom = parseInt($(window).height()) - (parseInt(obj.css("top")) + parseInt(obj.height()));
                    var maxLeft = $(window).width() - obj.width();
                    var maxTop = $(window).height() - obj.height();
                    if (parseInt(obj.css("left")) <= 0) {
                        obj.css("left", "0px");
                    }
                    if (parseInt(obj.css("top")) <= 0) {
                        obj.css("top", "0px");
                    }
                    if (dialogRight <= 0) {
                        obj.css("left", maxLeft + 'px');
                    }
                }).mouseup(function() {
                    status = false;
                }).mouseleave(function() {
                    status = false;
                });
            });
        }
    })
})(jQuery);