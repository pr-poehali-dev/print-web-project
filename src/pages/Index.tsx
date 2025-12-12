import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

const services = [
  { id: 'cards', name: 'Визитки', icon: 'CreditCard', description: 'Профессиональные визитные карточки' },
  { id: 'flyers', name: 'Листовки', icon: 'FileText', description: 'Рекламные листовки любых форматов' },
  { id: 'booklets', name: 'Буклеты', icon: 'BookOpen', description: 'Многостраничные буклеты' },
  { id: 'catalogs', name: 'Каталоги', icon: 'Book', description: 'Каталоги продукции' },
  { id: 'blanks', name: 'Бланки', icon: 'FileCheck', description: 'Фирменные бланки' },
  { id: 'stickers', name: 'Наклейки', icon: 'Tag', description: 'Стикеры и наклейки' },
  { id: 'tags', name: 'Бирки', icon: 'Tags', description: 'Бирки для товаров' },
  { id: 'calendars', name: 'Календари', icon: 'Calendar', description: 'Настенные и настольные' },
  { id: 'posters', name: 'Плакаты', icon: 'Image', description: 'Большие форматы' },
  { id: 'postcards', name: 'Открытки', icon: 'Mail', description: 'Поздравительные открытки' },
  { id: 'invitations', name: 'Приглашения', icon: 'Send', description: 'Пригласительные билеты' },
  { id: 'envelopes', name: 'Конверты', icon: 'Package', description: 'Фирменные конверты' },
  { id: 'stamps', name: 'Печати-штампы', icon: 'Stamp', description: 'Изготовление печатей' },
  { id: 'photos', name: 'Фото на документы', icon: 'Camera', description: 'Профессиональное фото' },
  { id: 'signs', name: 'Вывески-таблички', icon: 'Square', description: 'Вывески и таблички' },
];

const productTypes = [
  { value: 'cards', label: 'Визитки' },
  { value: 'flyers', label: 'Листовки' },
  { value: 'booklets', label: 'Буклеты' },
  { value: 'catalogs', label: 'Каталоги' },
  { value: 'posters', label: 'Плакаты' },
];

const formats = [
  { value: 'a6', label: 'A6 (105×148 мм)' },
  { value: 'a5', label: 'A5 (148×210 мм)' },
  { value: 'a4', label: 'A4 (210×297 мм)' },
  { value: 'a3', label: 'A3 (297×420 мм)' },
  { value: 'business', label: 'Визитка (90×50 мм)' },
];

const materials = [
  { value: 'paper80', label: 'Бумага 80 г/м²', price: 1 },
  { value: 'paper150', label: 'Бумага 150 г/м²', price: 1.5 },
  { value: 'glossy', label: 'Глянцевая 200 г/м²', price: 2 },
  { value: 'matte', label: 'Матовая 250 г/м²', price: 2.5 },
  { value: 'premium', label: 'Премиум 350 г/м²', price: 3.5 },
];

export default function Index() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [productType, setProductType] = useState('');
  const [format, setFormat] = useState('');
  const [material, setMaterial] = useState('');
  const [quantity, setQuantity] = useState('100');
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);

  const calculatePrice = () => {
    const qty = parseInt(quantity) || 0;
    const materialData = materials.find(m => m.value === material);
    if (!materialData || qty === 0) return;

    const basePrice = materialData.price;
    let totalPrice = qty * basePrice;

    if (qty >= 1000) totalPrice *= 0.7;
    else if (qty >= 500) totalPrice *= 0.8;
    else if (qty >= 200) totalPrice *= 0.9;

    setCalculatedPrice(Math.round(totalPrice));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-blue-50">
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center">
              <Icon name="Printer" className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              ПринтМастер
            </h1>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#services" className="text-sm font-medium hover:text-primary transition-colors">Услуги</a>
            <a href="#calculator" className="text-sm font-medium hover:text-primary transition-colors">Калькулятор</a>
            <a href="#contacts" className="text-sm font-medium hover:text-primary transition-colors">Контакты</a>
          </nav>
          <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
            <Icon name="Phone" className="mr-2 h-4 w-4" />
            Позвонить
          </Button>
        </div>
      </header>

      <section className="container py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Профессиональная печать
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Современная типография с быстрым выполнением заказов. Высокое качество печати по доступным ценам
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-lg">
                <Icon name="Calculator" className="mr-2 h-5 w-5" />
                Рассчитать стоимость
              </Button>
              <Button size="lg" variant="outline" className="text-lg">
                <Icon name="Download" className="mr-2 h-5 w-5" />
                Загрузить макет
              </Button>
            </div>
          </div>
          <div className="relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <img 
              src="https://cdn.poehali.dev/projects/2fe10ada-612c-4bba-8fcd-55a88577818a/files/a0c40a9c-19e0-4a6a-a2d1-dbac16aa6c07.jpg" 
              alt="Профессиональная печать" 
              className="rounded-2xl shadow-2xl w-full h-auto"
            />
          </div>
        </div>
      </section>

      <section id="services" className="container py-20">
        <div className="text-center mb-12">
          <h3 className="text-4xl md:text-5xl font-bold mb-4">Наши услуги</h3>
          <p className="text-lg text-muted-foreground">Полный спектр полиграфических услуг</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {services.map((service, index) => (
            <Card
              key={service.id}
              className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-primary animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
              onClick={() => setSelectedService(service.id)}
            >
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon name={service.icon} className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-lg">{service.name}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section id="calculator" className="container py-20">
        <Card className="max-w-4xl mx-auto shadow-2xl border-2">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center">
              <Icon name="Calculator" className="h-10 w-10 text-white" />
            </div>
            <CardTitle className="text-3xl md:text-4xl font-bold">Онлайн-калькулятор</CardTitle>
            <CardDescription className="text-lg">Рассчитайте стоимость печати за несколько секунд</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="product-type">Тип продукции</Label>
                <Select value={productType} onValueChange={setProductType}>
                  <SelectTrigger id="product-type">
                    <SelectValue placeholder="Выберите тип" />
                  </SelectTrigger>
                  <SelectContent>
                    {productTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="format">Формат</Label>
                <Select value={format} onValueChange={setFormat}>
                  <SelectTrigger id="format">
                    <SelectValue placeholder="Выберите формат" />
                  </SelectTrigger>
                  <SelectContent>
                    {formats.map(fmt => (
                      <SelectItem key={fmt.value} value={fmt.value}>{fmt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="material">Материал</Label>
                <Select value={material} onValueChange={setMaterial}>
                  <SelectTrigger id="material">
                    <SelectValue placeholder="Выберите материал" />
                  </SelectTrigger>
                  <SelectContent>
                    {materials.map(mat => (
                      <SelectItem key={mat.value} value={mat.value}>{mat.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity">Тираж (шт)</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="100"
                  step="100"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="100"
                />
              </div>
            </div>

            <Button
              onClick={calculatePrice}
              disabled={!productType || !format || !material || !quantity}
              className="w-full bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 text-lg h-12"
            >
              <Icon name="Sparkles" className="mr-2 h-5 w-5" />
              Рассчитать стоимость
            </Button>

            {calculatedPrice !== null && (
              <div className="p-6 rounded-lg bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border-2 border-primary/20 text-center animate-scale-in">
                <p className="text-lg text-muted-foreground mb-2">Стоимость заказа:</p>
                <p className="text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  {calculatedPrice} ₽
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  {quantity} шт × {materials.find(m => m.value === material)?.label}
                </p>
                <Button className="mt-4 bg-gradient-to-r from-primary to-secondary">
                  <Icon name="ShoppingCart" className="mr-2 h-4 w-4" />
                  Оформить заказ
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      <section className="container py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-3xl">
        <div className="text-center mb-12">
          <h3 className="text-4xl md:text-5xl font-bold mb-4">Почему выбирают нас</h3>
          <p className="text-lg text-muted-foreground">Профессионализм и качество в каждом заказе</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center hover:shadow-xl transition-all">
            <CardHeader>
              <div className="mx-auto mb-4 relative">
                <img 
                  src="https://cdn.poehali.dev/projects/2fe10ada-612c-4bba-8fcd-55a88577818a/files/40837946-c6c2-4e2c-9e3f-1d6447a6b0d8.jpg"
                  alt="Команда профессионалов"
                  className="rounded-xl w-full h-48 object-cover"
                />
              </div>
              <CardTitle>Опытная команда</CardTitle>
              <CardDescription>Более 15 лет работы в полиграфии</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center hover:shadow-xl transition-all">
            <CardHeader>
              <div className="mx-auto mb-4 relative">
                <img 
                  src="https://cdn.poehali.dev/projects/2fe10ada-612c-4bba-8fcd-55a88577818a/files/78c9aa3b-3078-4190-a71a-4131e8b80b6e.jpg"
                  alt="Современное оборудование"
                  className="rounded-xl w-full h-48 object-cover"
                />
              </div>
              <CardTitle>Современное оборудование</CardTitle>
              <CardDescription>Высокое качество печати</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center hover:shadow-xl transition-all">
            <CardHeader>
              <div className="mx-auto mb-4 relative">
                <img 
                  src="https://cdn.poehali.dev/projects/2fe10ada-612c-4bba-8fcd-55a88577818a/files/a0c40a9c-19e0-4a6a-a2d1-dbac16aa6c07.jpg"
                  alt="Индивидуальный подход"
                  className="rounded-xl w-full h-48 object-cover"
                />
              </div>
              <CardTitle>Индивидуальный подход</CardTitle>
              <CardDescription>Решение для каждого клиента</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      <section id="contacts" className="container py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl font-bold mb-6">Свяжитесь с нами</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon name="Phone" className="h-7 w-7 text-primary" />
                </div>
                <CardTitle>Телефон</CardTitle>
                <CardDescription className="text-base">+7 (999) 123-45-67</CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 h-14 w-14 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Icon name="Mail" className="h-7 w-7 text-secondary" />
                </div>
                <CardTitle>Email</CardTitle>
                <CardDescription className="text-base">info@printmaster.ru</CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 h-14 w-14 rounded-full bg-accent/10 flex items-center justify-center">
                  <Icon name="MapPin" className="h-7 w-7 text-accent" />
                </div>
                <CardTitle>Адрес</CardTitle>
                <CardDescription className="text-base">г. Москва, ул. Печатная, 1</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <footer className="border-t bg-muted/50 py-8">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2024 ПринтМастер. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}