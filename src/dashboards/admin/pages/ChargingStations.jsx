import React from 'react';
import ChargingStationsTopBar from '../components/ChargingStationsTopBar';
import ChargingStationsTable from '../components/ChargingStationsTable';
import ChargingStationsRightPanel from '../components/ChargingStationsRightPanel';
import { COLORS, FONTS } from '../../../constants';
import NotificationsIcon from '../../../assets/notifications.svg';
import OverviewCard from '../components/OverviewCard';

export default function ChargingStations() {
    const [search, setSearch] = React.useState('');
    const [filter, setFilter] = React.useState({});
    const [sort, setSort] = React.useState('Date Joined');
    const [stations, setStations] = React.useState([]);

    return (
        <div style={{ 
            fontFamily: FONTS.family.sans, 
            padding: '24px',
        }}>
            {/* Header Section */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold" style={{ color: COLORS.mainTextColor }}>
                    Charging Stations Management
                </h1>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <img
                            src={NotificationsIcon}
                            alt="Notifications"
                            style={{
                                width: '24px',
                                height: '24px',
                                cursor: 'pointer'
                            }}
                        />
                        <span className="absolute top-0 right-0 w-2 h-2 rounded-full" 
                              style={{ backgroundColor: COLORS.primary }}></span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Left Side - 3/4 width */}
                <div className="lg:col-span-3">
                    {/* Search and Filter Bar */}
                    <div className="mb-6">
                        <ChargingStationsTopBar
                            search={search}
                            setSearch={setSearch}
                            filter={filter}
                            setFilter={setFilter}
                            sort={sort}
                            setSort={setSort}
                        />
                    </div>

                    <OverviewCard>
                    {/* Stations Table */}
                    <div className="bg-white rounded-sm shadow-sm overflow-hidden"
                         style={{
                             border: `1px solid ${COLORS.border}`,
                             boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.05)'
                         }}>
                        <ChargingStationsTable
                            stations={stations}
                            filter={filter}
                            sort={sort}
                            search={search}
                        />
                    </div>
                    </OverviewCard>
                </div>

                {/* Right Side - 1/4 width */}
                <div className="lg:col-span-1">
                    <div className="sticky top-6 space-y-6">
                        <ChargingStationsRightPanel stations={stations} />
                    </div>
                </div>
            </div>
        </div>
    );
}