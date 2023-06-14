import Carousel from 'react-bootstrap/Carousel';
import image1 from '../images/background.png';

import '../Carousel/Carousel.css';

function CarouselFadeExample () {
  const customNextIcon = <span />; // Utilisez un élément vide pour supprimer la flèche suivante
  const customPrevIcon = <span />; // Utilisez un élément vide pour supprimer la flèche précédente

  return (
    <Carousel
      fade
      nextIcon={customNextIcon}
      prevIcon={customPrevIcon}
      indicators={false}
    >
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={image1}
          alt="First slide"
          id="image1"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselFadeExample;
