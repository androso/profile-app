import { StyleSheet, Text, View } from 'react-native';

export default function CreateProductScreen() {
  return (
    <View style={styles.container}>
      <Text>Hello from Create Products</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9FAFB',
  },
});
