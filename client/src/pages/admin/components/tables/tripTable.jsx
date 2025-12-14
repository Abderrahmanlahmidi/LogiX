import { Edit2, Trash2, User, MapPin, Calendar, Truck } from 'lucide-react';
import Button from '../../../../components/ui/buttons/Button';

const TripTable = ({ 
  data = [],
  onEdit = () => {},
  onDelete = () => {},
  isLoading = false
}) => {

const getStatusColor = (status) => {
  switch (status) {
    case 'active': 
      return 'bg-green-500/10 text-green-500';
    case 'done': 
      return 'bg-blue-500/10 text-blue-500';
    case 'pending': 
      return 'bg-yellow-500/10 text-yellow-500';
    case 'canceled': 
      return 'bg-red-500/10 text-red-500';
    default: 
      return 'bg-gray-500/10 text-gray-500';
  }
};
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric'
    });
  };

  const formatRoute = (start, end) => {
    if (!start && !end) return 'N/A';
    return `${start || '?'} → ${end || '?'}`;
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
        <MapPin className="h-12 w-12 text-text/40 mx-auto mb-4" />
        <h3 className="text-lg font-normal text-text-light mb-2">No Trips Found</h3>
        <p className="text-text">Create your first trip to get started</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-secondary">
            <th className="text-left py-3 px-4 text-sm font-normal text-text-light">Driver</th>
            <th className="text-left py-3 px-4 text-sm font-normal text-text-light">Route</th>
            <th className="text-left py-3 px-4 text-sm font-normal text-text-light">Date</th>
            <th className="text-left py-3 px-4 text-sm font-normal text-text-light">Vehicle</th>
            <th className="text-left py-3 px-4 text-sm font-normal text-text-light">Status</th>
            <th className="text-left py-3 px-4 text-sm font-normal text-text-light">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((trip) => (
            <tr key={trip._id} className="border-b border-secondary/30 hover:bg-bg-dark transition-colors">
              
              {/* Driver */}
              <td className="py-3 px-4">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-text/60" />
                  <div>
                    <div className="text-text-light font-medium">
                      {trip.driverId?.firstName} {trip.driverId?.lastName}
                    </div>
                    <div className="text-xs text-text">
                      {trip.driverId?.phone}
                    </div>
                  </div>
                </div>
              </td>

              {/* Route */}
              <td className="py-3 px-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-text/60 flex-shrink-0" />
                  <div className="text-sm text-text-light truncate max-w-[200px]" title={`${trip.startLocation} → ${trip.endLocation}`}>
                    {formatRoute(trip.startLocation, trip.endLocation)}
                  </div>
                </div>
              </td>

              {/* Date */}
              <td className="py-3 px-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-text/60" />
                  <div className="text-sm text-text-light">
                    {formatDate(trip.startDate)}
                  </div>
                </div>
              </td>

              {/* Vehicle */}
              <td className="py-3 px-4">
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-text/60" />
                  <div className="text-sm">
                    <div className="text-text-light font-medium">
                      {trip.truckId?.plateNumber}
                    </div>
                    <div className="text-xs text-text">
                      + Trailer: {trip.trailerId?.plateNumber}
                    </div>
                  </div>
                </div>
              </td>

              {/* Status */}
              <td className="py-3 px-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(trip.status)}`}>
                  {trip.status}
                </span>
              </td>

              {/* Actions */}
              <td className="py-3 px-4">
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={Edit2}
                    onClick={() => onEdit(trip)}
                    className="hover:text-accent"
                  />
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={Trash2}
                    onClick={() => onDelete(trip._id)}
                    className="hover:text-error"
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TripTable;