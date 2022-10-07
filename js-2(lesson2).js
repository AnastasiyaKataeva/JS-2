class GoodItem {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }
    render() {
        return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
    }

    fetchGoods(){
        this.goods = [
            { title: 'Shirt', price: 150 },
            { title: 'Socks', price: 50 },
            { title: 'Jacket', price: 350 },
            { title: 'Shoes', price: 250 },
            { title: 'Jeans', price: 50 },
            { title: 'Skirt', price: 350 },
            { title: 'Cap', price: 250 },
        ]
    }

    render () {
        let listHtml = "";
        this.goods.forEach(function (good) {
            const  goodItem = new GoodItem(good.title, good.price);
            listHtml += goodItem.render();
        })
        document.querySelector('.goods-list').innerHTML = listHtml;
    }

    getTotalprice() {
        let totalPrice = 0;
        this.goods.forEach(function(good) {
            totalPrice += good.price;
        })
        return totalPrice;
    }
}

class Cart {
    addCartItem(cartItem) {
    }
    removeCartItem(cartItem) {
    }
}

class CartItem {
    goodItem = null;

    constructor(goodItem) {
        if (typeof goodItem !== GoodItem) {
            console.error('The type of argument goodItem is not GoodItem class.')
        }

        this.goodItem = goodItem;
    }
}

const list = new GoodsList();
list.fetchGoods();
list.render();
