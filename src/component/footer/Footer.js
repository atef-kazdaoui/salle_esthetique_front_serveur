import './Footer.css';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

function Footer() {
  return (
    <footer>
      <div className="contenu-footer">
       
        <div className="bloc footer-service">
          <h3  style={{ color: 'white' }}>A PROPOS</h3>
          <p>La marque</p>
          <p>Praticien</p>
          <p>glosserie</p>
        </div>
        <div className="bloc footer-service">
          <h3 className='h3' style={{ color: 'white' }}>SERVICES</h3>
          <ul className="liste-horraires">
            <li>Espace client</li>
            <li>Devenir pro partenaire </li>;

            
          </ul>
        </div>
        <div className="bloc footer-service">
          <h3 className='h3' style={{ color: 'white' }}>Nos reseaux</h3>
          <ul className="liste-media">
            <li>
              <a href="#" style={{ color: 'white' }}><FaFacebook /> facebook</a>
            </li>
            <li>
              <a href="#" style={{ color: 'white' }}><FaInstagram /> instagram</a>
            </li>
            <li>
              <a href="#" style={{ color: 'white' }}><FaTwitter /> twitter</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
