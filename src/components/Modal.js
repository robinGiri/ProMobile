import React, { Component } from 'react'
import { ProductConsumer } from '../Context'
import { Link } from 'react-router-dom'
import { ButtonContainer } from './Button'
import styled from 'styled-components'


export default class Modal extends Component {
    render() {
        return (
            <ProductConsumer>
                {(value) => {
                    const { modalOpen, closeModal } = value;
                    const { price, img, title } = value.modalProduct;

                    if (!modalOpen) {
                        return null
                    }
                    else {
                        return (<ModalContainer>
                            <div className="container">
                                <div className="row">
                                    <div id="modal" className="col-8 mx-auto col-md-6 col-lg-4 text-center p-5 text-capitalize">
                                        <h5>Items Added to cart</h5>
                                        <img src={img} alt="product detail" className="card-img-top" />
                                        <h5>{title}</h5>
                                        <h5 className="text-muted">Price: ${price}</h5>
                                        <Link to='/'>
                                            <ButtonContainer onClick={() => closeModal()}>
                                                continue shoping
                                        </ButtonContainer>
                                        </Link>
                                        <Link to='/cart'>
                                            <ButtonContainer detail onClick={() => closeModal()}>
                                                go to cart
                                        </ButtonContainer>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </ModalContainer>);
                    }
                }}
            </ProductConsumer>
        )
    }
}

const ModalContainer = styled.div`
position: fixed;
left:0;
right:0;
bottom:0;
top:0;
background:rgba(0,0,0,0.3);
display: flex;
align-items: center;
justify-content: center;
#modal {
    background: var(--mainWhite)
}
`
