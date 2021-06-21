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
  doc[24] = '# Com\n'
  doc[4] = '\n'
  doc[29] = '```javascript\n'
  doc[31] = '```\n'
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
  doc[119] = '[3]: #get-data'
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
  doc[9] = '# Comp'
  doc[14] = '```javascript\n'
  doc[16] = '```\n'
  doc[19] = 'Class for custom compartments.\n'
  
  doc1 = ['---\n', 'title: EpiJS Module - Comp\n', '---\n']
  doc = doc1+doc

with open('../docs/comp.md', 'w') as compdoc:
  compdoc.writelines(doc)