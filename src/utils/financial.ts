// Financial calculation utilities

export interface Transaction {
    _id: string;
    type: 'income' | 'expense';
    amount: number;
    category: string;
    date: string;
    description?: string;
    propertyId?: string;
}

export interface FinancialSummary {
    totalIncome: number;
    totalExpenses: number;
    netProfit: number;
    profitMargin: number;
}

export interface CategoryBreakdown {
    category: string;
    amount: number;
    percentage: number;
    count: number;
}

/**
 * Calculate financial summary from transactions
 */
export const calculateFinancialSummary = (transactions: Transaction[]): FinancialSummary => {
    const totalIncome = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

    const netProfit = totalIncome - totalExpenses;
    const profitMargin = totalIncome > 0 ? (netProfit / totalIncome) * 100 : 0;

    return {
        totalIncome,
        totalExpenses,
        netProfit,
        profitMargin,
    };
};

/**
 * Group transactions by category
 */
export const getCategoryBreakdown = (
    transactions: Transaction[],
    type: 'income' | 'expense'
): CategoryBreakdown[] => {
    const filtered = transactions.filter(t => t.type === type);
    const total = filtered.reduce((sum, t) => sum + t.amount, 0);

    const categoryMap = new Map<string, { amount: number; count: number }>();

    filtered.forEach(t => {
        const existing = categoryMap.get(t.category) || { amount: 0, count: 0 };
        categoryMap.set(t.category, {
            amount: existing.amount + t.amount,
            count: existing.count + 1,
        });
    });

    return Array.from(categoryMap.entries())
        .map(([category, data]) => ({
            category,
            amount: data.amount,
            percentage: total > 0 ? (data.amount / total) * 100 : 0,
            count: data.count,
        }))
        .sort((a, b) => b.amount - a.amount);
};

/**
 * Get monthly trend data
 */
export const getMonthlyTrend = (
    transactions: Transaction[],
    months: number = 12
): Array<{ month: string; income: number; expenses: number; profit: number }> => {
    const now = new Date();
    const monthlyData: Map<string, { income: number; expenses: number }> = new Map();

    // Initialize months
    for (let i = months - 1; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        monthlyData.set(key, { income: 0, expenses: 0 });
    }

    // Aggregate transactions
    transactions.forEach(t => {
        const date = new Date(t.date);
        const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        const data = monthlyData.get(key);

        if (data) {
            if (t.type === 'income') {
                data.income += t.amount;
            } else {
                data.expenses += t.amount;
            }
        }
    });

    return Array.from(monthlyData.entries()).map(([month, data]) => ({
        month,
        income: data.income,
        expenses: data.expenses,
        profit: data.income - data.expenses,
    }));
};

/**
 * Format currency
 */
export const formatCurrency = (amount: number, currency: string = 'GBP'): string => {
    return new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency,
    }).format(amount);
};

/**
 * Export transactions to CSV
 */
export const exportToCSV = (transactions: Transaction[]): string => {
    const headers = ['Date', 'Type', 'Category', 'Amount', 'Description', 'Property ID'];
    const rows = transactions.map(t => [
        t.date,
        t.type,
        t.category,
        t.amount.toString(),
        t.description || '',
        t.propertyId || '',
    ]);

    const csv = [headers, ...rows]
        .map(row => row.map(cell => `"${cell}"`).join(','))
        .join('\n');

    return csv;
};

/**
 * Calculate tax deductible expenses
 */
export const calculateTaxDeductions = (
    transactions: Transaction[],
    deductibleCategories: string[]
): number => {
    return transactions
        .filter(t => t.type === 'expense' && deductibleCategories.includes(t.category))
        .reduce((sum, t) => sum + t.amount, 0);
};
