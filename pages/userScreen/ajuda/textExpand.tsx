import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
interface ReadMoreTextProps {
  initialText: string;
  maxLength: number;
  titleWhenClosed: string;
  titleWhenOpen: string;
  phoneNumber?: string; // Adicione estas duas propriedades
  email?: string;
}

const ReadMoreText: React.FC<ReadMoreTextProps> = ({
  initialText,
  maxLength,
  titleWhenClosed,
  titleWhenOpen,
  phoneNumber,
  email,
}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const displayText = expanded ? initialText : initialText.slice(0, maxLength);

  // Condicionar a renderização dos campos de telefone e email apenas se as propriedades estiverem definidas
  const extraInfo = [];
  if (phoneNumber) {
    extraInfo.push(`Telefone: ${phoneNumber}`);
  }
  if (email) {
    extraInfo.push(`Email: ${email}`);
  }

  const extraInfoText = extraInfo.join('\n');

  // Combine o texto expandido com as informações extras
  const expandedText = `${displayText}${extraInfoText ? `\n\n${extraInfoText}` : ''}`;

  return (
    <View style={styles.component}>
      <TouchableOpacity onPress={toggleExpand} style={styles.header}>
        <Text style={styles.titleWhenClosed}>
          {expanded ? titleWhenOpen : titleWhenClosed}
        </Text>
        <Image
          source={expanded ? require('./imgs/arrowUp.png') : require('./imgs/arrowDown.png')}
          style={styles.arrow}
        />
      </TouchableOpacity>

      {expanded && (
        <Text style={styles.textExpandedText}>{expandedText}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  arrow: {
    width: 18, 
    height: 18 
  },
  component: {
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop:50
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleWhenClosed: {
    fontSize: 20,
    fontWeight: '200',
    marginRight: 10,
  },
  textExpandedText:{
    fontSize:14,
    paddingTop:30,
    fontWeight:'300'
  }
});

export default ReadMoreText;