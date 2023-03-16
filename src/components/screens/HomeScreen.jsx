import React, {useState, useEffect, useRef, useContext} from 'react';
import {
  Text,
  Image,
  Button,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {YaMap, Marker, Polyline} from 'react-native-yamap';
import {getDistance} from 'geolib';
import Geolocation from 'react-native-geolocation-service';
import Layout from '../Layout';
import gas from '../../assets/icons/gas.png';
import { Context } from '../../context';

YaMap.init('1d16b38a-4abc-42b4-a552-c30af23c1423');
YaMap.setLocale('ru_RU');

const HomeScreen = () => {
  
  const hui = useContext(Context)
  console.log(hui);

  const [position, setPosition] = useState({
    lat: 0,
    lon: 0,
  });

  useEffect(() => {
    Geolocation.getCurrentPosition(pos => {
      const crd = pos.coords;
      setPosition({
        lat: crd.latitude,
        lon: crd.longitude,
      });
    });
  }, []);

  const [routePoints, setRoutePoints] = useState([]);

  const mapRef = useRef();
  const test = () => {
    mapRef.current.findRoutes(
      [{lat: 47.23647, lon: 39.712932}, {lat: 47.23402, lon: 39.713371}],
      [],
      event => {
        setRoutePoints(event.routes[0].sections[0].points)
      },
    );

  };

  const toNearest = () => {
    setGasStations(
      gasStations.map(item => {
        const dist = getDistance(
          {
            latitude: position.lat,
            longitude: position.lon,
          },
          {latitude: item.lat, longitude: item.lon},
        );
        return {...item, distance: dist};
      }),
    );

    const minDistance = gasStations.reduce((obj, current) => {
      if (current.distance < obj.distance) obj = current;
      return {lat: obj.lat, lon: obj.lon};
    });
    
    mapRef.current.findRoutes(
      [position, minDistance],
      [],
      event => {
        setRoutePoints(event.routes[0].sections[0].points)
      },
    );
  };
  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.text}>Все заправки на одной карте</Text>
        <YaMap
          ref={mapRef}
          showUserPosition={true}
          rotateGesturesEnabled={false}
          nightMode={true}
          mapType={'vector'}
          initialRegion={{
            lat: position.lat,
            lon: position.lon,
            zoom: 17,
            azimuth: 0,
          }}
          style={styles.map}>
          {/* {gasStations.map(item => (
            <Marker point={{lat: item.lat, lon: item.lon}} key={item.id}>
              <Image source={gas} style={styles.marker} />
            </Marker>
          ))} */}
          {routePoints.length > 0 && (
            <Polyline
              strokeColor="#FFA630"
              strokeWidth={5}
              points={routePoints}
            />
          )}
        </YaMap>
        <TouchableOpacity onPress={toNearest}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Найти ближайшую заправку</Text>
          </View>
        </TouchableOpacity>
        <Button title={'test'} onPress={test}/>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: 250,
    marginTop: 30,
  },
  marker: {
    width: 25,
    height: 25,
    tintColor: '#FFF',
  },
  button: {
    width: 350,
    height: 100,
    backgroundColor: '#f5800d',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 22,
    color: '#f2f2f2',
  },
  text: {
    fontSize: 22,
    color: '#f2f2f2',
    paddingTop: 30,
  },
});

export default HomeScreen;
