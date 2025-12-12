export interface Material {
  value: string;
  label: string;
  price: number;
}

export interface Discount {
  quantity: number;
  multiplier: number;
}

export interface Settings {
  materials: Material[];
  discounts: Discount[];
}

export const defaultSettings: Settings = {
  materials: [
    { value: 'paper80', label: 'Бумага 80 г/м²', price: 1 },
    { value: 'paper150', label: 'Бумага 150 г/м²', price: 1.5 },
    { value: 'glossy', label: 'Глянцевая 200 г/м²', price: 2 },
    { value: 'matte', label: 'Матовая 250 г/м²', price: 2.5 },
    { value: 'premium', label: 'Премиум 350 г/м²', price: 3.5 },
  ],
  discounts: [
    { quantity: 200, multiplier: 0.9 },
    { quantity: 500, multiplier: 0.8 },
    { quantity: 1000, multiplier: 0.7 },
  ],
};

export function getSettings(): Settings {
  const saved = localStorage.getItem('printMasterSettings');
  if (saved) {
    return JSON.parse(saved);
  }
  return defaultSettings;
}

export function saveSettings(settings: Settings): void {
  localStorage.setItem('printMasterSettings', JSON.stringify(settings));
}
