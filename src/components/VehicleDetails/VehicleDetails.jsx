import './VehicleDetails.scss';
import carExample from '../../assets/images/home-page-gallery-photo.jpeg';

import { useParams, useNavigate } from 'react-router-dom';
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

    // date
    const [ car, setCar ] = useState({});
    const [ parts, setParts ] = useState([]);
    // for search
    const [ searchInput, setSearchInput ] = useState("");
    const [ searchedParts, setSearchedParts ] = useState([]);
    // for sort
    const [ sortedParts, setSortedParts ] = useState([]);
    const [ selectedSort, setSelectedSort ] = useState("default");
    // for filter
    const [ partsList, setPartsList ] = useState([]);
    const [ selectedPart, setSelectedPart ] = useState("all-parts");
    
    /* -------------------------------------------------------------------------- */
    /*                                 Navigation                                 */
    /* -------------------------------------------------------------------------- */
    const Navigate = useNavigate();
    const handleEditBtnClick = () => {
        Navigate(`/vehicles/${params.id}/edit`);
    }

    /* -------------------------------------------------------------------------- */
    /*       Get specific car data and associated parts data from server API      */
    /* -------------------------------------------------------------------------- */
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

                // create set object variable to hold unique values
                const partsSet = new Set();
                // extract unique parts from fetched parts data
                response.data.forEach(part => {
                    partsSet.add(part.part_name);
                });
                // convert partSet object to an array and store in useState
                setPartsList([...partsSet])
            } catch (error) {
                console.error("Error fetching car data: ", error)
            }
        }
        getParts();
    }, [params.id]);

    /* -------------------------------------------------------------------------- */
    /*                                   Search                                   */
    /* -------------------------------------------------------------------------- */
    const handleSearchInputChange = (event) => {
        const searchTerm = event.target.value;
        setSearchInput(searchTerm);
    }
    useEffect(() => {
        const searchFilteredList = parts.filter((part) => 
            part.part_name.toLowerCase().includes(searchInput.toLowerCase())
        );
        setSearchedParts(searchFilteredList);
    }, [searchInput, parts]);

    /* -------------------------------------------------------------------------- */
    /*                                    Sort                                    */
    /* -------------------------------------------------------------------------- */
    const handleSortChange = (event) => {
        setSelectedSort(event.target.value);
    }
    useEffect(() => {
        let sorted = [...searchedParts];
        if (selectedSort === "price-high") {
            sorted = sorted.sort((a, b) => Number(b.price) - Number(a.price));
        }
        else if (selectedSort === "price-low") {
            sorted = sorted.sort((a, b) => Number(a.price) - Number(b.price));
        }
        else if (selectedSort === "alphabetical-a") {
            sorted = sorted.sort((a, b) => a.part_name.localeCompare(b.part_name));
        }
        else if (selectedSort === "alphabetical-z") {
            sorted = sorted.sort((a, b) => b.part_name.localeCompare(a.part_name));
        }
        setSortedParts(sorted);
    }, [selectedSort, searchedParts]);

    /* -------------------------------------------------------------------------- */
    /*                                   Filters                                  */
    /* -------------------------------------------------------------------------- */
    // handle 'part' select change
    const handlePartChange = (event) => {
        setSelectedPart(event.target.value);
    }
    // Filter parts based on 'part' selected
    const partFilteredParts =
      selectedPart === "all-parts"
        ? sortedParts
        : sortedParts.filter((part) => part.part_name === selectedPart);

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
      <section className="vehicle-parts-crud">
        <div className="vehicle-parts-crud__container">
            <div className="vehicle-parts-crud__btn-container">
                <button className="vehicle-parts-crud__btn btn btn--cta" onClick={handleEditBtnClick}>Edit Vehicle</button>
            </div>
        </div>
      </section>
      <section className="vehicle-parts-interface">
        <div className="vehicle-parts-interface__container">
            <h2 className="vehicle-parts-interface__search-title">Search parts by part name</h2>
            <input 
                className="vehicle-parts-interface__search-input" 
                type="search" 
                placeholder="Search" 
                value={searchInput}
                onChange={handleSearchInputChange}
            />
            <div className="vehicle-parts-interface__filter-sort-num-prod-container">
                <div className="vehicle-parts-interface__filter-sort-container">
                    <fieldset className="vehicle-parts-interface__filter-fieldset">
                        <legend className="vehicle-parts-interface__filter-legend">Filter:</legend>
                        <div className="vehicle-parts-interface__filter-select-container">
                            <select 
                                className="vehicle-parts-interface__filter-select" 
                                name="part" 
                                id="part"
                                value={selectedPart}
                                onChange={handlePartChange}
                            >
                                <option className="vehicle-parts-interface__filter-option" value="all-parts">All Parts</option>
                                {partsList.map((part) => (
                                    <option className="vehicle-parts-interface__filter-option" value={part} key={part}>{`${part}`}</option>
                                ))}
                            </select>
                            {/* <select className="vehicle-parts-interface__filter-select" name="price" id="price">
                                <option className="vehicle-parts-interface__filter-option" value="all">Price</option>
                            </select> */}
                        </div>
                    </fieldset>
                    <div className="vehicle-parts-interface__sort-container">
                        <label className="vehicle-parts-interface__sort-label" htmlFor="sort">Sort:</label>
                        <select 
                            className="vehicle-parts-interface__sort-select" 
                            name="sort" 
                            id="sort"
                            value={selectedSort}
                            onChange={handleSortChange}
                        >
                            <option className="vehicle-parts-interface__sort-option" value="default">Default</option>
                            <option className="vehicle-parts-interface__sort-option" value="price-high">Price: High</option>
                            <option className="vehicle-parts-interface__sort-option" value="price-low">Price: Low</option>
                            <option className="vehicle-parts-interface__sort-option" value="alphabetical-a">Alphabetical: A-Z</option>
                            <option className="vehicle-parts-interface__sort-option" value="alphabetical-z">Alphabetical: Z-A</option>
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
                {partFilteredParts
                    .map((part) => (
                        <li className="vehicle-parts-list__item"
                            key={part.id}
                        >
                            <VehiclePartCard part={part} />
                        </li>
                    ))
                }
            </ul>
        </div>
      </section>
    </>
  );
}

export default VehicleDetails;
