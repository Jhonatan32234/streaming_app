import { useState } from 'react';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [responseData, setResponseData] = useState(null);
  const [authToken, setAuthToken] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Realizamos la solicitud POST con username y password
      const response = await axios.post('http://34.202.119.187:5000/verify', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Imprimir en consola los datos que recibimos
      console.log("Respuesta del servidor:", response.data);

      // Leer los datos del cuerpo de la respuesta
      const { tipo, id_esp32 } = response.data;
      console.log('Todos los encabezados:', response.headers);


      // Leer el token Authorization de los headers de la respuesta
      const token = response.headers['authorization'];
      if (token) {
        const tokenValue = token.split(' ')[1]; // El token está precedido por 'Bearer'
        console.log("Token de autorización:", tokenValue);

        // Guardamos el token en el estado para futuras peticiones
        setAuthToken(tokenValue);
      } else {
        console.error("Token no encontrado en los encabezados");
      }

      // Almacenar la respuesta en el estado
      setResponseData({ tipo, id_esp32, authToken: token });

      alert('Operación exitosa');
    } catch (error) {
      console.error("Hubo un error al enviar la solicitud:", error);
      alert('Hubo un error');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Iniciar sesión y verificar</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Enviar</button>
      </form>

      {responseData && (
        <div style={{ marginTop: '1rem' }}>
          <h3>Respuesta:</h3>
          <p><strong>Tipo:</strong> {responseData.tipo}</p>
          <p><strong>ID ESP32:</strong> {responseData.id_esp32}</p>
          <p><strong>Token de Autorización:</strong> {responseData.authToken}</p>
        </div>
      )}

      {authToken && (
        <div style={{ marginTop: '1rem' }}>
          <h3>Token Guardado:</h3>
          <p>{authToken}</p>
        </div>
      )}
    </div>
  );
}

export default App;
