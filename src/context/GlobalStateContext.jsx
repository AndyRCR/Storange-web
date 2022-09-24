import React, { createContext, useState } from "react";

export const GlobalContext = createContext()

const GlobalStateContext = ({ children }) => {

  const [idPropietario, setIdPropietario] = useState('ddd67238')
  const [propietario, setPropietario] = useState(null)
  const [fotos, setFotos] = useState(null)
  const [articulos, setArticulos] = useState(null)
  const [userIsTrusted, setUserIsTrusted] = useState(null)
  
  const [articulo, setArticulo] = useState(null)
  const [filteredArticles, setFilteredArticles] = useState([])

  const [cajaFilter, setCajaFilter] = useState(false)
  const [sueltoFilter, setSueltoFilter] = useState(false)

  const handleFilters = () =>{
    if(cajaFilter === true && sueltoFilter === false){
      setFilteredArticles(articulos.filter(el => el.tipoArticulo.toLowerCase() === 'caja'))
    }else if(cajaFilter === false && sueltoFilter === true){
      setFilteredArticles(articulos.filter(el => el.tipoArticulo.toLowerCase() === 'suelto'))
    }else setFilteredArticles(articulos)
  }

  const encodePetition = (parameters, formBody = []) => {
    for (let property in parameters) {
      let encodedKey = encodeURIComponent(property)
      let encodedValue = encodeURIComponent(parameters[property])
      formBody.push(encodedKey + "=" + encodedValue)
    }
    return formBody.join("&")
  }

  const buscarPropietario = () => {
    let details = { idPropietario }

    fetch("http://localhost:3306/propietarioPorId", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: encodePetition(details)
    })
      .then((res) => res.json())
      .then((res) => {
        setPropietario(res)
      })
  }

  const obtenerArticulo = (idArticulo) => {
    setArticulo(null)
    setFotos(null)
    let details = { idArticulo }

    fetch("http://localhost:3306/fotos", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: encodePetition(details)
    })
      .then((res) => res.json())
      .then((res) => {
        setFotos(res)
      })

    fetch("http://localhost:3306/articuloPorId", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: encodePetition(details)
    })
      .then((res) => res.json())
      .then((res) => {
        setArticulo(res)
      })
  }

  const buscarArticulos = () => {
    let details = { idPropietario }

    fetch("http://localhost:3306/articulovirtual", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: encodePetition(details)
    })
      .then((res) => res.json())
      .then((res) => {
        setArticulos(res)
        // setMontoAlmacenaje(
        //   parseFloat(
        //     res
        //       .map((el) => el.monto)
        //       .reduce((a, b) => a + b, 0)
        //       .toFixed(2)
        //   )
        // )
        // setVolumenActivo(
        //   parseFloat(
        //     res
        //       .map((el) => el.vaa)
        //       .reduce((a, b) => a + b, 0)
        //       .toFixed(2)
        //   )
        // )
      })
  }

  return (
    <GlobalContext.Provider
      value={{
        propietario, setPropietario,
        userIsTrusted, setUserIsTrusted,
        encodePetition, buscarPropietario,
        buscarArticulos, articulos,
        setIdPropietario, fotos, articulo,
        obtenerArticulo,
        filteredArticles, setFilteredArticles,
        cajaFilter, setCajaFilter,
        sueltoFilter, setSueltoFilter,
        handleFilters
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalStateContext;