import React from 'react'
import './Game.css'

class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            expanded: false,
            disabled: true,
            selected: 'recap',
            mobile: false,
            mobileSupportOn: false
        }
    }

    async componentDidMount ()  {
        if(this.props.game.content.media.epg[3].items.length)  {
            this.setState({disabled: false})
        }
        if(window.innerWidth < 700) {
            this.setState({mobile: true})
        } 
    }
     //toggle videoplayer on click
    expand = () => {
        this.setState({expanded: !this.state.expanded})
        if(!this.state.expanded) this.setState({selected: 'recap'})
    }

    render(){
        console.log('mobile',this.state.mobile)
        console.log('mobilesupport',this.state.mobileSupportOn)
        if(!this.state.disabled && this.state.expanded) {
            return(
                <div className="videoContainer">
                    {this.state.mobile && 
                    <p className="info">Video may sometimes be slow if you are on mobile. If you are experiencing this, please click the "Mobile Support"-button</p>}
                    <div className="topContainer">
                        <div className={"option" + (this.state.selected === 'recap' ? ' selected' :'')}
                        onClick={e => this.setState({selected: 'recap'})}>
                            Game Recap
                        </div>
                        <div className={"option" + (this.state.selected === 'extended' ? ' selected' :'')}
                            onClick={e => this.setState({selected: 'extended'})}>
                                Extended HL
                            </div>
                        <a className="option boxScore" target="_blank" rel="noopener noreferrer" href={this.props.gameUrl(this.props.game.gamePk)}>Box Score</a>
                        {this.state.mobile && 
                        <div className={"option" + (this.state.mobileSupportOn ? ' selected' :'')}
                            onClick={e=> this.setState({mobileSupportOn: !this.state.mobileSupportOn})}>
                            Mobile Support
                        </div>}
                        <div className="close" onClick={this.expand}>X</div>
                    </div>
                    <div className="embed-responsive embed-responsive-16by9">  

                        {this.state.selected === 'recap' &&
/*                         (this.state.mobileSupportOn ?
                            <video className="embed-responsive-item" controls>
                                <source type="video/mp4" src={this.props.game.content.media.epg[3].items[0].playbacks[8].url.slice(5)} />
                            </video>
                        : */
                            <video className="embed-responsive-item" controls>
                                <source type="video/mp4" src={this.props.game.content.media.epg[3].items[0].playbacks[9].url.slice(5)} />
                            </video>} 

                        {this.state.selected === 'extended' &&
                        <video className="embed-responsive-item" controls>
                            <source type="video/mp4" src={this.props.game.content.media.epg[2].items[0].playbacks[9].url.slice(5)} />
                        </video>} 
                    </div>
                </div>
            )
        }
/* 
        window.innerWidth < 700 ? 
        this.props.game.content.media.epg[2].items[0].playbacks[8].url.slice(5) :
        this.props.game.content.media.epg[2].items[0].playbacks[9].url.slice(5)} 
        allowFullScreen > */

        return (
            <div className={"col-lg-2 col-md-3 row-sm-12 game" + (this.state.disabled ? ' disabled' : '')} 
                onClick={this.expand} key={this.props.game.gamePk}>
            <div className="team">
                <img className="teamLogo" src={require(`../logos/${this.props.game.teams.away.team.abbreviation}.svg`)} alt="" />
                <p>{this.props.game.teams.away.team.abbreviation}</p>
            </div>
            <div className="team">
                <img className="teamLogo" src={require(`../logos/${this.props.game.teams.home.team.abbreviation}.svg`)} alt="" />
                <p>{this.props.game.teams.home.team.abbreviation}</p>
            </div>
            </div>
        )
    }
}

export default Game