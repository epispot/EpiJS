with open('../docs/pre.md', 'r') as predoc:
  doc = predoc.readlines()
  doc[21] = '# Pre\n'
  doc[4] = '\n'

with open('../docs/pre.md', 'w') as predoc:
  predoc.writelines(doc)