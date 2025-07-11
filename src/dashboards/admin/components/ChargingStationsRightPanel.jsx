import React from 'react';
import { COLORS, FONTS } from '../../../constants';
import Button from '../../../components/ui/Button';
import RequestCard from '../components/RequestCard';
import OverviewCard from '../components/OverviewCard';
import StationsIcon from '../../../assets/stations.svg'
import ConnectorsIcon from '../../../assets/connectors.svg'
import { useNavigate } from 'react-router-dom';

export default function ChargingStationsRightPanel({ stations, requests }) {
  const navigate = useNavigate();
  // Summary data
  const total = stations?.length || 2;
  const active = stations?.filter(s => s.status === 'Active').length || 1;
  const disabled = stations?.filter(s => s.status === 'Disabled').length || 1;
  const totalRevenue = stations?.reduce((sum, s) => sum + parseFloat(s.revenue.replace(/[^0-9.]/g, '')), 0) || 20500;

  // Request data
  const chargingStationRequests = requests?.filter(r => r.type === 'station') || [];
  const connectorRequests = requests?.filter(r => r.type === 'connector') || [];
  const newRequests = requests?.filter(r => r.status === 'new') || [];

  const renderGreenIcon = (IconComponent) => (
    <img
      src={IconComponent}
      alt=""
      className="w-5 h-5"
      style={{
        filter: `
        brightness(0) 
        saturate(100%) 
        invert(67%) 
        sepia(48%) 
        saturate(718%) 
        hue-rotate(123deg) 
        brightness(95%) 
        contrast(101%)
      `, // This filter converts black to #00b894 green
      }}
    />
  );

  return (
    <div
      className="rounded-xl border bg-white min-h-[300px] p-3 flex flex-col gap-6 shadow-sm"
      style={{
        borderColor: COLORS.stroke,
        background: COLORS.background,
        fontFamily: FONTS.family.sans,
      }}
    >

      <div>
        <OverviewCard>
          <div className="flex flex-col gap-6 mb-2">
            {/* Stations Section */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 flex items-center justify-center rounded-lg" style={{ backgroundColor: COLORS.bgGreen }}>
                    {renderGreenIcon(StationsIcon)}
                  </div>
                  <div style={{ color: COLORS.mainTextColor, fontSize: FONTS.sizes.base, fontWeight: FONTS.weights.semibold }}>Charging Stations</div>
                </div>
              </div>
              <div className="grid grid-rows-2 mt-2">
                <div className="flex justify-between items-center mb-2">
                  <div style={{ fontSize: FONTS.sizes.sm, color: COLORS.secondaryText }}>New Requests</div>
                  <div style={{ fontSize: FONTS.sizes.sm, fontWeight: FONTS.weights.medium }}>{chargingStationRequests.filter(r => r.status === 'new').length}</div>
                </div>
                <div className="flex justify-between items-center">
                  <div style={{ fontSize: FONTS.sizes.sm, color: COLORS.secondaryText }}>Under Review</div>
                  <div style={{ fontSize: FONTS.sizes.sm, fontWeight: FONTS.weights.medium }}>{chargingStationRequests.filter(r => r.status === 'review').length}</div>
                </div>
              </div>
            </div>

            {/* Divider - moved outside the stations div */}
            <div style={{ width: '100%', height: '1px', backgroundColor: COLORS.stroke, margin: '2px 0' }}></div>

            {/* Connectors Section */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 flex items-center justify-center rounded-lg" style={{ backgroundColor: COLORS.bgGreen }}>
                    {renderGreenIcon(ConnectorsIcon)}
                  </div>
                  <div style={{ color: COLORS.mainTextColor, fontSize: FONTS.sizes.base, fontWeight: FONTS.weights.semibold }}>Connectors</div>
                </div>
              </div>
              <div className="grid grid-rows-2 mt-2">
                <div className="flex justify-between items-center mb-2">
                  <div style={{ fontSize: FONTS.sizes.sm, color: COLORS.secondaryText }}>New Requests</div>
                  <div style={{ fontSize: FONTS.sizes.sm, fontWeight: FONTS.weights.medium }}>{connectorRequests.filter(r => r.status === 'new').length}</div>
                </div>
                <div className="flex justify-between items-center">
                  <div style={{ fontSize: FONTS.sizes.sm, color: COLORS.secondaryText }}>Under Review</div>
                  <div style={{ fontSize: FONTS.sizes.sm, fontWeight: FONTS.weights.medium }}>{connectorRequests.filter(r => r.status === 'review').length}</div>
                </div>
              </div>
            </div>
          </div>
        </OverviewCard>

        <Button
          variant="primary"
          type="button"
          size="base"
          style={{
            backgroundColor: COLORS.primary,  // Green background
            color: COLORS.mainTextColor,      // Text color
            borderColor: COLORS.stroke,       // Border color
            padding: '2px 8px',               // Custom padding
            // Add any other custom styles here
          }}
          className='mt-4 w-full'
          onClick={() => navigate('/admin/requests')}
        >
          View all requests
        </Button>


        <div>
          <div style={{ width: '100%', height: '1px', backgroundColor: COLORS.stroke, margin: '20px 0 20px' }}></div>
          <h4 style={{
            fontSize: FONTS.sizes.base,
            fontWeight: FONTS.weights.semibold,
            color: COLORS.mainTextColor,
            marginBottom: '18px'
          }}>
            New Requests
          </h4>

          <div className="space-y-3">
            {newRequests.slice(0, 3).map((request, index) => (
              <RequestCard key={index} request={request} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}