import './VehiclesList.scss';

import { useState, useEffect } from 'react';
import axios from 'axios';

import VehicleCard from '../VehicleCard/VehicleCard';

const baseUrl = "http://localhost:8080";

const vehicleMakeList = [
    "Toyota",
    "Honda",
    "Ford",
    "Chevrolet",
    "Nissan",
    "BMW",
    "Audi",
    "Mercedes-Benz",
    "Volkswagen",
    "Hyundai",
]
const vehicleModelList = [
    "Corolla",
    "Civic",
    "Focus",
    "Malibu",
    "Sentra",
    "BMW",
    "Audi",
    "C-Class",
    "Passat",
    "Elantra",
]

function VehiclesList() {

    const [ cars, setCars ] = useState([]);
    const [ selectedMake, setSelectedMake ] = useState("all");
    const [ selectedModel, setSelectedModel ] = useState("all");
    
    /* -------------------------------------------------------------------------- */
    /*                          Get cars data from server                         */
    /* -------------------------------------------------------------------------- */
    useEffect(() => {
        const getCars = async () => {
            try {
                const response = await axios.get(
                    `${baseUrl}/cars`
                );
                setCars(response.data);
            } catch (error) {
                console.error("Error fetching cars data: ", error)
            }
        }
        getCars();
    }, []);

    /* -------------------------------------------------------------------------- */
    /*                                   Filters                                  */
    /* -------------------------------------------------------------------------- */
    // handle 'make' select change
    const handleMakeChange = (event) => {
        setSelectedMake(event.target.value);
    }
    // handle 'model' select change
    const handleModelChange = (event) => {
        setSelectedModel(event.target.value);
    }
    // Filter cars based on 'make' selected
    const makeFilteredCars = selectedMake === "all-make" ? cars : cars.filter(car => car.make === selectedMake);
    // Filter cars based on 'model' selected
    const makeAndModelFilteredCars = selectedModel === "all-model" ? makeFilteredCars : makeFilteredCars.filter(car => car.model === selectedModel);

  return (
    <>
        <section className="vehicles-hero-banner">
            <div className="vehicles-hero-banner__background">
                <div className="vehicles-hero-banner__text-container">
                    <h1 className="vehicles-hero-banner__title">Vehicles</h1>
                </div>
            </div>
        </section>
        <section className="vehicles-interface">
            <div className="vehicles-interface__container">
                <input className="vehicles-interface__search-input" type="search" placeholder="Search" />
                <div className="vehicles-interface__filter-sort-num-prod-container">
                    <div className="vehicles-interface__filter-sort-container">
                        <fieldset className="vehicles-interface__filter-fieldset">
                            <legend className="vehicles-interface__filter-legend">Filter:</legend>
                            <div className="vehicles-interface__filter-select-container">
                                <select 
                                    className="vehicles-interface__filter-select" 
                                    name="make" 
                                    id="make"
                                    value={selectedMake}
                                    onChange={handleMakeChange}
                                >
                                    <option className="vehicles-interface__filter-option" value="all-make">All Make</option>
                                    {vehicleMakeList.map((make) => (
                                        <option className="vehicles-interface__filter-option" value={make}>{`${make}`}</option>
                                    ))}
                                </select>
                                <select 
                                    className="vehicles-interface__filter-select" 
                                    name="model" 
                                    id="model"
                                    value={selectedModel}
                                    onChange={handleModelChange}
                                >
                                    <option className="vehicles-interface__filter-option" value="all-model">All Model</option>
                                    {vehicleModelList.map((model) => (
                                        <option className="vehicles-interface__filter-option" value={model}>{`${model}`}</option>
                                    ))}
                                </select>
                            </div>
                        </fieldset>
                        <div className="vehicles-interface__sort-container">
                            <label className="vehicles-interface__sort-label" htmlFor="sort">Sort:</label>
                            <select className="vehicles-interface__sort-select" name="sort" id="sort">
                                <option className="vehicles-interface__sort-option" value="new">New</option>
                                <option className="vehicles-interface__sort-option" value="old">Old</option>
                                <option className="vehicles-interface__sort-option" value="az">A-Z</option>
                                <option className="vehicles-interface__sort-option" value="za">Z-A</option>
                            </select>
                        </div>
                    </div>
                    <div className="vehicles-interface__num-prod-container">
                        <p className="vehicles-interface__num-prod-text">{cars.length} products</p>
                    </div>
                </div>
            </div>
        </section>
        <section className="vehicles-list">
            <div className="vehicles-list__container">
                <ul className="vehicles-list__list">
                    {makeAndModelFilteredCars
                    // (selectedMake === "all" ? cars : cars.filter(car => car.make === selectedMake))
                        .map((car) => (
                            <li className="vehicles-list__item"
                                key={car.id}
                            >
                                <VehicleCard car={car} />
                            </li>
                        ))
                    }
                </ul>
            </div>
        </section>
    </>
  );
}

export default VehiclesList;
