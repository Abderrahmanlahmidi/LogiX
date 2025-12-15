
import { 
  PlayCircle, 
  CheckCircle, 
  Clock, 
  Ban,
  Navigation
} from 'lucide-react';

const TripStats = ({ trips = [] }) => {
  if (!trips || trips.length === 0) {
    return null;
  }

  const stats = {
    total: trips.length,
    active: trips.filter(t => t.status === "active").length,
    done: trips.filter(t => t.status === "done").length,
    pending: trips.filter(t => t.status === "pending").length,
    canceled: trips.filter(t => t.status === "canceled").length
  };

  return (
    <div className="px-6 py-4">
      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        

{/* Total Trips - with violet/purple theme */}
<div className="bg-teal-900/10 border border-teal-800/30 rounded-lg p-4">
  <div className="flex items-center gap-3">
    <div className="p-2 bg-teal-900/20 rounded-lg">
      <Navigation className="h-5 w-5 text-teal-400" />
    </div>
    <div>
      <div className="text-sm text-teal-300">Total Trips</div>
      <div className="text-2xl font-bold text-teal-400">
        {stats.total}
      </div>
    </div>
  </div>
</div>
        {/* Active Trips */}
        <div className="bg-green-900/10 border border-green-800/30 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-900/20 rounded-lg">
              <PlayCircle className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <div className="text-sm text-green-300">Active</div>
              <div className="text-2xl font-bold text-green-400">
                {stats.active}
              </div>
            </div>
          </div>
        </div>

        {/* Completed */}
        <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-900/20 rounded-lg">
              <CheckCircle className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <div className="text-sm text-blue-300">Completed</div>
              <div className="text-2xl font-bold text-blue-400">
                {stats.done}
              </div>
            </div>
          </div>
        </div>

        {/* Scheduled */}
        <div className="bg-yellow-900/10 border border-yellow-800/30 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-900/20 rounded-lg">
              <Clock className="h-5 w-5 text-yellow-400" />
            </div>
            <div>
              <div className="text-sm text-yellow-300">Scheduled</div>
              <div className="text-2xl font-bold text-yellow-400">
                {stats.pending}
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
      </div>
    </div>
  );
};

export default TripStats;