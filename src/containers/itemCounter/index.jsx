import {useState, useEffect, useContext} from 'react';
import {Button, Form} from 'react-bootstrap';
import FormField from './formField'
import { GlobalContext } from '../../context/GlobalContext';

const stylesClickOnInput = (e) => {
    const input = document.querySelector('#liMasUnidadesInput');
    const inputBarra = document.querySelector('#inputContainer__barra');
    const containerInput = document.querySelector('#inputContainer');

    if(e.target === input){
        inputBarra.className = 'transform scale-0';
        containerInput.classList.add('buttonContainer__ul-cantidad-masCantidad-divContainer-barraFocusOnInput');
    }else{

        if(containerInput.classList.contains('buttonContainer__ul-cantidad-masCantidad-divContainer-barraFocusOnInput')){
            containerInput.classList.remove('buttonContainer__ul-cantidad-masCantidad-divContainer-barraFocusOnInput')
            inputBarra.className = 'buttonContainer__ul-cantidad-masCantidad-divContainer-barra'
        }  

    }
}

const changeInitialValue = (initial) => (initial > 0) ? document.querySelector('#buttonCantidadUnidades').textContent = `${initial} unidades` : null;


const ItemCounter = ({stock, initial, producto}) => {
    // State de cantidad de producto
    const [cantidad, setCantidad] = useState(0);

    // State perteneciente al input y su estado
    const [cantidaInput, setCantidadInput] = useState(1);

    const {Producto, setCarrito, carrito} = useContext(GlobalContext);

    useEffect(() => {
        changeInitialValue(initial);
    }, [])

    const contantesComponente = (n = 0) => {
        const ulCantidad = document.querySelector('#choseeCantidad');
        const liMasUni = document.querySelector('#liMasUnidades');
        const label = document.querySelector('#labelMasUni');
        const divMasCantidad = document.querySelector('.buttonContainer__ul-cantidad-masCantidad');

        const arrayConstantes = [ulCantidad, liMasUni, label, divMasCantidad]

        return arrayConstantes[n];
    }

    const inputEvent = (e) => {
        e.stopPropagation();
        
        if(Number(e.target.value) >= 0 && Number(e.target.value) <= stock && e.target.value.length >= 0){
            setCantidadInput(e.target.value);
            console.log(cantidaInput)
        }
        else{
            e.target.value = cantidaInput;
        }
    }

    const ulAppear = (e) => {

        e.preventDefault();

        const ulCantidad = contantesComponente();
        const liMasUni = contantesComponente(1);
        const label = contantesComponente(2);
        const divMasCantidad = contantesComponente(3);


        ulCantidad.classList.add('ulAppear');
    
        let arrayChilden = [...ulCantidad.children];
        
    
        ulCantidad.addEventListener('click', (event) => {
            event.stopImmediatePropagation();
                
                const arrayLiClicked = arrayChilden.filter(li => li === event.target)
                const estilosLi = arrayChilden.filter(li => li.classList.contains('estilosLi'))
                
                
                if(arrayLiClicked[0] && !arrayLiClicked[0].children.item(0)){
                    console.log('si')
                    ulCantidad.classList.remove('ulAppear');
                    estilosLi[0].classList.remove('estilosLi');
                    arrayLiClicked[0].classList.add('estilosLi');
                    ulCantidad.classList.add('ulScaleInitial');

                    if(liMasUni.classList.contains('liMasUnidades')){
                        liMasUni.classList.remove('liMasUnidades');
                        divMasCantidad.classList.remove('masProductosAppear');
                        label.classList.remove('masProductosTitleDisappear');
                    }

                    setCantidad(Number(arrayLiClicked[0].textContent.split(' ')[0]));

                }else if (!arrayLiClicked[0] || arrayLiClicked[0].children.item(0)){
                    ulCantidad.classList.remove('ulScaleInitial');
                    liMasUni.classList.add('liMasUnidades');
                    divMasCantidad.classList.add('masProductosAppear');
                    label.classList.add('masProductosTitleDisappear');
                } 
        })
    }
    const submitForm = e => {
        e.preventDefault();
        const ulCantidad = contantesComponente();
        const liMasUni = contantesComponente(1);
        const label = contantesComponente(2);
        const divMasCantidad = contantesComponente(3);
        
        setCantidad(Number(cantidaInput));

        ulCantidad.classList.add('ulScaleInitial');
        ulCantidad.classList.remove('ulAppear');
        liMasUni.classList.remove('liMasUnidades');
        divMasCantidad.classList.remove('masProductosAppear');
        label.classList.remove('masProductosTitleDisappear');        
    }

    const addCarrito = () => {
        console.log(carrito)
        if(!carrito.find(product => product === null) &&  !carrito.find(product => product.id === producto.id)){
            const product = new Producto(
                producto.id, 
                producto.title, 
                (producto.price * cantidaInput),
                producto.thumbnail, 
                cantidaInput, 
                (producto.original_price) ? (100 - (producto.price / producto.original_price)* 100).toFixed(0) : null, 
                (producto.original_price) ? producto.original_price : null,
                stock,
                producto.price,
                producto.shipping.free_shipping,
                producto.shipping.logistic_type
            )
            setCarrito([...carrito, product])
            localStorage.setItem('carrito', JSON.stringify([...carrito, product]));
        }
        else{
            carrito.forEach( product => {
                if(product.id === producto.id) {
                    product.quantity += cantidaInput
                    product.price += producto.price * cantidaInput
                }
            })
            localStorage.setItem('carrito', JSON.stringify([...carrito]));
        }
    }

   

    return (
         <div id = 'buttonContainer' className = 'rounded-2xl shadow-2xl mt-8'>
             <Form 
                className = 'buttonContainer__form flex flex-col items-start justify-between'
                onSubmit = {submitForm}
            >
                <button 
                    id = 'buttonCantidad'
                    className = 'buttonContainer__form-botonCantidad flex flex-row justify-between'
                    onClick = {(e) => ulAppear(e)}
                >
                    <span>Cantidad: </span>
                    <span id = 'buttonCantidadUnidades' className = 'font-semibold'>{(cantidad === 1) ? `${cantidad} unidad` : `${cantidad} unidades`}</span>
                    <span>^</span>
                    <span className = 'buttonCantidadUnidades__spanDisponibles'>{`(${stock} disponibles)`}</span>

                    <ul id = 'choseeCantidad'
                        className = 'buttonContainer__ul-cantidad ulScaleInitial'
                        // onClick = {(e) => ulAppear(e)}
                    >
                        <li 
                            className = 'estilosLi' 
                            value="1"
                            onClick = {() => setCantidadInput(1)}
                        >1 Unidad</li>
                        <li 
                            value="2"
                            onClick = {() => setCantidadInput(2)}
                        >2 Unidades</li>
                        <li 
                            value="3"
                            onClick = {() => setCantidadInput(3)}
                        >3 Unidades</li>
                        <li 
                            value="4"
                            onClick = {() => setCantidadInput(4)}
                        >4 Unidades</li>
                        <li 
                            value="5"
                            onClick = {() => setCantidadInput(5)}
                        >5 Unidades</li>
                        <li 
                            value="6"
                            onClick = {() => setCantidadInput(6)}
                        >6 Unidades</li>
                        <li 
                            value=""
                            id = 'liMasUnidades'
                        >
                            <span id = 'labelMasUni' className = 'buttonContainer__ul-cantidad-labelMasUni'>Más de 6 unidades</span>
                            <Form.Group className = 'buttonContainer__ul-cantidad-masCantidad relative'>
                                <Form.Label htmlFor="cantidad">Cantidad:</Form.Label>
                                
                                <FormField 
                                    button = {true}
                                    stylesClickOnInput = {stylesClickOnInput}
                                    stock = {stock}
                                    inputEvent = {inputEvent}
                                    name = 'cantidad'
                                />
                            </Form.Group>
                        </li>
                     </ul>
                </button>

                <div className = 'buttonContainer__form-buttonsCompra'>
                    <Button className ='buttonContainer__form-buttons buttonContainer__form-buttons--buttonComprar'>
                        <span>Comprar ahora</span> 
                    </Button>

                    <Button 
                        className ='buttonContainer__form-buttons buttonContainer__form-buttons--buttonAgregar'
                        onClick = {() => addCarrito()}
                    >
                        <span>Agregar al carrito</span>
                    </Button>
                </div>
             </Form>
        </div> );
}
 
export default ItemCounter;