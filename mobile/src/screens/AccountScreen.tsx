import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';

export const AccountScreen: React.FC = () => {
  const user = {
    name: 'Garvit Sharma',
    email: 'garvit@realestate.local',
    phone: '+91 98765 43210',
    kycStatus: 'Verified Verified',
  };

  const menuItems = [
    { id: '1', title: 'KYC & Verification', icon: '🛡️', value: 'Verified' },
    { id: '2', title: 'Saved Searches & Alerts', icon: '🔔', value: '3 Active' },
    { id: '3', title: 'Geospatial Travel Radii', icon: '📍', value: 'Financial Dist (15m)' },
    { id: '4', title: 'Builder Credibility Scores', icon: '📊', value: 'Top 5 Rated' },
    { id: '5', title: 'App Settings & Dark Mode', icon: '⚙️', value: 'System' },
    { id: '6', title: 'Help & Customer Support', icon: '🎧', value: '24/7' },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>GS</Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
          <View style={styles.kycBadge}>
            <Text style={styles.kycText}>✅ KYC Verified Buyer</Text>
          </View>
        </View>
      </View>

      {/* Menu Options */}
      <View style={styles.menuContainer}>
        {menuItems.map((item) => (
          <TouchableOpacity key={item.id} style={styles.menuRow} activeOpacity={0.7}>
            <View style={styles.menuLeft}>
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <Text style={styles.menuTitle}>{item.title}</Text>
            </View>
            <View style={styles.menuRight}>
              <Text style={styles.menuValue}>{item.value}</Text>
              <Text style={styles.chevron}>›</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Log Out */}
      <TouchableOpacity style={styles.logoutBtn}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  profileCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    elevation: 2,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#0284c7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 18,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0f172a',
  },
  userEmail: {
    fontSize: 13,
    color: '#64748b',
    marginBottom: 6,
  },
  kycBadge: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  kycText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#166534',
  },
  menuContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 24,
  },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  menuTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
  menuRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuValue: {
    fontSize: 12,
    color: '#64748b',
    marginRight: 6,
  },
  chevron: {
    fontSize: 18,
    color: '#94a3b8',
    fontWeight: '700',
  },
  logoutBtn: {
    backgroundColor: '#fef2f2',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fecaca',
    marginBottom: 30,
  },
  logoutText: {
    color: '#dc2626',
    fontWeight: '700',
    fontSize: 14,
  },
});
