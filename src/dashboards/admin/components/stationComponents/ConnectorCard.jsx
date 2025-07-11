import React from 'react';
import { COLORS } from '../../../../constants';
import ArrowRightIcon from '../../../../assets/arrow_right.svg';
import PlugIcon from '../../../../assets/plug.svg';

const ConnectorCard = ({
    name,
    type,
    connectors,
    connectorColor = COLORS.primary,
    typeColor = COLORS.secondaryText
}) => {
    return (
        <div className="p-3 rounded-lg bg-white shadow-sm relative">
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <p className="text-sm font-medium mb-1" style={{ color: COLORS.mainTextColor }}>
                        {name}
                    </p>
                    <p className="text-xs mb-5" style={{ color: typeColor }}>
                        {type}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {connectors.map((connector, i) => (
                            <span
                                key={i}
                                className="px-2 py-1 text-xs rounded flex items-center gap-1"
                                style={{
                                    backgroundColor: `${connectorColor}10`,
                                    color: connectorColor,
                                    border: `1px solid ${connectorColor}`
                                }}
                            >
                                <img
                                    src={PlugIcon}
                                    alt=""
                                    className="w-5 h-5"
                                    style={{
                                        filter: `invert(48%) sepia(13%) saturate(320%) hue-rotate(174deg) brightness(90%) contrast(90%)`,
                                        // Adjust the filter to match your exact secondaryText color
                                        // This is a sample filter - you may need to adjust it
                                    }}
                                />
                                {connector}
                            </span>
                        ))}
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