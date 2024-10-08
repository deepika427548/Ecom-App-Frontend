import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getPriceQueryParams } from "../../Helpers/Helpers";
import { Product_Categories } from "../../Constants/Constants";
import StarRatings from "react-star-ratings";

const Filter = () => {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);

  const navigate = useNavigate();
  let [searchParams] = useSearchParams();

  useEffect(() => {
    searchParams.has("min") && setMin(searchParams.get("min"));
    searchParams.has("max") && setMax(searchParams.get("max"));
  }, []);

  // -------------------handle price filter------------------------

  const handleButtonClick = (e) => {
    e.preventDefault();

    searchParams = getPriceQueryParams(searchParams, "min", min);
    searchParams = getPriceQueryParams(searchParams, "max", max);

    //move the user to the updated path
    const path = window.location.pathname + "?" + searchParams.toString();
    navigate(path);
  };

  //--------------Handle category filter-------------------\

  const handleClickCheckBox = (checkbox) => {
    const checkboxes = document.getElementsByName(checkbox.name);
    // console.log(checkboxes);

    checkboxes.forEach((item) => {
      if (item !== checkbox) item.checked = false;
    });

    if (checkbox.checked === false) {
      if (searchParams.has(checkbox.name)) {
        searchParams.delete(checkbox.name);
        const path = window.location.pathname + "?" + searchParams.toString();
        navigate(path);
      }
    } else {
      //set new value if already there
      if (searchParams.has(checkbox.name)) {
        searchParams.set(checkbox.name, checkbox.value);
      } else {
        searchParams.append(checkbox.name, checkbox.value);
      }
      const path = window.location.pathname + "?" + searchParams.toString();
      navigate(path);
    }
  };

  const defaultCheckHandler = (checkboxType, checkboxValue) => {
    const value = searchParams.get(checkboxType);
    if (checkboxValue === value) return true;
    return false;
  };

  return (
    <div className="border p-3 filter">
      <h3>Filters</h3>
      <hr />
      <h5 className="filter-heading mb-3">Price</h5>
      <form id="filter_form" className="px-2" onSubmit={handleButtonClick}>
        <div className="row">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Min"
              name="min"
              value={min}
              onChange={(e) => {
                setMin(e.target.value);
              }}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Max"
              name="max"
              value={max}
              onChange={(e) => {
                setMax(e.target.value);
              }}
            />
          </div>
          <div className="col">
            <button type="submit" className="btn btn-primary">
              GO
            </button>
          </div>
        </div>
      </form>
      <hr />
      {/* category */}
      <h5 className="mb-3">Category</h5>

      {Product_Categories?.map((Category) => (
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="category"
            id="check4"
            value={Category}
            defaultChecked={defaultCheckHandler("category", Category)}
            onClick={(e) => {
              handleClickCheckBox(e.target);
            }}
          />
          <label className="form-check-label" for="check4">
            {" "}
            {Category}
          </label>
        </div>
      ))}

      <hr />
      <h5 className="mb-3">Ratings</h5>
      {[5, 4, 3, 2, 1].map((rating) => (
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="ratings"
            id="check4"
            value={rating}
            defaultChecked={defaultCheckHandler("ratings", rating)}
            onClick={(e) => handleClickCheckBox(e.target)}
          />
          <label className="form-check-label" for="check7">
            <StarRatings
              rating={rating}
              starRatedColor="orange"
              numberOfStars={5}
              name="rating"
              starDimension="21px"
              starSpacing="1px"
            />
          </label>
        </div>
      ))}
    </div>
  );
};

export default Filter;
