import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface Material {
  value: string;
  label: string;
  price: number;
}

interface Discount {
  quantity: number;
  multiplier: number;
}

interface Settings {
  materials: Material[];
  discounts: Discount[];
}

const defaultSettings: Settings = {
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

export default function Admin() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  useEffect(() => {
    const saved = localStorage.getItem('printMasterSettings');
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  const saveSettings = () => {
    localStorage.setItem('printMasterSettings', JSON.stringify(settings));
    toast({
      title: "Настройки сохранены",
      description: "Изменения применены к калькулятору",
    });
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    localStorage.removeItem('printMasterSettings');
    toast({
      title: "Настройки сброшены",
      description: "Восстановлены значения по умолчанию",
    });
  };

  const updateMaterialPrice = (index: number, price: number) => {
    const newMaterials = [...settings.materials];
    newMaterials[index].price = price;
    setSettings({ ...settings, materials: newMaterials });
  };

  const updateDiscount = (index: number, field: 'quantity' | 'multiplier', value: number) => {
    const newDiscounts = [...settings.discounts];
    newDiscounts[index][field] = value;
    setSettings({ ...settings, discounts: newDiscounts });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-blue-50">
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center">
              <Icon name="Settings" className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Админ-панель
            </h1>
          </div>
          <Button variant="outline" onClick={() => navigate('/')}>
            <Icon name="ArrowLeft" className="mr-2 h-4 w-4" />
            Вернуться на сайт
          </Button>
        </div>
      </header>

      <div className="container py-12 max-w-5xl">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="DollarSign" className="h-6 w-6" />
                Цены на материалы
              </CardTitle>
              <CardDescription>Базовая стоимость за единицу для каждого типа материала</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {settings.materials.map((material, index) => (
                <div key={material.value} className="flex items-center gap-4">
                  <Label className="w-48">{material.label}</Label>
                  <Input
                    type="number"
                    step="0.1"
                    min="0"
                    value={material.price}
                    onChange={(e) => updateMaterialPrice(index, parseFloat(e.target.value) || 0)}
                    className="w-32"
                  />
                  <span className="text-muted-foreground">₽</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Percent" className="h-6 w-6" />
                Скидки за объём
              </CardTitle>
              <CardDescription>Коэффициенты скидок при разных тиражах (1.0 = 100%, 0.7 = 70% от базовой цены)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {settings.discounts.map((discount, index) => (
                <div key={index} className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>От {index === 0 ? '0' : settings.discounts[index - 1].quantity} шт</Label>
                    <Input
                      type="number"
                      step="100"
                      min="0"
                      value={discount.quantity}
                      onChange={(e) => updateDiscount(index, 'quantity', parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Коэффициент</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        step="0.05"
                        min="0"
                        max="1"
                        value={discount.multiplier}
                        onChange={(e) => updateDiscount(index, 'multiplier', parseFloat(e.target.value) || 0)}
                      />
                      <span className="text-muted-foreground whitespace-nowrap">
                        (-{Math.round((1 - discount.multiplier) * 100)}%)
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button 
              onClick={saveSettings}
              className="flex-1 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
            >
              <Icon name="Save" className="mr-2 h-4 w-4" />
              Сохранить изменения
            </Button>
            <Button 
              onClick={resetSettings}
              variant="outline"
              className="flex-1"
            >
              <Icon name="RotateCcw" className="mr-2 h-4 w-4" />
              Сбросить к умолчанию
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
