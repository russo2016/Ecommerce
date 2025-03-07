import { useLocation, useNavigate } from 'react-router-dom';
import './Ticket.css';

function Ticket() {
  const { state } = useLocation();
  const ticket = state?.ticket;
  const navigate = useNavigate();

  if (!ticket) {
    return <p>No se encontró la información del ticket.</p>;
  }

  return (
    <div className="ticket-container-">
    <div className="ticket-container">
      <h1 className="ticket-container__title">Ticket de Compra</h1>
      <p className="ticket-container__info">
        <strong>Código:</strong> {ticket.code}
      </p>
      <p className="ticket-container__info">
        <strong>Fecha de compra:</strong> {ticket.purchase_datetime}
      </p>
      <p className="ticket-container__info">
        <strong>Comprador:</strong> {ticket.purchaser}
      </p>
      <p className="ticket-container__info">
        <strong>Total: </strong> ${ticket.amount}
      </p>
      <h2 className="ticket-container__subtitle">Productos:</h2>
      <ul className="ticket-container__products-list">
        {ticket.products.map((item, index) => (
          <li key={index} className="ticket-container__product-item">
            {item.quantity}x {item.product}
          </li>
        ))}
      </ul>
      {ticket.noStockProducts && ticket.noStockProducts.length > 0 && (
        <>
          <h2 className="ticket-container__subtitle">Productos sin stock:</h2>
          <ul className="ticket-container__no-stock-products-list">
            {ticket.noStockProducts.map((item, index) => (
              <li key={index} className="ticket-container__no-stock-item">
                {item.quantity}x {item.product}
              </li>
            ))}
          </ul>
        </>
      )}
        <h3 className="volver-al-menu" onClick={() => navigate("/products")}>
            volver al menú
        </h3>
    </div>
    </div>
  );
}

export default Ticket;
