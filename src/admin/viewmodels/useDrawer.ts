import { useRouter } from 'expo-router';
import { useState } from 'react';

import { AdminProfile, DrawerItemOption } from '../models/drawer.model';

export function useDrawer() {
  const router = useRouter();

  const [profile] = useState<AdminProfile>({
    name: 'Admin User',
    role: 'System Management',
    avatarUrl: 'https://i.pravatar.cc/150?u=recurrly-admin',
    version: '4.2.3',
  });

  const navigationOptions: DrawerItemOption[] = [
    {
      name: 'dashboard',
      label: 'Dashboard',
      icon: 'grid',
    },
    {
      name: 'orders',
      label: 'Orders',
      icon: 'package',
    },
    {
      name: 'inventory',
      label: 'Inventory',
      icon: 'archive',
    },
  ];

  return {
    router,
    profile,
    navigationOptions,
  };
}
