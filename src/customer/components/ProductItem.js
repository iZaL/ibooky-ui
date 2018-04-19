/**
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {Title, TouchableRipple, Subheading} from 'react-native-paper';
import colors from 'assets/theme/colors';
import {CategoryProp} from 'customer/common/proptypes';
import Image from 'react-native-image-progress';
import Swiper from "react-native-swiper";
import I18n from 'utils/locale';
import IconFactory from "../../components/IconFactory";
import Divider from "../../components/Divider";

export default class extends Component {

  static propTypes = {
    item: CategoryProp.isRequired,
    onPress: PropTypes.func.isRequired,
    activeID: PropTypes.number,
  };

  static defaultProps = {
    activeID: null
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.activeID !== this.props.activeID;
  }

  render() {
    let {item, onPress} = this.props;

    return (

      <View style={styles.container}>

        <Swiper style={styles.swiper}
                autoPlay={false}
                showsButtons={false}
                removeClippedSubviews={false}
        >
          {
            item.images.map((image, i) => {
                return (
                  <Image key={i} source={{uri: image}} style={styles.image} resizeMode="stretch"/>
                )
              }
            )}
        </Swiper>

        <TouchableRipple
          onPress={() => onPress(item)}
          style={styles.itemContainer}>

          {/*<Text style={[styles.name, item.id === activeID && styles.nameActive]}>*/}
          {/*{item.title}*/}
          {/*</Text>*/}

          <View>
            
            <Title> {item.title}</Title>
            <Subheading> {I18n.t('save')} {item.offerPercentage} </Subheading>

            <Divider style={{marginVertical:10}}/>

            <View style={styles.itemInfoContainer}>

              <View style={styles.itemContent}>
                <Text style={styles.label}>{item.oldPrice}</Text>
                <Text style={styles.value}>{item.price}</Text>
              </View>

              <View style={styles.itemContent}>
                <Text style={styles.label}>{I18n.t('time_remaining')}</Text>
                <Text style={styles.value}>{item.price}</Text>
              </View>

              <IconFactory type="MaterialCommunityIcons" name="heart" color={colors.error} size={24}/>

              <View style={styles.itemContent}>
                <Text style={styles.label}>{I18n.t('share')}</Text>
                <IconFactory type="Entypo" name="share-alternative" color={colors.error} size={24}/>
              </View>

            </View>

          </View>


        </TouchableRipple>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
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
  itemInfoContainer:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  label:{
    color:colors.error,
    fontSize:12,
    fontWeight:'400'
  },
  itemContent:{
    alignItems:'center'
  },
  value: {
    color:colors.primary,
    fontWeight:'700',
    fontSize:20
  }
});
