/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StyleSheet, ScrollView } from 'react-native';
import { HeaderView } from './components/HeaderView';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { CurrentValue } from './components/CurrentValue';
import { MiddleComponent } from './components/MiddleComponent';
import { Operations } from './components/Operations';
import { Actions } from './components/Actions';

export const CounterScreen: React.FC = () => {
  return (
    <SafeAreaProvider>
      <ScreenContent />
    </SafeAreaProvider>
  );
}

function ScreenContent() {
  const safeAreaInsets = useSafeAreaInsets();

  const [value, setValue] = useState(1);
  const [operations, setOperations] = useState(0);

  useEffect(() => {
    setOperations(operations + 1);
  }, [value]);

  return (
    <ScrollView contentContainerStyle={[styles.container, { paddingTop: safeAreaInsets.top }]}>
      <HeaderView
        title={'React Native Counter'}
        subtitle={'Learn Props, State & Lifecycle'}
      />

      <CurrentValue
        title={'Current Value'}
        value={value}
      />

      <MiddleComponent
        isEven={value % 2 === 0}
        count={operations}
      />

      <Operations
        onMinus={() => {
          if (value > 1) {
            setValue(value - 1);
          }
        }}
        onPlus={() => {
          if (value < 100) {
            setValue(value + 1);
          }
        }}
      />

      <Actions
        onReset={() => {
          setValue(1);
        }}
        onRandom={() => {
          const randomValue = Math.floor(Math.random() * 100) + 1;
          setValue(randomValue);
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    gap: 16
  }
});
