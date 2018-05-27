/**
 @flow
 */
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {ACTIONS} from 'guest/common/actions';
import FormTextInput from 'components/FormTextInput';
import Button from 'components/Button';
import I18n from 'utils/locale';
import FormContainer from 'components/FormContainer';
import FormContent from 'components/FormContent';
import {View} from "react-native";

type State = {
  name: string,
  email: string,
  password: string,
  mobile: string,
};

class Register extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  state: State = {
    name: null,
    email: null,
    mobile: null,
    password: null,
    password_confirmation: null,
  };

  // static navigationOptions = () => {
  //   return {
  //     header: null,
  //   };
  // };

  handleRegister = () => {
    let credentials = this.state;
    this.props.actions.register(credentials);
  };

  onFieldChange = (field, value) => {
    this.setState({[field]: value});
  };

  onLoginPress = () => {
    this.props.navigation.pop();
  };

  render() {
    const {auth} = this.props;
    const {
      name,
      email,
      mobile,
      password,
      password_confirmation,
      busy,
    } = this.state;

    return (
      <View>
        <FormContent>
          <FormTextInput
            onValueChange={this.onFieldChange}
            value={name}
            field="name"
            maxLength={40}
            label={I18n.t('name')}
          />

          <FormTextInput
            onValueChange={this.onFieldChange}
            value={email}
            field="email"
            maxLength={40}
            label={I18n.t('email')}
            keyboardType="email-address"
          />

          <FormTextInput
            onValueChange={this.onFieldChange}
            value={mobile}
            field="mobile"
            maxLength={40}
            label={I18n.t('mobile')}
            keyboardType="phone-pad"
          />

          <FormTextInput
            onValueChange={this.onFieldChange}
            value={password}
            field="password"
            maxLength={40}
            label={I18n.t('password')}
            secureTextEntry={true}
          />

          <FormTextInput
            onValueChange={this.onFieldChange}
            value={password_confirmation}
            field="password_confirmation"
            maxLength={40}
            secureTextEntry={true}
            label={I18n.t('password')}
          />

          <Button
            onPress={this.handleRegister}
            disabled={busy}
            raised
            primary
            dark
            title={busy ? I18n.t('signing_up') : I18n.t('create_account')}
            style={{marginTop: 50}}
          />
        </FormContent>

        <Button
          onPress={this.onLoginPress}
          title={`${I18n.t('have_an_account')} ${I18n.t('login')}`}
          color="white"
        />
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(ACTIONS, dispatch)};
}

function mapStateToProps(state) {
  return {
    auth: state.user,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
