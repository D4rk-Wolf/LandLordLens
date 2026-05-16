import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Image } from 'react-native';
import PageHeader from '../../components/ui/PageHeader';
import { useAuth } from '../../contexts/AuthContext';
import { apiClient } from '../../utils/api-client';

interface Service {
    id: string;
    category: string;
    name: string;
    description: string;
    ctaText: string;
    icon: string;
    affiliateUrl: string;
    contextTags: string[];
}

const ServicesMarketplaceScreen: React.FC = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            // Use apiClient or fetch directly if apiClient doesn't support this yet
            const response = await fetch('/api/services/catalog', {
            });
            if (response.ok) {
                const data = await response.json();
                setServices(data);
            }
        } catch (error) {
            console.error('Failed to fetch services:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleServiceClick = async (service: Service) => {
        try {
            // Track the click
            await fetch(`/api/services/click/${service.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ context: { source: 'marketplace' } })
            });

            // Open the URL
            window.open(service.affiliateUrl, '_blank');
        } catch (error) {
            console.error('Error tracking click:', error);
            // Fallback to just opening the URL
            window.open(service.affiliateUrl, '_blank');
        }
    };

    const renderServiceCard = (service: Service) => (
        <View key={service.id} style={styles.card}>
            <View style={styles.cardHeader}>
                <Text style={styles.icon}>{service.icon}</Text>
                <View style={styles.headerText}>
                    <Text style={styles.serviceName}>{service.name}</Text>
                    <span className="badge badge-secondary" style={{ alignSelf: 'flex-start', fontSize: '0.75rem' }}>
                        {service.category.toUpperCase()}
                    </span>
                </View>
            </View>
            <Text style={styles.description}>{service.description}</Text>
            <TouchableOpacity
                style={styles.ctaButton}
                onPress={() => handleServiceClick(service)}
            >
                <Text style={styles.ctaText}>{service.ctaText} →</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <PageHeader
                title="Service Marketplace"
                breadcrumbs={[
                    { label: 'Dashboard', onPress: () => { } }, // Navigation handled by parent usually
                    { label: 'Services', onPress: undefined }
                ]}
            />
            <ScrollView style={styles.content}>
                <View style={styles.intro}>
                    <Text style={styles.introTitle}>Partner Services</Text>
                    <Text style={styles.introText}>
                        Trusted partners to help you manage your property portfolio efficiently.
                        From insurance to legal support, find what you need here.
                    </Text>
                </View>

                {loading ? (
                    <Text>Loading services...</Text>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8">
                        {services.map(renderServiceCard)}
                    </div>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9fafb',
    },
    content: {
        padding: 24,
    },
    intro: {
        marginBottom: 24,
    },
    introTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 8,
    },
    introText: {
        fontSize: 16,
        color: '#6b7280',
        maxWidth: 600,
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 20,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 1 },
        // shadowOpacity: 0.05,
        // shadowRadius: 2,
        // elevation: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    } as any, // Cast to any to avoid strict React Native style type issues in web context if needed
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    icon: {
        fontSize: 32,
        marginRight: 16,
    },
    headerText: {
        flex: 1,
    },
    serviceName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 4,
    },
    description: {
        fontSize: 14,
        color: '#4b5563',
        lineHeight: 20,
        marginBottom: 20,
        flex: 1,
    },
    ctaButton: {
        backgroundColor: '#f3f4f6',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#d1d5db',
    },
    ctaText: {
        color: '#374151',
        fontWeight: '600',
        fontSize: 14,
    },
});

export default ServicesMarketplaceScreen;
