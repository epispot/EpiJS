with open('../docs/pre.md', 'r') as predoc:
  doc = predoc.readlines()
  doc[4] = '\n'
  doc[18] = '# Pre\n'
  doc[23] = '```javascript\n'
  doc[25] = '```\n'
  doc1 = ['---\n', 'title: EpiJS Module - Pre\n', '---\n']
  doc = doc1+doc

with open('../docs/pre.md', 'w') as predoc:
  predoc.writelines(doc)

with open('../docs/model.md', 'r') as mdoc:

  doc = mdoc.readlines()
  doc[4] = '\n'
  doc[24] = '# Model\n'
  doc[29] = '```javascript\n'
  doc[31] = '```\n'
  doc[196] = "[1]: #model-2\n"
  doc[204] = '[5]: #get-data\n'
  doc1 = ['---\n', 'title: EpiJS Module - Model\n', '---\n']
  doc = doc1+doc

with open('../docs/model.md', 'w') as mdoc:
  mdoc.writelines(doc)


with open('../docs/comp.md', 'r') as compdoc:
  doc = compdoc.readlines()
  doc[4] = '\n'
  doc[52] = '# Comp'
  doc[57] = '```javascript\n'
  doc[59] = '```\n'
  
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
  doc[9] = '# Plot\n'
  doc[14] = '```javascript\n'
  doc[16] = '```\n'

with open('../docs/plots.md', 'w') as plots:
  plots.writelines(doc)