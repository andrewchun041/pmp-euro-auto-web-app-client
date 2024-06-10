import './VehicleCard.scss';
import carExample from '../../assets/images/home-page-gallery-photo.jpeg';

import { Link } from "react-router-dom";

function VehicleCard({ car }) {
  
  function formatDate (date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    // convert ISO String to date object
    const dateObject = new Date(date);
    // format the date object
    const formattedDate = dateObject.toLocaleDateString('en-US', options);
    return formattedDate;
  }

  return (
    <article className="vehicle-card">
      <Link className="vehicle-card__link" to={`/vehicles/${car.id}`}>
        <img className="vehicle-card__img" src={carExample} alt="Car" />
        {/* to replace once data is available */}
        {/* <img className="vehicle-card__img" src={car.img} alt={car.name} /> */}
        <h2 className="vehicle-card__name">{`${car.year} ${car.make} ${car.model}`}</h2>
        <p className="vehicle-card__posted-date">{formatDate(car.created_at)}</p>
      </Link>
    </article>
  );
}

export default VehicleCard;
