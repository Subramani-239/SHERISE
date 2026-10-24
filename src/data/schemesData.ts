/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Scheme } from '../types';

export const schemesData: Scheme[] = [
  {
    id: 'kalaignar-magalir-urimai',
    title: 'Kalaignar Magalir Urimai Thittam',
    titleTa: 'கலைஞர் மகளிர் உரிமைத் திட்டம்',
    titleHi: 'कलैग्नार महिला अधिकार योजना',
    department: 'Government of Tamil Nadu (Social Welfare Dept)',
    departmentTa: 'தமிழ்நாடு அரசு (சமூக நலத்துறை)',
    departmentHi: 'तमिलनाडु सरकार (समाज कल्याण विभाग)',
    category: 'financial_aid',
    isLoan: false,
    benefits: '₹1,000 per month deposited directly into the bank account of woman head of household.',
    benefitsTa: 'குடும்பத் தலைவிகளுக்கு மாதம் தோறும் ₹1,000 வங்கி கணக்கில் நேரடியாக வரவு வைக்கப்படுகிறது.',
    benefitsHi: 'महिला परिवार प्रमुखों के बैंक खाते में प्रतिमाह ₹1,000 प्रत्यक्ष रूप से जमा किए जाते हैं।',
    minAge: 21,
    targetGroup: ['homemaker', 'rural', 'dropout'],
    eligibility: [
      'Woman aged 21 years or older.',
      'Must be acknowledged as the head of the family in the Smart Ration Card.',
      'Annual family income should be under ₹2.5 Lakhs.',
      'Family must own less than 5 acres of wetland or 10 acres of dry land.',
      'Annual electricity consumption must be below 3,600 units.'
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
      'Aadhaar Card',
      'Smart Ration Card (Family Card)',
      'Bank Passbook (Linked with Aadhaar)',
      'Electricity Bill (Consumer Number)'
    ],
    documentsRequiredTa: [
      'ஆதார் அட்டை',
      'ஸ்மார்ட் குடும்ப அட்டை (ரேஷன் கார்டு)',
      'ஆதாருடன் இணைக்கப்பட்ட வங்கி கணக்கு புத்தகம்',
      'மின் கட்டண ரசீது (இணைப்பு எண்)'
    ],
    documentsRequiredHi: [
      'आधार कार्ड',
      'स्मार्ट राशन कार्ड',
      'आधार से लिंक बैंक पासबुक',
      'बिजली बिल (उपभोक्ता संख्या)'
    ],
    applicationSteps: [
      'Apply at your local Special Camp or through the nearest e-Sevai / Revenue office.',
      'Bio-metric or OTP authentication is completed on site.',
      'Field verification is conducted by revenue staff.',
      'Amount is directly credited via DBT on the 15th of every month.'
    ],
    applicationStepsTa: [
      'உங்கள் பகுதி சிறப்பு முகாமில் அல்லது அருகில் உள்ள இ-சேவை மையம் மூலம் விண்ணப்பிக்கவும்.',
      'கைரேகை அல்லது OTP மூலம் சரிபார்ப்பு செய்யப்படும்.',
      'வருவாய்த்துறை கள ஆய்வுக்குப் பின் அனுமதி அளிக்கப்படும்.',
      'ஒவ்வொரு மாதமும் 15-ஆம் தேதி வங்கி கணக்கில் தொகை நேரடியாக வரவு வைக்கப்படும்.'
    ],
    applicationStepsHi: [
      'स्थानीय विशेष शिविर या नजदीकी ई-सेवा केंद्र से आवेदन करें।',
      'फिंगरप्रिंट या ओटीपी द्वारा सत्यापन किया जाता है।',
      'राजस्व अधिकारियों द्वारा स्थलीय सत्यापन।',
      'प्रत्येक माह की 15 तारीख को डीबीटी द्वारा खाते में राशि जमा।'
    ],
    officialUrl: 'https://kmut.tn.gov.in',
    verificationDate: 'Verified Official Portal - January 2026',
    officialSource: 'Department of Social Welfare & Women Empowerment, Govt of Tamil Nadu',
    helpline: '044-25619208 / 181',
    badge: 'Direct Cash Grant',
    badgeTa: 'நேரடி நிதியுதவி (மானியம்)',
    badgeHi: 'प्रत्यक्ष वित्तीय अनुदान'
  },
  {
    id: 'pudhumai-penn',
    title: 'Moovalur Ramamirtham Ammaiyar - Pudhumai Penn Thittam',
    titleTa: 'புதுமைப் பெண் திட்டம்',
    titleHi: 'पुदुमई पेन योजना (उच्च शिक्षा सहायता)',
    department: 'Higher Education Department, Tamil Nadu',
    departmentTa: 'உயர்கல்வித்துறை, தமிழ்நாடு அரசு',
    departmentHi: 'उच्च शिक्षा विभाग, तमिलनाडु सरकार',
    category: 'education',
    isLoan: false,
    benefits: '₹1,000 per month for girls pursuing higher education (ITI, Diploma, Degree) till completion.',
    benefitsTa: 'அரசுப் பள்ளியில் பயின்ற மாணவிகளுக்கு உயர்கல்வி முடியும் வரை மாதம் ₹1,000 வழங்கப்படுகிறது.',
    benefitsHi: 'सरकारी स्कूल से पढ़ी छात्राओं को उच्च शिक्षा (डिग्री, डिप्लोमा, आईटीआई) पूरी होने तक ₹1,000 प्रति माह।',
    targetGroup: ['student', 'dropout', 'rural'],
    eligibility: [
      'Female students who studied from Class 6 to Class 12 in Tamil Nadu Government schools.',
      'Currently enrolled in recognized Undergraduate Degree, Diploma, or ITI programs.'
    ],
    eligibilityTa: [
      'தமிழ்நாடு அரசுப் பள்ளிகளில் 6 முதல் 12-ஆம் வகுப்பு வரை தொடர்ந்து படித்த மாணவிகள்.',
      'அங்கீகரிக்கப்பட்ட பட்டப்படிப்பு, டிப்ளமோ அல்லது ஐடிஐயில் பயில வேண்டும்.'
    ],
    eligibilityHi: [
      'कक्षा 6 से 12 तक तमिलनाडु सरकारी स्कूल से पढ़ी छात्राएं।',
      'मान्यता प्राप्त स्नातक डिग्री, डिप्लोमा या आईटीआई में अध्ययनरत।'
    ],
    documentsRequired: [
      'School Study Certificate (Classes 6-12 Govt School)',
      'College Admission Slip & ID Card',
      'Aadhaar Card',
      'Bank Account details in student’s name'
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
      'छात्रा के नाम बैंक खाता विवरण'
    ],
    applicationSteps: [
      'College authorities submit student applications via the designated Pudhumai Penn portal.',
      'Principal/Head of institution verifies school certificates.',
      'Approved monthly stipend is transferred directly to the student’s bank account.'
    ],
    applicationStepsTa: [
      'கல்லூரி நிர்வாகம் மூலம் அதிகாரப்பூர்வ போர்ட்டலில் விண்ணப்பிக்க வேண்டும்.',
      'கல்லூரி முதல்வர் பள்ளி சான்றிதழை சரிபார்த்து சமர்ப்பிப்பார்.',
      'ஒப்புதலுக்குப் பின் நேரடியாக மாணவியின் வங்கி கணக்கில் பணம் வரும்.'
    ],
    applicationStepsHi: [
      'कॉलेज प्रशासन के माध्यम से आधिकारिक पोर्टल पर आवेदन।',
      'प्रधानाचार्य द्वारा स्कूल प्रमाणपत्रों का सत्यापन।',
      'सत्यापन उपरांत सीधे बैंक खाते में मासिक छात्रवृत्ति।'
    ],
    officialUrl: 'https://pudhumaipenn.tn.gov.in',
    verificationDate: 'Verified Official Portal - January 2026',
    officialSource: 'Higher Education Department, Govt of Tamil Nadu',
    helpline: '14417',
    badge: 'Education Grant',
    badgeTa: 'கல்வி மானியம்',
    badgeHi: 'शिक्षा अनुदान'
  },
  {
    id: 'sathiyavani-muthu-sewing',
    title: 'Free Sewing Machine Scheme (Sathiyavani Muthu Ammaiyar)',
    titleTa: 'இலவச தையல் இயந்திரம் வழங்கும் திட்டம்',
    titleHi: 'मुफ्त सिलाई मशीन योजना (सत्यवाणी मुथु अम्मैयार)',
    department: 'Department of Social Welfare and Women Empowerment, TN',
    departmentTa: 'சமூக நலம் மற்றும் மகளிர் உரிமைத்துறை',
    departmentHi: 'समाज कल्याण एवं महिला सशक्तिकरण विभाग',
    category: 'equipment',
    isLoan: false,
    benefits: 'Full commercial sewing machine provided completely free of cost to start home tailoring.',
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
      'Basic tailoring knowledge or certificate (at least 6 months training or self-tailoring proof).'
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
      'सिलाई का बुनियादी ज्ञान या प्रशिक्षण प्रमाण पत्र।'
    ],
    documentsRequired: [
      'Age Proof (Birth Certificate or 10th Mark Sheet or TC)',
      'Income Certificate issued by Tahsildar',
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
      'Collect the application form from District Social Welfare Office or Block Development Office (BDO).',
      'Attach all required certificates verified by local VAO.',
      'Submit the physical application at the Block Social Welfare Extension office.',
      'Upon verification, the free machine is distributed during official taluk distribution programs.'
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
    officialSource: 'Social Welfare Directorate, Tamil Nadu',
    helpline: '181',
    badge: '100% Free Equipment',
    badgeTa: '100% இலவச கருவி (மானியம்)',
    badgeHi: '100% मुफ्त उपकरण'
  },
  {
    id: 'pm-mudra-shishu',
    title: 'Pradhan Mantri MUDRA Yojana (Shishu & Kishore Loans)',
    titleTa: 'பிரதம மந்திரி முத்ரா கடன் திட்டம் (சிசு & கிஷோர்)',
    titleHi: 'प्रधानमंत्री मुद्रा योजना (शिशु व किशोर ऋण)',
    department: 'Ministry of Finance, Government of India',
    departmentTa: 'நிதி அமைச்சகம், இந்திய அரசு',
    departmentHi: 'वित्त मंत्रालय, भारत सरकार',
    category: 'shg_loan',
    isLoan: true,
    benefits: 'Collateral-free micro loans up to ₹50,000 (Shishu) and up to ₹5 Lakhs (Kishore) at low interest rates.',
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
      'Visit any nationalized bank, regional rural bank (RRB), or cooperative bank.',
      'Request the MUDRA Shishu loan form (special priority is given to women entrepreneurs under Mudra Mahila).',
      'Submit the simple 1-page application with quotation.',
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
    officialSource: 'MUDRA / Department of Financial Services, Govt of India',
    helpline: '1800 180 1111',
    badge: 'Subsidized Loan (Repayable)',
    badgeTa: 'குறைந்த வட்டி கடன் (திருப்பிச் செலுத்த வேண்டியவை)',
    badgeHi: 'रियायती ऋण (लौटाने योग्य)'
  },
  {
    id: 'tn-mahalir-thittam-shg',
    title: 'Tamil Nadu Mahalir Thittam (SHG Bank Linkage & Revolving Fund)',
    titleTa: 'தமிழ்நாடு மகளிர் திட்டம் (சுயஉதவிக் குழு கடன் & சுழல்நிதி)',
    titleHi: 'तमिलनाडु महिला योजना (एसएचजी बैंक लिंकेज व आवर्ती निधि)',
    department: 'Tamil Nadu Corporation for Development of Women (TNCDW)',
    departmentTa: 'தமிழ்நாடு மகளிர் மேம்பாட்டு நிறுவனம்',
    departmentHi: 'तमिलनाडु महिला विकास निगम (TNCDW)',
    category: 'shg_loan',
    isLoan: true,
    benefits: 'Subsidized community loans from ₹50,000 to ₹10 Lakhs with 4%-7% effective interest rate and credit linked subsidies.',
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
      'Group bank passbook & individual member Aadhaar'
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
    officialSource: 'TNCDW, Rural Development & Panchayat Raj, Govt of Tamil Nadu',
    helpline: '044-28173412',
    badge: 'SHG Loan (Repayable)',
    badgeTa: 'சுயஉதவிக்குழு கடன் (திருப்பிச் செலுத்த வேண்டியவை)',
    badgeHi: 'एसएचजी ऋण (लौटाने योग्य)'
  },
  {
    id: 'lakhpati-didi',
    title: 'Lakhpati Didi Mission',
    titleTa: 'இலட்சாதிபதி சகோதரி திட்டம் (Lakhpati Didi)',
    titleHi: 'लखपति दीदी मिशन',
    department: 'Ministry of Rural Development & NRLM',
    departmentTa: 'ஊரக வளர்ச்சி அமைச்சகம் (NRLM)',
    departmentHi: 'ग्रामीण विकास मंत्रालय एवं राष्ट्रीय ग्रामीण आजीविका मिशन',
    category: 'livelihood',
    isLoan: false,
    benefits: 'Special training, market linkages, toolkit funding, and mentorship to enable rural women to earn at least ₹1,00,000 per year.',
    benefitsTa: 'கிராமப்புற பெண்கள் ஆண்டுக்கு குறைந்தது ₹1,00,000 வருமானம் ஈட்ட சிறப்பு தொழிற்பயிற்சி மற்றும் சந்தை வாய்ப்புகள்.',
    benefitsHi: 'ग्रामीण महिलाओं को प्रति वर्ष कम से कम ₹1,00,000 कमाने योग्य बनाने के लिए विशेष प्रशिक्षण, टूलकिट व बाजार संपर्क।',
    targetGroup: ['rural', 'homemaker', 'entrepreneur'],
    eligibility: [
      'Rural SHG woman member interested in taking up micro-enterprises (agriculture, poultry, dairy, tailoring, food processing).'
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
      'Local VPRC Recommendation'
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
      'Enroll in the Lakhpati Didi baseline survey.',
      'Receive skill training and business support grants through the Gram Panchayat.'
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
    officialSource: 'Ministry of Rural Development, Govt of India',
    helpline: '1800 110 001',
    badge: 'Livelihood Scale-Up Grant',
    badgeTa: 'வருமான பெருக்க மானியம்',
    badgeHi: 'आजीविका संवर्धन अनुदान'
  }
];
