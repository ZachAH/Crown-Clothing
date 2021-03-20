import React from 'react';
import { Route, Switch } from 'react-router';

import './App.css';

import HomePage from './pages/homepage.component';
import ShopPage from './pages/Shop/shop.component';
import Header from './components/Header/header.component';
import SignInandSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';



class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    };
  }

  unsubscribeFromAuth = null;

componentDidMount() {
  this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    if (userAuth) {
      const userRef = await createUserProfileDocument(userAuth);

      userRef.onSnapshot(snapShot => {
        this.setState({
          currentUser: {
            id: snapShot.id,
            ...snapShot.data()
          }
        });
      });
    } 
    //wrap in else block so setState doesn't fire twice
    this.setState({currentUser: userAuth});
  });
}

componentWillUnmount() {
  this.unsubscribeFromAuth();
}

render() {
  return (
    <div>
      <Header currentUser={this.state.currentUser} />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route path='/signin' component={SignInandSignUpPage} />
      </Switch>
    </div>
  );
}
}

export default App;