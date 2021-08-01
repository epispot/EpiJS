module.exports = {
    title: 'EpiJS',
    description: 'A disease modeling package for JS.',
    base: '/v1.3.0',
    themeConfig: {
      nav: [
        { text: 'Documentation', link: '/getting-started' },
        { text: 'Demo', link: 'https://epi.js.org/demo/index.html'},
        { text: 'GitHub', link: 'https://github.com/Quantalabs/EpiJS'}
      ],
      sidebar: [
        {
          title: "Introduction",
          collapsable: false,
          children: [
            ['getting-started', 'Getting Started']
          ]
        },
        {
          title: 'Module Docs',
          collapsable: false,
          children: [
            ['pre', 'Pre Module'],
            ['com', 'Com Module'],
            ['comp', 'Comp Module'],
            ['model', 'Model Module']
          ]
        }
      ]
    },
    head: [
      ['link', { rel: "shortcut icon", href: "https://i.ibb.co/HKt7Bn3/Logo-Makr-4sk-LGO.png"}],
      ['meta', { name: "description", content: "A disease modelling package for JavaScript."}]
    ]
  };
