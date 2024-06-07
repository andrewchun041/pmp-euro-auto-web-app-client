import './VehicleDetails.scss';
import carExample from '../../assets/images/home-page-gallery-photo.jpeg';

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

import VehiclePartCard from '../VehiclePartCard/VehiclePartCard';

const baseUrl = "http://localhost:8080";

function formatDate (date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    // convert ISO String to date object
    const dateObject = new Date(date);
    // format the date object
    const formattedDate = dateObject.toLocaleDateString('en-US', options);
    return formattedDate;
}

function VehicleDetails() {
    const params = useParams();

    const [ car, setCar ] = useState({});
    const [ parts, setParts ] = useState([]);
    
    useEffect(() => {
        // get car data from server api
        const getCar = async () => {
            try {
                const response = await axios.get(
                    `${baseUrl}/cars/${params.id}`
                );
                setCar(response.data);
            } catch (error) {
                console.error("Error fetching car data: ", error)
            }
        }
        getCar();
        // get parts data of the car from server api
        const getParts = async () => {
            try {
                const response = await axios.get(
                    `${baseUrl}/cars/${params.id}/parts`
                );
                setParts(response.data);
            } catch (error) {
                console.error("Error fetching car data: ", error)
            }
        }
        getParts();
    }, [params.id]);

  return (
    <>
      <section className="vehicle-details">
        <div className="vehicle-details__container">
            <div className="vehicle-details__car-img-container">
                {/* to replace once data is available */}
                <img className="vehicle-details__car-img" src={carExample} alt="Car" />
                {/* <img className="vehicle-details__car-img" src={carExample} alt={car.name} /> */}
            </div>
            <div className="vehicle-details__car-info-container">
                <h1 className="vehicle-details__car-name">{`${car.make} ${car.model} (${car.year})`}</h1>
                <div className="vehicle-details__car-details-container">
                    <p className="vehicle-details__car-details-text">{`VIN: ${car.vin}`}</p>
                    <p className="vehicle-details__car-details-text">{`Stock #: ${car.car_stock}`}</p>
                    <p className="vehicle-details__car-details-text">{`Mileage (kms): ${car.mileage_kms}`}</p>
                    <p className="vehicle-details__car-details-text">{`Mileage (miles): ${car.mileage_miles}`}</p>
                    <p className="vehicle-details__car-details-text">{`Posted Date: ${formatDate(car.created_at)}`}</p>
                </div>
            </div>
        </div>
      </section>
      <section className="vehicle-parts-interface">
        <div className="vehicle-parts-interface__container">
            <input className="vehicle-parts-interface__search-input" type="search" placeholder="Search" />
            <div className="vehicle-parts-interface__filter-sort-num-prod-container">
                <div className="vehicle-parts-interface__filter-sort-container">
                    <fieldset className="vehicle-parts-interface__filter-fieldset">
                        <legend className="vehicle-parts-interface__filter-legend">Filter:</legend>
                        <div className="vehicle-parts-interface__filter-select-container">
                            <select className="vehicle-parts-interface__filter-select" name="part" id="part">
                                <option className="vehicle-parts-interface__filter-option" value="all">Part</option>
                            </select>
                            <select className="vehicle-parts-interface__filter-select" name="price" id="price">
                                <option className="vehicle-parts-interface__filter-option" value="all">Price</option>
                            </select>
                        </div>
                    </fieldset>
                    <div className="vehicle-parts-interface__sort-container">
                        <label className="vehicle-parts-interface__sort-label" htmlFor="sort">Sort:</label>
                        <select className="vehicle-parts-interface__sort-select" name="sort" id="sort">
                            <option className="vehicle-parts-interface__sort-option" value="new">New</option>
                            <option className="vehicle-parts-interface__sort-option" value="old">Old</option>
                            <option className="vehicle-parts-interface__sort-option" value="az">A-Z</option>
                            <option className="vehicle-parts-interface__sort-option" value="za">Z-A</option>
                        </select>
                    </div>
                </div>
                <div className="vehicle-parts-interface__num-prod-container">
                    <p className="vehicle-parts-interface__num-prod-text">{`${car.number_of_parts} products`}</p>
                </div>
            </div>
        </div>
      </section>
      <section className="vehicle-parts-list">
        <div className="vehicle-parts-list__container">
            <ul className="vehicle-parts-list__list">
                {parts?.map((part) => (
                    <li className="vehicle-parts-list__item"
                        key={part.id}
                    >
                        <VehiclePartCard part={part} />
                    </li>
                ))}
            </ul>
        </div>
      </section>
    </>
  );
}

export default VehicleDetails;
