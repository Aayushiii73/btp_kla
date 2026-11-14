import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, ArcElement, CategoryScale, LinearScale } from 'chart.js';

// Registering the necessary Chart.js components
ChartJS.register(Title, Tooltip, ArcElement, CategoryScale, LinearScale);

const BasicPie = () => {
  const [chartData, setChartData] = useState(null);

  // Function to calculate the total weight based on formula
  const calculateWeight = (productData) => {
    return productData.map(product => {
      const productName = Object.keys(product)[0];
      const data = product[productName][0];

      // Ensure numeric values are used
      const wt_supplier = parseFloat(data.wt_supplier);
      const wt_ours = parseFloat(data.wt_ours);
      const waste = parseFloat(data.waste);
      const final_bags = parseInt(data.final_bags);

      // Calculate weight as (wt_supplier - wt_ours) + Waste + (No_Bags * 35)
      const weight = (wt_supplier - wt_ours) + waste + (wt_ours-(final_bags * 35));

      return {
        productName,
        weight,
      };
    });
  };

  useEffect(() => {
    // Move inputData inside useEffect to avoid unnecessary dependency changes
    const inputData = [
      {
        "Product 1": [
          {
            "wt_supplier": "220",
            "wt_ours": "200",
            "waste": "85",
            "final_bags": "3"
          }
        ]
      },
      {
        "Product 2": [
          {
            "wt_supplier": "320",
            "wt_ours": "300",
            "waste": "185",
            "final_bags": "4"
          }
        ]
      },
      {
        "Product 3": [
          {
            "wt_supplier": "180",
            "wt_ours": "100",
            "waste": "95",
            "final_bags": "3"
          }
        ]
      },
      {
        "Product 4": [
          {
            "wt_supplier": "220",
            "wt_ours": "210",
            "waste": "75",
            "final_bags": "3"
          }
        ]
      },
      {
        "Product 5": [
          {
            "wt_supplier": "220",
            "wt_ours": "150",
            "waste": "85",
            "final_bags": "3"
          }
        ]
      },
      {
        "Product 6": [
          {
            "wt_supplier": "320",
            "wt_ours": "280",
            "waste": "45",
            "final_bags": "3"
          }
        ]
      },
      {
        "Product 7": [
          {
            "wt_supplier": "220",
            "wt_ours": "190",
            "waste": "85",
            "final_bags": "3"
          }
        ]
      },
      {
        "Product 8": [
          {
            "wt_supplier": "400",
            "wt_ours": "380",
            "waste": "120",
            "final_bags": "7"
          }
        ]
      },
      {
        "Product 9": [
          {
            "wt_supplier": "220",
            "wt_ours": "200",
            "waste": "85",
            "final_bags": "3"
          }
        ]
      },
      {
        "Product 10": [
          {
            "wt_supplier": "210",
            "wt_ours": "100",
            "waste": "85",
            "final_bags": "4"
          }
        ]
      }
    ];

    const productWeights = calculateWeight(inputData);

    const labels = productWeights.map(item => item.productName);
    const weights = productWeights.map(item => item.weight);

    // Chart data
    const data = {
      labels: labels,  // Product names for each pie slice
      datasets: [
        {
          data: weights,  // Calculated weights for each product
          backgroundColor: [
            '#9370DB', '#902A5A', '#FF7575', '#FF5A33', '#FFB6C1', 
            '#D4A373', '#F0E68C', '#62B134', '#00B59C', '#00A5E3'
          ], // Colors for each product
          borderColor: '#000000', // Black border for each segment
          borderWidth: 0.5, // Border thickness
          hoverOffset: 4,
        },
      ],
    };

    setChartData(data);
  }, []); // Empty dependency array since inputData is now inside useEffect

  // Options for the pie chart
  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            return context.label + ': ' + context.raw.toFixed(2) + ' kg'; // Show weight on hover
          },
        },
      },
    },
  };

  // Click handler function for the buttons
  const handleButtonClick = (label, weight) => {
    alert(`You clicked on ${label}. Total Weight: ${weight.toFixed(2)} kg`);
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      padding: '20px',
    }}>
      {/* Pie chart on the left */}
      <div style={{ width: '40%' }}>
        {chartData && <Pie data={chartData} options={options} />}
      </div>

      {/* Buttons container on the right */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '10px',
          marginLeft: '200px', // Increased spacing
          justifyItems: 'center',
        }}
      >
        {chartData?.labels.map((label, index) => (
          <button
            key={index}
            onClick={() => handleButtonClick(label, chartData.datasets[0].data[index])}
            style={{
              backgroundColor: chartData.datasets[0].backgroundColor[index],
              color: 'black',
              border: 'none',
              padding: '12px 20px',
              borderRadius: '8px',
              width: '200px',
              cursor: 'pointer',
              textAlign: 'center',
            }}
          >
            {label} - {chartData.datasets[0].data[index].toFixed(2)} kg
          </button>
        ))}
      </div>
    </div>
  );
};

export default BasicPie;