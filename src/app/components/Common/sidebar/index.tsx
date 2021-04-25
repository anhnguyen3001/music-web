import { RoutePaths } from 'app/constants';
import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './style.scss';
import Logo from 'assets/images/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'app/redux';
import { signOut } from 'app/redux/modules/auth';
import ModalLogin from '../modal-login';

interface Props {
    isVisible: boolean,
    myRef: (el: any) => void;
}

const SideBar: React.FC<Props> = (props: Props) => {
    const { isVisible, myRef } = props;
    const { access_token, name, image } = useSelector((state: RootState) => state.auth);
    const [visibleLogin, setVisibleLogin] = useState<boolean>(false);
    const dispatch = useDispatch();

    const handleAuth = () => {
        if (access_token) {
            localStorage.removeItem('access_token');
            dispatch(signOut());
        } else {
            toggleModalLogin();
        }
    }

    const toggleModalLogin = () => {
        setVisibleLogin(!visibleLogin)
    }

    return (
        <div ref={myRef} className={`sidebar ${isVisible && 'show'}`}>
            <Nav className='w-100 flex-column'>
                <NavLink 
                    to={RoutePaths.Home.Index}
                    className='app-logo' 
                    activeClassName='sidebar-item--active'
                >
                    <img className='logo-img' src={Logo} alt='app logo'/>
                </NavLink>

                <NavLink 
                    to={RoutePaths.Home.Index}
                    exact
                    className='sidebar-item' 
                    activeClassName='sidebar-item--active'
                >
                    Discovery
                </NavLink>

                <NavLink 
                    to={RoutePaths.Singer.Index}
                    exact
                    className='sidebar-item'
                    activeClassName='sidebar-item--active'
                >
                    Singer
                </NavLink>

                <NavLink 
                    to={RoutePaths.Genre.Index}
                    exact
                    className='sidebar-item'
                    activeClassName='sidebar-item--active'
                >
                    Genre
                </NavLink>

                <div className='sidebar-item signin' onClick={handleAuth}>
                    {access_token ? 'Log Out': 'Sign In'}
                </div>
            </Nav>

            {access_token ? (
                <>
                    <div className="user">
                        <img className="user-avatar" src={image} alt='user avatar' />
                        <span className="user-name">    
                            {name}
                        </span>
                    </div>
                </>
            ) : null}

            <ModalLogin 
                show={visibleLogin}
                handleClose={toggleModalLogin}
            />
        </div>
    )
}

export default SideBar;
