function build_item(data,section,food_type){
    var get_main = document.querySelector("#main");

    var big_container = document.createElement("div");

    // nav
    let nav = document.querySelector("#put_nav");

    var li = document.createElement("li");
    li.className = "nav-item";
    nav.appendChild(li);

    var li_a = document.createElement("a"); 
    li_a.href = '#'+`${section}`;
    li_a.innerText = food_type;
    li_a.setAttribute("data-bs-toggle","pill")

    if (section == 'section1'){
        big_container.className = `container tab-pane active`;
        li_a.className = "nav-link active"; 
    }
    else {
        big_container.className = `container tab-pane fade`;
        li_a.className = "nav-link";
    }

    // nav
    li.appendChild(li_a);

    big_container.setAttribute('id',section);
    get_main.appendChild(big_container);


    var header = document.createElement("h1");
    header.innerText = food_type;
    big_container.appendChild(header);

    // body
    var body = document.createElement("div");
    body.className = `container-fluid`;
    body.style = `display: flex;
                    flex-wrap: wrap;
                    `;
    big_container.appendChild(body);

    for (var i = 0; i < data.length; i++){
        // title
        if (data[i][1] == ''){
            var h1 = document.createElement("h1");
            h1.innerText = data[i][0];
            h1.style = "width:100%";
            body.appendChild(h1);
            continue;
        }
        
        // add container
        var container_o = document.createElement("div");
        container_o.className = `container mt-3`;
        container_o.style = `width:25%;
                            height:auto`;
        body.appendChild(container_o);

        // bootstrap border
        var container = document.createElement("span");
        container.className = `border border-success rounded-3 bg-light`;
        container_o.appendChild(container);

        // container
        var p_name = document.createElement("p");
        var price = document.createElement("p");
        var value = document.createElement("p");
        p_name.className = `item_box${food_type+i}`;
        value.className = `box${food_type+i}`;

        p_name.innerText = data[i][0] + '       ';
        price.innerText = data[i][1] + '$';
        value.innerText = '0';
        value.style = "color: red;";

        // bootstrap border
        var container_name = document.createElement("div");
        container_name.className = "container_name_and_price";
        container.appendChild(container_name);

        container_name.append(p_name);
        container_name.append(value);

        // button
        var add_v = document.createElement("button");
        var minus = document.createElement("button");
        
        // classname
        add_v.className = "btn-default btn btn-primary bg-success";
        minus.className = "btn-default btn btn-primary bg-danger";

        add_v.innerText = "+";
        minus.innerText = "-";
        var item_name = p_name.className;
        var item_value = value.className;
        add_box = `add_value('${item_value}','${item_name}')`;
        minus_box=`minus_value('${item_value}','${item_name}')`;
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
    var result = document.getElementById("balance");
    cart.sort();
    // for (var i = 0; i < cart.length;i++){
    //     var show_p = document.createElement("h3");
    //     show_p.innerText = cart[i];
    //     result.appendChild(show_p);
    // }
    result.innerHTML = "";
    var map = new Map();
    for (var i = 0; i < cart.length;i++){
        if (map.has(cart[i])){
            let prev = map.get(cart[i]);
            prev += 1;
            map.set(cart[i],prev);
        }
        else {
            map.set(cart[i],1);
        }
    };
    
    let table = document.createElement("table");
    table.className = `table table-striped`;
    result.appendChild(table);

    // thead
    let thead = document.createElement("thead");
    table.appendChild(thead);
    
    let thead_r = document.createElement("tr");
    thead.appendChild(thead_r);

    let thead_h1 = document.createElement("th");
    thead_h1.innerText = "name";
    thead_r.appendChild(thead_h1);
    let thead_h2 = document.createElement("th");
    thead_h2.innerText = "value";
    thead_r.appendChild(thead_h2);

    //tbody
    let tbody = document.createElement("tbody");
    table.appendChild(tbody);
    map.forEach(function (value, key, map) {
        // console.log(`${key}`);
        // console.log(`${value}`);
        let tbody_r = document.createElement("tr");
        tbody.appendChild(tbody_r);

        let tbody_d1 = document.createElement("td");
        tbody_d1.innerText = `${key}`;
        tbody_r.appendChild(tbody_d1);

        let tbody_d2 = document.createElement("td");
        tbody_d2.innerText = `${value}`;
        tbody_r.appendChild(tbody_d2);

    });


}