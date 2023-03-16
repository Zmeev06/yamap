import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import profile from '../assets/img/profile.jpg'
import home from '../assets/icons/home.png';
import bell from '../assets/icons/bell.png';
import settings from '../assets/icons/settings.png';
import search from '../assets/icons/search.png';
import logout from '../assets/icons/logout.png';
import DrawerBtn from './UI/DrawerBtn';

const Drawer = ({showMenu, setShowMenu}) => {
  const [btns, setBtns] = useState([
    {title: 'Home', img: home},
    {title: 'Search', img: search},
    {title: 'Settings', img: settings},
  ]);

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image source={profile} style={styles.profileImg} />
        <Text style={[styles.profileText, styles.text]}>Anna Smith</Text>

        <Text style={[styles.text, {marginTop: 6}]}>View Profile</Text>
      </TouchableOpacity>

      <View style={{height: 450, marginTop: 50}}>
        {btns.map((btn, index) => (
          <DrawerBtn
            title={btn.title}
            img={btn.img}
            showMenu={showMenu}
            setShowMenu={setShowMenu}
            key={index}
          />
        ))}
      </View>

      <View>
        <DrawerBtn title={'Log Out'} img={logout} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5800d',
    justifyContent: 'flex-start',
    padding: 15,
    flex: 1,
  },
  text: {
    color: '#f2f2f2',
  },
  profileImg: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginTop: 8,
  },
  profileText: {
    fontSize: 20,
    fontWeight: 600,
  },
});

export default Drawer;
