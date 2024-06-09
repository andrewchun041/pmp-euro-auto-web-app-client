import './VehiclesList.scss';

import { useState, useEffect } from 'react';
import axios from 'axios';

import VehicleCard from '../VehicleCard/VehicleCard';

const baseUrl = "http://localhost:8080";

function VehiclesList() {

    // data
    const [ cars, setCars ] = useState([]);
    // for search
    const [ searchInput, setSearchInput ] = useState("");
    const [ searchedCars, setSearchedCars ] = useState([]);
    // for sort
    const [ sortedCars, setSortedCars ] = useState([]);
    const [ selectedSort, setSelectedSort ] = useState("default");
    // for filter
    const [ vehicleMakeList, setVehicleMakeList ] = useState([]);
    const [ vehicleModelList, setVehicleModelList ] = useState([]);
    const [ selectedMake, setSelectedMake ] = useState("all-makes");
    const [ selectedModel, setSelectedModel ] = useState("all-models");
    
    /* -------------------------------------------------------------------------- */
    /*                          Get cars data from server                         */
    /* -------------------------------------------------------------------------- */
    useEffect(() => {
        const getCars = async () => {
            try {
                const response = await axios.get(
                    `${baseUrl}/cars`
                );
                // sets and saves the cars data
                setCars(response.data);
                
                // create set object variables to hold unique values
                const makesSet = new Set();
                const modelsSet = new Set();
                // extract unique makes and models from fetched cars data
                response.data.forEach(car => {
                    makesSet.add(car.make);
                    modelsSet.add(car.model);
                });
                // convert makes and models set objects to arrays and store in useState variables
                setVehicleMakeList([...makesSet]);
                setVehicleModelList([...modelsSet]);
            } catch (error) {
                console.error("Error fetching cars data: ", error)
            }
        }
        getCars();
    }, []);

    /* -------------------------------------------------------------------------- */
    /*                                   Search                                   */
    /* -------------------------------------------------------------------------- */
    const handleSearchInputChange = (event) => {
        const searchTerm = event.target.value;
        setSearchInput(searchTerm);
    }
    useEffect(() => {
        const searchFilteredList = cars.filter((car) => 
            car.year.toString().includes(searchInput) ||
            car.make.toLowerCase().includes(searchInput.toLowerCase()) ||
            car.model.toLowerCase().includes(searchInput.toLowerCase())
        );
        setSearchedCars(searchFilteredList);
    }, [searchInput, cars]);

    /* -------------------------------------------------------------------------- */
    /*                                    Sort                                    */
    /* -------------------------------------------------------------------------- */
    const handleSortChange = (event) => {
        setSelectedSort(event.target.value);
    }
    useEffect(() => {
        let sorted = [...searchedCars];
        if (selectedSort === "post-new") {
            sorted = sorted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        }
        else if (selectedSort === "post-old") {
            sorted = sorted.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        }
        else if (selectedSort === "year-new") {
            sorted = sorted.sort((a, b) => b.year - a.year);
        }
        else if (selectedSort === "year-old") {
            sorted = sorted.sort((a, b) => a.year - b.year);
        }
        setSortedCars(sorted);
    }, [selectedSort, searchedCars]);

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
    const makeFilteredCars =
      selectedMake === "all-makes"
        ? sortedCars
        : sortedCars.filter((car) => car.make === selectedMake);
    // Filter cars based on 'model' selected
    const makeAndModelFilteredCars =
      selectedModel === "all-models"
        ? makeFilteredCars
        : makeFilteredCars.filter((car) => car.model === selectedModel);

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
                <input 
                    className="vehicles-interface__search-input" 
                    type="search" 
                    placeholder="Search" 
                    value={searchInput}
                    onChange={handleSearchInputChange}
                />
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
                                    <option className="vehicles-interface__filter-option" value="all-makes">All Makes</option>
                                    {vehicleMakeList.map((make) => (
                                        <option className="vehicles-interface__filter-option" value={make} key={make}>{`${make}`}</option>
                                    ))}
                                </select>
                                <select 
                                    className="vehicles-interface__filter-select" 
                                    name="model" 
                                    id="model"
                                    value={selectedModel}
                                    onChange={handleModelChange}
                                >
                                    <option className="vehicles-interface__filter-option" value="all-models">All Models</option>
                                    {vehicleModelList.map((model) => (
                                        <option className="vehicles-interface__filter-option" value={model} key={model}>{`${model}`}</option>
                                    ))}
                                </select>
                            </div>
                        </fieldset>
                        <div className="vehicles-interface__sort-container">
                            <label className="vehicles-interface__sort-label" htmlFor="sort">Sort:</label>
                            <select 
                                className="vehicles-interface__sort-select" 
                                name="sort" 
                                id="sort"
                                value={selectedSort}
                                onChange={handleSortChange}
                            >
                                <option className="vehicles-interface__sort-option" value="default">Default</option>
                                <option className="vehicles-interface__sort-option" value="post-new">Post: New</option>
                                <option className="vehicles-interface__sort-option" value="post-old">Post: Old</option>
                                <option className="vehicles-interface__sort-option" value="year-new">Year: New</option>
                                <option className="vehicles-interface__sort-option" value="year-old">Year: Old</option>
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
