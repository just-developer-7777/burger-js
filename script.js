// let user = {
//     name: 'John',
//     surname: "Smith",
//     get fullName(){
//         return `${this.name} ${this.surname}`;
//     },
//     set fullName(val){
//         let arr = val.split(' ');
//         this.name = arr[0];
//         this.surname = arr[1];
//     }
// }

// console.log(user);

// user.fullName = "Вася Пупкин";

// console.log(user);

const product = {
    plainBurger: {
        name: 'Гамбургер простой',
        cost: 10000,
        kcall: 400,
        amount: 0,
        get summ() {
            return this.cost * this.amount;
        },
        get sumkcall() {
            return this.kcall * this.amount;
        }
    },
    freshBurger: {
        name: 'Гамбургер FRESH',
        cost: 20500,
        kcall: 500,
        amount: 0,
        get summ() {
            return this.cost * this.amount;
        },
        get sumkcall() {
            return this.kcall * this.amount;
        }
    },
    freshCombo: {
        name: 'FRESH COMBO',
        cost: 31900,
        kcall: 700,
        amount: 0,
        get summ() {
            return this.cost * this.amount;
        },
        get sumkcall() {
            return this.kcall * this.amount;
        }
    },
};

const extraProduct = {
    doubleMayonnaise: {
        name: "Двойной майонез",
        cost: 500,
        kcall: 60,
    },
    lettuce: {
        name: "Салатный лист",
        cost: 300,
        kcall: 20,
    },
    cheese: {
        name: "Сыр",
        cost: 1000,
        kcall: 100,
    },
};



const btn = document.querySelectorAll('.main__product-btn');


for (let i = 0; i < btn.length; i++) {
    const element = btn[i];

    element.addEventListener('click', function (e) {
        e.preventDefault()
        add(this)
    })
}

function add(button) {

    let symbol = button.getAttribute('data-symbol');
    let parent = button.closest('.main__product');
    let id = parent.getAttribute('id');

    if (symbol == '+') {
        product[id].amount++;
    } else if (product[id].amount > 0) {
        product[id].amount--;
    }

    let output = parent.querySelector('.main__product-num');
    let productPrice = parent.querySelector('.main__product-price span');
    let productKcall = parent.querySelector('.main__product-kcall span');

    output.innerHTML = product[id].amount;
    productPrice.innerHTML = product[id].summ;
    productKcall.innerHTML = product[id].sumkcall;
    console.log(product[id].amount);

}

const checkbox = document.querySelectorAll('.main__product-checkbox');

for (let i = 0; i < checkbox.length; i++) {
    const element = checkbox[i];

    element.addEventListener('click', function () {
        addIngredient(this);
    })

}

function addIngredient(check) {
    let parent = check.closest('.main__product');
    let parentId = parent.getAttribute('id');
    let checkId = check.getAttribute('data-extra');
    let checked = check.checked;
    product[parentId][checkId] = checked;

    if (product[parentId][checkId] == true) {
        product[parentId].cost += extraProduct[checkId].cost;
        product[parentId].kcall += extraProduct[checkId].kcall;
    } else {
        product[parentId].cost -= extraProduct[checkId].cost;
        product[parentId].kcall -= extraProduct[checkId].kcall;
    }

    let cost = parent.querySelector('.main__product-price span');
    let kcall = parent.querySelector('.main__product-kcall span');
    cost.innerHTML = product[parentId].summ;
    kcall.innerHTML = product[parentId].sumkcall;
    console.log(product[parentId]);
}
// console.log(checkbox);

const addCart = document.querySelector('.addCart');
const receipt = document.querySelector('.receipt');
const receiptWindow = document.querySelector('.receipt__window');
const receiptWindowOut = document.querySelector('.receipt__window-out');
const receiptWindowBtn = document.querySelector('.receipt__window-btn');


let arrProduct = [],
    totalName = '',
    totalPrice = 0,
    totalKcall = 0;

addCart.addEventListener('click', function () {
    for (const key in product) {
        let el = product[key];

        if (el.amount > 0) {
            arrProduct.push(el);

            for (const key2 in el) {
                console.log(key2);
                if (el[key2] === true) {
                    el.name += '\n' + extraProduct[key2].name;
                }
            }

        }

        console.log(el);
    }
    for (let i = 0; i < arrProduct.length; i++) {
        const element = arrProduct[i];
        totalName += element.name + '\n' + `В количестве: ${element.amount} шт.\n\n`;
        totalPrice += element.summ;
        totalKcall += element.sumkcall;
    }
    receiptWindowOut.innerHTML = `<h1>Вы заказали</h1> \n${totalName}\nКаллорийность: ${totalKcall}\nСтоимость покупки: ${totalPrice} сумм`


    if (totalPrice > 0) {
        receipt.style.display = 'flex';
        setTimeout(() => {
            receipt.style.opacity = 1;
            receiptWindow.style.top = 0;
        }, 100);
        document.body.style.overflow = 'hidden';

        let output = document.querySelectorAll('.main__product-num'),
            spanPrice = document.querySelectorAll('.main__product-price span'),
            spanKcall = document.querySelectorAll('.main__product-kcall span');

        for (let i = 0; i < output.length; i++) {

            output[i].innerHTML = 0;
            spanPrice[i].innerHTML = 0;
            spanKcall[i].innerHTML = 0;

        }

    }
})

receiptWindowBtn.addEventListener('click', function () {  
    window.location.reload();
})


console.log(window);