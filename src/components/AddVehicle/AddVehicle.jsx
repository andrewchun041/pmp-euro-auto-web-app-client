import "./AddVehicle.scss";

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

const baseUrl = "http://localhost:8080";

function AddVehicle() {
    const Navigate = useNavigate();

    const formInitial = {
        car_stock: "",
        year: "",
        make: "",
        model: "",
        mileage_kms: "",
        mileage_miles: "",
        vin: "",
    }
    const [ form, setForm ] = useState(formInitial);

    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    // TO ADD FORM VALIDATION IN THE FUTURE

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(`${baseUrl}/cars`, form);
            if (response.status === 201) {
                alert("Vehicle added successfully");
                setForm(formInitial);

                // TO ADD NAVIGATE TO NEWLY ADDED VEHICLE IN THE FUTURE
                Navigate("/vehicles");
            } else {
                alert("Failed to add vehicle")
            }
        } catch (error) {
            console.error("Error posting vehicle: ", error);
            alert("An unexpected error occurred")
        }
    }

    const handleCancelBtn = () => {
        Navigate ("/vehicles");
    };

  return (
    <>
      <section className="add-vehicle">
        <div className="add-vehicle__title-form-container">
          <h2 className="add-vehicle__title">Add New Vehicle</h2>
          <form className="add-vehicle__form" onSubmit={handleSubmit}>
            <div className="add-vehicle__all-input-container">
              <div className="add-vehicle__two-input-block">
                <div className="add-vehicle__input-label-container">
                  <label className="add-vehicle__label" htmlFor="car_stock">
                    Car Stock #:
                  </label>
                  <input
                    className="add-vehicle__input"
                    type="text"
                    name="car_stock"
                    id="car_stock"
                    placeholder="Car stock #"
                    value={form.car_stock}
                    onChange={handleChange}
                  />
                </div>
                <div className="add-vehicle__input-label-container">
                  <label className="add-vehicle__label" htmlFor="year">
                    Year:
                  </label>
                  <input
                    className="add-vehicle__input"
                    type="text"
                    name="year"
                    id="year"
                    placeholder="Year"
                    value={form.year}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="add-vehicle__two-input-block">
                <div className="add-vehicle__input-label-container">
                  <label className="add-vehicle__label" htmlFor="make">
                    Make:
                  </label>
                  <input
                    className="add-vehicle__input"
                    type="text"
                    name="make"
                    id="make"
                    placeholder="Make"
                    value={form.make}
                    onChange={handleChange}
                  />
                </div>
                <div className="add-vehicle__input-label-container">
                  <label className="add-vehicle__label" htmlFor="model">
                    Model:
                  </label>
                  <input
                    className="add-vehicle__input"
                    type="text"
                    name="model"
                    id="model"
                    placeholder="Model"
                    value={form.model}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="add-vehicle__two-input-block">
                <div className="add-vehicle__input-label-container">
                  <label className="add-vehicle__label" htmlFor="mileage_kms">
                    Mileage (kms):
                  </label>
                  <input
                    className="add-vehicle__input"
                    type="text"
                    name="mileage_kms"
                    id="mileage_kms"
                    placeholder="kms"
                    value={form.mileage_kms}
                    onChange={handleChange}
                  />
                </div>
                <div className="add-vehicle__input-label-container">
                  <label className="add-vehicle__label" htmlFor="mileage_miles">
                    Mileage (miles):
                  </label>
                  <input
                    className="add-vehicle__input"
                    type="text"
                    name="mileage_miles"
                    id="mileage_miles"
                    placeholder="miles"
                    value={form.mileage_miles}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="add-vehicle__two-input-block">
                <div className="add-vehicle__input-label-container add-vehicle__input-label-container--odd">
                  <label className="add-vehicle__label" htmlFor="vin">
                    VIN:
                  </label>
                  <input
                    className="add-vehicle__input"
                    type="text"
                    name="vin"
                    id="vin"
                    placeholder="VIN"
                    value={form.vin}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="add-vehicle__btn-container">
              <button className="add-vehicle__btn add-vehicle__btn--cta btn btn--cta">
                + add vehicle
              </button>
              <button
                className="add-vehicle__btn add-vehicle__btn--cancel btn btn--cancel"
                onClick={handleCancelBtn}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default AddVehicle;
