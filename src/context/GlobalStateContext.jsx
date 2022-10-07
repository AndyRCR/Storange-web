import React, { createContext, useState } from "react";
import { toast } from "react-toastify";

export const GlobalContext = createContext()

const GlobalStateContext = ({ children }) => {

  const [isLoading, setIsLoading] = useState(false)
  const [loaderState, setLoaderState] = useState(1)
  const [change, setChange] = useState(true)
  const [activeModal, setActiveModal] = useState(false)
  const [activeDireccionModal, setActiveDireccionModal] = useState(false)

  const [idPropietario, setIdPropietario] = useState('ddd67238')
  const [direcciones, setDirecciones] = useState(null)
  const [propietario, setPropietario] = useState(null)
  const [fotos, setFotos] = useState(null)
  const [userIsTrusted, setUserIsTrusted] = useState(null)
  
  const [articulos, setArticulos] = useState(null)
  const [articulo, setArticulo] = useState(null)
  const [carrito, setCarrito] = useState(null)
  const [activeFilters, setActiveFilters] = useState([])
  const [filteredArticles, setFilteredArticles] = useState([])

  const [filter, setFilter] = useState('')
  const [cajaFilter, setCajaFilter] = useState(false)
  const [sueltoFilter, setSueltoFilter] = useState(false)

  const [formEnvioPage, setFormEnvioPage] = useState(1)

  const handleFilters = () => {
    if(activeFilters.length === 0){
      setFilteredArticles(articulos)
    }else if(
      (activeFilters.indexOf('caja') !== -1 ||
      activeFilters.indexOf('suelto') !== -1) === false &&
      (activeFilters.indexOf(1) !== -1 ||
      activeFilters.indexOf(2) !== -1 ||
      activeFilters.indexOf(3) !== -1 ||
      activeFilters.indexOf(5) !== -1) === true
    ){
      setFilteredArticles(articulos.filter(el => activeFilters.indexOf(el.idEstadoArticulo) !== -1))
    }else if(
      (activeFilters.indexOf('caja') !== -1 ||
      activeFilters.indexOf('suelto') !== -1) === true &&
      (activeFilters.indexOf(1) !== -1 ||
      activeFilters.indexOf(2) !== -1 ||
      activeFilters.indexOf(3) !== -1 ||
      activeFilters.indexOf(5) !== -1) === false
    ){
      setFilteredArticles(articulos.filter(el => activeFilters.indexOf(el.tipoArticulo.toLowerCase()) !== -1))
    }else{
      setFilteredArticles(articulos.filter(el => {
        return activeFilters.indexOf(el.idEstadoArticulo) !== -1 && activeFilters.indexOf(el.tipoArticulo.toLowerCase()) !== -1
      }))
    }
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

  const buscarDireccion = () => {
    let details = { idPropietario }

    fetch("http://localhost:3306/direcciones", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: encodePetition(details)
    })
      .then((res) => res.json())
      .then((res) => {
        setDirecciones(res)
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

  const buscarArticulos = (showToast) => {
    showToast = showToast || null
    let details = { idPropietario, filter }
    fetch("http://localhost:3306/articulovirtual", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: encodePetition(details)
    })
      .then((res) => res.json())
      .then((res) => {
        setIsLoading(false)
        setArticulos(res)
        setFilteredArticles(res)
        setCarrito(res.filter(art => art.estadoEnvio === 1))
        if(showToast === 1) toast("Se agregó al carrito de envío")
        if(showToast === 2) toast("Articulo retirado del carrito de envío")
      })
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

  const actualizarEstadoEnvio = (estadoEnvio, idArticulo) => {
    let details = { estadoEnvio, idArticulo}

    setIsLoading(true)

    fetch("http://localhost:3306/actualizarEstadoEnvio", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: encodePetition(details)
    })
      .then(() => {
        setArticulo(
          {...articulo,
          estadoEnvio}
        )
        estadoEnvio === 1
        ? buscarArticulos(1)
        : buscarArticulos(2)
      })
  }

  return (
    <GlobalContext.Provider
      value={{
        isLoading, setIsLoading,
        loaderState, setLoaderState,
        change, setChange,
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
        actualizarTitulo, actualizarDescripcion,
        actualizarEstadoEnvio,
        carrito, setCarrito,
        activeFilters, setActiveFilters,
        formEnvioPage, setFormEnvioPage,
        activeModal, setActiveModal,
        direcciones, setDirecciones,
        buscarDireccion,
        activeDireccionModal, setActiveDireccionModal
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalStateContext;