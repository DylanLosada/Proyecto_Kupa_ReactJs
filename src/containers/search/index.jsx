/* eslint-disable no-undef */
/* eslint-disable default-case */
import {useState, useEffect, useContext} from 'react'
import {Link, useParams} from 'react-router-dom'

import AsideSearch from '../../components/search/asideSearch'
import CardSearch from '../../components/search/cardsSearch'
import { GlobalContext } from '../../context/GlobalContext'

import getDataFromApi from '../../modules/fetch'

const Search = ({categories = null}) => {

    // Consigo los parametros de la busqueda.
    const {searchParam, categorie, filter, filter1, filter2, filter3, filter4, filter5 } = useParams();

    const [dataSearch,  setDataSearch] = useState([]);

    // State para los filtros de busqueda.
    const [filters, setFilters] = useState([]);

    const {search, setSearch} = useContext(GlobalContext)

    useEffect(() => {
        
        if(filter){
            const filtersParams = addFilters();
            getDataFromApi(filtersParams)
                .then(data => data.json())
                .then(data => setSearch(data.results))
            console.log(filtersParams)
        }else{

            // if(categories){
            //     const apiCategoria = `https:api.mercadolibre.com/sites/MLA/search?category=${categorie}`
            //     getDataFromApi(apiCategoria)
            //         .then(data => data.json())
            //         .then(data => setDataSearch([data]))
            //         .catch(e => console.log(e));

            //     getDataFromApi(apiCategoria)
            //         .then(data => data.json())
            //         .then(data => setSearch(data.results))
            //         .catch(e => console.log(e));
            // }else{
                const apiMlVisto = `https://api.mercadolibre.com/sites/MLA/search?${categories ? `category=${categorie}` : `q=${getSearchParam(searchParam)}`}`;
                getDataFromApi(apiMlVisto)
                    .then(data => data.json())
                    .then(data => setSearch(data.results))
                    .catch(e => console.log(e));

                getDataFromApi(apiMlVisto)
                    .then(data => data.json())
                    .then(data => setDataSearch([data]));
        }
    }, [searchParam, filters])

    const getSearchParam = param => (param.includes('-')) ? param.split('-').join('%20') : param;

    const getParam = param => (param.includes('-')) ? param.split('-').join(' ') : param;

    const addFilters = () => {
        let params;
        let apiFilters = `https://api.mercadolibre.com/sites/MLA/search?q=${getSearchParam(searchParam)}`

        filters.forEach( (filterUrl, index) => {
            switch(index){
                case 0:
                    params = `&${filterUrl}=${filter}`
                    break;
                case 1:
                    params = `&${filterUrl}=${filter1}`
                    break;
                case 2:
                    params = `&${filterUrl}=${filter2}`
                    break;
                case 3:
                    params = `&${filterUrl}=${filter3}`
                    break;
                case 4:
                    params = `&${filterUrl}=${filter4}`
                    break;
                case 5:
                    params = `&${filterUrl}=${filter5}`
                    break;
            }
            apiFilters += params
        })
        return apiFilters;
    }
    

    return (
        <>
            <section className = 'section'>
                <div className = 'section__container search'>
                    <aside className = 'search__aside'>
                        <AsideSearch
                            searchParam = {(categories) ? categorie : getParam(searchParam)}
                            dataSearch = {dataSearch}
                            setFilters = {setFilters}
                            filters = {filters}
                        />
                    </aside>
                    <section className = 'search__products'>
                       {search.length > 0 ? 
                            <CardSearch 
                                    search = {search}
                                    setSearch = {setSearch}
                            /> : <h2>No tenemos este producto en este momento</h2>} 
                    </section>
                </div>
            </section>
        </>
    )
}

export default Search
