import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from './services/token-service'

export default class Header extends Component {
    handleLogoutClick = () => {
        TokenService.clearAuthToken()
        this.forceUpdate();
    }

   

    renderLogoutLink() {
        return(
            <div className = 'logged-in'>
                <Link
                    onClick={this.handleLogoutClick}
                    to='/'>
                    Logout
                </Link>
            </div>
        )
    }

    renderLoginLink() {
        return (
            <div className='not-logged-in'>
                <Link
                    to='/register'>
                        Register
                </Link>
                <Link
                    to='/login'>
                        Log in
                </Link>
            </div>
        )
    }

    render() {
        return (
            <nav className='header'>
                <h1>
                    <Link to='/'>
                        Dashboard
                    </Link>
                </h1>
                {TokenService.hasAuthToken()
                    ? this.renderLogoutLink()
                    : this.renderLoginLink()}
            </nav>
        )
    }
}