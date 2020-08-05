class Inter{
    constructor(element, outerElement){
        this.element = element;
        this.outerElement = outerElement;
        this.element.css({'position': 'absolute', 'cursor': 'move', 'user-select': 'none'});
        this.outerElement.css({'position': 'absolute', 'border': '2px solid transparent'});
        this.element.on("mousedown", function() {
            down();
        });
        this.element.on("touchstart", function() {
            down();
        });
        this.cur = {
            x: 0,
            y: 0
        }
    }

    down() {
        let touch;
        if(event.touches) {
            touch = event.touches[0];
        } else {
            touch = event;
        }
        this.cur.x = touch.clientX;
        this.cur.y = touch.clientY;
        let position = this.element.position();
        this.dx = position.left;
        this.dy = position.top;

        this.eleW = this.element.width();
        this.eleH = this.element.height();
        this.outerW = this.outerElement.width();
        this.outerH = this.outerElement.height();
        $(document).on("mousemove", function() {
            this.move();
        });
        $(document).on("touchmove", function() {
            this.move();
        });
        $(document).on("mouseup", function() {
            this.end();
        });
        this.element.on("touchend", function() {
            this.end();
        });
    }

    move() {
        let touch;
        if(event.touches) {
            touch = event.touches[0];
        } else {
            touch = event;
        }
        this.nx = touch.clientX - this.cur.x;
        this.ny = touch.clientY - this.cur.y;
        this.x = this.dx + this.nx;
        this.y = this.dy + this.ny;
        this.x = this.x < 0?0:this.x;
        this.x = this.x > this.outerW-this.eleW?this.outerW-this.eleW:this.x;
        this.y = this.y > this.outerH-this.eleH?this.outerH-this.eleH:this.y;
        this.y = this.y < 0?0:this.y;
        this.element.css({'left': this.x + "px", 'top': this.y +"px"});
        if(this.x==0 || this.x==this.outerW-this.eleW || this.y==0 || this.y==this.outerH-this.eleH){
            this.outerElement.css({'border-color': 'green', 'transition': 'border 0.5s'});
            setTimeout(function(){
                this.outerElement.css({'border-color': 'transparent', 'transition': 'border 0.25s'});
            }, 1000);
        }else{
            this.outerElement.css({'border-color': 'transparent', 'transition': 'border 0.5s'});
        }
        //阻止页面的滑动默认事件
        $(document).on("touchmove", function() {
            event.preventDefault();
        });
    }
    //鼠标释放时候的函数
    end() {
        $(document).unbind('mousemove');
    }
}

export default Inter;