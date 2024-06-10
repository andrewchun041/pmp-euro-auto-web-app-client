import "./EditVehicle.scss";

import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; 

const baseUrl = "http://localhost:8080";

function EditVehicle() {
    const params = useParams();
    const Navigate = useNavigate();

    const dataToSendInitial = {
        car_stock: "",
        year: "",
        make: "",
        model: "",
        mileage_kms: "",
        mileage_miles: "",
        vin: "",
    }
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

    useEffect(() => {
        const getVehicleInfo = async () => {
            try {
                const response = await axios.get(`${baseUrl}/cars/${params.id}`);
                const vehicle = response.data;
                setForm({
                    car_stock: vehicle.car_stock,
                    year: vehicle.year,
                    make: vehicle.make,
                    model: vehicle.model,
                    mileage_kms: vehicle.mileage_kms,
                    mileage_miles: vehicle.mileage_miles,
                    vin: vehicle.vin,
                });
            } catch (error) {
                console.error("Failed to retrieve vehicle information: ", error);
                alert("Failed to retrieve vehicle information");
            }
        }
        getVehicleInfo();
    }, [params.id]);

    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    // TO ADD FORM VALIDATION IN THE FUTURE

    const handleSubmit = async (event) => {
        event.preventDefault();

        let dataToSend = { 
            ...dataToSendInitial,
            car_stock: form.car_stock,
            year: parseInt(form.year),
            make: form.make,
            model: form.model,
            mileage_kms: parseInt(form.mileage_kms),
            mileage_miles: parseInt(form.mileage_miles),
            vin: form.vin,
        };

        try {
            const response = await axios.patch(`${baseUrl}/cars/${params.id}`, dataToSend);
            if (response.status === 200) {
                alert("Vehicle editted successfully");

                // TO ADD NAVIGATE TO NEWLY ADDED VEHICLE IN THE FUTURE
                Navigate(`/vehicles/${params.id}`);
            } else {
                alert("Failed to edit vehicle");
            }
        } catch (error) {
            console.error("Error editting vehicle: ", error);
            alert("Failed to edit vehicle");
        }
    }

    const handleCancelBtn = () => {
        Navigate (`/vehicles/${params.id}`);
    };

  return (
    <>
      <section className="edit-vehicle">
        <div className="edit-vehicle__title-form-container">
          <h2 className="edit-vehicle__title">Edit Vehicle</h2>
          <form className="edit-vehicle__form" onSubmit={handleSubmit}>
            <div className="edit-vehicle__all-input-container">
              <div className="edit-vehicle__two-input-block">
                <div className="edit-vehicle__input-label-container">
                  <label className="edit-vehicle__label" htmlFor="car_stock">
                    Car Stock #:
                  </label>
                  <input
                    className="edit-vehicle__input"
                    type="text"
                    name="car_stock"
                    id="car_stock"
                    placeholder="Car stock #"
                    value={form.car_stock}
                    onChange={handleChange}
                  />
                </div>
                <div className="edit-vehicle__input-label-container">
                  <label className="edit-vehicle__label" htmlFor="year">
                    Year:
                  </label>
                  <input
                    className="edit-vehicle__input"
                    type="text"
                    name="year"
                    id="year"
                    placeholder="Year"
                    value={form.year}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="edit-vehicle__two-input-block">
                <div className="edit-vehicle__input-label-container">
                  <label className="edit-vehicle__label" htmlFor="make">
                    Make:
                  </label>
                  <input
                    className="edit-vehicle__input"
                    type="text"
                    name="make"
                    id="make"
                    placeholder="Make"
                    value={form.make}
                    onChange={handleChange}
                  />
                </div>
                <div className="edit-vehicle__input-label-container">
                  <label className="edit-vehicle__label" htmlFor="model">
                    Model:
                  </label>
                  <input
                    className="edit-vehicle__input"
                    type="text"
                    name="model"
                    id="model"
                    placeholder="Model"
                    value={form.model}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="edit-vehicle__two-input-block">
                <div className="edit-vehicle__input-label-container">
                  <label className="edit-vehicle__label" htmlFor="mileage_kms">
                    Mileage (kms):
                  </label>
                  <input
                    className="edit-vehicle__input"
                    type="text"
                    name="mileage_kms"
                    id="mileage_kms"
                    placeholder="kms"
                    value={form.mileage_kms}
                    onChange={handleChange}
                  />
                </div>
                <div className="edit-vehicle__input-label-container">
                  <label className="edit-vehicle__label" htmlFor="mileage_miles">
                    Mileage (miles):
                  </label>
                  <input
                    className="edit-vehicle__input"
                    type="text"
                    name="mileage_miles"
                    id="mileage_miles"
                    placeholder="miles"
                    value={form.mileage_miles}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="edit-vehicle__two-input-block">
                <div className="edit-vehicle__input-label-container edit-vehicle__input-label-container--odd">
                  <label className="edit-vehicle__label" htmlFor="vin">
                    VIN:
                  </label>
                  <input
                    className="edit-vehicle__input"
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
            <div className="edit-vehicle__btn-container">
              <button className="edit-vehicle__btn edit-vehicle__btn--cta btn btn--cta">
                Save Vehicle
              </button>
              <button
                className="edit-vehicle__btn edit-vehicle__btn--cancel btn btn--cancel"
                onClick={handleCancelBtn}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

export default EditVehicle;
