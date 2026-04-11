/* BadTowel Markdown Renderer */
function escapeHtml(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}

function inlineFormat(text){
  // inline code first
  let r='',i=0;
  while(i<text.length){if(text[i]==='`'){const e=text.indexOf('`',i+1);if(e!==-1){r+=`<code>${escapeHtml(text.slice(i+1,e))}</code>`;i=e+1;continue}}r+=text[i];i++}
  text=r;
  text=text.replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>');
  text=text.replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g,'<em>$1</em>');
  text=text.replace(/~~(.+?)~~/g,'<del>$1</del>');
  return text;
}

function parseTable(lines){
  if(lines.length<2)return lines.map(l=>`<p>${inlineFormat(l)}</p>`).join('');
  const pr=l=>l.split('|').slice(1,-1).map(c=>c.trim());
  const headers=pr(lines[0]),rows=lines.slice(2).map(pr);
  let h='<table><thead><tr>';headers.forEach(c=>{h+=`<th>${inlineFormat(c)}</th>`});h+='</tr></thead><tbody>';
  rows.forEach(row=>{h+='<tr>';row.forEach(c=>{h+=`<td>${inlineFormat(c)}</td>`});h+='</tr>'});
  return h+'</tbody></table>';
}

function renderMarkdown(body,opts={}){
  const lines=body.split('\n');let html='',inCode=false,codeContent='',codeLang='',tableBuffer=[],hIdx=0;
  function flushTable(){if(tableBuffer.length>0){html+=parseTable(tableBuffer);tableBuffer=[]}}
  for(let i=0;i<lines.length;i++){
    const line=lines[i];
    if(line.trimStart().startsWith('```')){flushTable();if(!inCode){inCode=true;codeLang=line.trimStart().slice(3).trim();codeContent=''}else{
      // Terminal-style code block
      html+=`<div class="code-terminal"><div class="code-terminal-bar"></div><div class="code-terminal-body">${escapeHtml(codeContent.replace(/\n$/,''))}</div></div>`;
      inCode=false;codeContent='';codeLang=''}continue}
    if(inCode){codeContent+=line+'\n';continue}
    if(line.trimStart().startsWith('|')&&line.trimEnd().endsWith('|')){tableBuffer.push(line);continue}else{flushTable()}
    const hm=line.match(/^(#{1,3})\s+(.+)/);
    if(hm){const lv=hm[1].length,txt=inlineFormat(hm[2]),id=opts.addIds?` id="h-${hIdx++}"`:'',sm=opts.addIds?' scroll-margin-top:80px;':'';
      if(lv===1)html+=`<h1${id} style="font-family:'Noto Serif SC',serif;font-size:1.35rem;font-weight:700;margin-top:2rem;margin-bottom:.875rem;color:var(--gray-900);${sm}">${txt}</h1>`;
      else if(lv===2)html+=`<h2${id} style="font-family:'Noto Serif SC',serif;font-size:1.15rem;font-weight:700;margin-top:1.75rem;margin-bottom:.625rem;color:var(--gray-900);${sm}">${txt}</h2>`;
      else html+=`<h3${id} style="font-family:'Noto Sans SC',sans-serif;font-size:1rem;font-weight:600;margin-top:1.25rem;margin-bottom:.5rem;color:var(--gray-800);${sm}">${txt}</h3>`;
      continue}
    if(line.trim()===''){html+='<div style="height:10px;"></div>';continue}
    if(line.startsWith('> ')){html+=`<blockquote style="border-left:3px solid var(--color-accent);padding-left:1rem;color:var(--gray-500);margin:.75rem 0;font-style:italic;">${inlineFormat(line.slice(2))}</blockquote>`;continue}
    let p=inlineFormat(line);
    if(opts.linkReplacer)p=p.replace(/\{\{(.+?)\|\|(.+?)\|\|(.+?)\}\}/g,opts.linkReplacer);
    html+=`<p style="margin-bottom:.5rem;line-height:2;">${p}</p>`;
  }
  flushTable();if(inCode)html+=`<div class="code-terminal"><div class="code-terminal-bar"></div><div class="code-terminal-body">${escapeHtml(codeContent.replace(/\n$/,''))}</div></div>`;
  return html;
}

function extractHeadings(body){
  const h=[];let idx=0,inCode=false;
  for(const line of body.split('\n')){if(line.trimStart().startsWith('```')){inCode=!inCode;continue}if(inCode)continue;const m=line.match(/^(#{1,3})\s+(.+)/);if(m)h.push({level:m[1].length,text:m[2],id:`h-${idx++}`})}
  return h;
}

window.__BT_MD={renderMarkdown,extractHeadings,inlineFormat};
