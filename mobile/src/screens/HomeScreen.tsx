import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { usePropertyStore } from '../store/usePropertyStore';
import { PropertyCard } from '../components/PropertyCard';
import { Property } from '../types';

interface HomeScreenProps {
  onSelectProperty: (property: Property) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onSelectProperty }) => {
  const {
    properties,
    favorites,
    searchQuery,
    selectedType,
    setSearchQuery,
    setSelectedType,
    toggleFavorite,
  } = usePropertyStore();

  const propertyTypes = ['all', 'apartment', 'villa', 'house', 'plot'];

  const filteredProperties = properties.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || item.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.subtext}>Verified Builder Data & AI Matches</Text>
          <Text style={styles.title}>HireBuyer Real Estate</Text>
        </View>
        <TouchableOpacity style={styles.avatar}>
          <Text style={styles.avatarText}>HB</Text>
        </TouchableOpacity>
      </View>

      {/* Search Input */}
      <View style={styles.searchBar}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by city, area, or project name..."
          placeholderTextColor="#94a3b8"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Text style={styles.clearIcon}>✖</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Filter Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.chipScroll}
        contentContainerStyle={styles.chipContainer}
      >
        {propertyTypes.map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.chip,
              selectedType === type && styles.chipActive,
            ]}
            onPress={() => setSelectedType(type)}
          >
            <Text
              style={[
                styles.chipText,
                selectedType === type && styles.chipTextActive,
              ]}
            >
              {type.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Main List */}
      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        <View style={styles.sectionTitleRow}>
          <Text style={styles.sectionTitle}>Top Property Matches</Text>
          <Text style={styles.resultCount}>{filteredProperties.length} Properties</Text>
        </View>

        {filteredProperties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            isFavorite={favorites.includes(property.id)}
            onPress={() => onSelectProperty(property)}
            onFavoritePress={() => toggleFavorite(property.id)}
          />
        ))}

        {filteredProperties.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🏢</Text>
            <Text style={styles.emptyTitle}>No Properties Found</Text>
            <Text style={styles.emptySub}>Try adjusting your search or filter options.</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  subtext: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0284c7',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0f172a',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0f172a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 14,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 16,
    height: 48,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#0f172a',
  },
  clearIcon: {
    fontSize: 12,
    color: '#94a3b8',
    padding: 4,
  },
  chipScroll: {
    maxHeight: 46,
    marginBottom: 8,
  },
  chipContainer: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  chip: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  chipActive: {
    backgroundColor: '#0284c7',
    borderColor: '#0284c7',
  },
  chipText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748b',
  },
  chipTextActive: {
    color: '#ffffff',
  },
  list: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0f172a',
  },
  resultCount: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
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
