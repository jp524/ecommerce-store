import { Link } from 'react-router-dom';
import { AdvancedImage } from '@cloudinary/react';
import cloud from '../../utils/cloud';

const Home = () => {
  const image = cloud.image('ecommerce-store/xrym1cmz1yvphkz9ihug.jpg');

  return (
    <div className="home">
      <AdvancedImage cldImg={image} className="home__image"></AdvancedImage>
      <Link to={'/shop'} className="home__button">
        <button className="btn btn--primary">Shop Latest Styles</button>
      </Link>
    </div>
  );
};
export default Home;
