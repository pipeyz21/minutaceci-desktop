function Form({ data, setData }) {
  // Función para manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Función para manejar el envío del formulario
  
  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <div className="flex flex-col space-y-2">
        <div className="flex justify-between items-center">
          <label htmlFor="numeroBoleta">Boleta N°:</label>
          <input
            type="text"
            id="id"
            name="id"
            value={data.id}
            onChange={handleChange}
            className="border rounded p-1"
          />
        </div>
  
        <div className="flex justify-between items-center">
          <label htmlFor="cliente">Cliente:</label>
          <input
            type="text"
            id="client"
            name="client"
            value={data.client}
            onChange={handleChange}
            className="border rounded p-1"
          />
        </div>

        <div className="flex justify-between items-center">
          <label htmlFor="fecha">Fecha:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={data.date}
            onChange={handleChange}
            className="border rounded p-1"
          />
        </div>

        <div className="flex justify-between items-center">
          <label htmlFor="estado">Estado:</label>
          <input
            type="text"
            id="status"
            name="status"
            value={data.status}
            onChange={handleChange}
            className="border rounded p-1"
          />
        </div>

        <div className="flex justify-between items-center">
          <label htmlFor="pago">Pago:</label>
          <input
            type="text"
            id="payment"
            name="payment"
            value={data.payment}
            onChange={handleChange}
            className="border rounded p-1"
          />
        </div>
      </div>

    </div>
  )
}

export default Form