import React from 'react';
import { COLORS } from '../../../../constants';
import ArrowRightIcon from '../../../../assets/arrow_right.svg';
import PlugIcon from '../../../../assets/plug.svg';
import { FiEdit2 } from 'react-icons/fi';

const filterMap = {
  'reserved': 'invert(73%) sepia(91%) saturate(617%) hue-rotate(358deg) brightness(101%) contrast(101%)',   // approx #ff3b30
  'in-use': 'invert(47%) sepia(95%) saturate(5663%) hue-rotate(201deg) brightness(101%) contrast(101%)',  // approx #F5B223
  'available': 'iinvert(55%) sepia(93%) saturate(747%) hue-rotate(116deg) brightness(95%) contrast(102%)', // approx #00b894
  'unavailable': 'invert(55%) sepia(0%) saturate(0%) hue-rotate(152deg) brightness(70%) contrast(87%)'       // approx #959595
};

const statusColors = {
    'in-use': COLORS.chargerFree,
    'reserved': COLORS.star,
    'available': COLORS.primary, 
    'unavailable': COLORS.secondaryText,
    'processing': COLORS.primary,
    'open': COLORS.primary,
    'to_be_installed': COLORS.star,
    'rejected': COLORS.danger,
    'disabled_by_SO': COLORS.danger,
};

// Status text mapping
const statusText = {
  'processing': 'Processing',
  'available': 'Charger Free',
  'unavailable': 'Unavailable',
  'open': 'Open',
  'to_be_installed': 'To be Installed',
  'rejected': 'Rejected',
};

const connectorStatusColors = {
  'in-use': COLORS.chargerFree,
  'reserved': COLORS.star,
  'available': COLORS.primary, 
  'unavailable': COLORS.secondaryText,
  'processing': COLORS.primary,
  'open': COLORS.primary,
  'to_be_installed': COLORS.star,
  'rejected': COLORS.danger,
  'disabled_by_SO': COLORS.danger,
};

const ConnectorCard = ({
    name,
    type,
    price = 'N/A',
    connectors,
    connectorStateColors =  connectorStatusColors,
    typeColor = COLORS.secondaryText,
    onClick,
    onEdit,
    status = 'unavailable', // Default status
}) => {
    return (
        <div 
            className="p-3 rounded-lg bg-white relative cursor-pointer
                        transition-all duration-300 ease-in-out
                       hover:shadow-md hover:bg-white" 
            onClick={onClick}
        >
            {/* Edit button */}
            {onEdit && (
                <button 
                    className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100 z-10"
                    onClick={(e) => {
                        e.stopPropagation();
                        onEdit();
                    }}
                    style={{ color: COLORS.secondaryText }}
                >
                    <FiEdit2 size={16} />
                </button>
            )}

            <div className="flex justify-between items-start">
                <div className="flex-1 gap-4">
                    <p className="text-sm font-medium mb-1" style={{ color: COLORS.mainTextColor }}>
                        {name}
                    </p>
                    <p className="text-xs mb-0 font-normal" style={{ color: typeColor }}>
                        {type}
                    </p>
                    <p className="text-xs mb-2" style={{ color: COLORS.secondaryText }}>
                        LKR {price} /kWh
                    </p>
                    <div 
                        className="px-2 py-1 rounded-full text-xs mt-2 w-fit"
                        style={{ 
                            backgroundColor: `${statusColors[status] || COLORS.secondaryText}20`,
                            color: statusColors[status] || COLORS.secondaryText
                        }}
                    >
                        {statusText[status] || status}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                        {connectors.map((connector, i) => {
                            const color = connectorStateColors[connector.status] || COLORS.secondaryText;
                             const filter = filterMap[connector.status] || 'none';

                            return(
                                <span
                                    key={i}
                                    className="px-2 py-1 text-xs rounded flex items-center gap-1"
                                    style={{
                                        backgroundColor: `${color}10`,
                                        color: color,
                                        border: `1px solid ${color}`
                                    }}
                                >
                                    <img
                                        src={PlugIcon}
                                        alt=""
                                        className="w-5 h-5"
                                        style={{
                                            filter: filter,
                                        }}
                                    />
                                    {connector.name}
                                </span>
                            );
                        })}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ConnectorCard;