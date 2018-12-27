import React from 'react'

class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            expanded: false
        }
    }

    //toggle videoplayer on click
    expand = () => this.setState({expanded: !this.state.expanded})

    render(){
    //returns videoplayer when a single game is clicked
        if(this.state.expanded) {
            return(
                <div className="videoContainer">
                    <div className="boxScore">
                        <a target="_blank" rel="noopener noreferrer" href={this.props.gameUrl(this.props.game.gamePk)}>BOX SCORE</a>
                    </div>
                    <div className="close" onClick={this.expand}>X</div>
                    <div className="embed-responsive embed-responsive-16by9">  
                        <iframe className="embed-responsive-item" title="recap" src={this.props.game.content.media.epg[3].items[0].playbacks[9].url} allowFullScreen ></iframe> 
                    </div>
                </div>
            )
        }
    //last nights games listed
        return (
            <div className="col-lg-2 col-md-3 row-sm-12 game" onClick={this.expand} key={this.props.game.gamePk}>
            <div className="team">
                <img className="teamLogo" src={require(`../logos/${this.props.game.teams.away.team.abbreviation}.png`)} alt="" />
                <p>{this.props.game.teams.away.team.abbreviation}</p>
            </div>
            <div className="team">
                <img className="teamLogo" src={require(`../logos/${this.props.game.teams.home.team.abbreviation}.png`)} alt="" />
                <p>{this.props.game.teams.home.team.abbreviation}</p>
            </div>
            </div>
        )
    }
}

export default Game