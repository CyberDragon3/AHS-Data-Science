'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, Brush, Label } from 'recharts';
import styles from './Page.module.css';

type ChartDataType = {
  month: string;
  projects: number;
  members: number;
  projectsMovingAvg?: number | null;
  membersMovingAvg?: number | null;
};

// Initial sample data for the chart
const initialSampleData: ChartDataType[] = [
  { month: 'Jan', projects: 4, members: 10 },
  { month: 'Feb', projects: 3, members: 12 },
  { month: 'Mar', projects: 6, members: 15 },
  { month: 'Apr', projects: 8, members: 18 },
  { month: 'May', projects: 5, members: 20 },
  { month: 'Jun', projects: 7, members: 22 },
  { month: 'Jul', projects: 9, members: 25 },
  { month: 'Aug', projects: 11, members: 28 },
  { month: 'Sep', projects: 10, members: 30 },
  { month: 'Oct', projects: 12, members: 33 },
  { month: 'Nov', projects: 10, members: 33 },
  { month: 'Dec', projects: 10, members: 33 },
];

// Function to calculate 3-month moving average for projects and members
const calculateMovingAverage = (data: ChartDataType[]) => {
  const movingAverageWindow = 3;
  return data.map((item, index, array) => {
    if (index >= movingAverageWindow - 1) {
      const projectsSum = array.slice(index - movingAverageWindow + 1, index + 1)
        .reduce((acc, curr) => acc + curr.projects, 0);
      const membersSum = array.slice(index - movingAverageWindow + 1, index + 1)
        .reduce((acc, curr) => acc + curr.members, 0);
      return {
        ...item,
        projectsMovingAvg: Number((projectsSum / movingAverageWindow).toFixed(2)),
        membersMovingAvg: Number((membersSum / movingAverageWindow).toFixed(2))
      };
    }
    return { ...item, projectsMovingAvg: null, membersMovingAvg: null };
  });
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string; // Name of the data series 
    value: number | null; // Value of the data series
    color: string; // Color of the data series
  }>;
  label?: string;
}

// Custom tooltip component for the chart
const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className={styles.customTooltip} style={{ backgroundColor: 'white', border: '1px solid #ccc', padding: '10px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', textAlign: 'center' }}>
        <p className={styles.label}>{`Month: ${label}`}</p>
        {payload.map((entry, index) => (
          <p key={`item-${index}`} style={{ color: entry.color }}>
            {`${entry.name.charAt(0).toUpperCase() + entry.name.slice(1)}: ${entry.value !== null ? entry.value : 'N/A'}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activePage, setActivePage] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [projectCount, setProjectCount] = useState(0);
  const [memberCount, setMemberCount] = useState(0);
  const [chartData, setChartData] = useState<ChartDataType[]>(() => {
    return calculateMovingAverage(initialSampleData);
  });
  const [newProjectCount, setNewProjectCount] = useState('');
  const [newMemberCount, setNewMemberCount] = useState('');

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setLoading(false);
      setProjectCount(33);
      setMemberCount(22);
    }, 1000);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const addDataPoint = () => {
    if (newProjectCount && newMemberCount) {
      setChartData(prevData => {
        const newData = [...prevData, {
          month: `Month ${prevData.length + 1}`, // You might want to generate this dynamically
          projects: parseInt(newProjectCount),
          members: parseInt(newMemberCount)
        }];
        return calculateMovingAverage(newData);
      });
      setNewProjectCount('');
      setNewMemberCount('');
    }
  };

  const deleteLastDataPoint = () => {
    setChartData(prevData => {
      const newData = prevData.slice(0, -1);
      return calculateMovingAverage(newData);
    });
  };

  const renderDashboard = () => (
    <>
      <h2>Welcome to the Dashboard</h2>
      <p>Here&apos;s an overview of AHS Data Science club activities:</p>
      <div className={styles.statsContainer}>
        <div className={styles.statBox}>
          <h3>Total Projects</h3>
          <p className={styles.statNumber}>{projectCount}</p>
        </div>
        <div className={styles.statBox}>
          <h3>Club Members</h3>
          <p className={styles.statNumber}>{memberCount}</p>
        </div>
      </div>
      <div className={styles.chartContainer}>
        <h3>Number of Projects and Membership Growth</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" domain={[0, 'dataMax + 5']}>
              <Label value="Projects" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
            </YAxis>
            <YAxis yAxisId="right" orientation="right" domain={[0, 'dataMax + 5']}>
              <Label value="Members" angle={90} position="insideRight" style={{ textAnchor: 'middle' }} />
            </YAxis>
            <Tooltip content={<CustomTooltip active={false} payload={[]} label="" />} />
            <Legend verticalAlign="top" height={36} />
            <ReferenceLine y={10} yAxisId="left" stroke="red" strokeDasharray="3 3" label={{ value: "Project Target", position: "insideBottomLeft" }} />
            <Line yAxisId="left" type="monotone" dataKey="projects" stroke="#8884d8" activeDot={{ r: 8 }} name="Projects" />
            <Line yAxisId="right" type="monotone" dataKey="members" stroke="#82ca9d" name="Members" />
            <Line yAxisId="left" type="monotone" dataKey="projectsMovingAvg" stroke="#ff7300" dot={false} name="Projects 3-Month Moving Avg" />
            <Line yAxisId="right" type="monotone" dataKey="membersMovingAvg" stroke="#ff9900" dot={false} name="Members 3-Month Moving Avg" />
            <Brush dataKey="month" height={30} stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
        <div className={styles.dataInputContainer}>
          <input
            type="number"
            value={newProjectCount}
            onChange={(e) => setNewProjectCount(e.target.value)}
            placeholder="New Project Count"
          />
          <input
            type="number"
            value={newMemberCount}
            onChange={(e) => setNewMemberCount(e.target.value)}
            placeholder="New Member Count"
          />
          <button onClick={addDataPoint} className={styles.updateButton}>Add Data Point</button>
          <button onClick={deleteLastDataPoint} className={styles.deleteButton}>Delete Last Data Point</button>
        </div>
      </div>
    </>
  );

  const renderContent = () => {
    if (loading) {
      return <p className={styles.loading}>Loading...</p>;
    }

    switch (activePage) {
      case 'dashboard':
        return renderDashboard();
      case 'analytics':
        return (
          <>
            <h2>Analytics</h2>
            <p>Detailed analytics and visualizations will be displayed here.</p>
            <ul>
              <li>Project success rates</li>
              <li>Member participation metrics</li>
              <li>Technology usage statistics</li>
            </ul>
          </>
        );
      case 'reports':
        return (
          <>
            <h2>Reports</h2>
            <p>Generate and view reports on your data science activities.</p>
            <button className={styles.reportButton}>Generate Monthly Report</button>
            <button className={styles.reportButton}>View Past Reports</button>
          </>
        );
      case 'settings':
        return (
          <>
            <h2>Settings</h2>
            <p>Adjust your dashboard preferences and account settings.</p>
            <form className={styles.settingsForm}>
              <label>
                Email Notifications:
                <input type="checkbox" />
              </label>
              <label>
                Display Name:
                <input type="text" placeholder="Your Name" />
              </label>
              <button type="submit">Save Settings</button>
            </form>
          </>
        );
      default:
        return <p>Select a menu item to view content.</p>;
    }
  };

  return (
    <div className={`${styles.pageContainer} ${isDarkMode ? styles.darkMode : ''}`}>
      <Sidebar 
        darkMode={isDarkMode} 
        activePage={activePage}
        setActivePage={setActivePage}
        toggleDarkMode={toggleDarkMode}
      />
      <main className={styles.mainContent}>
        <header className={styles.header}>
          <h1 className={styles.title}>AHS Data Science Dashboard</h1>
        </header>
        <div className={styles.contentArea}>
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
