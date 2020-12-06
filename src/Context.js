import React, { Component } from 'react'
import { storeProducts, detailProduct } from './data'

const ProductContext = React.createContext();

class ProductProvider extends Component {
    state = {
        product: [],
        details: detailProduct,
        cart: [],
        modalOpen: false,
        modalProduct: detailProduct
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
        let tempProduct = [...this.state.product]
        const index = tempProduct.indexOf(this.getItems(id));
        const product = tempProduct[index];
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price;
        this.setState(() => { return { product: tempProduct, cart: [...this.state.cart, product] } })
    }

    openModal = id => {
        const product = this.getItems(id);
        this.setState(() => {
            return { modalProduct: product, modalOpen: true }
        })
    }

    closeModal = () => {
        this.setState(() => {
            return { modalOpen: false }
        })
    }
    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state,
                handelDetail: this.handelDetail,
                addToCart: this.addToCart,
                openModal: this.openModal,
                closeModal: this.closeModal
            }}>
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer }
