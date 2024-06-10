import "./EditPart.scss";

import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; 

const baseUrl = "http://localhost:8080";

function EditPart() {
    const params = useParams();
    const Navigate = useNavigate();

    const dataToSendInitial = {
        part_stock: "",
        part_name: "",
        price: "",
        number_of_pieces: "",
        car_id: "",
    }
    const formInitial = {
        part_stock: "",
        part_name: "",
        price: "",
        number_of_pieces: "",
        car_stock: "",
        car_id: "",
    }
    const [ form, setForm ] = useState(formInitial);

    useEffect(() => {
        const getPartInfo = async () => {
            try {
                const response = await axios.get(`${baseUrl}/car-parts/${params.id}`);
                const part = response.data;
                setForm({
                    part_stock: part.part_stock,
                    part_name: part.part_name,
                    price: part.price,
                    number_of_pieces: part.number_of_pieces,
                    car_stock: part.car_stock,
                    car_id: part.car_id,
                });
            } catch (error) {
                console.error("Failed to retrieve part information: ", error);
                alert("Failed to retrieve part information");
            }
        }
        getPartInfo();
    }, [params.id]);

    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    // TO ADD FORM VALIDATION IN THE FUTURE

    const handleSubmit = async (event) => {
        event.preventDefault();

        let dataToSend = { 
            ...dataToSendInitial,
            part_stock: parseInt(form.part_stock),
            part_name: form.part_name,
            price: parseFloat(form.price),
            number_of_pieces: parseInt(form.number_of_pieces),
            car_id: parseInt(form.car_id),
        };

        try {
            const response = await axios.patch(`${baseUrl}/car-parts/${params.id}`, dataToSend); console.log(dataToSend);
            if (response.status === 200) {
                alert("Part editted successfully");

                Navigate(`/parts/${params.id}`);
            } else {
                alert("Failed to edit part");
            }
        } catch (error) {
            console.error("Error editting part: ", error);
            alert("Failed to edit part");
        }
    }

    const handleCancelBtn = () => {
        Navigate (`/parts/${params.id}`);
    };

  return (
    <>
      <section className="edit-part">
        <div className="edit-part__title-form-container">
          <h2 className="edit-part__title">Edit Part</h2>
          <form className="edit-part__form" onSubmit={handleSubmit}>
            <div className="edit-part__all-input-container">
              <div className="edit-part__two-input-block">
                <div className="edit-part__input-label-container">
                  <label className="edit-part__label" htmlFor="part_stock">
                    Part Stock #:
                  </label>
                  <input
                    className="edit-part__input"
                    type="text"
                    name="part_stock"
                    id="part_stock"
                    placeholder="Part stock #"
                    value={form.part_stock}
                    onChange={handleChange}
                  />
                </div>
                <div className="edit-part__input-label-container">
                  <label className="edit-part__label" htmlFor="part_name">
                    Part Name:
                  </label>
                  <input
                    className="edit-part__input"
                    type="text"
                    name="part_name"
                    id="part_name"
                    placeholder="Part name"
                    value={form.part_name}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="edit-part__two-input-block">
                <div className="edit-part__input-label-container">
                  <label className="edit-part__label" htmlFor="price">
                    Price:
                  </label>
                  <input
                    className="edit-part__input"
                    type="text"
                    name="price"
                    id="price"
                    placeholder="price"
                    value={form.price}
                    onChange={handleChange}
                  />
                </div>
                <div className="edit-part__input-label-container">
                  <label className="edit-part__label" htmlFor="number_of_pieces">
                    # Of Pieces:
                  </label>
                  <input
                    className="edit-part__input"
                    type="text"
                    name="number_of_pieces"
                    id="number_of_pieces"
                    placeholder="# of pieces"
                    value={form.number_of_pieces}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="edit-part__two-input-block">
                <div className="edit-part__input-label-container edit-part__input-label-container--odd">
                  <label className="edit-part__label" htmlFor="car_stock">
                    Car Stock #:
                  </label>
                  <input
                    className="edit-part__input"
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
            <div className="edit-part__btn-container">
              <button className="edit-part__btn edit-part__btn--cta btn btn--cta">
                Save Part
              </button>
              <button
                className="edit-part__btn edit-part__btn--cancel btn btn--cancel"
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

export default EditPart;
