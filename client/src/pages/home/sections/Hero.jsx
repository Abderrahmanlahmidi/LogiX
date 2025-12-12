import {
  Navigation,
  MapPin,
  Zap,
  Clock,
  Truck,
  Target,
} from "lucide-react";
import Button from "../../../components/ui/buttons/Button";
import { stats, otherStats } from "../../../constants/HeroConstants";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden mt-[64px]">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-bg opacity-90"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-bg-dark border border-secondary">
              <Target className="h-4 w-4 text-accent" />
              <span className="text-text-light text-sm font-medium">
                Enterprise Fleet Management
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium mb-6 leading-tight">
              <span className="text-text-light">
                Streamline Your
              </span>
              <br />
              <span className="text-accent">
                Truck Fleet Operations
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-text mb-8 max-w-2xl lg:max-w-none">
              Logix provides comprehensive tracking, fuel management, and
              maintenance solutions for modern truck fleets. Optimize
              efficiency, reduce costs, and enhance safety with our all-in-one
              platform.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="accent" size="lg" icon={Zap}>
                Start Free Trial
              </Button>
              <Button variant="outline" size="lg" icon={Clock}>
                Schedule Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0">
              {otherStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-2">
                    <stat.icon className="h-6 w-6 text-accent" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-medium text-accent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-text mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Dashboard Preview */}
          <div className="relative hidden lg:block">
            <div className="relative bg-bg-dark rounded-lg p-4 border border-secondary">
              {/* Dashboard UI Mockup */}
              <div className="space-y-4">
                {/* Top Bar */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-success" />
                    <span className="text-sm font-medium text-text-light">
                      Logix Dashboard
                    </span>
                  </div>
                  <div className="text-xs text-text flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-success"></div>
                    Live
                  </div>
                </div>

                {/* Map Area */}
                <div className="bg-bg rounded-md h-48 flex items-center justify-center border border-secondary">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-accent mb-2 mx-auto" />
                    <p className="text-sm text-text">
                      Real-time Fleet Tracking
                    </p>
                    <p className="text-xs text-text opacity-75 mt-1">
                      42 active vehicles
                    </p>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      className="bg-bg p-3 rounded-md"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <stat.icon className={`h-4 w-4 ${stat.color}`} />
                        <div className="text-xs text-text">
                          {stat.label}
                        </div>
                      </div>
                      <div className="text-lg font-medium text-text-light">
                        {stat.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-text">
            Scroll to explore
          </span>
          <Navigation className="h-5 w-5 text-accent" />
        </div>
      </div>
    </section>
  );
}