import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { usePropertyStore } from '../store/usePropertyStore';
import { Property } from '../types';

interface MapScreenProps {
  onSelectProperty: (property: Property) => void;
}

export const MapScreen: React.FC<MapScreenProps> = ({ onSelectProperty }) => {
  const { properties } = usePropertyStore();

  return (
    <View style={styles.container}>
      {/* Map Canvas Placeholder */}
      <View style={styles.mapCanvas}>
        <View style={styles.mapGridPattern}>
          <Text style={styles.mapWatermark}>📍 Hyderabad Geospatial Grid</Text>

          {/* Simulated Property Pins */}
          {properties.map((prop, idx) => (
            <TouchableOpacity
              key={prop.id}
              style={[
                styles.pin,
                { top: `${30 + idx * 20}%`, left: `${25 + idx * 22}%` },
              ]}
              onPress={() => onSelectProperty(prop)}
            >
              <Text style={styles.pinText}>₹{(prop.price / 100000).toFixed(0)}L</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Map Control Floating Card */}
        <View style={styles.floatingControls}>
          <TouchableOpacity style={styles.controlBtn}>
            <Text style={styles.controlText}>🗺️ Heatmap: ON</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlBtn}>
            <Text style={styles.controlText}>🚇 Transit Radius</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Horizontal Property Carousel */}
      <View style={styles.carouselContainer}>
        <Text style={styles.carouselHeader}>Interactive Nearby Properties ({properties.length})</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.carouselContent}>
          {properties.map((property) => (
            <TouchableOpacity
              key={property.id}
              style={styles.carouselCard}
              onPress={() => onSelectProperty(property)}
              activeOpacity={0.85}
            >
              <View style={styles.carouselHeaderRow}>
                <Text style={styles.carouselPrice}>₹{(property.price / 100000).toFixed(0)} Lakh</Text>
                <Text style={styles.carouselMatch}>{property.matchScore}%</Text>
              </View>
              <Text style={styles.carouselTitle} numberOfLines={1}>
                {property.title}
              </Text>
              <Text style={styles.carouselSub} numberOfLines={1}>
                📍 {property.locationTag} • {property.bedrooms} BHK
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  mapCanvas: {
    flex: 1,
    backgroundColor: '#1e293b',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapGridPattern: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  mapWatermark: {
    color: '#475569',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
  },
  pin: {
    position: 'absolute',
    backgroundColor: '#0284c7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#ffffff',
    elevation: 4,
  },
  pinText: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 12,
  },
  floatingControls: {
    position: 'absolute',
    top: 20,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  controlBtn: {
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  controlText: {
    color: '#f8fafc',
    fontSize: 12,
    fontWeight: '600',
  },
  carouselContainer: {
    backgroundColor: '#0f172a',
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: '#1e293b',
  },
  carouselHeader: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  carouselContent: {
    paddingHorizontal: 16,
  },
  carouselCard: {
    backgroundColor: '#1e293b',
    width: 210,
    borderRadius: 16,
    padding: 14,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  carouselHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  carouselPrice: {
    color: '#38bdf8',
    fontWeight: '800',
    fontSize: 16,
  },
  carouselMatch: {
    color: '#34d399',
    fontWeight: '700',
    fontSize: 11,
  },
  carouselTitle: {
    color: '#f8fafc',
    fontWeight: '700',
    fontSize: 14,
    marginBottom: 2,
  },
  carouselSub: {
    color: '#94a3b8',
    fontSize: 12,
  },
});
