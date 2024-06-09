import './PartsList.scss';

import { useState, useEffect } from 'react';
import axios from 'axios';

import VehiclePartCard from '../VehiclePartCard/VehiclePartCard';

const baseUrl = "http://localhost:8080";

function PartsList() {

    // data
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
    /*                          Get cars data from server                         */
    /* -------------------------------------------------------------------------- */
    useEffect(() => {
        const getParts = async () => {
            try {
                const response = await axios.get(
                    `${baseUrl}/car-parts`
                );
                // sets and saves the cars data
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
                console.error("Error fetching cars data: ", error)
            }
        }
        getParts();
    }, []);

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
        <section className="parts-hero-banner">
            <div className="parts-hero-banner__background">
                <div className="parts-hero-banner__text-container">
                    <h1 className="parts-hero-banner__title">Parts</h1>
                </div>
            </div>
        </section>
        <section className="parts-interface">
            <div className="parts-interface__container">
                <h2 className="parts-interface__search-title">Search parts by part name</h2>
                <input 
                    className="parts-interface__search-input" 
                    type="search" 
                    placeholder="Search" 
                    value={searchInput}
                    onChange={handleSearchInputChange}
                />
                <div className="parts-interface__filter-sort-num-prod-container">
                    <div className="parts-interface__filter-sort-container">
                        <fieldset className="parts-interface__filter-fieldset">
                            <legend className="parts-interface__filter-legend">Filter:</legend>
                            <div className="parts-interface__filter-select-container">
                                <select 
                                    className="parts-interface__filter-select" 
                                    name="make" 
                                    id="make"
                                    value={selectedPart}
                                    onChange={handlePartChange}
                                >
                                    <option className="parts-interface__filter-option" value="all-parts">All Parts</option>
                                    {partsList.map((part) => (
                                        <option className="vehicle-parts-interface__filter-option" value={part} key={part}>{`${part}`}</option>
                                    ))}
                                </select>
                                {/* <select className="parts-interface__filter-select" name="price" id="price">
                                    <option className="parts-interface__filter-option" value="all">Price</option>
                                </select> */}
                            </div>
                        </fieldset>
                        <div className="parts-interface__sort-container">
                            <label className="parts-interface__sort-label" htmlFor="sort">Sort:</label>
                            <select 
                                className="parts-interface__sort-select" 
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
                    <div className="parts-interface__num-prod-container">
                        <p className="parts-interface__num-prod-text">{parts.length} products</p>
                    </div>
                </div>
            </div>
        </section>
        <section className="vehicles-list">
            <div className="vehicles-list__container">
                <ul className="vehicles-list__list">
                    {partFilteredParts
                        .map((part) => (
                            <li className="vehicles-list__item"
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
  )
}

export default PartsList;
