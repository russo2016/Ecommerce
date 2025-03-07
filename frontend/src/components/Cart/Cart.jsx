import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import './cart.css';

function Cart () {
    const [products, setProducts] = useState([]);
    const [cartProducts, setCartProducts] = useState([]);
    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const fetchSessionAndCart = async () => {
          try {
            // Obtener la sesión actual
            const sessionResponse = await fetch('http://localhost:8080/api/sessions/current', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
            });
            const sessionData = await sessionResponse.json();
            setUser(sessionData.user);
            
            if (sessionData.user) {
              const cartResponse = await fetch(`http://localhost:8080/api/carts/${sessionData.user.cart}`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`
                }
              });
              const cartData = await cartResponse.json();
              setProducts(cartData.product);
            }
          } catch (error) {
            console.error("Error al obtener sesión o productos del carrito:", error);
          }
        };
      
        fetchSessionAndCart();
      }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!products || products.length === 0) return;
        
        const fetchProductDetails = async () => {
          try {
            const updatedProducts = await Promise.all(
              products.map(async (item) => {
                const resp = await fetch(`http://localhost:8080/api/products/${item.product}`, {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                  }
                });
                const data = await resp.json();
                return { ...item, product: data };
              })
            );
            setCartProducts(updatedProducts);
          } catch (error) {
            console.error("Error al obtener detalles de productos:", error);
          }
        };
      
        fetchProductDetails();
      }, [products]);

    const deleteCart = async () => {
        const token = localStorage.getItem('token');
        try {
          const response = await fetch(`http://localhost:8080/api/carts/${user.cart}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            }
          });
          if (response.ok) {
            setCartProducts([]);
          } else {
            console.error("Error al vaciar carrito");
          }
        } catch (error) {
          console.error("Error al vaciar carrito:", error);
        }
      };

      const deleteProduct = async (e) => {
        const token = localStorage.getItem('token');
        const productId = e.target.getAttribute("data-product-id");
        try {
          const response = await fetch(`http://localhost:8080/api/carts/${user.cart}/products/${productId}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            }
          });
          if (response.ok) {
            const updatedProducts = cartProducts.filter((item) => item.product._id !== productId);
            setCartProducts(updatedProducts);
          } else {
            console.error("Error al eliminar producto del carrito");
          }
        } catch (error) {
          console.error("Error al eliminar producto del carrito:", error);
        }
      };


      const goTicket = async () => {
        const token = localStorage.getItem('token');
        try {
          if (cartProducts.length === 0) {
            console.error("No hay productos en el carrito");
            return;
          }
          const response = await fetch(`http://localhost:8080/api/carts/${user.cart}/purchase`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            }
          });
          if (response.ok) {
            const data = await response.json();
            navigate(`/ticket/${user.cart}`, { state: { ticket: data } });
          } else {
            console.error("Error al crear ticket");
          }
        } catch (error) {
          console.error("Error al crear ticket:", error);
        }
      };
      

    const uniqueCartProducts = Array.from(
        new Map(cartProducts.map(item => [item.product._id, item])).values()
      );
    
    const logOut = () => {
        localStorage.removeItem('token');
        navigate("/");
    }

    const reloadPage = ()=>{
      navigate("/cart")
    }

    const goProducts = ()=>{
      navigate("/products")
    }


    return (
      <div className="wrapper">
        <aside>
          <button className="close-menu" id="close-menu" >
            <i className="bi bi-x"></i>
          </button>
          <header>
          <h1 className="titulo-encabezado" onClick={goProducts}>Russo ecommerce</h1>
          <a id="logout" onClick={logOut}>Logout</a>
          </header>
          <nav>
            <ul>
              <li>
                <a className="boton-menu boton-volver" href='#' onClick={goProducts}>
                  <i className="bi bi-arrow-return-left"></i> Seguir comprando
                </a>
              </li>
              <li>
                <a className="boton-menu boton-carrito active" href='#' onClick={reloadPage}>
                  <i className="bi bi-cart-fill"></i> Carrito
                </a>
              </li>
            </ul>
          </nav>
          <footer>
            <p className="texto-footer">© 2025 Russo ecommerce</p>
          </footer>
        </aside>
        <main>
          <h2 className="titulo-principal">Carrito</h2>
          <div className="contenedor-carrito">
            <div id="carrito-productos" className="carrito-productos">
              {uniqueCartProducts.map((item) => {
                const { product, quantity } = item;
                return (
                  <div className="carrito-producto" key={product._id}>
                    <img
                      className="carrito-producto-imagen"
                      src={product.thumbnail}
                      alt={product.title}
                    />
                    <h3 className="titulo-producto-carrito">{product.title}</h3>
                    <p className="carrito-producto-cantidad">
                      Cantidad en el carrito: {quantity}
                    </p>
                    <p className="carrito-producto-precio">${product.price}</p>
                    <button
                      className="deleteProductFromCart"
                    
                    >
                      <i
                        data-product-id={product._id}
                        className="deleteIcon bi bi-trash-fill"
                        onClick={deleteProduct}
                      ></i>
                    </button>
                  </div>
                );
              })}
            </div>
            <div id="carrito-acciones" className="carrito-acciones">
              <div className="carrito-acciones-izquierda">
                <button
                  id="btn-delete-cart"
                  className="carrito-acciones-vaciar"
                  onClick={deleteCart}
                >
                  Vaciar carrito
                </button>
              </div>
              <div className="carrito-acciones-derecha">
                <div className="carrito-acciones-total">
                  <p>Total:</p>
                  <p id="total">${uniqueCartProducts.reduce((total,product)=>{
                    return total + product.product.price * product.quantity
                  },0)}</p>
                </div>
                <button
                  id="btn-to-purchase"
                  className="carrito-acciones-comprar"
                  onClick={goTicket}
                >
                  Comprar ahora
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  };

export default Cart;