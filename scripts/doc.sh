documentation build EpiJS/pre.js -f md > docs/pre.md 
documentation build EpiJS/comp.js -f md > docs/comp.md 
documentation build EpiJS/com.js -f md > docs/com.md
documentation build EpiJS/model.js -f md > docs/model.md
documentation build EpiJS/utils.js -f md > docs/utils.md
cd scripts 
python doc-update.py
cd .. 
vuepress dev docs