module.exports = {
    title: 'EpiJS',
    description: 'A disease modeling package for JS.',
    themeConfig: {
      nav: [
        { text: 'Documentation', link: '/getting-started' },
        { text: 'Demo', link: 'https://epi.js.org/demo/index.html'},
        { text: 'GitHub', link: 'https://github.com/Quantalabs/EpiJS'}
      ],
      sidebar: [
        {
          title: 'EpiJS',
          collapsable: false,
          children: [
            ['getting-started', 'Getting Started'],
            ['pre', 'Pre']
          ]
        }
      ]
    },
    head: [
      ['link', { rel: "shortcut icon", href: "https://i.ibb.co/HKt7Bn3/Logo-Makr-4sk-LGO.png"}],
      ['meta', { name: "description", content: "A disease modelling package for JavaScript."}]
    ]
  };
