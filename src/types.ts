export type PageTab = 
  | 'home'
  | 'dashboard'
  | 'how-it-works'
  | 'technology'
  | 'personalization'
  | 'power'
  | 'maintenance'
  | 'about';

export interface GripDistribution {
  powerGrip: number;
  precisionGrip: number;
  pinchGrip: number;
  openHand: number;
}

export interface SensorStatusData {
  emgStatus: 'Normal' | 'Calibrating' | 'Check Required';
  emgQuality: number; // 70-100%
  emgCalibration: 'Up to date' | 'Calibration Recommended';
  motionStatus: 'Normal' | 'Monitoring';
}

export interface MotorStatusData {
  status: 'Normal' | 'Inspection Recommended';
  performance: number; // 80-100%
  temperature: number; // e.g. 32.5 - 37.8 °C
}

export interface MaintenanceStatusData {
  systemHealth: 'Good' | 'Attention Needed';
  sensorCalibration: 'Up to date' | 'Due Soon';
  motorInspection: 'Recommended Soon' | 'Normal';
  powerModule: 'Normal' | 'Cell Check';
}

export interface SimulatedNotification {
  id: string;
  type: 'info' | 'warning' | 'success';
  message: string;
  timestamp: string;
}

export interface SimulatedTelemetry {
  battery: number; // 20-100
  estimatedRuntimeHours: number; // 2-8 hours
  emgQuality: number; // 70-100
  motorHealth: number; // 80-100
  systemHealth: number; // 85-100
  temperature: number; // °C
  dailyUsageHours: number; // 1-8
  weeklyUsageHours: number[]; // 7 days
  monthlyUsageHours: number[]; // 30 days
  gripPercentages: GripDistribution;
  sensorStatus: SensorStatusData;
  motorStatus: MotorStatusData;
  maintenanceStatus: MaintenanceStatusData;
  notifications: SimulatedNotification[];
  lastUpdated: string;
}

export interface ModularComponent {
  id: string;
  name: string;
  description: string;
  replacementTime: string;
  costSavings: string;
  status: 'Optimal' | 'Normal' | 'Service Recommended';
  iconName: string;
}

export interface TechItem {
  id: string;
  title: string;
  whatItIs: string;
  whyNovaUsesIt: string;
  problemItSolves: string;
  iconName: string;
  category: string;
}
