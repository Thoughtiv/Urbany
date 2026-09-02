import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HomeScreen } from './src/screens/HomeScreen';
import { MapScreen } from './src/screens/MapScreen';
import { SavedScreen } from './src/screens/SavedScreen';
import { AccountScreen } from './src/screens/AccountScreen';
import { PropertyDetailScreen } from './src/screens/PropertyDetailScreen';
import { Property } from './src/types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'Explore' | 'Map' | 'Saved' | 'Account'>('Explore');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* If property selected, show Detail Screen */}
      {selectedProperty ? (
        <PropertyDetailScreen
          property={selectedProperty}
          onBack={() => setSelectedProperty(null)}
        />
      ) : (
        <View style={styles.mainArea}>
          {/* Active Screen Tab View */}
          {activeTab === 'Explore' && (
            <HomeScreen onSelectProperty={(prop) => setSelectedProperty(prop)} />
          )}
          {activeTab === 'Map' && (
            <MapScreen onSelectProperty={(prop) => setSelectedProperty(prop)} />
          )}
          {activeTab === 'Saved' && (
            <SavedScreen onSelectProperty={(prop) => setSelectedProperty(prop)} />
          )}
          {activeTab === 'Account' && <AccountScreen />}

          {/* Bottom Navigation */}
          <View style={styles.bottomNav}>
            {(['Explore', 'Map', 'Saved', 'Account'] as const).map((tab) => (
              <TouchableOpacity
                key={tab}
                style={styles.navItem}
                onPress={() => setActiveTab(tab)}
              >
                <Text style={styles.navIcon}>
                  {tab === 'Explore' && '🏢'}
                  {tab === 'Map' && '🗺️'}
                  {tab === 'Saved' && '❤️'}
                  {tab === 'Account' && '👤'}
                </Text>
                <Text
                  style={[
                    styles.navText,
                    activeTab === tab && styles.navTextActive,
                  ]}
                >
                  {tab}
                </Text>
                {activeTab === tab && <View style={styles.activeIndicator} />}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  mainArea: {
    flex: 1,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: -2 },
  },
  navItem: {
    alignItems: 'center',
  },
  navIcon: {
    fontSize: 18,
    marginBottom: 2,
  },
  navText: {
    fontSize: 11,
    color: '#94a3b8',
    fontWeight: '600',
  },
  navTextActive: {
    color: '#0284c7',
    fontWeight: '700',
  },
  activeIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#0284c7',
    marginTop: 4,
  },
});
