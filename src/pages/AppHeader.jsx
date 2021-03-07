import React, {useEffect, useState} from 'react'
import { NavLink } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';


export const AppHeader = () => {

    

  
        return <nav className="app-header flex " >
            <ul className="flex space-between">
                <li><NavLink to=""><HomeIcon/></NavLink></li>      
                <li><NavLink to="">About Us</NavLink></li>
                <li><NavLink to="">Contact Us</NavLink></li>
            </ul>
            <div className="cart">
            <NavLink to=""><ShoppingCartIcon/></NavLink> 
            </div>
        </nav>;
}