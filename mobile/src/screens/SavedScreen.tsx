import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { usePropertyStore } from '../store/usePropertyStore';
import { PropertyCard } from '../components/PropertyCard';
import { Property } from '../types';

interface SavedScreenProps {
  onSelectProperty: (property: Property) => void;
}

export const SavedScreen: React.FC<SavedScreenProps> = ({ onSelectProperty }) => {
  const { properties, favorites, toggleFavorite } = usePropertyStore();

  const savedProperties = properties.filter((item) => favorites.includes(item.id));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Shortlisted Properties</Text>
        <Text style={styles.subtext}>
          {savedProperties.length} {savedProperties.length === 1 ? 'Property' : 'Properties'} Saved
        </Text>
      </View>

      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {savedProperties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            isFavorite={true}
            onPress={() => onSelectProperty(property)}
            onFavoritePress={() => toggleFavorite(property.id)}
          />
        ))}

        {savedProperties.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>❤️</Text>
            <Text style={styles.emptyTitle}>No Saved Properties</Text>
            <Text style={styles.emptySub}>
              Tap the heart icon on any property to add it to your shortlist.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0f172a',
  },
  subtext: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 2,
  },
  list: {
    flex: 1,
    paddingHorizontal: 20,
  },
  emptyState: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  emptySub: {
    fontSize: 13,
    color: '#64748b',
    textAlign: 'center',
  },
});
