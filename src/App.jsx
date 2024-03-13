import './App.css'
import './normalize.css'
import React, {useState} from 'react';
import {datos} from './datos.jsx'
import {recuerdos} from './datos.jsx'
import { cartas } from './datos.jsx';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import nutria from './img/nutria.jpg'
import oso from './img/oso.jpg'
import amren from './img/amren.avif'
import libros from './img/libros.jpeg'

function App() {
  const styles = {
    with: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  };

  return (
    <div style={styles}> 
      <Foto />
      <ParteDos />
      <Parte3 bandera={true}/>
      <Parte4 />
    </div>
  );
}

export default App;

function Foto() {
  const [data, setData] = useState(0);

  const descripcion_corta = (texto, largo) => {
    if (texto.length > largo) {
      return texto.slice(0, largo) + '...';
    } else {
      return texto;
    }
  }

  return (
    <div className='fondo-foto'>
      <div className='fondo' style={{ backgroundImage: `url(${datos[data].url})` }}></div>
      <div className='cont'>
        <div className='textos'>
          <div className='con-texto'>
            <div>
              <h3 className='titulos-foto'>{datos[data].nombre}</h3>
              <p className='text-foto w2'>{datos[data].descripcion}</p>
            </div>
            <div>
              <button className='btn'>Ver más</button>
            </div>
          </div>
          <div className='con-car'>
          </div>
        </div>
        <div className='cont-foto'>
         <HorizontalCarousel data={data} set={setData}/>
        </div>
      </div>
    </div>
  );
}

const HorizontalCarousel = ({data, set}) => {

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '80px',
    arrows: true,
    beforeChange: () => data >= datos.length-1 ? set(0) : set(data + 1),
  };

  return (
    <Slider {...settings} className='carousel'>
      {datos.map((data) => (
        <div key={data.id} className='carousel-cont'>
          <img className='carousel-cont-img' src={data.url} alt="" />
        </div>
      ))}
    </Slider>
  );
};

function ParteDos() {
  const [mostrarNuevoDiv, setMostrarNuevoDiv] = useState(false);
  const [juego, setJuego] = useState(0);

  const mostrarDiv = (juego) => {
    setMostrarNuevoDiv(true);
    setJuego(juego);
  };
  const ocultarDiv = () => {
    setMostrarNuevoDiv(false);
  }



  return(
    <div className='cont-games'>
      <h2 className='titulos-foto'>¿Quieres jugar algo?</h2>
      <div className='games-flex'>
        <Games titulo="Pregunta" desc="Si contestas bien la pregunta te ganas un premio" fondo={nutria} accion={() => mostrarDiv(1)}/>
        <Games titulo="Ordena" desc="Si ordenas bien la secuencia te ganas un premio" fondo={amren}  accion={() => mostrarDiv(2)}/>
        <Games titulo="Misteriosa" desc="Si contestas bien la pregunta te ganas un premio" fondo={libros}  accion={() => mostrarDiv(3)}/>
      </div>
      {mostrarNuevoDiv && juego === 1 && <Pregunta />}
      {mostrarNuevoDiv && juego === 2 && <Ordena />}
      {mostrarNuevoDiv && juego === 3 && <Regalo />}
    </div>
  );
}

function Games( {titulo, desc, fondo, accion} ) {
  return(
      <div className='games'>
        <div className='filtro-games' style={{ backgroundImage: `url(${fondo})` }}></div>
        <h3 className='quitar-margin centrar-texto'>{titulo}</h3>
        <p className='quitar-margin centrar-texto'>{desc}</p>
        <button className='btn btn__games' onClick={accion}>Jugar</button>
      </div>
  );
}

function Parte3( {bandera} ) {
  return (
    <div className='cont-recuerdos'>
      <h2 className='titulos-foto'>Recuerdos</h2>
      <div className='recuerdos'>
      {recuerdos.map((rec) => (
        <div key={rec.id} className=''>
          <Recuerdos nombre={rec.nombre} img={rec.url} descripcion={rec.descripcion} />
        </div>
      ))}
      </div>
    </div>
  );
}

function Parte4() {
  return (
    <div className='final'>
      <h2 className='titulos-foto'>¡Te amo!</h2>
      <p className='text-foto'><strong>Nota: </strong>Cada viernes habrá una actualización(:</p>
    </div>
  );
}

function Recuerdos({nombre, img, descripcion}) {
  return (
    <div className='recuerdo'>
      <h3 className='titulos-recuerdos'>
        {nombre}
      </h3>
      <Fotos img={img} />
      <p className='texto-recuerdos'>
        {descripcion}
      </p>
    </div>
  );

}

function Fotos({img}){
  return (
    <img className='fotito' src={img} alt="Foto de mi amorcito" />
  );
}

function Pregunta() {
  const [respuesta, setRespuesta] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleChange = (event) => {
    setRespuesta(event.target.value);
  };

  const handleSubmit = () => {
    if (respuesta.trim() === '') {
      setMensaje('Por favor ingresa una respuesta.');
    } else if (respuesta.trim().toLowerCase() === 'friends') {
      setMensaje(cartas[0]);
    } else {
      setMensaje('Respuesta incorrecta. Inténtalo de nuevo.');
    }
  };

  const handleClose = () => {
    setMensaje('');
  };


  return (
    <div className='pregunta'>
      <h2 className='titulos-foto'>Pregunta</h2>
      <p className='text-foto'>¿Cuál es mi serie favorito?</p>
      <input type="text" className='input' value={respuesta} onChange={handleChange} />
      <button className='btn btn--juego' onClick={handleSubmit}>Enviar</button>
      <VentanaFlotante mensaje={mensaje} onClose={handleClose} />
    </div>
  );
}

function Ordena() {
  const [respuesta, setRespuesta] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleChange = (event) => {
    setRespuesta(event.target.value);
  };

  const handleSubmit = () => {
    if (respuesta.trim() === '') {
      setMensaje('Por favor ingresa una respuesta.');
    } else if (respuesta.trim().toLowerCase() === '1243') {
      setMensaje(cartas[1]);
    } else {
      setMensaje('Respuesta incorrecta. Inténtalo de nuevo.');
    }
  };

  const handleClose = () => {
    setMensaje('');
  };


  return (
    <div className='pregunta'>
      <h2 className='titulos-foto'>Ordénalas(:</h2>
      <div>
        <p>
          1. Primer beso
        </p>
        <p>
          2. Primer abrazo
        </p>
        <p>
          3. Primer te amo
        </p>
        <p>
          4. Ser novios
        </p>
      </div>
      <input type="text" className='input' value={respuesta} onChange={handleChange} placeholder='Escribe el orden sin comas ej. 2341' />
      <button className='btn btn--juego' onClick={handleSubmit}>Enviar</button>
      <VentanaFlotante mensaje={mensaje} onClose={handleClose} />
    </div>
  );
}

function Regalo() {
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = () => {
    setMensaje(cartas[2]);
  };

  const handleClose = () => {
    setMensaje('');
  };

  return (
    <div className='pregunta'>
      <h2 className='titulos-foto'>Esta te la regalo por preciosa(:</h2>
      <p className='text-foto'>Dale clic al boton antes de que me arripeinta jajaj</p>
      <button className='btn btn--juego' onClick={handleSubmit}>Enviar</button>
      <VentanaFlotante mensaje={mensaje} onClose={handleClose} juego={true} />
    </div>
  );
}

function VentanaFlotante({ mensaje, onClose, juego }) {
  return (
    <div className={`ventana-flotante ${mensaje ? 'visible' : ''}`}>
      <div className="contenido">
        <h2 style={{color:'black'}}>{mensaje.titulo}</h2>
        { juego ? 
          (Array.isArray(mensaje.contenido) ? 
            mensaje.contenido.map((parrafo, index) => <p style= {{fontSize: '1.5rem'}} key={index}>{parrafo}</p>) : 
            <p>{mensaje.contenido}</p>) : 
          <p>{mensaje.contenido}</p>
        }
        <p><strong>{mensaje.team}</strong></p>
        <p><strong>{mensaje.final}</strong></p>
        <button className="btn btn--cerrar" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}