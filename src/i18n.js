// Bilingual content for Slook landing page
// Source: slook profile.pdf + branding.pdf
// Edit copy here — all components consume from this file via useLang()

export const content = {
  ar: {
    dir: 'rtl',
    nav: {
      about: 'من نحن',
      process: 'كيف نشتغل',
      services: 'خدماتنا',
      clients: 'عملاؤنا',
      contact: 'تواصل معنا',
      cta: 'ابدأ مشروعك',
    },
    hero: {
      eyebrow: 'منظومة متكاملة لذكاء التسويق',
      title1: 'مو وكالة...',
      title2: 'سلوك مختلف',
      subtitle:
        'نخليك تنشاف، تنفهم، وتنطلب. نحوّل فكرتك من "عادية" لشيء يوقف السوق عنده.',
      primary: 'ابدأ مشروعك',
      secondary: 'تواصل معنا عبر الواتساب',
      stats: [
        { value: '+50', label: 'عميل' },
        { value: '15', label: 'خدمة' },
        { value: '4', label: 'خطوات منهجية' },
      ],
    },
    about: {
      kicker: 'من نحن',
      title: 'مو أي تسويق ينفع',
      lead: 'فيه تسويق يمشي... وفيه تسويق يضرب. إحنا نشتغل على اللي يضرب.',
      points: [
        {
          title: 'نبدأ من الأساس',
          body: 'نفهمك صح. فعلاً نفهم عميلك وش يبي ونفهم السوق وين رايح.',
        },
        {
          title: 'نبني فكرة قوية',
          body: 'ورسالة تعلق بالراس، وشغل يفرض نفسه بدون ما يطلب انتباه.',
        },
        {
          title: 'نشتغل معك كأن المشروع مشروعنا',
          body: 'ونطلع بنتيجة تقول: "هنا فيه شغل ثقيل."',
        },
      ],
      whyKicker: 'ليش سلوك؟',
      whyTitle: 'لاننا ما نشتغل بعشوائية',
      whyPoints: [
        'نحلل بعمق',
        'نفكر بجرأة',
        'وننفذ بدقة',
        'كل خطوة محسوبة وكل فكرة لها هدف',
      ],
      whyClose: 'ما عندنا "يمشي الحال" — عندنا "هذا هو الصح".',
    },
    process: {
      kicker: 'كيف نشتغل',
      title: 'نمشي معك من البداية للنهاية',
      steps: [
        { num: '01', title: 'نفهم', body: 'مشروعك، جمهورك، وسوقك.' },
        { num: '02', title: 'نخطط', body: 'فكرة واستراتيجية تضرب صح.' },
        { num: '03', title: 'ننفذ', body: 'شغل احترافي يبان.' },
        { num: '04', title: 'نطوّر', body: 'نعدّل ونرفع النتيجة باستمرار.' },
      ],
    },
    services: {
      kicker: 'خدماتنا',
      title: 'حلول تسويقية متكاملة',
      digitalLabel: 'خدمات التسويق الرقمية',
      offlineLabel: 'خدمات التسويق غير الرقمية',
      digital: [
        {
          n: '01',
          title: 'إدارة محتوى المتاجر الرقمية',
          body: 'نكتب ونصمم محتوى يخلي الزائر يتحول لعميل، من وصف المنتجات للرسائل الترويجية.',
        },
        {
          n: '02',
          title: 'إدارة الحملات الإعلانية الممولة',
          body: 'نحلل المنافسين، نبني خطة واضحة، ونطلق حملات بإنتاج احترافي يخدم الهدف.',
        },
        {
          n: '03',
          title: 'إدارة حسابات التواصل الاجتماعي',
          body: 'خطة محتوى مدروسة ومحتوى بصري وكتابي يخليك مميز ويكبر حضورك بالسوق.',
        },
        {
          n: '04',
          title: 'صفحات الهبوط (Landing Pages)',
          body: 'صفحات تقنع الزائر وتدفعه يتخذ القرار، مع نصوص مدروسة ترفع التحويل.',
        },
        {
          n: '05',
          title: 'برامج الولاء',
          body: 'برامج تخلي العميل يرجع لك مرة ومرات، بحوافز ذكية تعزز الارتباط بعلامتك.',
        },
        {
          n: '06',
          title: 'محتوى صوتك الخاص',
          body: 'نبني لك أسلوبك الخاص بالكلام، سواء كنت قائد أو رائد أعمال أو مؤثر.',
        },
      ],
      offline: [
        {
          n: '07',
          title: 'الهوية وبناء العلامة التجارية',
          body: 'هوية متكاملة تعكسك فعلاً، من الرسالة والشعار إلى أدق التفاصيل.',
        },
        {
          n: '08',
          title: 'الملف التعريفي',
          body: 'ملف تعريفي احترافي يبرزك قدام العملاء والشركاء بشكل قوي ومرتب.',
        },
        {
          n: '09',
          title: 'الإنتاج البصري',
          body: 'تصميم وتصوير احترافي يشمل البورتريه، المنتجات، الإعلانات، المرافق، والفعاليات.',
        },
        {
          n: '10',
          title: 'التقارير والمواد المؤسسية',
          body: 'نحوّل الأرقام لشيء بصري مفهوم واحترافي يعكس إنجازاتك ويرفع مصداقيتك.',
        },
        {
          n: '11',
          title: 'الشاشات واللوحات الإعلانية الذكية',
          body: 'حلول إعلانية متكاملة تشمل التصميم والتركيب والتنفيذ بتقنيات ذكية.',
        },
        {
          n: '12',
          title: 'إدارة وتصميم الفعاليات',
          body: 'من أول فكرة إلى آخر تفصيلة — تجربة كاملة تعكس هويتك وما تُنسى.',
        },
        {
          n: '13',
          title: 'الهدايا التذكارية',
          body: 'تصميم وتنفيذ هدايا بهوية علامتك: تنأخذ، وتنحفظ، وتنذكر.',
        },
        {
          n: '14',
          title: 'الإعلانات الخارجية',
          body: 'تصاميم وتنفيذ إعلانات تخلي علامتك تنشاف بقوة في الأماكن العامة.',
        },
        {
          n: '15',
          title: 'الدورات التدريبية',
          body: 'دورات عملية ومركّزة لتطوير مهاراتك ورفع كفاءتك في مجالك.',
        },
      ],
    },
    clients: {
      kicker: 'عملاؤنا',
      title: '+50 عميل يثق بسلوك',
      sub: 'شراكات مع جهات حكومية وشركات رائدة في المملكة.',
      // TODO: replace placeholder names with real logo SVGs/PNGs
      list: [
        'السعودية',
        'مطارات جدة',
        'مطار الملك عبدالعزيز',
        'الهيئة الملكية لمكة',
        'بنك الرياض',
        'أمانة جدة',
        'موسم الرياض',
        'التنفيذي',
        'مطار الملك خالد',
        'Cluster 2',
        'DACO',
        'مطار البحر الأحمر',
        'دافع',
        'وزارة الصحة',
      ],
    },
    contact: {
      kicker: 'تواصل معنا',
      title: 'جاهزين نبدأ',
      sub: 'إذا تبي حضور ينشاف، اسم يثبت، ونتيجة تنحس — أنت عارف وين تروح.',
      form: {
        name: 'الاسم',
        email: 'البريد الإلكتروني',
        service: 'الخدمة المطلوبة',
        message: 'تفاصيل المشروع',
        send: 'إرسال الطلب',
        sending: 'جاري الإرسال...',
        whatsapp: 'تواصل عبر واتساب',
        selectService: 'اختر خدمة',
      },
      cards: {
        phone: 'الهاتف',
        email: 'البريد الإلكتروني',
        website: 'الموقع',
        location: 'العنوان',
        address: 'جدة - حي البساتين، King of the Royal Hall',
      },
      snack: {
        success: 'تم إرسال رسالتك — راح نتواصل معك قريب',
        errors: {
          missing_fields: 'فضلاً عبّي كل الحقول',
          invalid_email: 'البريد الإلكتروني غير صالح',
          message_too_long: 'الرسالة طويلة جداً',
          server_error: 'خطأ بالخادم، حاول مرة ثانية',
        },
        errorFallback: 'حدث خطأ، حاول مرة أخرى',
      },
    },
    footer: {
      tagline: 'منظومة متكاملة لذكاء التسويق',
      rights: 'جميع الحقوق محفوظة',
    },
  },

  en: {
    dir: 'ltr',
    nav: {
      about: 'About',
      process: 'Process',
      services: 'Services',
      clients: 'Clients',
      contact: 'Contact',
      cta: 'Start a project',
    },
    hero: {
      eyebrow: 'Marketing Intelligence Ecosystem',
      title1: 'Not just an agency.',
      title2: 'A different conduct.',
      subtitle:
        'We make you seen, understood, and chosen. We turn your idea from "ordinary" into something the market stops at.',
      primary: 'Start a project',
      secondary: 'Learn more',
      stats: [
        { value: '+50', label: 'Clients' },
        { value: '15', label: 'Services' },
        { value: '4', label: 'Step process' },
      ],
    },
    about: {
      kicker: 'Who we are',
      title: 'Not every kind of marketing works',
      lead:
        "There's marketing that moves... and marketing that lands. We work on what lands.",
      points: [
        {
          title: 'We start from the ground up',
          body: 'We actually understand your customer, and we read where the market is heading.',
        },
        {
          title: 'We build a strong idea',
          body: 'A message that sticks, and work that demands attention without asking for it.',
        },
        {
          title: 'We work like the project is ours',
          body: 'And we deliver a result that says: "There\'s serious work here."',
        },
      ],
      whyKicker: 'Why Slook?',
      whyTitle: "Because we don't work randomly",
      whyPoints: [
        'We analyze deeply',
        'We think boldly',
        'We execute precisely',
        'Every step is measured. Every idea has a purpose.',
      ],
      whyClose: 'We don\'t do "good enough". We do "this is the right way".',
    },
    process: {
      kicker: 'How we work',
      title: 'We walk with you from start to finish',
      steps: [
        { num: '01', title: 'Understand', body: 'Your project, your audience, your market.' },
        { num: '02', title: 'Plan', body: 'An idea and a strategy that lands.' },
        { num: '03', title: 'Execute', body: 'Professional work that shows.' },
        { num: '04', title: 'Evolve', body: 'We refine and lift the result, continuously.' },
      ],
    },
    services: {
      kicker: 'Services',
      title: 'End-to-end marketing solutions',
      digitalLabel: 'Digital marketing',
      offlineLabel: 'Brand & offline marketing',
      digital: [
        {
          n: '01',
          title: 'E-commerce content management',
          body: 'Copy and design that turn visitors into customers — from product descriptions to promotional messages.',
        },
        {
          n: '02',
          title: 'Paid advertising campaigns',
          body: 'Competitor analysis, clear strategy, and pro production. We track performance and optimize for ROI.',
        },
        {
          n: '03',
          title: 'Social media management',
          body: 'Researched content plans plus visual and written content that grows your presence in the market.',
        },
        {
          n: '04',
          title: 'Landing pages',
          body: 'Pages that persuade and push the visitor to act, with copy that lifts conversion and builds trust.',
        },
        {
          n: '05',
          title: 'Loyalty programs',
          body: 'Programs that bring customers back again and again with smart incentives that deepen the bond with your brand.',
        },
        {
          n: '06',
          title: 'Personal voice content',
          body: 'We build your distinct voice — whether you\'re a leader, an entrepreneur, or an influencer.',
        },
      ],
      offline: [
        {
          n: '07',
          title: 'Brand identity',
          body: 'A complete identity that actually reflects you — from message and logo to the finest detail.',
        },
        {
          n: '08',
          title: 'Company profiles',
          body: 'A professional profile that presents you to clients and partners with confidence and order.',
        },
        {
          n: '09',
          title: 'Visual production',
          body: 'Professional design and photography: portraits, products, ads, facilities, and events.',
        },
        {
          n: '10',
          title: 'Reports & corporate materials',
          body: 'We turn numbers into a visual story that reflects your achievements and raises your credibility.',
        },
        {
          n: '11',
          title: 'Smart screens & out-of-home',
          body: 'End-to-end advertising solutions: design, installation, and execution with smart tech.',
        },
        {
          n: '12',
          title: 'Event design & management',
          body: 'From first idea to last detail — a full experience that reflects your brand and stays with people.',
        },
        {
          n: '13',
          title: 'Branded gifts',
          body: 'Design and production of gifts in your brand\'s identity: taken, kept, remembered.',
        },
        {
          n: '14',
          title: 'Outdoor advertising',
          body: 'Designs and execution that make your brand visible with force in public spaces.',
        },
        {
          n: '15',
          title: 'Training programs',
          body: 'Practical, focused courses that develop your team\'s skills and lift their capacity.',
        },
      ],
    },
    clients: {
      kicker: 'Our clients',
      title: '50+ brands trust Slook',
      sub: 'Partnerships with government entities and leading companies across Saudi Arabia.',
      // TODO: replace placeholder names with real logo SVGs/PNGs
      list: [
        'Saudia',
        'Jeddah Airports',
        'King Abdulaziz Intl. Airport',
        'Royal Commission for Makkah',
        'Riyad Bank',
        'Jeddah Municipality',
        'Riyadh Season',
        'Altanfeethi',
        'King Khalid Intl. Airport',
        'Cluster 2',
        'DACO',
        'Red Sea Intl. Airport',
        'Dafa',
        'Ministry of Health',
      ],
    },
    contact: {
      kicker: 'Contact',
      title: "Let's get started",
      sub:
        'If you want a presence that\'s seen, a name that sticks, and a result that\'s felt — you know where to go.',
      form: {
        name: 'Name',
        email: 'Email',
        service: 'Service interested in',
        message: 'Project details',
        send: 'Send request',
        sending: 'Sending...',
        whatsapp: 'Chat on WhatsApp',
        selectService: 'Select a service',
      },
      cards: {
        phone: 'Phone',
        email: 'Email',
        website: 'Website',
        location: 'Address',
        address: 'Jeddah — Al Basateen Dist., King of the Royal Hall',
      },
      snack: {
        success: 'Message sent — we\'ll be in touch shortly',
        errors: {
          missing_fields: 'Please fill all fields',
          invalid_email: 'Invalid email address',
          message_too_long: 'Message is too long',
          server_error: 'Server error, try again',
        },
        errorFallback: 'An error occurred. Please try again',
      },
    },
    footer: {
      tagline: 'Marketing Intelligence Ecosystem',
      rights: 'All rights reserved',
    },
  },
}

// Shared constants (language-agnostic)
export const constants = {
  phone: '+966 50 622 8581',
  phoneLink: 'tel:+966506228581',
  whatsapp: 'https://wa.me/966506228581',
  email: 'Info@slook.sa',
  emailLink: 'mailto:Info@slook.sa',
  website: 'Slook.sa',
  websiteLink: 'https://slook.sa',
  social: {
    instagram: 'https://instagram.com/slook.sa',
    twitter: 'https://twitter.com/slook_sa',
    linkedin: 'https://linkedin.com/company/slook',
    tiktok: 'https://tiktok.com/@slook.sa',
  },
}
