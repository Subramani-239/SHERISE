/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Scheme } from '../types';

export const schemesData: Scheme[] = [
  // ==========================================
  // TAMIL NADU GOVERNMENT SCHEMES
  // ==========================================
  {
    id: 'kalaignar-magalir-urimai',
    title: 'Kalaignar Magalir Urimai Thittam',
    titleTa: 'கலைஞர் மகளிர் உரிமைத் திட்டம்',
    titleHi: 'कलैग्नार महिला अधिकार योजना',
    department: 'Government of Tamil Nadu (Social Welfare & Women Empowerment Dept)',
    departmentTa: 'தமிழ்நாடு அரசு (சமூக நலம் & மகளிர் உரிமைத்துறை)',
    departmentHi: 'तमिलनाडु सरकार (समाज कल्याण एवं महिला सशक्तिकरण विभाग)',
    governmentLevel: 'tamil_nadu',
    stateOrUt: 'Tamil Nadu',
    category: 'financial_aid',
    isLoan: false,
    benefits: '₹1,000 per month deposited directly into the bank account of woman head of household via DBT.',
    benefitsTa: 'குடும்பத் தலைவிகளுக்கு மாதம் தோறும் ₹1,000 வங்கி கணக்கில் நேரடியாக வரவு வைக்கப்படுகிறது.',
    benefitsHi: 'महिला परिवार प्रमुखों के बैंक खाते में प्रतिमाह ₹1,000 प्रत्यक्ष रूप से जमा किए जाते हैं।',
    minAge: 21,
    targetGroup: ['homemaker', 'rural', 'dropout'],
    eligibility: [
      'Woman aged 21 years or older.',
      'Must be acknowledged as the head of the family in the Smart Ration Card.',
      'Annual family income should be under ₹2.5 Lakhs.',
      'Family must own less than 5 acres of wetland or 10 acres of dry land.',
      'Annual domestic electricity consumption must be below 3,600 units.'
    ],
    eligibilityTa: [
      '21 வயது பூர்த்தியடைந்த பெண் குடும்பத் தலைவர்.',
      'ஸ்மார்ட் குடும்ப அட்டையில் (Ration Card) குடும்பத் தலைவியாக இருக்க வேண்டும்.',
      'குடும்ப ஆண்டு வருமானம் ₹2.5 லட்சத்திற்கு குறைவாக இருக்க வேண்டும்.',
      '5 ஏக்கருக்கு குறைவான நன்செய் அல்லது 10 ஏக்கருக்கு குறைவான புன்செய் நிலம்.',
      'ஆண்டுக்கு 3,600 யூனிட்டிற்கு குறைவான மின்சார நுகர்வு.'
    ],
    eligibilityHi: [
      '21 वर्ष या उससे अधिक आयु की महिला परिवार प्रमुख।',
      'राशन कार्ड में महिला मुखिया के रूप में दर्ज होना अनिवार्य।',
      'परिवार की वार्षिक आय ₹2.5 लाख से कम होनी चाहिए।',
      '5 एकड़ से कम सिंचित या 10 एकड़ से कम असिंचित भूमि।',
      'वार्षिक बिजली खपत 3,600 यूनिट से कम होनी चाहिए।'
    ],
    documentsRequired: [
      'Aadhaar Card (linked with active bank account)',
      'Smart Ration Card (Family Card)',
      'Bank Passbook (showing IFSC & Account Number)',
      'Electricity Consumer Number'
    ],
    documentsRequiredTa: [
      'ஆதார் அட்டை (வங்கி கணக்குடன் இணைக்கப்பட்டது)',
      'ஸ்மார்ட் குடும்ப அட்டை (ரேஷன் கார்டு)',
      'வங்கி கணக்கு புத்தகம் (IFSC மற்றும் கணக்கு எண்)',
      'மின் இணைப்பு நுகர்வோர் எண்'
    ],
    documentsRequiredHi: [
      'आधार कार्ड (बैंक खाते से लिंक)',
      'स्मार्ट राशन कार्ड (परिवार कार्ड)',
      'बैंक पासबुक',
      'बिजली उपभोक्ता संख्या'
    ],
    applicationSteps: [
      'Apply at the designated Taluk Special Camp or through the nearest e-Sevai center.',
      'Biometric fingerprint or Aadhaar OTP authentication is performed on-site.',
      'Field verification is carried out by village revenue administration.',
      'Approved amount is credited directly via DBT on the 15th of every month.'
    ],
    applicationStepsTa: [
      'வட்டார சிறப்பு முகாமில் அல்லது அருகில் உள்ள இ-சேவை மையம் மூலம் விண்ணப்பிக்கவும்.',
      'கைரேகை அல்லது ஆதார் OTP மூலம் பயோமெட்ரிக் சரிபார்ப்பு செய்யப்படும்.',
      'வருவாய்த்துறை கிராம நிர்வாக அலுவலரால் கள ஆய்வு செய்யப்படும்.',
      'ஒவ்வொரு மாதமும் 15-ஆம் தேதி வங்கி கணக்கில் தொகை நேரடியாக வரவு வைக்கப்படும்.'
    ],
    applicationStepsHi: [
      'विशेष शिविर या नजदीकी ई-सेवा केंद्र से आवेदन करें।',
      'बायोमेट्रिक फिंगरप्रिंट या आधार ओटीपी से सत्यापन।',
      'राजस्व अधिकारियों द्वारा स्थलीय सत्यापन।',
      'प्रत्येक माह की 15 तारीख को डीबीटी द्वारा खाते में राशि जमा।'
    ],
    officialUrl: 'https://kmut.tn.gov.in',
    verificationDate: 'Verified Official Gazette - January 2026',
    lastCheckedDate: '2026-01-15',
    officialSource: 'Department of Social Welfare & Women Empowerment, Govt of Tamil Nadu',
    officeOrServiceCenter: 'e-Sevai Center / Taluk Revenue Office / Gram Panchayat Office',
    officeOrServiceCenterTa: 'இ-சேவை மையம் / வட்டாட்சியர் அலுவலகம் / கிராம பஞ்சாயத்து',
    officeOrServiceCenterHi: 'ई-सेवा केंद्र / तहसील राजस्व कार्यालय / ग्राम पंचायत',
    helpline: '044-25619208 / 181',
    badge: '100% Free Grant',
    badgeTa: '100% நேரடி மானியம்',
    badgeHi: '100% प्रत्यक्ष अनुदान'
  },
  {
    id: 'pudhumai-penn',
    title: 'Moovalur Ramamirtham Ammaiyar - Pudhumai Penn Thittam',
    titleTa: 'புதுமைப் பெண் திட்டம் (உயர்கல்வி உதவி)',
    titleHi: 'पुदुमई पेन योजना (उच्च शिक्षा वित्तीय सहायता)',
    department: 'Higher Education Department, Tamil Nadu',
    departmentTa: 'உயர்கல்வித்துறை, தமிழ்நாடு அரசு',
    departmentHi: 'उच्च शिक्षा विभाग, तमिलनाडु सरकार',
    governmentLevel: 'tamil_nadu',
    stateOrUt: 'Tamil Nadu',
    category: 'education',
    isLoan: false,
    benefits: '₹1,000 per month throughout Undergraduate Degree, Diploma, or ITI education till completion.',
    benefitsTa: 'அரசுப் பள்ளியில் பயின்ற மாணவிகளுக்கு உயர்கல்வி முடியும் வரை மாதம் ₹1,000 வழங்கப்படுகிறது.',
    benefitsHi: 'सरकारी स्कूल से पढ़ी छात्राओं को उच्च शिक्षा (डिग्री, डिप्लोमा, आईटीआई) पूरी होने तक ₹1,000 प्रति माह।',
    targetGroup: ['student', 'dropout', 'rural'],
    eligibility: [
      'Female student who studied Classes 6 to 12 in Tamil Nadu Government schools.',
      'Currently enrolled in recognized UG Degree, Polytechnic Diploma, or ITI course in Tamil Nadu.'
    ],
    eligibilityTa: [
      'தமிழ்நாடு அரசுப் பள்ளிகளில் 6 முதல் 12-ஆம் வகுப்பு வரை தொடர்ந்து படித்த மாணவிகள்.',
      'அங்கீகரிக்கப்பட்ட பட்டப்படிப்பு, பாலிடெக்னிக் டிப்ளமோ அல்லது ஐடிஐயில் பயில வேண்டும்.'
    ],
    eligibilityHi: [
      'कक्षा 6 से 12 तक तमिलनाडु सरकारी स्कूल से पढ़ी छात्राएं।',
      'मान्यता प्राप्त स्नातक डिग्री, डिप्लोमा या आईटीआई में अध्ययनरत।'
    ],
    documentsRequired: [
      'School Study Certificate (Classes 6-12 Government School Proof)',
      'College Admission Fee Slip & Identity Card',
      'Aadhaar Card',
      'Student Bank Passbook in own single name'
    ],
    documentsRequiredTa: [
      '6 முதல் 12 வரை அரசுப் பள்ளியில் படித்ததற்கான சான்றிதழ்',
      'கல்லூரி சேர்க்கை ரசீது மற்றும் அடையாள அட்டை',
      'மாணவியின் ஆதார் அட்டை',
      'மாணவியின் பெயரிலுள்ள வங்கி கணக்கு புத்தகம்'
    ],
    documentsRequiredHi: [
      'स्कूल अध्ययन प्रमाण पत्र (कक्षा 6-12 सरकारी स्कूल)',
      'कॉलेज प्रवेश रसीद व पहचान पत्र',
      'आधार कार्ड',
      'छात्रा के नाम एकल बैंक खाता विवरण'
    ],
    applicationSteps: [
      'College administrative nodal officer verifies student school EMIS records.',
      'College uploads verified applications on the Pudhumai Penn web portal.',
      'Higher Education Department issues sanction order.',
      'Stipend credited directly to the student bank account every month.'
    ],
    applicationStepsTa: [
      'கல்லூரி நிர்வாகம் மாணவியின் பள்ளி EMIS தகவல்களை சரிபார்க்கும்.',
      'கல்லூரி போர்ட்டலில் விண்ணப்பத்தை சமர்ப்பிக்கும்.',
      'உயர்கல்வித்துறை ஒப்புதல் அளிக்கும்.',
      'மாதந்தோறும் மாணவியின் வங்கி கணக்கில் ₹1,000 நேரடியாக வரவு வைக்கப்படும்.'
    ],
    applicationStepsHi: [
      'कॉलेज प्रशासनिक अधिकारी स्कूल ईएमआईएस रिकॉर्ड का सत्यापन करता है।',
      'कॉलेज द्वारा पुदुमई पेन पोर्टल पर विवरण दर्ज।',
      'उच्च शिक्षा विभाग द्वारा स्वीकृति।',
      'प्रतिमाह सीधे छात्रा के बैंक खाते में छात्रवृत्ति।'
    ],
    officialUrl: 'https://pudhumaipenn.tn.gov.in',
    verificationDate: 'Verified Official Portal - January 2026',
    lastCheckedDate: '2026-01-20',
    officialSource: 'Higher Education Department, Govt of Tamil Nadu',
    officeOrServiceCenter: 'College Principal / Student Nodal Desk',
    officeOrServiceCenterTa: 'கல்லூரி முதல்வர் / மாணவர் உதவி மையம்',
    officeOrServiceCenterHi: 'कॉलेज प्राचार्य / छात्र सहायता डेस्क',
    helpline: '14417',
    badge: 'Higher Education Grant',
    badgeTa: 'உயர்கல்வி மானியம்',
    badgeHi: 'उच्च शिक्षा अनुदान'
  },
  {
    id: 'sathiyavani-muthu-sewing',
    title: 'Free Sewing Machine Scheme (Sathiyavani Muthu Ammaiyar)',
    titleTa: 'இலவச தையல் இயந்திரம் வழங்கும் திட்டம்',
    titleHi: 'मुफ्त सिलाई मशीन योजना (सत्यवाणी मुथु अम्मैयार)',
    department: 'Department of Social Welfare and Women Empowerment, TN',
    departmentTa: 'சமூக நலம் மற்றும் மகளிர் உரிமைத்துறை',
    departmentHi: 'समाज कल्याण एवं महिला सशक्तिकरण विभाग',
    governmentLevel: 'tamil_nadu',
    stateOrUt: 'Tamil Nadu',
    category: 'equipment',
    isLoan: false,
    benefits: 'Full commercial manual/foot-pedal sewing machine provided 100% free of cost with accessory toolkit.',
    benefitsTa: 'வீட்டில் இருந்தே தையல் தொழில் தொடங்க முழு தையல் இயந்திரம் 100% இலவசமாக வழங்கப்படுகிறது.',
    benefitsHi: 'घर से सिलाई व्यवसाय शुरू करने हेतु पूर्ण व्यावसायिक सिलाई मशीन 100% मुफ्त प्रदान की जाती है।',
    minAge: 20,
    maxAge: 40,
    targetGroup: ['homemaker', 'rural', 'dropout', 'entrepreneur'],
    freeEquipment: 'Manual/Foot-operated Sewing Machine with basic toolkit',
    freeEquipmentTa: 'கால் மிதி தையல் இயந்திரம் மற்றும் தையல் உபகரணங்கள்',
    freeEquipmentHi: 'पैडल सिलाई मशीन एवं बुनियादी टूलकिट',
    eligibility: [
      'Women aged between 20 to 40 years.',
      'Annual family income should not exceed ₹72,000.',
      'Special priority to Widows, Deserted Wives, Differently Abled women, and Destitute women.',
      'Basic tailoring certificate or training proof (minimum 6 months).'
    ],
    eligibilityTa: [
      '20 முதல் 40 வயதுக்குட்பட்ட பெண்கள்.',
      'குடும்ப ஆண்டு வருமானம் ₹72,000-க்கு மிகாமல் இருக்க வேண்டும்.',
      'விதவைகள், கணவனால் கைவிடப்பட்டோர், மாற்றுத்திறனாளிகளுக்கு முன்னுரிமை.',
      'தையல் பயிற்சி பெற்றதற்கான சான்றிதழ் அல்லது தையல் அறிவு பெற்றிருத்தல்.'
    ],
    eligibilityHi: [
      '20 से 40 वर्ष की आयु वाली महिलाएं।',
      'परिवार की वार्षिक आय ₹72,000 से अधिक न हो।',
      'विधवाओं, परित्यक्त व दिव्यांग महिलाओं को विशेष प्राथमिकता।',
      'सिलाई प्रशिक्षण प्रमाण पत्र (न्यूनतम 6 माह)।'
    ],
    documentsRequired: [
      'Age Proof (Birth Certificate or 10th TC)',
      'Income Certificate issued by Tahsildar (under ₹72,000/yr)',
      'Tailoring Course Completion Certificate',
      'Community Certificate',
      'Destitute / Widow Certificate (if applicable)',
      'Aadhaar Card & Passport size photos'
    ],
    documentsRequiredTa: [
      'வயது சான்றிதழ் (பிறப்பு சான்றிதழ் அல்லது TC)',
      'வட்டாட்சியர் (Tahsildar) வழங்கிய வருமானச் சான்றிதழ்',
      'தையல் பயிற்சி முடித்த சான்றிதழ்',
      'சாதிச் சான்றிதழ்',
      'விதவை / கைவிடப்பட்டோர் சான்றிதழ் (பொருந்துமானால்)',
      'ஆதார் அட்டை & புகைப்படங்கள்'
    ],
    documentsRequiredHi: [
      'आयु प्रमाण पत्र',
      'तहसीलदार द्वारा जारी आय प्रमाण पत्र',
      'सिलाई प्रशिक्षण प्रमाण पत्र',
      'जाति प्रमाण पत्र',
      'विधवा/परित्यक्ता प्रमाण पत्र (यदि लागू हो)',
      'आधार कार्ड एवं फोटो'
    ],
    applicationSteps: [
      'Obtain the physical application form from District Social Welfare Office (DSWO) or Block Development Office (BDO).',
      'Attach income and tailoring training certificates verified by local VAO.',
      'Submit the physical application at the Block Social Welfare Extension office.',
      'Upon field verification, machines are distributed during official district distribution programs.'
    ],
    applicationStepsTa: [
      'மாவட்ட சமூக நல அலுவலகம் அல்லது ஊராட்சி ஒன்றிய அலுவலகத்தில் (BDO) விண்ணப்ப படிவம் பெறவும்.',
      'கிராம நிர்வாக அலுவலர் (VAO) சரிபார்த்த சான்றிதழ்களை இணைக்கவும்.',
      'ஊராட்சி ஒன்றிய சமூக நல விரிவாக்க அலுவலரிடம் சமர்ப்பிக்கவும்.',
      'சரிபார்ப்புக்குப் பின் அரசு விழாவில் இலவச தையல் இயந்திரம் வழங்கப்படும்.'
    ],
    applicationStepsHi: [
      'जिला समाज कल्याण कार्यालय या बीडीओ (BDO) कार्यालय से आवेदन पत्र प्राप्त करें।',
      'स्थानीय राजस्व अधिकारी द्वारा सत्यापित दस्तावेज संलग्न करें।',
      'ब्लॉक विस्तार अधिकारी के पास आवेदन जमा करें।',
      'सत्यापन उपरांत आधिकारिक वितरण समारोह में मशीन प्रदान की जाती है।'
    ],
    verificationDate: 'Verified Official Guidelines - January 2026',
    lastCheckedDate: '2026-01-18',
    officialSource: 'Social Welfare Directorate, Tamil Nadu',
    officeOrServiceCenter: 'District Social Welfare Office (DSWO) / Block Development Office (BDO)',
    officeOrServiceCenterTa: 'மாவட்ட சமூக நல அலுவலகம் / ஊராட்சி ஒன்றிய அலுவலகம் (BDO)',
    officeOrServiceCenterHi: 'जिला समाज कल्याण कार्यालय / ब्लॉक विकास कार्यालय (BDO)',
    helpline: '181',
    badge: '100% Free Equipment',
    badgeTa: '100% இலவச உபகரணம்',
    badgeHi: '100% मुफ्त उपकरण'
  },
  {
    id: 'muthulakshmi-reddy-maternity',
    title: 'Dr. Muthulakshmi Reddy Maternity Benefit Scheme',
    titleTa: 'டாக்டர் முத்துலட்சுமி ரெட்டி மகப்பேறு நிதியுதவி திட்டம்',
    titleHi: 'डॉ. मुथुलक्ष्मी रेड्डी मातृत्व सहायता योजना',
    department: 'Health and Family Welfare Department, Government of Tamil Nadu',
    departmentTa: 'மக்கள் நல்வாழ்வு மற்றும் குடும்ப நலத்துறை, தமிழ்நாடு',
    departmentHi: 'स्वास्थ्य एवं परिवार कल्याण विभाग, तमिलनाडु',
    governmentLevel: 'tamil_nadu',
    stateOrUt: 'Tamil Nadu',
    category: 'financial_aid',
    isLoan: false,
    benefits: '₹18,000 financial assistance delivered in 5 installments plus 2 nutrition health kits (Amma Maternity Nutrition Kit).',
    benefitsTa: 'கர்ப்பிணி தாய்மார்களுக்கு 5 தவணைகளில் ₹18,000 நிதியுதவி மற்றும் 2 ஊட்டச்சத்து பெட்டகங்கள் வழங்கப்படுகிறது.',
    benefitsHi: 'गर्भवती माताओं को 5 किश्तों में ₹18,000 की वित्तीय सहायता एवं 2 पोषण किट।',
    minAge: 19,
    targetGroup: ['homemaker', 'rural'],
    eligibility: [
      'Pregnant women aged 19 years and above in Tamil Nadu.',
      'Applicable for first two deliveries.',
      'Must complete early antenatal registration (PICME number) before the 12th week of pregnancy.',
      'Must undergo institutional delivery in a government hospital or primary health center.'
    ],
    eligibilityTa: [
      '19 வயது மற்றும் அதற்கு மேற்பட்ட கர்ப்பிணிப் பெண்கள்.',
      'முதல் இரண்டு பிரசவங்களுக்கு மட்டும் பொருந்தும்.',
      'கர்ப்பமான 12 வாரங்களுக்குள் கிராம சுகாதார செவிலியரிடம் (VHN) PICME பதிவு செய்திருக்க வேண்டும்.',
      'அரசு ஆரம்ப சுகாதார நிலையம் அல்லது அரசு மருத்துவமனையில் பிரசவம் நடைபெற வேண்டும்.'
    ],
    eligibilityHi: [
      '19 वर्ष और उससे अधिक आयु की गर्भवती महिलाएं।',
      'प्रथम दो प्रसवों के लिए मान्य।',
      '12वें सप्ताह से पहले वीएचएन के पास PICME पंजीकरण अनिवार्य।',
      'सरकारी अस्पताल या प्राथमिक स्वास्थ्य केंद्र में संस्थागत प्रसव।'
    ],
    documentsRequired: [
      'PICME RCH ID Number',
      'Aadhaar Card',
      'Mother and Child Health Passbook',
      'Bank Account Passbook (linked with Aadhaar)'
    ],
    documentsRequiredTa: [
      'PICME பதிவு எண்',
      'ஆதார் அட்டை',
      'தாய்-சேய் நலக் கையேடு',
      'ஆதாருடன் இணைக்கப்பட்ட வங்கி கணக்கு புத்தகம்'
    ],
    documentsRequiredHi: [
      'PICME पंजीकरण संख्या',
      'आधार कार्ड',
      'मातृ एवं शिशु स्वास्थ्य पासबुक',
      'बैंक पासबुक'
    ],
    applicationSteps: [
      'Register pregnancy with the local Village Health Nurse (VHN) or at nearest Urban Primary Health Center.',
      'Obtain 12-digit PICME number.',
      'Receive installment 1 (₹4,000) upon early registration.',
      'Subsequent installments transferred directly at institutional delivery, child immunization milestones.'
    ],
    applicationStepsTa: [
      'கிராம சுகாதார செவிலியர் (VHN) அல்லது ஆரம்ப சுகாதார நிலையத்தில் கர்ப்பத்தை பதிவு செய்யவும்.',
      '12 இலக்க PICME எண்ணைப் பெறவும்.',
      'முன் பதிவு செய்தவுடன் முதல் தவணை ₹4,000 மற்றும் ஊட்டச்சத்து கிட் வழங்கப்படும்.',
      'அடுத்தடுத்த தவணைகள் பிரசவம் மற்றும் குழந்தை தடுப்பூசிகளின் போது நேரடியாக வரவு வைக்கப்படும்.'
    ],
    applicationStepsHi: [
      'ग्राम स्वास्थ्य नर्स (VHN) या प्राथमिक स्वास्थ्य केंद्र पर पंजीकरण कराएं।',
      '12 अंकों का PICME नंबर प्राप्त करें।',
      'पंजीकरण पर पहली किश्त (₹4,000) व पोषण किट।',
      'शेष किश्तें प्रसव व टीकाकरण के समय डीबीटी द्वारा।'
    ],
    officialUrl: 'https://picme.tn.gov.in',
    verificationDate: 'Verified Official Portal - January 2026',
    lastCheckedDate: '2026-01-19',
    officialSource: 'Directorate of Public Health & Preventive Medicine, Tamil Nadu',
    officeOrServiceCenter: 'Primary Health Centre (PHC) / Village Health Nurse (VHN)',
    officeOrServiceCenterTa: 'அரசு ஆரம்ப சுகாதார நிலையம் (PHC) / கிராம சுகாதார செவிலியர்',
    officeOrServiceCenterHi: 'प्राथमिक स्वास्थ्य केंद्र (PHC) / ग्राम स्वास्थ्य नर्स',
    helpline: '104 / 181',
    badge: 'Maternity Grant & Nutrition',
    badgeTa: 'மகப்பேறு நிதியுதவி & ஊட்டச்சத்து',
    badgeHi: 'मातृत्व सहायता एवं पोषण'
  },
  {
    id: 'tn-mahalir-thittam-shg',
    title: 'Tamil Nadu Mahalir Thittam (SHG Bank Linkage & Revolving Fund)',
    titleTa: 'தமிழ்நாடு மகளிர் திட்டம் (சுயஉதவிக் குழு கடன் & சுழல்நிதி)',
    titleHi: 'तमिलनाडु महिला योजना (एसएचजी बैंक लिंकेज व आवर्ती निधि)',
    department: 'Tamil Nadu Corporation for Development of Women (TNCDW)',
    departmentTa: 'தமிழ்நாடு மகளிர் மேம்பாட்டு நிறுவனம்',
    departmentHi: 'तमिलनाडु महिला विकास निगम (TNCDW)',
    governmentLevel: 'tamil_nadu',
    stateOrUt: 'Tamil Nadu',
    category: 'shg_loan',
    isLoan: true,
    benefits: 'Subsidized community group loans from ₹50,000 to ₹10 Lakhs with 4%-7% effective interest rate and credit linked capital subsidies.',
    benefitsTa: 'சுயஉதவிக் குழுக்களுக்கு 4% முதல் 7% குறைந்த வட்டியில் ₹50,000 முதல் ₹10 லட்சம் வரை சுழல்நிதி மற்றும் தொழிற்கடன்.',
    benefitsHi: 'स्वयं सहायता समूहों को 4% से 7% ब्याज पर ₹50,000 से ₹10 लाख तक आवर्ती निधि व समूह ऋण।',
    targetGroup: ['rural', 'homemaker', 'dropout', 'entrepreneur'],
    eligibility: [
      'Member of a recognized Self-Help Group (SHG) active for at least 6 months.',
      'Regular weekly savings and group meeting attendance.',
      'Good internal loan repayment track record.'
    ],
    eligibilityTa: [
      'குறைந்தது 6 மாதங்கள் செயல்படும் மகளிர் சுயஉதவிக் குழுவின் உறுப்பினராக இருத்தல்.',
      'வாராந்திர சேமிப்பு மற்றும் கூட்டங்களில் தவறாமல் பங்கேற்றல்.',
      'குழு உள்-கடன் திரும்ப செலுத்தும் ஒழுங்கு.'
    ],
    eligibilityHi: [
      'कम से कम 6 माह से सक्रिय स्वयं सहायता समूह की सदस्य।',
      'नियमित साप्ताहिक बचत व बैठक में उपस्थिति।',
      'आंतरिक ऋण अदायगी का अच्छा रिकॉर्ड।'
    ],
    documentsRequired: [
      'SHG Resolution copy',
      'SHG Grading Certificate by Block Mission Unit',
      'Group bank passbook & individual member Aadhaar cards'
    ],
    documentsRequiredTa: [
      'குழு தீர்மான நகல்',
      'வட்டார மேலாண்மை பிரிவு வழங்கிய கிரேடிங் சான்றிதழ்',
      'குழு வங்கி கணக்கு புத்தகம் & உறுப்பினர் ஆதார்'
    ],
    documentsRequiredHi: [
      'समूह प्रस्ताव की प्रति',
      'ब्लॉक मिशन इकाई द्वारा ग्रेडिंग प्रमाण पत्र',
      'समूह बैंक पासबुक एवं सदस्यों के आधार कार्ड'
    ],
    applicationSteps: [
      'Discuss enterprise need in the weekly SHG meeting and pass a group resolution.',
      'Submit resolution to the Village Poverty Reduction Committee (VPRC) or Panchayat Level Federation (PLF).',
      'Bank credit linkage officer sanctions the loan to the group account for member distribution.'
    ],
    applicationStepsTa: [
      'வாராந்திர குழு கூட்டத்தில் தொழில் தேவை குறித்து பேசி தீர்மானம் நிறைவேற்றவும்.',
      'ஊராட்சி அளவிலான கூட்டமைப்பிடம் (PLF) சமர்ப்பிக்கவும்.',
      'வங்கி மேலாளர் குழுவின் கணக்கிற்கு கடனை விடுவிப்பார்.'
    ],
    applicationStepsHi: [
      'साप्ताहिक समूह बैठक में आवश्यकता पर चर्चा कर प्रस्ताव पारित करें।',
      'पंचायत स्तरीय संघ (PLF) में प्रस्ताव प्रस्तुत करें।',
      'बैंक क्रेडिट लिंकेज अधिकारी द्वारा समूह खाते में ऋण स्वीकृत।'
    ],
    officialUrl: 'https://www.mathi.tn.gov.in',
    verificationDate: 'Verified Official Portal - January 2026',
    lastCheckedDate: '2026-01-22',
    officialSource: 'TNCDW, Rural Development & Panchayat Raj, Govt of Tamil Nadu',
    officeOrServiceCenter: 'Panchayat Level Federation (PLF) / Block Mission Management Unit',
    officeOrServiceCenterTa: 'ஊராட்சி கூட்டமைப்பு (PLF) / வட்டார திட்ட அலுவலகம்',
    officeOrServiceCenterHi: 'पंचायत स्तरीय संघ (PLF) / ब्लॉक मिशन प्रबंधन इकाई',
    helpline: '044-28173412',
    badge: 'Subsidized Group Loan',
    badgeTa: 'சுயஉதவிக்குழு கடன் (திருப்பிச் செலுத்த வேண்டியவை)',
    badgeHi: 'एसएचजी ऋण (लौटाने योग्य)'
  },

  // ==========================================
  // PUDUCHERRY UT GOVERNMENT SCHEMES
  // ==========================================
  {
    id: 'puducherry-magalir-urimai',
    title: 'Puducherry Women Financial Assistance Scheme (Magalir Urimai Thogai)',
    titleTa: 'புதுச்சேரி மகளிர் உரிமைத் தொகை திட்டம் (மாதம் ₹1,000)',
    titleHi: 'पुदुचेरी महिला वित्तीय सहायता योजना (मासिक ₹1,000)',
    department: 'Department of Women and Child Development, Government of Puducherry',
    departmentTa: 'பெண்கள் மற்றும் குழந்தைகள் மேம்பாட்டுத் துறை, புதுச்சேரி அரசு',
    departmentHi: 'महिला एवं बाल विकास विभाग, पुदुचेरी सरकार',
    governmentLevel: 'puducherry',
    stateOrUt: 'Puducherry',
    category: 'financial_aid',
    isLoan: false,
    benefits: 'Direct financial assistance of ₹1,000 per month credited to female heads of family in UT of Puducherry.',
    benefitsTa: 'புதுச்சேரி யூனியன் பிரதேசத்தில் உள்ள குடும்பத் தலைவிகளுக்கு மாதம் தோறும் ₹1,000 நேரடி வங்கி வரவு.',
    benefitsHi: 'पुदुचेरी केंद्र शासित प्रदेश में बीपीएल परिवार की महिला मुखिया को प्रतिमाह ₹1,000 प्रत्यक्ष वित्तीय सहायता।',
    minAge: 21,
    maxAge: 55,
    targetGroup: ['homemaker', 'rural', 'dropout'],
    eligibility: [
      'Woman aged between 21 and 55 years.',
      'Must be a native or continuous resident of Puducherry for at least 5 years.',
      'Must be acknowledged as woman head of family holding a valid Puducherry Red / Yellow Ration Card.',
      'Not currently receiving any other government pension (Widow, Old Age Pension, or government employment).'
    ],
    eligibilityTa: [
      '21 முதல் 55 வயதுக்குட்பட்ட பெண் குடும்பத் தலைவி.',
      'புதுச்சேரியில் குறைந்தது 5 ஆண்டுகள் வசிப்பவராக இருக்க வேண்டும்.',
      'சிவப்பு அல்லது மஞ்சள் ரேஷன் கார்டு பெற்றிருக்க வேண்டும்.',
      'அரசு ஊதியம் அல்லது வேறு முதியோர்/விதவை ஓய்வூதியம் பெறுபவராக இருக்கக்கூடாது.'
    ],
    eligibilityHi: [
      '21 से 55 वर्ष की महिला परिवार प्रमुख।',
      'पुदुचेरी की मूल या कम से कम 5 वर्ष की निवासी।',
      'लाल या पीला राशन कार्ड धारक।',
      'अन्य कोई सरकारी पेंशन या सरकारी सेवा में न हो।'
    ],
    documentsRequired: [
      'Puducherry Red/Yellow Ration Card',
      'Aadhaar Card',
      'Residence Certificate (5 years proof)',
      'Bank Passbook (single holder bank account)',
      'Self-declaration of not receiving other pensions'
    ],
    documentsRequiredTa: [
      'புதுச்சேரி சிவப்பு/மஞ்சள் ரேஷன் கார்டு',
      'ஆதார் அட்டை',
      'குடியிருப்பு சான்றிதழ் (5 ஆண்டுகள்)',
      'வங்கி கணக்கு புத்தகம்',
      'வேறு ஓய்வூதியம் பெறவில்லை என்பதற்கான சுய உறுதிமொழி'
    ],
    documentsRequiredHi: [
      'पुदुचेरी लाल/पीला राशन कार्ड',
      'आधार कार्ड',
      'निवास प्रमाण पत्र',
      'बैंक पासबुक',
      'अन्य पेंशन न लेने का स्व-घोषणा पत्र'
    ],
    applicationSteps: [
      'Collect the application form from the Directorate of Women & Child Development or local Anganwadi worker.',
      'Attach copy of Ration card and residential certificate attested by Revenue Inspector.',
      'Submit the application to the Anganwadi worker or Child Development Project Officer (CDPO).',
      'Direct monthly DBT transfer initiated after scrutiny.'
    ],
    applicationStepsTa: [
      'மகளிர் மற்றும் குழந்தைகள் மேம்பாட்டு துறை அல்லது உள்ளூர் அங்கன்வாடி பணியாளரிடம் விண்ணப்பம் பெறவும்.',
      'ரேஷன் கார்டு மற்றும் குடியிருப்பு சான்றிதழை இணைத்து சமர்ப்பிக்கவும்.',
      'அங்கன்வாடி பணியாளர் அல்லது CDPO அலுவலகத்தில் கொடுக்கவும்.',
      'சரிபார்ப்புக்குப் பின் வங்கி கணக்கில் மாதம் ₹1,000 வரும்.'
    ],
    applicationStepsHi: [
      'महिला एवं बाल विकास निदेशालय या आंगनवाड़ी कार्यकर्ता से आवेदन पत्र लें।',
      'राशन कार्ड व निवास प्रमाण पत्र संलग्न करें।',
      'सीडीपीओ (CDPO) या आंगनवाड़ी केंद्र में जमा करें।',
      'सत्यापन उपरांत सीधे खाते में मासिक राशि।'
    ],
    officialUrl: 'https://wcd.py.gov.in',
    verificationDate: 'Verified Official Gazette - January 2026',
    lastCheckedDate: '2026-01-20',
    officialSource: 'Directorate of Women & Child Development, Govt of Puducherry',
    officeOrServiceCenter: 'Directorate of Women & Child Development / Local Anganwadi Center',
    officeOrServiceCenterTa: 'மகளிர் குழந்தைகள் மேம்பாட்டு இயக்குநரகம் / அங்கன்வாடி மையம்',
    officeOrServiceCenterHi: 'महिला एवं बाल विकास निदेशालय / स्थानीय आंगनवाड़ी केंद्र',
    helpline: '0413-2242621 / 181',
    badge: 'UT Financial Grant',
    badgeTa: 'யூனியன் பிரதேச மானியம்',
    badgeHi: 'यूटी वित्तीय सहायता'
  },
  {
    id: 'puducherry-kamarajar-education',
    title: 'Perunthalaivar Kamarajar Financial Assistance Scheme for Higher Education',
    titleTa: 'பெருந்தலைவர் காமராஜர் உயர்கல்வி நிதியுதவி திட்டம் (புதுச்சேரி)',
    titleHi: 'पेरुंथलइवर कामराज उच्च शिक्षा वित्तीय सहायता योजना (पुदुचेरी)',
    department: 'Directorate of Higher & Technical Education (DHTE), Puducherry',
    departmentTa: 'உயர் மற்றும் தொழில்நுட்பக் கல்வி இயக்குநரகம், புதுச்சேரி',
    departmentHi: 'उच्च एवं तकनीकी शिक्षा निदेशालय, पुदुचेरी',
    governmentLevel: 'puducherry',
    stateOrUt: 'Puducherry',
    category: 'education',
    isLoan: false,
    benefits: 'Full tuition fee reimbursement for meritorious Puducherry students admitted through CENTAC to professional degree courses (Engineering, Medical, Nursing, Agriculture).',
    benefitsTa: 'CENTAC மூலம் பொறியியல், மருத்துவம், செவிலியர், வேளாண்மை படிப்புகளில் சேரும் மாணவிகளுக்கு முழுக் கல்விக் கட்டணத்தைத் அரசே செலுத்துகிறது.',
    benefitsHi: 'CENTAC के माध्यम से इंजीनियरिंग, मेडिकल, नर्सिंग में प्रवेश लेने वाली पुदुचेरी की छात्राओं को संपूर्ण शिक्षण शुल्क प्रतिपूर्ति।',
    targetGroup: ['student', 'rural'],
    eligibility: [
      'Resident of Union Territory of Puducherry by birth or continuous residence for 5 years.',
      'Must have passed Higher Secondary (+2) examination.',
      'Must have secured admission through CENTAC government quota counseling.'
    ],
    eligibilityTa: [
      'புதுச்சேரி யூனியன் பிரதேசத்தில் பிறந்த அல்லது 5 ஆண்டுகள் வசிக்கும் மாணவி.',
      '+2 பொதுத்தேர்வில் தேர்ச்சி பெற்றிருக்க வேண்டும்.',
      'CENTAC அரசு ஒதுக்கீட்டு கலந்தாய்வு மூலம் கல்லூரியில் சேர்ந்திருக்க வேண்டும்.'
    ],
    eligibilityHi: [
      'पुदुचेरी की 5 वर्ष से निरंतर निवासी छात्रा।',
      '12वीं परीक्षा उत्तीर्ण।',
      'CENTAC सरकारी कोटा काउंसलिंग से प्रवेश प्राप्त।'
    ],
    documentsRequired: [
      'CENTAC Allotment Order',
      'College Admission & Fee receipt',
      'Puducherry Residence / Nativity Certificate',
      '+2 Marksheet & Transfer Certificate',
      'Aadhaar Card & Bank account details'
    ],
    documentsRequiredTa: [
      'CENTAC இடஒதுக்கீடு ஆணை (Allotment Order)',
      'கல்லூரி சேர்க்கை மற்றும் கட்டண ரசீது',
      'புதுச்சேரி குடியிருப்பு சான்றிதழ்',
      '+2 மதிப்பெண் சான்றிதழ் & TC',
      'ஆதார் அட்டை & வங்கி பாஸ்புக்'
    ],
    documentsRequiredHi: [
      'CENTAC आवंटन आदेश',
      'कॉलेज प्रवेश एवं शुल्क रसीद',
      'निवास प्रमाण पत्र',
      '12वीं अंकतालिका',
      'आधार कार्ड व बैंक खाता'
    ],
    applicationSteps: [
      'Apply online via the DHTE Puducherry official Kamarajar scheme portal after CENTAC admission.',
      'Head of the educational institution verifies and forwards the application.',
      'DHTE sanctions the tuition fees and disburses the amount directly to the college/student account.'
    ],
    applicationStepsTa: [
      'CENTAC சேர்க்கைக்குப் பின் DHTE இணையதளத்தில் ஆன்லைனில் விண்ணப்பிக்கவும்.',
      'கல்லூரி முதல்வர் சான்றிதழ்களை சரிபார்த்து அனுப்புவார்.',
      'கல்வித்துறை கட்டணத்தை நேரடியாக விடுவிக்கும்.'
    ],
    applicationStepsHi: [
      'CENTAC प्रवेश उपरांत DHTE पोर्टल पर ऑनलाइन आवेदन करें।',
      'कॉलेज प्राचार्य द्वारा सत्यापन।',
      'विभाग द्वारा शिक्षण शुल्क की सीधी प्रतिपूर्ति।'
    ],
    officialUrl: 'https://dhte.py.gov.in',
    verificationDate: 'Verified Official Portal - January 2026',
    lastCheckedDate: '2026-01-21',
    officialSource: 'Directorate of Higher & Technical Education, Govt of Puducherry',
    officeOrServiceCenter: 'CENTAC Puducherry / Directorate of Higher Education, Lawspet',
    officeOrServiceCenterTa: 'சென்டாக் (CENTAC) / உயர்கல்வி இயக்குநரகம், லாஸ்பேட்டை',
    officeOrServiceCenterHi: 'CENTAC पुदुचेरी / उच्च शिक्षा निदेशालय, लॉस्पेट',
    helpline: '0413-2252277',
    badge: 'Higher Education Fee Waiver',
    badgeTa: 'முழு கல்விக் கட்டண விலக்கு',
    badgeHi: 'पूर्ण शिक्षण शुल्क प्रतिपूर्ति'
  },

  // ==========================================
  // CENTRAL GOVERNMENT SCHEMES
  // ==========================================
  {
    id: 'pm-mudra-shishu',
    title: 'Pradhan Mantri MUDRA Yojana (Shishu & Kishore Loans)',
    titleTa: 'பிரதம மந்திரி முத்ரா கடன் திட்டம் (சிசு & கிஷோர்)',
    titleHi: 'प्रधानमंत्री मुद्रा योजना (शिशु व किशोर ऋण)',
    department: 'Ministry of Finance, Government of India',
    departmentTa: 'நிதி அமைச்சகம், இந்திய அரசு',
    departmentHi: 'वित्त मंत्रालय, भारत सरकार',
    governmentLevel: 'central',
    category: 'shg_loan',
    isLoan: true,
    benefits: 'Collateral-free micro loans up to ₹50,000 (Shishu) and up to ₹5 Lakhs (Kishore) at low interest rates with zero processing fee for micro-women enterprises.',
    benefitsTa: 'எந்தவித அடமானமும் இல்லாமல் ₹50,000 (சிசு) முதல் ₹5 லட்சம் (கிஷோர்) வரை குறைந்த வட்டியில் தொழில் கடன்.',
    benefitsHi: 'बिना किसी गारंटी/बंधक के ₹50,000 (शिशु) से ₹5 लाख (किशोर) तक कम ब्याज पर व्यवसाय ऋण।',
    minAge: 18,
    targetGroup: ['entrepreneur', 'homemaker', 'rural'],
    eligibility: [
      'Any woman citizen aged 18+ wanting to start or expand a small micro-business.',
      'No collateral security or third-party guarantor required.',
      'Clean credit history (no existing bank default).'
    ],
    eligibilityTa: [
      'சிறிய தொழில் தொடங்க அல்லது விரிவாக்க விரும்பும் 18 வயது நிரம்பிய பெண்கள்.',
      'சொத்து அல்லது நிலம் அடமானம் வைக்கத் தேவையில்லை.',
      'வங்கியில் முந்தைய கடன் பாக்கி இல்லாதிருக்க வேண்டும்.'
    ],
    eligibilityHi: [
      '18 वर्ष से अधिक आयु की महिला जो छोटा व्यवसाय शुरू या बढ़ाना चाहती है।',
      'कोई संपत्ति या गारंटी बंधक रखने की जरूरत नहीं।',
      'बैंक में कोई पुराना डिफ़ॉल्ट न हो।'
    ],
    documentsRequired: [
      'Identity Proof (Aadhaar / Voter ID)',
      'Address Proof (Ration card / Electricity bill)',
      'Quotation of machinery/items to be purchased',
      'Bank Account Statement (last 6 months)',
      'Business Plan outline / proposal'
    ],
    documentsRequiredTa: [
      'அடையாள அட்டை (ஆதார் / வாக்காளர் அட்டை)',
      'முகவரி சான்று (ரேஷன் கார்டு / மின் கட்டண ரசீது)',
      'வாங்கவிருக்கும் இயந்திரங்கள் / மூலப்பொருட்களின் விலைப்பட்டியல்',
      'கடந்த 6 மாத வங்கி கணக்கு புத்தகம்',
      'சுருக்கமான தொழில் திட்டம்'
    ],
    documentsRequiredHi: [
      'पहचान पत्र (आधार / वोटर आईडी)',
      'पता प्रमाण (राशन कार्ड / बिजली बिल)',
      'खरीदे जाने वाले सामान/मशीन का कोटेशन',
      'पिछले 6 महीने का बैंक स्टेटमेंट',
      'संक्षिप्त व्यापार प्रस्ताव'
    ],
    applicationSteps: [
      'Visit any nationalized bank, regional rural bank (RRB), or cooperative bank branch.',
      'Request the MUDRA Shishu loan form (priority is given to women entrepreneurs under Mudra Mahila).',
      'Submit the simple 1-page application with machinery/stock quotation.',
      'Loan is sanctioned without any processing fees for Shishu category.'
    ],
    applicationStepsTa: [
      'அருகில் உள்ள தேசியமயமாக்கப்பட்ட வங்கி அல்லது கிராம வங்கியை அணுகவும்.',
      'முத்ரா சிசு கடன் படிவத்தை பூர்த்தி செய்து கொடுக்கவும்.',
      'வாங்கவிருக்கும் பொருட்கள் விலைப்பட்டியலுடன் இணைக்கவும்.',
      'சிசு கடனுக்கு எந்தவித செயலாக்க கட்டணமும் (Processing fee) இன்றி கடன் அனுமதிக்கப்படும்.'
    ],
    applicationStepsHi: [
      'किसी भी राष्ट्रीयकृत बैंक, ग्रामीण बैंक या सहकारी बैंक जाएं।',
      'मुद्रा शिशु ऋण फॉर्म भरें।',
      'खरीदी जाने वाली सामग्री का बिल कोटेशन संलग्न करें।',
      'शिशु श्रेणी में बिना किसी प्रोसेसिंग शुल्क के ऋण स्वीकृत होता है।'
    ],
    officialUrl: 'https://www.mudra.org.in',
    verificationDate: 'Verified Official Portal - January 2026',
    lastCheckedDate: '2026-01-22',
    officialSource: 'MUDRA / Department of Financial Services, Govt of India',
    officeOrServiceCenter: 'Any Public Sector / Commercial Bank Branch / Lead District Bank Office',
    officeOrServiceCenterTa: 'அனைத்து அரசு வங்கிக் கிளைகள் / மாவட்ட முன்னணி வங்கி',
    officeOrServiceCenterHi: 'सार्वजनिक क्षेत्र का कोई भी बैंक / अग्रणी जिला बैंक',
    helpline: '1800 180 1111',
    badge: 'Subsidized Micro Loan',
    badgeTa: 'குறைந்த வட்டி கடன் (திருப்பிச் செலுத்த வேண்டியவை)',
    badgeHi: 'रियायती ऋण (लौटाने योग्य)'
  },
  {
    id: 'pm-vishwakarma',
    title: 'PM Vishwakarma Scheme (Tailors, Artisans & Craftswomen)',
    titleTa: 'பிரதம மந்திரி விஸ்வகர்மா திட்டம் (தையல் & கைவினைஞர்கள்)',
    titleHi: 'पीएम विश्वकर्मा योजना (दर्जी, हस्तशिल्प व कारीगर)',
    department: 'Ministry of Micro, Small and Medium Enterprises (MSME), Govt of India',
    departmentTa: 'சிறு, குறு மற்றும் நடுத்தர தொழில் அமைச்சகம் (MSME)',
    departmentHi: 'सूक्ष्म, लघु एवं मध्यम उद्यम मंत्रालय (MSME), भारत सरकार',
    governmentLevel: 'central',
    category: 'equipment',
    isLoan: false,
    benefits: '₹15,000 modern toolkit e-voucher grant + 5-7 days free skill training with ₹500/day daily stipend + up to ₹3 Lakh collateral-free loan at 5% interest.',
    benefitsTa: '₹15,000 இலவச உபகரண மானியம் + நாள் ஒன்றுக்கு ₹500 ஊக்கத்தொகையுடன் தொழிற்பயிற்சி + 5% குறைந்த வட்டியில் ₹3 லட்சம் தொழில் கடன்.',
    benefitsHi: '₹15,000 का मुफ्त टूलकिट ई-वाउचर + प्रतिदिन ₹500 भत्ते के साथ कौशल प्रशिक्षण + 5% ब्याज पर ₹3 लाख तक आसान ऋण।',
    minAge: 18,
    targetGroup: ['entrepreneur', 'rural', 'homemaker', 'dropout'],
    freeEquipment: 'Modern sewing/tailoring toolkit or handicraft equipment voucher worth ₹15,000',
    freeEquipmentTa: '₹15,000 மதிப்பிலான நவீன தையல் அல்லது கைவினை உபகரண வவுச்சர்',
    freeEquipmentHi: '₹15,000 मूल्य का आधुनिक सिलाई या शिल्प टूलकिट ई-वाउचर',
    eligibility: [
      'Artisan or craftsperson working with hands and tools in one of 18 traditional trades (Tailor / Darzi, Basket Maker, Broom Maker, Potter, etc.).',
      'Minimum age of 18 years on date of registration.',
      'Only one member from a family can avail the benefits.'
    ],
    eligibilityTa: [
      'தையல் (Darzi), கூடை முடைதல், கைவினைப்பொருட்கள் போன்ற 18 பாரம்பரிய கைத்தொழில்களில் ஈடுபட்டுள்ள பெண்கள்.',
      'குறைந்தபட்ச வயது 18.',
      'ஒரு குடும்பத்தில் ஒருவருக்கு மட்டுமே பொருந்தும்.'
    ],
    eligibilityHi: [
      'दर्जी (Tailor), टोकरी बुनकर, मिट्टी के बर्तन आदि 18 पारंपरिक शिल्पों में कार्यरत महिला।',
      'न्यूनतम आयु 18 वर्ष।',
      'एक परिवार से एक ही सदस्य पात्र।'
    ],
    documentsRequired: [
      'Aadhaar Card (Aadhaar linked mobile number required)',
      'Bank Account Passbook',
      'Ration Card / Family Proof',
      'Skill trade declaration'
    ],
    documentsRequiredTa: [
      'ஆதார் அட்டை (மொபைல் எண் இணைக்கப்பட்டது)',
      'வங்கி கணக்கு புத்தகம்',
      'ரேஷன் கார்டு',
      'தொழில் சார்ந்த சுயவிவரம்'
    ],
    documentsRequiredHi: [
      'आधार कार्ड (मोबाइल लिंक)',
      'बैंक पासबुक',
      'राशन कार्ड',
      'पारंपरिक शिल्प घोषणा'
    ],
    applicationSteps: [
      'Visit nearest Common Services Centre (CSC) or e-Sevai center for biometric registration.',
      'Gram Panchayat / Urban Local Body conducts stage-1 verification.',
      'District Implementation Committee completes stage-2 verification.',
      'Receive Vishwakarma Certificate, ID Card, ₹15,000 toolkit voucher and training schedule.'
    ],
    applicationStepsTa: [
      'அருகில் உள்ள CSC அல்லது இ-சேவை மையத்திற்குச் சென்று பயோமெட்ரிக் பதிவு செய்யவும்.',
      'கிராம பஞ்சாயத்து தலைவர் / நகராட்சி சரிபார்க்கும்.',
      'மாவட்ட குழுவின் ஒப்புதலுக்குப் பின் விஸ்வகர்மா அடையாள அட்டை மற்றும் ₹15,000 உபகரண வவுச்சர் வழங்கப்படும்.'
    ],
    applicationStepsHi: [
      'नजदीकी सीएससी (CSC) या ई-सेवा केंद्र पर जाकर बायोमेट्रिक पंजीकरण करें।',
      'ग्राम पंचायत या नगर निकाय द्वारा प्रथम चरण सत्यापन।',
      'जिला समिति द्वारा अनुमोदन के बाद प्रमाणपत्र, आईडी कार्ड और ₹15,000 टूलकिट वाउचर जारी।'
    ],
    officialUrl: 'https://pmvishwakarma.gov.in',
    verificationDate: 'Verified Official Portal - January 2026',
    lastCheckedDate: '2026-01-20',
    officialSource: 'Ministry of MSME, Government of India',
    officeOrServiceCenter: 'Common Service Centre (CSC) / District Industries Centre (DIC)',
    officeOrServiceCenterTa: 'CSC பொது சேவை மையம் / மாவட்ட தொழில் மையம் (DIC)',
    officeOrServiceCenterHi: 'कॉमन सर्विस सेंटर (CSC) / जिला उद्योग केंद्र (DIC)',
    helpline: '1800 267 7777',
    badge: 'Toolkit Grant + 5% Loan',
    badgeTa: 'இலவச உபகரணம் & தொழிற்கடன்',
    badgeHi: 'मुफ्त टूलकिट अनुदान व ऋण'
  },
  {
    id: 'lakhpati-didi',
    title: 'Lakhpati Didi Mission',
    titleTa: 'இலட்சாதிபதி சகோதரி திட்டம் (Lakhpati Didi)',
    titleHi: 'लखपति दीदी मिशन',
    department: 'Ministry of Rural Development & Deendayal Antyodaya Yojana - NRLM',
    departmentTa: 'ஊரக வளர்ச்சி அமைச்சகம் (NRLM)',
    departmentHi: 'ग्रामीण विकास मंत्रालय एवं राष्ट्रीय ग्रामीण आजीविका मिशन',
    governmentLevel: 'central',
    category: 'livelihood',
    isLoan: false,
    benefits: 'Specialized enterprise training, market linkages, toolkit funding, and mentorship to enable rural SHG women to earn a sustainable minimum income of ₹1,00,000 per year.',
    benefitsTa: 'கிராமப்புற பெண்கள் ஆண்டுக்கு குறைந்தது ₹1,00,000 வருமானம் ஈட்ட சிறப்பு தொழிற்பயிற்சி மற்றும் சந்தை வாய்ப்புகள்.',
    benefitsHi: 'ग्रामीण महिलाओं को प्रति वर्ष कम से कम ₹1,00,000 कमाने योग्य बनाने के लिए विशेष प्रशिक्षण, टूलकिट व बाजार संपर्क।',
    targetGroup: ['rural', 'homemaker', 'entrepreneur'],
    eligibility: [
      'Rural SHG woman member motivated to start or scale sustainable micro-enterprises (agriculture, poultry, dairy, tailoring, food processing, eco-products).'
    ],
    eligibilityTa: [
      'விவசாயம், கோழிப்பண்ணை, பால்பண்ணை, தையல், உணவுப் பொருட்கள் போன்ற சிறுதொழில் செய்ய விரும்பும் கிராமப்புற SHG பெண்.'
    ],
    eligibilityHi: [
      'कृषि, मुर्गीपालन, डेयरी, सिलाई, खाद्य प्रसंस्करण जैसे सूक्ष्म उद्यम शुरू करने की इच्छुक ग्रामीण एसएचजी महिला।'
    ],
    documentsRequired: [
      'Aadhaar Card',
      'SHG Member ID / Passbook',
      'Local Village Poverty Reduction Committee (VPRC) Recommendation'
    ],
    documentsRequiredTa: [
      'ஆதார் அட்டை',
      'சுயஉதவிக் குழு உறுப்பினர் எண் / பாஸ்புக்',
      'ஊராட்சி அளவிலான கூட்டமைப்பு பரிந்துரை'
    ],
    documentsRequiredHi: [
      'आधार कार्ड',
      'एसएचजी सदस्य पासबुक',
      'ग्राम गरीबी उन्मूलन समिति (VPRC) अनुशंसा'
    ],
    applicationSteps: [
      'Contact your Village Livelihood Animator (VLA) or Community Resource Person (CRP).',
      'Enroll in the Lakhpati Didi baseline business aspiration survey.',
      'Undergo residential/community training and receive business enterprise startup grants through the Gram Panchayat.'
    ],
    applicationStepsTa: [
      'உங்கள் கிராம வாழ்வாதார உதவியாளர் (VLA) அல்லது CRP-ஐ தொடர்பு கொள்ளவும்.',
      'இலட்சாதிபதி சகோதரி கணக்கெடுப்பில் உங்கள் பெயரை பதிவு செய்யவும்.',
      'தொழிற்பயிற்சி மற்றும் உபகரண மானியங்களை பெற்றுக் கொள்ளவும்.'
    ],
    applicationStepsHi: [
      'अपने ग्राम आजीविका मित्र या सीआरपी से संपर्क करें।',
      'लखपति दीदी सर्वेक्षण में अपना नाम दर्ज कराएं।',
      'कौशल प्रशिक्षण एवं टूलकिट सहायता प्राप्त करें।'
    ],
    officialUrl: 'https://nrlm.gov.in',
    verificationDate: 'Verified Official Mission Guidelines - January 2026',
    lastCheckedDate: '2026-01-20',
    officialSource: 'Ministry of Rural Development, Govt of India',
    officeOrServiceCenter: 'Gram Panchayat Office / Block NRLM Office',
    officeOrServiceCenterTa: 'கிராம ஊராட்சி அலுவலகம் / வட்டார NRLM அலுவலகம்',
    officeOrServiceCenterHi: 'ग्राम पंचायत कार्यालय / ब्लॉक एनआरएलएम कार्यालय',
    helpline: '1800 110 001',
    badge: 'Livelihood Scale-Up Mission',
    badgeTa: 'வருமான பெருக்க இயக்கம்',
    badgeHi: 'आजीविका संवर्धन मिशन'
  },
  {
    id: 'stand-up-india',
    title: 'Stand-Up India Scheme for Women Entrepreneurs',
    titleTa: 'ஸ்டாண்ட்-அப் இந்தியா திட்டம் (பெண்கள் தொழில்முனைவோர்)',
    titleHi: 'स्टैंड-अप इंडिया योजना (महिला उद्यमी ऋण)',
    department: 'Department of Financial Services / SIDBI, Govt of India',
    departmentTa: 'நிதிச் சேவைகள் துறை / SIDBI',
    departmentHi: 'वित्तीय सेवाएं विभाग / सिडबी, भारत सरकार',
    governmentLevel: 'central',
    category: 'shg_loan',
    isLoan: true,
    benefits: 'Bank loans between ₹10 Lakhs and ₹1 Crore to at least one woman borrower per bank branch for setting up greenfield enterprises in manufacturing, services, or trading.',
    benefitsTa: 'உற்பத்தி, வர்த்தகம் அல்லது சேவைத் துறையில் புதிய தொழில் தொடங்க ₹10 லட்சம் முதல் ₹1 கோடி வரை வங்கிக் கடன்.',
    benefitsHi: 'विनिर्माण, व्यापार या सेवा क्षेत्र में नया व्यवसाय शुरू करने हेतु ₹10 लाख से ₹1 करोड़ तक बैंक ऋण।',
    minAge: 18,
    targetGroup: ['entrepreneur'],
    eligibility: [
      'Women entrepreneurs aged 18 years and above.',
      'Loans under the scheme are available only for greenfield (new) enterprise projects.',
      'In case of non-individual enterprises, 51% shareholding must be held by the woman entrepreneur.'
    ],
    eligibilityTa: [
      '18 வயதுக்கு மேற்பட்ட பெண் தொழில்முனைவோர்.',
      'புதிய தொழில் தொடங்க மட்டுமே (Greenfield) பொருந்தும்.',
      'கூட்டு நிறுவனமாக இருந்தால் 51% பங்கு பெண்ணின் பெயரில் இருக்க வேண்டும்.'
    ],
    eligibilityHi: [
      '18 वर्ष या उससे अधिक आयु की महिला उद्यमी।',
      'केवल नए (ग्रीनफील्ड) प्रोजेक्ट के लिए मान्य।',
      'संयुक्त उपक्रम में 51% हिस्सेदारी महिला के पास अनिवार्य।'
    ],
    documentsRequired: [
      'Aadhaar / Passport / Voter ID',
      'Proof of Residence & Business Address',
      'Project Report with projected cash flows & CMA data',
      'Pollution Clearance / Trade License (if applicable)',
      'Bank Account Statements & IT Returns'
    ],
    documentsRequiredTa: [
      'ஆதார் / பாஸ்போர்ட் / வாக்காளர் அட்டை',
      'முகவரி சான்று & தொழில் நடக்கும் இடத்தின் ஆவணம்',
      'தொழில் திட்ட அறிக்கை (Detailed Project Report)',
      'கடந்த 3 ஆண்டு வருமான வரி கணக்கு (பொருந்துமானால்)'
    ],
    documentsRequiredHi: [
      'आधार / वोटर आईडी / पैन कार्ड',
      'निवास व व्यावसायिक पते का प्रमाण',
      'विस्तृत प्रोजेक्ट रिपोर्ट',
      'बैंक स्टेटमेंट एवं आईटीआर'
    ],
    applicationSteps: [
      'Register on the official Stand-Up Mitra portal (standupmitra.in).',
      'Choose handholding support from lead agencies if needed.',
      'Submit online application with project report to your selected commercial bank branch.',
      'Bank conducts appraisal and sanctions term loan with working capital facility.'
    ],
    applicationStepsTa: [
      'standupmitra.in இணையதளத்தில் பதிவு செய்யவும்.',
      'தொழில் திட்ட அறிக்கையுடன் வங்கி கிளையைத் தேர்வு செய்து விண்ணப்பிக்கவும்.',
      'வங்கி மேலாளர் ஆய்வுக்குப் பின் கடன் அனுமதியளிப்பார்.'
    ],
    applicationStepsHi: [
      'standupmitra.in पोर्टल पर पंजीकरण करें।',
      'प्रोजेक्ट रिपोर्ट के साथ पसंदीदा बैंक शाखा चुनें।',
      'बैंक मूल्यांकन उपरांत सावधि ऋण व कार्यशील पूंजी स्वीकृत करता है।'
    ],
    officialUrl: 'https://www.standupmitra.in',
    verificationDate: 'Verified Official Portal - January 2026',
    lastCheckedDate: '2026-01-20',
    officialSource: 'SIDBI & Department of Financial Services, Govt of India',
    officeOrServiceCenter: 'Scheduled Commercial Bank Branches / SIDBI Branch Offices',
    officeOrServiceCenterTa: 'வணிக வங்கிக் கிளைகள் / சிட்பி (SIDBI) கிளை அலுவலகம்',
    officeOrServiceCenterHi: 'अनुसूचित वाणिज्यिक बैंक शाखाएं / सिडबी शाखा',
    helpline: '1800 180 1111',
    badge: 'Large Scale Business Loan',
    badgeTa: 'பெரிய தொழில் கடன் (திருப்பிச் செலுத்த வேண்டியவை)',
    badgeHi: 'बड़ा व्यवसाय ऋण (लौटाने योग्य)'
  },

  // ==========================================
  // OTHER STATE GOVERNMENTS
  // ==========================================
  {
    id: 'karnataka-gruha-lakshmi',
    title: 'Gruha Lakshmi Scheme (Karnataka)',
    titleTa: 'கிருக லட்சுமி திட்டம் (கர்நாடகா)',
    titleHi: 'गृह लक्ष्मी योजना (कर्नाटक)',
    department: 'Department of Women and Child Development, Government of Karnataka',
    departmentTa: 'பெண்கள் மற்றும் குழந்தைகள் மேம்பாட்டுத் துறை, கர்நாடகா',
    departmentHi: 'महिला एवं बाल विकास विभाग, कर्नाटक सरकार',
    governmentLevel: 'other_states',
    stateOrUt: 'Karnataka',
    category: 'financial_aid',
    isLoan: false,
    benefits: '₹2,000 monthly direct cash benefit to women family heads in Karnataka.',
    benefitsTa: 'கர்நாடகாவில் குடும்பத் தலைவிகளுக்கு மாதம் தோறும் ₹2,000 நேரடி வங்கி வரவு.',
    benefitsHi: 'कर्नाटक में महिला परिवार प्रमुखों को प्रतिमाह ₹2,000 प्रत्यक्ष वित्तीय सहायता।',
    minAge: 18,
    targetGroup: ['homemaker', 'rural'],
    eligibility: [
      'Resident woman head of family registered in Karnataka Antyodaya/BPL/APL cards.',
      'Woman or her husband must not be an income-tax or GST payer.'
    ],
    eligibilityTa: [
      'கர்நாடக குடும்ப அட்டையில் குடும்பத் தலைவியாக உள்ள பெண்கள்.',
      'விண்ணப்பதாரரோ அவரது கணவரோ வருமான வரி அல்லது GST செலுத்துபவராக இருக்கக்கூடாது.'
    ],
    eligibilityHi: [
      'कर्नाटक बीपीएल/एपीएल राशन कार्ड में महिला मुखिया।',
      'महिला या पति आयकरदाता या जीएसटी दाता न हों।'
    ],
    documentsRequired: [
      'Karnataka Ration Card Number',
      'Aadhaar Card of woman and husband',
      'Bank passbook linked with Aadhaar'
    ],
    documentsRequiredTa: [
      'கர்நாடக ரேஷன் கார்டு எண்',
      'மனைவி மற்றும் கணவர் ஆதார் அட்டை',
      'ஆதாருடன் இணைக்கப்பட்ட வங்கி கணக்கு'
    ],
    documentsRequiredHi: [
      'कर्नाटक राशन कार्ड संख्या',
      'महिला व पति का आधार कार्ड',
      'आधार लिंक बैंक खाता'
    ],
    applicationSteps: [
      'Apply at Grama One, Karnataka One, or Bangalore One centers.',
      'SMS confirmation received with application tracking number.',
      'DBT monthly transfer of ₹2,000 credited directly.'
    ],
    applicationStepsTa: [
      'கிராம ஒன் அல்லது கர்நாடகா ஒன் சேவை மையத்தில் விண்ணப்பிக்கவும்.',
      'சரிபார்ப்புக்குப் பின் வங்கி கணக்கில் ₹2,000 நேரடியாக வரவு வைக்கப்படும்.'
    ],
    applicationStepsHi: [
      'ग्राम वन या कर्नाटक वन केंद्र पर आवेदन करें।',
      'डीबीटी द्वारा प्रतिमाह ₹2,000 सीधे खाते में अंतरित।'
    ],
    officialUrl: 'https://sevasindhu.karnataka.gov.in',
    verificationDate: 'Verified Official Portal - January 2026',
    lastCheckedDate: '2026-01-20',
    officialSource: 'Govt of Karnataka Seva Sindhu Portal',
    officeOrServiceCenter: 'Grama One / Karnataka One Centers',
    officeOrServiceCenterTa: 'கிராம ஒன் சேவை மையங்கள்',
    officeOrServiceCenterHi: 'ग्राम वन केंद्र',
    helpline: '1902',
    badge: 'State Cash Grant',
    badgeTa: 'மாநில நேரடி உதவி',
    badgeHi: 'राज्य प्रत्यक्ष सहायता'
  },
  {
    id: 'odisha-subhadra',
    title: 'Subhadra Yojana (Odisha)',
    titleTa: 'சுபத்ரா திட்டம் (ஒடிசா)',
    titleHi: 'सुभद्रा योजना (ओडिशा)',
    department: 'Women and Child Development Department, Government of Odisha',
    departmentTa: 'பெண்கள் மற்றும் குழந்தைகள் மேம்பாட்டுத் துறை, ஒடிசா',
    departmentHi: 'महिला एवं बाल विकास विभाग, ओडिशा सरकार',
    governmentLevel: 'other_states',
    stateOrUt: 'Odisha',
    category: 'financial_aid',
    isLoan: false,
    benefits: '₹10,000 per year paid in two equal installments of ₹5,000 on Rakhi Purnima and International Women’s Day for 5 years (Total ₹50,000).',
    benefitsTa: 'ஆண்டுக்கு ₹10,000 வீதம் 5 ஆண்டுகளில் மொத்தம் ₹50,000 நேரடி நிதியுதவி.',
    benefitsHi: 'प्रति वर्ष ₹10,000 (दो किश्तों में), 5 वर्षों में कुल ₹50,000 प्रत्यक्ष वित्तीय सहायता।',
    minAge: 21,
    maxAge: 60,
    targetGroup: ['homemaker', 'rural', 'entrepreneur'],
    eligibility: [
      'Woman resident of Odisha aged between 21 and 60 years.',
      'Must have Aadhaar card linked with active bank account and mobile number.',
      'Family must not include regular government employees or income tax payers.'
    ],
    eligibilityTa: [
      'ஒடிசாவில் வசிக்கும் 21 முதல் 60 வயதுடைய பெண்கள்.',
      'ஆதார் மற்றும் வங்கி கணக்கு இணைக்கப்பட்டிருக்க வேண்டும்.',
      'குடும்பத்தில் அரசு ஊழியர்கள் இருக்கக்கூடாது.'
    ],
    eligibilityHi: [
      '21 से 60 वर्ष की ओडिशा निवासी महिलाएं।',
      'आधार व मोबाइल से जुड़ा बैंक खाता अनिवार्य।',
      'परिवार में कोई सरकारी कर्मचारी या आयकरदाता न हो।'
    ],
    documentsRequired: [
      'Aadhaar Card',
      'Bank Account Passbook (Aadhaar & NPCI seeded)',
      'NFSA / SFSS Ration Card (if available)'
    ],
    documentsRequiredTa: [
      'ஆதார் அட்டை',
      'வங்கி கணக்கு புத்தகம் (NPCI இணைக்கப்பட்டது)',
      'ரேஷன் கார்டு'
    ],
    documentsRequiredHi: [
      'आधार कार्ड',
      'बैंक पासबुक (एनपीसीआई लिंक)',
      'राशन कार्ड'
    ],
    applicationSteps: [
      'Fill physical application form available free of charge at Anganwadi centers, Block offices, or Mo Seva Kendras.',
      'Submit at nearest Mo Seva Kendra without any payment.',
      'Approval communicated via SMS and DBT credited on designated festive days.'
    ],
    applicationStepsTa: [
      'அங்கன்வாடி மையம் அல்லது மோ சேவா கேந்திராவில் இலவச விண்ணப்பம் பெற்று சமர்ப்பிக்கவும்.',
      'சரிபார்ப்புக்குப் பின் பண்டிகை நாட்களில் வங்கி கணக்கில் பணம் வரும்.'
    ],
    applicationStepsHi: [
      'आंगनवाड़ी केंद्र या मो सेवा केंद्र से फॉर्म लेकर जमा करें।',
      'सत्यापन उपरांत उत्सव दिवसों पर डीबीटी द्वारा राशि अंतरण।'
    ],
    officialUrl: 'https://subhadra.odisha.gov.in',
    verificationDate: 'Verified Official Portal - January 2026',
    lastCheckedDate: '2026-01-20',
    officialSource: 'W&CD Department, Government of Odisha',
    officeOrServiceCenter: 'Mo Seva Kendra / Block Development Office / Anganwadi Center',
    officeOrServiceCenterTa: 'மோ சேவா கேந்திரா / அங்கன்வாடி மையம்',
    officeOrServiceCenterHi: 'मो सेवा केंद्र / आंगनवाड़ी केंद्र',
    helpline: '14678',
    badge: 'Direct Benefit Transfer',
    badgeTa: 'நேரடி மானியம்',
    badgeHi: 'प्रत्यक्ष लाभ अंतरण'
  }
];
