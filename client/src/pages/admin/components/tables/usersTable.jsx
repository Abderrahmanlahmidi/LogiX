import {User, Mail, Phone, Shield } from 'lucide-react';
import { DisplayImages } from '../../../../constants/DisplayImagesConstants';

const UsersTable = ({ 
  data = [],
  isLoading = false
}) => {

  const getRoleBadge = (roleName) => {
    const colors = {
      'admin': 'bg-error/10 text-error',
      'driver': 'bg-success/10 text-success',
      'manager': 'bg-info/10 text-info',
      'supervisor': 'bg-warning/10 text-warning'
    };
    
    const defaultColor = 'bg-bg-dark text-text';
    return colors[roleName?.toLowerCase()] || defaultColor;
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
        <User className="h-12 w-12 text-text/40 mx-auto mb-4" />
        <h3 className="text-lg font-normal text-text-light mb-2">No Users Found</h3>
        <p className="text-text">Add your first user to get started</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-secondary">
            <th className="text-left py-3 px-4 text-sm font-normal text-text-light">User</th>
            <th className="text-left py-3 px-4 text-sm font-normal text-text-light">Email</th>
            <th className="text-left py-3 px-4 text-sm font-normal text-text-light">Phone</th>
            <th className="text-left py-3 px-4 text-sm font-normal text-text-light">Role</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user._id} className="border-b border-secondary/30 hover:bg-bg-dark">
              
              <td className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full overflow-hidden bg-accent/20 flex items-center justify-center">
                    {user.profile ? (
                      <img 
                        src={DisplayImages(user.profile)}
                        alt={`${user.firstName} ${user.lastName}`}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML = '<User class="h-5 w-5 text-accent" />';
                        }}
                      />
                    ) : (
                      <User className="h-5 w-5 text-accent" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-text-light">
                      {user.firstName} {user.lastName}
                    </div>
                  </div>
                </div>
              </td>

              {/* Email */}
              <td className="py-3 px-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-text/60" />
                  <span className="text-sm text-text-light truncate max-w-[200px]">
                    {user.email}
                  </span>
                </div>
              </td>

              {/* Phone */}
              <td className="py-3 px-4">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-text/60" />
                  <span className="text-sm text-text-light">
                    {user.phone || 'N/A'}
                  </span>
                </div>
              </td>

              {/* Role */}
              <td className="py-3 px-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium capitalize ${getRoleBadge(user.roleId?.name)}`}>
                  <Shield className="h-3 w-3 mr-1.5" />
                  {user.roleId?.name || 'No Role'}
                </span>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;