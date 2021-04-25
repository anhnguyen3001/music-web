import { RoutePaths } from 'app/constants';
import useClickOutside from 'app/hooks/useClickOutside';
import { RootState } from 'app/redux';
import HamburgerIcon from 'assets/images/hamburger-icon.svg';
import Logo from 'assets/images/logo.png';
import SearchIcon from 'assets/images/search-icon.svg';
import React, { useEffect, useRef, useState } from 'react';
import { Col, Dropdown, Form, Nav, Navbar, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import './style.scss';
import ArrowDown from 'assets/images/arrow-down.svg';
import { signOut } from 'app/redux/modules/auth';
import ModalLogin from '../modal-login';

interface Props {
    showSidebar: boolean,
    toggleSidebar: () => void
}

const Header: React.FC<Props> = (props: Props) => {
    const { toggleSidebar, showSidebar } = props;
    const [inputVisible, setInputVisible] = useState<boolean>(false);
    const [keyword, setKeyWord] = useState<string>('');
    const history = useHistory();
    const { pathname } = useLocation();
    let searchInputRef = useRef<any>();

    const { access_token, name, image } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const [isVisible, setVisible] = useState<boolean>(false);
    
    useEffect(() => {
        
    }, [searchInputRef]);

    useEffect(() => {
        if (!/\/search/.test(pathname) && keyword) {
            closeSearch()
        }
    }, [pathname]);

    const toggleModalLogin = () => {
        setVisible(!isVisible)
    }

    const handleSearch = (e: any) => {
        e.preventDefault();
        if (keyword) {
            history.push(`${RoutePaths.Search.Index}/${keyword}`);
        } else {
            setInputVisible(!inputVisible);
        }
    }

    const handleChange = (e: any) => {
        setKeyWord(e.target.value);
    }

    const closeSearch = () => {
        setKeyWord('');
        setInputVisible(false);
    }

    useClickOutside(searchInputRef, closeSearch);

    const handleSignOut = () => {
        localStorage.removeItem('access_token');
        dispatch(signOut());
    }

    return (
        <header className={`header ${showSidebar && 'show-sidebar'}`}>
            <div className="custom-container h-100">
                <Row className='align-items-center justify-content-between h-100'>
                    <Col md={5} xs={1}>
                        <div className='hamburger-icon pointer' onClick={toggleSidebar}>
                            <img src={HamburgerIcon} alt='hamburger menu'/>
                        </div>

                        <Navbar className='w-100'>
                            <NavLink to={RoutePaths.Home.Index}>
                                <img className='logo-img' src={Logo} alt='app logo'/>
                            </NavLink>

                            <Nav>
                                <NavLink 
                                    to={RoutePaths.Home.Index}
                                    exact
                                    className='menu-item' 
                                    activeClassName='menu-item--active'
                                >
                                    Discovery
                                </NavLink>

                                <NavLink 
                                    to={RoutePaths.Genre.Index}
                                    exact
                                    className='menu-item'
                                    activeClassName='menu-item--active'
                                >
                                    Genre
                                </NavLink>

                                <NavLink 
                                    to={RoutePaths.Singer.Index}
                                    exact
                                    className='menu-item'
                                    activeClassName='menu-item--active'
                                >
                                    Singer
                                </NavLink>
                            </Nav>
                        </Navbar>
                    </Col>

                    <Col md={5} xs={7} className='text-right d-flex justify-content-end align-items-center'>
                        <Form inline className='search-box' onSubmit={handleSearch}>
                            <div 
                                className={`d-flex w-100 search-input-group justify-content-end ${inputVisible ? 'show' : 'hide'}`}
                                ref={el => searchInputRef.current = el}>
                                <input 
                                    placeholder='Search'
                                    className='search-input'
                                    onChange={handleChange}
                                    value={keyword}
                                />

                                <div 
                                    className='d-flex align-items-center search-icon-container pointer'
                                    onClick={handleSearch}>
                                    <img className='search-icon' src={SearchIcon} alt='search' />
                                </div>
                            </div>
                        </Form>

                        <div className='user d-none d-md-inline'>
                            {access_token ? (
                                <>
                                    <Dropdown>
                                        <Dropdown.Toggle className='user-dropdown'>
                                            <img className="user-avatar" src={image} alt='user avatar' />
                                            <span className="user-name">    
                                                {name}
                                            </span>
                                            <img className="arrow" src={ArrowDown} />
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={handleSignOut}>
                                                Log Out
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </>
                                ) : (
                                    <span className='signin pointer' onClick={toggleModalLogin}>
                                        Sign In
                                    </span>
                                )
                            }
                        </div>
                    </Col>
                </Row>
            </div>
            
            <ModalLogin 
                show={isVisible}
                handleClose={toggleModalLogin}
            />
        </header>
    );
}

export default Header;
