import React, { useState } from 'react';
import { Edit2, Trash2, Truck, Calendar, DollarSign, Navigation, Wrench, AlertTriangle, CheckCircle, Clock, PlayCircle, Ban, Eye } from 'lucide-react';
import Button from '../../../../components/ui/buttons/Button';

const MaintenanceTable = ({ 
  data = [],
  onEdit = () => {},
  onDelete = () => {},
  isLoading = false
}) => {
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return { icon: Clock, color: 'text-yellow-400', bgColor: 'bg-yellow-900/10' };
      case 'in_progress':
        return { icon: PlayCircle, color: 'text-blue-400', bgColor: 'bg-blue-900/10' };
      case 'done':
        return { icon: CheckCircle, color: 'text-green-400', bgColor: 'bg-green-900/10' };
      case 'canceled':
        return { icon: Ban, color: 'text-red-400', bgColor: 'bg-red-900/10' };
      default:
        return { icon: Clock, color: 'text-yellow-400', bgColor: 'bg-yellow-900/10' };
    }
  };

  const getComponentIcon = (component) => {
    switch (component) {
      case 'oil_filter':
        return { icon: Wrench, color: 'text-blue-400' };
      case 'engine':
        return { icon: AlertTriangle, color: 'text-orange-400' };
      case 'tire':
        return { icon: Navigation, color: 'text-gray-400' };
      case 'brake':
        return { icon: AlertTriangle, color: 'text-red-400' };
      default:
        return { icon: Wrench, color: 'text-accent' };
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatNumber = (num) => {
    return num?.toLocaleString() || 'N/A';
  };

  const formatCurrency = (amount) => {
    if (!amount && amount !== 0) return 'N/A';
    return `$${amount.toFixed(2)}`;
  };

  const handleViewDetails = (record) => {
    setSelectedRecord(record);
    setShowDetails(true);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="h-8 w-8 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-8">
        <Wrench className="h-12 w-12 text-text/40 mx-auto mb-4" />
        <h3 className="text-lg font-normal text-text-light mb-2">No Maintenance Records Found</h3>
        <p className="text-text">Schedule your first maintenance to get started</p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-secondary">
              <th className="text-left py-3 px-4 text-sm font-normal text-text-light">Vehicle</th>
              <th className="text-left py-3 px-4 text-sm font-normal text-text-light">Component</th>
              <th className="text-left py-3 px-4 text-sm font-normal text-text-light">Scheduled Date</th>
              <th className="text-left py-3 px-4 text-sm font-normal text-text-light">KM at Service</th>
              <th className="text-left py-3 px-4 text-sm font-normal text-text-light">Cost</th>
              <th className="text-left py-3 px-4 text-sm font-normal text-text-light">Status</th>
              <th className="text-left py-3 px-4 text-sm font-normal text-text-light">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((record) => {
              const StatusIcon = getStatusIcon(record.status).icon;
              const statusColor = getStatusIcon(record.status).color;
              const statusBg = getStatusIcon(record.status).bgColor;
              const ComponentIcon = getComponentIcon(record.component).icon;
              const componentColor = getComponentIcon(record.component).color;

              return (
                <tr key={record._id} className="border-b border-secondary/30 hover:bg-bg-dark transition-colors">
                  {/* Vehicle Column */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-text/60" />
                      <div>
                        <div className="text-text-light font-medium">
                          {record.vehicleId?.plateNumber || 'N/A'}
                        </div>
                        <div className="text-xs text-text">
                          {record.vehicleId?.brand} {record.vehicleId?.model}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Component Column */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded ${componentColor.replace('text-', 'bg-')} bg-opacity-10`}>
                        <ComponentIcon className={`h-3.5 w-3.5 ${componentColor}`} />
                      </div>
                      <div className="text-sm text-text-light capitalize">
                        {record.component?.replace('_', ' ') || 'N/A'}
                      </div>
                    </div>
                  </td>

                  {/* Scheduled Date Column */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-text/60" />
                      <div className="text-sm text-text-light">
                        {formatDate(record.date)}
                      </div>
                    </div>
                  </td>

                  {/* KM at Service Column */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Navigation className="h-4 w-4 text-text/60" />
                      <div className="text-sm text-text-light">
                        {formatNumber(record.kmAtMaintenance)} km
                      </div>
                    </div>
                  </td>

                  {/* Cost Column */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-text/60" />
                      <div className="text-sm text-text-light">
                        {formatCurrency(record.cost)}
                      </div>
                    </div>
                  </td>

                  {/* Status Column */}
                  <td className="py-3 px-4">
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusBg} ${statusColor}`}>
                      <StatusIcon className="h-3 w-3" />
                      <span className="capitalize">
                        {record.status === 'in_progress' ? 'In Progress' : 
                         record.status === 'done' ? 'Completed' : 
                         record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </span>
                    </div>
                  </td>

                  {/* Actions Column */}
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={Eye}
                        onClick={() => handleViewDetails(record)}
                        className="hover:text-blue-400"
                        title="View Details"
                      />
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={Edit2}
                        onClick={() => onEdit(record)}
                        className="hover:text-accent"
                        title="Edit"
                      />
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={Trash2}
                        onClick={() => onDelete(record._id)}
                        className="hover:text-error"
                        title="Delete"
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Details Modal */}
      {showDetails && selectedRecord && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-bg border border-secondary rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-secondary sticky top-0 bg-bg z-10">
              <h3 className="text-lg font-semibold text-text-light">Maintenance Details</h3>
              <button
                onClick={() => setShowDetails(false)}
                className="p-1 text-text hover:text-text-light hover:bg-bg-dark rounded transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-4 space-y-4">
              {/* Vehicle Info */}
              <div className="bg-bg-dark/30 border border-secondary/50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-text-light mb-3 flex items-center gap-2">
                  <Truck className="h-4 w-4" />
                  Vehicle Information
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-text mb-1">Plate Number</p>
                    <p className="text-sm text-text-light">{selectedRecord.vehicleId?.plateNumber}</p>
                  </div>
                  <div>
                    <p className="text-xs text-text mb-1">Brand & Model</p>
                    <p className="text-sm text-text-light">{selectedRecord.vehicleId?.brand} {selectedRecord.vehicleId?.model}</p>
                  </div>
                  <div>
                    <p className="text-xs text-text mb-1">Current KM</p>
                    <p className="text-sm text-text-light">{formatNumber(selectedRecord.vehicleId?.currentKm)} km</p>
                  </div>
                  <div>
                    <p className="text-xs text-text mb-1">Vehicle Type</p>
                    <p className="text-sm text-text-light capitalize">{selectedRecord.vehicleId?.type}</p>
                  </div>
                </div>
              </div>

              {/* Maintenance Details */}
              <div className="bg-bg-dark/30 border border-secondary/50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-text-light mb-3 flex items-center gap-2">
                  <Wrench className="h-4 w-4" />
                  Maintenance Details
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-text mb-1">Component</p>
                    <p className="text-sm text-text-light capitalize">{selectedRecord.component?.replace('_', ' ')}</p>
                  </div>
                  <div>
                    <p className="text-xs text-text mb-1">Target Type</p>
                    <p className="text-sm text-text-light capitalize">{selectedRecord.targetType}</p>
                  </div>
                  <div>
                    <p className="text-xs text-text mb-1">Scheduled Date</p>
                    <p className="text-sm text-text-light">{formatDate(selectedRecord.date)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-text mb-1">KM at Service</p>
                    <p className="text-sm text-text-light">{formatNumber(selectedRecord.kmAtMaintenance)} km</p>
                  </div>
                  <div>
                    <p className="text-xs text-text mb-1">Cost</p>
                    <p className="text-sm text-text-light">{formatCurrency(selectedRecord.cost)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-text mb-1">Status</p>
                    <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium ${getStatusIcon(selectedRecord.status).bgColor} ${getStatusIcon(selectedRecord.status).color}`}>
                      {React.createElement(getStatusIcon(selectedRecord.status).icon, { className: "h-3 w-3" })}
                      <span className="capitalize">
                        {selectedRecord.status === 'in_progress' ? 'In Progress' : 
                         selectedRecord.status === 'done' ? 'Completed' : 
                         selectedRecord.status.charAt(0).toUpperCase() + selectedRecord.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              {selectedRecord.description && (
                <div className="bg-bg-dark/30 border border-secondary/50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-text-light mb-2">Description</h4>
                  <p className="text-sm text-text">{selectedRecord.description}</p>
                </div>
              )}

              {/* Created/Updated Info */}
              <div className="grid grid-cols-2 gap-3 text-xs text-text/60">
                <div>
                  <p>Created: {new Date(selectedRecord.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p>Last Updated: {new Date(selectedRecord.updatedAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-secondary">
              <Button
                variant="outline"
                fullWidth
                onClick={() => setShowDetails(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MaintenanceTable;