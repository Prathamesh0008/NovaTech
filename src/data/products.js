// src/data/products.js

// === Dynamically import ALL product images (including nested folders) ===
const images = import.meta.glob("../assets/products/**/*.{jpg,jpeg,png,webp}", {
  eager: true,
});


const getImages = (name, category) => {
  if (!name) return [];

  const normalizedName = name
    .toLowerCase()
    .replace(/\s+/g, "_") // replace spaces with underscores
    .replace(/[^a-z0-9_]/g, ""); // strip unwanted chars

  const normalizedCat = (category || "").toLowerCase();

  // Match both category folder and normalized name
  const found = Object.keys(images)
    .filter((key) => {
      const cleanKey = key.toLowerCase().replace(/[^a-z0-9_/]/g, "");
      return cleanKey.includes(normalizedName) && cleanKey.includes(normalizedCat);
    })
    .map((key) => images[key].default);

  if (found.length > 0) return found;

  // ✅ fallback placeholders
  return [
    "https://via.placeholder.com/500x500?text=Image+Coming+Soon",
    "https://via.placeholder.com/500x500?text=Image+Coming+Soon",
    "https://via.placeholder.com/500x500?text=Image+Coming+Soon",
  ];
};

// === CAS NUMBER MAP ===
const CAS = {
  FEMANOVA: "112809-51-5",
  TAMONOVA: "54965-24-1",
  NOVAZOLE: "120511-73-1",
  AROMANOVA: "107868-30-4",
  ENCLOMINOVA: "7599-79-3",
  PRIMONOVA_TABLET: "0434-05-09",
  SUPERNOVA: "3381-88-2",
  TELINOVA: "144701-48-4",
  TURINOVA: "2446-23-3",
  NOVA_T4: "55-03-8",
  CABERNOVA: "81409-90-7",
  HALONOVA: "76-43-7",
  NOVA_T3: "55-06-1",
  NOVABOL: "53-39-4",
  PROVINOVA: "1424-00-6",
  OXYDROL: "0434-07-01",
  NOVAMOREN: "159752-10-0",
  NOVAMETH: "72-63-9",
  SPIROCLEN: "21898-19-1",
  STANOVA50: "10418-03-08",
  STANOVA10: "10418-03-08",
  CLOMINOVA: "50-41-9",

  // Injectables
  "TESTOVA P": "57-85-2",
  SUSTOVA: "68924-89-0",
  "TESTOVA C": "58-20-8",
  "TESTOVA E": "315-37-7",
  BOLDENOVA: "13103-34-9",
  "NANDROVA D": "360-70-3",
  "NANDROVA P": "62-90-8",
  "TRENOVA A": "10161-34-9",
  "TRENOVA E": "10161-33-8",
  TRENOVAHEXA: "23454-33-3",
  "DROSTANOVA P": "521-12-0",
  PRIMONOVA_INJ: "303-42-4",
  ROXONOVA: "10418-03-08",
  "TESTOVA PP": "1255-49-8",
  "TESTOVA BASE": "58-22-0",
};



// === TABLETS ===
const tablets = [
  {
    name: "FEMANOVA",
    description: "LETRAZOLE 2.5 mg",
    indication: "Used to treat hormone-dependent breast cancer and for ovulation induction.",
    presentation: "Box of 10 tablets, 2.5 mg each.",
  },
  {
    name: "TAMONOVA",
    description: "TAMOXIFEN CITRATE 20 mg",
    indication: "Blocks estrogen receptors; used for prevention and treatment of breast cancer.",
    presentation: "Blister pack of 10 tablets, 20 mg each.",
  },
  {
    name: "NOVAZOLE",
    description: "ANASTRAZOLE 1 mg",
    indication: "Aromatase inhibitor reducing estrogen levels; used in breast cancer therapy.",
    presentation: "Blister pack of 10 tablets, 1 mg each.",
  },
  {
    name: "AROMANOVA",
    description: "EXEMESTANE 25 mg",
    indication: "Used for adjuvant treatment of estrogen receptor-positive breast cancer.",
    presentation: "Pack of 10 tablets, 25 mg each.",
  },
  {
    name: "ENCLOMINOVA",
    description: "ENCLOMIPHENE CITRATE 25 mg",
    indication: "Used to treat infertility and improve testosterone levels.",
    presentation: "Box of 10 tablets, 25 mg each.",
  },
  {
    name: "PRIMONOVA",
    description: "METENOLONE ACETATE 25 mg",
    indication: "Mild anabolic support for therapeutic recovery and muscle preservation.",
    presentation: "Bottle of 50 tablets, 25 mg each.",
  },
  {
    name: "SUPERNOVA",
    description: "METHYLDROSTANALONE 10 mg",
    indication: "Helps promote lean muscle and physical conditioning under supervision.",
    presentation: "Bottle of 100 tablets, 10 mg each.",
  },
  {
    name: "TELINOVA",
    description: "TELMISARTAN",
    indication: "Used to manage high blood pressure and reduce cardiovascular risk.",
    presentation: "Blister pack of 10 tablets.",
  },
  {
    name: "TURINOVA",
    description: "CHLORODEHYDROMETHYLTESTOSTERONE 10 mg",
    indication: "Used for therapeutic anabolic recovery and muscle support.",
    presentation: "Bottle of 50 tablets, 10 mg each.",
  },
  {
    name: "NOVA_T4",
    description: "LEVOTHYROXINE SODIUM T4 50 mcg",
    indication: "Replaces or supplements thyroid hormone to treat hypothyroidism.",
    presentation: "Blister pack of 10 tablets, 50 mcg each.",
  },
  {
    name: "CABERNOVA",
    description: "CABERGOLINE 0.5 mg",
    indication: "Used to treat high prolactin levels and associated hormonal imbalance.",
    presentation: "Box of 8 tablets, 0.5 mg each.",
  },
  {
    name: "HALONOVA",
    description: "FLUOXYMESTERONE 5 mg",
    indication: "Used for testosterone replacement and therapeutic muscle preservation.",
    presentation: "Blister pack of 10 tablets, 5 mg each.",
  },
  {
    name: "NOVA_T3",
    description: "LIOTHYRONINE SODIUM T3 50 mcg",
    indication: "Used to treat hypothyroidism and support metabolism regulation.",
    presentation: "Pack of 10 tablets, 50 mcg each.",
  },
  {
    name: "NOVABOL",
    description: "OXANDROLONE USP 10 mg",
    indication: "Promotes muscle recovery and protein synthesis.",
    presentation: "Bottle of 100 tablets, 10 mg each.",
  },
  {
    name: "PROVINOVA",
    description: "MASTEROLONE USP 25 mg",
    indication: "Used for androgen deficiency and hormonal therapy.",
    presentation: "Box of 10 tablets, 25 mg each.",
  },
  {
    name: "OXYDROL",
    description: "OXYMETHOLONE USP 50 mg",
    indication: "An anabolic agent used for therapeutic recovery and muscle repair.",
    presentation: "Bottle of 100 tablets, 50 mg each.",
  },
  {
    name: "NOVAMOREN",
    description: "MK-677 10 mg",
    indication: "Supports growth hormone secretion and recovery.",
    presentation: "Bottle of 30 tablets, 10 mg each.",
  },
  {
    name: "NOVAMETH",
    description: "METHANDIENONE 10 mg",
    indication: "An anabolic therapeutic compound aiding recovery and energy balance.",
    presentation: "Bottle of 50 tablets, 10 mg each.",
  },
  {
    name: "SPIROCLEN",
    description: "CLENBUTEROL HYDROCHLORIDE 40 mcg",
    indication: "Used for bronchodilation and therapeutic respiratory support.",
    presentation: "Pack of 10 tablets, 40 mcg each.",
  },
  {
    name: "STANOVA 50",
    description: "STANOZOLOL USP 50 mg",
    indication: "Used for muscle strengthening and tissue repair.",
    presentation: "Box of 10 tablets, 50 mg each.",
  },
  {
    name: "STANOVA 10",
    description: "STANOZOLOL USP 10 mg",
    indication: "Helps with anabolic recovery and physical therapy under supervision.",
    presentation: "Bottle of 50 tablets, 10 mg each.",
  },
  {
    name: "CLOMINOVA",
    description: "CLOMIPHENE 50 mg",
    indication: "Used to stimulate ovulation and improve reproductive function.",
    presentation: "Box of 10 tablets, 50 mg each.",
  },
];

// === INJECTABLES ===
const injectables = [
  {
    name: "TESTOVA P",
    description: "TESTOSTERONE PROPIONATE 100 mg/ml",
    indication: "Short-acting testosterone for hormone replacement therapy.",
    presentation: "1 ml ampoule, 100 mg/ml.",
  },
  {
    name: "SUSTOVA",
    description: "TESTOSTERONE BLEND 250 mg/ml",
    indication: "A mixed ester blend for stable testosterone delivery.",
    presentation: "10 ml vial, 250 mg/ml.",
  },
  {
    name: "TESTOVA C",
    description: "TESTOSTERONE CYPIONATE 250 mg/ml",
    indication: "Long-acting testosterone used in replacement therapy.",
    presentation: "10 ml vial, 250 mg/ml.",
  },
  {
    name: "TESTOVA E",
    description: "TESTOSTERONE ENANTHATE 250 mg/ml",
    indication: "Common testosterone ester for hormone therapy.",
    presentation: "10 ml vial, 250 mg/ml.",
  },
  {
    name: "BOLDENOVA",
    description: "BOLDENONE UNDECYLENATE 250 mg/ml",
    indication: "Used to enhance red blood cell production and recovery.",
    presentation: "10 ml vial, 250 mg/ml.",
  },
  {
    name: "NANDROVA D",
    description: "NANDROLONE DECANOATE 250 mg/ml",
    indication: "Used for therapeutic anemia and muscle recovery.",
    presentation: "10 ml vial, 250 mg/ml.",
  },
  {
    name: "NANDROVA P",
    description: "NANDROLONE PHENYLPROPIONATE 100 mg/ml",
    indication: "Fast-acting anabolic used for recovery and therapy.",
    presentation: "10 ml vial, 100 mg/ml.",
  },
  {
    name: "TRENOVA A",
    description: "TRENBOLONE ACETATE 100 mg/ml",
    indication: "Short-acting anabolic for medical recovery protocols.",
    presentation: "10 ml vial, 100 mg/ml.",
  },
  {
    name: "TRENOVA E",
    description: "TRENBOLONE ENANTHATE 200 mg/ml",
    indication: "Long-acting form for therapeutic recovery cycles.",
    presentation: "10 ml vial, 200 mg/ml.",
  },
  {
    name: "TRENOVAHEXA",
    description: "TRENBOLONE HEXA HYDROBENZYLCARBONATE 76.5 mg/ml",
    indication: "Extended-acting anabolic used in therapeutic contexts.",
    presentation: "10 ml vial, 76.5 mg/ml.",
  },
  {
    name: "DROSTANOVA P",
    description: "DROSTANOLONE PROPIONATE 100 mg/ml",
    indication: "Used for therapeutic enhancement of muscle strength.",
    presentation: "10 ml vial, 100 mg/ml.",
  },
  {
    name: "PRIMONOVA",
    description: "METHENOLONE ENANTHATE 100 mg/ml",
    indication: "Long-acting anabolic used for recovery and strength.",
    presentation: "10 ml vial, 100 mg/ml.",
  },
  {
    name: "ROXONOVA",
    description: "STANOZOLOL 50 mg/ml",
    indication: "Used therapeutically for muscle preservation and recovery.",
    presentation: "10 ml vial, 50 mg/ml.",
  },
  {
    name: "TESTOVA PP",
    description: "TESTOSTERONE PHENYLPROPIONATE 100 mg/ml",
    indication: "Short-medium acting testosterone for hormone therapy.",
    presentation: "10 ml vial, 100 mg/ml.",
  },
  {
    name: "TESTOVA BASE",
    description: "TESTOSTERONE SUSPENSION 100 mg/ml",
    indication: "Water-based testosterone for immediate hormone release.",
    presentation: "10 ml vial, 100 mg/ml.",
  },
  {
    name: "NOVA GAIN C",
    description:
      "Boldenone 150 mg + Nandrolone 150 mg + Testosterone Cypionate 100 mg + Testosterone Enanthate 150 mg + Sustanon 100 mg",
    indication: "Therapeutic multi-compound blend supporting recovery.",
    presentation: "10 ml vial, 650 mg/ml total concentration.",
  },
  {
    name: "NOVA CUT MIX",
    description:
      "Testosterone Propionate 150 mg + Trenbolone Acetate 150 mg + Drostanolone Propionate 150 mg",
    indication: "Multi-compound for strength recovery and definition.",
    presentation: "10 ml vial, 450 mg/ml total concentration.",
  },
];

// === EXPORT MERGED PRODUCT LIST ===
export const products = [
  ...tablets.map((p) => ({
    ...p,
    id: `tab-${p.name}`,
    category: "Tablets",
    cas: CAS[p.name] || CAS[p.name.replace(/\s/g, "")] || null,
    images: getImages(p.name, "tablets"),
  })),

  ...injectables.map((p) => ({
    ...p,
    id: `inj-${p.name}`,
    category: "Injectables",
    cas: CAS[p.name] || CAS[p.name.replace(/\s/g, "")] || null,
    images: getImages(p.name, "injectables"),
  })),
];
