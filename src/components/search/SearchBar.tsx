import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';
import { useSearch } from '../../contexts/SearchContext';
import { debounce } from '../../utils/search';

interface SearchBarProps {
    placeholder?: string;
    onResultSelect?: (result: any) => void;
    searchData?: any[];
    searchFields?: string[];
}

const SearchBar: React.FC<SearchBarProps> = ({
    placeholder = 'Search properties, tenants, maintenance...',
    onResultSelect,
    searchData = [],
    searchFields = [],
}) => {
    const { query, setQuery, results, isSearching, search, clearResults } = useSearch();
    const [localQuery, setLocalQuery] = useState('');
    const [showResults, setShowResults] = useState(false);

    // Debounced search
    useEffect(() => {
        const debouncedSearch = debounce((q: string) => {
            if (q.trim()) {
                search(q, searchData, searchFields);
                setShowResults(true);
            } else {
                clearResults();
                setShowResults(false);
            }
        }, 300);

        debouncedSearch(localQuery);
    }, [localQuery, searchData, searchFields]);

    const handleResultClick = (result: any) => {
        setShowResults(false);
        setLocalQuery('');
        clearResults();
        onResultSelect?.(result.item);
    };

    const handleClear = () => {
        setLocalQuery('');
        clearResults();
        setShowResults(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchInputContainer}>
                <Text style={styles.searchIcon}>🔍</Text>
                <TextInput
                    style={styles.searchInput}
                    placeholder={placeholder}
                    value={localQuery}
                    onChangeText={setLocalQuery}
                    onFocus={() => localQuery && setShowResults(true)}
                    placeholderTextColor="var(--text-tertiary)"
                />
                {localQuery && (
                    <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
                        <Text style={styles.clearIcon}>✕</Text>
                    </TouchableOpacity>
                )}
            </View>

            {showResults && results.length > 0 && (
                <View style={styles.resultsContainer}>
                    <ScrollView style={styles.resultsList} nestedScrollEnabled>
                        {results.slice(0, 10).map((result, index) => (
                            <TouchableOpacity
                                key={result.item._id || index}
                                style={styles.resultItem}
                                onPress={() => handleResultClick(result)}
                                activeOpacity={0.7}
                            >
                                <View style={styles.resultContent}>
                                    <Text style={styles.resultTitle} numberOfLines={1}>
                                        {result.item.address || result.item.name || result.item.title || 'Unknown'}
                                    </Text>
                                    <Text style={styles.resultSubtitle} numberOfLines={1}>
                                        {result.matchedFields.join(', ')} • Score: {result.score}
                                    </Text>
                                </View>
                                <Text style={styles.resultArrow}>→</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    {results.length > 10 && (
                        <View style={styles.moreResults}>
                            <Text style={styles.moreResultsText}>
                                +{results.length - 10} more results
                            </Text>
                        </View>
                    )}
                </View>
            )}

            {showResults && localQuery && results.length === 0 && !isSearching && (
                <View style={styles.noResults}>
                    <Text style={styles.noResultsText}>No results found</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        zIndex: 100,
    },
    searchInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: 'var(--gray-200)',
        //@ts-ignore
        backdropFilter: 'blur(8px)',
    },
    searchIcon: {
        fontSize: 18,
        marginRight: 12,
    },
    searchInput: {
        flex: 1,
        fontSize: 15,
        fontWeight: '500',
        color: 'var(--text-primary)',
        outlineStyle: 'none',
    } as any,
    clearButton: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },
    clearIcon: {
        fontSize: 12,
        color: 'var(--text-secondary)',
    },
    resultsContainer: {
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        marginTop: 8,
        backgroundColor: '#fff',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'var(--gray-200)',
        //@ts-ignore
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
        maxHeight: 400,
        overflow: 'hidden',
    },
    resultsList: {
        maxHeight: 360,
    },
    resultItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'var(--gray-100)',
        //@ts-ignore
        transition: 'background-color 0.2s ease',
    },
    resultContent: {
        flex: 1,
    },
    resultTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: 'var(--text-primary)',
        marginBottom: 4,
    },
    resultSubtitle: {
        fontSize: 13,
        color: 'var(--text-secondary)',
    },
    resultArrow: {
        fontSize: 18,
        color: 'var(--primary)',
        marginLeft: 12,
    },
    moreResults: {
        padding: 12,
        backgroundColor: 'var(--gray-50)',
        borderTopWidth: 1,
        borderTopColor: 'var(--gray-200)',
    },
    moreResultsText: {
        fontSize: 13,
        color: 'var(--text-secondary)',
        textAlign: 'center',
        fontWeight: '500',
    },
    noResults: {
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        marginTop: 8,
        backgroundColor: '#fff',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'var(--gray-200)',
        padding: 24,
        //@ts-ignore
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
    },
    noResultsText: {
        fontSize: 14,
        color: 'var(--text-secondary)',
        textAlign: 'center',
    },
});

export default SearchBar;
