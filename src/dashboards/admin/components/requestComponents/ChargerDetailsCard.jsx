import React from 'react';
import { COLORS, FONTS } from '../../../../constants';
import PlugIcon from '../../../../assets/plug.svg'

export default function ChargerDetails({ charger }) {
  return (
    <div className="rounded-lg p-4 mb-4 bg-white shadow-sm" style={{ 
      borderColor: COLORS.stroke,
      fontFamily: FONTS.family.sans 
    }}>
      <h4 className="font-medium mb-3" style={{ 
        color: COLORS.mainTextColor,
        fontSize: FONTS.sizes.sm
      }}>
        {charger.name || 'HyperCharge Dual-Port (DC Fast Charger)'}
      </h4>
      
      {/* Power Output Row */}
      <div className="flex justify-between items-baseline mb-3">
        <p className="text-xs" style={{ 
          color: COLORS.secondaryText,
          fontSize: FONTS.sizes.xs
        }}>
          Maximum Power Output
        </p>
        <div className="flex items-baseline">
          <span style={{
            color: COLORS.mainTextColor,
            fontSize: FONTS.sizes.sm,
            fontWeight: FONTS.weights.medium
          }}>
            {charger.power?.split(' ')[0] || '150'}
          </span>
          <span className="ml-1" style={{
            color: COLORS.mainTextColor,
            fontSize: FONTS.sizes.xs
          }}>
            kW
          </span>
        </div>
      </div>

      {/* Unit Price Row */}
      {/* <div className="flex justify-between items-baseline mb-3">
        <p className="text-xs" style={{ 
          color: COLORS.secondaryText,
          fontSize: FONTS.sizes.xs
        }}>
          Unit Price
        </p>
        <div className="flex items-baseline">
          <span className="text-xs mr-1" style={{
            color: COLORS.mainTextColor,
            fontSize: FONTS.sizes.xs
          }}>
            LKR
          </span>
          <span style={{
            color: COLORS.mainTextColor,
            fontSize: FONTS.sizes.sm,
            fontWeight: FONTS.weights.medium
          }}>
            {charger.price?.split(' ')[1] || '60.00'}
          </span>
        </div>
      </div> */}
      
      {/* Connector Types */}
      <div>
        
        <div className="flex flex-wrap gap-1">
          {charger.ports?.map((port, i) => (
            <span 
              key={i} 
              className="px-2 py-1 text-xs rounded-md flex items-center gap-1" 
              style={{ 
                border: `1px solid ${COLORS.primary}`,
                backgroundColor: `${COLORS.primary}10`,
                color: COLORS.primary,
                fontSize: FONTS.sizes.xs,
                fontWeight: FONTS.weights.semibold
              }}
            >
              <img 
                src={PlugIcon} 
                alt="" 
                className="w-5 h-5" 
                
              />
              {port}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}