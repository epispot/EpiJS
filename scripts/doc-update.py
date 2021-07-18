with open('../docs/pre.md', 'r') as predoc:
  doc = predoc.readlines()
  doc[21] = '# Pre\n'
  doc[4] = '\n'
  doc[26] = '```javascript\n'
  doc[28] = '```\n'
  doc1 = ['---\n', 'title: EpiJS Module - Pre\n', '---\n']
  doc = doc1+doc

with open('../docs/pre.md', 'w') as predoc:
  predoc.writelines(doc)


with open('../docs/com.md', 'r') as comdoc:
  doc = comdoc.readlines()
  doc[27] = '# Com\n'
  doc[4] = '\n'
  doc[32] = '```javascript\n'
  doc[34] = '```\n'
  doc[133] = 'You can find these names below.\n\n    *   Susceptible - stored as \'S\'\n'
  doc[139] = 'We already have the following parameters:\n    *   Population - stored as \'p\' in our key.\n'
  doc[135] = '    *   Recovered - stored as \'R\'\n\nMake sure that you use the same names that are stored in the key in the equations for the compartments. These values are found from parameters passed into the virus class and the community class.\n\n'
  doc[146] = '    *   Incubation Period - stored as \'a\' in our key.'
  doc1 = ['---\n', 'title: EpiJS Module - Com\n', '---\n']
  doc = doc1+doc

with open('../docs/com.md', 'w') as comdoc:
  comdoc.writelines(doc)

with open('../docs/model.md', 'r') as mdoc:
  doc = mdoc.readlines()
  doc[16] = '# Model\n'
  doc[21] = '```javascript\n'
  doc[23] = '```\n'
  doc[115] = "[1]: #model-2\n"
  doc[119] = '[3]: #get-data\n'
  doc1 = ['---\n', 'title: EpiJS Module - Model\n', '---\n']
  
  for x in range(24, 58):
    doc[x] = ''
  
  for x in range(7, 14):
    doc[x] = ''

  doc = doc1+doc


with open('../docs/model.md', 'w') as mdoc:
  mdoc.writelines(doc)

with open('../docs/comp.md', 'r') as compdoc:
  doc = compdoc.readlines()
  doc[4] = '\n'
  doc[33] = '# Comp'
  doc[38] = '```javascript\n'
  doc[40] = '```\n'
  doc[48] = '    If using other compartment classes, they each have their own corresponding variable: \n     *  \'S\' - Susceptible\n'
  
  doc1 = ['---\n', 'title: EpiJS Module - Comp\n', '---\n']
  doc = doc1+doc

with open('../docs/comp.md', 'w') as compdoc:
  compdoc.writelines(doc)

with open('../docs/utils.md', 'r') as utils:
  doc = utils.readlines()
  doc[4] = '\n'
  doc[5] = '\n'
  doc[13] = '# Utils\n'
  doc[18] = '```javascript\n'
  doc[20] = '```\n'
  for x in range(21, 26):
    doc[x] = ''

with open('../docs/utils.md', 'w') as utils:       
  utils.writelines(doc)

with open('../docs/plots.md', 'r') as plots:
  doc = plots.readlines()
  doc[4] = '\n'
  doc[9] = '## Plot\n'
  doc[14] = '```javascript\n'
  doc[16] = '```\n'
  doc[27] = '*   `options` **[Object][8]** Optional. Custom configuration to pass into the options parameter for chart.js, defaults to:\n```JSON\n'
  doc[41] = '```'

with open('../docs/plots.md', 'w') as plots:
  plots.writelines(doc)