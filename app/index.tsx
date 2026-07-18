import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function UserProfile() {
  const printInformation = (text: string) => {
    console.log(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.avatarImage}
          source={require('../assets/profile.png')}
        />

        <View style={styles.infoContainer}>
          <Text style={styles.name}>Anibal Andrade</Text>
          <Text style={styles.username}>@androso</Text>
          <TouchableOpacity
            onPress={() => {
              printInformation('Edit Profile');
            }}
          >
            <Text style={styles.editButton}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.followsInformation}>
        <View style={styles.followContainer}>
          <Text style={styles.label}>Posts</Text>
          <Text style={styles.values}>12</Text>
        </View>
        <View style={styles.followContainer}>
          <Text style={styles.label}>Following</Text>
          <Text style={styles.values}>184</Text>
        </View>
        <View style={styles.followContainer}>
          <Text style={styles.label}>Followers</Text>
          <Text style={styles.values}>327</Text>
        </View>
      </View>

      <Text style={styles.bio}>
        Software engineer who loves writing software and following his curiosity.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    marginTop: 80,
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  avatarImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: '#000000',
  },
  infoContainer: {
    marginLeft: 20,
    justifyContent: 'center',
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000000',
  },
  username: {
    fontSize: 16,
    fontWeight: '500',
    color: '#959595',
    marginTop: 2,
    marginBottom: 6,
  },
  editButton: {
    fontSize: 16,
    color: '#0C19F5',
    fontWeight: '600',
  },
  followsInformation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    marginTop: 30,
    marginBottom: 20,
  },
  followContainer: {
    alignItems: 'center',
    flex: 1,
  },
  label: {
    fontSize: 15,
    color: '#959595',
    marginBottom: 4,
  },
  values: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000000',
  },
  bio: {
    paddingHorizontal: 24,
    marginTop: 20,
    fontSize: 16,
    lineHeight: 24,
    color: '#000000',
  },
});
