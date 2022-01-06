documentation build EpiJS/pre.js -f md > docs/pre.md --shallow
documentation build EpiJS/comp.js -f md > docs/comp.md --shallow
documentation build EpiJS/model.js -f md > docs/model.md --shallow
documentation build EpiJS/utils.js -f md > docs/utils.md --shallow
documentation build EpiJS/plots.js -f md > docs/plots.md --shallow
cd scripts 
python doc-update.py
cd .. 
vuepress build docs