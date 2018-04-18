import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'react-native';
import {connect} from 'react-redux';
import HomeMenu from 'customer/components/HomeMenu';
import {CategoriesPropType} from 'customer/common/proptypes';
import {ACTIONS as CUSTOMER_ACTIONS} from 'customer/common/actions';
import Spinner from 'components/Spinner';
import colors from "../assets/theme/colors";

class Home extends Component {
  state = {
    activeMenuItemID: 1,
  };

  componentDidMount() {
    this.props.dispatch(CUSTOMER_ACTIONS.fetchCategories());
  }

  onHomeMenuItemPress = (item: object) => {
    this.setState({
      activeMenuItemID: item.id,
    });
  };

  render() {
    let {categories} = this.props;
    return (
      <View>
        <HomeMenu
          items={categories}
          onItemPress={this.onHomeMenuItemPress}
          activeID={this.state.activeMenuItemID}
        />
        <Spinner isVisible={true} />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    categories: [
      {id: 1, name: 'Coupons'},
      {id: 2, name: 'Samsung'},
      {id: 3, name: 'Sumo Houseware'},
      {id: 4, name: 'Tools'},
    ],
  };
}

export default connect(mapStateToProps)(Home);
