with open('../docs/pre.md', 'r') as predoc:
  doc = predoc.readlines()
  doc[21] = '# Pre\n'
  doc[4] = '\n'
  doc1 = ['---\n', 'title: EpiJS Module - Pre\n', '---\n']
  doc = doc1+doc

with open('../docs/pre.md', 'w') as predoc:
  predoc.writelines(doc)