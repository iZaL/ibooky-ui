/**
 * @flow
 */
import React, {Component} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {Subheading, Title, TouchableRipple} from 'react-native-paper';
import colors from 'assets/theme/colors';
import {CategoryProp} from 'customer/common/proptypes';
import I18n from 'utils/locale';
import IconFactory from 'components/IconFactory';
import Divider from 'components/Divider';
import CountdownTimer from 'customer/products/components/CountdownTimer';
import PropTypes from 'prop-types';
import Share from 'components/Share';
import FormTextInput from "components/FormTextInput";

export default class extends Component {
  static propTypes = {
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.item !== this.props.item;
  }

  onFieldChange = (field,value) => {
    this.props.onSearch(value);
  };

  render() {
    let {term} = this.props;
    return (
      <View style={styles.container}>
        <FormTextInput
          onValueChange={this.onFieldChange}
          value={term}
          field="search"
          maxLength={40}
          label={I18n.t('search')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'white',
    padding:10
  },
  swiper: {
    backgroundColor: colors.error,
    height: 424,
  },
  itemContainer: {
    padding: 10,
  },
  name: {
    fontSize: 16,
    color: colors.white,
  },
  nameActive: {
    fontWeight: '900',
  },
  image: {
    width: Dimensions.get('window').width,
    height: '100%',
  },
  itemInfoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    color: colors.error,
    fontSize: 12,
    fontWeight: '400',
  },
  itemContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 20,
  },
});
