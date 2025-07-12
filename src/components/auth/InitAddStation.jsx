import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout'
import { COLORS, FONTS } from '../../constants'
import Button from '../ui/Button';
import InputField from '../ui/InputField';
import { FiEdit, FiMessageCircle } from 'react-icons/fi';
import stationImage from '../../assets/cuate.svg'
import AddChargingStationForm from '../ui/AddStationForm';

export default function InitAddStation() {
    const [showForm, setShowForm] = useState(false);
    const [stations, setStations] = useState([]);
    
    // const [errors, setErrors] = useState({});

    return (
        <Layout>
        <div className="text-center py-8">
            <div className="flex w-full justify-center">
                <img src={stationImage} alt="Dashboard" className="w-auto h-72 object-cover rounded-lg" />
            </div>
            
            <h1 
            className="mb-0"
            style={{
                font: FONTS.weights.normal,
                fontSize: FONTS.sizes['4xl'],
                color: COLORS.mainTextColor
            }}
            >
            Hello Adeesha!
            </h1>
            <p 
            className="max-w-md mx-auto md:max-w-3xl mb-12"
            style={{
                font: FONTS.weights.normal,
                fontSize: FONTS.sizes.base,
                color: COLORS.secondaryText
            }}
            >
            Now you can add your charging station.
            </p>
            <div className="flex-column justify-center items-center">
                <Button variant="primary" type="button" onClick={ () => setShowForm(true)}>
                    Add Charging Station
                </Button>
                <p 
                className="mt-4 underline" 
                style={{ 
                    font: FONTS.weights.normal,
                    fontSize: FONTS.sizes.xs,
                    color: COLORS.secondaryText,
                }}
                >
                Installation Process & Charges
                </p>
            </div>
            {/* Chat Icon */}
            <button className="fixed flex gap-1 bottom-6 right-6 bg-white shadow-lg p-4 rounded-full" style={{ backgroundColor: COLORS.primary}}>
                <FiMessageCircle size={24} color={COLORS.background} />
                <span style={{ color: COLORS.background }}>Chat</span>
            </button>
        </div>

        {/* Modal Form */}
            {showForm && (
            <AddChargingStationForm
                onClose={() => setShowForm(false)}
                onSubmit={(newStation) => {
                setStations((prev) => [...prev, newStation]);
                }}
            />
            )}
        </Layout>
    )
}