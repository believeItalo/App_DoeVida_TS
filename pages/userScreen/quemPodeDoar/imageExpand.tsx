import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

interface ClickableImageProps {
  imageSource: any; 
  text: string;
}

const ClickableImage: React.FC<ClickableImageProps> = ({ imageSource, text }) => {
  const [imageVisible, setImageVisible] = useState(false);

  const toggleImageVisibility = () => {
    setImageVisible(!imageVisible);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleImageVisibility}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{text}</Text>
          {imageVisible ? (
            <FontAwesome5 name="arrow-up" style={styles.arrow} />
          ) : (
            <FontAwesome5 name="arrow-down" style={styles.arrow} />
          )}
        </View>
        {imageVisible && <Image source={imageSource} style={styles.image} />}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: '200',
    marginRight: 10,
  },
  arrow: {
    fontSize: 20,
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default ClickableImage;
