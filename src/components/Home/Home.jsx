import './Home.scss';
import galleryImage from '../../assets/images/home-page-gallery-photo.jpeg';

function Home() {
  return (
    <>
      <section className='hero-banner'>
        <div className='hero-banner__background'>
            <div className='hero-banner__text-container'>
                <p className='hero-banner__slogan'>
                    Recycle, Reuse, Save Money
                </p>
                <h1 className='hero-banner__title'>
                    PMP EURO AUTO
                </h1>
                <p className='hero-banner__description'>
                    We are your one stop for quality used OEM & Aftermarket parts for a wide range of European & JDM makes & models
                </p>
            </div>
        </div>
      </section>
      <section className='gallery'>
        <h2 className='gallery__title'>Gallery</h2>
        <div className='gallery__img-container'>
            <img className='gallery__img' src={galleryImage} alt="gallery photo" />
        </div>
      </section>
    </>
  )
}

export default Home
