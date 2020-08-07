import React from 'react'
import { Route } from 'react-router-dom'
import Dashboard from './Dashboard'
import AddSubscription from './AddSubscription'
import LoginPage from './LoginForm'
import EditSubscription from './EditSubscription'
import PublicOnlyRoute from './PublicOnlyRoute'
import LandingPage from './LandingPage'
import RegistrationPage from './RegistrationForm'

class App extends React.Component {
  state = {
  subscriptions: [],
  hasError: false
  }

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }




  handleAddSubscription = subscription => {
    this.setState({
      subscriptions: [
        ...this.state.subscriptions,
        subscription
      ]
    })
  }

  handleUpdateSubscription = updatedSubscription => {
    const newSubscriptions = this.state.subscriptions.map(sub =>
      (sub.id === updatedSubscription.id)
        ? updatedSubscription
        : sub
        )
        this.setState({
          subscriptions: newSubscriptions
        })
  }

  render() {
  return (
    <main className='App'>
      <section className="app-with-header">
      {this.state.hasError && <p className='red'>There was an error! Oh no!</p>}

      <Route 
        exact path='/'
        component={LandingPage}
        />
      <Route
        exact path='/dashboard'
        component={Dashboard}
        />
      

      <Route 
        exact path='/addSubscription' 
        render={() => 
        <AddSubscription
         addSubscription={this.handleAddSubscription}
        />}
      />
      </section>

      <Route 
        exact path='/edit/:subscriptionId' 
        render={() => 
        <EditSubscription
         updateSubscription={this.handleUpdateSubscription}
        />}
      />

      <PublicOnlyRoute
        exact path={'/login'}
        component={LoginPage}
        />

      <PublicOnlyRoute
        exact path={'/register'}
        component={RegistrationPage}
        />
      
      </main>
    
  );
}
}

export default App;