let element = null;
let resizeElement = null;
let textElement = null;
let outerElement = null;
let interact = {
    constructor: function(parameters) {
        element = parameters.element;
        resizeElement = parameters.resizeElement;
        outerElement = parameters.outerElement;
        element.css({'position': 'absolute', 'cursor': 'move', 'user-select': 'none'});
        outerElement.css({'position': 'absolute', 'border': '2px solid transparent'});
        element.on("mousedown", function() {
            element = $(this).hasClass("item-box")?$(this):$(this).parent(".item-box");
            down();
        });
        element.click(function(e){
            element = $(this).hasClass("item-box")?$(this):$(this).parent(".item-box");
            $(".tool-box").hide();
            $(".text-box").css({'border-color': 'transparent'});

            element.children(".tool-box").show();
            element.children(".text-box").css({'border-color': '#999'});
            e.stopPropagation();
        });
        element.on("touchstart", function() {
            element = $(this).hasClass("item-box")?$(this):$(this).parent(".item-box");
            down();
        });
        resizeElement.on("mousedown", function(){
            resize(this);
        });
        resizeElement.on("touchstart", function(){
            resize(this);
        });
        parameters.deleteElement.click(function(e){
            deleteItem(this);
        });
    },
    draggable: function(parameters) {
        let listeners = parameters.listeners;
        let move = listeners.move;
    },
    display: function(){
        console.info(element.text());
    }
}

function resize(obj){
    element.unbind('mousedown');
    element.unbind('touchstart');
    resizeElement = $(obj);
    resizeElement.show();
    let textBox = $(obj).parent().siblings(".text-box");
    textElement = textBox.length > 0?textBox:$(obj).parent().siblings(".img-box");
    resizeDown();
}
function deleteItem(obj){
    $(obj).parent(".tool-box").parent(".item-box").remove();
}
var cur = {
    x: 0,
    y: 0
};
var resizeCur = {
    x: 0,
    y: 0
};
var nx, ny, dx, dy, x, y, w, h;

let outerElementPosition, outerX, outerY, outerW, outerH, eleW, eleH, textFontSize;

function down() {
    var touch;
    if(event.touches) {
        touch = event.touches[0];
    } else {
        touch = event;
    }
    cur.x = touch.clientX;
    cur.y = touch.clientY;
    let position = element.position();
    dx = position.left;
    dy = position.top;

    eleW = element.width();
    eleH = element.height();
    // outerElementPosition = outerElement.offset();
    // console.log(outerElementPosition);
    // outerX = outerElementPosition.left;
    // outerY = outerElementPosition.top;
    outerW = outerElement.width();
    outerH = outerElement.height();
    $(document).on("mousemove", function() {
        move();
    });
    $(document).on("touchmove", function() {
        move();
    });
    $(document).on("mouseup", function() {
        end();
    });
    element.on("touchend", function() {
        end();
    });
}

function move() {
    var touch;
    if(event.touches) {
        touch = event.touches[0];
    } else {
        touch = event;
    }
    nx = touch.clientX - cur.x;
    ny = touch.clientY - cur.y;
    x = dx + nx;
    y = dy + ny;
    x = x < 0?0:x;
    x = x > outerW-eleW?outerW-eleW:x;
    y = y > outerH-eleH?outerH-eleH:y;
    y = y < 0?0:y;
    element.css({'left': x + "px", 'top': y +"px"});
    if(x==0 || x==outerW-eleW || y==0 || y==outerH-eleH){
        outerElement.css({'border-color': 'green', 'transition': 'border 0.5s'});
        setTimeout(function(){
            outerElement.css({'border-color': 'transparent', 'transition': 'border 0.25s'});
        }, 1000);
    }else{
        outerElement.css({'border-color': 'transparent', 'transition': 'border 0.5s'});
    }
    //阻止页面的滑动默认事件
    $(document).on("touchmove", function() {
        event.preventDefault();
    });
}
//鼠标释放时候的函数
function end() {
    $(document).unbind('mousemove');
}
function resizeDown(){
    var touch;
    if(event.touches) {
        touch = event.touches[0];
    } else {
        touch = event;
    }
    resizeCur.x = touch.clientX;
    resizeCur.y = touch.clientY;
    let position = textElement.position();
    dx = position.left;
    dy = position.top;

    eleW = textElement.outerWidth(true);
    eleH = textElement.outerHeight(true);
    // outerElementPosition = outerElement.offset();
    // console.log(outerElementPosition);
    // outerX = outerElementPosition.left;
    // outerY = outerElementPosition.top;
    outerW = outerElement.width();
    outerH = outerElement.height();
    
    textFontSize = parseInt(textElement.css('font-size'));
    // element.css({'border': '3px solid green', 'transition': 'border 0.5s'});

    $(document).on("mousemove", function() {
        resizeMove();
    });
    $(document).on("touchmove", function() {
        resizeMove();
    });
    $(document).on("mouseup", function() {
        resizeEnd();
    });
    resizeElement.on("touchend", function() {
        resizeEnd();
    });
}
function resizeMove() {
    var touch;
    if(event.touches) {
        touch = event.touches[0];
    } else {
        touch = event;
    }
    nx = touch.clientX - resizeCur.x;
    // ny = touch.clientY - resizeCur.y;
    w = eleW + nx;
    // h = eleH + ny;
    w = w < 5?5:w;
    // h = h < 5?5:h;
    w = w > outerW?outerW:w;
    h = w/eleW*eleH;
    // h = h > outerH?outerH:h;
    console.log(eleW+', '+nx);
    textElement.css({'width': w + "px", 'height': h +"px", 'font-size': (w/eleW*textFontSize)-1});
    if(w==outerW || h==outerH){
        outerElement.css({'border-color': 'green', 'transition': 'border 0.5s'});
        setTimeout(function(){
            outerElement.css({'border-color': 'transparent', 'transition': 'border 0.25s'});
        }, 1000);
    }else{
        outerElement.css({'border-color': 'transparent', 'transition': 'border 0.5s'});
    }
    //阻止页面的滑动默认事件
    $(document).on("touchmove", function() {
        event.preventDefault();
    });
}

function resizeEnd() {
    $(document).unbind('mousemove');
    $(document).unbind('touchmove');
    element.on("mousedown", function() {
        element = $(this);
        down();
    });
    element.on("touchstart", function() {
        element = $(this);
        down();
    });
}
export default interact;
export {interact};