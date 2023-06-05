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
                this.sprites = data.sprites.versions[this.gen]
                console.log(this.sprites["red-blue"])
            })
            .catch(error => console.log("Error fetching complete data for pokemon : " + this.state.name +  " " +error))      
    }

    loadFrenchName() {
        fetch("https://pokeapi.co/api/v2/pokemon-species/"+this.state.name+"?language=fr")
            .then(response => response.json())
            .then(data => {
                this.setState({name_fr: data.names[4].name})
            })
            .catch(error => console.log(error))
    }
  render() {
    return (
        <div> 
            <img src={this.sprites[GenAndGames[this.gen]]} alt={this.state.name} />  
        </div>
    )
  }
}
