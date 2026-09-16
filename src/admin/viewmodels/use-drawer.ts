import { useMemo } from 'react';

import { useAuth } from '../../context/AuthContext';
import { AdminProfile, DrawerItemOption } from '../models/drawer.model';

const FALLBACK_AVATAR = 'https://i.pravatar.cc/150?u=recurrly-admin';

export function useDrawer() {
  const { user } = useAuth();

  const profile = useMemo<AdminProfile>(() => {
    const fullName = [user?.name, user?.lastName].filter(Boolean).join(' ').trim();

    return {
      name: fullName || 'Admin User',
      role: user?.roles[0]?.name ?? 'System Management',
      avatarUrl: user?.image || FALLBACK_AVATAR,
      version: '4.2.3',
    };
  }, [user]);

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
    profile,
    navigationOptions,
  };
}
