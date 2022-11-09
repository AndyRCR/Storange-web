import { collection, getDocs } from "firebase/firestore";
import React, { createContext, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { db } from "../service/Firebase";

export const GlobalContext = createContext()

const GlobalStateContext = ({ children }) => {

  const [isLoading, setIsLoading] = useState(false)
  const [loaderState, setLoaderState] = useState(1)
  const [change, setChange] = useState(true)
  const [activeModal, setActiveModal] = useState(false)
  const [activeDireccionModal, setActiveDireccionModal] = useState(false)
  const [page, setPage] = useState(1)
  const [filtersDisplayed, setFiltersDisplayed] = useState(false)
  const [swalCambio, setSwalCambio] = useState(true)

  const [idPropietario, setIdPropietario] = useState(null || localStorage.getItem('trustedUser'))
  const [direcciones, setDirecciones] = useState(null)
  const [propietario, setPropietario] = useState(null)
  const [fotos, setFotos] = useState(null)
  const [userIsTrusted, setUserIsTrusted] = useState(null)

  const [articulos, setArticulos] = useState(null)
  const [articulo, setArticulo] = useState(null)
  const [carrito, setCarrito] = useState(null)
  const [activeFilters, setActiveFilters] = useState([])
  const [filteredArticles, setFilteredArticles] = useState([])
  const [ids, setIds] = useState([])
  const [ordenesEnProgreso, setOrdenesEnProgreso] = useState(null)

  const [filter, setFilter] = useState('')
  const [cajaFilter, setCajaFilter] = useState(false)
  const [sueltoFilter, setSueltoFilter] = useState(false)

  const [formEnvioPage, setFormEnvioPage] = useState(1.5)
  const [direccionSelect, setDireccionSelect] = useState("default")
  const [direccionName, setDireccionName] = useState(null)
  const [direccionAutoSelect, setDireccionAutoSelect] = useState(false)

  const [oe, setOe] = useState({
    m3: '',
    direccion: '',
    tipoServicio: 'normal',
    fecha: new Date(Date.now()).toISOString().slice(0,10),
    total: '',
    fechaServicio: new Date(Date.now()).toISOString().slice(0,10)
  })

  const restartAll = () => {
    localStorage.removeItem('trustedUser')

    setIsLoading(false)
    setLoaderState(1)
    setChange(true)
    setActiveModal(false)
    setActiveDireccionModal(false)

    setIdPropietario(null || localStorage.getItem('trustedUser'))
    setDirecciones(null)
    setPropietario(null)
    setFotos(null)
    setUserIsTrusted(null)

    setArticulos(null)
    setArticulo(null)
    setCarrito(null)
    setActiveFilters([])
    setFilteredArticles([])
    setIds([])
    setOrdenesEnProgreso([])

    setFilter('')
    setCajaFilter(false)
    setSueltoFilter(false)

    setFormEnvioPage(1)
    setOe({
      m3: '',
      direccion: '',
      tipoServicio: 'normal',
      fecha: new Date(Date.now()).toISOString().slice(0,10),
      total: '',
      fechaServicio: new Date(Date.now()).toISOString().slice(0,10)
    })
  }

  const formatStrings = (str) =>{
    return str
    .replaceAll('Ã±','ñ')
    .replaceAll('Ã¡','á')
    .replaceAll('Ã','í')
    .replaceAll('í³','ó')
  }

  const handleFilters = () => {
    setPage(1)
    if (activeFilters.length === 0) {
      setFilteredArticles(articulos)
    } else if (
      (activeFilters.indexOf('caja') !== -1 ||
        activeFilters.indexOf('suelto') !== -1) === false &&
      (activeFilters.indexOf(1) !== -1 ||
        activeFilters.indexOf(2) !== -1 ||
        activeFilters.indexOf(3) !== -1 ||
        activeFilters.indexOf(5) !== -1) === true
    ) {
      setFilteredArticles(articulos.filter(el => activeFilters.indexOf(el.idEstadoArticulo) !== -1))
    } else if (
      (activeFilters.indexOf('caja') !== -1 ||
        activeFilters.indexOf('suelto') !== -1) === true &&
      (activeFilters.indexOf(1) !== -1 ||
        activeFilters.indexOf(2) !== -1 ||
        activeFilters.indexOf(3) !== -1 ||
        activeFilters.indexOf(5) !== -1) === false
    ) {
      setFilteredArticles(articulos.filter(el => activeFilters.indexOf(el.tipoArticulo.toLowerCase()) !== -1))
    } else {
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

    fetch("https://api.storange.pe/propietarioPorId", {
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

    fetch("https://api.storange.pe/direcciones", {
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

    fetch("https://api.storange.pe/fotos", {
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

    fetch("https://api.storange.pe/articuloPorId", {
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
    fetch("https://api.storange.pe/articulovirtual", {
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
        setCarrito(res.filter(art => {
          return art.estadoEnvio === 1 && art.idEstadoArticulo !== 3
        }))
        if (showToast === 1) toast("Se agregó al carrito de envío")
        if (showToast === 2) toast("Articulo retirado del carrito de envío")
      })
  }

  const actualizarTitulo = (titulo, setEditTitle) => {
    let details = { titulo, idArticulo: articulo.idArticulo }

    setIsLoading(true)

    fetch("https://api.storange.pe/actualizarTitulo", {
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

    fetch("https://api.storange.pe/actualizarDescripcion", {
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
    let details = { estadoEnvio, idArticulo }

    setIsLoading(true)

    fetch("https://api.storange.pe/actualizarEstadoEnvio", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: encodePetition(details)
    })
      .then(() => {
        setArticulo(
          {
            ...articulo,
            estadoEnvio
          }
        )
        estadoEnvio === 1
          ? buscarArticulos(1)
          : buscarArticulos(2)
      })
  }

  const agregarDireccion = (lat, lng, direction) => {
    let details = { lat, lng, direction, idPropietario }
    setIsLoading(true)

    fetch("https://api.storange.pe/agregarDireccion", {
      method: "PUT",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: encodePetition(details)
    })
      .then(() => {
        setIsLoading(false)
        setActiveDireccionModal(false)
        buscarDireccion()
        toast("Dirección agregada correctamente")
      })
  }

  const buscarOrdenes = async () => {
    const col = collection(db, idPropietario)
    try {
      const data = await getDocs(col)
      const res = data.docs.map(doc => doc = { id: doc.id, ...doc.data() })
      setOrdenesEnProgreso(res.sort((a, b) => {
        return a.fechaServicio.localeCompare(b.fechaServicio) && a.fecha.localeCompare(b.fecha)
      }))
    } catch (error) {
      console.log(error)
    }
  }

  const actualizarOrdenes = () => {
    let details = { idPropietario }
    fetch("https://api.storange.pe/actualizarOrdenes", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: encodePetition(details)
    })
      .then(() => {
        setFormEnvioPage(-1)
        buscarArticulos()
        buscarOrdenes()
      })
  }

  const borrarDireccion = async (idDireccion) => {
    let details = { idDireccion }

    fetch("https://api.storange.pe/borrarDireccion", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: encodePetition(details)
    })
      .then(() => {
        buscarDireccion()
        Swal.fire({
          title: 'Dirección borrada',
          text: 'La dirección se borró correctamente',
          icon: 'success'
        })
      })
  }

  const crearDetalleOGL = (idOGL, idArticulo) =>{
    let details = {idOGL, idArticulo}

    fetch("https://api.storange.pe/crearDetalleOGL", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: encodePetition(details)
    })
  }

  const crearOGL = (idServicio) =>{
    let details = {
      idPropietario: propietario.idPropietario,
      idServicio,
      fechaSolicitado: oe.fecha,
      direccion: oe.direccion,
      volumen: carrito.map(articulo => articulo.volumen).reduce((a, b) => parseFloat((a + b).toPrecision(2)))
    }

    fetch("https://api.storange.pe/crearOGL", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: encodePetition(details)
    })
    .then(res => res.json())
    .then(data => {
      carrito.forEach(art => crearDetalleOGL(data.idOGL, art.idArticulo))
    })
  }

  const obtenerServicio = () =>{
    fetch("https://api.storange.pe/obtenerServicio", {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      }
    })
    .then(res => res.json())
    .then(data => {
      if(data.length > 0) crearOGL(data[0].idServicio)
      else crearServicio()
    })
  }

  const crearServicio = () =>{

    fetch("https://api.storange.pe/crearServicio", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      }
    })
    .then(() => obtenerServicio())
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
        activeDireccionModal, setActiveDireccionModal,
        agregarDireccion,
        oe, setOe,
        ids, setIds,
        ordenesEnProgreso, setOrdenesEnProgreso,
        buscarOrdenes, actualizarOrdenes,
        restartAll, borrarDireccion,
        obtenerServicio,
        page, setPage,
        filtersDisplayed, setFiltersDisplayed,
        swalCambio, setSwalCambio,
        direccionSelect, setDireccionSelect,
        direccionName, setDireccionName,
        direccionAutoSelect, setDireccionAutoSelect,
        formatStrings
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalStateContext;