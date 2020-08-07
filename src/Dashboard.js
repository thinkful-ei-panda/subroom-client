import React from 'react'
import {Link }from 'react-router-dom'
import Subscription from './Subscription'
import config from './config'
import TokenService from './services/token-service'
import Header from './Header'
import './Dashboard.css'

export default class Dashboard extends React.Component {

    state = {
        subscriptions: []
    }
    
    componentDidMount() {
        Promise.all([
          fetch(`${config.API_ENDPOINT}/api/subscriptions`, {
            method: 'GET',
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
        })
        ])
          .then(([subscriptionsRes]) => {
            return Promise.all([subscriptionsRes.json()]);
          })
          .then(([subscriptions]) => {
            this.setState({
              subscriptions
            })
          })
          .catch(error => {
            console.log({error})
          })
      }

      deleteSubscription = subscriptionId => {
    
        this.setState({
          subscriptions: this.state.subscriptions.filter(subscription => subscription.id !== subscriptionId)
        })
      }

      
    render(){
    return(
        <section className='DashboardMain'>
            <header className='App-header'>
                <Header />
            </header>
            <section className="add-new-subscription">
            <Link to="/addSubscription">
            <button>
                Add New Subscription
            </button>
            </Link>
            </section>
            <ul>
                {this.state.subscriptions.map(subscription =>
                  <li key={subscription.id}>
                      <Subscription
                        id={subscription.id}
                        name={subscription.subscription_name}
                        price={subscription.subscription_price}
                        username={subscription.subscription_user_name}
                        password={subscription.subscription_password}
                        category={subscription.category}
                        deleteSubscription={this.deleteSubscription}/>

                        

                  </li>  
                  )}
            </ul>
            
            
            </section>
    )
    }
}