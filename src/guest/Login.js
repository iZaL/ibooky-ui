import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ACTIONS} from 'guest/common/actions';
import {NavigationActions} from 'react-navigation';
import {Alert, View, Text, TouchableHighlight} from 'react-native';
import I18n from 'utils/locale';
import FormContainer from 'components/FormContainer';
import FormContent from 'components/FormContent';
import FormTextInput from 'components/FormTextInput';
import Button from 'components/Button';
import colors from 'assets/theme/colors';
import Divider from 'components/Divider';
import BackButton from 'components/BackButton';
import {Button as PaperButton} from 'react-native-paper';


class Login extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
  };

  state = {
    email: 'customer@test.com',
    password: 'secret',
  };

  static navigationOptions = ({navigation}) => {
    // console.log('nav',navigation);
    return {
      // headerLeft: <BackButton onPress={() => navigation.pop()} />,
      // headerLeft: navigation.state.params && navigation.state.params.backButtonVisible && <BackButton onPress={() => navigation.goBack(null)} />,
    };
  };

  handleLogin = () => {
    // const credentials = {
    //   email: this.state.email,
    //   password: this.state.password,
    // };
    // this.props.actions.login(credentials, this.props.navigation);

    let {redirectRoute} = this.props.navigation.state.params || {};

    console.log('redirectRoute', redirectRoute);

    return new Promise((resolve, reject) => {
      // this.props.actions.checkout({item, resolve, reject});

      const credentials = {
        email: this.state.email,
        password: this.state.password,
      };

      // if(scene && scene === 'checkout') {
      //   this.props.navigation.navigate('Cart');
      // }
      this.props.actions.login({credentials, resolve, reject, redirectRoute});
    })
      .then(user => {
        console.log('u', user);
        // if(scene && scene === 'checkout') {
        //   this.props.navigation.navigate('Cart');
        // }
      })
      .catch(e => {
        console.log('e');
      });
  };

  handleRegisterRoute = () => {
    return this.props.navigation.navigate('Register');
    // return Alert.alert(I18n.t('choose_account_type'), '', [
    //   {
    //     text: I18n.t('yes'),
    //     onPress: () => {
    //       this.props.navigation.navigate('RegisterScreen', {
    //         isCompany: true,
    //       });
    //     },
    //   },
    //   {
    //     text: I18n.t('no'),
    //     onPress: () => {
    //       this.props.navigation.navigate('RegisterScreen', {
    //         isCompany: false,
    //       });
    //     },
    //   },
    //   // {
    //   //   text: I18n.t('driver'),
    //   //   onPress: () => {
    //   //     this.props.navigation.navigate('RegisterScreen', {
    //   //       userType: 'driver',
    //   //     });
    //   //   },
    //   // },
    // ]);
  };

  handleForgotPasswordRoute = () => {
    this.props.navigation.navigate('Forgot');
  };

  onFieldChange = (field, value) => {
    this.setState({[field]: value});
  };

  goBack = () => {
    const navigationAction = NavigationActions.back();
    this.props.navigation.dispatch(navigationAction);
  };

  onSkip = () => {
    this.props.navigation.goBack(null);
  };

  render() {
    const {auth} = this.props;
    const {
      email,
      password,
      onFieldChange,
      handleLogin,
      handleRegisterRoute,
      handleForgotPasswordRoute,
      onSkip,
      busy,
    } = this.state;

    console.log('props', this.props);

    return (
      <FormContainer>
        <FormContent>
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
            value={password}
            field="password"
            maxLength={40}
            label={I18n.t('password')}
            secureTextEntry={true}
          />

          <Button
            onPress={this.handleLogin}
            disabled={auth.login.busy}
            title={auth.login.busy ? I18n.t('logging_in') : I18n.t('login')}
            style={[{backgroundColor: colors.primary},{marginTop:30}]}
          />

          <Divider style={{marginTop: 30}} />

          <PaperButton
            onPress={this.handleRegisterRoute}
          >
            <Text style={{textAlign: 'center'}}>
              {I18n.t('create_account')}
            </Text>
          </PaperButton>

          <PaperButton
            onPress={this.handleForgotPasswordRoute}
          >
            <Text style={{textAlign: 'center'}}>
              {I18n.t('forgot_password')}
            </Text>
          </PaperButton>

        </FormContent>
      </FormContainer>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
