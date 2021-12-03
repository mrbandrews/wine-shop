import Header from './header/header';
import Footer from './footer/footer';
import './layout.css';

const Layout = (props) => {
  return (
    <div className="layout">
      <div className="header">
        <Header />
      </div>
      <div className="main">
        {props.children}
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default Layout;