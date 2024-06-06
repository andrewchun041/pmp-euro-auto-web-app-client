import './VehiclesList.scss'

import carExample from '../../assets/images/home-page-gallery-photo.jpeg'

function VehiclesList() {
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
                <input className="vehicles-interface__search-input" type="search" />
                <div className="vehicles-interface__filter-sort-num-prod-container">
                    <div className="vehicles-interface__filter-sort-container">
                        <fieldset className="vehicles-interface__filter-fieldset">
                            <legend className="vehicles-interface__filter-legend">Filter:</legend>
                            <div className="vehicles-interface__filter-select-container">
                                <select className="vehicles-interface__filter-select" name="make" id="make">
                                    <option className="vehicles-interface__filter-option" value="all">Make</option>
                                </select>
                                <select className="vehicles-interface__filter-select" name="model" id="model">
                                    <option className="vehicles-interface__filter-option" value="all">Model</option>
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
                        <p className="vehicles-interface__num-prod-text"># products</p>
                    </div>
                </div>
            </div>
        </section>
        <section className="vehicles-list">
            <div className="vehicles-list__container">
                <ul className="vehicles-list__list">
                    <li className="vehicles-list__item">
                        <article className="vehicle-card">
                            <img className="vehicle-card__img" src={carExample} alt="Car" />
                            {/* to replace once data is available */}
                            {/* <img className="vehicle-card__img" src={car.img} alt={car.name} /> */}
                            <h2 className="vehicle-card__name">car 1</h2>
                            <p className="vehicle-card__posted-date">posted date</p>
                        </article>
                    </li>
                </ul>
            </div>
        </section>
    </>
  );
}

export default VehiclesList;
