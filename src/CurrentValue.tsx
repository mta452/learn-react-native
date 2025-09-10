import React from "react";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

interface CurrentValueProps {
  style?: StyleProp<ViewStyle>;
  title: string;
  value: number;
}

export const CurrentValue: React.FC<CurrentValueProps> = ({ style, title, value }) => {
  return (
    <View style={[styles.container, style]}>
        <Text style={styles.headerText}>{title}</Text>
        <Text style={styles.valueText}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 48,
    paddingVertical: 16,
    borderRadius: 20
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
    color: '#222'
  },
  valueText: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#444'
  }
});
