"""
with open('../docs/pre.md', 'r') as predoc:
  doc = predoc.readlines()
  doc[18] = '# Pre\n'
  doc[4] = ''

with open('../docs/pre.md', 'w') as predoc:
  predoc.writelines(doc)
"""
