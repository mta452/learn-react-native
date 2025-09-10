/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StyleSheet, ScrollView } from 'react-native';
import { HeaderView } from './HeaderView';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { CurrentValue } from './CurrentValue';
import { MiddleComponent } from './MiddleComponent';
import { Operations } from './Operations';
import { Actions } from './Actions';

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
        style={{ marginTop: 16 }}
        title={'Current Value'}
        value={value}
      />

      <MiddleComponent
        style={{ marginTop: 16 }}
        isEven={value % 2 === 0}
        count={operations}
      />

      <Operations
        style={{ marginTop: 16 }}
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
        style={{ marginTop: 16, marginBottom: 16 }}
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
  }
});
