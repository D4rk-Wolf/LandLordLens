import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { logger } from '../../utils/logger';
import { apiClient } from '../../utils/api-client';
import PageHeader from '../../components/ui/PageHeader';

interface ComplianceRecord {
  _id: string;
  propertyId: string;
  complianceType: string;
  expiryDate: string;
  status: string;
  notes?: string;
  propertyAddress?: {
    line1: string;
    city: string;
  };
  certificateNumber?: string;
  issuer?: string;
}

interface ComplianceScreenProps {
  onNavigate: (screen: string) => void;
}

const ComplianceScreen: React.FC<ComplianceScreenProps> = ({ onNavigate }) => {
  const { token } = useAuth();
  const [records, setRecords] = useState<ComplianceRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchComplianceRecords = useCallback(async () => {
    if (!token) return;

    try {
      const propertiesData = await apiClient.get<{ properties: any[] }>(
        '/properties',
        token || undefined,
        { cache: true, cacheTTL: 2 * 60 * 1000 }
      );
      const properties = propertiesData.properties || [];

      if (properties.length === 0) {
        setRecords([]);
        setLoading(false);
        return;
      }

      // Fetch compliance records for all properties in parallel
      const propertyDetailRequests = properties.map((property) =>
        () => apiClient.get<any>(`/properties/${property._id}`, token || undefined, {
          cache: true,
          cacheTTL: 2 * 60 * 1000,
        }).then((propertyDetail) => {
          const complianceRecords = propertyDetail.complianceRecords || [];
          return complianceRecords.map((r: any) => ({
            ...r,
            propertyAddress: property.address,
            certificateNumber: r.certificateNumber,
            issuer: r.issuer,
          }));
        }).catch((error) => {
          logger.debug(`Failed to fetch compliance for property ${property._id}: ${error}`);
          return [];
        })
      );

      const allRecordsArrays = await apiClient.parallel(propertyDetailRequests);
      const allRecords = allRecordsArrays.flat();

      setRecords(allRecords);
    } catch (error) {
      logger.error('Error fetching compliance records', error);
      Alert.alert('Error', 'Failed to load compliance records');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchComplianceRecords();
  }, [fetchComplianceRecords]);

  const getDaysUntilExpiry = (expiryDate: string): number => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusConfig = (expiryDate: string) => {
    const daysUntil = getDaysUntilExpiry(expiryDate);
    if (daysUntil < 0) {
      return { color: '#dc2626', bgColor: '#fee2e2', label: 'Expired', icon: '🔴' };
    }
    if (daysUntil < 30) {
      return { color: '#d97706', bgColor: '#fef3c7', label: `Expires in ${daysUntil} days`, icon: '🟠' };
    }
    return { color: '#059669', bgColor: '#d1fae5', label: 'Valid', icon: '🟢' };
  };

  const complianceTypes = [
    'Gas Safety Certificate',
    'Electrical Safety Certificate',
    'EPC Certificate',
    'HMO License',
    'Fire Safety Assessment',
    'Legionella Risk Assessment',
  ];

  return (
    <div className="saas-content-scroll">
      <PageHeader
        title="Compliance"
        rightAction={
          <button
            onClick={() => onNavigate('properties')}
            className="btn btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <span>➕</span>
            Add Record
          </button>
        }
      />
      <div className="saas-layout-content">
        <div className="saas-subtitle-container" style={{ marginBottom: 24, padding: '16px', background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
            Monitor and manage compliance documents for your properties
          </div>
        </div>

        {loading ? (
          <div className="saas-loading-container" style={{ height: 300, background: 'transparent' }}>
            <ActivityIndicator size="large" color="#6366f1" />
            <div style={{ marginTop: 12, color: 'var(--text-muted)' }}>Loading compliance records...</div>
          </div>
        ) : records.length === 0 ? (
          <div style={{ padding: '0 20px' }}>
            <div className="saas-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '48px', marginBottom: '24px', textAlign: 'center' }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--primary-100)', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '24px', fontSize: '32px' }}>
                📋
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '12px' }}>No Compliance Records</h3>
              <p style={{ color: 'var(--text-muted)', maxWidth: '400px', marginBottom: '24px', lineHeight: '1.5' }}>
                Track important compliance documents like gas safety certificates, EPCs, and HMO licenses.
              </p>
              <button
                className="btn btn-primary"
                onClick={() => onNavigate('properties')}
                style={{ padding: '12px 24px', fontSize: '15px' }}
              >
                Add Compliance Record
              </button>
            </div>

            <div className="saas-card" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '16px' }}>Common Compliance Requirements</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '16px' }}>
                {complianceTypes.map((type, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 0' }}>
                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--success-bg)', color: 'var(--success-text)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '12px', fontWeight: 'bold' }}>
                      ✓
                    </div>
                    <span style={{ color: 'var(--text-body)', fontWeight: '500' }}>{type}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div style={{ padding: '0 20px', display: 'grid', gap: '16px', paddingBottom: '32px' }}>
            {records.map((record) => {
              const statusConfig = getStatusConfig(record.expiryDate);
              return (
                <div
                  key={record._id}
                  className="saas-card hover-lift"
                  onClick={() => {
                    if (record.propertyId) {
                      onNavigate(`property-detail`); // Note: In a real app this would probably need ID
                    }
                  }}
                  style={{ cursor: 'pointer', padding: '20px', transition: 'all 0.2s ease' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', gap: '16px' }}>
                      <div style={{ width: 48, height: 48, borderRadius: '12px', background: 'var(--primary-50)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '24px' }}>
                        📄
                      </div>
                      <div>
                        <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-main)', marginBottom: '4px' }}>
                          {record.complianceType.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                        </h3>
                        {record.propertyAddress && (
                          <div style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                            {record.propertyAddress.line1}, {record.propertyAddress.city}
                          </div>
                        )}
                        <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                          Expires: {new Date(record.expiryDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <span className="badge" style={{ backgroundColor: statusConfig.bgColor, color: statusConfig.color, display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span>{statusConfig.icon}</span> {statusConfig.label}
                    </span>
                  </div>

                  {(record.certificateNumber || record.notes) && (
                    <div style={{ paddingTop: '16px', borderTop: '1px solid var(--border-subtle)', display: 'grid', gap: '12px', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                      {record.certificateNumber && (
                        <div>
                          <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Certificate</span>
                          <span style={{ fontSize: '14px', color: 'var(--text-main)', fontFamily: 'monospace' }}>{record.certificateNumber}</span>
                        </div>
                      )}
                      {record.notes && (
                        <div>
                          <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Notes</span>
                          <span style={{ fontSize: '14px', color: 'var(--text-body)', fontStyle: 'italic' }}>{record.notes}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )
        }
      </div>
    </div>
  );
};

// No StyleSheet needed as we use global CSS and inline styles for minor tweaks
const styles = {};

export default ComplianceScreen;
