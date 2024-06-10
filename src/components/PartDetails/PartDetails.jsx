import './PartDetails.scss';
import partExample from '../../assets/images/parts-page-banner.jpg';

import { useParams, Link , useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const baseUrl = "http://localhost:8080";

// price formatting function
function formatPrice (price) {
    const numberPrice = parseFloat(price); // convert to number
    return (`$${numberPrice.toLocaleString('en-US')} USD`);
}
// date formatting function
function formatDate (date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    // convert ISO String to date object
    const dateObject = new Date(date);
    // format the date object
    const formattedDate = dateObject.toLocaleDateString('en-US', options);
    return formattedDate;
}

function PartDetails() {
    const params = useParams();

    const [ part, setPart ] = useState([]);

    /* -------------------------------------------------------------------------- */
    /*                                 Navigation                                 */
    /* -------------------------------------------------------------------------- */
    const Navigate = useNavigate();
    const handleEditBtnClick = () => {
        Navigate(`/parts/${params.id}/edit`);
    }
    const handleDeleteBtnClick = async () => {
        try {
            await axios.delete(`${baseUrl}/car-parts/${params.id}`);
            alert("Part was successfully delete");
        } catch (error) {
            console.error("Error deleting part in server database: ", error)
        }

        Navigate(`/parts`);
    }

    /* -------------------------------------------------------------------------- */
    /*                   Get specific part data from server API                   */
    /* -------------------------------------------------------------------------- */
    useEffect(() => {
        // get part data from server api
        const getParts = async () => {
            try {
                const response = await axios.get(
                    `${baseUrl}/car-parts/${params.id}`
                );
                setPart(response.data);
            } catch (error) {
                console.error("Error fetching car data: ", error)
            }
        }
        getParts();
    }, [params.id]);

  return (
    <>
      <section className="part-details">
        <div className="part-details__container">
            <div className="part-details__part-img-container">
                {/* to replace once data is available */}
                <img className="part-details__part-img" src={partExample} alt="Part" />
                {/* <img className="part-details__part-img" src={partExample} alt={part.name} /> */}
            </div>
            <div className="part-details__part-info-container">
                <h1 className="part-details__part-name">{`${part.part_name} from ${part.make} ${part.model} (${part.year})`}</h1>
                <div className="part-details__part-details-container">
                    <p className="part-details__part-details-text part-details__part-details-text--price">{`Price: ${formatPrice(part.price)}`}</p>
                    <p className="part-details__part-details-text">{`# of Pieces: ${part.number_of_pieces}`}</p>
                    <p className="part-details__part-details-text">{`Part Stock #: ${part.part_stock}`}</p>
                    <p className="part-details__part-details-text">
                        {`Car Stock #: `}
                        <Link className="part-details__part-details-link" to={`/vehicles/${part.car_id}`}>
                            {`${part.car_stock}`}
                        </Link>
                    </p>
                    <p className="part-details__part-details-text">{`Mileage (kms): ${part.mileage_kms}`}</p>
                    <p className="part-details__part-details-text">{`Mileage (miles): ${part.mileage_miles}`}</p>
                    <p className="part-details__part-details-text">{`Posted Date: ${formatDate(part.created_at)}`}</p>
                </div>
            </div>
        </div>
      </section>
      <section className="part-crud">
        <div className="part-crud__container">
            <div className="part-crud__btn-container">
                <button className="part-crud__btn btn btn--cta" onClick={handleEditBtnClick}>Edit Part</button>
                <button className="part-crud__btn btn btn--delete" onClick={handleDeleteBtnClick}>Delete Part</button>
            </div>
        </div>
      </section>
    </>
  )
}

export default PartDetails;
