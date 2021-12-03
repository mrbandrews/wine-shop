import Layout from '../../layout/layout';
import './home-page.css';

const HomePage = (props) => {
  
    return (
        <>
        <Layout>

          <div className="homepage-container">

            <div className="banner-image" onClick={() => props.history.push('/offers')} />

            <div className='homepage-grid two-column-grid'>
              <div className="image1 grid-item double-width" onClick={() => props.history.push('/wine/sparkling')} />          
              <div className="image2 grid-item" onClick={() => props.history.push('/spirits/bourbon')} />
              <div className="image3 grid-item" onClick={() => props.history.push('/wine/bordeaux')} />
              <div className="image4 grid-item double-width" onClick={() => props.history.push('/spirits/whiskey')} />
            </div>

            <div className='homepage-grid three-column-grid'>
              <div className="image-grid-1-1 grid-item double-width" /> 
              <div className="image-grid-1-2 grid-item double-width" /> 
              <div className="image-grid-1-3 grid-item double-width" /> 
              <div className="image-grid-2-1 grid-item triple-width" /> 
              <div className="image-grid-2-2 grid-item triple-width" /> 
              <div className="image-grid-3-1 grid-item double-width" /> 
              <div className="image-grid-3-2 grid-item double-width" /> 
              <div className="image-grid-3-3 grid-item double-width" /> 
            </div>

          </div> 

        </Layout>
        </>
    );
}

export default HomePage;
