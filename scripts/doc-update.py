with open('../docs/pre.md', 'r') as predoc:
  doc = predoc.readlines()
  doc[22] = '# Pre\n'
  doc[5] = '\n'
  doc[4] = '\n'

with open('../docs/pre.md', 'w') as predoc:
  predoc.writelines(doc)