import React, { useState, useEffect } from 'react';

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [nuevoUsuario, setNuevoUsuario] = useState({ nombre: '' });

  useEffect(() => {
    // Función para obtener todos los usuarios
    const obtenerUsuarios = async () => {
      try {
        const response = await fetch('http://localhost:3000/usuarios');
        const data = await response.json();
        console.log(JSON.stringify(data));
        setUsuarios(data);
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    };

    obtenerUsuarios();
  }, []); // El [] asegura que este efecto se ejecute solo una vez al montar el componente

  const handleInputChange = (e) => {
    setNuevoUsuario({ nombre: e.target.value });
  };

  const handleAgregarUsuario = async () => {
    try {
      const response = await fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoUsuario),
      });

      if (response.ok) {
        const data = await response.json();
        setUsuarios([...usuarios, data]);
        setNuevoUsuario({ nombre: '' });
      } else {
        console.error('Error al agregar usuario:', response.statusText);
      }
    } catch (error) {
      console.error('Error al agregar usuario:', error);
    }
  };

  return (
    <div>
      <h1>Usuarios</h1>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id}>{usuario.nombre}</li>
        ))}
      </ul>

      <input
        type="text"
        placeholder="Nombre del nuevo usuario"
        value={nuevoUsuario.nombre}
        onChange={handleInputChange}
      />
      <button onClick={handleAgregarUsuario}>Agregar Usuario</button>
    </div>
  );
}

export default App;
