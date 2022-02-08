import { Link } from 'react-router-dom';
import CartIcon from '../../icons/cart-icon/cart-icon'
import searchIcon from './images/search_icon.svg';
import './header.css';

const Header = () => {
    return (<><TopBar /><SecondBar /></>);
}



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
