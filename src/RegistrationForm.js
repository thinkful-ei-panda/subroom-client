import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import AuthService from './services/auth-service'

class LoginForm extends Component {
    static defaulProps = {
        onRegistrationSuccess: () => {}
    }

    state = { error: null }

    handleSubmit = ev => {
        ev.preventDefault()
        const { user_name, password } = ev.target

        this.setState({ error: null })
        AuthService.postUser({
            user_name: user_name.value,
            password: password.value,
        })
            .then(user => {
                user_name.value = ''
                password.value = ''
                this.props.history.push('/login')
                this.props.onRegistrationSuccess()
            })
            .catch(res => {
                this.setState({ error: res.error})
            })
    
        
      }

    render() {
        const { error } = this.state
        return (
            <form className="RegistrationForm" onSubmit={this.handleSubmit}>
                <div role='alert'>
                    {error && <p className='red'>{error}</p>}
                </div>
                <div className="Registration_name">
                    <label htmlFor="Registration__user_name">User Name</label>
                    <input required type="text" id="user_name" name="user_name"></input>
                </div>
                <div className="Registration_password">
                    <label htmlFor="Registration__password">Password</label>
                    <input required type="password" id="password" name="password"></input>
                </div>
                <button type="submit">
                    Register
                </button>
            </form>
        )
    }
}
export default withRouter(LoginForm)