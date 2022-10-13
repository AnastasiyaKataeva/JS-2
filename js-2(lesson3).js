const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

function makeGetRequests(url) {
    return new Promise(function(resolve) {
        let xhr;
        if (XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                resolve(xhr.responseText);
            }
        }
        xhr.open('GET', url, true);
        xhr.send();
    })
        .catch((reason) => console.log(reason))
}


class GoodsItems {
    constructor(product_name, price) {
        this.product_name = product_name;
        this.price = price;
    }
    render() {
        return `<div class="goods-item"><h3>${this.product_name}</h3><p>${this.price}</p></div>`;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
    }
    addCartItem(goodItem) {
        this.goods.push(goodItem)
    }

    removeCartItem(goodItem) {
        const index = this.goods.indexOf(goodItem)

        if (index >= 0) {
            this.goods = this.goods.splice(index, 1)
        }
    }

    getItems() {
        return this.goods
    }

    fetchGoods(cb){
        // this.goods = [
        //     { product_name: 'Shirt', price: 150 },
        //     { product_name: 'Socks', price: 50 },
        //     { product_name: 'Jacket', price: 350 },
        //     { product_name: 'Shoes', price: 250 },
        //     { product_name: 'Jeans', price: 50 },
        //     { product_name: 'Skirt', price: 350 },
        //     { product_name: 'Cap', price: 250 },
        // ]
        makeGetRequests(`${API_URL}/catalogData.json`).then((goods) => {
            this.goods = JSON.parse(goods);
            cb();
        })
    }

    render () {
        let listHtml = "";
        this.goods.forEach(good => {
            const  goodItem = new GoodsItems(good.product_name, good.price);
            listHtml += goodItem.render();
        })
        document.querySelector('.goods-list').innerHTML = listHtml;
    }
}

const list = new GoodsList();
list.fetchGoods(() => {
    list.render();
});
