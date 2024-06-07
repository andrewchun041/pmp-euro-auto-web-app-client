import './VehiclePartCard.scss';
import partExample from '../../assets/images/parts-page-banner.jpg';

import { Link } from "react-router-dom";

// price formatting function
function formatPrice (price) {
    const numberPrice = parseFloat(price); // convert to number
    return (numberPrice.toLocaleString('en-US'));
}

function VehiclePartCard({ part }) {
  return (
    <article className="vehicle-part-card">
      <Link className="vehicle-part-card__link" to={`/parts/${part.id}`}>
        <img className="vehicle-part-card__img" src={partExample} alt="Part" />
        {/* to replace once data is available */}
        {/* <img className="vehicle-part-card__img" src={part.img} alt={part.name} /> */}
        <h2 className="vehicle-part-card__name">{`${part.year} ${part.make} ${part.model} ${part.part_name}`}</h2>
        <p className="vehicle-part-card__price">{`$${formatPrice(part.price)} USD`}</p>
      </Link>
    </article>
  );
}

export default VehiclePartCard;
