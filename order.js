function build_item(data,section){
    var get_main = document.querySelector("#main");

    var body = document.createElement("div");
    body.className = `container-fluid bg-warning`;
    body.style = `display: flex;
                    flex-wrap: wrap;`;
    body.setAttribute('id',section);
    get_main.appendChild(body);


    for (var i = 0; i < data.length; i++){
        // add container
        var container = document.createElement("div");
        container.className = `container mt-3`;
        container.style = `width:20%;
                            height:auto`;
        body.appendChild(container);

        // bootstrap border
        var container_border = document.createElement("span");
        container_border.className = `border border-success rounded-3`;
        container.appendChild(container_border);

        // container
        var p_name = document.createElement("p");
        var price = document.createElement("p");
        var value = document.createElement("p");
        p_name.className = `item_box${i}`;
        value.className = `box${i}`;

        p_name.innerText = data[i][0];
        price.innerText = '$' + data[i][1];
        value.innerText = '0';

        container_border.append(p_name);
        container.append(price);
        container.append(value);

        // button
        var add_v = document.createElement("button");
        var minus = document.createElement("button");
        
        // classname
        add_v.className = "btn-default btn btn-primary";
        minus.className = "btn-default btn btn-primary";

        add_v.innerText = "+";
        minus.innerText = "-";
        var item_name = p_name.className;
        add_box = `add_value('${value.className}','${item_name}')`;
        minus_box=`minus_value('${value.className}','${item_name}')`;
        add_v.setAttribute("onclick",add_box);
        minus.setAttribute("onclick",minus_box);

        container.append(add_v);
        container.append(minus);

    }
}

// add food value
function add_value(box,item){ 
    var value = document.querySelector(`.${box}`);
    var origin = parseInt(value.innerHTML);
    origin += 1;
    value.innerText = origin;
    add_cart(cart,item);
    return;
}
// delete food value
function minus_value(box,item){ 
    var value = document.querySelector(`.${box}`);
    var origin = parseInt(value.innerHTML);

    var food = document.querySelector(`.${item}`);
    var food_name = food.innerText;
    if (origin == 0){
        return;
    }
    removeItemOnce(cart,food_name);
    origin = origin - 1;
    value.innerText = origin;
    console.log(cart);
    return;
}
// add to cart
function add_cart(cart,item){
    var food = document.querySelector(`.${item}`);
    var food_name = food.innerText;
    cart.push(food_name);
    console.log(cart);
}
// remove item once form array
function removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }

// display the result
function show(){
    var result = document.getElementById("result");
    cart.sort();
    result.innerHTML = "";
    for (var i = 0; i < cart.length;i++){
        var show_p = document.createElement("h3");
        show_p.innerText = cart[i];
        result.appendChild(show_p);
        console.log(i);
    }
}