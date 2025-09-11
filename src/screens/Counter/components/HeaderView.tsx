import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface HeaderViewProps {
  title: string;
  subtitle: string;
}

export const HeaderView: FC<HeaderViewProps> = ({title, subtitle}) => {
  return (
    <View style={styles.headerView}>
      <Text style={styles.headerTitle}>{title}</Text>
      <Text style={styles.headerSubtitle}>{subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerView: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111'
  },
  headerSubtitle: {
    fontSize: 20,
    fontWeight: 'semibold',
    color: '#444',
    marginTop: 8
  }
}); 