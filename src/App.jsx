import { useEffect, useRef, useState } from "react";
import "./App.css";
import useFetch from "./hooks/use.Fetch";
import getRandomNumber from "./assets/services/getRandomNumber";
import LocationInfo from "./assets/components/LocationInfo";
import ResidentCard from "./assets/components/ResidentCard";

function App() {
  const [locationId, setLocationId] = useState(getRandomNumber(126));

  const url = `https://rickandmortyapi.com/api/location/${locationId}`;
  const [check, setCheck] = useState()

  const [location, getLocation, hansError] = useFetch(url);

  useEffect(() => {
    if (locationId !== "") {
    getLocation();
    }
  }, [locationId]);

  const inputId = useRef();

  const hadleSubmit = (e) => {
    e.preventDefault();
    setLocationId(inputId.current.value.trim());
    setCheck(inputId.current.value.trim())
  };

  console.log(location);

  return (
    <div>
      <header className="header">

         <img className="header__img2" src="/RickandMorty_title.png" alt="" />
       
      </header>
      

      <form className="header__form" onSubmit={hadleSubmit}>
            <input
              className="header__input"
              ref={inputId}
              type="text"
              placeholder="Enter Location"
            />
            <button className="header__button"> Search </button>
      </form>
      {(hansError || (check==="") || (check==="0"))
      ? 
      (
        <h3 className="header__error">
          {" "}
          Hey! 📢🚥 you must provide an id from 1 to 126.🤷‍♀️😉
        </h3>
      ) : (
        <>
          <LocationInfo location={location} />

          <div className="card__container">
            {location?.residents.map((url) => (
              <ResidentCard key={url} url={url} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
