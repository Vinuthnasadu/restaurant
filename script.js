let orderedItems = document.getElementById('orderList');
orderedItems.innerHTML = '';

let orderStatus = document.getElementById('orderPlaced');
orderStatus.innerHTML = '';

let paymentStatus = document.getElementById('paymentMsg');
paymentStatus.innerHTML = '';

let itemsList = document.getElementById('List');
itemsList.innerHTML = '';



let imageList=document.getElementById('imageList');


// Get menu function
function getMenu(){
    return new Promise((resolve, reject) => {
        console.log(` Menu will be displayed on webpage shortly....(time required for fetching data)`);
        fetch("https://free-food-menus-api-production.up.railway.app/burgers").then((response)=> response.json()).then((data)=>{
            let menu = [];
            for (const menuName of data) {
                menu.push(menuName.name);
                itemsList.innerHTML+=
                    `<div id="card" class="card border border-dark border-2 border-opacity-25" style="width: 20rem;height:28rem;">
                        <img src="${menuName.img}" class="card-img-top" alt="">
                        <div class="card-body" id="card-body">
                            <b style="color:darkslateblue ">${menuName.name}</b> <br>
                            <p class="card-text" style="color:darkslateblue">Country: ${menuName.country}</p>
                            <p class="card-text" style="color:darkslateblue">Price: ${menuName.price}</p>
                        </div>
                    </div>`
            }
            console.log(data)
            resolve(menu);
        })
    });
}


//take order function
function takeOrder(data1){
    let burger1Index = Math.floor(Math.random()*57);
        let burger2Index = burger1Index + 1;
        let burger3Index = burger1Index + 2;
        let burger1 = data1[burger1Index];
        let burger2 = data1[burger2Index];
        let burger3 = data1[burger3Index];
        let obj = {item1: `${burger1}`, item2: `${burger2}`, item3: `${burger3}`};
    return new Promise((resolve,reject)=>{
        console.log(" User ordered following burgers");
        setTimeout(()=>{
                console.log(`item 1: ${burger1} \nitem 2: ${burger2} \nitem 3: ${burger3}`);
                document.getElementById('menu').classList.add('hide');
                orderedItems.innerHTML += `<strong>
                <li style="color:teal">Burger1: ${burger1}</li>
                <li style="color:teal">Burger2: ${burger2}</li>
                <li style="color:teal">Burger3: ${burger3}</li>
                </strong>
                `
                resolve(obj)
            }, 2500)
        })
}


//order preparation function
function orderPrep(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            orderStatus.innerHTML += `<p style="color:navy;">items are added in your cart...</p>`
            paymentStatus.innerHTML += `<h5 style="color:navy;">Please do payment to proceed further...</h5>`
            console.log(` Order is recieved, payment is in processing...`);
            console.log({order_status:true, paid:false});
            resolve({order_status:true, paid:false})
        },1500)
    })
}



// pay order function
function payOrder(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            orderStatus.innerHTML=`<p style='display:none'></p>`
            paymentStatus.innerHTML = `<h5 style="color:crimson;">Payment Recieved...</h5>`
            console.log(` Payment recieved, Order is confirmed `);
            console.log({order_status:true, paid:true});
            resolve({order_status:true, paid:true})
        },1000)
    })
}


//thank you function
function  thankyouFnc(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log(' Order delievered Thanks!');
            resolve(alert('Order delievered  Thanks!'))
        },100)
    })
}



//Promise chaining
getMenu()
    .then((data1) => takeOrder(data1))
    .then(() => orderPrep())
    .then(() => payOrder())
    .then(() => thankyouFnc())
    .catch((e) => {
        console.log("ERROR>>>", e);
      });
