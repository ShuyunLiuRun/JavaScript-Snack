        //anonymous function for game
        (function () {
            var that = null;
            //game constructor
            function Game(map) {
                this.food = new Food(20, 20, "green");
                this.snake = new Snake();
                this.map = map;
                that = this;
            }
            
            Game.prototype.init = function () {
                //initialize a game
                //initialize a food when the game start
                this.food.init(this.map);
                // the initial snake when the game start
                this.snake.init(this.map);
                // call the method to run the snake
                this.runSnake(this.food, this.map);
                //add read key listener
                this.bindKey();
            };

            Game.prototype.runSnake = function(food, map){
                var id = setInterval(function(){
                    //the 'this' here is 'window'
                    this.snake.move(food,map);
                    this.snake.init(map);
                    //把map分成一个一个蛇头大的小方块，这个map最多能放几块  //也就是小蛇横坐标最大边界
                    var maxX = map.offsetWidth/this.snake.width;
                    //纵坐标最大边界
                    var maxY = map.offsetHeight/this.snake.height;
                    //snake head position X
                    var headX = this.snake.body[0].x;
                    //snake head position Y
                    var headY = this.snake.body[0].y;
                    if(headX<0 || headX>= maxX || headY<0 || headY>=maxY){
                        clearInterval(id)
                        alert('Game Over!');
                    };

                }.bind(that), 150);
            };
            
            //a function to get user keyboard input and change the snake direction
            Game.prototype.bindKey = () =>{
                document.addEventListener("keydown", function(e){
                    //the 'this' here is 'document'
                    switch (e.keyCode){
                        case 37: this.snake.direction="left"; break;
                        case 38: this.snake.direction="top"; break;
                        case 39: this.snake.direction="right"; break;
                        case 40: this.snake.direction="bottom"; break;
                    }
                }.bind(that), false);
            }

            var gm = new Game(document.querySelector(".map"));
            gm.init();
        }());
