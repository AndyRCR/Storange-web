import { useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "./Places.css";
import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalStateContext";

const useStyles = makeStyles({
  button: {
    '&.Mui-disabled': {
      backgroundColor: '#E5E5E5 !important',
      color: '#ABABAB !important'
    },
    backgroundColor: '#f94700 !important',
    textTransform: 'none !important',
    fontWeight: 'bold !important',
    color: '#fff !important',
    width: '300px !important',
    margin: '20px 0 !important',
    height: 'fit-content !important'
  }
})

const options = {
  googleMapsApiKey: 'AIzaSyDIlf2x7KJR-KkSTUnPgsQZwLbgLTrqLXY',
  libraries: ["places"],
  id: 'ChIJ9RRZwFDIBZERSAYheRIBnvI',
  region: 'PE'
}

const Places = () => {
  const [selected, setSelected] = useState(null)
  const [direction, setDirection] = useState(null)

  const { isLoaded } = useLoadScript(options)
  const { direcciones, agregarDireccion } = useContext(GlobalContext)
  const classes = useStyles()

  useEffect(() => {
  }, [selected, direcciones])

  return (
    <>
      {isLoaded && direcciones !== null ? (
        <>
          <div className="places-container">
            <PlacesAutocomplete setSelected={setSelected} setDirection={setDirection} />
          </div>

          <div style={{ height: '100%', width: '100%' }}>
            <GoogleMap
              mapContainerStyle={{ height: '100%' }}
              zoom={16}
              center={selected === null ? { lat: parseFloat(direcciones[direcciones.length - 1]?.lat), lng: parseFloat(direcciones[direcciones.length - 1]?.lng) } : selected}
              mapContainerClassName="map-container"
            >
              {selected && <Marker position={selected} />}
            </GoogleMap>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                className={classes.button}
                disabled={selected === null}
                onClick={() => {
                  document.body.style.overflowY = "visible"
                  agregarDireccion(selected.lat, selected.lng, direction)
                  setSelected(null)
                  setDirection(null)
                }}>
                Agregar dirección seleccionada
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </>
  )
}

const PlacesAutocomplete = ({ setSelected, setDirection }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: {
        country: "pe",
      }
    }
  })

  const handleSelect = async (address) => {
    setValue(address, false)
    setDirection(address)
    clearSuggestions()

    const results = await getGeocode({ address })
    const { lat, lng } = await getLatLng(results[0])
    setSelected({ lat, lng })
  };

  return (
    <Combobox className="combobox" onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={(e) => {
          sessionStorage.removeItem('upa')
          setSelected(null)
          setDirection(null)
          setValue(e.target.value)
        }}
        disabled={!ready}
        className="comboboxInput"
        placeholder="Ingrese una dirección"
      />
      <ComboboxPopover style={{ zIndex: 100 }}>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  )
}

export default Places