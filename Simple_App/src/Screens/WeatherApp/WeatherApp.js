import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import {API_KEY} from './Key';

export default function WeatherApp() {
  const [city, setCity] = useState('');
  const [temp, setTemp] = useState(0);


  const fetchData = async () => {
    if (!city.trim()) {
      alert('Please enter a city name.');
      return;
    }

    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f709a0ca8c6132eeef2c6fd0187576a6&units=metric`,{ headers: { 'Access-Control-Allow-Origin': '*' } }
      );
      console.log("API response : ",res)
      const data = await res.data.main.temp
      console.log("After fetching response temp : ",data)
      setTemp(data);
    } catch (error) {
      console.error(error);
      alert('Error fetching data');
    }
  };

 

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../assets/Images/weatherAppBg.jpg')}
        style={styles.mainBackgrouund}>
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search City"
            style={styles.inputText}
            value={city}
            onChangeText={setCity}
          />
          <TouchableOpacity style={styles.button} onPress={fetchData}>
            <Text style={styles.text}>Search</Text>
          </TouchableOpacity>
          
          <View style={styles.card}>
            <Image
              source={require('../assets/Images/weatherIcon.png')}
              style={styles.weatherImage}
            />
            <View style={styles.main}>
              
            <Text style={styles.tempText}>{city}</Text>
            <Text style={styles.tempNum}>{temp}</Text>
              {/* <View style={styles.subView}>
                <Text style={styles.tempText}>Temperature</Text>
                <Text style={styles.tempNum}>12</Text>
              </View>

              <View style={styles.subView}>
                <Text style={styles.tempText}>Humidity</Text>
                <Text style={styles.tempNum}>12</Text>
              </View>

              <View style={styles.subView}>
                <Text style={styles.tempText}>Pressure</Text>
                <Text style={styles.tempNum}>12</Text>
              </View>

              <View style={styles.subView}>
                <Text style={styles.tempText}>weather</Text>
                <Text style={styles.tempNum}>12</Text>
              </View> */}
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  mainBackgrouund: {
    height: '100%',
    width: '100%',
  },
  main: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Ensures wrapping
    justifyContent: 'space-evenly', // Distributes items evenly
  },
  card: {
    width: '90%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 30,
    alignItems: 'center',
    padding: 20,
    marginTop: 20,
    height: 'auto', // Allows it to expand dynamically
  },
  weatherImage: {
    height: 100,
    width: 100,
    margin: 10,
  },
  searchContainer: {
    alignItems: 'center',
    paddingTop: 30,
  },
  inputText: {
    fontSize: 20,
    elevation: 10,
    paddingVertical: 10,
    width: '97%',
    textAlign: 'center',
    borderRadius: 10,
    backgroundColor: '#FAF9F6',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#484848',
  },
  button: {
    backgroundColor: '#FFE5B4',
    padding: 10,
    borderRadius: 10,
    margin: 20,
    width: '97%',
    elevation: 10,
  },
  tempText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
  },
  tempNum: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 80, // Reduced size for better fit
    textAlign: 'center',
  },
  subView: {
    width: '45%', // Ensures two items per row
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 10,
    marginTop:10
  },
});