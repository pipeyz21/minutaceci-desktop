import {useState} from "react"

const ComboBox = ({ items, rowIndex, column, onUpdate }) => {
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false); // Para controlar si la lista está abierta

  // Maneja los cambios en el input (para escribir)
  const handleInputChange = (e) => {
    const newValue = e.target.value
    setInputValue(newValue);
    onUpdate(e, rowIndex, column)
    setIsOpen(true); // Abre la lista al escribir
  };

  // Maneja la selección de una opción (actualiza data en el padre)
  const handleOptionClick = (item) => {
    setInputValue(item);
    setTimeout(() => setIsOpen(false), 200)
    setIsOpen(false);  // Cierra la lista después de seleccionar
    // onUpdate(item, rowIndex, column)
  };

  // Filtra las opciones basadas en el valor del input
  const filteredItems = items.filter(item =>
    item.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div style={{ position: 'relative' }}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => handleInputChange(e)} // Actualiza el valor del input
        placeholder="Escribe o selecciona..."
        onClick={() => setIsOpen(true)} // Abre la lista al hacer clic en el input
        onBlur={() => setTimeout(() => setIsOpen(false), 200)} // Cierra la lista después de un pequeño retraso
      />
      {/* {isOpen && (
        <ul style={{
          position: 'absolute',
          border: '1px solid #ccc',
          maxHeight: '150px',
          overflowY: 'auto',
          backgroundColor: 'white',
          zIndex: 1
        }}>
          {filteredItems.map((item, index) => (
            <li
              key={index}
              style={{ padding: '8px', cursor: 'pointer' }}
              onClick={(e) => console.log('Item clicked:', item)} // Selecciona el item y añade al input
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f0f0f0'} // Estilo al pasar el mouse
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'white'} // Restablece el estilo
            >
              {item}
            </li>
          ))}
          {filteredItems.length === 0 && (
            <li style={{ padding: '8px', color: '#888' }}>Sin resultados</li>
          )}
        </ul>
      )} */}
    </div>
  );
};

export default ComboBox