import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchGravatarIgm as fetchGravatarIgmAction } from '../redux/actions';

class PlayerHeader extends React.Component {
  componentDidMount() {
    const { fetchGravatarIgm, email } = this.props;
    fetchGravatarIgm(email);
  }

  render() {
    const { img, name, score } = this.props;
    return (
      <div>
        {console.log()}
        <img
          src={ img }
          alt={ name }
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">{ `Jogador: ${name}` }</p>
        <p data-testid="header-score">{ score }</p>
      </div>
    );
  }
}

PlayerHeader.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  fetchGravatarIgm: PropTypes.func.isRequired,
};

const mapStateToProps = ({ player }) => ({
  email: player.email,
  img: player.img,
  name: player.name,
  score: player.score,
  assertions: player.assertions,
});

const mapDispatchToProps = (dispatch) => ({
  fetchGravatarIgm: (payload) => dispatch(fetchGravatarIgmAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerHeader);
