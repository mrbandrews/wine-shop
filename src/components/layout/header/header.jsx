import { Link } from 'react-router-dom';
import CartIcon from '../../icons/cart-icon/cart-icon'
import searchIcon from './images/search_icon.svg';
import './header.css';

const Header = () => {
    return (<><TopBar /><SecondBar /></>);
}

/*
<img alt="search-icon" className="search-icon" src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDU2Ljk2NiA1Ni45NjYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDU2Ljk2NiA1Ni45NjY7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4Ij4KPHBhdGggZD0iTTU1LjE0Niw1MS44ODdMNDEuNTg4LDM3Ljc4NmMzLjQ4Ni00LjE0NCw1LjM5Ni05LjM1OCw1LjM5Ni0xNC43ODZjMC0xMi42ODItMTAuMzE4LTIzLTIzLTIzcy0yMywxMC4zMTgtMjMsMjMgIHMxMC4zMTgsMjMsMjMsMjNjNC43NjEsMCw5LjI5OC0xLjQzNiwxMy4xNzctNC4xNjJsMTMuNjYxLDE0LjIwOGMwLjU3MSwwLjU5MywxLjMzOSwwLjkyLDIuMTYyLDAuOTIgIGMwLjc3OSwwLDEuNTE4LTAuMjk3LDIuMDc5LTAuODM3QzU2LjI1NSw1NC45ODIsNTYuMjkzLDUzLjA4LDU1LjE0Niw1MS44ODd6IE0yMy45ODQsNmM5LjM3NCwwLDE3LDcuNjI2LDE3LDE3cy03LjYyNiwxNy0xNywxNyAgcy0xNy03LjYyNi0xNy0xN1MxNC42MSw2LDIzLjk4NCw2eiIgZmlsbD0iIzAwMDAwMCIvPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K" />
*/

const TopBar = () => {
    return (
        <div className="top-bar">

          <div className="logo-wrapper">
            <Link to='/' className="logo"></Link>
          </div>

          <div className="search-wrapper">
             <img alt="search-icon" className="search-icon" src={searchIcon} />
             <input className="search-box" placeholder="What can we help you find today?" type="text" />
               <button className="search-button">Search</button>            
          </div>

          <div className="location-wrapper">
            <div className="location-top">Pickup at</div>
            <div className="location-bottom">Tucson (Park Place Mall), AZ</div>
          </div>

          <div className="cart-icon-wrapper">
            <CartIcon />
          </div>

        </div>
);}

const SecondBar = () => {
  return (
    <div className="second-bar">

      <div className="second-bar-mobile-container">
        <div className="location-top">Pickup at </div>
        <div className="location-bottom">Tucson (Park Place Mall), AZ</div>
      </div>

      <div className="second-bar-wide-container">
        <div className="drop-container">
          <button className="drop-btn">WINE</button>

          <div className="drop-content">
            <WineLink url="red" cls="category" label="Red Wine" />
            <WineLink url="bordeaux" cls="padleft" label="Bordeaux Blends" />
            <WineLink url="cabernet-sauvignon" cls="padleft" label="Cabernet Sauvignon" />
            <WineLink url="merlot" cls="padleft" label="Merlot" />
            <WineLink url="pinot-noir" cls="padleft" label="Pinot Noir" />
            <WineLink url="zinfandel" cls="padleft" label="Zinfandel" />
            <WineLink url="white" cls="category" label="White Wine" />
            <WineLink url="chardonnay" cls="padleft" label="Chardonnay" />
            <WineLink url="riesling" cls="padleft" label="Riesling" />

            {/* for spacing */}
            <WineLink url="blank" cls="padleft" label="" />
            <WineLink url="blank" cls="padleft" label="" />
            <WineLink url="blank" cls="padleft" label="" />
          </div>
        </div>

        <div className="drop-container">
          <button className="drop-btn">SPIRITS</button>
        </div>

      </div>
    </div>
    );
}

const WineLink = ({ url, cls, label}) => {
  return (
    <Link to={"/wine/category/" + url}>
      <span className={cls}> {label} </span> 
    </Link>
  );
}

export default Header;
