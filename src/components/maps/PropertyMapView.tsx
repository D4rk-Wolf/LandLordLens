import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

interface Property {
    id: string;
    address: string;
    lat: number;
    lng: number;
    status: 'occupied' | 'vacant' | 'maintenance';
}

interface PropertyMapViewProps {
    properties?: Property[];
}

const PropertyMapView: React.FC<PropertyMapViewProps> = ({ properties = [] }) => {
    const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

    // Mock properties if none provided
    const mockProperties: Property[] = properties.length > 0 ? properties : [
        { id: '1', address: '123 Main St, London', lat: 51.5074, lng: -0.1278, status: 'occupied' },
        { id: '2', address: '456 Oak Ave, Manchester', lat: 53.4808, lng: -2.2426, status: 'vacant' },
        { id: '3', address: '789 Pine Rd, Birmingham', lat: 52.4862, lng: -1.8904, status: 'maintenance' },
    ];

    const getStatusColor = (status: Property['status']) => {
        switch (status) {
            case 'occupied': return 'var(--success)';
            case 'vacant': return 'var(--warning)';
            case 'maintenance': return 'var(--danger)';
            default: return 'var(--gray-400)';
        }
    };

    const getStatusIcon = (status: Property['status']) => {
        switch (status) {
            case 'occupied': return '✓';
            case 'vacant': return '○';
            case 'maintenance': return '⚠';
            default: return '•';
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Property Map</Text>
                <Text style={styles.subtitle}>Interactive view of your portfolio locations</Text>
            </View>

            <View style={styles.mapContainer}>
                {/* Decorative Map Background */}
                <View style={styles.mapBackground}>
                    <View style={styles.mapGrid}>
                        {Array.from({ length: 8 }).map((_, i) => (
                            <View key={`h-${i}`} style={styles.gridLineHorizontal} />
                        ))}
                        {Array.from({ length: 8 }).map((_, i) => (
                            <View key={`v-${i}`} style={styles.gridLineVertical} />
                        ))}
                    </View>

                    {/* Property Markers */}
                    {mockProperties.map((property, index) => (
                        <TouchableOpacity
                            key={property.id}
                            style={[
                                styles.marker,
                                {
                                    left: `${20 + index * 25}%`,
                                    top: `${30 + (index % 2) * 20}%`,
                                    backgroundColor: getStatusColor(property.status),
                                },
                                selectedProperty?.id === property.id && styles.markerSelected,
                            ]}
                            onPress={() => setSelectedProperty(property)}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.markerIcon}>{getStatusIcon(property.status)}</Text>
                        </TouchableOpacity>
                    ))}

                    {/* Map Overlay Text */}
                    <View style={styles.mapOverlay}>
                        <Text style={styles.mapOverlayText}>🗺️ Interactive Map View</Text>
                    </View>
                </View>

                {/* Property Details Panel */}
                {selectedProperty && (
                    <View style={styles.detailsPanel}>
                        <View style={styles.detailsHeader}>
                            <Text style={styles.detailsTitle}>Property Details</Text>
                            <TouchableOpacity
                                onPress={() => setSelectedProperty(null)}
                                style={styles.closeButton}
                            >
                                <Text style={styles.closeButtonText}>✕</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.detailsContent}>
                            <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(selectedProperty.status)}15` }]}>
                                <Text style={[styles.statusText, { color: getStatusColor(selectedProperty.status) }]}>
                                    {selectedProperty.status.toUpperCase()}
                                </Text>
                            </View>
                            <Text style={styles.propertyAddress}>{selectedProperty.address}</Text>
                            <View style={styles.coordinates}>
                                <Text style={styles.coordinateLabel}>Coordinates:</Text>
                                <Text style={styles.coordinateValue}>
                                    {selectedProperty.lat.toFixed(4)}, {selectedProperty.lng.toFixed(4)}
                                </Text>
                            </View>
                        </View>
                    </View>
                )}
            </View>

            {/* Legend */}
            <View style={styles.legend}>
                <Text style={styles.legendTitle}>Legend</Text>
                <View style={styles.legendItems}>
                    <View style={styles.legendItem}>
                        <View style={[styles.legendDot, { backgroundColor: 'var(--success)' }]} />
                        <Text style={styles.legendText}>Occupied</Text>
                    </View>
                    <View style={styles.legendItem}>
                        <View style={[styles.legendDot, { backgroundColor: 'var(--warning)' }]} />
                        <Text style={styles.legendText}>Vacant</Text>
                    </View>
                    <View style={styles.legendItem}>
                        <View style={[styles.legendDot, { backgroundColor: 'var(--danger)' }]} />
                        <Text style={styles.legendText}>Maintenance</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    header: {
        marginBottom: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: '800',
        color: 'var(--text-primary)',
        letterSpacing: -0.5,
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 15,
        color: 'var(--text-secondary)',
        fontWeight: '400',
    },
    mapContainer: {
        position: 'relative',
        height: 500,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        //@ts-ignore
        backdropFilter: 'blur(16px)',
        borderRadius: 24,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.5)',
        overflow: 'hidden',
        marginBottom: 24,
    },
    mapBackground: {
        flex: 1,
        backgroundColor: '#f8fafc',
        position: 'relative',
    },
    mapGrid: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    gridLineHorizontal: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
    },
    gridLineVertical: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
    },
    marker: {
        position: 'absolute',
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#fff',
        //@ts-ignore
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        //@ts-ignore
        transition: 'all 0.3s ease',
    },
    markerSelected: {
        transform: [{ scale: 1.2 }],
        //@ts-ignore
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
        zIndex: 10,
    },
    markerIcon: {
        fontSize: 20,
        color: '#fff',
        fontWeight: '700',
    },
    mapOverlay: {
        position: 'absolute',
        top: 20,
        left: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 12,
    },
    mapOverlayText: {
        fontSize: 14,
        fontWeight: '600',
        color: 'var(--text-primary)',
    },
    detailsPanel: {
        position: 'absolute',
        right: 20,
        top: 20,
        width: 280,
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        //@ts-ignore
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
    },
    detailsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    detailsTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: 'var(--text-primary)',
    },
    closeButton: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButtonText: {
        fontSize: 14,
        color: 'var(--text-secondary)',
        fontWeight: '600',
    },
    detailsContent: {
        gap: 12,
    },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
    statusText: {
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    propertyAddress: {
        fontSize: 15,
        fontWeight: '600',
        color: 'var(--text-primary)',
        lineHeight: 22,
    },
    coordinates: {
        gap: 4,
    },
    coordinateLabel: {
        fontSize: 12,
        color: 'var(--text-secondary)',
        fontWeight: '500',
    },
    coordinateValue: {
        fontSize: 13,
        color: 'var(--text-primary)',
        fontWeight: '600',
        fontFamily: 'monospace',
    },
    legend: {
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        //@ts-ignore
        backdropFilter: 'blur(16px)',
        borderRadius: 16,
        padding: 20,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.5)',
    },
    legendTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: 'var(--text-primary)',
        marginBottom: 12,
    },
    legendItems: {
        flexDirection: 'row',
        gap: 24,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    legendDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
    },
    legendText: {
        fontSize: 14,
        color: 'var(--text-secondary)',
        fontWeight: '500',
    },
});

export default PropertyMapView;
