import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


export default function  Advance_Hands_On_Exercise(){
  const [data, setData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      try {
        const response = await fetch(
          'https://mocki.io/v1/021cbcca-b77b-4cf3-bde4-d6f41508fde4',
        );
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, []);

  function renderImages(items) {
    if (!items || items.length === 0) return null;

    return items.map((item, index) => {
      let imageStyle = styles.image;
      if (items.length % 2 !== 0 && index === 0) {
        imageStyle = styles.fullWidthImage;
      }
      return (
        <View
          key={index}
          style={[
            styles.imageWrapper,
            imageStyle === styles.fullWidthImage
              ? styles.fullWidthWrapper
              : null,
          ]}>
          <Image source={{uri: item.url}} style={imageStyle} />
          <LinearGradient
            colors={['rgba(0, 0, 0, 0.0)', 'rgba(0, 0, 0, 1.0)']}
            style={styles.overlay}>
            <Text style={styles.overlayText}>{item.title}</Text>
          </LinearGradient>
        </View>
      );
    });
  }

  return (
  
      <View>
        <View style={styles.container}>
          {error && <Text style={styles.errorText}>Error: {error}</Text>}
          <ScrollView>
            {Object.keys(data).map(user => (
              <View key={user}>
                <Text style={styles.headerText}>{user}</Text>
                <View style={styles.grid}>{renderImages(data[user])}</View>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  imageWrapper: {
    position: 'relative',
    width: '48%',
    marginBottom: 10,
  },
  fullWidthWrapper: {
    width: '100%',
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  fullWidthImage: {
    width: '100%',
    height: 180,
    borderRadius: 8,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  overlayText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 15,
    fontSize: 18,
  },
});

//export default Advance_Hands_On_Exercise;
