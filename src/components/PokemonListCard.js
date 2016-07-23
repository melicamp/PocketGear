/* @flow */

import React, { PropTypes, Component } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import data from '../data.json';
import colors from '../colors.json';
import sprites from '../sprites';

const styles = StyleSheet.create({
  block: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 2,
    elevation: 1,
  },

  image: {
    margin: 16,
    height: 72,
    resizeMode: 'contain',
  },

  index: {
    position: 'absolute',
    top: 0,
    left: 0,
    margin: 8,
  },

  title: {
    color: '#000',
    fontFamily: 'Lato',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.6,
  },

  subtitle: {
    color: '#000',
    fontFamily: 'Lato',
    fontSize: 12,
    textAlign: 'center',
    opacity: 0.3,
  },
});

type Props = {
  onNavigate: Function;
  index: number;
  style?: any;
}

export default class PokemonListCard extends Component<void, Props, void> {

  static propTypes = {
    onNavigate: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    style: View.propTypes.style,
  };

  _handlePress = () => {
    this.props.onNavigate({
      type: 'push',
      route: {
        name: 'info',
        props: {
          index: this.props.index,
        },
      },
    });
  };

  render() {
    const { index } = this.props;
    const item = data[index - 1];
    const color = colors[item.types[0].toLowerCase()] || colors.normal;

    return (
      <TouchableOpacity
        key={item.name}
        onPress={this._handlePress}
        activeOpacity={0.7}
        style={[ styles.block, { backgroundColor: color } ]}
      >
        <Text style={[ styles.index, styles.subtitle ]}>#{item.index}</Text>
        <Image source={sprites[item.index - 1]} style={styles.image} />
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.subtitle}>{item.types.join(', ')}</Text>
      </TouchableOpacity>
    );
  }
}
