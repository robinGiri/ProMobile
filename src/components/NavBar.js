import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import logo from '../logo.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { ButtonContainer } from './Button'

export default class NavBar extends Component {
    render() {
        return <nav className="navbar bg-primary navbar-expand-sm navbar-dark">
            {/* 
        https://www.iconfinder.com/icons/1243689/call_phone_icon
        Creative Commons (Attribution 3.0 Unported);
        https://www.iconfinder.com/Makoto_msk */}
            <Link to="/">
                <img src={logo} alt="logo" className="navbar-brand" />
            </Link>
            <ul className="navbar-nav align-items-center">
                <li className="nav-item ml-5">
                    <Link to="/" className="nav-link">
                        Products
                    </Link>
                </li>
            </ul>
            <Link to="/cart" className="ml-auto">
                <ButtonContainer>
                    <span className="mr-2">
                    <FontAwesomeIcon icon={faShoppingCart} />
                    </span>
                         my cart
                        </ButtonContainer>
            </Link>
        </nav>
    }
}
