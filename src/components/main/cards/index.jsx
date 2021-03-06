// import {useState} from 'react';
import {Card, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {priceProduct} from '../../../modules/priceProduct'

// Libreria Swiper para sliders
import SwiperCore, {Navigation, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

// install Swiper components
SwiperCore.use([Navigation, Scrollbar, A11y]);

const Cards = ({productos, title, handleClickCard, detailProduct = false,
                user = false,
                handleExistUser = null,
                history = false,
                handleExistUserFav
            }) => {

    const cutTitle = (string) => string.slice(0, 50);

    
    return (
        <>
            <section className = {`section ${detailProduct ? '' : 'p-11' }`}>

                <div className = {`section__title ${detailProduct ? 'ml-0' : '' }`}>
                    <div className = 'section__title-container'>
                        <h1 className = 'section__title-container-h1'>{title}</h1>
                    </div>
                </div>

                <div className = {`section__container ${detailProduct && 'section__container--detailProduct'}`}>
                    {(productos.length > 0 && typeof productos === 'object') ? 
                        <Swiper
                            id = 'sliderOfertas'
                            className = 'overflow-hidden'
                            tag = 'div'
                            spaceBetween={1}
                            slidesPerView={detailProduct ? 4 : 5}
                            slid
                            navigation
                        >

                            {productos.map( (producto, index) =>  
                                <SwiperSlide
                                    key = {index} 
                                    className = {`sliderOfertas__slider ${detailProduct ? 'sliderOfertas__slide--detailProduct' : ''}
                                                flex-row flex justify-between items-stretch`}
                                >
                                    
                                    <Card
                                        className = 'sliderOfertas__slider-cards'
                                    >
                                        <div
                                            className= 'linkCard h-full flex flex-column'
                                            onClick = { () => handleClickCard(producto.id, history) }
                                        >
                                            <Button 
                                                className = 'sliderOfertas__slider-cards-like'
                                                onClick = {(e) => handleExistUserFav(e, user, producto, history)}
                                            >
                                                <svg 
                                                    class="sliderOfertas__slider-cards-like-heart"
                                                    viewBox="0 0 36 32"
                                                >
                                                    <path d="M30.4 16q1.5-1.3 2-2.6t.6-3q0-1.4-.7-3T30.6 5q-1.4-1.2-2.4-1.6T25.8 3q-1.5 0-3 .6t-2.6 2l-2 2-2.3-2q-1.8-1.4-3-2T10.2 3t-2.6.4T5.3 5q-1 .7-1.6 2.4t-.7 3q0 1.4.6 3T5.4 16L18 28l12.4-12zM0 10.5q0-1.7.8-4t2.6-3.8Q5 1.2 6.7.7t3.6-.7q2 0 3.8.8t4 2.7q2-2 4-2.7t4-.8 3.4.6 3.3 2Q34.3 4 35 6.3t1 4-.6 4-3 4L18 32 3.4 18.2Q1 16 .4 13.7T0 10.4z"></path>
                                                </svg>
                                            </Button>

                                            <Button className = 'sliderOfertas__slider-cards-like sliderOfertas__slider-cards-like--liked'>
                                                <svg class="sliderOfertas__slider-cards-like-heart" viewBox="0 0 36 32">
                                                    <path d="M0 10.4q0-1.7.8-4t2.6-3.8Q5 1.2 6.7.6t3.6-.6q2 0 3.8.8t4 2.7q2-2 4-2.7t4-.8 3.4.6 3.3 2Q34.3 4 35 6.3t1 4-.6 4-3 4L18 32 3.4 18.2Q1.8 16.7 1 14.7t-1-4.3z"></path>
                                                </svg>
                                            </Button>

                                            <Card.Img
                                                className = 'sliderOfertas__slider-cards-img img-fluid' 
                                                variant="top" 
                                                src= {producto.thumbnail} 
                                            />
                                            <Card.Body 
                                                className = {`sliderOfertas__slider-cards-body ${detailProduct ? 'sliderOfertas__slider-cards-body--detailProduct' : ''}`}
                                            >
                                                <div className = 'sliderOfertas__slider-cards-body-shipping'>
                                                    <svg className = "sliderOfertas__slider-cards-body-shipping-logo" viewBox="0 0 39 32">
                                                        <path d="M21.7 24q.6-1.3 2-2t2.6-.8q1.5 0 2.7.7t2 2h4.4v-7.5L30 10.3h-4.8V6.8h5.6q.5 0 .8.2t.6.5l6.2 7.4q.3 0 .4.3t0 
                                                        .6v9.6q0 .7-.5 1.2t-1 .4h-6q-.4 1.8-1.8 3t-3.2 1-3.3-1-1.7-3h-6q-.4 1.8-1.8 3t-3.2 1-3.3-1-1.7-3H1.7Q1 27.4.5 27T0 
                                                        25.6V4q0-1.7 1.2-2.8T4 0h17.2q1.6 0 2.8 1.2T25.2 4v14.3h-3.5V4q0-.2-.2-.4t-.3-.2H4q-.3 0-.4.2t-.2.4v20h2.3q.6-1.3 
                                                        2-2t2.6-.8q1.5 0 2.7.7t2 2h6.7zm4.6 4q.7 0 1.2-.5t.5-1.2-.5-1.2-1.2-.3-1.2.5-.3 1.3.5 1.2 1.3.5zm-16 0q.7 0 1.2-.5t.5-1.2-.5-1.2-1.2-.3T9 
                                                        25t-.4 1.3.5 1.2 1.4.5z"></path>
                                                    </svg>
                                                </div>
                                                {(producto.original_price) ? <Card.Subtitle className = 'sliderOfertas__slider-cards-body-priceBefore'>$ { producto.original_price }</Card.Subtitle> : null}
                                                <Card.Text className = {`sliderOfertas__slider-cards-body-priceAfter ${detailProduct ? 'sliderOfertas__slider-cards-body-priceAfter--detailProduct' : ''}`}>
                                                    <span>$</span>
                                                    <span>{priceProduct(String((producto.price).toFixed(0)))}</span>
                                                    {producto.original_price ? <span className = 'sliderOfertas__slider-cards-body-priceAfter-off'>{(100 - ( Number(producto.price) / Number(producto.original_price)) * 100).toFixed(0)}% OFF</span> : null}
                                                </Card.Text>
                                                {(producto.original_price) ? <Card.Subtitle className = 'sliderOfertas__slider-cards-body-cuotas'>{ `${producto.installments.quantity} X $ ${producto.installments.amount}`}  sin interés</Card.Subtitle> : null}
                                                <Card.Title 
                                                    className = {`sliderOfertas__slider-cards-body-name ${detailProduct ? 'sliderOfertas__slider-cards-body-name--detailProduct' : ''}`}
                                                >{cutTitle(producto.title)}</Card.Title>
                                            </Card.Body>
                                        </div>
                                        {detailProduct ? <p 
                                            className = 'sliderOfertas__slider-cards-body-addCarrito'
                                            onClick = {() => handleExistUser(user, producto, history)}
                                        >Agregar al carrito</p> : null}
                                    </Card>
                                </SwiperSlide>
                            )}
                        </Swiper>
                    : <h2 className = 'noSaw'>{productos}</h2>}
                </div>
            </section>
        </>
    )
}

export default Cards;
