import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text, View, Pressable} from 'react-native';
import {HeightScreen, Oranges, WidthScreen} from '../../../assets/utils';
import ScreenDashboardHotel from './ScreenDashboardHotel';
const Stack = createNativeStackNavigator();
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

const StackHotel = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: props => {
          // console.log(props);
          const {navigation} = props;
          return (
            <View
              style={{
                width: '100%',
                backgroundColor: Oranges,
                height: HeightScreen * 0.06,
                paddingHorizontal: WidthScreen * 0.02,
                justifyContent: 'center',
              }}>
              <Pressable onPress={() => navigation.goBack()}>
                <Icons
                  name="arrow-left"
                  size={HeightScreen * 0.03}
                  color={'white'}
                />
              </Pressable>
            </View>
          );
        },
      }}
      initialRouteName="Dashboard Hotel">
      <Stack.Screen name="Dashboard Hotel" component={ScreenDashboardHotel} />
    </Stack.Navigator>
  );
};

export default StackHotel;
