import { Search, AddShoppingCart, Menu } from '@mui/icons-material'
import React from 'react'
import { Link } from 'react-router-dom'
import { firebaseAuth } from '../../Firebase'
import { Constants } from '../Constant'
import { UseStateValue } from '../StateContext/StateContext'
import style from './Header.module.css'
export const Header = () => {
  const { items, user } = UseStateValue();
  const logout = () => {
    firebaseAuth().signOut();
  }
  const handleNavigation = (route) => user ? route : Constants.loginPath;

  return (
    <>
      <div className={style.header}>
        <div>
          <Link to={Constants.homePath}>
            <img
              alt="amazon-img"
              className={style.header__logo}
              src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
            />
          </Link>
        </div>

        <div className={style.header__search}>
          <input type='text' className={style.header__searchInput} />
          <Search className={style.header__searchIcon} />

        </div>

        <div className={style.header__nav}>
          <Link to={Constants.loginPath}>
            <div className={style.header__option}>
              <span className={style.header__optionLineOne}>Hello {user ? user.email : 'Guest'}</span>
              {user ?
                <span className={style.header__optionLineTwo} onClick={logout}>{'Sign Out'}</span> :
                <span className={style.header__optionLineTwo}>{'Sign In'}</span>
              }
            </div>
          </Link>

          <Link to={handleNavigation('orders')}>

            <div className={style.header__option}>
              <span className={style.header__optionLineOne}>Returns</span>
              <span className={style.header__optionLineTwo}>& Orders</span>
            </div>
          </Link>
          <Link to={Constants.checkoutPath}>
            <div className={style.header__optionBasket}>
              <AddShoppingCart className={style.header__basketCountIcon} />
              <span className={`${style.header__optionLineTwo} ${style.header__basketCount}`}>
                {items && items.length}
              </span>
            </div>
          </Link>
        </div>
      </div>
      <div className={style.subHeader}>
        <Menu className={style.menu} />All
        <div>Today's</div>
        <div>Customer Service</div>
      </div>
    </>
  )
}
