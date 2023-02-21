import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React from 'react';
import adjust, {HeightScreen, Oranges, WidthScreen} from '../utils';
import {Image} from 'react-native';
import {Formik} from 'formik';
import {validationLogin} from '../validationInput';
import {inquiryKeyLogin, Login} from '../API/funtionPost';
import DeviceInfo from 'react-native-device-info';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

const LoginScreen = ({navigation}) => {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const states = useSelector(state => state);
  // console.log(states);
  // console.log(navigation);

  return (
    <Formik
      validationSchema={validationLogin}
      initialValues={{email: '', password: ''}}
      onSubmit={(values, {resetForm}) =>
        inquiryKeyLogin(key => {
          DeviceInfo.getAndroidId().then(androidId => {
            Login(
              {
                device_id: androidId,
                email: values.email,
                inquiry_key: key.data.data,
                password: values.password,
                role: 'CUSTOMER',
              },
              login => {
                if (login.status === 200) {
                  // console.log(login.result.data.data);
                  dispatch({
                    type: 'auth',
                    data: login.result.data.data,
                  });

                  // console.log(login.result.data.data);
                  navigation.navigate('Pesanan');

                  setMessage('');
                  resetForm();
                } else {
                  setMessage(login.result.response.data.message);
                  // console.log(login.result);
                }
              },
            );

            // console.log({
            //   device_id: androidId,
            //   email: values.email,
            //   inquiry_key: key.data.data,
            //   password: values.password,
            //   role: 'CUSTOMER',
            // });
          });
        })
      }>
      {({handleChange, handleBlur, handleSubmit, values, errors}) => {
        return (
          <View style={Style.view}>
            <Image
              style={{width: WidthScreen * 0.161, height: HeightScreen * 0.1}}
              source={require('../Images/cektravel.png')}
            />
            {message && (
              <Text
                style={{
                  marginVertical: adjust(10),
                  color: 'red',
                  fontSize: adjust(10),
                }}>
                {message}
              </Text>
            )}
            <>
              <View style={Style.containInput}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                  }}>
                  <Text style={Style.label}>Email</Text>
                  {errors && (
                    <Text style={{color: 'red', fontSize: adjust(9)}}>
                      {errors.email}
                    </Text>
                  )}
                </View>
                <TextInput
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  style={Style.input}
                  placeholder="yourEmail@gmail.com"
                  keyboardType="email-address"
                />
              </View>

              <View style={Style.containInput}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                  }}>
                  <Text style={Style.label}>Password</Text>
                  {errors && (
                    <Text style={{color: 'red', fontSize: adjust(9)}}>
                      {errors.password}
                    </Text>
                  )}
                </View>
                <TextInput
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  style={Style.input}
                  placeholder="*******"
                  secureTextEntry={true}
                />
              </View>

              <TouchableOpacity
                onPress={handleSubmit}
                style={{marginTop: 15, width: '90%'}}>
                <View style={Style.btn}>
                  <Text style={{color: 'white'}}>Login</Text>
                </View>
              </TouchableOpacity>

              {/* <TouchableOpacity
              style={{
                marginTop: 25,
                width: '90%',
                display: 'flex',
                alignItems: 'center',
                borderWidth: 1,
                height: 40,
                justifyContent: 'center',
                borderRadius: 20,
                borderColor: Oranges,
              }}>
              <Text style={{color: Oranges}}>Login With Google</Text>
            </TouchableOpacity> */}
            </>
          </View>
        );
      }}
    </Formik>
  );
};

const Style = StyleSheet.create({
  view: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: 'white',
  },
  view2: {
    width: 300,
    height: 400,
    backgroundColor: 'red',
  },
  input: {
    paddingLeft: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Oranges,
    color: 'black',
  },

  label: {
    paddingLeft: 3,
    marginBottom: 5,
    color: Oranges,
  },
  containInput: {
    width: '90%',
    marginTop: 20,
  },
  btn: {
    height: 40,
    borderRadius: 20,
    width: '100%',
    backgroundColor: Oranges,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginScreen;
