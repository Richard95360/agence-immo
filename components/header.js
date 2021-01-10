import React,{useState} from "react";
import { 
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavItem, 
    MDBNavbarToggler, 
    MDBCollapse, 
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu, 
    MDBDropdownItem,
    MDBIcon
 } from "mdbreact";
 import Link from "next/link";
 import useAuth from '../auth/context';
 import {useRouter} from 'next/router';

 export const Header = () => {
    const [isOpen, setIsOpen ] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen)
    }
     const {logout,user,isAuthenticated} = useAuth();
     const router = useRouter();
     return(
         <MDBNavbar color="default-color-dark" expand="md" dark>
             <MDBNavbarToggler onClick={handleToggle}/>
             <MDBCollapse id="navbarCollapse" navbar isOpen={isOpen}>
                <MDBNavbarNav left>
                    <MDBNavItem active={router.pathname === "/"}>
                        <Link href="/">
                        <div className="nav-link">
                           <MDBIcon icon="home" className="mr-1"/>
                           Home
                        </div>
                        </Link>
                        
                    </MDBNavItem>
                    <MDBNavItem>
                        <Link href="/properties">
                        <a className="nav-link">
                            Liste des biens
                        </a>

                        </Link>
                    </MDBNavItem>
                    {
                        isAuthenticated && user.role === "admin" && (
                            <MDBNavItem>
                        <Link href="/property/list">
                        <a className="nav-link">
                            Dashboard
                        </a>

                        </Link>
                    </MDBNavItem>
                        )
                    }
                </MDBNavbarNav>
                <MDBNavbarNav right>
                    <MDBNavItem active={router.pathname === "/contact"}>
                        <Link href="/contact">
                            <a className="nav-link">
                                <MDBIcon icon="address-book" className="mr-1"/>
                                Contact
                            </a>
                        </Link>
                    </MDBNavItem>
                    {
                        !isAuthenticated && (
                            <MDBNavItem active={router.pathname === "/login"}>
                        <Link href="/login">
                            <a className="nav-link">
                                <MDBIcon icon="user-alt" className="mr-1"/>
                                Connexion
                            </a>
                        </Link>
                    </MDBNavItem>

                        )
                    }
                    {
                        isAuthenticated && (

                            <>
                            <MDBNavItem>
                                <div className="nav-link">
                                <MDBIcon icon="user-alt" className="mr-1"/>
                                Bonjour {user.username}
                                </div>
                            </MDBNavItem>

                            <MDBNavItem>
                                <div className="nav-link" onClick={logout}>
                                <MDBIcon icon="power-off" className="mr-1"/>
                                Deconnexion
                                </div>
                            </MDBNavItem>
                            </>
                        )
                    }
                   
                </MDBNavbarNav>
             </MDBCollapse>
         </MDBNavbar>
     )
 }