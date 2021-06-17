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
  doc[16] = '# Com\n'
  doc[4] = '\n'
  doc[21] = '```javascript\n'
  doc[23] = '```\n'
  doc1 = ['---\n', 'title: EpiJS Module - Com\n', '---\n']
  doc = doc1+doc

with open('../docs/com.md', 'w') as comdoc:
  comdoc.writelines(doc)