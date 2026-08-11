import { SimulatedTelemetry, GripDistribution, SimulatedNotification } from '../types';

/**
 * Generates 4 random integers that sum up to exactly 100.
 */
function generateGripDistribution(): GripDistribution {
  // Pick 3 random raw numbers
  const r1 = Math.floor(Math.random() * 30) + 20; // ~20-50% (Power Grip)
  const r2 = Math.floor(Math.random() * 25) + 15; // ~15-40% (Precision Grip)
  const r3 = Math.floor(Math.random() * 20) + 10; // ~10-30% (Pinch Grip)
  
  let remaining = 100 - (r1 + r2 + r3);
  if (remaining < 5) {
    // Rebalance if open hand is too low
    const excess = 10 - remaining;
    const power = Math.max(15, r1 - excess);
    remaining = 100 - (power + r2 + r3);
    return {
      powerGrip: power,
      precisionGrip: r2,
      pinchGrip: r3,
      openHand: remaining
    };
  }

  return {
    powerGrip: r1,
    precisionGrip: r2,
    pinchGrip: r3,
    openHand: remaining
  };
}

export function generateSimulatedTelemetry(): SimulatedTelemetry {
  const battery = Math.floor(Math.random() * 81) + 20; // 20 to 100
  const runtimeRaw = (Math.random() * 6 + 2).toFixed(1); // 2.0 to 8.0 hours
  const estimatedRuntimeHours = parseFloat(runtimeRaw);
  const emgQuality = Math.floor(Math.random() * 31) + 70; // 70 to 100
  const motorHealth = Math.floor(Math.random() * 21) + 80; // 80 to 100
  const systemHealth = Math.floor(Math.random() * 16) + 85; // 85 to 100
  const tempRaw = (Math.random() * 5.5 + 32.0).toFixed(1); // 32.0 to 37.5 °C
  const temperature = parseFloat(tempRaw);

  const dailyUsageHours = parseFloat((Math.random() * 7 + 1).toFixed(1)); // 1.0 to 8.0
  const weeklyUsageHours = Array.from({ length: 7 }, () => 
    parseFloat((Math.random() * 6.5 + 1.2).toFixed(1))
  );
  const monthlyUsageHours = Array.from({ length: 30 }, () => 
    parseFloat((Math.random() * 7 + 1).toFixed(1))
  );

  const calibState = Math.random() > 0.4 ? 'Up to date' : 'Calibration Recommended';
  const motionState = Math.random() > 0.5 ? 'Normal' : 'Monitoring';

  const gripPercentages = generateGripDistribution();

  // Notification pool with randomized picks
  const notificationPool: SimulatedNotification[] = [
    {
      id: 'notif-1',
      type: battery < 30 ? 'warning' : 'info',
      message: `Power module is at ${battery}% — simulated warning.`,
      timestamp: '2 mins ago'
    },
    {
      id: 'notif-2',
      type: 'warning',
      message: 'EMG calibration recommended — simulated notification.',
      timestamp: '15 mins ago'
    },
    {
      id: 'notif-3',
      type: 'success',
      message: 'System operating normally — simulated status.',
      timestamp: '1 hour ago'
    },
    {
      id: 'notif-4',
      type: 'info',
      message: 'Motor performance check recommended — simulated notification.',
      timestamp: '3 hours ago'
    },
    {
      id: 'notif-5',
      type: 'success',
      message: 'Adaptive control baseline updated — simulated log.',
      timestamp: '5 hours ago'
    }
  ];

  // Pick 3 random notifications
  const shuffledNotifs = [...notificationPool].sort(() => 0.5 - Math.random()).slice(0, 3);

  const now = new Date();
  const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return {
    battery,
    estimatedRuntimeHours,
    emgQuality,
    motorHealth,
    systemHealth,
    temperature,
    dailyUsageHours,
    weeklyUsageHours,
    monthlyUsageHours,
    gripPercentages,
    sensorStatus: {
      emgStatus: 'Normal',
      emgQuality,
      emgCalibration: calibState,
      motionStatus: motionState
    },
    motorStatus: {
      status: motorHealth < 85 ? 'Inspection Recommended' : 'Normal',
      performance: motorHealth,
      temperature
    },
    maintenanceStatus: {
      systemHealth: systemHealth > 88 ? 'Good' : 'Attention Needed',
      sensorCalibration: calibState === 'Up to date' ? 'Up to date' : 'Due Soon',
      motorInspection: motorHealth < 88 ? 'Recommended Soon' : 'Normal',
      powerModule: battery < 25 ? 'Cell Check' : 'Normal'
    },
    notifications: shuffledNotifs,
    lastUpdated: timeString
  };
}
