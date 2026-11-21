
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

export type Language = "ar" | "en";

const translations = {
  ar: {
    chooseBeauty: "اختاري جمالك بطريقتك",
    discover: "اكتشفي مجموعتنا المتنوعة من ألوان أحمر الشفاه، اختاري الدرجة المناسبة لكِ، ثم أكملي طلبك بالطريقة التي تفضلينها.",
    chooseShade: "اختاري درجة أحمر الشفاه",
    shadesCount: "درجة مختلفة بأسعار متنوعة",
    colors: "لون",
    selectedShade: "الدرجة المختارة",
    addToCart: "أضيفي للسلة",
    chooseFromList: "اختاري اللون والدرجة من القائمة",
    shades: "درجات",
    firstMethod: "الطريقة الأولى",
    whatsappOrder: "الطلب عبر واتساب",
    whatsappDescription: "اضغطي على الزر لإرسال تفاصيل المنتجات والكميات والأسعار وبياناتك إلى واتساب المتجر.",
    orderProducts: "المنتجات الموجودة في الطلب:",
    product: "منتج / درجة",
    sendWhatsApp: "إرسال الطلب عبر واتساب",
    secondMethod: "الطريقة الثانية",
    orderDetails: "إرسال بيانات الطلب",
    orderDescription: "اكتبي بياناتك واختاري طريقة استلام المنتجات، وسيتم تجهيز تفاصيل الطلب في رسالة بريد إلكتروني.",
    fullName: "الاسم بالكامل",
    phone: "رقم الهاتف",
    email: "البريد الإلكتروني",
    governorate: "المحافظة",
    chooseGovernorate: "اختاري المحافظة",
    address: "العنوان بالتفصيل",
    addressPlaceholder: "الشارع، المنطقة، رقم العقار، وأي تفاصيل تساعد في التوصيل",
    deliveryMethod: "طريقة استلام المنتج",
    homeDelivery: "شحن إلى المنزل",
    shippingCompany: "عن طريق شركة شحن",
    pickup: "استلام من نقطة البيع",
    contactForDelivery: "التواصل لتحديد طريقة الاستلام",
    notes: "ملاحظات إضافية",
    notesPlaceholder: "أي تفاصيل إضافية عن طلبك...",
    orderTotal: "إجمالي الطلب",
    prepareEmail: "تجهيز وإرسال بيانات الطلب",
    emailNotice: "سيتم فتح تطبيق البريد الإلكتروني لإرسال تفاصيل طلبك.",
    thirdMethod: "الطريقة الثالثة",
    cart: "سلة المشتريات",
    piece: "قطعة",
    emptyCart: "السلة فارغة",
    emptyCartDescription: "اختاري درجة أحمر الشفاه واضغطي أضيفي للسلة.",
    decrease: "تقليل الكمية",
    increase: "زيادة الكمية",
    remove: "حذف المنتج",
    itemTotal: "إجمالي المنتج",
    quantity: "عدد القطع",
    purchasesTotal: "إجمالي المشتريات",
    shippingCost: "تكلفة الشحن يتم تحديدها حسب المحافظة وطريقة الاستلام.",
    sendCart: "إرسال السلة عبر واتساب",
    completeShipping: "إكمال بيانات الشحن",
    footer: "ORVÉLIA BEAUTY — اختاري درجتك واستمتعي بتجربة تسوق مميزة",
    pound: "جنيه",
    noNotes: "لا توجد",
    newOrder: "طلب جديد من متجر ORVÉLIA",
    customerData: "بيانات العميلة",
    name: "الاسم",
    city: "المحافظة",
    delivery: "طريقة الاستلام",
    products: "المنتجات",
    quantityLabel: "الكمية",
    price: "السعر",
    total: "الإجمالي",
    orderNotes: "ملاحظات",
    totalPieces: "إجمالي عدد القطع",
    required: "هذا الحقل مطلوب",
    categories: {
      red: "أحمر",
      pink: "وردي",
      mauve: "موف",
      nude: "نود",
      brown: "بني",
      coral: "مرجاني",
    },
    shadesNames: {
      1: "أحمر ياقوتي",
      2: "أحمر كلاسيكي",
      3: "أحمر كرزي",
      4: "نبيتي غامق",
      5: "أحمر خمري",
      6: "ميرلوت داكن",
      7: "أحمر طوبي",
      8: "أحمر دموي",
      9: "وردي فاتح",
      10: "روز ترابي",
      11: "وردي روز",
      12: "وردي كلاسيكي",
      13: "روز غامق",
      14: "فوشيا",
      15: "وردي ناعم",
      16: "وردي توتي",
      17: "موف نود",
      18: "موف هادئ",
      19: "برقوقي",
      20: "برقوقي غامق",
      21: "موف وردي",
      22: "موف بني",
      23: "كراميل نود",
      24: "نود دافئ",
      25: "خوخي نود",
      26: "وردي نود",
      27: "بيج نود",
      28: "نود طبيعي",
      29: "موكا بني",
      30: "شوكولاتة",
      31: "قرفة",
      32: "تيراكوتا",
      33: "كاكاو غامق",
      34: "بني قهوة",
      35: "مرجاني",
      36: "خوخي مرجاني",
      37: "برتقالي محروق",
      38: "خوخي دافئ",
    },
    governorates: {
      cairo: "القاهرة",
      giza: "الجيزة",
      alexandria: "الإسكندرية",
      qalyubia: "القليوبية",
      sharqia: "الشرقية",
      dakahlia: "الدقهلية",
      gharbia: "الغربية",
      monufia: "المنوفية",
      beheira: "البحيرة",
      kafrElSheikh: "كفر الشيخ",
      damietta: "دمياط",
      portSaid: "بورسعيد",
      ismailia: "الإسماعيلية",
      suez: "السويس",
      fayoum: "الفيوم",
      beniSuef: "بني سويف",
      minya: "المنيا",
      assiut: "أسيوط",
      sohag: "سوهاج",
      qena: "قنا",
      luxor: "الأقصر",
      aswan: "أسوان",
      redSea: "البحر الأحمر",
      newValley: "الوادي الجديد",
      matrouh: "مطروح",
      northSinai: "شمال سيناء",
      southSinai: "جنوب سيناء",
    },
  },

  en: {
    chooseBeauty: "Choose Your Beauty, Your Way",
    discover: "Explore our diverse lipstick collection, choose your favorite shade, and complete your order using your preferred method.",
    chooseShade: "Choose Your Lipstick Shade",
    shadesCount: "Different shades with various prices",
    colors: "Colors",
    selectedShade: "Selected Shade",
    addToCart: "Add to Cart",
    chooseFromList: "Choose a color and shade from the list",
    shades: "Shades",
    firstMethod: "Method One",
    whatsappOrder: "Order via WhatsApp",
    whatsappDescription: "Click the button to send product details, quantities, prices, and your information to the store's WhatsApp.",
    orderProducts: "Products in your order:",
    product: "Product / Shade",
    sendWhatsApp: "Send Order via WhatsApp",
    secondMethod: "Method Two",
    orderDetails: "Submit Order Details",
    orderDescription: "Enter your information and choose your delivery method. Your order details will be prepared in an email.",
    fullName: "Full Name",
    phone: "Phone Number",
    email: "Email Address",
    governorate: "Governorate",
    chooseGovernorate: "Choose your governorate",
    address: "Full Address",
    addressPlaceholder: "Street, area, building number, and any delivery details",
    deliveryMethod: "Delivery Method",
    homeDelivery: "Home Delivery",
    shippingCompany: "Shipping Company",
    pickup: "Pickup from Store",
    contactForDelivery: "Contact me to arrange delivery",
    notes: "Additional Notes",
    notesPlaceholder: "Any additional details about your order...",
    orderTotal: "Order Total",
    prepareEmail: "Prepare and Send Order Details",
    emailNotice: "Your email application will open to send your order details.",
    thirdMethod: "Method Three",
    cart: "Shopping Cart",
    piece: "Items",
    emptyCart: "Your Cart Is Empty",
    emptyCartDescription: "Choose a lipstick shade and click Add to Cart.",
    decrease: "Decrease quantity",
    increase: "Increase quantity",
    remove: "Remove product",
    itemTotal: "Item Total",
    quantity: "Quantity",
    purchasesTotal: "Shopping Total",
    shippingCost: "Shipping cost depends on the governorate and delivery method.",
    sendCart: "Send Cart via WhatsApp",
    completeShipping: "Complete Shipping Details",
    footer: "ORVÉLIA BEAUTY — Choose your shade and enjoy a special shopping experience",
    pound: "EGP",
    noNotes: "None",
    newOrder: "New Order from ORVÉLIA Store",
    customerData: "Customer Information",
    name: "Name",
    city: "Governorate",
    delivery: "Delivery Method",
    products: "Products",
    quantityLabel: "Quantity",
    price: "Price",
    total: "Total",
    orderNotes: "Notes",
    totalPieces: "Total Items",
    required: "This field is required",
    categories: {
      red: "Red",
      pink: "Pink",
      mauve: "Mauve",
      nude: "Nude",
      brown: "Brown",
      coral: "Coral",
    },
    shadesNames: {
      1: "Ruby Red",
      2: "Classic Red",
      3: "Cherry Red",
      4: "Deep Burgundy",
      5: "Wine Red",
      6: "Dark Merlot",
      7: "Brick Red",
      8: "Blood Red",
      9: "Baby Pink",
      10: "Dusty Rose",
      11: "Rose Pink",
      12: "Vintage Pink",
      13: "Deep Rose",
      14: "Fuchsia",
      15: "Soft Pink",
      16: "Berry Pink",
      17: "Mauve Nude",
      18: "Soft Mauve",
      19: "Plum",
      20: "Dark Plum",
      21: "Purple Rose",
      22: "Mauve Brown",
      23: "Caramel Nude",
      24: "Warm Nude",
      25: "Peach Nude",
      26: "Pink Nude",
      27: "Beige Nude",
      28: "Natural Nude",
      29: "Mocha Brown",
      30: "Chocolate",
      31: "Cinnamon",
      32: "Terracotta",
      33: "Deep Cocoa",
      34: "Coffee Brown",
      35: "Coral",
      36: "Peach Coral",
      37: "Burnt Orange",
      38: "Warm Peach",
    },
    governorates: {
      cairo: "Cairo",
      giza: "Giza",
      alexandria: "Alexandria",
      qalyubia: "Qalyubia",
      sharqia: "Sharqia",
      dakahlia: "Dakahlia",
      gharbia: "Gharbia",
      monufia: "Monufia",
      beheira: "Beheira",
      kafrElSheikh: "Kafr El Sheikh",
      damietta: "Damietta",
      portSaid: "Port Said",
      ismailia: "Ismailia",
      suez: "Suez",
      fayoum: "Fayoum",
      beniSuef: "Beni Suef",
      minya: "Minya",
      assiut: "Assiut",
      sohag: "Sohag",
      qena: "Qena",
      luxor: "Luxor",
      aswan: "Aswan",
      redSea: "Red Sea",
      newValley: "New Valley",
      matrouh: "Matrouh",
      northSinai: "North Sinai",
      southSinai: "South Sinai",
    },
  },
} as const;

type TranslationKey = keyof typeof translations.ar;

type TranslationValue =
  | (typeof translations.ar)[TranslationKey]
  | (typeof translations.en)[TranslationKey];

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  t: (key: TranslationKey) => TranslationValue;
  translations: typeof translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("ar");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");

    if (savedLanguage === "ar" || savedLanguage === "en") {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((previous) => (previous === "ar" ? "en" : "ar"));
  };

  const t = (key: TranslationKey): TranslationValue => {
    return translations[language][key] as TranslationValue;
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, toggleLanguage, t, translations }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }

  return context;
}
