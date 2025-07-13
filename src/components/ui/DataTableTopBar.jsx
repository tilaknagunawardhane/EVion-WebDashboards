import React, { useState } from 'react';
import { COLORS, FONTS } from '../../constants';
import SearchIcon from '../../assets/search_icon.svg';
import FilterIcon from '../../assets/filter_icon.svg';
import SortIcon from '../../assets/sort_icon.svg';
import ChevronDown from '../../assets/chevron_down.svg';
import ExportIcon from '../../assets/export_icon.svg';

export default function DataTableTopBar({
  search,
  setSearch,
  filter,
  setFilter,
  sort,
  setSort,
  filterOptions = [],
  sortOptions = [],
  searchPlaceholder = "Search...",
  showSearchBar = true, // New prop to control search bar visibility
  showExportButton = false,
  onExport = () => {}
}) {
  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 w-full mb-6">
      {/* Search Bar - Left Side (only shown if showSearchBar is true) */}
      {showSearchBar && (
        <div className="flex-grow max-w-2xl">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <img src={SearchIcon} alt="Search" className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder={searchPlaceholder}
              className="block w-full pl-10 pr-3 py-2.5 rounded-lg shadow-sm placeholder:text-gray-400 bg-white"
              style={{
                fontFamily: FONTS.family.sans,
                fontSize: FONTS.sizes.sm,
                color: COLORS.mainTextColor,
                fontWeight: FONTS.weights.normal,
              }}
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
      )}

      {/* Filter/Sort/Export Buttons - Right Side */}
      <div className="flex gap-3 w-full md:w-auto">
        {/* Filter Button */}
        {filterOptions.length > 0 && (
          <div className="relative flex-1 md:flex-none">
            <button
              className="flex items-center justify-between gap-2 w-full bg-white rounded-lg px-4 py-2.5 hover:bg-gray-50 transition-all duration-200 shadow-sm"
              onClick={() => {
                setShowFilter(v => !v);
                setShowSort(false);
              }}
            >
              <div className="flex items-center gap-2">
                <img src={FilterIcon} alt="Filter" className="w-5 h-5" />
                <span style={{
                  fontFamily: FONTS.family.sans,
                  fontSize: FONTS.sizes.sm,
                  color: COLORS.secondaryText,
                  fontWeight: FONTS.weights.medium,
                }}>
                  Filter
                </span>
              </div>
              <img
                src={ChevronDown}
                style={{ color: COLORS.primary }}
                alt=""
                className={`w-4 h-4 transition-transform duration-200 ${showFilter ? 'transform rotate-180' : ''}`}
              />
            </button>

            {showFilter && (
              <div className="absolute z-20 mt-2 right-0 w-56 bg-white rounded-lg shadow-lg divide-y divide-gray-100 overflow-hidden">
                <div className="px-4 py-2.5 bg-gray-50">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Filter By</p>
                </div>
                {filterOptions.map(opt => (
                  <button
                    key={opt.value}
                    className="w-full text-left px-4 py-3 hover:bg-emerald-50 transition-colors duration-150 flex items-center justify-between"
                    style={{
                      fontFamily: FONTS.family.sans,
                      fontSize: FONTS.sizes.sm,
                      color: COLORS.mainTextColor,
                      fontWeight: FONTS.weights.medium,
                    }}
                    onClick={() => {
                      setFilter(opt);
                      setShowFilter(false);
                    }}
                  >
                    {opt.label}
                    {filter?.value === opt.value && (
                      <span className="inline-block w-2 h-2 rounded-full" style={{backgroundColor: COLORS.primary}}></span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Sort Button */}
        {sortOptions.length > 0 && (
          <div className="relative flex-1 md:flex-none">
            <button
              className="flex items-center justify-between gap-2 w-full bg-white rounded-lg px-4 py-2.5 hover:bg-gray-50 transition-all duration-200 shadow-sm"
              onClick={() => {
                setShowSort(v => !v);
                setShowFilter(false);
              }}
            >
              <div className="flex items-center gap-2">
                <img src={SortIcon} alt="Sort" className="w-5 h-5" />
                <span style={{
                  fontFamily: FONTS.family.sans,
                  fontSize: FONTS.sizes.sm,
                  color: COLORS.secondaryText,
                  fontWeight: FONTS.weights.medium,
                }}>
                  Sort
                </span>
              </div>
              <img
                src={ChevronDown}
                alt=""
                className={`w-4 h-4 transition-transform duration-200 ${showSort ? 'transform rotate-180' : ''}`}
              />
            </button>

            {showSort && (
              <div className="absolute z-20 mt-2 right-0 w-56 bg-white rounded-lg shadow-lg divide-y divide-gray-100 overflow-hidden">
                <div className="px-4 py-2.5 bg-gray-50">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Sort By</p>
                </div>
                {sortOptions.map(opt => (
                  <button
                    key={opt.value}
                    className="w-full text-left px-4 py-3 hover:bg-emerald-50 transition-colors duration-150 flex items-center justify-between"
                    style={{
                      fontFamily: FONTS.family.sans,
                      fontSize: FONTS.sizes.sm,
                      color: COLORS.mainTextColor,
                      fontWeight: FONTS.weights.medium,
                    }}
                    onClick={() => {
                      setSort(opt.label);
                      setShowSort(false);
                    }}
                  >
                    {opt.label}
                    {sort === opt.label && (
                      <span className="inline-block w-2 h-2 rounded-full" style={{backgroundColor: COLORS.primary}}></span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Export Button */}
        {showExportButton && (
          <div className="relative flex-1 md:flex-none">
            <button
              className="flex items-center justify-center gap-2 w-full bg-white rounded-lg px-4 py-2.5 hover:bg-gray-50 transition-all duration-200 shadow-sm"
              onClick={onExport}
              style={{
                fontFamily: FONTS.family.sans,
                fontSize: FONTS.sizes.sm,
                color: COLORS.primary,
                fontWeight: FONTS.weights.medium,
              }}
            >
              <img src={ExportIcon} alt="Export" className="w-5 h-5" />
              <span>Export</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}