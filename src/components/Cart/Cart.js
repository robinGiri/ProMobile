import React, { Component } from 'react'
import Title from '../Title'
import CartColumn from './CartColumn'
import EmptyCart from './EmptyCart'
import { ProductConsumer } from '../../Context'
import CartList from './CartList'
import CartTotals from './CartTotals'

export default class Cart extends Component {
    render() {
        return (
            <section>
                <ProductConsumer>
                    {value => {
                        const { cart } = value;

                        if (cart.length > 0) {
                            return (
                                <React.Fragment>
                                    <Title name="Your" title="Cart" />
                                    <CartColumn />
                                    <CartList value={value} />
                                    <CartTotals value={value} history={this.props.history} />
                                </React.Fragment>
                            )
                        } else {
                            return (
                                <EmptyCart />
                            )
                        }
                    }}
                </ProductConsumer>
            </section>
        )
    }
}
