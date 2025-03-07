import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProductList.css";

function ProductList() {
    const [products, setProducts] = useState([]);
    const [cartItemCount, setCartItemCount] = useState(0);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate("/");
        }
     }, [navigate]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch(`http://localhost:8080/api/products`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          })
        
            .then(response => response.json())
            .then(data => {
                setProducts(data);
            })
            .catch(error => console.error("Error al obtener productos:", error));
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch('http://localhost:8080/api/sessions/current', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          })
          .then(response => response.json())
          .then(data => {
                setUser(data.user);
          })
          .catch(error => console.error("Error de login:", error));
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (user) {
            fetch(`http://localhost:8080/api/carts/${user.cart}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(data => setCartItemCount(data.product.length))
                .catch(error => console.error("Error al obtener productos del carrito:", error));
        }
    }, [user]);

    const addToCart = (productId) => {
        const token = localStorage.getItem('token');
        fetch(`http://localhost:8080/api/carts/${user.cart}/products/${productId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
             },
            body: JSON.stringify({ productId }),
        })
            .then(response => response.json())
            .then(() => fetch(`http://localhost:8080/api/carts/${user.cart}`,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }))
            .then(response => response.json())
            .then(data => setCartItemCount(data.product.length))
            .catch(error => console.error("Error al agregar al carrito:", error));
    };

    const logOut = () => {
        localStorage.removeItem('token');
        navigate("/");
    }

    const toCart = () => {
        navigate("/cart");
    }

    return (
        <div className="wrapper">
            <aside>
                <header>
                    <h1 className="titulo-encabezado" onClick={()=> navigate("/products")}>Russo ecommerce</h1>
                    <a id="logout" onClick={logOut}>Logout</a>
                </header>
                <nav>
                    <ul className="menu">
                        <li>
                            <button id="todos" className="boton-menu boton-categoria active">
                                <i className="bi bi-hand-index-thumb-fill"></i> Todos los productos
                            </button>
                        </li>
                        <li>
                            <a onClick={toCart} id="btnToCart" className="boton-menu boton-carrito">
                                <i className="bi bi-cart-fill"></i> Carrito <span id="numerito" className="numerito">{cartItemCount}</span>
                            </a>
                        </li>
                    </ul>
                </nav>
                <footer>
                    <p className="texto-footer">© 2024 Russo ecommerce</p>
                </footer>
            </aside>
            
            <main>
                <h2 className="titulo-principal" id="titulo-principal">Todos los productos</h2>
                <div id="contenedor-productos" className="contenedor-productos">
                    {products.map((product) => (
                        <div className="producto" key={product._id}>
                            <div>
                                <img className="producto-imagen" src={product.thumbnail} alt={product.title} />
                            </div>
                            <div className="producto-detalles">
                                <h3 className="producto-titulo">{product.title}</h3>
                                <p>{product.description}</p>
                                <p className="producto-precio">${product.price}</p>
                                <p className="invisible">{product._id}</p>
                                <button 
                                    data-product-id={product._id} 
                                    className="producto-agregar addProductToCart"
                                    onClick={() => addToCart(product._id)}
                                >
                                    Agregar al carrito
                                </button>
                            </div>                     
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default ProductList;
