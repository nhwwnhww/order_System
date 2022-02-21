function build_item(data){
    var body = document.querySelector("#body");

    for (var i = 0; i < data.length; i++){
        // add container
        var container = document.createElement("div");
        container.className = `container`;
        body.appendChild(container);

        // container
        var p_name = document.createElement("h1");
        var price = document.createElement("h2");
        var value = document.createElement("h3");
        p_name.className = `item_box${i}`;
        value.className = `box${i}`;

        p_name.innerText = data[i][0];
        price.innerText = '$' + data[i][1];
        value.innerText = '0';

        container.append(p_name);
        container.append(price);
        container.append(value);

        // button
        var add_v = document.createElement("button");
        var minus = document.createElement("button");
        
        add_v.innerText = "+++";
        minus.innerText = "---";
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
    if (origin == 0){
        return;
    }
    origin -= 1;
    value.innerText = origin;
    delete_cart(cart,item);
    return;
}
// add to cart
function add_cart(cart,item){
    var food = document.querySelector(`.${item}`);
    var food_name = food.innerText;
    cart.push(food_name);
    console.log(cart);
}
// delete item from cart
function delete_cart(cart,item){
    var food = document.querySelector(`.${item}`);
    var food_name = food.innerText;
    // delete the chosen item from array
    cart.map((val, i) => {
        if (val === food_name) {
            cart.splice(i,1);
            console.log(cart);
        }
    })
}

// display the result
function show(){
    var result = document.getElementById("result");
    cart.sort();
    for (var i = 0; i < cart.length;i++){
        var show = document.createElement("h3");
        show.innerText = cart[i];
        result.appendChild(show);
    }
}