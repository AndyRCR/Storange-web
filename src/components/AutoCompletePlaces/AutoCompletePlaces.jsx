import { useRef, useEffect } from "react";
import './AutoCompletePlaces.css'

const AutoCompletePlaces = () => {
  const autoCompleteRef = useRef();
  const inputRef = useRef();
  const options = {
    componentRestrictions: { country: "pe" },
    fields: ["address_components", "geometry", "icon", "name"]
  };
  useEffect(() => {
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      options
    );

    autoCompleteRef.current.addListener("place_changed", async function () {
      const place = await autoCompleteRef.current.getPlace();
      console.log(place.geometry.location.lat(),  place.geometry.location.lng());
     });
  }, []);
  return (
    <div className="autoCompletePlaces">
      <label>Direccion: </label>
      <input ref={inputRef} />
    </div>
  );
};
export default AutoCompletePlaces;