import React, { Component } from 'react'
import GenAndGames from './GenAndGames.json'

export default class Pokemon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: props.index,
            name: props.name,
            name_fr: "",
            url: props.url
        },
        this.types = [],
        this.base_stats = {},
        this.abilities = [],
        this.sprites = {},
        this.gen = props.gen
    }

    componentDidMount() {
        this.loadFrenchName()
        this.loadCompletePokemon()
    }

    loadCompletePokemon() {
        fetch(this.state.url)
            .then(response => response.json())
            .then(data => {
                
                data.stats.forEach(stat => {
                    this.base_stats[stat.stat.name] = stat.base_stat
                })
                data.abilities.forEach(ability => {
                    this.abilities.push({name:ability.ability.name, url:ability.ability.url, is_hidden:ability.is_hidden})
                })
                data.types.forEach(type => {
                    this.types.push({name:type.type.name, url:type.type.url})
                })

                // console.log(GenAndGames[this.gen][0])
                // console.log(data.sprites.versions)
                // console.log(data.sprites.versions[GenAndGames[this.gen]])
                //console.log(GenAndGames[this.gen])
                console.log(data.sprites.versions[this.gen])
                // console.log(data.sprites.versions[this.gen])
                // console.log(data.sprites.versions[this.gen][GenAndGames[this.gen][0]])

                // console.log(data.sprites.versions[this.gen][GenAndGames[this.gen][0]])
                this.sprites = data.sprites.versions[this.gen][GenAndGames[this.gen][0]]
                // console.log(this.sprites)
                
            })
            .catch(error => console.log("Error fetching complete data for pokemon : " + this.state.name +  " " +error))      
    }

    loadFrenchName() {
        fetch("https://pokeapi.co/api/v2/pokemon-species/"+this.state.name+"?language=fr")
            .then(response => response.json())
            .then(data => {
                this.setState({name_fr: data.names[4].name})
            })
            .catch(error =>{
                // if error is 404, it means that the pokemon doesn't have a french name or
                // it is a mega evolution, so we try to get the french name of the base pokemon
                if (error.response.status === 404) {
                    fetch("https://pokeapi.co/api/v2/pokemon-species/"+this.state.name+"?language=fr")
                        .then(response => response.json())
                        .then(data => {
                            this.setState({name_fr: data.names[4].name})
                        })
                        .catch(error => console.log("Error fetching french name for pokemon : " + this.state.name +  " " +error))
                }
            })
    }
  render() {
    return (
        <div> 
            <img src={this.sprites["front_default"]} alt={this.state.name} />  
        </div>
    )
  }
}
