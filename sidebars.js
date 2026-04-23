/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  standardSidebar: [
    {
      type: 'doc',
      id: 'index',
      label: 'What is BASIS?',
    },
    {
      type: 'category',
      label: 'The Six Layers',
      collapsed: false,
      items: [
        'layers/car',
        'layers/intent',
        'layers/enforce',
        'layers/trust',
        'layers/proof',
        'layers/chain',
      ],
    },
    {
      type: 'category',
      label: 'Specification',
      items: [
        'spec/overview',
        'spec/capabilities',
        'spec/risk-classification',
        'spec/trust-scoring',
        'spec/policies',
        'spec/audit-logging',
        'spec/regulatory-compliance',
      ],
    },
    {
      type: 'category',
      label: 'Compliance',
      link: {
        type: 'doc',
        id: 'compliance',
      },
      items: [
        'spec/regulatory-compliance',
        'implement/compliance-tests',
        'implement/certification',
      ],
    },
    {
      type: 'category',
      label: 'Implementation',
      items: [
        'implement/getting-started',
      ],
    },
    {
      type: 'category',
      label: 'Products',
      collapsed: false,
      items: [
        'cognigate',
        'vorion-platform',
      ],
    },
    {
      type: 'doc',
      id: 'community',
      label: 'Community',
    },
  ],
};

export default sidebars;
