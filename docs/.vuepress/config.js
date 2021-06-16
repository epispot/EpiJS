module.exports = {
    title: 'EpiJS',
    description: 'A disease modeling package for JS.',
    themeConfig: {
      nav: [
        { text: 'Documentation', link: '/getting-started' },
        { text: 'Demo', link: '/demo/index.html'},
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
    }
  };
