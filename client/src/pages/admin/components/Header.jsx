import { ChevronLeft, Plus, Filter, Download, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/buttons/Button';

export default function Header({ 
  title = "Dashboard",
  subtitle = "", 
  showBackButton = false,
  showCreateButton = false,
  showFilterButton = false,
  showExportButton = false,
  showSearch = false,
  onCreateClick = () => {},
  onFilterClick = () => {},
  onExportClick = () => {},
  onSearchChange = () => {},
  searchPlaceholder = "Search...",
}) {
  const navigate = useNavigate();

  return (
    <div className="bg-bg border-b border-secondary p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Top Row - Title & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          {/* Left Side - Title, Subtitle & Back Button */}
          <div>
            <div className="flex items-center gap-3 mb-1">
              {showBackButton && (
                <button
                  onClick={() => navigate(-1)}
                  className="p-2 text-text hover:text-text-light hover:bg-bg-dark rounded transition-colors"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
              )}
              
              <h1 className="text-2xl font-normal text-text-light">
                {title}
              </h1>
            </div>
            
            {/* Subtitle */}
            {subtitle && (
              <p className="text-text text-sm ">
                {subtitle}
              </p>
            )}
          </div>

          {/* Right Side - Action Buttons */}
          <div className="flex flex-wrap gap-2">
            {showSearch && (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text/60" />
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  onChange={onSearchChange}
                  className="pl-9 pr-3 py-2 bg-bg border border-secondary rounded text-text-light text-sm focus:outline-none focus:border-accent"
                />
              </div>
            )}

            {showFilterButton && (
              <Button
                variant="outline"
                size="sm"
                icon={Filter}
                onClick={onFilterClick}
              >
                Filter
              </Button>
            )}

            {showExportButton && (
              <Button
                variant="outline"
                size="sm"
                icon={Download}
                onClick={onExportClick}
              >
                Export
              </Button>
            )}

            {showCreateButton && (
              <Button
                variant="accent"
                size="sm"
                icon={Plus}
                onClick={onCreateClick}
              >
                Create New
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}