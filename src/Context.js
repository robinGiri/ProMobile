import React, { Component } from 'react'
import { storeProducts, detailProduct } from './data'

const ProductContext = React.createContext();

class ProductProvider extends Component {
    state = {
        product: [],
        drtail: detailProduct
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
        })

    }
    handelDetail = () => {
        console.log('hay from detail')
    }
    addToCart = () => {
        console.log('lala cart')
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
