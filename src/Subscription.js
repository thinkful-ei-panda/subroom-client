import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import config from './config'
import TokenService from './services/token-service'

 function Subscription(props) {
    
    const deleteSubscriptionRequest = () => {
        
        fetch(`${config.API_ENDPOINT}/api/subscriptions/${props.id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            }
        })
            .then(res => {
                if(!res.ok) {
                    return res.json().then(error => {
                        throw error
                    })
                }
                props.deleteSubscription(props.id)
                
            })
            .catch(error => {
                console.error(error)
            })
    }
    
    
    
    return(
        <section className="subscription-entries">
        <div className='subscriptionInfo'>

            <p>Subscription Name: {props.name}</p>
            <p>Monthly Cost: {props.price}</p>
            <p>Subscription Username: {props.username}</p>
            <p>Subscription Password: {props.password}</p>
            <p>Payment Type: {props.category}</p>
        </div>
        <div className="buttons"> 
            <button onClick={ deleteSubscriptionRequest }>
                Delete
            </button>
        </div>
        <Link to={`/edit/${props.id}`}>
            <button type="button">
                Edit
            </button>
            </Link>
        </section>
    )
}

export default withRouter(Subscription)