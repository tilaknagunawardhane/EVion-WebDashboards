import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { COLORS } from '../../../constants/colors';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function RevenueTrendChart({ data = [] }) {
  // Debug: Log the data received
  useEffect(() => {
    console.log('📊 RevenueTrendChart - Data received:', data);
    console.log('📊 Data length:', data?.length);
    if (data && data.length > 0) {
      console.log('📊 First data point:', data[0]);
      console.log('📊 Last data point:', data[data.length - 1]);
    }
  }, [data]);

  // Process the data from backend
  const processChartData = () => {
    if (!data || data.length === 0) {
      console.log('⚠️ No data available for chart');
      return {
        labels: [],
        datasets: [],
        maxValue: 0
      };
    }

    // Format date labels
    const labels = data.map(item => {
      if (item.date || item._id) {
        const dateStr = item.date || item._id;
        const [year, month, day] = dateStr.split('-');
        const date = new Date(year, month - 1, day);
        return date.toLocaleDateString('en-US', { 
          day: 'numeric', 
          month: 'short' 
        });
      }
      return '';
    });

    // Extract revenue data - handle different possible field names
    // Flip the sign: positive becomes negative, negative becomes positive
    const totalRevenue = data.map(item => {
      const value = item.totalRevenue || item.total || 0;
      return -value; // Flip the sign
    });
    
    const chargingRevenue = data.map(item => {
      const value = item.chargingRevenue || item.charging || item.chargingFees || 0;
      return -value; // Flip the sign
    });
    
    const bookingRevenue = data.map(item => {
      const value = item.bookingRevenue || item.booking || item.bookingFees || 0;
      return -value; // Flip the sign
    });

    console.log('📊 Processed data:', {
      labels,
      totalRevenue,
      chargingRevenue,
      bookingRevenue
    });

    // Find the maximum value to set appropriate y-axis scale
    const maxValue = Math.max(...totalRevenue, ...chargingRevenue, ...bookingRevenue, 0);
    console.log('📊 Max value in data:', maxValue);

    return {
      labels,
      maxValue,
      datasets: [
        {
          label: 'Total Revenue',
          data: totalRevenue,
          borderColor: COLORS.primary,
          backgroundColor: `${COLORS.primary}20`,
          tension: 0.4,
          fill: true,
          pointBackgroundColor: 'white',
          pointBorderColor: COLORS.primary,
          pointBorderWidth: 2,
          pointRadius: 3,
          pointHoverRadius: 5
        },
        {
          label: 'Charging Sessions',
          data: chargingRevenue,
          borderColor: COLORS.star,
          backgroundColor: 'transparent',
          tension: 0.4,
          fill: false,
          borderDash: [5, 5],
          pointBackgroundColor: 'white',
          pointBorderColor: COLORS.star,
          pointBorderWidth: 2,
          pointRadius: 3,
          pointHoverRadius: 5
        },
        {
          label: 'Booking Fees',
          data: bookingRevenue,
          borderColor: COLORS.danger,
          backgroundColor: 'transparent',
          tension: 0.4,
          fill: false,
          borderDash: [5, 5],
          pointBackgroundColor: 'white',
          pointBorderColor: COLORS.danger,
          pointBorderWidth: 2,
          pointRadius: 3,
          pointHoverRadius: 5
        }
      ]
    };
  };

  const chartData = processChartData();

  // Calculate dynamic y-axis max based on data
  const calculateYAxisMax = (maxValue) => {
    if (maxValue === 0) return 1000;
    
    // Round up to nearest nice number
    const magnitude = Math.pow(10, Math.floor(Math.log10(maxValue)));
    const normalized = maxValue / magnitude;
    
    let roundedMax;
    if (normalized <= 1) roundedMax = 1;
    else if (normalized <= 2) roundedMax = 2;
    else if (normalized <= 5) roundedMax = 5;
    else roundedMax = 10;
    
    const calculatedMax = Math.ceil(roundedMax * magnitude * 1.2); // Add 20% padding
    console.log('📊 Y-axis max:', calculatedMax);
    return calculatedMax;
  };

  const yAxisMax = calculateYAxisMax(chartData.maxValue);
  const stepSize = Math.ceil(yAxisMax / 5); // Create 5 steps

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 20,
          boxWidth: 10,
          font: {
            size: 12,
            family: 'system-ui, -apple-system, sans-serif'
          }
        }
      },
      tooltip: {
        backgroundColor: 'white',
        titleColor: COLORS.mainTextColor,
        bodyColor: COLORS.secondaryText,
        borderColor: COLORS.border,
        borderWidth: 1,
        padding: 12,
        usePointStyle: true,
        callbacks: {
          label: (context) => {
            const value = context.raw || 0;
            return `${context.dataset.label}: LKR ${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
          }
        }
      },
      title: {
        display: true,
        text: 'Daily Revenue Trends (Last 30 Days)',
        font: {
          size: 16,
          weight: 'bold',
          family: 'system-ui, -apple-system, sans-serif'
        },
        color: COLORS.mainTextColor,
        padding: {
          bottom: 20
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 10
          },
          maxRotation: 45,
          minRotation: 45,
          autoSkip: true,
          maxTicksLimit: 15
        }
      },
      y: {
        min: 0,
        max: yAxisMax,
        ticks: {
          stepSize: stepSize,
          callback: (value) => {
            if (value >= 1000) {
              return `${(value / 1000).toFixed(1)}k`;
            }
            return value.toFixed(0);
          },
          font: {
            size: 11
          }
        },
        grid: {
          color: COLORS.border || '#e5e7eb',
          drawBorder: false
        }
      }
    },
    elements: {
      line: {
        borderWidth: 2
      }
    },
    interaction: {
      mode: 'index',
      intersect: false
    }
  };

  // Show empty state if no data
  if (!data || data.length === 0) {
    return (
      <div style={{ 
        height: '300px',
        padding: '16px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <p style={{ color: COLORS.secondaryText, fontSize: '16px', marginBottom: '8px' }}>
          No revenue data available
        </p>
        <p style={{ color: COLORS.secondaryText, fontSize: '12px' }}>
          Revenue data will appear here once transactions are recorded
        </p>
      </div>
    );
  }

  return (
    <div style={{ 
      height: '300px',
      padding: '16px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)'
    }}>
      <Line data={chartData} options={options} />
    </div>
  );
}