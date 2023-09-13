import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
interface ReadMoreTextProps {
  initialText: string;
  maxLength: number;
  titleWhenClosed: string;
  titleWhenOpen: string;
}


const ReadMoreText: React.FC<ReadMoreTextProps> = ({
  initialText,
  maxLength,
  titleWhenClosed,
  titleWhenOpen,
}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const displayText = expanded ? initialText : initialText.slice(0, maxLength);

  return (
    <View style={styles.component}>
      <TouchableOpacity onPress={toggleExpand} style={styles.header}>
        <Text style={styles.titleWhenClosed}>
          {expanded ? titleWhenOpen : titleWhenClosed}
        </Text>
        <Image
          source={expanded ? require('./imgs/arrowUp.png') : require('./imgs/arrowDown.png')}
          style={{ width: 18, height: 18 }}
        />
      </TouchableOpacity>

      {expanded && (
        <Text>{displayText}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  component: {
    flexDirection: 'column',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleWhenClosed: {
    fontSize: 24,
    fontWeight: '200',
    marginRight: 10,
  },
});

export default ReadMoreText;
