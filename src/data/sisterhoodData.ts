/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ProblemCircle, ProblemDiscussionThread } from '../types';

export const initialProblemCircles: ProblemCircle[] = [
  // =========================================================================
  // PUDUCHERRY CIRCLES
  // =========================================================================
  {
    id: 'circle-pondy-education-reentry',
    name: 'Puducherry Discontinued Studies & Open Schooling Circle',
    nameTa: 'புதுச்சேரி இடைநின்ற படிப்பு & தொலைதூர கல்வி வழிகாட்டுதல் வட்டம்',
    nameHi: 'पुदुचेरी अधूरी पढ़ाई और मुक्त विद्यालय सहायता समूह',
    category: 'education_restart',
    region: 'puducherry',
    district: 'Puducherry',
    districtTa: 'புதுச்சேரி',
    districtHi: 'पुदुचेरी',
    isPrivate: false,
    description: 'A dedicated sisterhood for women in Puducherry who discontinued Class 10, 12, or college and need peer guidance on NIOS, Kamarajar Scholarship, and affordable degree re-enrollment.',
    descriptionTa: '10, 12-ஆம் வகுப்பு அல்லது கல்லூரியில் பாதியில் நின்ற புதுச்சேரி பெண்கள் மீண்டும் படிக்கவும், காமராஜர் கல்வி உதவித்தொகை பெறவும் உதவும் தோழிகள் குழு.',
    descriptionHi: 'पुदुचेरी की महिलाओं के लिए एनआईओएस और उच्च शिक्षा पुन: प्रवेश हेतु सहकर्मी सहायता समूह।',
    icon: 'GraduationCap',
    activeProblem: 'How to re-appear for 12th state board private exam vs NIOS while managing household duties in Muthialpet & Lawspet.',
    activeProblemTa: 'முத்தியால்பேட்டை, லாஸ்பேட்டை பகுதியில் குடும்ப வேலைகளுடன் 12ஆம் வகுப்பு தனித்தேர்வு எழுதுவது எப்படி?',
    activeProblemHi: 'मुथियालपेट में घरेलू जिम्मेदारियों के साथ 12वीं की परीक्षा कैसे दें?',
    memberCount: 84,
    solvedCount: 29,
    tags: ['NIOS', '10th/12th Restart', 'Kamarajar Subsidy', 'Puducherry']
  },
  {
    id: 'circle-pondy-shg-capital',
    name: 'PUDU-VEDA Micro-Credit & SHG Loan Help Circle',
    nameTa: 'புதுச்சேரி மகளிர் குழு (SHG) & முத்ரா கடன் வழிகாட்டுதல் வட்டம்',
    nameHi: 'पुदुचेरी स्वयं सहायता समूह एवं मुद्रा ऋण सहायता समूह',
    category: 'business_capital',
    region: 'puducherry',
    district: 'Puducherry',
    districtTa: 'புதுச்சேரி',
    districtHi: 'पुदुचेरी',
    isPrivate: true,
    description: 'Confidential support group for Puducherry women dealing with high-interest microfinance debts, seeking PONDIVEDA revolving funds, and applying for MUDRA Shishu loans.',
    descriptionTa: 'கந்துவட்டி மற்றும் மைக்ரோ-பைனான்ஸ் கடன் சுமைகளில் இருந்து விடுபட, PONDIVEDA சுழல் நிதி & முத்ரா கடன் பெற வழிகாட்டும் ரகசிய தோழிகள் குழு.',
    descriptionHi: 'उच्च ब्याज वाले कर्जों से मुक्ति और पोंडिवेड़ा रिवॉल्विंग फंड प्राप्त करने का गोपनीय समूह।',
    icon: 'Landmark',
    activeProblem: 'Navigating bank manager delays for ₹50,000 PONDIVEDA SHG revolving fund sanction in Oulgaret block.',
    activeProblemTa: 'உழவர்கரை வட்டத்தில் ₹50,000 மகளிர் குழு சுழல் நிதி பெறுவதில் உள்ள வங்கி தாமதங்களை தீர்ப்பது எப்படி?',
    activeProblemHi: 'उलगरपेट ब्लॉक में ₹50,000 के एसएचजी ऋण की मंजूरी में हो रही देरी का समाधान।',
    memberCount: 112,
    solvedCount: 46,
    tags: ['SHG Loan', 'PONDIVEDA', 'MUDRA', 'Debt Relief']
  },
  {
    id: 'circle-karaikal-tailoring-orders',
    name: 'Karaikal Home Tailors & Fair Order Syndicate',
    nameTa: 'காரைக்கால் தையல் கலைஞர் & நியாயமான கூலி தோழிகள் வட்டம்',
    nameHi: 'काराइकल महिला दर्जी एवं उचित मजदूरी समूह',
    category: 'job_orders',
    region: 'puducherry',
    district: 'Karaikal',
    districtTa: 'காரைக்கால்',
    districtHi: 'काराइकल',
    isPrivate: false,
    description: 'Collective of home-based tailors in Karaikal uniting to negotiate fair piece-rates from uniform contractors and share bulk school uniform orders directly without middlemen cuts.',
    descriptionTa: 'காரைக்காலில் இடைத்தரகர்கள் இல்லாமல் பள்ளி சீருடை மற்றும் பிளவுஸ் ஆர்டர்களை நேரடியாக நியாயமான கூலிக்கு எடுக்கும் தையல் கலைஞர்கள் வட்டம்.',
    descriptionHi: 'बिचौलियों के बिना सीधे स्कूल यूनिफॉर्म और ब्लाउज ऑर्डर लेने वाले गृह दर्जी।',
    icon: 'Scissors',
    activeProblem: 'Contractors offering only ₹45 per school uniform shirt while fabric stitching requires ₹110 for decent livelihood.',
    activeProblemTa: 'பள்ளி சீருடை சட்டை தைக்க ₹45 மட்டுமே கூலி தருகிறார்கள்; நியாயமான ₹110 கூலி பெற ஒன்றுபடுவோம்.',
    activeProblemHi: 'स्कूल शर्ट सिलाई का ₹45 मिल रहा है, जबकि उचित मजदूरी ₹110 होनी चाहिए।',
    memberCount: 67,
    solvedCount: 22,
    tags: ['Tailoring', 'Fair Wage', 'School Uniforms', 'Karaikal']
  },
  {
    id: 'circle-pondy-legal-maintenance',
    name: 'Puducherry Single Women & Legal Maintenance Support',
    nameTa: 'புதுச்சேரி தனித்து வாழும் பெண்கள் & ஜீவனாம்ச சட்ட உதவி வட்டம்',
    nameHi: 'पुदुचेरी एकल महिला एवं कानूनी भरण-पोषण सहायता समूह',
    category: 'legal_family',
    region: 'puducherry',
    district: 'Puducherry',
    districtTa: 'புதுச்சேரி',
    districtHi: 'पुदुचेरी',
    isPrivate: true,
    description: 'A safe, confidential space for deserted, widowed, and single mothers in Puducherry to connect with Free Legal Aid Services (Puducherry SLSA) and destitute widow pension guidance.',
    descriptionTa: 'கணவரால் கைவிடப்பட்டோர், விதவை பெண்கள் இலவச சட்ட உதவி (Puducherry SLSA) மற்றும் அரசு உதவித்தொகை பெற வழிகாட்டும் பாதுகாப்பான வட்டம்.',
    descriptionHi: 'पुदुचेरी राज्य कानूनी सेवा प्राधिकरण के माध्यम से निःशुल्क कानूनी सहायता और विधवा पेंशन।',
    icon: 'Scale',
    activeProblem: 'Filing Section 125 CrPC maintenance petition without funds for private advocates in Puducherry Integrated Court Complex.',
    activeProblemTa: 'புதுச்சேரி நீதிமன்றத்தில் வழக்கறிஞர் கட்டணமின்றி இலவச சட்ட உதவி ஆணையம் மூலம் ஜீவனாம்சம் பெறுவது எப்படி?',
    activeProblemHi: 'पुदुचेरी कोर्ट में निःशुल्क कानूनी सहायता वकील कैसे नियुक्त करें?',
    memberCount: 53,
    solvedCount: 18,
    tags: ['Legal Aid', 'Maintenance', 'Widow Pension', 'Confidential']
  },

  // =========================================================================
  // TAMIL NADU CIRCLES
  // =========================================================================
  {
    id: 'circle-chennai-slum-education',
    name: 'North Chennai & Tambaram Discontinued Degree Re-Entry',
    nameTa: 'வடசென்னை & தாம்பரம் கல்லூரி இடைநின்ற மாணவிகள் மீட்பு வட்டம்',
    nameHi: 'उत्तरी चेन्नई कॉलेज ड्रॉपआउट री-एंट्री सहायता समूह',
    category: 'education_restart',
    region: 'tamil_nadu',
    district: 'Chennai',
    districtTa: 'சென்னை',
    districtHi: 'चेन्नई',
    isPrivate: false,
    description: 'Helping young women across Chennai who dropped out of engineering or arts colleges due to early marriage or family hardship to register for University of Madras IDE or Tamil Nadu Open University (TNOU).',
    descriptionTa: 'குடும்ப சூழல் காரணமாக கல்லூரியில் பாதியில் நின்ற வடசென்னை பெண்கள் மெட்ராஸ் பல்கலைக்கழக தொலைதூர கல்வி (IDE) அல்லது TNOU மூலம் பட்டப்படிப்பை முடிக்க உதவும் வட்டம்.',
    descriptionHi: 'चेन्नई की उन युवतियों के लिए समूह जो मद्रास विश्वविद्यालय दूरस्थ शिक्षा के माध्यम से डिग्री पूरी करना चाहती हैं।',
    icon: 'BookOpen',
    activeProblem: 'Getting original marksheets back from private self-financing colleges holding certificates over pending semester fees.',
    activeProblemTa: 'கல்லூரியில் நிலுவை கட்டணம் கேட்டு சான்றிதழ்களை தடுத்து வைப்பதை எதிர்த்து பாரதிதாசன்/மெட்ராஸ் பல்கலையில் முறையிடுவது எப்படி?',
    activeProblemHi: 'कॉलेज द्वारा रोकी गई मूल मार्कशीट वापस प्राप्त करने के कानूनी रास्ते।',
    memberCount: 139,
    solvedCount: 54,
    tags: ['Madras University IDE', 'TNOU', 'Degree Completion', 'Chennai']
  },
  {
    id: 'circle-madurai-shg-business',
    name: 'Madurai & Dindigul Micro-Vendors & Jasmine Collective',
    nameTa: 'மதுரை & திண்டுக்கல் மல்லிகை & சிறுவியாபாரிகள் கடன் கூட்டு வட்டம்',
    nameHi: 'मदुरै एवं डिंडीगुल चमेली फूल विक्रेता और लघु ऋण समूह',
    category: 'business_capital',
    region: 'tamil_nadu',
    district: 'Madurai',
    districtTa: 'மதுரை',
    districtHi: 'मदुरै',
    isPrivate: false,
    description: 'Madurai daily street vendors and flower sellers joining forces to bypass morning loan sharks (meter vaddi) by accessing TNSRLM zero-interest group credits.',
    descriptionTa: 'மதுரை மாட்டுத்தாவணி மற்றும் பூச்சந்தை சிறு வியாபாரிகள் "மீட்டர் வட்டி" கொடுமையில் இருந்து விடுபட மகளிர் திட்ட கடன்களை பயன்படுத்தும் தோழிகள் சங்கம்.',
    descriptionHi: 'मदुरै की फूल और सब्जी विक्रेताओं को मीटर ब्याज से मुक्ति और तमिलनाडु महिला योजना से ऋण।',
    icon: 'TrendingUp',
    activeProblem: 'Replacing daily ₹1,000 meter vaddi (paying ₹100/day interest) with TNSRLM community investment fund ₹10,000 revolving loan.',
    activeProblemTa: 'தினசரி ₹100 மீட்டர் வட்டிக்கு பதிலாக மகளிர் திட்ட ₹10,000 சுழல் நிதியை எவ்வாறு விரைவாகப் பெறுவது?',
    activeProblemHi: 'दैनिक मीटर ब्याज को ₹10,000 के स्वयं सहायता समूह ऋण से कैसे बदलें?',
    memberCount: 98,
    solvedCount: 41,
    tags: ['Anti-Meter Vaddi', 'TNSRLM', 'Flower Vendors', 'Madurai']
  },
  {
    id: 'circle-tiruppur-coimbatore-tailors',
    name: 'Tiruppur & Coimbatore Garment Workers Fair Pay Alliance',
    nameTa: 'திருப்பூர் & கோவை ஆடை உற்பத்தியாளர்கள் & தையல் தோழிகள் சங்கம்',
    nameHi: 'तिरुपुर एवं कोयंबटूर गारमेंट कामगार व दर्जी मंच',
    category: 'job_orders',
    region: 'tamil_nadu',
    district: 'Coimbatore',
    districtTa: 'கோயம்புத்தூர்',
    districtHi: 'कोयंबटूर',
    isPrivate: false,
    description: 'A collective of 180+ home contract stitchers and export garment workers in Tiruppur and Coimbatore exchanging direct export reject orders and fabric sourcing rates.',
    descriptionTa: 'திருப்பூர் பனியன் & ஆயத்த ஆடை தையல் பெண்கள் இடைத்தரகர் இன்றி மொத்த ஆடை ஆர்டர்களை நேரடியாக பெற்று பகிர்ந்து கொள்ளும் தளம்.',
    descriptionHi: 'तिरुपुर में घर से सिलाई करने वाली महिलाओं के लिए थोक कपड़े के ऑर्डर और उचित दरें।',
    icon: 'Package',
    activeProblem: 'Purchasing 100% cotton knit fabric rolls together in wholesale bulk to save ₹70/kg compared to local retail cut-pieces.',
    activeProblemTa: 'தனித்தனியாக வாங்காமல் 10 பெண்கள் இணைந்து மொத்தமாக துணி ரோல்களை வாங்கி கிலோவுக்கு ₹70 மிச்சப்படுத்துவோம்.',
    activeProblemHi: 'थोक दर पर कपड़ा खरीदकर लागत में प्रति किलो ₹70 बचाने की संयुक्त पहल।',
    memberCount: 182,
    solvedCount: 68,
    tags: ['Garment Export', 'Bulk Sourcing', 'Tiruppur', 'Fair Piece-Rate']
  },
  {
    id: 'circle-salem-handloom-weavers',
    name: 'Salem & Erode Handloom Sisters & Cooperative Rights',
    nameTa: 'சேலம் & ஈரோடு கைத்தறி நெசவு பெண்கள் கூட்டுறவு உரிமை வட்டம்',
    nameHi: 'सलेम एवं इरोड हथकरघा बुनकर महिला अधिकार मंच',
    category: 'unorganized_labor',
    region: 'tamil_nadu',
    district: 'Salem',
    districtTa: 'சேலம்',
    districtHi: 'सलेम',
    isPrivate: false,
    description: 'Women weavers in Salem, Jalakandapuram, and Erode advocating for fair piece-rate passbook entries and enrollment in the Tamil Nadu Handloom Weavers Welfare Board.',
    descriptionTa: 'சேலம் கைத்தறி சேலை நெசவு செய்யும் பெண்கள் நலவாரிய அட்டை பெற்று ஓய்வூதியம் மற்றும் இலவச வீடு பெற வழிகாட்டும் வட்டம்.',
    descriptionHi: 'सलेम हथकरघा बुनकर कल्याण बोर्ड में पंजीकरण और पेंशन लाभ सहायता।',
    icon: 'Shirt',
    activeProblem: 'Master weavers keeping passbooks in their custody, preventing women weavers from registering directly with Tamil Nadu Weavers Welfare Board.',
    activeProblemTa: 'மாஸ்டர் வீவர்கள் பாஸ்புக்கை தராமல் தடுப்பதை சமாளித்து நலவாரியத்தில் நேரடியாக உறுப்பினராவது எப்படி?',
    activeProblemHi: 'हथकरघा कल्याण बोर्ड में सीधे पंजीकरण कैसे कराएं?',
    memberCount: 76,
    solvedCount: 31,
    tags: ['Handloom', 'Welfare Board', 'Salem', 'Unorganized Labor']
  },
  {
    id: 'circle-trichy-maternal-nutrition',
    name: 'Tiruchirappalli Maternal Health & Anemia Recovery Circle',
    nameTa: 'திருச்சி இளம் தாய்மார்கள் ஊட்டச்சத்து & ரத்தசோகை மீட்பு வட்டம்',
    nameHi: 'तिरुचिरापल्ली मातृ स्वास्थ्य एवं एनीमिया मुक्ति समूह',
    category: 'health_nutrition',
    region: 'tamil_nadu',
    district: 'Tiruchirappalli',
    districtTa: 'திருச்சிராப்பள்ளி',
    districtHi: 'तिरुचिरापल्ली',
    isPrivate: true,
    description: 'Empowering young mothers and pregnant women across Trichy to track hemoglobin levels, access Dr. Muthulakshmi Reddy Amma Maternity Kits, and access free nutritious millets.',
    descriptionTa: 'திருச்சி வட்டார கர்ப்பிணி பெண்கள் மற்றும் தாய்மார்கள் ரத்தசோகை நீங்கவும், முத்துலட்சுமி ரெட்டி மகப்பேறு கிட் பெறவும் உதவும் ரகசிய மருத்துவ ஆலோசனை வட்டம்.',
    descriptionHi: 'एनीमिया से बचाव और डॉ. मुथुलक्ष्मी रेड्डी मातृत्व पोषण किट प्राप्त करने की मार्गदर्शिका।',
    icon: 'HeartHandshake',
    activeProblem: 'Delay in receiving 2nd installment of ₹4,000 cash and Amma Baby Care kit from Primary Health Centre (PHC).',
    activeProblemTa: 'ஆரம்ப சுகாதார நிலையத்தில் 2வது தவணை ₹4,000 மற்றும் அம்மா மகப்பேறு சஞ்சீவி பெட்டகம் பெறுவதில் உள்ள தாமதத்தை சரிசெய்வது எப்படி?',
    activeProblemHi: 'प्राथमिक स्वास्थ्य केंद्र से मातृत्व सहायता की दूसरी किस्त में देरी का समाधान।',
    memberCount: 91,
    solvedCount: 37,
    tags: ['Maternal Health', 'Anemia', 'Amma Kit', 'Trichy']
  },
  {
    id: 'circle-vellore-domestic-violence',
    name: 'Vellore & Ranipet Sakhi One-Stop Crisis Peer Support',
    nameTa: 'வேலூர் & ராணிப்பேட்டை சகி ஒன்-ஸ்டாப் பாதுகாப்பு & சட்ட தோழிகள் வட்டம்',
    nameHi: 'वेल्लोर सखी वन-स्टॉप संकटकालीन महिला सहायता समूह',
    category: 'legal_family',
    region: 'tamil_nadu',
    district: 'Vellore',
    districtTa: 'வேலூர்',
    districtHi: 'वेल्लोर',
    isPrivate: true,
    description: 'Confidential emergency peer network helping domestic abuse survivors access the Sakhi One-Stop Centre at Vellore Government Medical College and Thozhi working women shelters.',
    descriptionTa: 'குடும்ப வன்முறையால் பாதிக்கப்பட்ட பெண்களுக்கு வேலூர் அரசு மருத்துவமனை "சகி" மையம் மற்றும் தோழி விடுதி மூலம் உடனடியாக தங்குமிடம் மற்றும் சட்ட பாதுகாப்பு அளிக்கும் வட்டம்.',
    descriptionHi: 'घरेलू हिंसा से पीड़ित महिलाओं के लिए सखी वन स्टॉप सेंटर और कानूनी संरक्षण।',
    icon: 'Shield',
    activeProblem: 'Need emergency shelter and police protection orders without notifying the perpetrator.',
    activeProblemTa: 'எதிர்தரப்புக்கு தெரியாமல் உடனடியாக தோழி தங்குமிடம் மற்றும் காவல்துறை பாதுகாப்பு ஆணை பெறுவது எப்படி?',
    activeProblemHi: 'आपातकालीन सुरक्षित आश्रय और पुलिस सुरक्षा आदेश कैसे प्राप्त करें?',
    memberCount: 42,
    solvedCount: 19,
    tags: ['Sakhi Centre', 'Domestic Violence', 'Emergency Shelter', 'Vellore']
  }
];

export const initialProblemThreads: ProblemDiscussionThread[] = [
  {
    id: 'thread-pondy-1',
    circleId: 'circle-pondy-education-reentry',
    authorAlias: 'Sister Ananya (Lawspet)',
    isAnonymous: true,
    authorLocation: 'Lawspet, Puducherry',
    problemTitle: 'I left school after 10th in 2018. Can I directly write 12th exam in Puducherry through NIOS without attending daily school?',
    problemDescription: 'I am 24 years old with a 3-year-old child. I work as an assistant in a pharmacy in Puducherry. I want to clear 12th standard so I can qualify for the Perunthalaivar Kamarajar Higher Education grant and do a B.Com or D.Pharm course. Can someone explain if NIOS Puducherry exam center is accessible and how to prepare at home?',
    category: 'education_restart',
    timestamp: '2 days ago',
    upvotes: 38,
    isUpvoted: false,
    solutions: [
      {
        id: 'sol-1',
        authorAlias: 'Teacher Vasanthi (Puducherry)',
        isAnonymous: false,
        solutionText: 'Yes sister! You are 100% eligible for NIOS Senior Secondary (12th). Puducherry has an official NIOS study center at Saradha Gangadharan College and Kendriya Vidyalaya. You only need to choose 5 subjects. You can study in Tamil or English medium at your own pace, submit assignments (TMA) online for 20% marks, and exams happen twice a year in April and October. Your 10th pass certificate from 2018 is valid proof. I will share free video study materials in our group!',
        isVerifiedByMentor: true,
        timestamp: '1 day ago',
        helpfulVotes: 29,
        isHelpful: true
      },
      {
        id: 'sol-2',
        authorAlias: 'Sister Deepa (Muthialpet)',
        isAnonymous: true,
        solutionText: 'I passed 12th through NIOS last year at age 27! My biggest tip: Do not pay brokers ₹10,000. Register directly on sdmis.nios.ac.in for only around ₹2,000 government fee. For practicals, you only attend 5 Sunday classes.',
        isVerifiedByMentor: true,
        timestamp: '18 hours ago',
        helpfulVotes: 19,
        isHelpful: false
      }
    ],
    collectiveAction: {
      actionTitle: 'Organize Weekend NIOS Study Circle at Lawspet Community Hall',
      actionDescription: 'We are gathering 15 sisters who enrolled for April 2026 NIOS 12th to study Commerce and English together for 2 hours every Sunday morning.',
      targetAuthority: 'Lawspet Women Federation',
      pledgedCount: 14,
      hasUserPledged: false
    }
  },
  {
    id: 'thread-karaikal-tailors-1',
    circleId: 'circle-karaikal-tailoring-orders',
    authorAlias: 'Sister Revathi (Neravy)',
    isAnonymous: false,
    authorLocation: 'Neravy, Karaikal',
    problemTitle: 'School uniform agents are offering only ₹40 per piece. Let us unite and demand the official ₹90 government piece-rate!',
    problemDescription: 'Local contractors are getting ₹160 per uniform set from the Education Department but paying us women tailors only ₹40 for 2 hours of labor per shirt. Electricity costs have risen. If each of us negotiates alone, they threaten to give the cloth to someone else.',
    category: 'job_orders',
    timestamp: '3 days ago',
    upvotes: 45,
    isUpvoted: true,
    solutions: [
      {
        id: 'sol-k1',
        authorAlias: 'PONDIVEDA Federation Leader Selvi',
        isAnonymous: false,
        solutionText: 'Sisters, under the Puducherry Free Uniform Scheme, SHG federations are entitled to direct work orders without private contractors taking commissions. We have approached the District Collectorate Karaikal to route 5,000 uniforms directly to our registered tailoring SHG federation at ₹85 stitching charge per shirt. Sign our collective resolution below!',
        isVerifiedByMentor: true,
        timestamp: '2 days ago',
        helpfulVotes: 34,
        isHelpful: true
      }
    ],
    collectiveAction: {
      actionTitle: 'Joint Representation to District Collector Karaikal for Direct Uniform Allotment',
      actionDescription: 'Submitting a formal memorandum signed by 50 Karaikal home tailors requesting direct work order allocation to women SHGs instead of private commercial brokers.',
      targetAuthority: 'District Collectorate Karaikal & Dept of School Education',
      pledgedCount: 42,
      hasUserPledged: true
    }
  },
  {
    id: 'thread-chennai-degree-1',
    circleId: 'circle-chennai-slum-education',
    authorAlias: 'Sister Shalini (Vyasarapadi)',
    isAnonymous: true,
    authorLocation: 'Vyasarapadi, Chennai',
    problemTitle: 'College refused to return my +2 marksheet because of ₹14,000 arrears fee from 2021. How can I join Madras University distance degree?',
    problemDescription: 'I had to drop out in 2nd semester B.Com due to my father falling ill during COVID. Now I want to restart degree via IDE distance education, but the private college refuses to return my school transfer certificate and marksheet until I clear past semester exam fee.',
    category: 'education_restart',
    timestamp: '4 days ago',
    upvotes: 52,
    isUpvoted: false,
    solutions: [
      {
        id: 'sol-c1',
        authorAlias: 'Advocate Meenakshi (Legal Aid Chennai)',
        isAnonymous: false,
        solutionText: 'The UGC and Madras High Court have repeatedly ruled that NO educational institution has legal lien over students original certificates for fee disputes. You can send a formal representation citing UGC Notification No. 1-3/2007(CPP-II). Alternatively, you can apply for a duplicate marksheet directly from the Tamil Nadu Directorate of Government Examinations (DGE) with a police non-traceable certificate.',
        isVerifiedByMentor: true,
        timestamp: '3 days ago',
        helpfulVotes: 48,
        isHelpful: true
      }
    ],
    collectiveAction: {
      actionTitle: 'Legal Aid Cell Free Drafting Assistance for Certificate Retrieval',
      actionDescription: 'Providing pre-formatted High Court citation letters to students facing certificate retention by self-financing colleges.',
      targetAuthority: 'Tamil Nadu State Legal Services Authority (TNSLSA)',
      pledgedCount: 31,
      hasUserPledged: false
    }
  },
  {
    id: 'thread-madurai-debt-1',
    circleId: 'circle-madurai-shg-business',
    authorAlias: 'Sister Chitra (Mattuthavani)',
    isAnonymous: true,
    authorLocation: 'Mattuthavani, Madurai',
    problemTitle: 'Daily meter vaddi collector is harassing outside my vegetable cart. How can I shift to TNSRLM loan immediately?',
    problemDescription: 'I borrowed ₹15,000 two months ago. I have already paid ₹12,000 in daily interest alone, but the lender claims the original ₹15,000 principal is still pending. My panchayat SHG says the bank will take 2 months to sanction new loan. What immediate protection is available?',
    category: 'business_capital',
    timestamp: '1 day ago',
    upvotes: 61,
    isUpvoted: false,
    solutions: [
      {
        id: 'sol-m1',
        authorAlias: 'Community Resource Person (CRP) Valli',
        isAnonymous: false,
        solutionText: 'Sister, under the Tamil Nadu Prohibition of Charging Exorbitant Interest Act 2003, meter vaddi and daily kandhuvatti are strictly non-bailable criminal offenses. Madurai District Police has a dedicated Anti-Kandhuvatti cell. Secondly, your Village Poverty Reduction Committee (VPRC) has an immediate Vulnerability Reduction Fund (VRF) of up to ₹15,000 specifically to rescue women from usurious moneylenders. Contact your local Panchayat Community Organizer immediately.',
        isVerifiedByMentor: true,
        timestamp: '20 hours ago',
        helpfulVotes: 44,
        isHelpful: true
      }
    ],
    collectiveAction: {
      actionTitle: 'Emergency Debt Rescue Mutual Aid Pool',
      actionDescription: 'Pool small weekly savings of ₹50 among 20 members to offer zero-interest bridge loans to sisters targeted by illegal lenders.',
      targetAuthority: 'Madurai District Mahila Samakhya / TNSRLM',
      pledgedCount: 28,
      hasUserPledged: false
    }
  }
];
