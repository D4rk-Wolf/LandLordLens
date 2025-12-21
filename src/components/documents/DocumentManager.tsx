import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export interface Document {
    _id: string;
    name: string;
    type: string;
    category: string;
    size: number;
    uploadDate: string;
    url?: string;
}

interface DocumentManagerProps {
    documents: Document[];
    onUpload?: (files: File[]) => void;
    onDelete?: (id: string) => void;
    onDownload?: (doc: Document) => void;
    categories?: string[];
}

const DocumentManager: React.FC<DocumentManagerProps> = ({
    documents,
    onUpload,
    onDelete,
    onDownload,
    categories = ['Lease', 'Inspection', 'Compliance', 'Photos', 'Other'],
}) => {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [dragActive, setDragActive] = useState(false);

    const filteredDocs = selectedCategory === 'All'
        ? documents
        : documents.filter(d => d.category === selectedCategory);

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const files = Array.from(e.dataTransfer.files);
            onUpload?.(files);
        }
    }, [onUpload]);

    const formatFileSize = (bytes: number): string => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    };

    const getFileIcon = (type: string): string => {
        if (type.includes('pdf')) return '📄';
        if (type.includes('image')) return '🖼️';
        if (type.includes('word') || type.includes('doc')) return '📝';
        if (type.includes('excel') || type.includes('sheet')) return '📊';
        return '📎';
    };

    return (
        <View style={styles.container}>
            {/* Category Filter */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>
                {['All', ...categories].map(cat => (
                    <TouchableOpacity
                        key={cat}
                        style={[styles.categoryChip, selectedCategory === cat && styles.categoryChipActive]}
                        onPress={() => setSelectedCategory(cat)}
                    >
                        <Text style={[styles.categoryText, selectedCategory === cat && styles.categoryTextActive]}>
                            {cat}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Upload Area */}
            <View
                style={[styles.uploadArea, dragActive && styles.uploadAreaActive]}
                //@ts-ignore
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <Text style={styles.uploadIcon}>📤</Text>
                <Text style={styles.uploadText}>Drag & drop files here</Text>
                <Text style={styles.uploadSubtext}>or click to browse</Text>
            </View>

            {/* Documents List */}
            <ScrollView style={styles.documentsList}>
                {filteredDocs.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyIcon}>📁</Text>
                        <Text style={styles.emptyText}>No documents in this category</Text>
                    </View>
                ) : (
                    filteredDocs.map(doc => (
                        <View key={doc._id} style={styles.documentCard}>
                            <Text style={styles.fileIcon}>{getFileIcon(doc.type)}</Text>
                            <View style={styles.documentInfo}>
                                <Text style={styles.documentName} numberOfLines={1}>{doc.name}</Text>
                                <Text style={styles.documentMeta}>
                                    {formatFileSize(doc.size)} • {new Date(doc.uploadDate).toLocaleDateString()}
                                </Text>
                            </View>
                            <View style={styles.documentActions}>
                                {onDownload && (
                                    <TouchableOpacity onPress={() => onDownload(doc)} style={styles.actionButton}>
                                        <Text style={styles.actionIcon}>⬇</Text>
                                    </TouchableOpacity>
                                )}
                                {onDelete && (
                                    <TouchableOpacity onPress={() => onDelete(doc._id)} style={styles.actionButton}>
                                        <Text style={styles.actionIcon}>🗑</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                    ))
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    categories: {
        marginBottom: 16,
    },
    categoryChip: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: 'var(--gray-100)',
        borderRadius: 20,
        marginRight: 8,
    },
    categoryChipActive: {
        backgroundColor: 'var(--primary)',
    },
    categoryText: {
        fontSize: 14,
        fontWeight: '600',
        color: 'var(--text-secondary)',
    },
    categoryTextActive: {
        color: '#fff',
    },
    uploadArea: {
        padding: 40,
        backgroundColor: 'var(--gray-50)',
        borderRadius: 16,
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: 'var(--gray-300)',
        alignItems: 'center',
        marginBottom: 24,
    },
    uploadAreaActive: {
        borderColor: 'var(--primary)',
        backgroundColor: 'rgba(99, 102, 241, 0.05)',
    },
    uploadIcon: {
        fontSize: 48,
        marginBottom: 12,
    },
    uploadText: {
        fontSize: 16,
        fontWeight: '600',
        color: 'var(--text-primary)',
        marginBottom: 4,
    },
    uploadSubtext: {
        fontSize: 14,
        color: 'var(--text-secondary)',
    },
    documentsList: {
        flex: 1,
    },
    documentCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: 'var(--gray-200)',
    },
    fileIcon: {
        fontSize: 32,
        marginRight: 16,
    },
    documentInfo: {
        flex: 1,
    },
    documentName: {
        fontSize: 15,
        fontWeight: '600',
        color: 'var(--text-primary)',
        marginBottom: 4,
    },
    documentMeta: {
        fontSize: 13,
        color: 'var(--text-secondary)',
    },
    documentActions: {
        flexDirection: 'row',
        gap: 8,
    },
    actionButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'var(--gray-100)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionIcon: {
        fontSize: 16,
    },
    emptyState: {
        alignItems: 'center',
        paddingVertical: 60,
    },
    emptyIcon: {
        fontSize: 64,
        marginBottom: 16,
    },
    emptyText: {
        fontSize: 16,
        color: 'var(--text-secondary)',
    },
});

export default DocumentManager;
