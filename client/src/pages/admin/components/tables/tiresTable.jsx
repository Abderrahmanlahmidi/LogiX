import { Edit2, Trash2, Truck, Package } from 'lucide-react';
import Button from '../../../../components/ui/buttons/Button';


const TiresTable = ({ 
  data = [],
  onEdit = () => {},
  onDelete = () => {},
  isLoading = false
}) => {
  const getInstalledOnIcon = (type) => {
    return type === 'truck' ? Truck : Package;
  };

  const getWearLevelColor = (wearLevel) => {
    switch (wearLevel) {
      case 'new': return 'text-success';
      case 'good': return 'text-success';
      case 'fair': return 'text-warning';
      case 'poor': return 'text-warning';
      case 'replace': return 'text-error';
      default: return 'text-text';
    }
  };

  const formatSerialNumber = (num) => {
    return num?.toLocaleString() || 'N/A';
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
        <h3 className="text-lg font-normal text-text-light mb-2">No Tires Found</h3>
        <p className="text-text">Add your first tire to get started</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-secondary">
            <th className="text-left py-3 px-4 text-sm font-normal text-text-light">Serial #</th>
            <th className="text-left py-3 px-4 text-sm font-normal text-text-light">Wear Level</th>
            <th className="text-left py-3 px-4 text-sm font-normal text-text-light">Position</th>
            <th className="text-left py-3 px-4 text-sm font-normal text-text-light">Installed On</th>
            <th className="text-left py-3 px-4 text-sm font-normal text-text-light">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((tire) => {
            const InstalledOnIcon = getInstalledOnIcon(tire.installedOn);
            
            return (
              <tr key={tire._id || tire.id} className="border-b border-secondary/30 hover:bg-bg-dark">
                {/* Serial Number */}
                <td className="py-3 px-4">
                  <div className="font-medium text-text-light">
                    {formatSerialNumber(tire.serialNumber)}
                  </div>
                </td>

                {/* Wear Level */}
                <td className="py-3 px-4">
                  <div className={`inline-flex items-center gap-1.5 ${getWearLevelColor(tire.wearLevel)}`}>
                    <div className={`h-2 w-2 rounded-full ${getWearLevelColor(tire.wearLevel).replace('text-', 'bg-')}`}></div>
                    <span className="capitalize">{tire.wearLevel}</span>
                  </div>
                </td>

                {/* Position */}
                <td className="py-3 px-4">
                  <div className="text-text-light">
                    {tire.position || 'N/A'}
                  </div>
                </td>

                {/* Installed On */}
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <InstalledOnIcon className="h-4 w-4 text-accent" />
                    <span className="text-text capitalize">{tire.installedOn}</span>
                  </div>
                </td>

              

                {/* Actions */}
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={Edit2}
                      onClick={() => onEdit(tire)}
                      className="hover:text-accent"
                    />
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={Trash2}
                      onClick={() => onDelete(tire._id)}
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

export default TiresTable;