import React, { Component } from 'react'
import { storeProducts, detailProduct } from './data'

const ProductContext = React.createContext();

class ProductProvider extends Component {
    state = {
        product: [],
        details: detailProduct
    }
    componentDidMount() {
        this.setProduct();
    }

    setProduct = () => {
        let tempProducts = [];
        storeProducts.forEach(items => {
            const singleItme = { ...items }
            tempProducts = [...tempProducts, singleItme];
        });
        this.setState(() => {
            return { product: tempProducts }
        });
    }

    getItems = (id) => {
        return this.state.product.find(items => items.id === id);
    }

    handelDetail = (id) => {
        const product = this.getItems(id);
        this.setState(() => {
            return { details: product }
        })
    }
    addToCart = (id) => {
        console.log(`lala cart from ${id}`)
    }
    render() {
        return (
            <ProductContext.Provider value={{ ...this.state, handelDetail: this.handelDetail, addToCart: this.addToCart }}>
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer }
