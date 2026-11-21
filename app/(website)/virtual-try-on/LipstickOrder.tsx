
"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useLanguage } from "@/app/context/LanguageContext";

import {
  ShoppingBag,
  MessageCircle,
  Mail,
  Trash2,
  Plus,
  Minus,
  Truck,
  CheckCircle2,
  Palette,
  Package,
} from "lucide-react";

// ======================================
// Types
// ======================================

type CategoryKey =
  | "red"
  | "pink"
  | "mauve"
  | "nude"
  | "brown"
  | "coral";

type Shade = {
  id: number;
  name: string;
  ar: string;
  color: string;
  price: number;
  category: string;
};

type CartItem = Shade & {
  quantity: number;
};

type Customer = {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  delivery: string;
  notes: string;
};

// ======================================
// Lipstick Shades
// ======================================

const shades: Shade[] = [
  // Red Shades
  { id: 1, name: "Ruby Red", ar: "أحمر ياقوتي", color: "#9E1028", price: 420, category: "أحمر" },
  { id: 2, name: "Classic Red", ar: "أحمر كلاسيكي", color: "#B51F35", price: 399, category: "أحمر" },
  { id: 3, name: "Cherry Red", ar: "أحمر كرزي", color: "#A71930", price: 410, category: "أحمر" },
  { id: 4, name: "Deep Burgundy", ar: "نبيتي غامق", color: "#52152D", price: 450, category: "أحمر" },
  { id: 5, name: "Wine Red", ar: "أحمر خمري", color: "#681C35", price: 440, category: "أحمر" },
  { id: 6, name: "Dark Merlot", ar: "ميرلوت داكن", color: "#481B32", price: 470, category: "أحمر" },
  { id: 7, name: "Brick Red", ar: "أحمر طوبي", color: "#A64136", price: 380, category: "أحمر" },
  { id: 8, name: "Blood Red", ar: "أحمر دموي", color: "#761B28", price: 430, category: "أحمر" },

  // Pink Shades
  { id: 9, name: "Baby Pink", ar: "وردي فاتح", color: "#E5A0AD", price: 320, category: "وردي" },
  { id: 10, name: "Dusty Rose", ar: "روز ترابي", color: "#B56F7C", price: 350, category: "وردي" },
  { id: 11, name: "Rose Pink", ar: "وردي روز", color: "#D66B83", price: 340, category: "وردي" },
  { id: 12, name: "Vintage Pink", ar: "وردي كلاسيكي", color: "#C17C8C", price: 360, category: "وردي" },
  { id: 13, name: "Deep Rose", ar: "روز غامق", color: "#A94E68", price: 390, category: "وردي" },
  { id: 14, name: "Fuchsia", ar: "فوشيا", color: "#B51D65", price: 410, category: "وردي" },
  { id: 15, name: "Soft Pink", ar: "وردي ناعم", color: "#D995A5", price: 330, category: "وردي" },
  { id: 16, name: "Berry Pink", ar: "وردي توتي", color: "#963D61", price: 400, category: "وردي" },

  // Mauve and Purple
  { id: 17, name: "Mauve Nude", ar: "موف نود", color: "#986879", price: 360, category: "موف" },
  { id: 18, name: "Soft Mauve", ar: "موف هادئ", color: "#AD7C91", price: 350, category: "موف" },
  { id: 19, name: "Plum", ar: "برقوقي", color: "#65294D", price: 430, category: "موف" },
  { id: 20, name: "Dark Plum", ar: "برقوقي غامق", color: "#492039", price: 470, category: "موف" },
  { id: 21, name: "Purple Rose", ar: "موف وردي", color: "#87536F", price: 390, category: "موف" },
  { id: 22, name: "Mauve Brown", ar: "موف بني", color: "#79515C", price: 380, category: "موف" },

  // Nude Shades
  { id: 23, name: "Caramel Nude", ar: "كراميل نود", color: "#AD755F", price: 320, category: "نود" },
  { id: 24, name: "Warm Nude", ar: "نود دافئ", color: "#BD8975", price: 310, category: "نود" },
  { id: 25, name: "Peach Nude", ar: "خوخي نود", color: "#CF927E", price: 299, category: "نود" },
  { id: 26, name: "Pink Nude", ar: "وردي نود", color: "#C28A88", price: 330, category: "نود" },
  { id: 27, name: "Beige Nude", ar: "بيج نود", color: "#C5A08D", price: 300, category: "نود" },
  { id: 28, name: "Natural Nude", ar: "نود طبيعي", color: "#B78372", price: 320, category: "نود" },

  // Brown Shades
  { id: 29, name: "Mocha Brown", ar: "موكا بني", color: "#805044", price: 380, category: "بني" },
  { id: 30, name: "Chocolate", ar: "شوكولاتة", color: "#59352F", price: 420, category: "بني" },
  { id: 31, name: "Cinnamon", ar: "قرفة", color: "#A45D49", price: 360, category: "بني" },
  { id: 32, name: "Terracotta", ar: "تيراكوتا", color: "#B45B48", price: 370, category: "بني" },
  { id: 33, name: "Deep Cocoa", ar: "كاكاو غامق", color: "#49302D", price: 450, category: "بني" },
  { id: 34, name: "Coffee Brown", ar: "بني قهوة", color: "#704638", price: 400, category: "بني" },

  // Coral and Orange
  { id: 35, name: "Coral", ar: "مرجاني", color: "#E47765", price: 340, category: "مرجاني" },
  { id: 36, name: "Peach Coral", ar: "خوخي مرجاني", color: "#DF927A", price: 330, category: "مرجاني" },
  { id: 37, name: "Burnt Orange", ar: "برتقالي محروق", color: "#B95D3D", price: 380, category: "مرجاني" },
  { id: 38, name: "Warm Peach", ar: "خوخي دافئ", color: "#D88C70", price: 320, category: "مرجاني" },
];

// ======================================
// Categories
// ======================================

const categories: { key: CategoryKey; value: string }[] = [
  { key: "red", value: "أحمر" },
  { key: "pink", value: "وردي" },
  { key: "mauve", value: "موف" },
  { key: "nude", value: "نود" },
  { key: "brown", value: "بني" },
  { key: "coral", value: "مرجاني" },
];

// ======================================
// Governorates
// ======================================

const governorates = [
  { key: "cairo", value: "القاهرة" },
  { key: "giza", value: "الجيزة" },
  { key: "alexandria", value: "الإسكندرية" },
  { key: "qalyubia", value: "القليوبية" },
  { key: "sharqia", value: "الشرقية" },
  { key: "dakahlia", value: "الدقهلية" },
  { key: "gharbia", value: "الغربية" },
  { key: "monufia", value: "المنوفية" },
  { key: "beheira", value: "البحيرة" },
  { key: "kafrElSheikh", value: "كفر الشيخ" },
  { key: "damietta", value: "دمياط" },
  { key: "portSaid", value: "بورسعيد" },
  { key: "ismailia", value: "الإسماعيلية" },
  { key: "suez", value: "السويس" },
  { key: "fayoum", value: "الفيوم" },
  { key: "beniSuef", value: "بني سويف" },
  { key: "minya", value: "المنيا" },
  { key: "assiut", value: "أسيوط" },
  { key: "sohag", value: "سوهاج" },
  { key: "qena", value: "قنا" },
  { key: "luxor", value: "الأقصر" },
  { key: "aswan", value: "أسوان" },
  { key: "redSea", value: "البحر الأحمر" },
  { key: "newValley", value: "الوادي الجديد" },
  { key: "matrouh", value: "مطروح" },
  { key: "northSinai", value: "شمال سيناء" },
  { key: "southSinai", value: "جنوب سيناء" },
];

// ======================================
// Customer Data
// ======================================

const initialCustomer: Customer = {
  name: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  delivery: "home",
  notes: "",
};

// ======================================
// Main Component
// ======================================

export default function LipstickOrder() {
  const { language, translations } = useLanguage();

  const tr = translations[language];
  const isArabic = language === "ar";
  const direction = isArabic ? "rtl" : "ltr";

  const [selectedShadeId, setSelectedShadeId] = useState(1);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customer, setCustomer] = useState<Customer>(initialCustomer);
  const [loaded, setLoaded] = useState(false);

  const selectedShade =
    shades.find((shade) => shade.id === selectedShadeId) || shades[0];

  const totalQuantity = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const orderItems: CartItem[] =
    cart.length > 0
      ? cart
      : [{ ...selectedShade, quantity: 1 }];

  const orderTotal = orderItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const formatPrice = (price: number) =>
    `${price.toLocaleString(isArabic ? "ar-EG" : "en-US")} ${tr.pound}`;

  const getShadeName = (shade: Shade) => {
    if (isArabic) return tr.shadesNames[shade.id as keyof typeof tr.shadesNames];
    return shade.name;
  };

  const getCategoryName = (category: CategoryKey) =>
    tr.categories[category];

  const getGovernorateName = (key: string) => {
    const governorate = governorates.find((item) => item.key === key);

    if (!governorate) return key;

    return tr.governorates[
      governorate.key as keyof typeof tr.governorates
    ];
  };

  const getDeliveryName = (value: string) => {
    const deliveryLabels: Record<string, string> = {
      home: tr.homeDelivery,
      shipping: tr.shippingCompany,
      pickup: tr.pickup,
      contact: tr.contactForDelivery,
    };

    return deliveryLabels[value] || value;
  };

  // ======================================
  // Load Cart
  // ======================================

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("orvelia-cart");

      if (savedCart) {
        const parsed = JSON.parse(savedCart);

        if (Array.isArray(parsed)) {
          setCart(parsed);
        }
      }
    } catch (error) {
      console.error("Could not load cart:", error);
    }

    setLoaded(true);
  }, []);

  // ======================================
  // Save Cart
  // ======================================

  useEffect(() => {
    if (!loaded) return;

    localStorage.setItem("orvelia-cart", JSON.stringify(cart));

    window.dispatchEvent(new Event("cartUpdated"));
  }, [cart, loaded]);

  // ======================================
  // Add To Cart
  // ======================================

  const addToCart = () => {
    setCart((previousCart) => {
      const existing = previousCart.find(
        (item) => item.id === selectedShade.id
      );

      if (existing) {
        return previousCart.map((item) =>
          item.id === selectedShade.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...previousCart,
        { ...selectedShade, quantity: 1 },
      ];
    });
  };

  // ======================================
  // Increase Quantity
  // ======================================

  const increaseQuantity = (id: number) => {
    setCart((previousCart) =>
      previousCart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // ======================================
  // Decrease Quantity
  // ======================================

  const decreaseQuantity = (id: number) => {
    setCart((previousCart) =>
      previousCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // ======================================
  // Remove Item
  // ======================================

  const removeFromCart = (id: number) => {
    setCart((previousCart) =>
      previousCart.filter((item) => item.id !== id)
    );
  };

  // ======================================
  // Update Customer
  // ======================================

  const updateCustomer = (
    field: keyof Customer,
    value: string
  ) => {
    setCustomer((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  // ======================================
  // Create Order Message
  // ======================================

  const createOrderMessage = () => {
    const itemsText = orderItems
      .map(
        (item, index) =>
          `${index + 1}. ${getShadeName(item)} (${item.name})\n${tr.quantityLabel}: ${item.quantity}\n${tr.price}: ${formatPrice(item.price)}\n${tr.total}: ${formatPrice(item.price * item.quantity)}`
      )
      .join("\n\n");

    return `
${tr.newOrder}

${tr.customerData}:
${tr.name}: ${customer.name}
${tr.phone}: ${customer.phone}
${tr.email}: ${customer.email || tr.noNotes}
${tr.city}: ${getGovernorateName(customer.city)}
${tr.address}: ${customer.address}

${tr.delivery}:
${getDeliveryName(customer.delivery)}

${tr.products}:
${itemsText}

${tr.orderNotes}:
${customer.notes || tr.noNotes}

${tr.totalPieces}: ${orderItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    )}

${tr.orderTotal}: ${formatPrice(orderTotal)}
`;
  };

  // ======================================
  // WhatsApp Order
  // ======================================

  const orderWhatsApp = () => {
    // استبدلي الرقم برقم واتساب المتجر الحقيقي
    const phoneNumber = "201XXXXXXXXX";

    const message = createOrderMessage();

    const url =
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  // ======================================
  // Email Order
  // ======================================

  const sendOrderEmail = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // استبدلي البريد ببريد المتجر الحقيقي
    const storeEmail = "your-store@email.com";

    const subject = tr.newOrder;
    const body = createOrderMessage();

    const mailtoUrl =
      `mailto:${storeEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;
  };

  // ======================================
  // Render
  // ======================================

  return (
    <main
      dir={direction}
      className="mx-auto w-full max-w-7xl space-y-10 px-4 py-12"
    >
      {/* Header */}

      <header className="text-center">
        <p className="mb-3 text-sm tracking-[5px] text-[#a47770]">
          ORVÉLIA BEAUTY
        </p>

        <h1 className="text-3xl font-bold text-[#392421] sm:text-4xl">
          {tr.chooseBeauty}
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-8 text-gray-500 sm:text-base">
          {tr.discover}
        </p>
      </header>

      {/* Shade Selection */}

      <section className="rounded-[28px] border border-[#eadedb] bg-white p-5 shadow-sm sm:p-8">
        <div className="mb-7 flex items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Palette className="text-[#9b625d]" size={22} />

              <h2 className="text-xl font-bold text-[#392421] sm:text-2xl">
                {tr.chooseShade}
              </h2>
            </div>

            <p className="mt-2 text-sm text-gray-500">
              {shades.length} {tr.shadesCount}
            </p>
          </div>

          <div className="rounded-xl bg-[#faf3f1] px-3 py-2 text-sm font-semibold text-[#9b625d]">
            {shades.length} {tr.colors}
          </div>
        </div>

        {/* Selected Shade Details */}

        <div className="mb-7 flex flex-col items-center gap-5 rounded-2xl bg-[#faf6f4] p-5 sm:flex-row">
          <div
            className="h-24 w-24 shrink-0 rounded-full border-4 border-white shadow-lg"
            style={{ backgroundColor: selectedShade.color }}
          />

          <div className="flex-1 text-center sm:text-start">
            <p className="text-xs text-gray-500">
              {tr.selectedShade}
            </p>

            <h3 className="mt-1 text-2xl font-bold text-[#392421]">
              {getShadeName(selectedShade)}
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              {isArabic ? selectedShade.name : selectedShade.ar}
            </p>

            <p className="mt-3 text-xl font-bold text-[#9b625d]">
              {formatPrice(selectedShade.price)}
            </p>
          </div>

          <button
            type="button"
            onClick={addToCart}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#392421] px-6 py-4 font-semibold text-white transition hover:bg-[#68443e] sm:w-auto"
          >
            <ShoppingBag size={19} />
            {tr.addToCart}
          </button>
        </div>

        {/* Dropdown Selection */}

        <div className="mb-8">
          <label className="mb-3 block text-sm font-bold text-[#392421]">
            {tr.chooseFromList}
          </label>

          <select
            value={selectedShadeId}
            onChange={(event) =>
              setSelectedShadeId(Number(event.target.value))
            }
            className="w-full rounded-xl border border-[#e8dcd8] bg-white px-4 py-4 text-sm text-[#392421] outline-none transition focus:border-[#9b625d]"
          >
            {categories.map((category) => (
              <optgroup
                key={category.key}
                label={getCategoryName(category.key)}
              >
                {shades
                  .filter((shade) => shade.category === category.value)
                  .map((shade) => (
                    <option key={shade.id} value={shade.id}>
                      {getShadeName(shade)} - {shade.name} - {formatPrice(shade.price)}
                    </option>
                  ))}
              </optgroup>
            ))}
          </select>
        </div>

        {/* Color Groups */}

        <div className="space-y-9">
          {categories.map((category) => {
            const categoryShades = shades.filter(
              (shade) => shade.category === category.value
            );

            return (
              <div key={category.key}>
                <h3 className={`mb-5 border-[#9b625d] px-3 text-lg font-bold text-[#392421] ${
                  isArabic ? "border-r-4" : "border-l-4"
                }`}>
                  {isArabic ? "درجات " : ""}{getCategoryName(category.key)}{isArabic ? "" : " Shades"}
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
                            : "border-[#eee7e4] bg-white hover:border-[#c49a94]"
                        }`}
                      >
                        <span
                          className={`relative h-12 w-12 shrink-0 rounded-full shadow-inner ${
                            active
                              ? "ring-2 ring-[#9b625d] ring-offset-2"
                              : ""
                          }`}
                          style={{ backgroundColor: shade.color }}
                        >
                          {active && (
                            <CheckCircle2
                              size={19}
                              className="absolute -top-1 rounded-full bg-white text-[#9b625d]"
                              style={{
                                [isArabic ? "left" : "right"]: "-4px",
                              }}
                            />
                          )}
                        </span>

                        <span className="min-w-0">
                          <span className="block truncate text-xs font-bold text-[#392421]">
                            {getShadeName(shade)}
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

      {/* METHOD 1 - WHATSAPP */}

      <section className="rounded-[28px] border border-[#e7dedb] bg-white p-5 shadow-sm sm:p-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f0f8f1] text-[#248b48]">
            <MessageCircle size={25} />
          </div>

          <div>
            <p className="text-xs font-semibold text-[#248b48]">
              {tr.firstMethod}
            </p>

            <h2 className="text-xl font-bold text-[#392421]">
              {tr.whatsappOrder}
            </h2>
          </div>
        </div>

        <p className="mb-5 text-sm leading-7 text-gray-500">
          {tr.whatsappDescription}
        </p>

        <div className="mb-5 rounded-xl bg-[#faf6f4] p-4">
          <p className="text-sm text-[#392421]">
            {tr.orderProducts}
          </p>

          <p className="mt-2 font-bold text-[#9b625d]">
            {orderItems.length} {tr.product} — {formatPrice(orderTotal)}
          </p>
        </div>

        <button
          type="button"
          onClick={orderWhatsApp}
          className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#238b49] px-6 py-5 font-bold text-white transition hover:bg-[#176d38]"
        >
          <MessageCircle size={22} />
          {tr.sendWhatsApp}
        </button>
      </section>

      {/* METHOD 2 - CUSTOMER DATA */}

      <section
        id="order-customer-form"
        className="rounded-[28px] border border-[#e7dedb] bg-white p-5 shadow-sm sm:p-8"
      >
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f8f0ec] text-[#9b625d]">
            <Mail size={25} />
          </div>

          <div>
            <p className="text-xs font-semibold text-[#9b625d]">
              {tr.secondMethod}
            </p>

            <h2 className="text-xl font-bold text-[#392421]">
              {tr.orderDetails}
            </h2>
          </div>
        </div>

        <p className="mb-7 text-sm leading-7 text-gray-500">
          {tr.orderDescription}
        </p>

        <form onSubmit={sendOrderEmail} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            {/* Name */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#392421]">
                {tr.fullName} *
              </label>

              <input
                required
                type="text"
                value={customer.name}
                onChange={(e) =>
                  updateCustomer("name", e.target.value)
                }
                placeholder={isArabic ? "اكتبي اسمك بالكامل" : "Enter your full name"}
                className="w-full rounded-xl border border-[#e8dcd8] px-4 py-4 text-sm outline-none focus:border-[#9b625d]"
              />
            </div>

            {/* Phone */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#392421]">
                {tr.phone} *
              </label>

              <input
                required
                type="tel"
                value={customer.phone}
                onChange={(e) =>
                  updateCustomer("phone", e.target.value)
                }
                placeholder="01xxxxxxxxx"
                className="w-full rounded-xl border border-[#e8dcd8] px-4 py-4 text-sm outline-none focus:border-[#9b625d]"
              />
            </div>

            {/* Email */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#392421]">
                {tr.email}
              </label>

              <input
                type="email"
                value={customer.email}
                onChange={(e) =>
                  updateCustomer("email", e.target.value)
                }
                placeholder="example@email.com"
                className="w-full rounded-xl border border-[#e8dcd8] px-4 py-4 text-sm outline-none focus:border-[#9b625d]"
              />
            </div>

            {/* Governorate */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#392421]">
                {tr.governorate} *
              </label>

              <select
                required
                value={customer.city}
                onChange={(e) =>
                  updateCustomer("city", e.target.value)
                }
                className="w-full rounded-xl border border-[#e8dcd8] bg-white px-4 py-4 text-sm outline-none focus:border-[#9b625d]"
              >
                <option value="">
                  {tr.chooseGovernorate}
                </option>

                {governorates.map((governorate) => (
                  <option
                    key={governorate.key}
                    value={governorate.key}
                  >
                    {tr.governorates[
                      governorate.key as keyof typeof tr.governorates
                    ]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Address */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#392421]">
              {tr.address} *
            </label>

            <textarea
              required
              rows={3}
              value={customer.address}
              onChange={(e) =>
                updateCustomer("address", e.target.value)
              }
              placeholder={tr.addressPlaceholder}
              className="w-full resize-y rounded-xl border border-[#e8dcd8] px-4 py-4 text-sm outline-none focus:border-[#9b625d]"
            />
          </div>

          {/* Delivery Method */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#392421]">
              {tr.deliveryMethod} *
            </label>

            <select
              required
              value={customer.delivery}
              onChange={(e) =>
                updateCustomer("delivery", e.target.value)
              }
              className="w-full rounded-xl border border-[#e8dcd8] bg-white px-4 py-4 text-sm outline-none focus:border-[#9b625d]"
            >
              <option value="home">{tr.homeDelivery}</option>
              <option value="shipping">{tr.shippingCompany}</option>
              <option value="pickup">{tr.pickup}</option>
              <option value="contact">{tr.contactForDelivery}</option>
            </select>
          </div>

          {/* Notes */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#392421]">
              {tr.notes}
            </label>

            <textarea
              rows={2}
              value={customer.notes}
              onChange={(e) =>
                updateCustomer("notes", e.target.value)
              }
              placeholder={tr.notesPlaceholder}
              className="w-full resize-y rounded-xl border border-[#e8dcd8] px-4 py-4 text-sm outline-none focus:border-[#9b625d]"
            />
          </div>

          {/* Order Total */}

          <div className="rounded-xl bg-[#faf6f4] p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                {tr.orderTotal}
              </span>

              <strong className="text-xl text-[#9b625d]">
                {formatPrice(orderTotal)}
              </strong>
            </div>
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#9b625d] px-6 py-5 font-bold text-white transition hover:bg-[#80504b]"
          >
            <Mail size={21} />
            {tr.prepareEmail}
          </button>

          <p className="text-center text-xs leading-6 text-gray-400">
            {tr.emailNotice}
          </p>
        </form>
      </section>

      {/* METHOD 3 - SHOPPING CART */}

      <section className="rounded-[28px] border border-[#e7dedb] bg-white p-5 shadow-sm sm:p-8">
        <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f8f0ec] text-[#9b625d]">
              <ShoppingBag size={25} />
            </div>

            <div>
              <p className="text-xs font-semibold text-[#9b625d]">
                {tr.thirdMethod}
              </p>

              <h2 className="text-xl font-bold text-[#392421]">
                {tr.cart}
              </h2>
            </div>
          </div>

          <span className="rounded-xl bg-[#faf3f1] px-4 py-2 text-sm font-bold text-[#9b625d]">
            {totalQuantity} {tr.piece}
          </span>
        </div>

        {/* Empty Cart */}

        {cart.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#e4d7d3] bg-[#fdfaf9] px-5 py-12 text-center">
            <ShoppingBag
              size={42}
              className="mx-auto text-[#c5a7a0]"
            />

            <h3 className="mt-4 font-bold text-[#392421]">
              {tr.emptyCart}
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              {tr.emptyCartDescription}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-4 rounded-2xl border border-[#eee5e2] p-4 sm:flex-row sm:items-center"
              >
                <div className="flex flex-1 items-center gap-4">
                  <div
                    className="h-16 w-16 shrink-0 rounded-xl shadow-inner"
                    style={{ backgroundColor: item.color }}
                  />

                  <div>
                    <h3 className="font-bold text-[#392421]">
                      {getShadeName(item)}
                    </h3>

                    <p className="mt-1 text-xs text-gray-500">
                      {isArabic ? item.name : item.ar}
                    </p>

                    <p className="mt-2 font-bold text-[#9b625d]">
                      {formatPrice(item.price)}
                    </p>
                  </div>
                </div>

                {/* Quantity Controls */}

                <div className="flex items-center justify-between gap-3 sm:justify-center">
                  <div className="flex items-center gap-3 rounded-xl bg-[#faf6f4] p-2">
                    <button
                      type="button"
                      onClick={() => decreaseQuantity(item.id)}
                      aria-label={tr.decrease}
                      title={tr.decrease}
                      className="rounded-lg p-2 text-[#392421] hover:bg-white"
                    >
                      <Minus size={16} />
                    </button>

                    <span className="min-w-5 text-center font-bold">
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() => increaseQuantity(item.id)}
                      aria-label={tr.increase}
                      title={tr.increase}
                      className="rounded-lg p-2 text-[#392421] hover:bg-white"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    aria-label={tr.remove}
                    title={tr.remove}
                    className="rounded-xl bg-red-50 p-3 text-red-600 transition hover:bg-red-100"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                {/* Item Total */}

                <div className="text-start sm:min-w-28">
                  <p className="text-xs text-gray-500">
                    {tr.itemTotal}
                  </p>

                  <p className="mt-1 font-bold text-[#392421]">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Cart Summary */}

        <div className="mt-7 rounded-2xl bg-[#faf6f4] p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              {tr.quantity}
            </span>

            <strong className="text-[#392421]">
              {totalQuantity}
            </strong>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-[#eadedb] pt-4">
            <span className="font-bold text-[#392421]">
              {tr.purchasesTotal}
            </span>

            <strong className="text-2xl text-[#9b625d]">
              {formatPrice(totalPrice)}
            </strong>
          </div>

          <p className="mt-3 text-xs text-gray-400">
            {tr.shippingCost}
          </p>
        </div>

        {/* Cart Actions */}

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={orderWhatsApp}
            disabled={cart.length === 0}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#238b49] px-5 py-4 font-bold text-white transition hover:bg-[#176d38] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <MessageCircle size={19} />
            {tr.sendCart}
          </button>

          <button
            type="button"
            onClick={() =>
              document
                .getElementById("order-customer-form")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            disabled={cart.length === 0}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#392421] px-5 py-4 font-bold text-white transition hover:bg-[#68443e] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Truck size={19} />
            {tr.completeShipping}
          </button>
        </div>
      </section>

      {/* Footer */}

      <div className="flex items-center justify-center gap-2 pb-5 text-center text-xs text-gray-400">
        <Package size={16} />

        <span>{tr.footer}</span>
      </div>
    </main>
  );
}
