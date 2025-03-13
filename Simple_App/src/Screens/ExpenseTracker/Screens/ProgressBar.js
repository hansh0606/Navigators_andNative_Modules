import React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const CustomProgressBar = ({ progress, colors, width, height }) => {
  return (
    <View style={[styles.barBackground, { width, height }]}>
      <LinearGradient
        colors={colors}
        style={[styles.barFill, { height: `${progress}%` }]}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
      />
    </View>
  );
};

const ExpenseChart = ({ dailyExpensesData, dailyLabels }) => {
  // Calculate max expense for Y-axis scaling
  if (!dailyExpensesData || !dailyLabels) {
    return <Text>Loading data...</Text>; // Or some other placeholder
  }
  
  const maxExpense = Math.max(...dailyExpensesData, 1);

  // Y-axis labels (adjust step as needed)
  const yAxisLabels =[];
  const yAxisIntervals = 5; // Number of intervals
  const yAxisMax = Math.ceil(maxExpense / 1000) * 1000; // Round up to nearest 1000
  const yAxisStep = yAxisMax / yAxisIntervals;

  for (let i = yAxisIntervals; i >= 0; i--) {
    const value = i * yAxisStep;
    yAxisLabels.push(value.toFixed(2));
  }

  return (
    <View style={styles.chartContainer}>
      <Text style={styles.chartTitle}>Daily Expenses</Text>

      <View style={styles.chart}>
        {/* Y-axis labels */}
        <View style={styles.yAxis}>
          {yAxisLabels.map((label, index) => (
            <Text key={index} style={styles.yAxisLabel}>
              ₹{label >= 1000 ? (label / 1000).toFixed(1) + 'k' : label}
            </Text>
          ))}
        </View>

        {/* Graph area */}
        <View style={styles.graph}>
          {/* Bars */}
          <View style={styles.bars}>
            {dailyExpensesData.map((expense, index) => {
              const barHeight = (expense / maxExpense) * 100;
              return (
                <View key={index} style={styles.bar}>
                  <CustomProgressBar
                    progress={barHeight}
                    colors={['#1e90ff', '#8a2be2']}
                    width={20}
                    height={150}
                  />
                  <Text style={styles.barLabel}>
                    ₹{expense.toFixed(2)}
                  </Text>
                  <Text style={styles.dayLabel}>{dailyLabels[index]}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </View>

      {/* Total Expense */}
      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total Expense</Text>
        <Text style={styles.totalValue}>
          ₹{dailyExpensesData.reduce((a, b) => a + b, 0).toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    backgroundColor: '#f8f8ff', // Light background
    borderRadius: 10,
    padding: 20,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 200,
  },
  yAxis: {
    justifyContent: 'space-between',
    height: '100%',
    marginRight: 10,
  },
  yAxisLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
  },
  graph: {
    flex: 1,
    height: '100%',
  },
  bars: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: '100%',
  },
  bar: {
    alignItems: 'center',
    marginBottom: 5,
  },
  barBackground: {
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  barFill: {
    width: '100%',
    borderRadius: 5,
    justifyContent: 'flex-end',
  },
  barLabel: {
    fontSize: 12,
    marginTop: 5,
    color: '#333',
    textAlign: 'center',
  },
  dayLabel: {
    fontSize: 10,
    color: '#666',
    marginTop: 2,
  },
  totalContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 14,
    color: '#666',
  },
  totalValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007bff',
  },
});

export default ExpenseChart;