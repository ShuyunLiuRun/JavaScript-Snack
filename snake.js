       
        //anonymous function for snake body
        (function (window) {
            var elements = []; //store snake body parts
            //constructor for snake
            function Snake(width, height, direction) {
                this.width = width || 20;
                this.height = height || 20;
                //snake body
                this.body = [
                    { x: 3, y: 2, color: "red" },// snake head
                    { x: 2, y: 2, color: "orange" }, // snake shoulder
                    { x: 1, y: 2, color: "orange" } // snake tail
                ]
                //direction
                this.direction = direction || "right";
            }

            //init snake
            Snake.prototype.init = function (map) {
                //remove the previous snake
                remove();

                for (var i = 0; i < this.body.length; i++) {
                    //数组中的每个元素都是对象
                    var obj = this.body[i];
                    //create a div
                    var div = document.createElement('div');
                    //append the div to map
                    map.appendChild(div);
                    div.style.width = this.width + 'px';
                    div.style.height = this.height + 'px';
                    div.style.position = 'absolute';
                    //横纵坐标
                    div.style.left = obj.x * this.width + 'px';
                    div.style.top = obj.y * this.height + 'px';
                    //背景颜色
                    div.style.backgroundColor = obj.color;
                    //put div into elements array --- for deleting it
                    elements.push(div);
                }
            }

            //move the snake
            Snake.prototype.move = function (food, map) {
                var i = this.body.length - 1;
                for (; i > 0; i--) {
                    this.body[i].x = this.body[i - 1].x;
                    this.body[i].y = this.body[i - 1].y;
                }
                //change snake head direction
                switch (this.direction) {
                    case "right":
                        this.body[0].x += 1;
                        break;
                    case "bottom":
                        this.body[0].y += 1;
                        break;
                    case "top":
                        this.body[0].y -= 1;
                        break;
                    case "left":
                        this.body[0].x -= 1;
                        break;
                };

                //to eat the food  -- when snake head's position reach the food's position
                var headX = this.body[0].x*this.width;
                var headY = this.body[0].y*this.height;
                if(headX === food.x && headY === food.y){
                    //get the last tail of the snake and copy it to the snake
                    var last = this.body[this.body.length-1];
                    this.body.push({
                        x: last.x,
                        y:last.y,
                        color: last.color
                    });
                    //generate a new food
                    food.init(map);
                }
            };

            //delete the previous snake
            function remove() {
                var i = elements.length - 1;
                for (; i >= 0; i--) {
                    var ele = elements[i];
                    //remove it from the map
                    ele.parentNode.removeChild(ele);
                    elements.splice(i, 1);
                }
            };

            // expose the snake to window so it could be accessed from outside
            window.Snake = Snake;
        })(window);
