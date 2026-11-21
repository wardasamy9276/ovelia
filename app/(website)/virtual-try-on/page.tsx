
"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  ShoppingBag,
  MessageCircle,
  Mail,
  Trash2,
  Plus,
  Minus,
  Truck,
  Palette,
  Moon,
  Sun,
  Languages,
  Package,
  Check,
} from "lucide-react";

// ========================================
// Types
// ========================================

type Language = "ar" | "en";

type Shade = {
  id: number;
  name: string;
  ar: string;
  color: string;
  price: number;
  category: string;
  categoryEn: string;
};

type CartItem = Shade & {
  quantity: number;
};

type Customer = {
  name: string;
  phone: string;
  email: string;
  city: string;
  address: string;
  delivery: string;
  notes: string;
};

// ========================================
// Products and shades
// ========================================

const shades: Shade[] = [
  { id: 1, name: "Ruby Red", ar: "أحمر ياقوتي", color: "#9E1028", price: 420, category: "أحمر", categoryEn: "Red" },
  { id: 2, name: "Classic Red", ar: "أحمر كلاسيكي", color: "#B51F35", price: 399, category: "أحمر", categoryEn: "Red" },
  { id: 3, name: "Cherry Red", ar: "أحمر كرزي", color: "#A71930", price: 410, category: "أحمر", categoryEn: "Red" },
  { id: 4, name: "Deep Burgundy", ar: "نبيتي غامق", color: "#52152D", price: 450, category: "أحمر", categoryEn: "Red" },
  { id: 5, name: "Wine Red", ar: "أحمر خمري", color: "#681C35", price: 440, category: "أحمر", categoryEn: "Red" },
  { id: 6, name: "Dark Merlot", ar: "ميرلوت داكن", color: "#481B32", price: 470, category: "أحمر", categoryEn: "Red" },
  { id: 7, name: "Brick Red", ar: "أحمر طوبي", color: "#A64136", price: 380, category: "أحمر", categoryEn: "Red" },
  { id: 8, name: "Blood Red", ar: "أحمر دموي", color: "#761B28", price: 430, category: "أحمر", categoryEn: "Red" },

  { id: 9, name: "Baby Pink", ar: "وردي فاتح", color: "#E5A0AD", price: 320, category: "وردي", categoryEn: "Pink" },
  { id: 10, name: "Dusty Rose", ar: "روز ترابي", color: "#B56F7C", price: 350, category: "وردي", categoryEn: "Pink" },
  { id: 11, name: "Rose Pink", ar: "وردي روز", color: "#D66B83", price: 340, category: "وردي", categoryEn: "Pink" },
  { id: 12, name: "Vintage Pink", ar: "وردي كلاسيكي", color: "#C17C8C", price: 360, category: "وردي", categoryEn: "Pink" },
  { id: 13, name: "Deep Rose", ar: "روز غامق", color: "#A94E68", price: 390, category: "وردي", categoryEn: "Pink" },
  { id: 14, name: "Fuchsia", ar: "فوشيا", color: "#B51D65", price: 410, category: "وردي", categoryEn: "Pink" },
  { id: 15, name: "Soft Pink", ar: "وردي ناعم", color: "#D995A5", price: 330, category: "وردي", categoryEn: "Pink" },
  { id: 16, name: "Berry Pink", ar: "وردي توتي", color: "#963D61", price: 400, category: "وردي", categoryEn: "Pink" },

  { id: 17, name: "Mauve Nude", ar: "موف نود", color: "#986879", price: 360, category: "موف", categoryEn: "Mauve" },
  { id: 18, name: "Soft Mauve", ar: "موف هادئ", color: "#AD7C91", price: 350, category: "موف", categoryEn: "Mauve" },
  { id: 19, name: "Plum", ar: "برقوقي", color: "#65294D", price: 430, category: "موف", categoryEn: "Mauve" },
  { id: 20, name: "Dark Plum", ar: "برقوقي غامق", color: "#492039", price: 470, category: "موف", categoryEn: "Mauve" },
  { id: 21, name: "Purple Rose", ar: "موف وردي", color: "#87536F", price: 390, category: "موف", categoryEn: "Mauve" },
  { id: 22, name: "Mauve Brown", ar: "موف بني", color: "#79515C", price: 380, category: "موف", categoryEn: "Mauve" },

  { id: 23, name: "Caramel Nude", ar: "كراميل نود", color: "#AD755F", price: 320, category: "نود", categoryEn: "Nude" },
  { id: 24, name: "Warm Nude", ar: "نود دافئ", color: "#BD8975", price: 310, category: "نود", categoryEn: "Nude" },
  { id: 25, name: "Peach Nude", ar: "خوخي نود", color: "#CF927E", price: 299, category: "نود", categoryEn: "Nude" },
  { id: 26, name: "Pink Nude", ar: "وردي نود", color: "#C28A88", price: 330, category: "نود", categoryEn: "Nude" },
  { id: 27, name: "Beige Nude", ar: "بيج نود", color: "#C5A08D", price: 300, category: "نود", categoryEn: "Nude" },
  { id: 28, name: "Natural Nude", ar: "نود طبيعي", color: "#B78372", price: 320, category: "نود", categoryEn: "Nude" },

  { id: 29, name: "Mocha Brown", ar: "موكا بني", color: "#805044", price: 380, category: "بني", categoryEn: "Brown" },
  { id: 30, name: "Chocolate", ar: "شوكولاتة", color: "#59352F", price: 420, category: "بني", categoryEn: "Brown" },
  { id: 31, name: "Cinnamon", ar: "قرفة", color: "#A45D49", price: 360, category: "بني", categoryEn: "Brown" },
  { id: 32, name: "Terracotta", ar: "تيراكوتا", color: "#B45B48", price: 370, category: "بني", categoryEn: "Brown" },
  { id: 33, name: "Deep Cocoa", ar: "كاكاو غامق", color: "#49302D", price: 450, category: "بني", categoryEn: "Brown" },
  { id: 34, name: "Coffee Brown", ar: "بني قهوة", color: "#704638", price: 400, category: "بني", categoryEn: "Brown" },

  { id: 35, name: "Coral", ar: "مرجاني", color: "#E47765", price: 340, category: "مرجاني", categoryEn: "Coral" },
  { id: 36, name: "Peach Coral", ar: "خوخي مرجاني", color: "#DF927A", price: 330, category: "مرجاني", categoryEn: "Coral" },
  { id: 37, name: "Burnt Orange", ar: "برتقالي محروق", color: "#B95D3D", price: 380, category: "مرجاني", categoryEn: "Coral" },
  { id: 38, name: "Warm Peach", ar: "خوخي دافئ", color: "#D88C70", price: 320, category: "مرجاني", categoryEn: "Coral" },
];

const categories = [
  { ar: "أحمر", en: "Red" },
  { ar: "وردي", en: "Pink" },
  { ar: "موف", en: "Mauve" },
  { ar: "نود", en: "Nude" },
  { ar: "بني", en: "Brown" },
  { ar: "مرجاني", en: "Coral" },
];

const initialCustomer: Customer = {
  name: "",
  phone: "",
  email: "",
  city: "",
  address: "",
  delivery: "home",
  notes: "",
};

const translations = {
  ar: {
    direction: "rtl",
    brand: "ORVÉLIA BEAUTY",
    heading: "اختاري جمالك بطريقتك",
    subtitle: "اكتشفي مجموعتنا المتنوعة من ألوان أحمر الشفاه واختاري الدرجة المناسبة لكِ.",
    shades: "اختاري درجة أحمر الشفاه",
    available: "درجة متاحة",
    selected: "الدرجة المختارة",
    choose: "اختاري اللون والدرجة من القائمة",
    add: "أضيفي للسلة",
    red: "درجات",
    whatsapp: "الطلب عبر واتساب",
    whatsappText: "أرسلي تفاصيل المنتجات والكميات والأسعار وبياناتك إلى واتساب المتجر.",
    sendWhatsApp: "إرسال الطلب عبر واتساب",
    email: "إرسال بيانات الطلب",
    emailText: "اكتبي بياناتك واختاري طريقة استلام المنتجات لإرسال تفاصيل طلبك.",
    name: "الاسم بالكامل",
    phone: "رقم الهاتف",
    emailAddress: "البريد الإلكتروني",
    city: "المحافظة",
    chooseCity: "اختاري المحافظة",
    address: "العنوان بالتفصيل",
    addressPlaceholder: "الشارع والمنطقة ورقم العقار",
    delivery: "طريقة استلام المنتج",
    home: "شحن إلى المنزل",
    shipping: "عن طريق شركة شحن",
    pickup: "استلام من نقطة البيع",
    contact: "التواصل لتحديد طريقة الاستلام",
    notes: "ملاحظات إضافية",
    notesPlaceholder: "أي تفاصيل إضافية عن طلبك...",
    total: "إجمالي الطلب",
    sendEmail: "تجهيز وإرسال بيانات الطلب",
    emailNote: "سيتم فتح تطبيق البريد الإلكتروني لإرسال تفاصيل طلبك.",
    cart: "سلة المشتريات",
    pieces: "قطعة",
    empty: "السلة فارغة",
    emptyText: "اختاري درجة أحمر الشفاه واضغطي أضيفي للسلة.",
    quantity: "الكمية",
    delete: "حذف المنتج",
    itemTotal: "إجمالي المنتج",
    cartTotal: "إجمالي المشتريات",
    shippingNote: "تكلفة الشحن يتم تحديدها حسب المحافظة وطريقة الاستلام.",
    sendCart: "إرسال السلة عبر واتساب",
    complete: "إكمال بيانات الشحن",
    footer: "اختاري درجتك واستمتعي بتجربة تسوق مميزة",
    currency: "جنيه",
    customerRequired: "يرجى إدخال الاسم ورقم الهاتف والمحافظة والعنوان.",
    orderProducts: "المنتجات الموجودة في الطلب",
    count: "عدد القطع",
    product: "منتج / درجة",
    language: "English",
    dark: "الوضع الليلي",
    light: "الوضع النهاري",
    productName: "اسم المنتج",
    storeEmail: "بريد المتجر",
  },
  en: {
    direction: "ltr",
    brand: "ORVÉLIA BEAUTY",
    heading: "Choose Your Beauty, Your Way",
    subtitle: "Explore our lipstick collection and find the perfect shade for you.",
    shades: "Choose Your Lipstick Shade",
    available: "available shades",
    selected: "Selected shade",
    choose: "Choose a color and shade",
    add: "Add to Cart",
    red: "Shades",
    whatsapp: "Order via WhatsApp",
    whatsappText: "Send your products, quantities, prices, and details directly to our store.",
    sendWhatsApp: "Send Order via WhatsApp",
    email: "Submit Order Details",
    emailText: "Enter your details and choose your preferred delivery method.",
    name: "Full Name",
    phone: "Phone Number",
    emailAddress: "Email Address",
    city: "Governorate",
    chooseCity: "Choose your governorate",
    address: "Full Address",
    addressPlaceholder: "Street, area, building number",
    delivery: "Delivery Method",
    home: "Home Delivery",
    shipping: "Shipping Company",
    pickup: "Pickup from Store",
    contact: "Contact me to arrange delivery",
    notes: "Additional Notes",
    notesPlaceholder: "Any additional details...",
    total: "Order Total",
    sendEmail: "Prepare and Send Order",
    emailNote: "Your email application will open with your order details.",
    cart: "Shopping Cart",
    pieces: "items",
    empty: "Your cart is empty",
    emptyText: "Choose a lipstick shade and add it to your cart.",
    quantity: "Quantity",
    delete: "Remove product",
    itemTotal: "Item Total",
    cartTotal: "Cart Total",
    shippingNote: "Shipping fees depend on your location and delivery method.",
    sendCart: "Send Cart via WhatsApp",
    complete: "Complete Shipping Details",
    footer: "Choose your shade and enjoy a beautiful shopping experience",
    currency: "EGP",
    customerRequired: "Please enter your name, phone, governorate, and address.",
    orderProducts: "Products in your order",
    count: "Total items",
    product: "product / shade",
    language: "العربية",
    dark: "Dark Mode",
    light: "Light Mode",
    productName: "Product name",
    storeEmail: "Store email",
  },
};

// ========================================
// Component
// ========================================

export default function LipstickOrder() {
  const [language, setLanguage] = useState<Language>("ar");
  const [darkMode, setDarkMode] = useState(false);
  const [selectedShadeId, setSelectedShadeId] = useState(1);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customer, setCustomer] = useState<Customer>(initialCustomer);
  const [loaded, setLoaded] = useState(false);

  const t = translations[language];
  const isArabic = language === "ar";

  const selectedShade = useMemo(
    () => shades.find((shade) => shade.id === selectedShadeId) || shades[0],
    [selectedShadeId]
  );

  const totalQuantity = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const orderItems = cart.length
    ? cart
    : [{ ...selectedShade, quantity: 1 }];

  const orderTotal = orderItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const formatPrice = (price: number) =>
    `${price.toLocaleString(isArabic ? "ar-EG" : "en-US")} ${t.currency}`;

  const pageClass = darkMode
    ? "bg-[#171311] text-[#f5ece8]"
    : "bg-[#fbf8f6] text-[#392421]";

  const cardClass = darkMode
    ? "border-[#40332f] bg-[#211b19]"
    : "border-[#eadedb] bg-white";

  const softClass = darkMode
    ? "bg-[#302522] text-[#f5ece8]"
    : "bg-[#faf3f1] text-[#392421]";

  const inputClass = darkMode
    ? "border-[#51413b] bg-[#302522] text-white placeholder:text-gray-400"
    : "border-[#e8dcd8] bg-white text-[#392421]";

  // Load saved cart
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("orvelia-cart");

      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed)) setCart(parsed);
      }
    } catch (error) {
      console.error("Could not load cart:", error);
    }

    setLoaded(true);
  }, []);

  // Save cart
  useEffect(() => {
    if (!loaded) return;

    localStorage.setItem("orvelia-cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
  }, [cart, loaded]);

  // Add product
  const addToCart = () => {
    setCart((previous) => {
      const existing = previous.find(
        (item) => item.id === selectedShade.id
      );

      if (existing) {
        return previous.map((item) =>
          item.id === selectedShade.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...previous, { ...selectedShade, quantity: 1 }];
    });
  };

  // Update quantity
  const increaseQuantity = (id: number) => {
    setCart((previous) =>
      previous.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id: number) => {
    setCart((previous) =>
      previous
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id: number) => {
    setCart((previous) =>
      previous.filter((item) => item.id !== id)
    );
  };

  const updateCustomer = (
    field: keyof Customer,
    value: string
  ) => {
    setCustomer((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  // Order message
  const createOrderMessage = () => {
    const itemsText = orderItems
      .map(
        (item, index) =>
          `${index + 1}. ${isArabic ? item.ar : item.name}\n${t.quantity}: ${item.quantity}\n${t.productName}: ${item.name}\n${t.itemTotal}: ${formatPrice(item.price * item.quantity)}`
      )
      .join("\n\n");

    return `
ORVÉLIA BEAUTY - ORDER

${t.name}: ${customer.name}
${t.phone}: ${customer.phone}
${t.emailAddress}: ${customer.email}
${t.city}: ${customer.city}
${t.address}: ${customer.address}
${t.delivery}: ${customer.delivery}
${t.notes}: ${customer.notes || "-"}

${t.orderProducts}:
${itemsText}

${t.count}: ${orderItems.reduce((sum, item) => sum + item.quantity, 0)}
${t.total}: ${formatPrice(orderTotal)}
`;
  };

  // WhatsApp
  const orderWhatsApp = () => {
    // استبدلي الرقم برقم واتساب المتجر بكود الدولة
    const phoneNumber = "201XXXXXXXXX";

    const message = createOrderMessage();

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  // Email
  const sendOrderEmail = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !customer.name.trim() ||
      !customer.phone.trim() ||
      !customer.city.trim() ||
      !customer.address.trim()
    ) {
      alert(t.customerRequired);
      return;
    }

    // استبدلي البريد ببريد المتجر الحقيقي
    const storeEmail = "your-store@email.com";

    const subject = isArabic
      ? "طلب جديد من ORVÉLIA"
      : "New ORVÉLIA Order";

    const body = createOrderMessage();

    const mailtoUrl =
      `mailto:${storeEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;
  };

  const scrollToForm = () => {
    document
      .getElementById("order-customer-form")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main
      dir={t.direction}
      className={`min-h-screen px-4 py-10 transition-colors duration-300 sm:px-6 lg:px-8 ${pageClass}`}
    >
      <div className="mx-auto max-w-7xl space-y-8">

        {/* Header and controls */}

        <header className="space-y-6 text-center">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setLanguage(isArabic ? "en" : "ar")}
              className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition ${cardClass}`}
            >
              <Languages size={18} />
              {t.language}
            </button>

            <button
              type="button"
              onClick={() => setDarkMode(!darkMode)}
              className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition ${cardClass}`}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              {darkMode ? t.light : t.dark}
            </button>
          </div>

          <div>
            <p className="mb-3 text-sm tracking-[5px] text-[#a47770]">
              {t.brand}
            </p>

            <h1 className="text-3xl font-bold sm:text-4xl">
              {t.heading}
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-8 text-gray-500 sm:text-base">
              {t.subtitle}
            </p>
          </div>
        </header>

        {/* Shade Selection */}

        <section className={`rounded-[28px] border p-5 shadow-sm sm:p-8 ${cardClass}`}>
          <div className="mb-7 flex items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <Palette className="text-[#a47770]" size={22} />
                <h2 className="text-xl font-bold sm:text-2xl">
                  {t.shades}
                </h2>
              </div>

              <p className="mt-2 text-sm text-gray-500">
                {shades.length} {t.available}
              </p>
            </div>

            <span className="rounded-xl bg-[#faf3f1] px-3 py-2 text-sm font-bold text-[#9b625d]">
              {shades.length}
            </span>
          </div>

          {/* Selected shade */}

          <div className={`mb-7 flex flex-col items-center gap-5 rounded-2xl p-5 sm:flex-row ${softClass}`}>
            <div
              className="h-24 w-24 shrink-0 rounded-full border-4 border-white shadow-lg"
              style={{ backgroundColor: selectedShade.color }}
            />

            <div className="flex-1 text-center sm:text-start">
              <p className="text-xs text-gray-500">{t.selected}</p>

              <h3 className="mt-1 text-2xl font-bold">
                {isArabic ? selectedShade.ar : selectedShade.name}
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                {selectedShade.name}
              </p>

              <p className="mt-3 text-xl font-bold text-[#a47770]">
                {formatPrice(selectedShade.price)}
              </p>
            </div>

            <button
              type="button"
              onClick={addToCart}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#392421] px-6 py-4 font-semibold text-white transition hover:bg-[#68443e] sm:w-auto"
            >
              <ShoppingBag size={19} />
              {t.add}
            </button>
          </div>

          {/* Dropdown */}

          <div className="mb-8">
            <label className="mb-3 block text-sm font-bold">
              {t.choose}
            </label>

            <select
              value={selectedShadeId}
              onChange={(event) =>
                setSelectedShadeId(Number(event.target.value))
              }
              className={`w-full rounded-xl border px-4 py-4 text-sm outline-none focus:border-[#9b625d] ${inputClass}`}
            >
              {categories.map((category) => (
                <optgroup
                  key={category.en}
                  label={isArabic ? category.ar : category.en}
                >
                  {shades
                    .filter((shade) => shade.categoryEn === category.en)
                    .map((shade) => (
                      <option key={shade.id} value={shade.id}>
                        {isArabic ? shade.ar : shade.name} — {formatPrice(shade.price)}
                      </option>
                    ))}
                </optgroup>
              ))}
            </select>
          </div>

          {/* Shade categories */}

          <div className="space-y-9">
            {categories.map((category) => {
              const categoryShades = shades.filter(
                (shade) => shade.categoryEn === category.en
              );

              return (
                <div key={category.en}>
                  <h3 className="mb-5 border-r-4 border-[#9b625d] pr-3 text-lg font-bold">
                    {t.red} {isArabic ? category.ar : category.en}
                  </h3>

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                    {categoryShades.map((shade) => {
                      const active = selectedShadeId === shade.id;

                      return (
                        <button
                          type="button"
                          key={shade.id}
                          onClick={() => setSelectedShadeId(shade.id)}
                          className={`flex items-center gap-3 rounded-xl border p-3 text-start transition ${
                            active
                              ? "border-[#9b625d] bg-[#faf3f1] shadow-sm"
                              : darkMode
                                ? "border-[#40332f] bg-[#211b19] hover:border-[#9b625d]"
                                : "border-[#eee7e4] bg-white hover:border-[#c49a94]"
                          }`}
                        >
                          <span
                            className="relative h-12 w-12 shrink-0 rounded-full shadow-inner"
                            style={{ backgroundColor: shade.color }}
                          >
                            {active && (
                              <Check
                                size={18}
                                className="absolute -left-1 -top-1 rounded-full bg-white text-[#9b625d]"
                              />
                            )}
                          </span>

                          <span className="min-w-0">
                            <span className="block truncate text-xs font-bold">
                              {isArabic ? shade.ar : shade.name}
                            </span>

                            <span className="mt-1 block text-[11px] text-gray-500">
                              {formatPrice(shade.price)}
                            </span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* WhatsApp order */}

        <section className={`rounded-[28px] border p-5 shadow-sm sm:p-8 ${cardClass}`}>
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#edf8ef] text-[#248b48]">
              <MessageCircle size={25} />
            </div>

            <h2 className="text-xl font-bold">{t.whatsapp}</h2>
          </div>

          <p className="mb-5 text-sm leading-7 text-gray-500">
            {t.whatsappText}
          </p>

          <div className={`mb-5 rounded-xl p-4 ${softClass}`}>
            <p className="text-sm">{t.orderProducts}</p>
            <p className="mt-2 font-bold text-[#a47770]">
              {orderItems.length} {t.product} — {formatPrice(orderTotal)}
            </p>
          </div>

          <button
            type="button"
            onClick={orderWhatsApp}
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#238b49] px-6 py-5 font-bold text-white transition hover:bg-[#176d38]"
          >
            <MessageCircle size={22} />
            {t.sendWhatsApp}
          </button>
        </section>

        {/* Customer details and email */}

        <section className={`rounded-[28px] border p-5 shadow-sm sm:p-8 ${cardClass}`}>
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f8f0ec] text-[#9b625d]">
              <Mail size={25} />
            </div>

            <h2 className="text-xl font-bold">{t.email}</h2>
          </div>

          <p className="mb-7 text-sm leading-7 text-gray-500">
            {t.emailText}
          </p>

          <form
            id="order-customer-form"
            onSubmit={sendOrderEmail}
            className="space-y-5"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  {t.name} *
                </label>

                <input
                  required
                  type="text"
                  value={customer.name}
                  onChange={(e) => updateCustomer("name", e.target.value)}
                  placeholder={t.name}
                  className={`w-full rounded-xl border px-4 py-4 text-sm outline-none focus:border-[#9b625d] ${inputClass}`}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  {t.phone} *
                </label>

                <input
                  required
                  type="tel"
                  value={customer.phone}
                  onChange={(e) => updateCustomer("phone", e.target.value)}
                  placeholder="01xxxxxxxxx"
                  className={`w-full rounded-xl border px-4 py-4 text-sm outline-none focus:border-[#9b625d] ${inputClass}`}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  {t.emailAddress}
                </label>

                <input
                  type="email"
                  value={customer.email}
                  onChange={(e) => updateCustomer("email", e.target.value)}
                  placeholder="example@email.com"
                  className={`w-full rounded-xl border px-4 py-4 text-sm outline-none focus:border-[#9b625d] ${inputClass}`}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  {t.city} *
                </label>

                <select
                  required
                  value={customer.city}
                  onChange={(e) => updateCustomer("city", e.target.value)}
                  className={`w-full rounded-xl border px-4 py-4 text-sm outline-none focus:border-[#9b625d] ${inputClass}`}
                >
                  <option value="">{t.chooseCity}</option>
                  {[
                    ["القاهرة", "Cairo"],
                    ["الجيزة", "Giza"],
                    ["الإسكندرية", "Alexandria"],
                    ["القليوبية", "Qalyubia"],
                    ["الشرقية", "Sharqia"],
                    ["الدقهلية", "Dakahlia"],
                    ["الغربية", "Gharbia"],
                    ["المنوفية", "Monufia"],
                    ["البحيرة", "Beheira"],
                    ["كفر الشيخ", "Kafr El Sheikh"],
                    ["دمياط", "Damietta"],
                    ["بورسعيد", "Port Said"],
                    ["الإسماعيلية", "Ismailia"],
                    ["السويس", "Suez"],
                    ["الفيوم", "Fayoum"],
                    ["بني سويف", "Beni Suef"],
                    ["المنيا", "Minya"],
                    ["أسيوط", "Assiut"],
                    ["سوهاج", "Sohag"],
                    ["قنا", "Qena"],
                    ["الأقصر", "Luxor"],
                    ["أسوان", "Aswan"],
                    ["البحر الأحمر", "Red Sea"],
                    ["الوادي الجديد", "New Valley"],
                    ["مطروح", "Matrouh"],
                    ["شمال سيناء", "North Sinai"],
                    ["جنوب سيناء", "South Sinai"],
                  ].map(([ar, en]) => (
                    <option key={en} value={isArabic ? ar : en}>
                      {isArabic ? ar : en}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                {t.address} *
              </label>

              <textarea
                required
                rows={3}
                value={customer.address}
                onChange={(e) => updateCustomer("address", e.target.value)}
                placeholder={t.addressPlaceholder}
                className={`w-full resize-y rounded-xl border px-4 py-4 text-sm outline-none focus:border-[#9b625d] ${inputClass}`}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                {t.delivery} *
              </label>

              <select
                required
                value={customer.delivery}
                onChange={(e) => updateCustomer("delivery", e.target.value)}
                className={`w-full rounded-xl border px-4 py-4 text-sm outline-none focus:border-[#9b625d] ${inputClass}`}
              >
                <option value="home">{t.home}</option>
                <option value="shipping">{t.shipping}</option>
                <option value="pickup">{t.pickup}</option>
                <option value="contact">{t.contact}</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                {t.notes}
              </label>

              <textarea
                rows={2}
                value={customer.notes}
                onChange={(e) => updateCustomer("notes", e.target.value)}
                placeholder={t.notesPlaceholder}
                className={`w-full resize-y rounded-xl border px-4 py-4 text-sm outline-none focus:border-[#9b625d] ${inputClass}`}
              />
            </div>

            <div className={`rounded-xl p-5 ${softClass}`}>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{t.total}</span>
                <strong className="text-xl text-[#a47770]">
                  {formatPrice(orderTotal)}
                </strong>
              </div>
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#9b625d] px-6 py-5 font-bold text-white transition hover:bg-[#80504b]"
            >
              <Mail size={21} />
              {t.sendEmail}
            </button>

            <p className="text-center text-xs leading-6 text-gray-400">
              {t.emailNote}
            </p>
          </form>
        </section>

        {/* Shopping cart */}

        <section className={`rounded-[28px] border p-5 shadow-sm sm:p-8 ${cardClass}`}>
          <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f8f0ec] text-[#9b625d]">
                <ShoppingBag size={25} />
              </div>

              <h2 className="text-xl font-bold">{t.cart}</h2>
            </div>

            <span className="rounded-xl bg-[#faf3f1] px-4 py-2 text-sm font-bold text-[#9b625d]">
              {totalQuantity} {t.pieces}
            </span>
          </div>

          {cart.length === 0 ? (
            <div className={`rounded-2xl border border-dashed px-5 py-12 text-center ${darkMode ? "border-[#51413b]" : "border-[#e4d7d3]"}`}>
              <ShoppingBag
                size={42}
                className="mx-auto text-[#c5a7a0]"
              />

              <h3 className="mt-4 font-bold">{t.empty}</h3>

              <p className="mt-2 text-sm text-gray-500">
                {t.emptyText}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className={`flex flex-col gap-4 rounded-2xl border p-4 sm:flex-row sm:items-center ${darkMode ? "border-[#40332f]" : "border-[#eee5e2]"}`}
                >
                  <div className="flex flex-1 items-center gap-4">
                    <div
                      className="h-16 w-16 shrink-0 rounded-xl shadow-inner"
                      style={{ backgroundColor: item.color }}
                    />

                    <div>
                      <h3 className="font-bold">
                        {isArabic ? item.ar : item.name}
                      </h3>

                      <p className="mt-1 text-xs text-gray-500">
                        {item.name}
                      </p>

                      <p className="mt-2 font-bold text-[#a47770]">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3 sm:justify-center">
                    <div className={`flex items-center gap-3 rounded-xl p-2 ${softClass}`}>
                      <button
                        type="button"
                        onClick={() => decreaseQuantity(item.id)}
                        aria-label="Decrease quantity"
                        className="rounded-lg p-2 hover:bg-white/20"
                      >
                        <Minus size={16} />
                      </button>

                      <span className="min-w-5 text-center font-bold">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() => increaseQuantity(item.id)}
                        aria-label="Increase quantity"
                        className="rounded-lg p-2 hover:bg-white/20"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      aria-label={t.delete}
                      className="rounded-xl bg-red-50 p-3 text-red-600 transition hover:bg-red-100"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="text-start sm:min-w-28 sm:text-end">
                    <p className="text-xs text-gray-500">
                      {t.itemTotal}
                    </p>

                    <p className="mt-1 font-bold">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Cart summary */}

          <div className={`mt-7 rounded-2xl p-5 ${softClass}`}>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">{t.count}</span>
              <strong>{totalQuantity}</strong>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-[#eadedb] pt-4">
              <span className="font-bold">{t.cartTotal}</span>

              <strong className="text-2xl text-[#a47770]">
                {formatPrice(totalPrice)}
              </strong>
            </div>

            <p className="mt-3 text-xs text-gray-400">
              {t.shippingNote}
            </p>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={orderWhatsApp}
              disabled={cart.length === 0}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#238b49] px-5 py-4 font-bold text-white transition hover:bg-[#176d38] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <MessageCircle size={19} />
              {t.sendCart}
            </button>

            <button
              type="button"
              onClick={scrollToForm}
              disabled={cart.length === 0}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#392421] px-5 py-4 font-bold text-white transition hover:bg-[#68443e] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Truck size={19} />
              {t.complete}
            </button>
          </div>
        </section>

        {/* Footer */}

        <footer className="flex items-center justify-center gap-2 pb-5 text-center text-xs text-gray-400">
          <Package size={16} />
          <span>{t.brand} — {t.footer}</span>
        </footer>
      </div>
    </main>
  );
}
