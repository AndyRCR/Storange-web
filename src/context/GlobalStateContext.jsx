import React, { createContext, useState } from "react";

export const GlobalContext = createContext()

const GlobalStateContext = ({ children }) => {

  const [isLoading, setIsLoading] = useState(false)

  const [idPropietario, setIdPropietario] = useState('ddd67238')
  const [propietario, setPropietario] = useState(null)
  const [fotos, setFotos] = useState(null)
  const [articulos, setArticulos] = useState(null)
  const [userIsTrusted, setUserIsTrusted] = useState(null)

  const [articulo, setArticulo] = useState(null)
  const [filteredArticles, setFilteredArticles] = useState([])

  const [filter, setFilter] = useState('')
  const [cajaFilter, setCajaFilter] = useState(false)
  const [sueltoFilter, setSueltoFilter] = useState(false)

  const handleFilters = () => {
    if (cajaFilter === true && sueltoFilter === false) {
      setFilteredArticles(articulos.filter(el => el.tipoArticulo.toLowerCase() === 'caja'))
    } else if (cajaFilter === false && sueltoFilter === true) {
      setFilteredArticles(articulos.filter(el => el.tipoArticulo.toLowerCase() === 'suelto'))
    } else setFilteredArticles(articulos)
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
    let details = { idPropietario, filter }

    fetch("http://localhost:3306/articulovirtual", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: encodePetition(details)
    })
      .then((res) => res.json())
      .then((res) => setArticulos(res))
  }

  const actualizarTitulo = (titulo, setEditTitle) => {
    let details = { titulo, idArticulo: articulo.idArticulo }

    setIsLoading(true)

    fetch("http://localhost:3306/actualizarTitulo", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: encodePetition(details)
    })
      .then(() => {
        setIsLoading(false)
        setArticulo({ ...articulo, Titulo: titulo })
        setEditTitle(false)
      })
  }

  const actualizarDescripcion = (descripcion, setEditDescription) => {
    let details = { descripcion, idArticulo: articulo.idArticulo }

    setIsLoading(true)

    fetch("http://localhost:3306/actualizarDescripcion", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: encodePetition(details)
    })
      .then(() => {
        setIsLoading(false)
        setArticulo(
          descripcion === ''
          ? { ...articulo, descripcionPropietario: null }
          : { ...articulo, descripcionPropietario: descripcion })
        setEditDescription(false)
      })
  }

  return (
    <GlobalContext.Provider
      value={{
        isLoading, setIsLoading,
        propietario, setPropietario,
        userIsTrusted, setUserIsTrusted,
        encodePetition, buscarPropietario,
        buscarArticulos, articulos,
        setIdPropietario, fotos, articulo,
        obtenerArticulo,
        filteredArticles, setFilteredArticles,
        filter, setFilter,
        cajaFilter, setCajaFilter,
        sueltoFilter, setSueltoFilter,
        handleFilters,
        actualizarTitulo, actualizarDescripcion
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalStateContext;