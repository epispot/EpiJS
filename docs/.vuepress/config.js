module.exports = {
    title: 'EpiJS',
    description: 'A disease modeling package for JS.',
    plugins: [ 
      'tabs',
      '@vuepress/back-to-top',
      '@vuepress/nprogress'
    ],
    base: '/latest/',
    theme: "vt",
    themeConfig: {
      enableDarkMode: true,
      nav: [
        { text: 'Documentation', link: '/getting-started' },
        { text: 'Demo', link: 'https://epi.js.org/demo/index.html'},
        { text: 'GitHub', link: 'https://github.com/epispot/EpiJS'}
      ],
      logo: 'https://i.ibb.co/HKt7Bn3/Logo-Makr-4sk-LGO.png',
      sidebar: [
        {
          title: "Introduction",
          children: [
            ['getting-started', 'Getting Started'],
            ['installation', 'Installation']
          ]
        },
        {
          title: 'Module Docs',
          children: [
            ['pre', 'Pre Module'],
            ['comp', 'Comp Module'],
            ['model', 'Model Module'],
            ['utils', 'Utils Module'],
            ['plots', 'Plots Module'],
          ]
        },
        {
          title: 'The EpiJS Manual',
          children: [
            ['manual/SIR', 'SIR Models'],
            ['manual/migration', 'Migration'],
          ]
        }
      ]
    },
    head: [
      ['link', { rel: "shortcut icon", href: "https://i.ibb.co/HKt7Bn3/Logo-Makr-4sk-LGO.png"}],
      ['meta', { name: "description", content: "A disease modelling package for JavaScript."}]
    ]
  };
