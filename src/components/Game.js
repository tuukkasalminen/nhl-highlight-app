/* eslint-disable import/no-dynamic-require */
import React from 'react';
import './Game.css';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      disabled: true,
      selected: 'recap',
    };
  }

  async componentDidMount() {
    const { game } = this.props;
    if (game.content.media.epg[3].items.length) {
      this.setState({ disabled: false });
    }
  }

  expand = () => {
    const { expanded } = this.state;
    this.setState({ expanded: !expanded });
    if (!expanded) this.setState({ selected: 'recap' });
  }

  render() {
    const {
      disabled, expanded, selected,
    } = this.state;

    const { game, gameUrl } = this.props;
    if (!disabled && expanded) {
      return (
        <div className="videoContainer">
          <div className="topContainer">
            <div
              className={`option + ${selected === 'recap' ? ' selected' : ''}`}
              onClick={() => this.setState({ selected: 'recap' })}
            >
              { 'Game Recap' }
            </div>
            <div
              className={`option${selected === 'extended' ? ' selected' : ''}`}
              onClick={() => this.setState({ selected: 'extended' })}
            >
              { 'Extended HL' }
            </div>
            <a className="option boxScore" target="_blank" rel="noopener noreferrer" href={gameUrl(game.gamePk)}>Box Score</a>
            <div className="close" onClick={this.expand}>X</div>
          </div>
          <div className="embed-responsive embed-responsive-16by9">
            {selected === 'recap'
              && (
              <video className="embed-responsive-item" controls>
                <track default kind="captions" />
                <source type="video/mp4" src={game.content.media.epg[3].items[0].playbacks[3].url} />
              </video>
              )
            }

            {selected === 'extended'
            && (
            <video className="embed-responsive-item" controls>
              <track default kind="captions" />
              <source type="video/mp4" src={game.content.media.epg[2].items[0].playbacks[3].url} />
            </video>
            )}
          </div>
        </div>
      );
    }

    return (
      <div
        className={`col-lg-2 col-md-3 row-sm-12 game${(disabled ? ' disabled' : '')}`}
        onClick={this.expand}
        key={game.gamePk}
      >
        <div className="team">
          <img className="teamLogo" src={require(`../logos/${game.teams.away.team.abbreviation}.svg`)} alt="" />
          <p>{game.teams.away.team.abbreviation}</p>
        </div>
        <div className="team">
          <img className="teamLogo" src={require(`../logos/${game.teams.home.team.abbreviation}.svg`)} alt="" />
          <p>{game.teams.home.team.abbreviation}</p>
        </div>
      </div>
    );
  }
}

export default Game;
