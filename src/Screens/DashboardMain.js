import {View, Text, Button} from 'react-native';
import React, {useState} from 'react';
import {Platform} from 'react-native';
import DatePicker from 'react-native-date-ranges';

export default function DashboardMain() {
  const [selectedDate, setSelectedDate] = useState('csdcsdbcshj');
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>DashboardMain</Text>
      <DatePicker
        style={{
          height: 36,
          borderRadius: 8,
          borderColor: '#cccccc',
          borderWidth: 1,
        }}
        customStyles={{
          placeholderText: {fontSize: 14}, // placeHolder style
          headerStyle: {backgroundColor: 'green'}, // title container style
          headerMarkTitle: {color: 'white'}, // title mark style
          headerDateTitle: {fontSize: 15}, // title Date style
          contentInput: {fontSize: 14}, //content text container style
          contentText: {fontSize: 14}, //after selected text Style
        }} // optional
        centerAlign // optional text will align center or not
        allowFontScaling={true} // optional
        ButtonStyle={{
          backgroundColor: 'green',
          borderWidth: 1,
          borderRadius: 10,
          marginHorizontal: 20,
          borderColor: '#fff',
        }}
        ButtonTextStyle={{
          color: '#fff',
          alignSelf: 'center',
          padding: 10,
          fontSize: 16,
        }}
        placeholder={'start Date → end Date'}
        mode={'range'}
        markText={'Pickup Your Date'}
        ButtonText="Select"
        onConfirm={text => console.log(text)}
        outFormat={'DD-MM-YYYY'}
      />
    </View>
  );
}
