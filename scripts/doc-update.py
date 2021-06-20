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
  doc[22] = '# Com\n'
  doc[4] = '\n'
  doc[27] = '```javascript\n'
  doc[29] = '```\n'
  doc1 = ['---\n', 'title: EpiJS Module - Com\n', '---\n']
  doc = doc1+doc

with open('../docs/com.md', 'w') as comdoc:
  comdoc.writelines(doc)

with open('../docs/model.md', 'r') as mdoc:
  doc = mdoc.readlines()
  doc[15] = '# Model\n'
  doc[20] = '```javascript\n'
  doc[22] = '```\n## Model\nCreate custom models from compartments.\n'
  doc[95] = "[1]: #model-2\n"
  doc1 = ['---\n', 'title: EpiJS Module - Model\n', '---\n']
  
  for x in range(57, 95):
    doc[x] = ''

  doc = doc1+doc


with open('../docs/model.md', 'w') as mdoc:
  mdoc.writelines(doc)

with open('../docs/comp.md', 'r') as compdoc:
  doc = compdoc.readlines()
  doc[4] = '\n'
  doc[8] = '# Comp'
  doc[13] = '```javascript\n'
  doc[15] = '```\n'
  doc[18] = 'Class for custom compartments.\n'
  
  doc1 = ['---\n', 'title: EpiJS Module - Comp\n', '---\n']
  doc = doc1+doc

with open('../docs/comp.md', 'w') as compdoc:
  compdoc.writelines(doc)