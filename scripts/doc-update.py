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
  doc1 = ['---\n', 'title: EpiJS Module - Com\n', '---\n']
  doc = doc1+doc

with open('../docs/com.md', 'w') as comdoc:
  comdoc.writelines(doc)

with open('../docs/model.md', 'r') as mdoc:
  doc = mdoc.readlines()
  doc[16] = '# Model\n'
  doc[21] = '```javascript\n'
  doc[23] = '```\n'
  doc[77] = "[1]: #model-2\n"
  doc[81] = '[3]: #get-data\n'
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