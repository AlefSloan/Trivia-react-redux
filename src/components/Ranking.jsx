import React from 'react';
import { connect } from 'react-redux';
import { fetchGravatarIgm as fetchGravatarIgmAction } from '../redux/actions';

class Ranking extends React.Component {
  componentDidMount() {
    const { fetchGravatarIgm, email } = this.props;
    fetchGravatarIgm(email);
  }

  render() {
    const { img } = this.props;
    return (
      <img
        src={ img }
        alt="x"
        data-testid="header-profile-picture"
      />
    );
  }
}

const mapStateToProps = ({ user }) => ({
  email: user.email,
  img: user.img,
});

const mapDispatchToProps = (dispatch) => ({
  fetchGravatarIgm: (payload) => dispatch(fetchGravatarIgmAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);
