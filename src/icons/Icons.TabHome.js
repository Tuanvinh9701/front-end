import * as React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
// icons
import {
    MaterialIcons,
  } from '@expo/vector-icons';
import { colors } from '../constants';

const IconsTabHome = ({ active, size }) => {
  const fill = active ? colors.white : colors.greyInactive;

  return (
    <MaterialIcons name={"home"} size={42} color={fill} style={styles.icon} />
  );
};
IconsTabHome.defaultProps = {
  active: false,
  size: 42
};

IconsTabHome.propTypes = {
  // optional
  active: PropTypes.bool,
  size: PropTypes.number
};
const styles = StyleSheet.create({
    icon: {
        marginTop: 5,
        padding: 0
    }
});
export default IconsTabHome;
