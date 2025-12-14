import { Edit2, Trash2, Truck, Package } from 'lucide-react';
import Button from '../../../../components/ui/buttons/Button';


const FleetTable = ({ 
  data = [],
  onEdit = () => {},
  onDelete = () => {},
  isLoading = false
}) => {


  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success';
      case 'inactive': return 'text-error';
      case 'maintenance': return 'text-warning';
      default: return 'text-text';
    }
  };

  const getTypeIcon = (type) => {
    return type === 'truck' ? Truck : Package;
  };


  const formatNumber = (num) => {
    return num?.toLocaleString() || '0';
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
        <Truck className="h-12 w-12 text-text/40 mx-auto mb-4" />
        <h3 className="text-lg font-normal text-text-light mb-2">No Trucks Found</h3>
        <p className="text-text">Add your first vehicle to get started</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-secondary">
            <th className="text-left py-3 px-4 text-sm font-normal text-text-light">Plate Number</th>
            <th className="text-left py-3 px-4 text-sm font-normal text-text-light">Brand & Model</th>
            <th className="text-left py-3 px-4 text-sm font-normal text-text-light">Current KM</th>
            <th className="text-left py-3 px-4 text-sm font-normal text-text-light">Type</th>
            <th className="text-left py-3 px-4 text-sm font-normal text-text-light">Status</th>
            <th className="text-left py-3 px-4 text-sm font-normal text-text-light">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((vehicle) => {
            const TypeIcon = getTypeIcon(vehicle.type);
            
            return (
              <tr key={vehicle._id || vehicle.id} className="border-b border-secondary/30 hover:bg-bg-dark">

                <td className="py-3 px-4">
                  <div className="font-medium text-text-light">
                    {vehicle.plateNumber || 'N/A'}
                  </div>
                </td>

                {/* Brand & Model */}
                <td className="py-3 px-4">
                  <div>
                    <div className="text-text-light">{vehicle.brand || 'Unknown'}</div>
                    <div className="text-sm text-text">{vehicle.model || 'N/A'}</div>
                  </div>
                </td>

                {/* Current KM */}
                <td className="py-3 px-4">
                  <div className="text-text-light">
                    {formatNumber(vehicle.currentKm)} km
                  </div>
                </td>

                {/* Type */}
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <TypeIcon className="h-4 w-4 text-accent" />
                    <span className="text-text capitalize">{vehicle.type}</span>
                  </div>
                </td>

                {/* Status */}
                <td className="py-3 px-4">
                  <div className={`inline-flex items-center gap-1.5 ${getStatusColor(vehicle.status)}`}>
                    <div className={`h-2 w-2 rounded-full ${getStatusColor(vehicle.status).replace('text-', 'bg-')}`}></div>
                    <span className="capitalize">{vehicle.status}</span>
                  </div>
                </td>

                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={Edit2}
                      onClick={() => onEdit(vehicle)}
                      className="hover:text-accent"
                    />
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={Trash2}
                      onClick={() => onDelete(vehicle._id)}
                      className="hover:text-error"
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default FleetTable;