module.exports = {
    title: 'EpiJS',
    description: 'A disease modeling package for JS.',
    themeConfig: {
      nav: [
        { text: 'Documentation', link: '/getting-started' }
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