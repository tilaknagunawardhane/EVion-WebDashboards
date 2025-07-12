import React from 'react';
import { COLORS } from '../../../../constants';
import ArrowRightIcon from '../../../../assets/arrow_right.svg';
import PlugIcon from '../../../../assets/plug.svg';

const filterMap = {
  'reserved': 'invert(37%) sepia(90%) saturate(7481%) hue-rotate(345deg) brightness(92%) contrast(101%)',   // approx #ff3b30
  'in-use': 'invert(48%) sepia(82%) saturate(392%) hue-rotate(136deg) brightness(96%) contrast(92%)',  // approx #F5B223
  'free': 'invert(35%) sepia(93%) saturate(2413%) hue-rotate(189deg) brightness(96%) contrast(101%)',        // approx #00b894
  'disabled': 'invert(55%) sepia(0%) saturate(0%) hue-rotate(152deg) brightness(70%) contrast(87%)',       // approx #959595
};

const ConnectorCard = ({
    name,
    type,
    connectors,
    connectorStateColors,
    typeColor = COLORS.secondaryText
}) => {
    return (
        <div className="p-3 rounded-lg bg-white relative">
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <p className="text-sm font-medium mb-1" style={{ color: COLORS.mainTextColor }}>
                        {name}
                    </p>
                    <p className="text-xs mb-5" style={{ color: typeColor }}>
                        {type}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
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
                                    {/* <PlugIcon
                                        style={{
                                            width: '18px',
                                            height: '18px',
                                            fill: color
                                        }}
                                    /> */}
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
                <div className="absolute right-4 top-4">
                    <img
                        src={ArrowRightIcon}
                        alt=""
                        style={{ 
                            width: '15px', 
                            height: '15px',
                            filter: `invert(48%) sepia(13%) saturate(320%) hue-rotate(174deg) brightness(90%) contrast(90%)`
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default ConnectorCard;