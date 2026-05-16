import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { apiClient } from '../../utils/api-client';
import PageHeader from '../../components/ui/PageHeader';
// import { MaterialCommunityIcons } from '@expo/vector-icons'; // Icon fallback used in code

interface ComplianceSummary {
  totalProperties: number;
  highRisk: number;
  mediumRisk: number;
  compliant: number;
  breakdown: {
    gasSafety: { expired: number; expiringSoon: number; valid: number };
    eicr: { expired: number; expiringSoon: number; valid: number };
    epc: { belowC: number; expired: number; valid: number };
    deposit: { unprotected: number; valid: number };
    license: { expired: number; valid: number };
  };
}

const ComplianceScreen: React.FC = () => {
  const navigate = useNavigate();
  const [summary, setSummary] = useState<ComplianceSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const data = await apiClient.get<ComplianceSummary>('/compliance/summary');
        setSummary(data);
      } catch (error) {
        console.error('Failed to fetch summary', error);
      } finally {
        setLoading(false);
      }
    };

    {
      fetchSummary();
    }
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6366f1" />
        <Text style={{ marginTop: 10, color: '#666' }}>Loading compliance dashboard...</Text>
      </View>
    );
  }

  const renderStatusCard = (title: string, stats: any, icon: any, color: string) => (
    <div className="saas-card hover-lift" style={{ padding: '20px', flex: '1 1 300px', cursor: 'pointer' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{ width: 40, height: 40, borderRadius: '10px', background: `${color}20`, display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '12px' }}>
          {/* Using text emoji fallback if icon fails or for consistency with existing UI */}
          <span style={{ fontSize: '20px', color: color }}>{
            icon === 'fire' ? '🔥' :
              icon === 'flash' ? '⚡' :
                icon === 'home-lightning-bolt-outline' ? '🏠' :
                  icon === 'shield-check' ? '🛡️' : '📜'
          }</span>
        </div>
        <h3 style={{ fontSize: '16px', fontWeight: '600', margin: 0 }}>{title}</h3>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
        <div style={{ textAlign: 'center', flex: 1 }}>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#ef4444' }}>{stats?.expired || 0}</div>
          <div style={{ fontSize: '12px', color: '#6b7280' }}>Expired</div>
        </div>
        <div style={{ textAlign: 'center', flex: 1 }}>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#f59e0b' }}>
            {stats?.expiringSoon || stats?.belowC || stats?.unprotected || 0}
          </div>
          <div style={{ fontSize: '12px', color: '#6b7280' }}>
            {stats?.belowC ? 'Below C' : (stats?.unprotected ? 'Unprotected' : 'Warning')}
          </div>
        </div>
        <div style={{ textAlign: 'center', flex: 1 }}>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#10b981' }}>{stats?.valid || 0}</div>
          <div style={{ fontSize: '12px', color: '#6b7280' }}>Valid</div>
        </div>
      </div>

      <button className="btn btn-outline" style={{ width: '100%', marginTop: '16px', fontSize: '14px', padding: '8px' }}>
        View Details
      </button>
    </div>
  );

  return (
    <div className="saas-content-scroll">
      <PageHeader
        title="Compliance Dashboard"
        rightAction={
          <button onClick={() => navigate('/properties')} className="btn btn-primary">
            + Update Property
          </button>
        }
      />

      <div className="saas-layout-content" style={{ padding: '0 20px 40px 20px' }}>

        {/* Risk Summary Banner */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', flexWrap: 'wrap' }}>
          <div className="saas-card" style={{ flex: 1, padding: '20px', backgroundColor: '#fef2f2', border: '1px solid #fee2e2', textAlign: 'center' }}>
            <div style={{ fontSize: '32px', fontWeight: '800', color: '#dc2626' }}>{summary?.highRisk || 0}</div>
            <div style={{ fontSize: '14px', fontWeight: '600', color: '#991b1b' }}>High Risk Actions</div>
          </div>
          <div className="saas-card" style={{ flex: 1, padding: '20px', backgroundColor: '#fffbeb', border: '1px solid #fef3c7', textAlign: 'center' }}>
            <div style={{ fontSize: '32px', fontWeight: '800', color: '#d97706' }}>{summary?.mediumRisk || 0}</div>
            <div style={{ fontSize: '14px', fontWeight: '600', color: '#92400e' }}>Medium Risk</div>
          </div>
          <div className="saas-card" style={{ flex: 1, padding: '20px', backgroundColor: '#ecfdf5', border: '1px solid #d1fae5', textAlign: 'center' }}>
            <div style={{ fontSize: '32px', fontWeight: '800', color: '#059669' }}>{summary?.compliant || 0}</div>
            <div style={{ fontSize: '14px', fontWeight: '600', color: '#065f46' }}>Fully Compliant</div>
          </div>
        </div>

        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#111827' }}>Compliance Areas</h3>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {renderStatusCard('Gas Safety', summary?.breakdown?.gasSafety, 'fire', '#f97316')}
          {renderStatusCard('EICR (Electric)', summary?.breakdown?.eicr, 'flash', '#eab308')}
          {renderStatusCard('EPC Rating', summary?.breakdown?.epc, 'home-lightning-bolt-outline', '#10b981')}
          {renderStatusCard('Deposit Protection', summary?.breakdown?.deposit, 'shield-check', '#3b82f6')}
          {renderStatusCard('Licensing', summary?.breakdown?.license, 'certificate', '#8b5cf6')}
        </div>

        {/* Lead Gen / Monetization Block */}
        <div style={{ marginTop: '40px', padding: '24px', backgroundColor: '#eff6ff', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ fontSize: '40px' }}>👷</div>
            <div>
              <h3 style={{ margin: 0, fontSize: '18px', color: '#1e40af' }}>Need a Compliance Check?</h3>
              <p style={{ margin: '4px 0 0 0', color: '#1e3a8a' }}>Book a Gas Safe engineer or EPC assessor directly through us.</p>
            </div>
          </div>
          <button className="btn btn-primary" style={{ padding: '12px 24px' }}>
            Book an Engineer
          </button>
        </div>

      </div>
    </div>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 400,
  },
});

export default ComplianceScreen;
