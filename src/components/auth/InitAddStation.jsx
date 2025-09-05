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
            Hello Vishwani!
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
                <a href="https://docs.google.com/document/d/1nC-bu2dzJP0s9nWcWrtm-6IkaGVFCMEE6h_feuzeGy0/edit?usp=sharing" style={{ color: COLORS.primary }}>
                Installation Process & Charges
                </a>
                </p>
            </div>
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