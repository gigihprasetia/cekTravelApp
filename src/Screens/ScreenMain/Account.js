import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Button,
} from 'react-native';
import React, {useState} from 'react';
import adjust, {
  GrayFade,
  Greens,
  HeightScreen,
  Oranges,
  WidthScreen,
} from '../../../assets/utils';
import LoginScreen from '../../../assets/Component/LoginScreen';
import RegisterScreen from '../../../assets/Component/RegisterScreen';
import {useDispatch, useSelector} from 'react-redux';
import {SvgUri} from 'react-native-svg';
import {Revoke} from '../../../assets/API/functionget';

export default function Account(props) {
  const isLogin = useSelector(state => state.UserReducers);
  const dispatch = useDispatch();
  console.log(isLogin);
  const [toogle, setToogle] = useState(true);
  const {navigation} = props;
  return isLogin.dataUser.statusUser ? (
    <View style={{backgroundColor: 'white', width: '100%', height: '100%'}}>
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          marginVertical: adjust(10),
        }}>
        <View>
          <SvgUri
            width={adjust(35)}
            height={adjust(35)}
            uri={isLogin.dataUser.data.ava}
          />
        </View>

        <Text style={{color: Oranges, fontSize: adjust(15)}}>
          {isLogin.dataUser.data.name}
        </Text>
        <Text
          style={{
            color: GrayFade,
            fontSize: adjust(10),
            marginBottom: adjust(10),
          }}>
          {isLogin.dataUser.data.email}
        </Text>
        <Button
          onPress={() => {
            Revoke(isLogin.isAuthenticated.token, val =>
              dispatch({
                type: 'revoke',
              }),
            );
          }}
          title="Logout"
          color={'red'}
        />
      </View>
    </View>
  ) : (
    <SafeAreaView
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        padding: adjust(5),
      }}>
      <ScrollView>
        <View
          style={{
            flex: 1,
            height: '100%',
            flexDirection: 'row',
            marginBottom: adjust(15),
          }}>
          <TouchableOpacity
            onPress={() => setToogle(true)}
            style={{
              flex: 1,
              paddingVertical: adjust(10),
              alignItems: 'center',
              borderBottomWidth: toogle ? 1 : 0,
              borderBottomColor: toogle ? Oranges : GrayFade,
            }}>
            <Text
              style={{
                color: toogle ? Oranges : GrayFade,
                fontSize: adjust(10),
                fontWeight: 'bold',
              }}>
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setToogle(false)}
            style={{
              flex: 1,
              paddingVertical: adjust(10),
              alignItems: 'center',
              borderBottomWidth: !toogle ? 1 : 0,
              borderBottomColor: !toogle ? Oranges : GrayFade,
            }}>
            <Text
              style={{
                color: !toogle ? Oranges : GrayFade,
                fontSize: adjust(10),
                fontWeight: 'bold',
              }}>
              Register
            </Text>
          </TouchableOpacity>
        </View>

        {toogle ? (
          <LoginScreen navigation={navigation} />
        ) : (
          <RegisterScreen navigation={navigation} setToogle={setToogle} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
