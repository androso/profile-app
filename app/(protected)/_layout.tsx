import { Feather } from '@expo/vector-icons';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { Drawer } from 'expo-router/drawer';
import { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useDrawer } from '../../src/admin/viewmodels/use-drawer';
import { useAuth } from '../../src/context/AuthContext';

export default function ProtectedLayout() {
  const { profile, navigationOptions } = useDrawer();
  const { clearSession } = useAuth();
  const [isInventoryExpanded, setIsInventoryExpanded] = useState(false);

  const renderDrawerContent = (props: DrawerContentComponentProps) => {
    const activeIndex = props.state.index;
    const activeRouteName = props.state.routeNames[activeIndex];

    return (
      <View style={styles.drawerContainer}>
        <View style={styles.header}>
          <View style={styles.headerInfoUser}>
            <Image source={{ uri: profile.avatarUrl }} style={styles.avatar} />
            <View style={styles.headerInfo}>
              <Text style={styles.adminName}>{profile.name}</Text>
              <Text style={styles.adminRole}>{profile.role}</Text>
            </View>
          </View>
          <View style={styles.versionTag}>
            <Text>{profile.version}</Text>
          </View>
        </View>

        <View style={styles.menuList}>
          {navigationOptions.map((option) => {
            const isSelected = activeRouteName === option.name;
            const hasSubItems = Boolean(option.subItems?.length);

            return (
              <View key={option.name}>
                <TouchableOpacity
                  style={[
                    styles.menuItemList,
                    isSelected && styles.menuItemActive,
                  ]}
                  onPress={() => {
                    if (hasSubItems) {
                      setIsInventoryExpanded(!isInventoryExpanded);
                      return;
                    }

                    props.navigation.navigate(option.name);
                  }}
                >
                  <Feather
                    name={option.icon as any}
                    size={20}
                    color={isSelected ? '#FFFFFF' : '#374151'}
                    style={styles.menuIcon}
                  />
                  <Text
                    style={[
                      styles.menuText,
                      isSelected && styles.menuTextSelected,
                    ]}
                  >
                    {option.label}
                  </Text>
                  {hasSubItems ? (
                    <Feather
                      name={isInventoryExpanded ? 'chevron-up' : 'chevron-down'}
                      size={16}
                      color={isSelected ? '#FFFFFF' : '#374151'}
                      style={styles.expandIcon}
                    />
                  ) : null}
                </TouchableOpacity>

                {hasSubItems && isInventoryExpanded && option.subItems
                  ? option.subItems.map((subItem) => {
                      const isSubSelected = activeRouteName === subItem.name;

                      return (
                        <TouchableOpacity
                          key={subItem.name}
                          style={[
                            styles.menuItemList,
                            styles.subMenuItem,
                            isSubSelected && styles.menuItemActive,
                          ]}
                          onPress={() => {
                            props.navigation.navigate(subItem.name);
                          }}
                        >
                          <Feather
                            name={subItem.icon as any}
                            size={16}
                            color={isSubSelected ? '#FFFFFF' : '#4B5563'}
                            style={styles.menuIcon}
                          />
                          <Text
                            style={[
                              styles.menuText,
                              styles.subMenuText,
                              isSubSelected && styles.menuTextSelected,
                            ]}
                          >
                            {subItem.label}
                          </Text>
                        </TouchableOpacity>
                      );
                    })
                  : null}
              </View>
            );
          })}
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => {
            void clearSession();
          }}
        >
          <Feather
            name="log-out"
            size={20}
            color="#EF4444"
            style={styles.menuIcon}
          />
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerTintColor: '#006C47',
        }}
        drawerContent={renderDrawerContent}
      >
        <Drawer.Screen name="dashboard" options={{ title: 'Dashboard' }} />
        <Drawer.Screen name="orders" options={{ title: 'Orders' }} />
        <Drawer.Screen name="inventory" options={{ title: 'Inventory' }} />
        <Drawer.Screen
          name="profile"
          options={{
            title: 'Profile',
            drawerItemStyle: { display: 'none' },
          }}
        />
        <Drawer.Screen
          name="category"
          options={{
            title: 'New Category',
            drawerItemStyle: { display: 'none' },
          }}
        />
        <Drawer.Screen
          name="create-product"
          options={{
            title: 'Products',
            drawerItemStyle: { display: 'none' },
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    paddingTop: 50,
  },
  header: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E55E7F',
    alignItems: 'flex-start',
  },
  headerInfoUser: {
    flexDirection: 'row',
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 30,
  },
  headerInfo: {
    marginLeft: 15,
    marginTop: 5,
  },
  adminName: {
    fontSize: 20,
    color: '#006C47',
    fontWeight: 'bold',
  },
  adminRole: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#6B7280',
  },
  versionTag: {
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginTop: 8,
    borderRadius: 12,
    borderColor: '#D5D7DB',
  },
  menuList: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 12,
  },
  menuItemList: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 24,
    marginVertical: 4,
  },
  menuItemActive: {
    backgroundColor: '#00B074',
  },
  menuIcon: {
    marginRight: 15,
  },
  expandIcon: {
    marginLeft: 'auto',
  },
  subMenuItem: {
    paddingLeft: 40,
  },
  menuText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#374151',
  },
  subMenuText: {
    fontSize: 14,
  },
  menuTextSelected: {
    color: '#FFFFFF',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    marginBottom: 15,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#EF4444',
  },
});
