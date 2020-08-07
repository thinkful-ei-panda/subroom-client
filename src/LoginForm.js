import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import TokenService from './services/token-service'
import AuthService from './services/auth-service'

class LoginForm extends Component {
    static defaulProps = {
        onLoginSuccess: () => {}
    }

    state = { error: null }

    handleSubmitJwtAuth = ev => {
        ev.preventDefault()
        this.setState({ error: null })
        const { user_name, password } = ev.target
    
        AuthService.postLogin({
          user_name: user_name.value,
          password: password.value,
        })
          .then(res => {
            user_name.value = ''
            password.value = ''
            TokenService.saveAuthToken(res.authToken)
            this.props.history.push('/dashboard')
            this.props.onLoginSuccess()
            
          })
          .catch(res => {
            this.setState({ error: res.error })
          })
      }

    render() {
        const { error } = this.state
        return (
            <form className="LoginForm" onSubmit={this.handleSubmitJwtAuth}>
                <div role='alert'>
                    {error && <p className='red'>{error}</p>}
                </div>
                <div className="Login_name">
                    <label htmlFor="Login__user_name">User Name</label>
                    <input required type="text" id="user_name" name="user_name"></input>
                </div>
                <div className="Login_password">
                    <label htmlFor="Login__password">Password</label>
                    <input required type="password" id="password" name="password"></input>
                </div>
                <button type="submit">
                    Login
                </button>
            </form>
        )
    }
}
export default withRouter(LoginForm)