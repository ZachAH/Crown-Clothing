import React from 'react';
import FormInput from '../form-input/from-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { signInWithGoogle } from '../../firebase/firebase.utils';



import './sign-in.styles.scss';

class SignIn extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = event => {
        event.PreventDefault();

        this.setState({ email: '', password: ' '})
    };

    handleChange = event => {
        const { value, name } = event.target;

        this.setState({ [name]: value })
    };

    render() {
        return(
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput
                    name='email' 
                    type='email' 
                    handleChange={this.handleChange}
                    value={this.state.email}
                    label="email" 
                     required 
                     />
                    <label>Email</label>
                    <FormInput 
                    name='password' 
                    type='password' 
                    value={this.state.password}
                    handleChange={this.handleChange} 
                    label="password"
                    required 
                    />
                    

                    <CustomButton type='submit' value='Submit Form'> Sign In </CustomButton>
                    <CustomButton onClick={signInWithGoogle}> 
                    {''}
                    Sign In With Google{''}
                    </CustomButton>
                </form>
            </div>
        );
    }
}

export default SignIn;