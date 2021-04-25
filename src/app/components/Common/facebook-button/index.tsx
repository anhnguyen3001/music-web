import { signIn } from 'app/redux/modules/auth';
import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { useDispatch } from 'react-redux';
import './style.scss';

interface Props {
    callbacks: () => void,
}
 
const FacebookButton: React.FC<Props> = (props: Props) => {
    const { callbacks } = props;
    const dispatch = useDispatch();

    const responseFacebook = (response: any) => {
        console.log(response)
        if (response.accessToken) {
            dispatch(signIn(response.accessToken));
            callbacks();
        }
    }

    return (
        <FacebookLogin
        appId="176655310827747"
        fields="name,email,picture"
        callback={responseFacebook} 
        cssClass="my-facebook-button-class"
        icon="fa-facebook"/>
    )
}

export default FacebookButton;
