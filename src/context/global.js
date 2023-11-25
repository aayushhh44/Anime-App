import React, { createContext, useReducer, useContext, useEffect, useState } from "react";

export const GlobalContext = createContext();

const baseURL = 'https://api.jikan.moe/v4';


//actions

const LOADING = 'LOADING..';
const SEARCH = 'SEARCH';
const GET_POPULAR_ANIME = 'GET_POPULAR_ANIME';
const GET_UPCOMING_ANIME = 'GET_UPCOMING_ANIME';
const GET_AIRING_ANIME = 'GET_AIRING_ANIME';
const GET_PICTURES = 'GET_PICTURES'

//fetch popularAnime



const reducer = (state, action) => {
    switch(action.type){
        case LOADING:
            return {...state, loading: true}
        case GET_POPULAR_ANIME:
            return {...state, popularAnime: action.payload, loading: false}
        case SEARCH:
            return {...state, searchResults: action.payload, loading:false}

        case GET_UPCOMING_ANIME:
            return {...state, upComingAnime: action.payload, loading:false}

        case GET_AIRING_ANIME: 
            return {...state, airingAnime: action.payload, loading:false}

        case GET_PICTURES:
            return {...state , pictures: action.payload, loading: false}
        default: 
            return state;
        

    }


}




export const GlobalContextProvider = ({children}) =>{
    const initialState = {
        popularAnime:[],
        upComingAnime: [],
        airingAnime: [],
        pictures: [],
        isSearch: false,
        searchResult: [],
        isLoading: false,

    }

    const [state, dispatch] = useReducer(reducer, initialState);
    const[search, setSearch] = useState('');
    
    
    const handleChange = (e) =>{
        setSearch(e.target.value);
        if(e.target.value === ''){
            state.isSearch = false;
        }
    }


    //handle Submit


    const handleSubmit = (e) => {
        e.preventDefault();
        if(search){
            SearchAnime(search);
            state.isSearch = true;
        }else{
            state.isSearch = false;
            alert('Please enter a search term')
        }
    }
    

    //fetching Upcoming Anime

    const getUpcomingAnime = async () => {
        try {
            dispatch({ type: LOADING });
            const response = await fetch(`${baseURL}/top/anime?filter=upcoming`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            dispatch({ type: GET_UPCOMING_ANIME, payload: data.data });
        } catch (error) {
            console.error('Error fetching upcoming anime:', error);
        }
    };    


    //search Anime
    const SearchAnime = async (anime) => {
        dispatch({type: LOADING})
        const response = await fetch(`https://api.jikan.moe/v4/anime?q=${anime}&order_by=popularity&sort=asc&sfw`);
        const data = await response.json();
        dispatch({type: SEARCH, payload: data.data})
    }
    

    const getPopularAnime = async () => {
        dispatch({type: LOADING})
        const response = await fetch(`${baseURL}/top/anime?filter=bypopularity`);
        const data = await response.json();
        console.log(data.data)
        dispatch({type: GET_POPULAR_ANIME, payload: data.data})
    }


    //fetching airing anime


const getAiringAnime = async () => {
    try {
        dispatch({ type: LOADING });
        const response = await fetch(`${baseURL}/top/anime?filter=airing`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        dispatch({ type: GET_AIRING_ANIME, payload: data.data });
    } catch (error) {
        console.error('Error fetching upcoming anime:', error);
        
    }
};   

//fetching character pictures

    const getAnimePictures = async (id) =>{
        try{
            dispatch({type: LOADING})
        const response = await fetch(`${baseURL}/characters/${id}/pictures`);
        if(!response.ok){
            throw new Error(`Failed to fetch anime pictures. Status: ${response.status}`)
        }

        const data = await response.json();
        dispatch({type: GET_PICTURES, payload: data.data})

        }catch(error) {
            console.log("Error fetching anime pictures", error)
        }
       

    }


    

    //initialRender

    useEffect(() =>{
            getPopularAnime()
    },[])



    return(
        <GlobalContext.Provider value={{
                ...state,
                handleChange,
                handleSubmit,
                SearchAnime,
                search,
                getPopularAnime,
                getAiringAnime, 
                getUpcomingAnime,
                getAnimePictures
                
        }}>
            {children}
        </GlobalContext.Provider>
    )
}



export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}