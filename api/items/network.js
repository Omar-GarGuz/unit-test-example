const {Router} = require('express');
const response = require('../../network/response');
const dummyDataset = require('../database/dummyDataset');
const router = Router();
const ctrl = require('./index');
const {
    tiMonth,
    fuelEnergySelector, 
    electricalConsumption,
    costElectricalKM,
    combustionConsumption,
    fuelConsumption,
    fuelEfficiency,
    fuelCostKm,
    energyKm,
    emisionKm,
    savedEnergy,
    avoidedEmissions,
    monthlySavings,
    annualSavings,
    youngTree, 
    oldTree,
    energyH2Cylinders,
    energyH2LowPresure,
    energyConsumed,
    hydrogenMass,
    litersRequired
} = require('../../calculators/environment');
const tableInjected = 'my_table';
 
router.get('/environment/:ipc/:fes', async (req, res) => {
    try {
        let list = {};

        const ipc = tiMonth(parseFloat(req.params.ipc));
        const fes = fuelEnergySelector(req.params.fes);

        const electrical_consumption = electricalConsumption(dummyDataset[nominal_energy], dummyDataset[autonomy_nominal]);
        const cost_electrical_km = costElectricalKM(electrical_consumption, dummyDataset[energy_price]);
        const combustion_Consumption = combustionConsumption(electrical_consumption);
        const fuel_consumption = fuelConsumption(combustion_Consumption, fes[fuel_energy]);
        const fuel_Efficiency = fuelEfficiency(fuel_consumption);
        const fuel_cost_KM = fuelCostKm(fes[fuel_price], fuel_consumption);
        const energy_KM = energyKm(combustion_Consumption);
        const emision_KM = emisionKm(fes[emision_factor], energy_KM);
        const saved_energy = savedEnergy(combustion_Consumption, electrical_consumption, dummyDataset[annual_use]);
        const avoided_emissions = avoidedEmissions(emision_KM, dummyDataset[annual_use]);
        const monthly_savings = monthlySavings(fuel_cost_KM, cost_electrical_km, dummyDataset[annual_use]);
        const annual_savings = annualSavings(monthly_savings, ipc);
        const young_tree = await youngTree(avoided_emissions);
        const old_tree = await oldTree(avoided_emissions);
        const energy_H2_Cylinders = await energyH2Cylinders(dummyDataset[nominal_energy]);
        const energy_H2_Low_Presure = await energyH2LowPresure(energy_H2_Cylinders);
        const energy_consumed = await energyConsumed(energy_H2_Low_Presure);
        const hydrogen_mass = await hydrogenMass(energy_H2_Low_Presure);
        const liters_required = await litersRequired(hydrogen_mass);

        // populate list
        list["It_month"] = ipc;
        list["Fuel_energy_selector"] = fes;
        list["Electrical_consumption"] = electrical_consumption;
        list["Cost_electrical_KM"] = cost_electrical_km;
        list["Combustion_Consumption"] = combustion_Consumption;
        list["Fuel_Consumption"] = fuel_consumption;
        list["Fuel_Efficiency"] = fuel_Efficiency;
        list["Fuel_cost_KM"] = fuel_cost_KM;
        list["Energy_KM"] = energy_KM;
        list["Emision_KM"] = emision_KM;
        list["Saved_energy"] = saved_energy;
        list["Avoided_emissions"] = avoided_emissions;
        list["Monthly_savings"] = monthly_savings;
        list["Annual_savings"] = annual_savings;
        list["Young_tree"] = young_tree;
        list["Old_tree"] = old_tree;
        list["Energy_H2_Cylinders"] = energy_H2_Cylinders;
        list["Energy_H2_Low_Presure"] = energy_H2_Low_Presure;
        list["Energy_consumed"] = energy_consumed;
        list["Hydrogen_mass"] = hydrogen_mass;
        list["Liters_required"] = liters_required;

        response.success(req, res, list, 200);
    } catch (error) {
        response.error(req, res, error.message, 500);
    }
})

module.exports = router;