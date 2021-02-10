import {Form, Modal} from 'react-bootstrap';
import ItemCounter from '../../../containers/itemCounter'


const FormCompra = ({producto}) => {
    return (
        <Form className = 'producto__formCompra'>
            <Form.Group className = 'producto__formCompra-title'>
                <div className = 'producto__formCompra-title-state'>
                    <span>{producto.condition}</span>
                    <span>|</span>
                    <span>{producto.sold_quantity} vendidos</span>
                </div>

                <h1 className = 'producto__formCompra-title-name'>{producto.title}</h1>

                <div>
                    <span>
                        <svg class="ui-pdp-icon ui-pdp-icon--star-full" width="10" height="10" viewBox="0 0 10 10"><path fill="#3483FA" fill-rule="evenodd" d="M5.056 8L1.931 9.648l.597-3.49L0 3.684l3.494-.509L5.056 0l1.562 3.176 3.494.51-2.528 2.471.597 3.491z"></path></svg>
                    </span>
                    {/* <span>{producto.opinion}</span> */}
                </div>
            </Form.Group>

            <Form.Group className = 'producto__formCompra-price'>
                <div className = 'producto__formCompra-price-container'>
                    <span>$</span>
                    <span>{producto.price}</span>
                </div>

                <div className = 'producto__formCompra-price-amount'>
                    <p>
                        {/* <span>{producto.inttalment.amount}</span> */}
                        <span>
                            <span>$</span>
                            <span></span>
                            <span></span>
                        </span>
                    </p>
                </div>

                <div>
                    <Modal></Modal>
                </div>
            </Form.Group>

            <Form.Group>
                <div>
                    <figure class="ui-pdp-media__figure">
                        <svg class="ui-pdp-icon ui-pdp-icon--fast-truck ui-pdp-color--GREEN" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill-rule="nonzero" d="M10.587 14.805H7.01a2.452 2.452 0 1 1-4.452-1.937l-1.56-.003.002-1.2 3.6.008v.025h.048c1.167 0 2.143.815 2.39 1.907h3.52a2.455 2.455 0 0 1 1.836-1.844l2.423-6.352a.6.6 0 0 0-.56-.814H4.6v-1.2h9.658a1.8 1.8 0 0 1 1.697 2.4h1.677l1.409 4.225-2.027 4.787-1.701-.007a2.452 2.452 0 0 1-4.726.005zm4.751-1.205l.883.004 1.538-3.634-.991-2.975h-1.27l-1.835 4.809c.834.253 1.48.939 1.675 1.796zM7 5.79v1.2H1v-1.2h6zM4.6 8.222v1.2H2.2v-1.2h2.4zm.049 7.178a1.251 1.251 0 1 0 0-2.502 1.251 1.251 0 0 0 0 2.502zm8.3 0a1.251 1.251 0 1 0 0-2.502 1.251 1.251 0 0 0 0 2.502z"></path></svg>
                    </figure>
                    <div>
                        <h2>Llega</h2>

                        <span></span>

                        <span>
                            <span>$</span>
                            <span></span>
                            <span></span>
                        </span>

                        <span>por</span>

                        <span>
                            <svg class="ui-pdp-icon ui-pdp-icon--full" width="41" height="13" viewBox="0 0 41 13" xmlns="http://www.w3.org/2000/svg"><path fill-rule="nonzero" d="M2.628 0h5.255L5.255 4.643h4.38L2.628 13l1.751-5.571H0L2.628 0zm11.589 9.533h-1.959l1.674-7.515H19.5l-.376 1.69h-3.61l-.25 1.172h3.519l-.376 1.69h-3.53l-.66 2.963zm9.468.136c-2.334 0-3.484-1.105-3.484-2.682 0-.124.034-.383.057-.496l1.002-4.473h1.992l-.99 4.428c-.012.057-.034.18-.034.316.011.62.49 1.217 1.457 1.217 1.048 0 1.583-.654 1.776-1.533l.991-4.428h1.981l-.99 4.462c-.41 1.825-1.412 3.189-3.758 3.189zm10.118-.136h-5.01l1.673-7.515h1.959l-1.287 5.825h3.04l-.375 1.69zm6.678 0h-5.01l1.674-7.515h1.959l-1.287 5.825h3.04l-.376 1.69z"></path></svg>
                            <svg class="ui-pdp-icon ui-pdp-icon--chevron" viewBox="0 0 9 14" xmlns="http://www.w3.org/2000/svg"><path fill="none" fill-rule="evenodd" stroke-width="1.5" d="M1 1.343L6.657 7 1 12.657"></path></svg>
                        </span>
                    </div>
                </div>
            
            </Form.Group>

            <Form.Group>
                <ItemCounter />
            </Form.Group>
        </Form>
    )
}

export default FormCompra