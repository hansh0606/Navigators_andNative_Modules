import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

export default function Axios() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://mocki.io/v1/021cbcca-b77b-4cf3-bde4-d6f41508fde4',
        );
        const data = response.data;
        console.log('API Response:', data);
        setUsers(Object.entries(data));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <View>
      <Text style={styles.axiosText}>Axios</Text>

      {/* Render every user with name */}
      <FlatList
        data={users}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item: categoryData}) =>{

            const images = categoryData[1];
            const isOdd = images.length % 2 !== 0;
         return(

          <View>
            <Text style={styles.text}>{categoryData[0]}</Text>
            <View>

              {/* Render every image related to specific user */}
              <FlatList
                data={categoryData[1]}
                numColumns={2}
                keyExtractor={image => image.id.toString()}
                renderItem={({item: imageData}) => (
                  <View style={styles.imageContainer}>
                    <ImageBackground
                      source={{uri: imageData.url}}
                      style={styles.image}>
                       
                            <Text style={styles.imageText}>{imageData.title}</Text>
                    
                    </ImageBackground>
                  </View>
                )}
              />
            </View>
          </View>
        )}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    margin: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  image: {
    width: 180,
    height: 180,
    margin: 5,
    borderRadius: 5,
  },

  text: {
    margin: 10,
    fontSize: 30,
  },
  imageText: {
    fontWeight:"bold",
    color:"white",
    backgroundColor:"rgba(0,0,0,0.6)",
    width:'100%',
    fontSize:18,
    position:'absolute',
    bottom:0,
    textAlign:'center'
  },
  axiosText:{
    width:'100%',
    fontSize:30,
    backgroundColor:'#44bce1',
    color:'white',
    fontWeight:'bold',
    padding:10,
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10,

  }
 
});
