import React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

import HomePage from './pages/homepage.component';
import ShopPage from './pages/Shop/shop.component';
import Header from './components/Header/header.component';
import SignInandSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors'; 



class App extends React.Component {

  unsubscribeFromAuth = null;

componentDidMount() {
  const {setCurrentUser} = this.props;

  this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    if (userAuth) {
      const userRef = await createUserProfileDocument(userAuth);

      userRef.onSnapshot(snapShot => {
        setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      } 
      //wrap in else block so setState doesn't fire twice
      setCurrentUser(userAuth);
    });
  }
          

componentWillUnmount() {
  this.unsubscribeFromAuth();
}

render() {
  return (
    <div>
      <Header/>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route  
        exact 
        path='/signin' 
        render={() => 
          this.props.currentUser ? (
        <Redirect to='/' />
        ) : (
          <SignInandSignUpPage />
        )
        }
        />
      </Switch>
    </div>
  );
}
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);