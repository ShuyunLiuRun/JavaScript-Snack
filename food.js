//generate random numbers
(function (window) {
    function Random() { }
    Random.prototype.getRan = function (min, max) {
        return (Math.floor(Math.random() * (max - min) + min));
    };
    window.Random = new Random();
})(window);

//anonymous function for food (a cube in the map)
(function (window) {
    var map = document.querySelector(".map");
    //array to store all "food"s
    var foods = [];

    // Food constructor
    function Food(width, height, color) {
        this.height = height || 20;
        this.width = width || 20;
        this.color = color;
        this.x = 0;
        this.y = 0;
        this.element = document.createElement("div"); //for a cube
    }

    //init cube's style and location
    Food.prototype.init = function (map) {
        //first of all, delete the last 'food' before creating a new one
        remove();

        //set style to the cube
        var div = this.element;
        div.style.position = "absolute";
        div.style.width = this.width + "px";
        div.style.height = this.height + "px";
        div.style.backgroundColor = this.color;
        //add cube to map
        map.appendChild(div);
        this.render(map);
        //record this food so we can delete it if the sanke eat it
        foods.push(div);
    };

    //generate location
    Food.prototype.render = function (map) {
        var x = Random.getRan(0, map.offsetWidth / this.width) * this.width;
        var y = Random.getRan(0, map.offsetHeight / this.height) * this.height;
        this.x = x;
        this.y = y;
        var div = this.element;
        div.style.left = this.x + "px";
        div.style.top = this.y + "px";
    }

    //private function -- delete food 
    //this function cannot be accessed elsewhere because we don't want someone delete all the data accidently, so it is not write in prototype
    function remove() {
        foods.forEach(food => {
            food.parentNode.removeChild(food);
        });
        foods = [];
    }

    window.Food = Food;
})(window);
