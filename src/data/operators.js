/**
 * Indian Non-Scheduled Operators (NSOP) Database
 * Source: DGCA "List of Non-Scheduled Operators (Updated as on 28.02.2026)"
 * Total: 137 operators
 */

const operators = [
  {
    id: 1,
    name: "Aerokalinga Aviation Pvt. Ltd.",
    city: "Angul",
    state: "Odisha",
    aopNo: "#17/2025",
    validUpto: "2030-10-15",
    totalAircraft: 2,
    fleet: [
      { model: "Beech Super King Air B200", modelId: 'beech-super-king-air-b200', type: 'FW', registration: 'VT-YUD', seatingCapacity: 8 },
      { model: "EMB-135 (Legacy 600)", modelId: 'emb-135-legacy-600', type: 'FW', registration: 'VT-OXL', seatingCapacity: 13 },
    ]
  },
  {
    id: 2,
    name: "Afcom Holdings Ltd.",
    city: "Chennai",
    state: "Tamil Nadu",
    aopNo: "#12/2024",
    validUpto: "2029-12-11",
    totalAircraft: 2,
    fleet: [
      { model: "B737-800 Freighter", modelId: 'b737-800-freighter', type: 'FW', registration: 'VT-AFO', seatingCapacity: 'Cargo' },
      { model: "B737-800 Freighter", modelId: 'b737-800-freighter', type: 'FW', registration: 'VT-AFN', seatingCapacity: 'Cargo' },
    ]
  },
  {
    id: 3,
    name: "Airports Authority of India",
    city: "New Delhi",
    state: "Delhi",
    aopNo: "#03/2019",
    validUpto: "2029-05-14",
    totalAircraft: 4,
    fleet: [
      { model: "Super King Air B300", modelId: 'super-king-air-b300', type: 'FW', registration: 'VT-FIU', seatingCapacity: 4 },
      { model: "Dornier DO-228-201", modelId: 'dornier-do-228-201', type: 'FW', registration: 'VT-EPU', seatingCapacity: 7 },
      { model: "Super King Air B300", modelId: 'super-king-air-b300', type: 'FW', registration: 'VT-FIS', seatingCapacity: 'Aerial Work' },
      { model: "Super King Air B300", modelId: 'super-king-air-b300', type: 'FW', registration: 'VT-CNS', seatingCapacity: 'Aerial Work' },
    ]
  },
  {
    id: 4,
    name: "Air Charters Services Pvt. Ltd.",
    city: "New Delhi",
    state: "Delhi",
    aopNo: "#15/2008",
    validUpto: "2029-05-14",
    totalAircraft: 10,
    fleet: [
      { model: "Super King Air B200", modelId: 'super-king-air-b200', type: 'FW', registration: 'VT-FAE', seatingCapacity: 7 },
      { model: "Agusta A109S", modelId: 'agusta-a109s', type: 'RW', registration: 'VT-IKR', seatingCapacity: 6 },
      { model: "Cessna Citation 560XL Excel", modelId: 'cessna-citation-560xl-excel', type: 'FW', registration: 'VT-CVV', seatingCapacity: 7 },
      { model: "Falcon 2000LX", modelId: 'falcon-2000lx', type: 'FW', registration: 'VT-BVV', seatingCapacity: 10 },
      { model: "Cessna Citation 560XL Excel", modelId: 'cessna-citation-560xl-excel', type: 'FW', registration: 'VT-DVV', seatingCapacity: 9 },
      { model: "Cessna Citation 560XL Excel", modelId: 'cessna-citation-560xl-excel', type: 'FW', registration: 'VT-JVV', seatingCapacity: 9 },
      { model: "Falcon 7X (M 1000)", modelId: 'falcon-7x-m-1000', type: 'FW', registration: 'VT-HVV', seatingCapacity: 14 },
      { model: "A109S", modelId: 'a109s', type: 'RW', registration: 'VT-KVV', seatingCapacity: 6 },
      { model: "A109S", modelId: 'a109s', type: 'RW', registration: 'VT-MVV', seatingCapacity: 6 },
      { model: "Citation 525A CJ2+", modelId: 'citation-525a-cj2-plus', type: 'FW', registration: 'VT-PVV', seatingCapacity: 7 },
    ]
  },
  {
    id: 5,
    name: "Aman Aviation & Aerospace Solutions Pvt. Ltd.",
    city: "Mumbai",
    state: "Maharashtra",
    aopNo: "#10/2012",
    validUpto: "2028-09-13",
    totalAircraft: 1,
    fleet: [
      { model: "Robinson R44", modelId: 'robinson-r44', type: 'RW', registration: 'VT-CNJ', seatingCapacity: 3 },
    ]
  },
  {
    id: 6,
    name: "AR Airways Pvt. Ltd.",
    city: "New Delhi",
    state: "Delhi",
    aopNo: "#01/2005",
    validUpto: "2029-05-11",
    totalAircraft: 7,
    fleet: [
      { model: "Cessna Citation 560 XL", modelId: 'cessna-citation-560-xl', type: 'FW', registration: 'VT-CLA', seatingCapacity: 8 },
      { model: "Cessna Citation II", modelId: 'cessna-citation-ii', type: 'FW', registration: 'VT-CLB', seatingCapacity: 7 },
      { model: "Falcon 2000", modelId: 'falcon-2000', type: 'FW', registration: 'VT-ARF', seatingCapacity: 8 },
      { model: "Falcon 2000", modelId: 'falcon-2000', type: 'FW', registration: 'VT-CLF', seatingCapacity: 10 },
      { model: "Falcon 2000", modelId: 'falcon-2000', type: 'FW', registration: 'VT-ARC', seatingCapacity: 9 },
      { model: "Falcon 2000", modelId: 'falcon-2000', type: 'FW', registration: 'VT-ARO', seatingCapacity: 12 },
      { model: "Falcon 2000", modelId: 'falcon-2000', type: 'FW', registration: 'VT-ARM', seatingCapacity: 8 },
    ]
  },
  {
    id: 7,
    name: "Aryan Aviation Pvt. Ltd.",
    city: "Mumbai",
    state: "Maharashtra",
    aopNo: "#13/2009",
    validUpto: "2029-04-07",
    totalAircraft: 6,
    fleet: [
      { model: "Eurocopter AS355N", modelId: 'eurocopter-as355n', type: 'RW', registration: 'VT-SIL', seatingCapacity: 5 },
      { model: "AS365N2 Dauphin", modelId: 'as365n2-dauphin', type: 'RW', registration: 'VT-SIM', seatingCapacity: 5 },
      { model: "Stemme S6RT", modelId: 'stemme-s6rt', type: 'FW', registration: 'VT-AVL', seatingCapacity: 2 },
      { model: "Stemme S6RT", modelId: 'stemme-s6rt', type: 'FW', registration: 'VT-AVM', seatingCapacity: 2 },
      { model: "Bell 407", modelId: 'bell-407', type: 'RW', registration: 'VT-ARB', seatingCapacity: 6 },
      { model: "Bell 407", modelId: 'bell-407', type: 'RW', registration: 'VT-BKA', seatingCapacity: 6 },
    ]
  },
  {
    id: 8,
    name: "Arrow Aircrafts Sales & Charters Pvt. Ltd.",
    city: "New Delhi",
    state: "Delhi",
    aopNo: "#4/2014",
    validUpto: "2028-03-10",
    totalAircraft: 6,
    fleet: [
      { model: "Bell 407", modelId: 'bell-407', type: 'RW', registration: 'VT-JPH', seatingCapacity: 'Aerial Work' },
      { model: "AS350B3", modelId: 'as350b3', type: 'RW', registration: 'VT-ASC', seatingCapacity: 'Aerial Work' },
      { model: "Beech SKA B200GT", modelId: 'beech-ska-b200gt', type: 'FW', registration: 'VT-YAN', seatingCapacity: 9 },
      { model: "AS350B3", modelId: 'as350b3', type: 'RW', registration: 'VT-ASD', seatingCapacity: 'Aerial Work' },
      { model: "Embraer EMB135BJ (Legacy 650)", modelId: 'embraer-emb135bj-legacy-650', type: 'FW', registration: 'VT-TEN', seatingCapacity: 10 },
      { model: "AW169", modelId: 'aw169', type: 'RW', registration: 'VT-TOP', seatingCapacity: 6 },
    ]
  },
  {
    id: 9,
    name: "Aviation Connectivity & Infrastructure Developers Pvt. Ltd.",
    city: "Gurugram",
    state: "Haryana",
    aopNo: "#07/2023",
    validUpto: "2028-07-02",
    totalAircraft: 5,
    fleet: [
      { model: "Tecnam P2010TDI", modelId: 'tecnam-p2010tdi', type: 'FW', registration: 'VT-KTC', seatingCapacity: 3 },
      { model: "Tecnam P2010TDI", modelId: 'tecnam-p2010tdi', type: 'FW', registration: 'VT-XIA', seatingCapacity: 3 },
      { model: "Tecnam P2010TDI", modelId: 'tecnam-p2010tdi', type: 'FW', registration: 'VT-XIB', seatingCapacity: 3 },
      { model: "Tecnam P2010TDI", modelId: 'tecnam-p2010tdi', type: 'FW', registration: 'VT-IXC', seatingCapacity: 3 },
      { model: "Tecnam P2010TDI", modelId: 'tecnam-p2010tdi', type: 'FW', registration: 'VT-FCA', seatingCapacity: 3 },
    ]
  },
  {
    id: 10,
    name: "Avocet Aviation Pvt. Ltd.",
    city: "Ahmedabad",
    state: "Gujarat",
    aopNo: "#10/2023",
    validUpto: "2028-11-01",
    totalAircraft: 2,
    fleet: [
      { model: "Beechcraft Premier IA-390", modelId: 'beechcraft-premier-ia-390', type: 'FW', registration: 'VT-BNB', seatingCapacity: 6 },
      { model: "Beechcraft Premier IA-390", modelId: 'beechcraft-premier-ia-390', type: 'FW', registration: 'VT-BBN', seatingCapacity: 6 },
    ]
  },
  {
    id: 11,
    name: "Bajaj Aviation Pvt. Ltd.",
    city: "Mumbai",
    state: "Maharashtra",
    aopNo: "#14/2012",
    validUpto: "2028-12-10",
    totalAircraft: 1,
    fleet: [
      { model: "Falcon 2000LX", modelId: 'falcon-2000lx', type: 'FW', registration: 'VT-AYV', seatingCapacity: 10 },
    ]
  },
  {
    id: 12,
    name: "Baramati Agro Limited",
    city: "Pune",
    state: "Maharashtra",
    aopNo: "#14/2025",
    validUpto: "2030-09-17",
    totalAircraft: 1,
    fleet: [
      { model: "Bell 407GXP", modelId: 'bell-407gxp', type: 'RW', registration: 'VT-RRP', seatingCapacity: 6 },
    ]
  },
  {
    id: 13,
    name: "Bativala M Bhagwati Flying Charters LLP",
    city: "Mumbai",
    state: "Maharashtra",
    aopNo: "#05/2023",
    validUpto: "2028-05-31",
    totalAircraft: 2,
    fleet: [
      { model: "Cessna R172K", modelId: 'cessna-r172k', type: 'FW', registration: 'VT-JJS', seatingCapacity: 3 },
      { model: "Cessna 172S", modelId: 'cessna-172s', type: 'FW', registration: 'VT-GEM', seatingCapacity: 3 },
    ]
  },
  {
    id: 14,
    name: "B.G. Shirke Construction Technology Pvt. Ltd.",
    city: "Pune",
    state: "Maharashtra",
    aopNo: "#10/2010",
    validUpto: "2028-12-21",
    totalAircraft: 1,
    fleet: [
      { model: "Bell 427", modelId: 'bell-427', type: 'RW', registration: 'VT-PBS', seatingCapacity: 6 },
    ]
  },
  {
    id: 15,
    name: "Carewell Aviation India Pvt. Ltd.",
    city: "Kolkata",
    state: "West Bengal",
    aopNo: "#11/2023",
    validUpto: "2028-11-09",
    totalAircraft: 2,
    fleet: [
      { model: "Embraer EMB-135 (Legacy 600)", modelId: 'embraer-emb-135-legacy-600', type: 'FW', registration: 'VT-KOL', seatingCapacity: 13 },
      { model: "AW109SP", modelId: 'aw109sp', type: 'RW', registration: 'VT-GIM', seatingCapacity: 7 },
    ]
  },
  {
    id: 16,
    name: "Charlie Foxtrot Aviation Service Pvt. Ltd.",
    city: "New Delhi",
    state: "Delhi",
    aopNo: "#03/2020",
    validUpto: "2030-12-27",
    totalAircraft: 3,
    fleet: [
      { model: "Challenger 605 CL-600-2B16", modelId: 'challenger-605-cl-600-2b16', type: 'FW', registration: 'VT-CVA', seatingCapacity: 9 },
      { model: "Challenger 605 CL-600-2B16", modelId: 'challenger-605-cl-600-2b16', type: 'FW', registration: 'VT-CVB', seatingCapacity: 9 },
      { model: "CL-600-2B16 CL 604 Variant (CL605)", modelId: 'cl-600-2b16-cl-604-variant-cl605', type: 'FW', registration: 'VT-CVC', seatingCapacity: 9 },
    ]
  },
  {
    id: 17,
    name: "Chipsan Aviation Pvt. Ltd.",
    city: "New Delhi",
    state: "Delhi",
    aopNo: "#04/2017",
    validUpto: "2029-05-22",
    totalAircraft: 9,
    fleet: [
      { model: "EC135P2+", modelId: 'ec135p2-plus', type: 'RW', registration: 'VT-IBA', seatingCapacity: 6 },
      { model: "EC130T2", modelId: 'ec130t2', type: 'RW', registration: 'VT-RPO', seatingCapacity: 6 },
      { model: "Airbus H145 D3 (MBB-BK117 D-3)", modelId: 'airbus-h145-d3-mbb-bk117-d-3', type: 'RW', registration: 'VT-RGP', seatingCapacity: 7 },
      { model: "Airbus H145 D3 (MBB-BK117 D-3)", modelId: 'airbus-h145-d3-mbb-bk117-d-3', type: 'RW', registration: 'VT-RGQ', seatingCapacity: 8 },
      { model: "AS350B3", modelId: 'as350b3', type: 'RW', registration: 'VT-RGL', seatingCapacity: 6 },
      { model: "AS350B3", modelId: 'as350b3', type: 'RW', registration: 'VT-RGM', seatingCapacity: 6 },
      { model: "H160-B", modelId: 'h160-b', type: 'RW', registration: 'VT-RGR', seatingCapacity: 6 },
      { model: "H160-B", modelId: 'h160-b', type: 'RW', registration: 'VT-RGO', seatingCapacity: 6 },
      { model: "H160-B", modelId: 'h160-b', type: 'RW', registration: 'VT-RGY', seatingCapacity: 6 },
    ]
  },
  {
    id: 18,
    name: "Dadachanji Aviation Pvt. Ltd.",
    city: "Mumbai",
    state: "Maharashtra",
    aopNo: "#11/2024",
    validUpto: "2029-10-29",
    totalAircraft: 1,
    fleet: [
      { model: "EC130T2", modelId: 'ec130t2', type: 'RW', registration: 'VT-KPR', seatingCapacity: 6 },
    ]
  },
  {
    id: 19,
    name: "Davangere Sugar Company Ltd.",
    city: "Bengaluru",
    state: "Karnataka",
    aopNo: "#4/2012",
    validUpto: "2028-04-29",
    totalAircraft: 1,
    fleet: [
      { model: "AS 350 B3", modelId: 'as-350-b3', type: 'RW', registration: 'VT-DVG', seatingCapacity: 6 },
    ]
  },
  {
    id: 20,
    name: "Deccan Charters Pvt. Ltd.",
    city: "Bengaluru",
    state: "Karnataka",
    aopNo: "#26/2008",
    validUpto: "2028-10-06",
    totalAircraft: 9,
    fleet: [
      { model: "Bell 206 L4", modelId: 'bell-206-l4', type: 'RW', registration: 'VT-RBG', seatingCapacity: 6 },
      { model: "Ecureuil AS-355 F1", modelId: 'ecureuil-as-355-f1', type: 'RW', registration: 'VT-DAX', seatingCapacity: 5 },
      { model: "AS 350 B3", modelId: 'as-350-b3', type: 'RW', registration: 'VT-DCB', seatingCapacity: 6 },
      { model: "Hawker 900XP", modelId: 'hawker-900xp', type: 'FW', registration: 'VT-TSG', seatingCapacity: 9 },
      { model: "Bell 429", modelId: 'bell-429', type: 'RW', registration: 'VT-CSL', seatingCapacity: 6 },
      { model: "Sikorsky S-76C", modelId: 'sikorsky-s-76c', type: 'RW', registration: 'VT-KNH', seatingCapacity: 6 },
      { model: "AS 350 B3", modelId: 'as-350-b3', type: 'RW', registration: 'VT-UDY', seatingCapacity: 6 },
      { model: "Hawker 850XP", modelId: 'hawker-850xp', type: 'FW', registration: 'VT-AGP', seatingCapacity: 8 },
      { model: "EC-130 B4", modelId: 'ec-130-b4', type: 'RW', registration: 'VT-DCV', seatingCapacity: 6 },
    ]
  },
  {
    id: 21,
    name: "Dhillon Aviation Pvt. Ltd.",
    city: "Gurgaon",
    state: "Haryana",
    aopNo: "#5/2005",
    validUpto: "2028-09-07",
    totalAircraft: 3,
    fleet: [
      { model: "Bell 206 L4", modelId: 'bell-206-l4', type: 'RW', registration: 'VT-IQB', seatingCapacity: 'Aerial Work' },
      { model: "Bell 206 L4", modelId: 'bell-206-l4', type: 'RW', registration: 'VT-ZIN', seatingCapacity: 'Aerial Work' },
      { model: "Bell A412", modelId: 'bell-a412', type: 'RW', registration: 'VT-HKL', seatingCapacity: 13 },
    ]
  },
  {
    id: 22,
    name: "Dunes Aviation Private Limited",
    city: "Jodhpur",
    state: "Rajasthan",
    aopNo: "#08/2024",
    validUpto: "2029-10-13",
    totalAircraft: 1,
    fleet: [
      { model: "Citation 525A CJ2+", modelId: 'citation-525a-cj2-plus', type: 'FW', registration: 'VT-NDA', seatingCapacity: 7 },
    ]
  },
  {
    id: 23,
    name: "E-Factor Adventure Tourism (P) Ltd.",
    city: "New Delhi",
    state: "Delhi",
    aopNo: "#1/2008",
    validUpto: "2029-01-01",
    totalAircraft: 9,
    fleet: [
      { model: "T210 Ultramagic (Hot Air Balloon)", modelId: 't210-ultramagic-hot-air-balloon', type: 'B', registration: 'VT-BIG', seatingCapacity: 9 },
      { model: "T210 Ultramagic (Hot Air Balloon)", modelId: 't210-ultramagic-hot-air-balloon', type: 'B', registration: 'VT-FAR', seatingCapacity: 9 },
      { model: "Cameron A-210 (Hot Air Balloon)", modelId: 'cameron-a-210-hot-air-balloon', type: 'B', registration: 'VT-GOA', seatingCapacity: 9 },
      { model: "Cameron A-105 (Hot Air Balloon)", modelId: 'cameron-a-105-hot-air-balloon', type: 'B', registration: 'VT-WOW', seatingCapacity: 5 },
      { model: "Cameron A-120 (Hot Air Balloon)", modelId: 'cameron-a-120-hot-air-balloon', type: 'B', registration: 'VT-FUN', seatingCapacity: 4 },
      { model: "Ultramagic N-355 (Hot Air Balloon)", modelId: 'ultramagic-n-355-hot-air-balloon', type: 'B', registration: 'VT-OMG', seatingCapacity: 16 },
      { model: "Ultramagic N-425 (Hot Air Balloon)", modelId: 'ultramagic-n-425-hot-air-balloon', type: 'B', registration: 'VT-FLO', seatingCapacity: 24 },
      { model: "Ultramagic N-250 (Hot Air Balloon)", modelId: 'ultramagic-n-250-hot-air-balloon', type: 'B', registration: 'VT-RUN', seatingCapacity: 10 },
      { model: "Ultramagic T-210 (Hot Air Balloon)", modelId: 'ultramagic-t-210-hot-air-balloon', type: 'B', registration: 'VT-JHK', seatingCapacity: 10 },
    ]
  },
  {
    id: 24,
    name: "EHA Aviation Pvt. Ltd.",
    city: "Ahmedabad",
    state: "Gujarat",
    aopNo: "#01/2022",
    validUpto: "2027-03-31",
    totalAircraft: 3,
    fleet: [
      { model: "EMB-135BJ Legacy 650", modelId: 'emb-135bj-legacy-650', type: 'FW', registration: 'VT-NKS', seatingCapacity: 13 },
      { model: "Cessna Citation 560XLS+", modelId: 'cessna-citation-560xls-plus', type: 'FW', registration: 'VT-SKN', seatingCapacity: 9 },
      { model: "BD-700-1A11 Global 5500", modelId: 'bd-700-1a11-global-5500', type: 'FW', registration: 'VT-DIA', seatingCapacity: 13 },
    ]
  },
  {
    id: 25,
    name: "EIH Ltd.",
    city: "New Delhi",
    state: "Delhi",
    aopNo: "#02/1996",
    validUpto: "2029-08-01",
    totalAircraft: 1,
    fleet: [
      { model: "Hawker 850XP", modelId: 'hawker-850xp', type: 'FW', registration: 'VT-OBR', seatingCapacity: 9 },
    ]
  },
  {
    id: 26,
    name: "Empire Aircraft Management Services Pvt. Ltd.",
    city: "Bengaluru",
    state: "Karnataka",
    aopNo: "#08/2017",
    validUpto: "2027-03-31",
    totalAircraft: 2,
    fleet: [
      { model: "King Air 250 (B200GT)", modelId: 'king-air-250-b200gt', type: 'FW', registration: 'VT-SMS', seatingCapacity: 7 },
      { model: "Falcon 2000LX", modelId: 'falcon-2000lx', type: 'FW', registration: 'VT-FLX', seatingCapacity: 8 },
    ]
  },
  {
    id: 27,
    name: "EMSOS Aviation Private Limited",
    city: "New Delhi",
    state: "Delhi",
    aopNo: "#11/2022",
    validUpto: "2027-10-11",
    totalAircraft: 1,
    fleet: [
      { model: "Citation 525A CJ2+", modelId: 'citation-525a-cj2-plus', type: 'FW', registration: 'VT-ECG', seatingCapacity: 7 },
    ]
  },
  {
    id: 28,
    name: "Everdeliver Logistics Pvt. Ltd.",
    city: "Kolkata",
    state: "West Bengal",
    aopNo: "#02/2025",
    validUpto: "2030-01-23",
    totalAircraft: 1,
    fleet: [
      { model: "PC-12/47E", modelId: 'pc-12-47e', type: 'FW', registration: 'VT-SKJ', seatingCapacity: 8 },
    ]
  },
  {
    id: 29,
    name: "Falcon Aviation Services Pvt. Ltd.",
    city: "Jalandhar",
    state: "Punjab",
    aopNo: "#06/2024",
    validUpto: "2029-06-24",
    totalAircraft: 2,
    fleet: [
      { model: "A109S", modelId: 'a109s', type: 'RW', registration: 'VT-CSA', seatingCapacity: 6 },
      { model: "AW169", modelId: 'aw169', type: 'RW', registration: 'VT-DBJ', seatingCapacity: 6 },
    ]
  },
  {
    id: 30,
    name: "Fairwinds Aviation Pvt. Ltd.",
    city: "Ludhiana",
    state: "Punjab",
    aopNo: "#01/2019",
    validUpto: "2029-01-10",
    totalAircraft: 3,
    fleet: [
      { model: "Cessna 206H", modelId: 'cessna-206h', type: 'FW', registration: 'VT-SSJ', seatingCapacity: 4 },
      { model: "Cessna T206H", modelId: 'cessna-t206h', type: 'FW', registration: 'VT-GYN', seatingCapacity: 'Aerial Work' },
      { model: "Cessna T206H", modelId: 'cessna-t206h', type: 'FW', registration: 'VT-GIC', seatingCapacity: 'Aerial Work' },
    ]
  },
  {
    id: 31,
    name: "Fern Aviation India Pvt. Ltd.",
    city: "New Delhi",
    state: "Delhi",
    aopNo: "#07/2017",
    validUpto: "2027-08-21",
    totalAircraft: 1,
    fleet: [
      { model: "Hawker 850XP", modelId: 'hawker-850xp', type: 'FW', registration: 'VT-JHP', seatingCapacity: 9 },
    ]
  },
  {
    id: 32,
    name: "Flaps Aviation Pvt. Ltd.",
    city: "Jhajjar",
    state: "Haryana",
    aopNo: "#07/2022",
    validUpto: "2027-09-20",
    totalAircraft: 4,
    fleet: [
      { model: "Beech King Air C90A", modelId: 'beech-king-air-c90a', type: 'FW', registration: 'VT-RSL', seatingCapacity: 6 },
      { model: "Beech Super King Air B-200", modelId: 'beech-super-king-air-b-200', type: 'FW', registration: 'VT-RAS', seatingCapacity: 9 },
      { model: "Beech Super King Air B-200", modelId: 'beech-super-king-air-b-200', type: 'FW', registration: 'VT-REM', seatingCapacity: 9 },
      { model: "Beech Super King Air B-200", modelId: 'beech-super-king-air-b-200', type: 'FW', registration: 'VT-LKK', seatingCapacity: 7 },
    ]
  },
  {
    id: 33,
    name: "FLYSBS Aviation Limited",
    city: "Chennai",
    state: "Tamil Nadu",
    aopNo: "#13/2023",
    validUpto: "2028-12-18",
    totalAircraft: 1,
    fleet: [
      { model: "EMB-135 Legacy 600", modelId: 'emb-135-legacy-600', type: 'FW', registration: 'VT-SSR', seatingCapacity: 13 },
    ]
  },
  {
    id: 34,
    name: "Forum I Aviation Pvt. Ltd.",
    city: "New Delhi",
    state: "Delhi",
    aopNo: "#01/2006",
    validUpto: "2029-03-20",
    totalAircraft: 2,
    fleet: [
      { model: "Hawker 800XP", modelId: 'hawker-800xp', type: 'FW', registration: 'VT-FAF', seatingCapacity: 8 },
      { model: "Hawker 850XP", modelId: 'hawker-850xp', type: 'FW', registration: 'VT-KNB', seatingCapacity: 8 },
    ]
  },
  {
    id: 35,
    name: "Freedom Charter Services Pvt. Ltd.",
    city: "Mumbai",
    state: "Maharashtra",
    aopNo: "#01/2013",
    validUpto: "2029-01-28",
    totalAircraft: 2,
    fleet: [
      { model: "Hawker Beechcraft 900XP", modelId: 'hawker-beechcraft-900xp', type: 'FW', registration: 'VT-AJM', seatingCapacity: 9 },
      { model: "EMB-135BJ Legacy 650", modelId: 'emb-135bj-legacy-650', type: 'FW', registration: 'VT-AMG', seatingCapacity: 13 },
    ]
  },
  {
    id: 36,
    name: "Global Vectra Helicorp Limited",
    city: "Mumbai",
    state: "Maharashtra",
    aopNo: "#08/1998",
    validUpto: "2028-04-28",
    totalAircraft: 28,
    fleet: [
      { model: "Bell 412 EP", modelId: 'bell-412-ep', type: 'RW', registration: 'VT-AZS', seatingCapacity: 13 },
      { model: "Bell 412 EP", modelId: 'bell-412-ep', type: 'RW', registration: 'VT-GVA', seatingCapacity: 13 },
      { model: "Bell 412 EP", modelId: 'bell-412-ep', type: 'RW', registration: 'VT-GVL', seatingCapacity: 13 },
      { model: "Bell 412 EP", modelId: 'bell-412-ep', type: 'RW', registration: 'VT-GVK', seatingCapacity: 13 },
      { model: "Bell 412 EP", modelId: 'bell-412-ep', type: 'RW', registration: 'VT-GVM', seatingCapacity: 13 },
      { model: "Bell 412 EP", modelId: 'bell-412-ep', type: 'RW', registration: 'VT-GVT', seatingCapacity: 13 },
      { model: "Bell 412 EP", modelId: 'bell-412-ep', type: 'RW', registration: 'VT-GVW', seatingCapacity: 13 },
      { model: "Bell 412 EP", modelId: 'bell-412-ep', type: 'RW', registration: 'VT-GVX', seatingCapacity: 13 },
      { model: "Bell 412 EP", modelId: 'bell-412-ep', type: 'RW', registration: 'VT-GVY', seatingCapacity: 13 },
      { model: "AS 350 B3", modelId: 'as350b3', type: 'RW', registration: 'VT-GVF', seatingCapacity: 'Aerial Work' },
      { model: "AW139", modelId: 'aw139', type: 'RW', registration: 'VT-GVP', seatingCapacity: 15 },
      { model: "AW139", modelId: 'aw139', type: 'RW', registration: 'VT-GVR', seatingCapacity: 15 },
      { model: "EC-130 T2", modelId: 'ec-130-t2', type: 'RW', registration: 'VT-GVV', seatingCapacity: 7 },
      { model: "AW169", modelId: 'aw169', type: 'RW', registration: 'VT-GVZ', seatingCapacity: 8 },
      { model: "AS 350 B3e", modelId: 'as350b3e', type: 'RW', registration: 'VT-RRA', seatingCapacity: 'Aerial Work' },
      { model: "AS 350 B3e", modelId: 'as350b3e', type: 'RW', registration: 'VT-RRB', seatingCapacity: 'Aerial Work' },
      { model: "AW169", modelId: 'aw169', type: 'RW', registration: 'VT-RRC', seatingCapacity: 8 },
      { model: "Bell 412 EP", modelId: 'bell-412-ep', type: 'RW', registration: 'VT-RRD', seatingCapacity: 13 },
      { model: "AW139", modelId: 'aw139', type: 'RW', registration: 'VT-RRE', seatingCapacity: 15 },
      { model: "Bell 412 EP", modelId: 'bell-412-ep', type: 'RW', registration: 'VT-RRF', seatingCapacity: 13 },
      { model: "AW169", modelId: 'aw169', type: 'RW', registration: 'VT-RRG', seatingCapacity: 8 },
      { model: "AS 350 B3e", modelId: 'as350b3e', type: 'RW', registration: 'VT-RRH', seatingCapacity: 'Aerial Work' },
      { model: "Bell 412 EP", modelId: 'bell-412-ep', type: 'RW', registration: 'VT-RRI', seatingCapacity: 13 },
      { model: "Bell 412 EP", modelId: 'bell-412-ep', type: 'RW', registration: 'VT-RRJ', seatingCapacity: 11 },
      { model: "AW169", modelId: 'aw169', type: 'RW', registration: 'VT-RRK', seatingCapacity: 8 },
      { model: "AW169", modelId: 'aw169', type: 'RW', registration: 'VT-RRL', seatingCapacity: 8 },
      { model: "AW169", modelId: 'aw169', type: 'RW', registration: 'VT-RRN', seatingCapacity: 8 },
      { model: "AW169", modelId: 'aw169', type: 'RW', registration: 'VT-RRO', seatingCapacity: 10 },
    ]
  },
  {
    id: 37,
    name: "Ghodawat Enterprises Pvt. Ltd.",
    city: "Kolhapur",
    state: "Maharashtra",
    aopNo: "#06/2014",
    validUpto: "2028-03-17",
    totalAircraft: 4,
    fleet: [
      { model: "EC-135", modelId: 'ec-135', type: 'RW', registration: 'VT-GSD', seatingCapacity: 5 },
      { model: "EC-130 T2", modelId: 'ec-130-t2', type: 'RW', registration: 'VT-ISG', seatingCapacity: 6 },
      { model: "EC-120 B", modelId: 'ec-120-b', type: 'RW', registration: 'VT-SDG', seatingCapacity: 4 },
      { model: "EC-135T3H", modelId: 'ec-135t3h', type: 'RW', registration: 'VT-GSR', seatingCapacity: 5 },
    ]
  },
  {
    id: 38,
    name: "GMR Aviation Pvt. Ltd.",
    city: "New Delhi",
    state: "Delhi",
    aopNo: "#06/2007",
    validUpto: "2028-08-06",
    totalAircraft: 2,
    fleet: [
      { model: "Falcon 2000EX", modelId: 'falcon-2000ex', type: 'FW', registration: 'VT-BRK', seatingCapacity: 9 },
      { model: "EMB-135BJ Legacy 650", modelId: 'emb-135bj-legacy-650', type: 'FW', registration: 'VT-RDS', seatingCapacity: 13 },
    ]
  },
  {
    id: 39,
    name: "Golden Baritone Private Limited (JATAYU)",
    city: "New Delhi",
    state: "Delhi",
    aopNo: "#13/2025",
    validUpto: "2030-09-14",
    totalAircraft: 1,
    fleet: [
      { model: "G-200", modelId: 'g-200', type: 'FW', registration: 'VT-PCR', seatingCapacity: 10 },
    ]
  },
  {
    id: 40,
    name: "Golden Crane Aviation Pvt. Ltd.",
    city: "Kolkata",
    state: "West Bengal",
    aopNo: "#03/2023",
    validUpto: "2028-03-08",
    totalAircraft: 2,
    fleet: [
      { model: "Agusta A109E", modelId: 'agusta-a109e', type: 'RW', registration: 'VT-VSR', seatingCapacity: 6 },
      { model: "Agusta A109E", modelId: 'agusta-a109e', type: 'RW', registration: 'VT-RAJ', seatingCapacity: 6 },
    ]
  },
  {
    id: 41,
    name: "GSEC Aviation Limited",
    city: "Ahmedabad",
    state: "Gujarat",
    aopNo: "#15/2025",
    validUpto: "2030-09-21",
    totalAircraft: 1,
    fleet: [
      { model: "Bombardier Challenger 605", modelId: 'bombardier-challenger-605', type: 'FW', registration: 'VT-APL', seatingCapacity: 10 },
    ]
  },
  {
    id: 42,
    name: "Himalyaputra Aviation Ltd.",
    city: "New Delhi",
    state: "Delhi",
    aopNo: "#11/2012",
    validUpto: "2028-10-09",
    totalAircraft: 2,
    fleet: [
      { model: "Beech Craft King Air B200GT", modelId: 'beechcraft-king-air-b200gt', type: 'FW', registration: 'VT-JMG', seatingCapacity: 7 },
      { model: "Agusta 109E", modelId: 'agusta-109e', type: 'RW', registration: 'VT-JIT', seatingCapacity: 6 },
    ]
  },
  {
    id: 43,
    name: "Himalayan Heli Services Ltd.",
    city: "New Delhi",
    state: "Delhi",
    aopNo: "#01/2002",
    validUpto: "2029-01-17",
    totalAircraft: 6,
    fleet: [
      { model: "AS 350 B3 Ecureuil", modelId: 'as350b3-ecureuil', type: 'RW', registration: 'VT-JMD', seatingCapacity: 'Aerial Work' },
      { model: "AS 350 B3 Ecureuil", modelId: 'as350b3-ecureuil', type: 'RW', registration: 'VT-BSG', seatingCapacity: 'Aerial Work' },
      { model: "AS 350 B3", modelId: 'as350b3', type: 'RW', registration: 'VT-BKJ', seatingCapacity: 6 },
      { model: "AS 350 B3", modelId: 'as350b3', type: 'RW', registration: 'VT-HHM', seatingCapacity: 'Aerial Work' },
      { model: "AS 350 B3", modelId: 'as350b3', type: 'RW', registration: 'VT-HHB', seatingCapacity: 5 },
      { model: "AS 350 B3E", modelId: 'as350b3e', type: 'RW', registration: 'VT-HHC', seatingCapacity: 6 },
    ]
  },
  {
    id: 44,
    name: "Heritage Aviation Pvt. Ltd.",
    city: "New Delhi",
    state: "Delhi",
    aopNo: "#04/2015",
    validUpto: "2029-06-30",
    totalAircraft: 4,
    fleet: [
      { model: "AS350B3E", modelId: 'as350b3e', type: 'RW', registration: 'VT-RMX', seatingCapacity: 5 },
      { model: "AS350B3E", modelId: 'as350b3e', type: 'RW', registration: 'VT-HKX', seatingCapacity: 5 },
      { model: "AS350B3E", modelId: 'as350b3e', type: 'RW', registration: 'VT-HJX', seatingCapacity: 5 },
      { model: "EC130T2", modelId: 'ec130t2', type: 'RW', registration: 'VT-HIX', seatingCapacity: 7 },
    ]
  },
  {
    id: 45,
    name: "Heligo Charters Pvt. Limited",
    city: "Mumbai",
    state: "Maharashtra",
    aopNo: "#01/2009",
    validUpto: "2029-02-10",
    totalAircraft: 16,
    fleet: [
      { model: "AW139", modelId: 'aw139', type: 'RW', registration: 'VT-HLD', seatingCapacity: 15 },
      { model: "AW139", modelId: 'aw139', type: 'RW', registration: 'VT-HLH', seatingCapacity: 15 },
      { model: "AS 365 N3", modelId: 'as365-n3', type: 'RW', registration: 'VT-HLI', seatingCapacity: 11 },
      { model: "AS 365 N3", modelId: 'as365-n3', type: 'RW', registration: 'VT-HLJ', seatingCapacity: 11 },
      { model: "H145", modelId: 'h145', type: 'RW', registration: 'VT-HLP', seatingCapacity: 8 },
      { model: "H145", modelId: 'h145', type: 'RW', registration: 'VT-HLQ', seatingCapacity: 9 },
      { model: "AW139", modelId: 'aw139', type: 'RW', registration: 'VT-HLR', seatingCapacity: 15 },
      { model: "Bell 412 EP", modelId: 'bell-412-ep', type: 'RW', registration: 'VT-HLS', seatingCapacity: 11 },
      { model: "Bell 412 EP", modelId: 'bell-412-ep', type: 'RW', registration: 'VT-HLT', seatingCapacity: 11 },
      { model: "AW139", modelId: 'aw139', type: 'RW', registration: 'VT-HLU', seatingCapacity: 15 },
      { model: "Bell 412 EPI", modelId: 'bell-412-epi', type: 'RW', registration: 'VT-HLV', seatingCapacity: 13 },
      { model: "H145", modelId: 'h145', type: 'RW', registration: 'VT-HLW', seatingCapacity: 8 },
      { model: "H145", modelId: 'h145', type: 'RW', registration: 'VT-HLX', seatingCapacity: 8 },
      { model: "H145", modelId: 'h145', type: 'RW', registration: 'VT-HLZ', seatingCapacity: 8 },
      { model: "H145", modelId: 'h145', type: 'RW', registration: 'VT-HLY', seatingCapacity: 8 },
      { model: "AW139", modelId: 'aw139', type: 'RW', registration: 'VT-HNB', seatingCapacity: 15 },
    ]
  },
  {
    id: 46,
    name: "Himanad Management Services Private Limited",
    city: "Gurugram",
    state: "Haryana",
    aopNo: "#16/2025",
    validUpto: "2030-09-22",
    totalAircraft: 1,
    fleet: [
      { model: "AW169", modelId: 'aw169', type: 'RW', registration: 'VT-HAB', seatingCapacity: 7 },
    ]
  },
  {
    id: 47,
    name: "HN Safal Aviation Pvt. Ltd.",
    city: "Ahmedabad",
    state: "Gujarat",
    aopNo: "#07/2019",
    validUpto: "2029-10-24",
    totalAircraft: 2,
    fleet: [
      { model: "Gulfstream G-150", modelId: 'gulfstream-g-150', type: 'FW', registration: 'VT-GKB', seatingCapacity: 7 },
      { model: "Gulfstream G-150", modelId: 'gulfstream-g-150', type: 'FW', registration: 'VT-HNA', seatingCapacity: 8 },
    ]
  },
  {
    id: 48,
    name: "Hyderabad Airlines Pvt. Ltd.",
    city: "Hyderabad",
    state: "Telangana",
    aopNo: "#14/2022",
    validUpto: "2027-12-12",
    totalAircraft: 1,
    fleet: [
      { model: "EC 135P3H", modelId: 'ec-135p3h', type: 'RW', registration: 'VT-BHH', seatingCapacity: 6 },
    ]
  },
  {
    id: 49,
    name: "IIC Technologies Limited",
    city: "Hyderabad",
    state: "Telangana",
    aopNo: "#06/2015",
    validUpto: "2029-07-09",
    totalAircraft: 3,
    fleet: [
      { model: "Cessna Caravan 208B", modelId: 'cessna-caravan-208b', type: 'FW', registration: 'VT-IIC', seatingCapacity: 9 },
      { model: "Cessna Caravan 208B", modelId: 'cessna-caravan-208b', type: 'FW', registration: 'VT-ASU', seatingCapacity: 9 },
      { model: "Cessna 206H", modelId: 'cessna-206h', type: 'FW', registration: 'VT-HSR', seatingCapacity: 'Aerial Work' },
    ]
  },
  {
    id: 50,
    name: "Indocopters Pvt. Ltd.",
    city: "New Delhi",
    state: "Delhi",
    aopNo: "#06/2006",
    validUpto: "2028-08-24",
    totalAircraft: 1,
    fleet: [
      { model: "AS 350 B3 Ecureuil", modelId: 'as-350-b3-ecureuil', type: 'RW', registration: 'VT-VAD', seatingCapacity: 6 },
    ]
  },
  {
    id: 51,
    name: "Indo Pacific Aviation Pvt. Ltd.",
    city: "New Delhi",
    state: "Delhi",
    aopNo: "#03/1997",
    validUpto: "2028-10-14",
    totalAircraft: 10,
    fleet: [
      { model: "Agusta A109E", modelId: 'agusta-a109e', type: 'RW', registration: 'VT-FOR', seatingCapacity: 8 },
      { model: "Hawker 800XP", modelId: 'hawker-800xp', type: 'FW', registration: 'VT-LIB', seatingCapacity: 8 },
      { model: "Hawker 800XP", modelId: 'hawker-800xp', type: 'FW', registration: 'VT-POP', seatingCapacity: 7 },
      { model: "Embraer EMB-135 (Legacy 600)", modelId: 'embraer-emb-135', type: 'FW', registration: 'VT-SFU', seatingCapacity: 13 },
      { model: "Hawker 750", modelId: 'hawker-750', type: 'FW', registration: 'VT-RSR', seatingCapacity: 9 },
      { model: "Hawker 800XP", modelId: 'hawker-800xp', type: 'FW', registration: 'VT-MUM', seatingCapacity: 9 },
      { model: "AW109SP", modelId: 'aw109sp', type: 'RW', registration: 'VT-ZEN', seatingCapacity: 6 },
      { model: "Cessna Citation CJ2 525A", modelId: 'cessna-citation-cj2-525a', type: 'FW', registration: 'VT-MON', seatingCapacity: 7 },
      { model: "Hawker 900XP", modelId: 'hawker-900xp', type: 'FW', registration: 'VT-JRG', seatingCapacity: 9 },
      { model: "Cessna T206H", modelId: 'cessna-t206h', type: 'FW', registration: 'VT-BMS', seatingCapacity: 'Aerial Work' },
    ]
  },
  {
    id: 52,
    name: "India Flysafe Aviation Ltd.",
    city: "New Delhi",
    state: "Delhi",
    aopNo: "#09/2004",
    validUpto: "2028-12-14",
    totalAircraft: 6,
    fleet: [
      { model: "Pilatus PC-12/47E", modelId: 'pilatus-pc-12-47e', type: 'FW', registration: 'VT-JSC', seatingCapacity: 8 },
      { model: "Embraer EMB-135LR", modelId: 'embraer-emb-135lr', type: 'FW', registration: 'VT-JSI', seatingCapacity: 37 },
      { model: "AW-139 Agusta", modelId: 'aw-139-agusta', type: 'RW', registration: 'VT-JSA', seatingCapacity: 12 },
      { model: "Grand Agusta 109S", modelId: 'grand-agusta-109s', type: 'RW', registration: 'VT-JSF', seatingCapacity: 6 },
      { model: "BD-100-1A10", modelId: 'bd-100-1a10', type: 'FW', registration: 'VT-JSX', seatingCapacity: 9 },
      { model: "Pilatus PC-12/47E", modelId: 'pilatus-pc-12-47e', type: 'FW', registration: 'VT-JSQ', seatingCapacity: 8 },
    ]
  },
  {
    id: 53,
    name: "Innxt Aviation Pvt. Ltd.",
    city: "Pune",
    state: "Maharashtra",
    aopNo: "#03/2021",
    validUpto: "2026-07-25",
    totalAircraft: 1,
    fleet: [
      { model: "EC135P2+", modelId: 'ec135p2-plus', type: 'RW', registration: 'VT-MHM', seatingCapacity: 5 },
    ]
  },
  {
    id: 54,
    name: "IRM Pvt. Ltd.",
    city: "Ahmedabad",
    state: "Gujarat",
    aopNo: "#09/2014",
    validUpto: "2028-07-03",
    totalAircraft: 1,
    fleet: [
      { model: "Gulfstream GV-SP (G550)", modelId: 'gulfstream-gv-sp-g550', type: 'FW', registration: 'VT-RIM', seatingCapacity: 8 },
    ]
  },
  {
    id: 55,
    name: "Jet Serve Aviation Pvt. Ltd.",
    city: "Gurugram",
    state: "Haryana",
    aopNo: "#02/2017",
    validUpto: "2029-02-09",
    totalAircraft: 10,
    fleet: [
      { model: "Robinson-44 Raven II", modelId: 'robinson-44-raven-ii', type: 'RW', registration: 'VT-ZJM', seatingCapacity: 'Aerial Work' },
      { model: "Robinson-44 Raven II", modelId: 'robinson-44-raven-ii', type: 'RW', registration: 'VT-OJS', seatingCapacity: 3 },
      { model: "Robinson-44 Raven II", modelId: 'robinson-44-raven-ii', type: 'RW', registration: 'VT-HNC', seatingCapacity: 3 },
      { model: "King Air C90A", modelId: 'king-air-c90a', type: 'FW', registration: 'VT-JJL', seatingCapacity: 6 },
      { model: "King Air C90A", modelId: 'king-air-c90a', type: 'FW', registration: 'VT-EMJ', seatingCapacity: 6 },
      { model: "Super King Air B-200", modelId: 'super-king-air-b-200', type: 'FW', registration: 'VT-RSN', seatingCapacity: 8 },
      { model: "King Air C90A", modelId: 'king-air-c90a', type: 'FW', registration: 'VT-DEJ', seatingCapacity: 6 },
      { model: "King Air C90A", modelId: 'king-air-c90a', type: 'FW', registration: 'VT-JPK', seatingCapacity: 6 },
      { model: "A109E", modelId: 'a109e', type: 'RW', registration: 'VT-OSR', seatingCapacity: 6 },
      { model: "A109E", modelId: 'a109e', type: 'RW', registration: 'VT-OSN', seatingCapacity: 6 },
    ]
  },
  {
    id: 56,
    name: "Jhankar Aviation Pvt. Ltd.",
    city: "Gurugram",
    state: "Haryana",
    aopNo: "#13/2022",
    validUpto: "2027-11-10",
    totalAircraft: 3,
    fleet: [
      { model: "King Air C90A", modelId: 'king-air-c90a', type: 'FW', registration: 'VT-TIS', seatingCapacity: 6 },
      { model: "Beechcraft 300LW", modelId: 'beechcraft-300lw', type: 'FW', registration: 'VT-UPA', seatingCapacity: 9 },
      { model: "King Air C90A", modelId: 'king-air-c90a', type: 'FW', registration: 'VT-VBS', seatingCapacity: 6 },
    ]
  },
  {
    id: 57,
    name: "Joyalukkas India Limited",
    city: "Thrissur",
    state: "Kerala",
    aopNo: "#05/2025",
    validUpto: "2030-02-26",
    totalAircraft: 1,
    fleet: [
      { model: "AW109SP", modelId: 'aw109sp', type: 'RW', registration: 'VT-JJL', seatingCapacity: 7 },
    ]
  },
  {
    id: 58,
    name: "Kainos Aviation Private Limited",
    city: "Gurugram",
    state: "Haryana",
    aopNo: "#01/2024",
    validUpto: "2029-01-04",
    totalAircraft: 1,
    fleet: [
      { model: "Sikorsky S-76C++", modelId: 'sikorsky-s-76c-plus-plus', type: 'RW', registration: 'VT-KHA', seatingCapacity: 8 },
    ]
  },
  {
    id: 59,
    name: "Kairamya Aviation Pvt. Ltd.",
    city: "Ahmedabad",
    state: "Gujarat",
    aopNo: "#19/2025",
    validUpto: "2030-11-24",
    totalAircraft: 1,
    fleet: [
      { model: "Citation 525A", modelId: 'citation-525a', type: 'FW', registration: 'VT-BIP', seatingCapacity: 7 },
    ]
  },
  {
    id: 60,
    name: "Kakini Enterprises Pvt. Ltd.",
    city: "Hyderabad",
    state: "Telangana",
    aopNo: "#06/2023",
    validUpto: "2028-06-05",
    totalAircraft: 1,
    fleet: [
      { model: "Citation 525A", modelId: 'citation-525a', type: 'FW', registration: 'VT-PSB', seatingCapacity: 8 },
    ]
  },
  {
    id: 61,
    name: "KAN Aerofoil Private Limited",
    city: "Ahmedabad",
    state: "Gujarat",
    aopNo: "#09/2024",
    validUpto: "2029-10-16",
    totalAircraft: 2,
    fleet: [
      { model: "Bell-407GX", modelId: 'bell-407gx', type: 'RW', registration: 'VT-NJP', seatingCapacity: 6 },
      { model: "Bell-407GX", modelId: 'bell-407gx', type: 'RW', registration: 'VT-PNJ', seatingCapacity: 6 },
    ]
  },
  {
    id: 62,
    name: "Karnavati Aviation Pvt. Ltd",
    city: "Ahmedabad",
    state: "Gujarat",
    aopNo: "#22/2008",
    validUpto: "2028-08-06",
    totalAircraft: 10,
    fleet: [
      { model: "EMB-135BJ Legacy 650", modelId: 'emb-135bj-legacy-650', type: 'FW', registration: 'VT-AML', seatingCapacity: 13 },
      { model: "Bombardier BD-700-1A10", modelId: 'bombardier-bd-700-1a10', type: 'FW', registration: 'VT-AGL', seatingCapacity: 13 },
      { model: "EMB-135BJ", modelId: 'emb-135bj', type: 'FW', registration: 'VT-AHM', seatingCapacity: 13 },
      { model: "EMB-135BJ", modelId: 'emb-135bj', type: 'FW', registration: 'VT-ARL', seatingCapacity: 13 },
      { model: "PC-24", modelId: 'pc-24', type: 'FW', registration: 'VT-AQL', seatingCapacity: 6 },
      { model: "PC-24", modelId: 'pc-24', type: 'FW', registration: 'VT-KGA', seatingCapacity: 6 },
      { model: "PC-24", modelId: 'pc-24', type: 'FW', registration: 'VT-PGA', seatingCapacity: 6 },
      { model: "PC-24", modelId: 'pc-24', type: 'FW', registration: 'VT-AFL', seatingCapacity: 6 },
      { model: "PC-24", modelId: 'pc-24', type: 'FW', registration: 'VT-APV', seatingCapacity: 6 },
      { model: "AW169", modelId: 'aw169', type: 'RW', registration: 'VT-GKA', seatingCapacity: 7 },
    ]
  },
  {
    id: 63,
    name: "Kelachandra Logistics Pvt. Ltd.",
    city: "Bengaluru",
    state: "Karnataka",
    aopNo: "#04/2019",
    validUpto: "2029-06-13",
    totalAircraft: 2,
    fleet: [
      { model: "Bell 429", modelId: 'bell-429', type: 'RW', registration: 'VT-HKB', seatingCapacity: 5 },
      { model: "Embraer EMB-500 (Phenom 100)", modelId: 'embraer-emb-500-phenom-100', type: 'FW', registration: 'VT-AVS', seatingCapacity: 4 },
    ]
  },
  {
    id: 64,
    name: "Kestrel Aviation Pvt. Ltd.",
    city: "Mumbai",
    state: "Maharashtra",
    aopNo: "#14/2008",
    validUpto: "2029-05-08",
    totalAircraft: 1,
    fleet: [
      { model: "Agusta A119 Koala", modelId: 'agusta-a119-koala', type: 'RW', registration: 'VT-CLN', seatingCapacity: 7 },
    ]
  },
  {
    id: 65,
    name: "Khazana Jewellery Pvt. Ltd.",
    city: "Chennai",
    state: "Tamil Nadu",
    aopNo: "#03/2017",
    validUpto: "2029-03-28",
    totalAircraft: 1,
    fleet: [
      { model: "Gulfstream G150", modelId: 'gulfstream-g150', type: 'FW', registration: 'VT-KZN', seatingCapacity: 8 },
    ]
  },
  {
    id: 66,
    name: "Kingscraft Aviation Private Limited",
    city: "Pune",
    state: "Maharashtra",
    aopNo: "#01/2026",
    validUpto: "2031-01-04",
    totalAircraft: 1,
    fleet: [
      { model: "Hawker 900XP", modelId: 'hawker-900xp', type: 'FW', registration: 'VT-KGV', seatingCapacity: 7 },
    ]
  },
  {
    id: 67,
    name: "Kyathi Climate Modification Consultants LLP",
    city: "Bengaluru",
    state: "Karnataka",
    aopNo: "#04/2020",
    validUpto: "2026-03-27",
    totalAircraft: 2,
    fleet: [
      { model: "Superking Air B200", modelId: 'superking-air-b200', type: 'FW', registration: 'VT-KCM', seatingCapacity: 'Aerial Work' },
      { model: "Agusta A109E", modelId: 'agusta-a109e', type: 'RW', registration: 'VT-AUS', seatingCapacity: 5 },
    ]
  },
  {
    id: 68,
    name: "Lakeworkoffice Club Pvt. Ltd.",
    city: "New Delhi",
    state: "Delhi",
    aopNo: "#10/2025",
    validUpto: "2030-09-09",
    totalAircraft: 2,
    fleet: [
      { model: "A109E", modelId: 'a109e', type: 'RW', registration: 'VT-JPA', seatingCapacity: 6 },
      { model: "A109E", modelId: 'a109e', type: 'RW', registration: 'VT-OSC', seatingCapacity: 7 },
    ]
  },
  {
    id: 69,
    name: "LCL Aviation Pvt. Ltd. (ECOJET)",
    city: "Kanpur",
    state: "Uttar Pradesh",
    aopNo: "#09/2022",
    validUpto: "2027-09-27",
    totalAircraft: 1,
    fleet: [
      { model: "Beechcraft Premier 1A", modelId: 'beechcraft-premier-1a', type: 'FW', registration: 'VT-ANF', seatingCapacity: 6 },
    ]
  },
  {
    id: 70,
    name: "LMCS Infra Holdings Pvt. Ltd.",
    city: "New Delhi",
    state: "Delhi",
    aopNo: "#05/2016",
    validUpto: "2028-10-25",
    totalAircraft: 1,
    fleet: [
      { model: "EC 135 P2+", modelId: 'ec-135-p2-plus', type: 'RW', registration: 'VT-PEC', seatingCapacity: 5 },
    ]
  },
  {
    id: 71,
    name: "L & T Aviation Services Pvt. Ltd.",
    city: "Mumbai",
    state: "Maharashtra",
    aopNo: "#06/2010",
    validUpto: "2028-11-02",
    totalAircraft: 1,
    fleet: [
      { model: "Hawker HS 125 900XP", modelId: 'hawker-hs-125-900xp', type: 'FW', registration: 'VT-LTC', seatingCapacity: 9 },
    ]
  },
  {
    id: 72,
    name: "MAB Aviation Pvt. Ltd.",
    city: "Mumbai",
    state: "Maharashtra",
    aopNo: "#06/2016",
    validUpto: "2028-12-22",
    totalAircraft: 1,
    fleet: [
      { model: "Learjet 60XR", modelId: 'learjet-60xr', type: 'FW', registration: 'VT-MAM', seatingCapacity: 3 },
    ]
  },
  {
    id: 73,
    name: "Maharaja Aviation Pvt. Ltd.",
    city: "New Delhi",
    state: "Delhi",
    aopNo: "#07/2015",
    validUpto: "2027-08-26",
    totalAircraft: 4,
    fleet: [
      { model: "Robinson R66", modelId: 'robinson-r66', type: 'RW', registration: 'VT-MAL', seatingCapacity: 4 },
      { model: "Robinson R66", modelId: 'robinson-r66', type: 'RW', registration: 'VT-BAM', seatingCapacity: 4 },
      { model: "Robinson R44", modelId: 'robinson-r44', type: 'RW', registration: 'VT-SDD', seatingCapacity: 3 },
      { model: "Robinson R66", modelId: 'robinson-r66', type: 'RW', registration: 'VT-NDN', seatingCapacity: 4 },
    ]
  },
  {
    id: 74,
    name: "Mahindra Airways Ltd.",
    city: "Mumbai",
    state: "Maharashtra",
    aopNo: "#10/2024",
    validUpto: "2029-10-27",
    totalAircraft: 1,
    fleet: [
      { model: "Bombardier BD-100-1A10", modelId: 'bombardier-bd-100-1a10', type: 'FW', registration: 'VT-MAY', seatingCapacity: 9 },
    ]
  },
  {
    id: 75,
    name: "Malhotra Helikopters Pvt. Ltd.",
    city: "Mumbai",
    state: "Maharashtra",
    aopNo: "#01/2023",
    validUpto: "2028-01-11",
    totalAircraft: 1,
    fleet: [
      { model: "Bell 206 L3", modelId: 'bell-206-l3', type: 'RW', registration: 'VT-RLB', seatingCapacity: 6 },
    ]
  },
  {
    id: 76,
    name: "Mandke and Mandke Infrastructure Pvt. Ltd.",
    city: "Pune",
    state: "Maharashtra",
    aopNo: "#01/2015",
    validUpto: "2029-02-12",
    totalAircraft: 1,
    fleet: [
      { model: "Robinson R66", modelId: 'robinson-r66', type: 'RW', registration: 'VT-MAN', seatingCapacity: 4 },
    ]
  },
  {
    id: 77,
    name: "Media House DND Private Limited",
    city: "Bengaluru",
    state: "Karnataka",
    aopNo: "#05/2024",
    validUpto: "2029-02-27",
    totalAircraft: 1,
    fleet: [
      { model: "EC-130T2", modelId: 'ec-130t2', type: 'RW', registration: 'VT-MNK', seatingCapacity: 6 },
    ]
  },
  {
    id: 78,
    name: "Modifi Aviations Pvt. Ltd.",
    city: "Kolkata",
    state: "West Bengal",
    aopNo: "#02/2026",
    validUpto: "2031-02-10",
    totalAircraft: 1,
    fleet: [
      { model: "Falcon 2000", modelId: 'falcon-2000', type: 'FW', registration: 'VT-HGL', seatingCapacity: 10 },
    ]
  },
  {
    id: 79,
    name: "MSPL Ltd.",
    city: "Mumbai",
    state: "Maharashtra",
    aopNo: "#02/2009",
    validUpto: "2027-02-11",
    totalAircraft: 1,
    fleet: [
      { model: "P-180 Avanti II", modelId: 'p-180-avanti-ii', type: 'FW', registration: 'VT-SNB', seatingCapacity: 8 },
    ]
  },
  {
    id: 80,
    name: "Mytri Aviation Pvt. Ltd.",
    city: "Hyderabad",
    state: "Telangana",
    aopNo: "#01/2018",
    validUpto: "2028-07-02",
    totalAircraft: 2,
    fleet: [
      { model: "Embraer 135BJ", modelId: 'embraer-135bj', type: 'FW', registration: 'VT-PVK', seatingCapacity: 13 },
      { model: "Embraer 190-100ECJ (Lineage 1000)", modelId: 'embraer-190-100ecj-lineage-1000', type: 'FW', registration: 'VT-PRM', seatingCapacity: 19 },
    ]
  },
  {
    id: 81,
    name: "Navdurga Aviation Pvt. Ltd.",
    city: "New Delhi",
    state: "Delhi",
    aopNo: "#15/2022",
    validUpto: "2027-12-27",
    totalAircraft: 2,
    fleet: [
      { model: "Cessna Caravan 208B", modelId: 'cessna-caravan-208b', type: 'FW', registration: 'VT-AHB', seatingCapacity: 8 },
      { model: "Cessna Citation 560XL", modelId: 'cessna-citation-560xl', type: 'FW', registration: 'VT-CSP', seatingCapacity: 8 },
    ]
  },
  {
    id: 82,
    name: "NIBE Aeronautics Limited",
    city: "Pune",
    state: "Maharashtra",
    aopNo: "#06/2025",
    validUpto: "2029-05-27",
    totalAircraft: 1,
    fleet: [
      { model: "Beechcraft Premier 1A", modelId: 'beechcraft-premier-1a', type: 'FW', registration: 'VT-VRL', seatingCapacity: 6 },
    ]
  },
  {
    id: 83,
    name: "Niraant Aviation Pvt. Ltd.",
    city: "Mumbai",
    state: "Maharashtra",
    aopNo: "#12/2025",
    validUpto: "2030-09-10",
    totalAircraft: 1,
    fleet: [
      { model: "Bell 429", modelId: 'bell-429', type: 'RW', registration: 'VT-KTK', seatingCapacity: 6 },
    ]
  },
  {
    id: 84,
    name: "OSS Air Management Pvt. Ltd.",
    city: "New Delhi",
    state: "Delhi",
    aopNo: "#02/2006",
    validUpto: "2029-04-03",
    totalAircraft: 1,
    fleet: [
      { model: "Agusta A109SP", modelId: 'agusta-a109sp', type: 'RW', registration: 'VT-OSH', seatingCapacity: 7 },
    ]
  },
  {
    id: 85,
    name: "Pawan Hans Ltd.",
    city: "Noida",
    state: "Uttar Pradesh",
    aopNo: "#02/1998",
    validUpto: "2025-03-14",
    totalAircraft: 38,
    fleet: [
      { model: "Dauphin 2", modelId: 'dauphin-2', type: 'RW', registration: 'VT-ELE', seatingCapacity: 13 },
      { model: "Dauphin 2", modelId: 'dauphin-2', type: 'RW', registration: 'VT-ELI', seatingCapacity: 13 },
      { model: "Dauphin 2", modelId: 'dauphin-2', type: 'RW', registration: 'VT-ELL', seatingCapacity: 13 },
      { model: "Dauphin 2", modelId: 'dauphin-2', type: 'RW', registration: 'VT-ELN', seatingCapacity: 13 },
      { model: "Dauphin 2", modelId: 'dauphin-2', type: 'RW', registration: 'VT-ELR', seatingCapacity: 13 },
      { model: "Dauphin 2", modelId: 'dauphin-2', type: 'RW', registration: 'VT-ELT', seatingCapacity: 13 },
      { model: "Dauphin 2", modelId: 'dauphin-2', type: 'RW', registration: 'VT-ENW', seatingCapacity: 11 },
      { model: "Dauphin 2", modelId: 'dauphin-2', type: 'RW', registration: 'VT-ENZ', seatingCapacity: 8 },
      { model: "Bell 206 L4", modelId: 'bell-206-l4', type: 'RW', registration: 'VT-PHA', seatingCapacity: 7 },
      { model: "Bell 206 L4", modelId: 'bell-206-l4', type: 'RW', registration: 'VT-PHE', seatingCapacity: 7 },
      { model: "Bell 407", modelId: 'bell-407', type: 'RW', registration: 'VT-PHI', seatingCapacity: 7 },
      { model: "Bell 407", modelId: 'bell-407', type: 'RW', registration: 'VT-PHN', seatingCapacity: 7 },
      { model: "Bell 407", modelId: 'bell-407', type: 'RW', registration: 'VT-PHQ', seatingCapacity: 7 },
      { model: "Dauphin AS 365 N3", modelId: 'dauphin-as-365-n3', type: 'RW', registration: 'VT-PHJ', seatingCapacity: 13 },
      { model: "Dauphin AS 365 N3", modelId: 'dauphin-as-365-n3', type: 'RW', registration: 'VT-PHL', seatingCapacity: 13 },
      { model: "Dauphin AS 365 N3", modelId: 'dauphin-as-365-n3', type: 'RW', registration: 'VT-PHM', seatingCapacity: 13 },
      { model: "Dauphin AS 365 N3", modelId: 'dauphin-as-365-n3', type: 'RW', registration: 'VT-PHR', seatingCapacity: 11 },
      { model: "Dauphin AS 365 N3", modelId: 'dauphin-as-365-n3', type: 'RW', registration: 'VT-PHS', seatingCapacity: 11 },
      { model: "Dauphin AS 365 N3", modelId: 'dauphin-as-365-n3', type: 'RW', registration: 'VT-ENX', seatingCapacity: 11 },
      { model: "Dauphin AS 365 N3", modelId: 'dauphin-as-365-n3', type: 'RW', registration: 'VT-PHW', seatingCapacity: 12 },
      { model: "Dauphin AS 365 N3", modelId: 'dauphin-as-365-n3', type: 'RW', registration: 'VT-PHX', seatingCapacity: 12 },
      { model: "Dauphin AS 365 N3", modelId: 'dauphin-as-365-n3', type: 'RW', registration: 'VT-PHY', seatingCapacity: 12 },
      { model: "Dauphin AS 365 N3", modelId: 'dauphin-as-365-n3', type: 'RW', registration: 'VT-PHZ', seatingCapacity: 12 },
      { model: "Dauphin AS 365 N3", modelId: 'dauphin-as-365-n3', type: 'RW', registration: 'VT-PWC', seatingCapacity: 12 },
      { model: "Dauphin AS 365 N3", modelId: 'dauphin-as-365-n3', type: 'RW', registration: 'VT-PWB', seatingCapacity: 12 },
      { model: "Dauphin AS 365 N3", modelId: 'dauphin-as-365-n3', type: 'RW', registration: 'VT-PWD', seatingCapacity: 12 },
      { model: "Dauphin AS 365 N3", modelId: 'dauphin-as-365-n3', type: 'RW', registration: 'VT-PWE', seatingCapacity: 12 },
      { model: "Ecureuil AS 350 B3", modelId: 'ecureuil-as-350-b3', type: 'RW', registration: 'VT-PHV', seatingCapacity: 5 },
      { model: "Ecureuil AS 350 B3", modelId: 'ecureuil-as-350-b3', type: 'RW', registration: 'VT-PHU', seatingCapacity: 5 },
      { model: "MI-172", modelId: 'mi-172', type: 'RW', registration: 'VT-PHG', seatingCapacity: 26 },
      { model: "Sikorsky S-76D", modelId: 'sikorsky-s-76d', type: 'RW', registration: 'VT-PWM', seatingCapacity: 12 },
      { model: "Sikorsky S-76D", modelId: 'sikorsky-s-76d', type: 'RW', registration: 'VT-PWJ', seatingCapacity: 12 },
      { model: "Sikorsky S-76D", modelId: 'sikorsky-s-76d', type: 'RW', registration: 'VT-PWK', seatingCapacity: 12 },
      { model: "SA 365N", modelId: 'sa-365n', type: 'RW', registration: 'VT-ELD', seatingCapacity: 11 },
      { model: "SA 365N", modelId: 'sa-365n', type: 'RW', registration: 'VT-ELG', seatingCapacity: 11 },
      { model: "SA 365N", modelId: 'sa-365n', type: 'RW', registration: 'VT-ELS', seatingCapacity: 11 },
      { model: "ALH (Dhruv)", modelId: 'alh-dhruv', type: 'RW', registration: 'VT-HAU', seatingCapacity: 9 },
      { model: "Sikorsky S-76D", modelId: 'sikorsky-s-76d', type: 'RW', registration: 'VT-PWL', seatingCapacity: 12 },
    ]
  },
  {
    id: 86,
    name: "Pilgrimage Aviation Private Limited",
    city: "New Delhi",
    state: "Delhi",
    aopNo: "#08/2025",
    validUpto: "2030-06-04",
    totalAircraft: 1,
    fleet: [
      { model: "AS350B3E", modelId: 'as350b3e', type: 'RW', registration: 'VT-NSS', seatingCapacity: 6 },
    ]
  },
  {
    id: 87,
    name: "Pioneer Flying Academy Pvt. Ltd.",
    city: "New Delhi",
    state: "Delhi",
    aopNo: "#09/2015",
    validUpto: "2027-10-13",
    totalAircraft: 2,
    fleet: [
      { model: "Cessna 172S", modelId: 'cessna-172s', type: 'FW', registration: 'VT-PFA', seatingCapacity: 'Aerial Work' },
      { model: "Cessna 172S", modelId: 'cessna-172s', type: 'FW', registration: 'VT-AGH', seatingCapacity: 'Aerial Work' },
    ]
  },
  {
    id: 88,
    name: "Pinnacle Air Pvt. Ltd.",
    city: "New Delhi",
    state: "Delhi",
    aopNo: "#25/2008",
    validUpto: "2028-10-02",
    totalAircraft: 9,
    fleet: [
      { model: "Bell 407", modelId: 'bell-407', type: 'RW', registration: 'VT-PSA', seatingCapacity: 6 },
      { model: "Bell 407", modelId: 'bell-407', type: 'RW', registration: 'VT-GNK', seatingCapacity: 6 },
      { model: "Cessna Citation CJ1I", modelId: 'cessna-citation-cj1i', type: 'FW', registration: 'VT-DOV', seatingCapacity: 7 },
      { model: "P68 Observer-2", modelId: 'p68-observer-2', type: 'FW', registration: 'VT-TAA', seatingCapacity: 4 },
      { model: "King Air C90B", modelId: 'king-air-c90b', type: 'FW', registration: 'VT-NKF', seatingCapacity: 6 },
      { model: "Beechcraft Premier 1A-390", modelId: 'beechcraft-premier-1a-390', type: 'FW', registration: 'VT-MEL', seatingCapacity: 6 },
      { model: "King Air C90GTi", modelId: 'king-air-c90gti', type: 'FW', registration: 'VT-KJS', seatingCapacity: 6 },
      { model: "G-200", modelId: 'g-200', type: 'FW', registration: 'VT-VEL', seatingCapacity: 9 },
      { model: "AS350B2", modelId: 'as350b2', type: 'RW', registration: 'VT-KBS', seatingCapacity: 3 },
    ]
  },
  {
    id: 89,
    name: "Poonawalla Aviation Pvt. Ltd.",
    city: "Pune",
    state: "Maharashtra",
    aopNo: "#03/2006",
    validUpto: "2029-06-25",
    totalAircraft: 5,
    fleet: [
      { model: "H145", modelId: 'h145', type: 'RW', registration: 'VT-NAP', seatingCapacity: 7 },
      { model: "Bombardier Global 6000", modelId: 'bombardier-global-6000', type: 'FW', registration: 'VT-CDP', seatingCapacity: 13 },
      { model: "Bombardier Global 6500", modelId: 'bombardier-global-6500', type: 'FW', registration: 'VT-NAD', seatingCapacity: 13 },
      { model: "Bombardier Global 6500", modelId: 'bombardier-global-6500', type: 'FW', registration: 'VT-CDC', seatingCapacity: 13 },
      { model: "H160-B", modelId: 'h160-b', type: 'RW', registration: 'VT-CND', seatingCapacity: 8 },
    ]
  },
  {
    id: 90,
    name: "Pradhaan Air Express Pvt. Ltd.",
    city: "New Delhi",
    state: "Delhi",
    aopNo: "#08/2022",
    validUpto: "2027-09-21",
    totalAircraft: 1,
    fleet: [
      { model: "A320-232", modelId: 'a320-232', type: 'FW', registration: 'VT-PNS', seatingCapacity: 'Cargo' },
    ]
  },
  {
    id: 91,
    name: "Property Ventures (India) Pvt. Ltd.",
    city: "New Delhi",
    state: "Delhi",
    aopNo: "#04/2022",
    validUpto: "2027-04-18",
    totalAircraft: 3,
    fleet: [
      { model: "AW169", modelId: 'aw169', type: 'RW', registration: 'VT-WCL', seatingCapacity: 7 },
      { model: "Falcon 2000EX", modelId: 'falcon-2000ex', type: 'FW', registration: 'VT-RKP', seatingCapacity: 10 },
      { model: "EC-130T2", modelId: 'ec-130t2', type: 'RW', registration: 'VT-RKV', seatingCapacity: 6 },
    ]
  },
  {
    id: 92,
    name: "Rajas Aerosports and Adventures Provate Limited (Air Safari)",
    city: "Dehradun",
    state: "Uttarakhand",
    aopNo: "#02/2024",
    validUpto: "2029-01-31",
    totalAircraft: 7,
    fleet: [
      { model: "Cessna Citation 560XL", modelId: 'cessna-citation-560xl', type: 'FW', registration: 'VT-RJL', seatingCapacity: 9 },
      { model: "AS350B3", modelId: 'as350b3', type: 'RW', registration: 'VT-RJF', seatingCapacity: 5 },
      { model: "AS350B3", modelId: 'as350b3', type: 'RW', registration: 'VT-RJG', seatingCapacity: 5 },
      { model: "AS350B3", modelId: 'as350b3', type: 'RW', registration: 'VT-RJH', seatingCapacity: 5 },
      { model: "Ultramagic M-105", modelId: 'ultramagic-m-105', type: 'B', registration: 'VT-RAG', seatingCapacity: 4 },
      { model: "Ultramagic N-210", modelId: 'ultramagic-n-210', type: 'B', registration: 'VT-RBO', seatingCapacity: 10 },
      { model: "AS350B3", modelId: 'as350b3', type: 'RW', registration: 'VT-RJM', seatingCapacity: 5 },
    ]
  },
  {
    id: 93,
    name: "Rajhans Infracon (India) Private Limited",
    city: "Surat",
    state: "Gujarat",
    aopNo: "#03/2024",
    validUpto: "2029-02-08",
    totalAircraft: 1,
    fleet: [
      { model: "Beech SKA B200GT", modelId: 'beech-ska-b200gt', type: 'FW', registration: 'VT-DJB', seatingCapacity: 7 },
    ]
  },
  {
    id: 94,
    name: "Raymond Ltd.",
    city: "Thane",
    state: "Maharashtra",
    aopNo: "#05/1996",
    validUpto: "2029-01-28",
    totalAircraft: 1,
    fleet: [
      { model: "Agusta A109S", modelId: 'agusta-a109s', type: 'RW', registration: 'VT-GHS', seatingCapacity: 6 },
    ]
  },
  {
    id: 95,
    name: "Redbird Airways Pvt. Ltd.",
    city: "New Delhi",
    state: "Delhi",
    aopNo: "#01/2020",
    validUpto: "2030-08-12",
    totalAircraft: 5,
    fleet: [
      { model: "KingAir C90B", modelId: 'kingair-c90b', type: 'FW', registration: 'VT-RAM', seatingCapacity: 6 },
      { model: "SKA B200", modelId: 'ska-b200', type: 'FW', registration: 'VT-EHB', seatingCapacity: 8 },
      { model: "King Air C90A", modelId: 'king-air-c90a', type: 'FW', registration: 'VT-EJZ', seatingCapacity: 6 },
      { model: "Cessna Citation III (650)", modelId: 'cessna-citation-iii-650', type: 'FW', registration: 'VT-IPA', seatingCapacity: 8 },
      { model: "Cessna Citation 560XL", modelId: 'cessna-citation-560xl', type: 'FW', registration: 'VT-BSL', seatingCapacity: 8 },
    ]
  },
  {
    id: 96,
    name: "Redbird Flight Training Academy Private Limited",
    city: "New Delhi",
    state: "Delhi",
    aopNo: "#10/2022",
    validUpto: "2027-10-06",
    totalAircraft: 1,
    fleet: [
      { model: "Tecnam P2006T", modelId: 'tecnam-p2006t', type: 'FW', registration: 'VT-RBB', seatingCapacity: 3 },
    ]
  },
  {
    id: 97,
    name: "Reliance Transport & Travels Pvt. Ltd.",
    city: "Mumbai",
    state: "Maharashtra",
    aopNo: "#03/2000",
    validUpto: "2028-09-27",
    totalAircraft: 4,
    fleet: [
      { model: "Global 5000", modelId: 'global-5000', type: 'FW', registration: 'VT-JSK', seatingCapacity: 13 },
      { model: "EMB-135BJ", modelId: 'emb-135bj', type: 'FW', registration: 'VT-OMM', seatingCapacity: 13 },
      { model: "Falcon 2000", modelId: 'falcon-2000', type: 'FW', registration: 'VT-AAT', seatingCapacity: 10 },
      { model: "Global 5000", modelId: 'global-5000', type: 'FW', registration: 'VT-VIV', seatingCapacity: 13 },
    ]
  },
  {
    id: 98,
    name: "Reliance Commercial Dealers Ltd.",
    city: "Mumbai",
    state: "Maharashtra",
    aopNo: "#02/2008",
    validUpto: "2029-01-14",
    totalAircraft: 15,
    fleet: [
      { model: "A319-115 CJ", modelId: 'a319-115-cj', type: 'FW', registration: 'VT-IAH', seatingCapacity: 19 },
      { model: "Falcon 900EX", modelId: 'falcon-900ex', type: 'FW', registration: 'VT-AKU', seatingCapacity: 14 },
      { model: "Sikorsky S-76 C++", modelId: 'sikorsky-s-76-c-plus-plus', type: 'RW', registration: 'VT-NMA', seatingCapacity: 5 },
      { model: "Sikorsky S-76 C++", modelId: 'sikorsky-s-76-c-plus-plus', type: 'RW', registration: 'VT-NIT', seatingCapacity: 8 },
      { model: "Global Express BD-700", modelId: 'global-express-bd-700', type: 'FW', registration: 'VT-DHA', seatingCapacity: 16 },
      { model: "Global Express BD-700", modelId: 'global-express-bd-700', type: 'FW', registration: 'VT-HMA', seatingCapacity: 14 },
      { model: "Global 6000 BD-700-1A10", modelId: 'global-6000-bd-700-1a10', type: 'FW', registration: 'VT-AHI', seatingCapacity: 14 },
      { model: "AS 365 N3", modelId: 'as-365-n3', type: 'RW', registration: 'VT-JIO', seatingCapacity: 5 },
      { model: "Embraer 135ER", modelId: 'embraer-135er', type: 'FW', registration: 'VT-JMN', seatingCapacity: 37 },
      { model: "Global 7500 BD700-2A-12", modelId: 'global-7500-bd700-2a-12', type: 'FW', registration: 'VT-ASR', seatingCapacity: 14 },
      { model: "Global 7500 BD700-2A-12", modelId: 'global-7500-bd700-2a-12', type: 'FW', registration: 'VT-PRI', seatingCapacity: 15 },
      { model: "B737-9", modelId: 'b737-9', type: 'FW', registration: 'VT-AKV', seatingCapacity: 19 },
      { model: "Embraer ERJ 170-200 LR", modelId: 'embraer-erj-170-200-lr', type: 'FW', registration: 'VT-JMR', seatingCapacity: 60 },
      { model: "H160-B", modelId: 'h160-b', type: 'RW', registration: 'VT-PVS', seatingCapacity: 6 },
      { model: "H160-B", modelId: 'h160-b', type: 'RW', registration: 'VT-AKI', seatingCapacity: 6 },
    ]
  },
  {
    id: 99,
    name: "Rithwik Green Power and Aviation Pvt. Ltd.",
    city: "Hyderabad",
    state: "Telangana",
    aopNo: "#12/2022",
    validUpto: "2027-10-25",
    totalAircraft: 3,
    fleet: [
      { model: "King Air B200 GT", modelId: 'king-air-b200-gt', type: 'FW', registration: 'VT-VIN', seatingCapacity: 8 },
      { model: "EMB-135 (Legacy 600)", modelId: 'emb-135-legacy-600', type: 'FW', registration: 'VT-VIK', seatingCapacity: 13 },
      { model: "Citation 525A CJ2+", modelId: 'citation-525a-cj2-plus', type: 'FW', registration: 'VT-SRE', seatingCapacity: 7 },
    ]
  },
  {
    id: 100,
    name: "Rivaan Technologies Private Limited",
    city: "Pune",
    state: "Maharashtra",
    aopNo: "#20/2025",
    validUpto: "2030-12-30",
    totalAircraft: 1,
    fleet: [
      { model: "AW119 Koala", modelId: 'aw119-koala', type: 'RW', registration: 'VT-ABY', seatingCapacity: 7 },
    ]
  },
  {
    id: 101,
    name: "RPS Aviation Pvt. Ltd.",
    city: "Kolkata",
    state: "West Bengal",
    aopNo: "#02/2022",
    validUpto: "2027-04-10",
    totalAircraft: 1,
    fleet: [
      { model: "Falcon 2000", modelId: 'falcon-2000', type: 'FW', registration: 'VT-TBT', seatingCapacity: 8 },
    ]
  },
  {
    id: 102,
    name: "RPSG Resources Pvt Ltd.",
    city: "Kolkata",
    state: "West Bengal",
    aopNo: "#08/2014",
    validUpto: "2028-06-25",
    totalAircraft: 2,
    fleet: [
      { model: "Bombardier Global 5000", modelId: 'bombardier-global-5000', type: 'FW', registration: 'VT-SHG', seatingCapacity: 13 },
      { model: "BD-700-2A12 (G7500)", modelId: 'bd-700-2a12-g7500', type: 'FW', registration: 'VT-MIR', seatingCapacity: 16 },
    ]
  },
  {
    id: 103,
    name: "Saarthi Airways Pvt. Ltd.",
    city: "Jaipur",
    state: "Rajasthan",
    aopNo: "#09/2010",
    validUpto: "2028-12-13",
    totalAircraft: 4,
    fleet: [
      { model: "Super King Air B200", modelId: 'super-king-air-b200', type: 'FW', registration: 'VT-MPG', seatingCapacity: 7 },
      { model: "Falcon 2000EX", modelId: 'falcon-2000ex', type: 'FW', registration: 'VT-RSG', seatingCapacity: 9 },
      { model: "Twin Otter DHC-6-300", modelId: 'twin-otter-dhc-6-300', type: 'FW', registration: 'VT-ELX', seatingCapacity: 'Aerial Work' },
      { model: "Agusta A109S", modelId: 'agusta-a109s', type: 'RW', registration: 'VT-LJH', seatingCapacity: 6 },
    ]
  },
  {
    id: 104,
    name: "Saffron Strokes Private Limited",
    city: "New Delhi",
    state: "Delhi",
    aopNo: "#04/2024",
    validUpto: "2029-02-18",
    totalAircraft: 2,
    fleet: [
      { model: "Beechcraft Premier 1A-390", modelId: 'beechcraft-premier-1a-390', type: 'FW', registration: 'VT-PMO', seatingCapacity: 6 },
      { model: "Beechcraft Premier 1A-390", modelId: 'beechcraft-premier-1a-390', type: 'FW', registration: 'VT-SRK', seatingCapacity: 6 },
    ]
  },
  {
    id: 105,
    name: "Sai Construction Pvt. Ltd.",
    city: "Pune",
    state: "Maharashtra",
    aopNo: "#04/2025",
    validUpto: "2030-02-18",
    totalAircraft: 1,
    fleet: [
      { model: "Hawker 800XP", modelId: 'hawker-800xp', type: 'FW', registration: 'VT-VAP', seatingCapacity: 8 },
    ]
  },
  {
    id: 106,
    name: "Sapphire Airlines Pvt. Ltd.",
    city: "Mumbai",
    state: "Maharashtra",
    aopNo: "#03/2022",
    validUpto: "2027-04-12",
    totalAircraft: 3,
    fleet: [
      { model: "Leonardo AW169", modelId: 'leonardo-aw169', type: 'RW', registration: 'VT-JSD', seatingCapacity: 6 },
      { model: "BD-100-1A10 (Challenger 3500)", modelId: 'bd-100-1a10-challenger-3500', type: 'FW', registration: 'VT-JST', seatingCapacity: 10 },
      { model: "BD-700-2A12 (G7500)", modelId: 'bd-700-2a12-g7500', type: 'FW', registration: 'VT-JSJ', seatingCapacity: 15 },
    ]
  },
  {
    id: 107,
    name: "Shraddha Energy and Infraprojects Private Limited",
    city: "Pune",
    state: "Maharashtra",
    aopNo: "#12/2023",
    validUpto: "2028-12-06",
    totalAircraft: 1,
    fleet: [
      { model: "AS350B3", modelId: 'as350b3', type: 'RW', registration: 'VT-SBJ', seatingCapacity: 5 },
    ]
  },
  {
    id: 108,
    name: "Shivan Aadithya Air Services Pvt. Ltd.",
    city: "Coimbatore",
    state: "Tamil Nadu",
    aopNo: "#05/2022",
    validUpto: "2027-07-20",
    totalAircraft: 4,
    fleet: [
      { model: "A109S", modelId: 'a109s', type: 'RW', registration: 'VT-BST', seatingCapacity: 6 },
      { model: "A109S", modelId: 'a109s', type: 'RW', registration: 'VT-RKR', seatingCapacity: 7 },
      { model: "A109S", modelId: 'a109s', type: 'RW', registration: 'VT-BGM', seatingCapacity: 7 },
      { model: "Beechcraft Premier 1A-390", modelId: 'beechcraft-premier-1a-390', type: 'FW', registration: 'VT-RRR', seatingCapacity: 6 },
    ]
  },
  {
    id: 109,
    name: "Simm Samm Airways Pvt. Ltd.",
    city: "Mumbai",
    state: "Maharashtra",
    aopNo: "#14/2009",
    validUpto: "2029-04-08",
    totalAircraft: 3,
    fleet: [
      { model: "MD 900", modelId: 'md-900', type: 'RW', registration: 'VT-SSE', seatingCapacity: 7 },
      { model: "Hawker Beechcraft (Premier 1A)", modelId: 'hawker-beechcraft-premier-1a', type: 'FW', registration: 'VT-SSF', seatingCapacity: 6 },
      { model: "Sikorsky S-76C++", modelId: 'sikorsky-s-76c-plus-plus', type: 'RW', registration: 'VT-SSO', seatingCapacity: 5 },
    ]
  },
  {
    id: 110,
    name: "Sirius India Airlines Pvt. Ltd.",
    city: "Gurugram",
    state: "Haryana",
    aopNo: "#07/2024",
    validUpto: "2029-07-11",
    totalAircraft: 1,
    fleet: [
      { model: "Hawker 4000", modelId: 'hawker-4000', type: 'FW', registration: 'VT-KVR', seatingCapacity: 9 },
    ]
  },
  {
    id: 111,
    name: "Span Air pvt. Ltd.",
    city: "New Delhi",
    state: "Delhi",
    aopNo: "#06/1995",
    validUpto: "2028-11-23",
    totalAircraft: 4,
    fleet: [
      { model: "B 200 GT", modelId: 'b-200-gt', type: 'FW', registration: 'VT-SMR', seatingCapacity: 9 },
      { model: "Bell 429", modelId: 'bell-429', type: 'RW', registration: 'VT-JSH', seatingCapacity: 6 },
      { model: "Hawker 900XP", modelId: 'hawker-900xp', type: 'FW', registration: 'VT-PRY', seatingCapacity: 9 },
      { model: "Bell 429", modelId: 'bell-429', type: 'RW', registration: 'VT-SMK', seatingCapacity: 5 },
    ]
  },
  {
    id: 112,
    name: "Skyblue Aviation Services Pvt. Ltd.",
    city: "Hyderabad",
    state: "Telangana",
    aopNo: "#13/2024",
    validUpto: "2029-12-19",
    totalAircraft: 1,
    fleet: [
      { model: "Falcon 900EX", modelId: 'falcon-900ex', type: 'FW', registration: 'VT-KSE', seatingCapacity: 14 },
    ]
  },
  {
    id: 113,
    name: "Sky One Airways Pvt. Ltd.",
    city: "New Delhi",
    state: "Delhi",
    aopNo: "#04/2013",
    validUpto: "2027-12-25",
    totalAircraft: 5,
    fleet: [
      { model: "MI-172", modelId: 'mi-172', type: 'RW', registration: 'VT-JJA', seatingCapacity: 26 },
      { model: "MI-172", modelId: 'mi-172', type: 'RW', registration: 'VT-SKB', seatingCapacity: 26 },
      { model: "MI-172", modelId: 'mi-172', type: 'RW', registration: 'VT-MAE', seatingCapacity: 26 },
      { model: "MI-171A2", modelId: 'mi-171a2', type: 'RW', registration: 'VT-SKH', seatingCapacity: 19 },
      { model: "MI-172", modelId: 'mi-172', type: 'RW', registration: 'VT-SKE', seatingCapacity: 26 },
    ]
  },
  {
    id: 114,
    name: "SkyJets International Pvt. Ltd.",
    city: "Hyderabad",
    state: "Telangana",
    aopNo: "#05/2015",
    validUpto: "2029-07-02",
    totalAircraft: 1,
    fleet: [
      { model: "Bombardier CL-600-2B16 (604 Variant)", modelId: 'bombardier-cl-600-2b16-604', type: 'FW', registration: 'VT-AUV', seatingCapacity: 9 },
    ]
  },
  {
    id: 115,
    name: "Smart Wings Aviation Pvt. Ltd.",
    city: "Bengaluru",
    state: "Karnataka",
    aopNo: "#09/2025",
    validUpto: "2030-07-23",
    totalAircraft: 1,
    fleet: [
      { model: "EC130T2", modelId: 'ec130t2', type: 'RW', registration: 'VT-RPB', seatingCapacity: 6 },
    ]
  },
  {
    id: 116,
    name: "Sparzana Aviation Pvt. Ltd.",
    city: "Chennai",
    state: "Tamil Nadu",
    aopNo: "#06/2022",
    validUpto: "2027-09-08",
    totalAircraft: 1,
    fleet: [
      { model: "Hawker 900XP", modelId: 'hawker-900xp', type: 'FW', registration: 'VT-RFX', seatingCapacity: 8 },
    ]
  },
  {
    id: 117,
    name: "SKB Infracons Pvt. Ltd.",
    city: "New Delhi",
    state: "Delhi",
    aopNo: "#05/2007",
    validUpto: "2029-06-20",
    totalAircraft: 1,
    fleet: [
      { model: "King Air C90A", modelId: 'king-air-c90a', type: 'FW', registration: 'VT-HYA', seatingCapacity: 6 },
    ]
  },
  {
    id: 118,
    name: "Sobha Puravankara Aviation Pvt. Ltd.",
    city: "Bengaluru",
    state: "Karnataka",
    aopNo: "#03/2012",
    validUpto: "2028-03-14",
    totalAircraft: 1,
    fleet: [
      { model: "Gulfstream G-200", modelId: 'gulfstream-g-200', type: 'FW', registration: 'VT-SNP', seatingCapacity: 9 },
    ]
  },
  {
    id: 119,
    name: "Sreeji Aviation Pvt. Ltd.",
    city: "Jamnagar",
    state: "Gujarat",
    aopNo: "#02/2023",
    validUpto: "2028-02-21",
    totalAircraft: 2,
    fleet: [
      { model: "Beech Super King Air B200", modelId: 'beech-super-king-air-b200', type: 'FW', registration: 'VT-MPT', seatingCapacity: 7 },
      { model: "Beech Super King Air B200", modelId: 'beech-super-king-air-b200', type: 'FW', registration: 'VT-LMW', seatingCapacity: 7 },
    ]
  },
  {
    id: 120,
    name: "Steamhouse India Ltd.",
    city: "Surat",
    state: "Gujarat",
    aopNo: "#18/2025",
    validUpto: "2030-10-20",
    totalAircraft: 1,
    fleet: [
      { model: "PA-46-350P", modelId: 'pa-46-350p', type: 'FW', registration: 'VT-SHL', seatingCapacity: 4 },
    ]
  },
  {
    id: 121,
    name: "Suhan Aviation Pvt. Ltd.",
    city: "Mumbai",
    state: "Maharashtra",
    aopNo: "#01/2016",
    validUpto: "2028-03-14",
    totalAircraft: 1,
    fleet: [
      { model: "S-76C++", modelId: 's-76c-plus-plus', type: 'RW', registration: 'VT-DBH', seatingCapacity: 6 },
    ]
  },
  {
    id: 122,
    name: "Syandan Aviation Pvt. Ltd.",
    city: "Gurugram",
    state: "Haryana",
    aopNo: "#11/2025",
    validUpto: "2030-09-10",
    totalAircraft: 2,
    fleet: [
      { model: "A109S", modelId: 'a109s', type: 'RW', registration: 'VT-HGX', seatingCapacity: 7 },
      { model: "A109E", modelId: 'a109e', type: 'RW', registration: 'VT-HAX', seatingCapacity: 7 },
    ]
  },
  {
    id: 123,
    name: "TAI Jets Private Limited",
    city: "Bengaluru",
    state: "Karnataka",
    aopNo: "#07/2025",
    validUpto: "2030-06-01",
    totalAircraft: 2,
    fleet: [
      { model: "EMB-135BJ (Legacy 650)", modelId: 'emb-135bj-legacy-650', type: 'FW', registration: 'VT-KJR', seatingCapacity: 13 },
      { model: "EMB-500 (Phenom 100E)", modelId: 'emb-500-phenom-100e', type: 'FW', registration: 'VT-KJK', seatingCapacity: 7 },
    ]
  },
  {
    id: 124,
    name: "Taj Air Ltd.",
    city: "Mumbai",
    state: "Maharashtra",
    aopNo: "#09/1993",
    validUpto: "2028-11-14",
    totalAircraft: 1,
    fleet: [
      { model: "Falcon 2000 LX", modelId: 'falcon-2000-lx', type: 'FW', registration: 'VT-TDT', seatingCapacity: 9 },
    ]
  },
  {
    id: 125,
    name: "Tara Aviation Services Pvt. Ltd.",
    city: "Coimbatore",
    state: "Tamil Nadu",
    aopNo: "#03/2026",
    validUpto: "2031-02-11",
    totalAircraft: 1,
    fleet: [
      { model: "Falcon 2000", modelId: 'falcon-2000', type: 'FW', registration: 'VT-TAT', seatingCapacity: 8 },
    ]
  },
  {
    id: 126,
    name: "Target Air Services Pvt. Ltd.",
    city: "New Delhi",
    state: "Delhi",
    aopNo: "#14/2023",
    validUpto: "2028-12-20",
    totalAircraft: 2,
    fleet: [
      { model: "Beech Super King Air B-200GT", modelId: 'beech-super-king-air-b-200gt', type: 'FW', registration: 'VT-JPV', seatingCapacity: 7 },
      { model: "Hawker 400AXP", modelId: 'hawker-400axp', type: 'FW', registration: 'VT-HBX', seatingCapacity: 8 },
    ]
  },
  {
    id: 127,
    name: "Thumby Aviation Pvt. Ltd.",
    city: "Thiruvananthapuram",
    state: "Kerala",
    aopNo: "#02/2013",
    validUpto: "2029-03-24",
    totalAircraft: 10,
    fleet: [
      { model: "Bell 412 EP", modelId: 'bell-412-ep', type: 'RW', registration: 'VT-ASL', seatingCapacity: 13 },
      { model: "Bell 412 EP", modelId: 'bell-412-ep', type: 'RW', registration: 'VT-KNG', seatingCapacity: 13 },
      { model: "Bell 407", modelId: 'bell-407', type: 'RW', registration: 'VT-KSA', seatingCapacity: 'Aerial Work' },
      { model: "AS350B3E", modelId: 'as350b3e', type: 'RW', registration: 'VT-GRA', seatingCapacity: 'Aerial Work' },
      { model: "Bell 407GXP", modelId: 'bell-407gxp', type: 'RW', registration: 'VT-GRB', seatingCapacity: 6 },
      { model: "AS350B3", modelId: 'as350b3', type: 'RW', registration: 'VT-GRC', seatingCapacity: 6 },
      { model: "Bell 412EP", modelId: 'bell-412ep', type: 'RW', registration: 'VT-NAV', seatingCapacity: 7 },
      { model: "Bell 412EP", modelId: 'bell-412ep', type: 'RW', registration: 'VT-GRD', seatingCapacity: 13 },
      { model: "Bell 407GX", modelId: 'bell-407gx', type: 'RW', registration: 'VT-NAL', seatingCapacity: 6 },
      { model: "EC130-T2", modelId: 'ec130-t2', type: 'RW', registration: 'VT-SDS', seatingCapacity: 7 },
    ]
  },
  {
    id: 128,
    name: "Trans Bharat Aviation Pvt. Ltd.",
    city: "New Delhi",
    state: "Delhi",
    aopNo: "#01/1991",
    validUpto: "2029-02-27",
    totalAircraft: 3,
    fleet: [
      { model: "Bell 407", modelId: 'bell-407', type: 'RW', registration: 'VT-TBC', seatingCapacity: 'Aerial Work' },
      { model: "Bell 407", modelId: 'bell-407', type: 'RW', registration: 'VT-TBF', seatingCapacity: 6 },
      { model: "Bell 407", modelId: 'bell-407', type: 'RW', registration: 'VT-JIB', seatingCapacity: 6 },
    ]
  },
  {
    id: 129,
    name: "Travian Flight Services Pvt. Ltd.",
    city: "New Delhi",
    state: "Delhi",
    aopNo: "#02/2021",
    validUpto: "2026-07-01",
    totalAircraft: 1,
    fleet: [
      { model: "Gulfstream G-150", modelId: 'gulfstream-g-150', type: 'FW', registration: 'VT-AST', seatingCapacity: 8 },
    ]
  },
  {
    id: 130,
    name: "United Helicharters Pvt. Ltd.",
    city: "Mumbai",
    state: "Maharashtra",
    aopNo: "#04/2026",
    validUpto: "2031-02-19",
    totalAircraft: 1,
    fleet: [
      { model: "AS350B3", modelId: 'as350b3', type: 'RW', registration: 'VT-UHE', seatingCapacity: 6 },
    ]
  },
  {
    id: 131,
    name: "Universal Airways Pvt. Ltd.",
    city: "New Delhi",
    state: "Delhi",
    aopNo: "#04/2006",
    validUpto: "2028-07-31",
    totalAircraft: 1,
    fleet: [
      { model: "AW139", modelId: 'aw139', type: 'RW', registration: 'VT-TWO', seatingCapacity: 8 },
    ]
  },
  {
    id: 132,
    name: "Vijayanand Travels Private Limited",
    city: "Dharwad",
    state: "Karnataka",
    aopNo: "#09/2023",
    validUpto: "2028-09-14",
    totalAircraft: 1,
    fleet: [
      { model: "G-150", modelId: 'g-150', type: 'FW', registration: 'VT-PLV', seatingCapacity: 9 },
    ]
  },
  {
    id: 133,
    name: "Vimaan Airlines Pvt. Ltd.",
    city: "New Delhi",
    state: "Delhi",
    aopNo: "#03/2025",
    validUpto: "2030-02-03",
    totalAircraft: 1,
    fleet: [
      { model: "Hawker 800XP", modelId: 'hawker-800xp', type: 'FW', registration: 'VT-DYK', seatingCapacity: 8 },
    ]
  },
  {
    id: 134,
    name: "Ventura Airconnect Ltd.",
    city: "Surat",
    state: "Gujarat",
    aopNo: "#08/2011",
    validUpto: "2028-06-08",
    totalAircraft: 4,
    fleet: [
      { model: "Cessna Caravan 208B", modelId: 'cessna-caravan-208b', type: 'FW', registration: 'VT-VAK', seatingCapacity: 9 },
      { model: "Cessna Caravan 208B", modelId: 'cessna-caravan-208b', type: 'FW', registration: 'VT-VAM', seatingCapacity: 9 },
      { model: "Cessna Caravan 208B", modelId: 'cessna-caravan-208b', type: 'FW', registration: 'VT-DEV', seatingCapacity: 9 },
      { model: "PC-12/45", modelId: 'pc-12-45', type: 'FW', registration: 'VT-IOO', seatingCapacity: 8 },
    ]
  },
  {
    id: 135,
    name: "VSR Corporation Pvt. Ltd.",
    city: "New Delhi",
    state: "Delhi",
    aopNo: "#04/2023",
    validUpto: "2028-04-17",
    totalAircraft: 1,
    fleet: [
      { model: "Beech Super King Air B300 (350)", modelId: 'beech-super-king-air-b300-350', type: 'FW', registration: 'VT-LJS', seatingCapacity: 9 },
    ]
  },
  {
    id: 136,
    name: "VSR Ventures Pvt. Ltd.",
    city: "New Delhi",
    state: "Delhi",
    aopNo: "#07/2014",
    validUpto: "2028-04-20",
    totalAircraft: 17,
    fleet: [
      { model: "Beechcraft King Air B200", modelId: 'beechcraft-king-air-b200', type: 'FW', registration: 'VT-BAF', seatingCapacity: 8 },
      { model: "Pilatus PC-12", modelId: 'pilatus-pc-12', type: 'FW', registration: 'VT-MEG', seatingCapacity: 8 },
      { model: "Learjet-45", modelId: 'learjet-45', type: 'FW', registration: 'VT-CRA', seatingCapacity: 9 },
      { model: "Beechcraft King Air B200", modelId: 'beechcraft-king-air-b200', type: 'FW', registration: 'VT-SRC', seatingCapacity: 8 },
      { model: "Learjet-45 XR", modelId: 'learjet-45-xr', type: 'FW', registration: 'VT-TRI', seatingCapacity: 9 },
      { model: "Learjet-45 XR", modelId: 'learjet-45-xr', type: 'FW', registration: 'VT-DBL', seatingCapacity: 9 },
      { model: "Learjet-40XR", modelId: 'learjet-40xr', type: 'FW', registration: 'VT-VRS', seatingCapacity: 7 },
      { model: "EMB 135BJ (Legacy 600)", modelId: 'emb-135bj-legacy-600', type: 'FW', registration: 'VT-CMR', seatingCapacity: 13 },
      { model: "SKA B200", modelId: 'ska-b200', type: 'FW', registration: 'VT-BAS', seatingCapacity: 8 },
      { model: "Learjet-45 XR", modelId: 'learjet-45-xr', type: 'FW', registration: 'VT-VRV', seatingCapacity: 9 },
      { model: "Learjet-40 XR", modelId: 'learjet-40-xr', type: 'FW', registration: 'VT-VRA', seatingCapacity: 7 },
      { model: "Learjet-45XR", modelId: 'learjet-45xr', type: 'FW', registration: 'VT-VRR', seatingCapacity: 9 },
      { model: "EMB 135 (Legacy 600)", modelId: 'emb-135-legacy-600', type: 'FW', registration: 'VT-VSS', seatingCapacity: 13 },
      { model: "Beechcraft King Air B200", modelId: 'beechcraft-king-air-b200', type: 'FW', registration: 'VT-RSM', seatingCapacity: 8 },
      { model: "EMB 135 (Legacy 600)", modelId: 'emb-135-legacy-600', type: 'FW', registration: 'VT-NSG', seatingCapacity: 13 },
      { model: "EMB 135 (Legacy 600)", modelId: 'emb-135-legacy-600', type: 'FW', registration: 'VT-VSG', seatingCapacity: 13 },
      { model: "EMB 135 BJ (Legacy 650)", modelId: 'emb-135-bj-legacy-650', type: 'FW', registration: 'VT-VSV', seatingCapacity: 14 },
    ]
  },
  {
    id: 137,
    name: "Zest Aviation Pvt. Ltd.",
    city: "Ahmedabad",
    state: "Gujarat",
    aopNo: "#07/2012",
    validUpto: "2028-06-27",
    totalAircraft: 6,
    fleet: [
      { model: "Challenger 604", modelId: 'challenger-604', type: 'FW', registration: 'VT-ZST', seatingCapacity: 9 },
      { model: "Cessna Citation 560XL", modelId: 'cessna-citation-560xl', type: 'FW', registration: 'VT-TRZ', seatingCapacity: 8 },
      { model: "Global Express XRS", modelId: 'global-express-xrs', type: 'FW', registration: 'VT-TUS', seatingCapacity: 13 },
      { model: "Challenger 650 CL-600-2B16", modelId: 'challenger-650-cl-600-2b16', type: 'FW', registration: 'VT-ZTT', seatingCapacity: 10 },
      { model: "BD-700-1A11 (Global 5500)", modelId: 'bd-700-1a11-global-5500', type: 'FW', registration: 'VT-ZTP', seatingCapacity: 13 },
      { model: "Cessna Citation 560XL", modelId: 'cessna-citation-560xl', type: 'FW', registration: 'VT-TAZ', seatingCapacity: 8 },
    ]
  },
];

export default operators;

export const getOperatorById = (id) => operators.find(o => o.id === id);
export const getOperatorsByState = (state) => operators.filter(o => o.state === state);
export const getOperatorsByCity = (city) => operators.filter(o => o.city === city);
export const getAllStates = () => [...new Set(operators.map(o => o.state))];
export const getAllCities = () => [...new Set(operators.map(o => o.city))];
