import React from 'react';
import { 
  Clock, 
  PlayCircle, 
  CheckCircle, 
  Ban,
  Wrench,
  DollarSign
} from 'lucide-react';

const MaintenanceStats = ({ maintenanceRecords = [] }) => {
  if (!maintenanceRecords || maintenanceRecords.length === 0) {
    return null;
  }

  const stats = {
    total: maintenanceRecords.length,
    pending: maintenanceRecords.filter(m => m.status === "pending").length,
    inProgress: maintenanceRecords.filter(m => m.status === "in_progress").length,
    done: maintenanceRecords.filter(m => m.status === "done").length,
    canceled: maintenanceRecords.filter(m => m.status === "canceled").length,
    totalCost: maintenanceRecords.reduce((acc, m) => acc + (m.cost || 0), 0),
    upcoming: maintenanceRecords.filter(m => {
      const date = new Date(m.date);
      const now = new Date();
      const sevenDaysFromNow = new Date(now.setDate(now.getDate() + 7));
      return date > new Date() && date <= sevenDaysFromNow && m.status === 'pending';
    }).length,
  };

  return (
    <div className="px-6 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
        
        {/* Total Maintenance */}
        <div className="bg-teal-900/10 border border-teal-800/30 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-teal-900/20 rounded-lg">
              <Wrench className="h-5 w-5 text-teal-400" />
            </div>
            <div>
              <div className="text-sm text-teal-300">Total Records</div>
              <div className="text-2xl font-bold text-teal-400">
                {stats.total}
              </div>
            </div>
          </div>
        </div>

        {/* Pending */}
        <div className="bg-yellow-900/10 border border-yellow-800/30 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-900/20 rounded-lg">
              <Clock className="h-5 w-5 text-yellow-400" />
            </div>
            <div>
              <div className="text-sm text-yellow-300">Pending</div>
              <div className="text-2xl font-bold text-yellow-400">
                {stats.pending}
              </div>
            </div>
          </div>
        </div>

        {/* In Progress */}
        <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-900/20 rounded-lg">
              <PlayCircle className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <div className="text-sm text-blue-300">In Progress</div>
              <div className="text-2xl font-bold text-blue-400">
                {stats.inProgress}
              </div>
            </div>
          </div>
        </div>

        {/* Done */}
        <div className="bg-green-900/10 border border-green-800/30 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-900/20 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <div className="text-sm text-green-300">Completed</div>
              <div className="text-2xl font-bold text-green-400">
                {stats.done}
              </div>
            </div>
          </div>
        </div>

        {/* Canceled */}
        <div className="bg-red-900/10 border border-red-800/30 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-900/20 rounded-lg">
              <Ban className="h-5 w-5 text-red-400" />
            </div>
            <div>
              <div className="text-sm text-red-300">Canceled</div>
              <div className="text-2xl font-bold text-red-400">
                {stats.canceled}
              </div>
            </div>
          </div>
        </div>

        {/* Total Cost */}
        <div className="bg-indigo-900/10 border border-indigo-800/30 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-900/20 rounded-lg">
              <DollarSign className="h-5 w-5 text-indigo-400" />
            </div>
            <div>
              <div className="text-sm text-indigo-300">Total Cost</div>
              <div className="text-2xl font-bold text-indigo-400">
                ${stats.totalCost.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceStats;