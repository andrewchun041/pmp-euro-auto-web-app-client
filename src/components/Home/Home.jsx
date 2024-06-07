import "./Home.scss";
import galleryImage from "../../assets/images/home-page-gallery-photo.jpeg";

function Home() {
  return (
    <>
      <section className="home-hero-banner">
        <div className="home-hero-banner__background">
          <div className="home-hero-banner__text-container">
            <p className="home-hero-banner__slogan">Recycle, Reuse, Save Money</p>
            <h1 className="home-hero-banner__title">PMP EURO AUTO</h1>
            <p className="home-hero-banner__description">
              We are your one stop for quality used OEM & Aftermarket parts for
              a wide range of European & JDM makes & models
            </p>
          </div>
        </div>
      </section>
      <section className="home-gallery">
        <h2 className="home-gallery__title">Gallery</h2>
        <div className="home-gallery__img-container">
          <img
            className="home-gallery__img"
            src={galleryImage}
            alt="gallery"
          />
        </div>
      </section>
    </>
  );
}

export default Home;
