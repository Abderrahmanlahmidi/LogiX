import { useState } from "react";
import { useSelector } from "react-redux";
import { tripApi } from "../../../services/apis/admin/tripApi";
import { useQuery } from "@tanstack/react-query";
import {
  MapPin,
  Calendar,
  Truck,
  Package,
  Fuel,
  ChevronRight,
  Navigation,
  Flag,
  AlertCircle,
  Download,
  FileText,
  PlayCircle,
  CheckCircle,
  Clock,
  Ban
} from "lucide-react";
import Button from "../../../components/ui/buttons/Button";
import TripStats from "../components/tripStats";
import { generateTripPDF } from "../../../services/tripPdfService";

export default function Tracking() {
  const driverId = useSelector((state) => state.auth.user.userId);
  const [selectedTrip, setSelectedTrip] = useState(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["driverTrips", driverId],
    queryFn: () => tripApi.getTripsByDriver(driverId),
    enabled: !!driverId,
  });

  const trips = data?.data || [];

  const getStatusConfig = (status) => {
    switch (status) {
      case "active":
        return {
          color: "bg-green-500",
          textColor: "text-green-400",
          bgColor: "bg-green-500/10",
          icon: PlayCircle,
          label: "In Progress",
        };
      case "done":
        return {
          color: "bg-blue-500",
          textColor: "text-blue-400",
          bgColor: "bg-blue-500/10",
          icon: CheckCircle,
          label: "Completed",
        };
      case "pending":
        return {
          color: "bg-yellow-500",
          textColor: "text-yellow-400",
          bgColor: "bg-yellow-500/10",
          icon: Clock,
          label: "Scheduled",
        };
      case "canceled":
        return {
          color: "bg-red-500",
          textColor: "text-red-400",
          bgColor: "bg-red-500/10",
          icon: Ban,
          label: "Canceled",
        };
      default:
        return {
          color: "bg-gray-500",
          textColor: "text-gray-400",
          bgColor: "bg-gray-500/10",
          icon: AlertCircle,
          label: "Unknown",
        };
    }
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleExportPDF = (trip) => {
    generateTripPDF(trip)
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-bg">
        <div className="text-center">
          <div className="h-12 w-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-light">Loading your trips...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-bg">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-error mx-auto mb-4" />
          <h3 className="text-xl font-medium text-text-light mb-2">
            Error Loading Trips
          </h3>
          <p className="text-text">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg">
      <div className="bg-bg border-b border-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-text-light">My Trips</h1>
              <p className="text-text mt-2">
                Track and manage your assigned trips
              </p>
            </div>
            <div className="flex items-center gap-3 bg-bg border border-secondary rounded-lg px-4 py-2">
              <Navigation className="h-5 w-5 text-accent" />
              <div>
                <div className="text-xs text-text">Total Trips</div>
                <div className="text-lg font-semibold text-text-light">
                  {trips.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        {trips.length === 0 ? (
          <div className="text-center py-16 bg-bg border border-secondary rounded-lg">
            <MapPin className="h-16 w-16 text-text/40 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-text-light mb-2">
              No Trips Assigned
            </h3>
            <p className="text-text">You don't have any trips scheduled yet</p>
          </div>
        ) : (
          <>
            <TripStats trips={trips} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {trips.map((trip) => {
                const statusConfig = getStatusConfig(trip.status);
                const StatusIcon = statusConfig.icon;

                return (
                  <div
                    key={trip._id}
                    className="bg-bg border border-secondary rounded-lg overflow-hidden hover:border-accent/50 transition-colors"
                  >
                    <div className="p-4 border-b border-secondary bg-bg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-2 rounded-lg ${statusConfig.bgColor}`}
                          >
                            <div
                              className={`h-5 w-5 ${statusConfig.textColor}`}
                            >
                              <StatusIcon
                                className={`h-5 w-5 ${statusConfig.textColor}`}
                              />
                            </div>
                          </div>
                          <div>
                            <h3 className="font-medium text-text-light">
                              Trip #{trip._id?.substring(0, 8)}
                            </h3>
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full ${statusConfig.bgColor} ${statusConfig.textColor}`}
                            >
                              {statusConfig.label}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            icon={FileText}
                            onClick={() => handleExportPDF(trip)}
                            className="text-text hover:text-accent"
                            title="Export Trip Report as PDF"
                          />
                          <ChevronRight className="h-5 w-5 text-text/60" />
                        </div>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="mb-4">
                        <div className="flex items-center gap-2 text-sm text-text mb-2">
                          <MapPin className="h-4 w-4" />
                          <span>Route</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-text-light font-medium">
                            {trip.startLocation}
                          </div>
                          <div className="flex-1 mx-4 border-t border-secondary"></div>
                          <div className="text-text-light font-medium">
                            {trip.endLocation}
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex items-center gap-2 text-sm text-text mb-2">
                          <Calendar className="h-4 w-4" />
                          <span>Schedule</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-bg border border-secondary rounded p-3">
                            <div className="text-xs text-text">Start</div>
                            <div className="text-sm text-text-light">
                              {formatDateTime(trip.startDate)}
                            </div>
                          </div>
                          {trip.endDate && (
                            <div className="bg-bg border border-secondary rounded p-3">
                              <div className="text-xs text-text">End</div>
                              <div className="text-sm text-text-light">
                                {formatDateTime(trip.endDate)}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex items-center gap-2 text-sm text-text mb-2">
                          <Truck className="h-4 w-4" />
                          <span>Vehicles</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-bg border border-secondary rounded p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <Truck className="h-3 w-3 text-text/60" />
                              <div className="text-xs text-text">Truck</div>
                            </div>
                            <div className="text-sm text-text-light">
                              {trip.truckId?.plateNumber || "N/A"}
                            </div>
                          </div>
                          <div className="bg-bg border border-secondary rounded p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <Package className="h-3 w-3 text-text/60" />
                              <div className="text-xs text-text">Trailer</div>
                            </div>
                            <div className="text-sm text-text-light">
                              {trip.trailerId?.plateNumber || "N/A"}
                            </div>
                          </div>
                        </div>
                      </div>

                      {trip.fuelLiters && (
                        <div>
                          <div className="flex items-center gap-2 text-sm text-text mb-2">
                            <Fuel className="h-4 w-4" />
                            <span>Fuel Consumption</span>
                          </div>
                          <div className="bg-bg border border-secondary rounded p-3">
                            <div className="text-text-light font-medium">
                              {trip.fuelLiters} liters
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="mt-4 pt-4 border-t border-secondary">
                        <Button
                          variant="outline"
                          size="sm"
                          icon={Download}
                          onClick={() => handleExportPDF(trip)}
                          fullWidth
                          className="gap-2"
                        >
                          <FileText className="h-4 w-4" />
                          Export Trip Report
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {selectedTrip && (
              <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                <div className="bg-bg border border-secondary rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
                  <div className="p-4 border-b border-secondary flex items-center justify-between">
                    <h3 className="text-lg font-medium text-text-light">
                      Trip Details
                    </h3>
                    <button
                      onClick={() => setSelectedTrip(null)}
                      className="text-text hover:text-text-light"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="p-4">
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-text mb-1">Status</div>
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 text-green-400">
                            {/* Status icon */}
                          </div>
                          <span className="text-text-light font-medium">
                            {getStatusConfig(selectedTrip.status).label}
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-text mb-1">Route</div>
                        <div className="text-text-light">
                          <div className="flex items-center gap-2">
                            <Flag className="h-4 w-4 text-accent" />
                            <span>{selectedTrip.startLocation}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <Flag className="h-4 w-4 text-green-400" />
                            <span>{selectedTrip.endLocation}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-text mb-1">Schedule</div>
                        <div className="text-text-light">
                          <div>
                            Start: {formatDateTime(selectedTrip.startDate)}
                          </div>
                          <div>
                            End:{" "}
                            {selectedTrip.endDate
                              ? formatDateTime(selectedTrip.endDate)
                              : "Not set"}
                          </div>
                        </div>
                      </div>
                      {selectedTrip.remarks && (
                        <div>
                          <div className="text-sm text-text mb-1">Remarks</div>
                          <div className="bg-bg-dark border border-secondary rounded p-3 text-text-light">
                            {selectedTrip.remarks}
                          </div>
                        </div>
                      )}
                      <div className="pt-4 border-t border-secondary">
                        <Button
                          variant="accent"
                          icon={Download}
                          onClick={() => handleExportPDF(selectedTrip)}
                          fullWidth
                          className="gap-2"
                        >
                          <FileText className="h-4 w-4" />
                          Download Trip Report PDF
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
