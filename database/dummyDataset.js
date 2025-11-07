const dummyDataset = () => {
    return data = {
        "avg_speed": 50,
        "autonomy_factor": 0.9,
        "base_weight": 20000,
        "base_km": 98550,
        "compresor_eficiency_factor": 0.8,      //this is in env.js
        "cell_fuel_eficiency_factor": 0.6,      //this is in env.js
        "checked_percentage": 0.05,
        "cell_fuel_eficiency_factor": 0.54,
        "compresor_eficiency_factor": 0.95,     //  this is in env.js
        "combustion_engine_efficiency": 0.27,
        "diesel_energy": 40.7,
        "electrolysis_eficiency_factor": 0.76,  //this is in env.js
        "emision_factor_gasoline": 69.25,
        "emision_factor_diesel": 74.01,
        "gasoline_energy": 35.58,
        "hydrogen_energy_density": 33.33,  // this is in env.js
        "km_checked": 200000,
        "nox_reduction_factor": 0.9,
        "old_tree": 30,                  // this is in env.js
        "operation_factor": 0.9,
        "percentage_consumption_savings": 0.1,
        "percentage_urea_consumption": 0.07,
        "water_h2_weight": 9,           // this is in env.js
        "young_tree": 10,               // this is in env.js
        
        // defaults 4 calcs
        "nominal_energy": 8.14,
        "autonomy_nominal": 14.7,
        "energy_price": 978.81,
        "annual_use": 10000  // example annual use in km
    };
};

module.exports = {
    dummyDataset
};