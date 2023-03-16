import React, {useContext} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';

const DrawerBtn = ({title, img}) => {
  const currentTab = useRoute().name;
  const navigation = useNavigation()
  return (
    <TouchableOpacity
      onPress={() => {
        if (title === "Log Out") {
          console.log("Log out");
        } else {
          navigation.navigate(title);
        }
                
      }}>
      <View
        style={[
          styles.drawerItem,
          {backgroundColor: currentTab === title ? '#f2f2f2' : 'transparent'},
        ]}>
        <Image
          source={img}
          style={[
            styles.drawerIcon,
            {tintColor: currentTab === title ? '#2e2e2e' : '#f2f2f2'},
          ]}
        />
        <Text
          style={[
            styles.drawerText,
            {color: currentTab === title ? '#2e2e2e' : '#f2f2f2'},
          ]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 10,
    maxWidth: 170,
    marginTop: 10,
    paddingLeft: 20,
  },
  drawerIcon: {
    width: 25,
    height: 25,
  },
  drawerText: {
    fontWeight: 700,
    fontSize: 15,
    paddingLeft: 15,
  },
});

export default DrawerBtn;
