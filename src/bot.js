require('dotenv').config()

const { Client } = require('discord.js')
const client = new Client()
//const fetch = require("node-fetch")
const axios = require("axios")

const config = {
    headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
        "Origin": "https://developer.riotgames.com",
        "X-Riot-Token": process.env.RIOT_GAMES_TOKEN
    }
}

client.on('message', message => {
    if(message.content.startsWith('!get')) {
        let summoner_name = message.content.slice(4, message.content.length)
        let summoner_id;
        axios.get('https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/'+ summoner_name, config)
            .then((res) => {
                console.log(res)
                message.channel.send("This player's summoner level is " + res.data.summonerLevel)
                summoner_id = res.data.id
                console.log(summoner_id)
                // axios.get('https://na1.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/' + res.data.id, config)
                //     .then((res) => {
                //         console.log(res.data)
                //     })
            })
            .then(
                axios.get('https://na1.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/' + JSON.stringify(summoner_id), config)
                    .then((res) => {
                        console.log(res.data)
                    })
            )
    }


})

client.login(process.env.YORDLE_BOT_TOKEN)