import axios from "axios";

export const axiosClient  =  axios.create({
    baseURL: `https://pokeapi.co/api/v2`
})
  
export const getAllPokemonApi = (limit, offset) => {
    return axiosClient.get(`/pokemon/?limit=${limit}&offset=${offset}`)
  }

export const getPokemonByIdApi = (id) => {
    return axiosClient.get(`/pokemon/${id}/`)
  }

export const getPokemonAbilityApi = (id) => {
    return axiosClient.get(`/ability/${id}`)
}
  
