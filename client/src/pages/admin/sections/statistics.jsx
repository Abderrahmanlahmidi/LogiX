import { 
  Truck, 
  MapPin, 
  Wrench, 
  Fuel, 
  BarChart3, 
  TrendingUp,
  Activity,
} from "lucide-react";
import { vehicleApi } from "../../../services/apis/admin/fleetApi";
import { maintenanceRulesApi } from "../../../services/apis/admin/maintenanceRulesApi";
import { tripApi } from "../../../services/apis/admin/tripApi";
import { useQuery } from "@tanstack/react-query";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Bar, Pie, Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function Statistics() {
  const { data: vehiclesData } = useQuery({
    queryKey: ["vehicles"],
    queryFn: () => vehicleApi.getVehicles(),
  });

  const { data: tripsData } = useQuery({
    queryKey: ["trips"],
    queryFn: () => tripApi.getTrips(),
  });

  const { data: rulesData } = useQuery({
    queryKey: ["maintenance-rules"],
    queryFn: () => maintenanceRulesApi.getMaintenanceRules(),
  });

  const vehicles = vehiclesData?.data || [];
  const trips = tripsData?.data || [];
  const rules = rulesData?.data || [];

  const statistics = {
    vehicles: {
      total: vehicles.length,
      trucks: vehicles.filter(v => v.type === 'truck').length,
      trailers: vehicles.filter(v => v.type === 'trailer').length,
      active: vehicles.filter(v => v.status === 'active').length,
      averageKm: vehicles.reduce((acc, v) => acc + (v.currentKm || 0), 0) / (vehicles.length || 1),
    },
    trips: {
      total: trips.length,
      active: trips.filter(t => t.status === 'active').length,
      done: trips.filter(t => t.status === 'done').length,
      pending: trips.filter(t => t.status === 'pending').length,
      canceled: trips.filter(t => t.status === 'canceled').length,
      totalFuel: trips.reduce((acc, t) => acc + (t.fuelLiters || 0), 0),
      uniqueDrivers: [...new Set(trips.map(t => t.driverId?._id))].length,
    },
    maintenance: {
      totalRules: rules.length,
      activeRules: rules.filter(r => r.isActive).length,
      oilRules: rules.filter(r => r.type === 'oil').length,
      tireRules: rules.filter(r => r.type === 'tire').length,
      filterRules: rules.filter(r => r.type === 'filter').length,
    }
  };


  const vehicleChartData = {
    labels: ['Trucks', 'Trailers'],
    datasets: [
      {
        label: 'Vehicle Count',
        data: [statistics.vehicles.trucks, statistics.vehicles.trailers],
        backgroundColor: [
          'rgba(249, 168, 38, 0.7)', 
          'rgba(20, 66, 114, 0.7)',  
        ],
        borderColor: [
          'rgba(249, 168, 38, 1)',
          'rgba(20, 66, 114, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const tripStatusChartData = {
    labels: ['Active', 'Completed', 'Scheduled', 'Canceled'],
    datasets: [
      {
        data: [
          statistics.trips.active,
          statistics.trips.done,
          statistics.trips.pending,
          statistics.trips.canceled
        ],
        backgroundColor: [
          'rgba(34, 197, 94, 0.7)',  
          'rgba(59, 130, 246, 0.7)',  
          'rgba(250, 204, 21, 0.7)',  
          'rgba(239, 68, 68, 0.7)',    
        ],
        borderColor: [
          'rgba(34, 197, 94, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(250, 204, 21, 1)',
          'rgba(239, 68, 68, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };


  const maintenanceChartData = {
    labels: rules.map(rule => rule.type.charAt(0).toUpperCase() + rule.type.slice(1)),
    datasets: [
      {
        label: 'Recommended KM',
        data: rules.map(rule => rule.recommendedKm / 1000),
        backgroundColor: 'rgba(249, 168, 38, 0.6)',
        borderColor: 'rgba(249, 168, 38, 1)',
        borderWidth: 2,
      },
    ],
  };

  const fuelChartData = {
    labels: trips.slice(0, 5).map(trip => `Trip ${trip._id.substring(0, 6)}`),
    datasets: [
      {
        label: 'Fuel Consumption (Liters)',
        data: trips.slice(0, 5).map(trip => trip.fuelLiters || 0),
        backgroundColor: 'rgba(34, 197, 94, 0.2)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#E5E7EB',
          font: {
            size: 12
          }
        }
      },
      title: {
        display: true,
        color: '#ffffff',
        font: {
          size: 14
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#9CA3AF',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        }
      },
      y: {
        ticks: {
          color: '#9CA3AF',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-bg p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-light mb-2">Statistics Dashboard</h1>
        <p className="text-text">Comprehensive overview of your fleet operations</p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Vehicles */}
        <div className="bg-teal-900/10 border border-teal-800/30 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-teal-300">Total Vehicles</p>
              <p className="text-3xl font-bold text-teal-400 mt-1">
                {statistics.vehicles.total}
              </p>
              <div className="flex gap-4 mt-2 text-xs">
                <span className="text-teal-300/80">{statistics.vehicles.trucks} trucks</span>
                <span className="text-teal-300/80">{statistics.vehicles.trailers} trailers</span>
              </div>
            </div>
            <div className="p-3 bg-teal-900/20 rounded-lg">
              <Truck className="h-8 w-8 text-teal-400" />
            </div>
          </div>
        </div>

        {/* Active Trips */}
        <div className="bg-green-900/10 border border-green-800/30 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-300">Active Trips</p>
              <p className="text-3xl font-bold text-green-400 mt-1">
                {statistics.trips.active}
              </p>
              <div className="flex gap-4 mt-2 text-xs">
                <span className="text-green-300/80">{statistics.trips.done} completed</span>
                <span className="text-green-300/80">{statistics.trips.pending} scheduled</span>
              </div>
            </div>
            <div className="p-3 bg-green-900/20 rounded-lg">
              <MapPin className="h-8 w-8 text-green-400" />
            </div>
          </div>
        </div>

        {/* Total Fuel */}
        <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-300">Total Fuel Used</p>
              <p className="text-3xl font-bold text-blue-400 mt-1">
                {statistics.trips.totalFuel}L
              </p>
              <p className="text-xs text-blue-300/80 mt-2">
                Across {statistics.trips.total} trips
              </p>
            </div>
            <div className="p-3 bg-blue-900/20 rounded-lg">
              <Fuel className="h-8 w-8 text-blue-400" />
            </div>
          </div>
        </div>

        {/* Maintenance Rules */}
        <div className="bg-purple-900/10 border border-purple-800/30 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-300">Maintenance Rules</p>
              <p className="text-3xl font-bold text-purple-400 mt-1">
                {statistics.maintenance.totalRules}
              </p>
              <p className="text-xs text-purple-300/80 mt-2">
                {statistics.maintenance.activeRules} active rules
              </p>
            </div>
            <div className="p-3 bg-purple-900/20 rounded-lg">
              <Wrench className="h-8 w-8 text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Vehicle Distribution */}
        <div className="bg-bg border border-secondary rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-text-light">Vehicle Distribution</h3>
              <p className="text-sm text-text">Trucks vs Trailers</p>
            </div>
            <Truck className="h-5 w-5 text-accent" />
          </div>
          <div className="h-64">
            <Pie data={vehicleChartData} options={chartOptions} />
          </div>
        </div>

        {/* Trip Status */}
        <div className="bg-bg border border-secondary rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-text-light">Trip Status Overview</h3>
              <p className="text-sm text-text">Distribution by status</p>
            </div>
            <Activity className="h-5 w-5 text-accent" />
          </div>
          <div className="h-64">
            <Doughnut data={tripStatusChartData} options={chartOptions} />
          </div>
        </div>

        {/* Maintenance Rules */}
        <div className="bg-bg border border-secondary rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-text-light">Maintenance Rules</h3>
              <p className="text-sm text-text">Recommended kilometers (in 1000s)</p>
            </div>
            <BarChart3 className="h-5 w-5 text-accent" />
          </div>
          <div className="h-64">
            <Bar data={maintenanceChartData} options={chartOptions} />
          </div>
        </div>

        {/* Fuel Consumption */}
        <div className="bg-bg border border-secondary rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-text-light">Fuel Consumption</h3>
              <p className="text-sm text-text">Recent trips fuel usage</p>
            </div>
            <TrendingUp className="h-5 w-5 text-accent" />
          </div>
          <div className="h-64">
            <Line data={fuelChartData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vehicle Details */}
        <div className="bg-bg border border-secondary rounded-lg p-6">
          <h3 className="text-lg font-semibold text-text-light mb-4 flex items-center gap-2">
            <Truck className="h-5 w-5 text-accent" />
            Vehicle Statistics
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-secondary/30">
              <span className="text-text">Average Kilometers</span>
              <span className="text-text-light font-medium">
                {statistics.vehicles.averageKm.toFixed(0)} km
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-secondary/30">
              <span className="text-text">Active Vehicles</span>
              <span className="text-green-400 font-medium">
                {statistics.vehicles.active} / {statistics.vehicles.total}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-secondary/30">
              <span className="text-text">Brand Distribution</span>
              <span className="text-text-light font-medium">
                {[...new Set(vehicles.map(v => v.brand))].length} brands
              </span>
            </div>
          </div>
        </div>

        {/* Trip Details */}
        <div className="bg-bg border border-secondary rounded-lg p-6">
          <h3 className="text-lg font-semibold text-text-light mb-4 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-accent" />
            Trip Statistics
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-secondary/30">
              <span className="text-text">Total Trips</span>
              <span className="text-text-light font-medium">{statistics.trips.total}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-secondary/30">
              <span className="text-text">Unique Drivers</span>
              <span className="text-text-light font-medium">{statistics.trips.uniqueDrivers}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-secondary/30">
              <span className="text-text">Cancelation Rate</span>
              <span className="text-red-400 font-medium">
                {((statistics.trips.canceled / (statistics.trips.total || 1)) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-text">Completion Rate</span>
              <span className="text-green-400 font-medium">
                {((statistics.trips.done / (statistics.trips.total || 1)) * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        {/* Maintenance Details */}
        <div className="bg-bg border border-secondary rounded-lg p-6">
          <h3 className="text-lg font-semibold text-text-light mb-4 flex items-center gap-2">
            <Wrench className="h-5 w-5 text-accent" />
            Maintenance Overview
          </h3>
          <div className="space-y-4">
            {rules.map((rule) => (
              <div key={rule._id} className="py-2 border-b border-secondary/30 last:border-b-0">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-text-light font-medium capitalize">{rule.type}</span>
                  <span className="text-accent font-medium">{rule.recommendedKm.toLocaleString()} km</span>
                </div>
                <p className="text-xs text-text/80">{rule.description}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${rule.isActive ? 'bg-green-900/20 text-green-400' : 'bg-red-900/20 text-red-400'}`}>
                    {rule.isActive ? 'Active' : 'Inactive'}
                  </span>
                  <span className="text-xs text-text/60">{rule.recommendedMonths} months</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}