with open('../docs/pre.md', 'r') as predoc:
  doc = predoc.readlines()
  doc[19] = ''

with open('../docs/pre.md', 'w') as predoc:
  predoc.writelines(doc)
