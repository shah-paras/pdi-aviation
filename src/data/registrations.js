/**
 * Individual aircraft registrations derived from operators fleet data.
 * Each entry links a VT-XXX registration to its operator and aircraft model.
 * Source: DGCA NSOP registry.
 */

import operators from './operators';

// Auto-generate from operators fleet
const registrations = operators.flatMap((op) =>
  (op.fleet || []).map((aircraft) => ({
    registration: aircraft.registration,
    operatorId: op.id,
    operatorName: op.name,
    modelId: aircraft.modelId,
    model: aircraft.model,
    seatingCapacity: aircraft.seatingCapacity,
    type: aircraft.type,
  }))
);

export default registrations;
