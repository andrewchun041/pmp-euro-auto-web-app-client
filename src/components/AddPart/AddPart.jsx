import "./AddPart.scss";

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

const baseUrl = "http://localhost:8080";

function AddPart() {
    const Navigate = useNavigate();

    const formInitial = {
        part_stock: "",
        part_name: "",
        price: "",
        number_of_pieces: "",
        car_stock: "",
        car_id: "",
    }
    const [ form, setForm ] = useState(formInitial);

    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    // TO ADD FORM VALIDATION IN THE FUTURE

    const handleSubmit = async (event) => {
        event.preventDefault();



        try {
            const response = await axios.post(`${baseUrl}/car-parts`, form);
            if (response.status === 201) {
                alert("Part added successfully");
                setForm(formInitial);

                // TO ADD NAVIGATE TO NEWLY ADDED PART IN THE FUTURE
                Navigate("/parts");
            } else {
                alert("Failed to add part")
            }
        } catch (error) {
            console.error("Error posting part: ", error);
            alert("An unexpected error occurred")
        }
    }

    const handleCancelBtn = () => {
        Navigate ("/parts");
    };

  return (
    <>
      <section className="add-part">
        <div className="add-part__title-form-container">
          <h2 className="add-part__title">Add New Part</h2>
          <form className="add-part__form" onSubmit={handleSubmit}>
            <div className="add-part__all-input-container">
              <div className="add-part__two-input-block">
                <div className="add-part__input-label-container">
                  <label className="add-part__label" htmlFor="part_stock">
                    Part Stock #:
                  </label>
                  <input
                    className="add-part__input"
                    type="text"
                    name="part_stock"
                    id="part_stock"
                    placeholder="Part stock #"
                    value={form.part_stock}
                    onChange={handleChange}
                  />
                </div>
                <div className="add-part__input-label-container">
                  <label className="add-part__label" htmlFor="part_name">
                    Part Name:
                  </label>
                  <input
                    className="add-part__input"
                    type="text"
                    name="part_name"
                    id="part_name"
                    placeholder="Part name"
                    value={form.part_name}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="add-part__two-input-block">
                <div className="add-part__input-label-container">
                  <label className="add-part__label" htmlFor="price">
                    Price:
                  </label>
                  <input
                    className="add-part__input"
                    type="text"
                    name="price"
                    id="price"
                    placeholder="price"
                    value={form.price}
                    onChange={handleChange}
                  />
                </div>
                <div className="add-part__input-label-container">
                  <label className="add-part__label" htmlFor="number_of_pieces">
                    # Of Pieces:
                  </label>
                  <input
                    className="add-part__input"
                    type="text"
                    name="number_of_pieces"
                    id="number_of_pieces"
                    placeholder="# of pieces"
                    value={form.number_of_pieces}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="add-part__two-input-block">
                <div className="add-part__input-label-container add-part__input-label-container--odd">
                  <label className="add-part__label" htmlFor="car_stock">
                    Car Stock #:
                  </label>
                  <input
                    className="add-part__input"
                    type="text"
                    name="car_stock"
                    id="car_stock"
                    placeholder="Car stock #"
                    value={form.car_stock}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="add-part__btn-container">
              <button className="add-part__btn add-part__btn--cta btn btn--cta">
                + add part
              </button>
              <button
                className="add-part__btn add-part__btn--cancel btn btn--cancel"
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

export default AddPart;
