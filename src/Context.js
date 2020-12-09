import React, { Component } from 'react'
import { storeProducts, detailProduct } from './data'

const ProductContext = React.createContext();

class ProductProvider extends Component {
    state = {
        product: [],
        details: detailProduct,
        cart: [],
        modalOpen: false,
        modalProduct: detailProduct,
        cartSubTotal: 0,
        cartTotal: 0,
        cartTax: 0
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
        this.setState(() => { return { product: tempProduct, cart: [...this.state.cart, product] } }, () => {
            this.addTotals();
        })
    }

    openModal = id => {
        const product = this.getItems(id);
        this.setState(() => {
            return { modalProduct: product, modalOpen: true }
        })
    }

    incrimant = id => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(product => product.id === id);
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
        product.count = product.count + 1;
        product.total = product.count * product.price;

        this.setState(
            () => {
                return {
                    cart: [...tempCart],
                }
            }, () => {
                this.addTotals();
            });

    }

    decrement = id => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(product => product.id === id);
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
        product.count = product.count - 1;
        if (product.count === 0) {
            this.removeItem(id);
        } else {
            product.total = product.count * product.price;

            this.setState(
                () => {
                    return {
                        cart: [...tempCart],
                    }
                }, () => {
                    this.addTotals();
                });
        }
    }

    removeItem = id => {
        let tempProduct = [...this.state.product];
        let tempCart = [...this.state.cart];

        tempCart = tempCart.filter(product => product.id !== id);
        const index = tempProduct.indexOf(this.getItems(id));
        let removedProduct = tempProduct[index];
        removedProduct.inCart = false;
        removedProduct.count = 0;
        removedProduct.total = 0;

        this.setState(
            () => {
                return {
                    cart: [...tempCart],
                    product: [...tempProduct]
                }
            }, () => {
                this.addTotals();
            });
    }

    clearCart = () => {
        this.setState(() => {
            return { cart: [] }
        }, () => {
            this.setProduct();
            this.addTotals();
        })
    }

    closeModal = () => {
        this.setState(() => {
            return { modalOpen: false }
        })
    }
    addTotals = () => {
        let subTotal = 0;
        this.state.cart.map(items => (subTotal += items.total));
        const tempTax = subTotal * 0.13;
        const tax = parseFloat(tempTax.toFixed(2));
        const total = subTotal + tax;
        this.setState(() => {
            return {
                cartSubTotal: subTotal,
                cartTotal: total,
                cartTax: tax,
            }
        })
    }
    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state,
                handelDetail: this.handelDetail,
                addToCart: this.addToCart,
                openModal: this.openModal,
                closeModal: this.closeModal,
                clearCart: this.clearCart,
                removeItem: this.removeItem,
                decrement: this.decrement,
                incrimant: this.incrimant
            }}>
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer }
