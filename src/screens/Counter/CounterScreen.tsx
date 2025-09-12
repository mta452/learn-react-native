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
import { CurrentValue } from './components/CurrentValue';
import { MiddleComponent } from './components/MiddleComponent';
import { Operations } from './components/Operations';
import { Actions } from './components/Actions';
import { useAppDispatch, useAppSelector } from '../../redux/Store';
import { decrement, increment, random, reset } from '../../redux/CounterSlice';

export const CounterScreen: React.FC = () => {
  return (
    <SafeAreaProvider>
      <ScreenContent />
    </SafeAreaProvider>
  );
}

function ScreenContent() {
  const safeAreaInsets = useSafeAreaInsets();

  const value = useAppSelector((state) => state.counter.value);
  const operations = useAppSelector((state) => state.counter.operations);

  const dispatch = useAppDispatch();

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
        onMinus={() => { dispatch(decrement()); }}
        onPlus={() => { dispatch(increment()); }}
      />

      <Actions
        onReset={() => { dispatch(reset()); }}
        onRandom={() => {
          const randomValue = Math.floor(Math.random() * 100) + 1;
          dispatch(random(randomValue));
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
