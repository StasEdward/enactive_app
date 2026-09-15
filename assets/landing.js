const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let paused = reducedMotion.matches;
let phase = paused ? 3 : 0;
let ticks = 0;
let detail = 'execution';
let view = 'execution';
const $ = (selector) => document.querySelector(selector);
const logs = [
 ['23:50:53.143', 'System', 'Enactive UI started — workspace connected.'],
 ['23:50:54.110', 'Host', 'Local provider connected: ollama.'],
 ['23:50:55.208', 'Planner', 'Documentation Sync — 2 steps planned.'],
 ['23:50:57.392', 'Tool', 'read_file → README.md · success'],
 ['23:51:02.185', 'Tool', 'edit_file → README.md · +16 lines'],
 ['23:51:06.420', 'Reviewer', 'Review passed. Artifact ready.']
];
function renderDetails() {
 const completed = phase === 3;
 if (detail === 'execution') {
  $('#detail-content').innerHTML = `<article class="step-card ${phase === 0 ? 'working' : ''}"><h4>Analyze codebase functionality</h4><div class="step-state">${phase === 0 ? '● Running' : '✓ Done'}</div><p>⌄ Used 7 tools · 3 notes</p><div class="tool-entry"><span>▤</span>Read README.md<small>read_file → ok · Project structure and build instructions</small></div><div class="tool-entry"><span>▤</span>Listed Src and DevOps<small>list_dir → ok · Gate.Ate / Gate.Commons / Gate.Db / Gate.Driver</small></div><div class="review-line"><span>${phase === 0 ? '◌' : '✓'}</span> ${phase === 0 ? 'Comparing documentation with the workspace…' : 'Codebase analyzed. Documentation changes identified.'}</div></article><article class="step-card ${phase === 0 ? 'pending' : !completed ? 'working' : ''}"><h4>Update or create README.md</h4><div class="step-state">${phase === 0 ? '○ Pending' : completed ? '✓ Done' : '● Running'}</div><p>⌄ Used 1 tool · 4 notes</p><div class="tool-entry"><span>▤</span>${phase < 2 ? 'Prepare documentation changes' : 'Ran edit_file'}<small>${phase < 2 ? 'Waiting for workspace analysis' : 'edit_file → ok · README.md updated (+16 lines)'}</small></div><div class="review-line"><span>${completed ? '✓' : '◌'}</span> ${completed ? 'PASS (Content review): documentation matches the codebase.' : phase === 2 ? 'Reviewing changes against tool results…' : 'Artifact: README.md'}</div></article>`;
 } else if (detail === 'artifacts') {
  $('#detail-content').innerHTML = `<article class="artifact-result"><span class="tiny-label">${completed ? 'GENERATED ARTIFACT' : 'ARTIFACT PREVIEW · RUN IN PROGRESS'}</span><h4>▤ README.md</h4><p>${completed ? 'Documentation updated to reflect the current workspace.' : 'The artifact will be ready when the demonstration finishes.'}</p><pre># GATE\n\n## Project structure\n+ Src/ — application source\n+ DevOps/Build/ — build pipelines\n+ DevOps/Deploy/ — deployment configuration\n+ DevOps/Scripts/ — maintenance scripts</pre><span class="green">${completed ? '✓ Content review passed' : '◌ Review pending'}</span></article>`;
 } else {
  const events = ['Task created · Documentation Sync', 'Workspace analysis completed', 'README.md updated · 1 artifact', 'Review passed · Run completed'];
  $('#detail-content').innerHTML = events.slice(0,phase + 1).map((event,i)=>`<div class="timeline-row"><small>00:${String(i*6).padStart(2,'0')}</small>${event}</div>`).join('');
 }
}
function render() {
 const completed = phase === 3;
 $('#run-status').textContent = completed ? 'Completed' : 'Running';
 $('#run-status').classList.toggle('running', !completed);
 $('#side-status').textContent = completed ? 'Completed' : 'Running';
 $('#step-count').textContent = completed ? '2 / 2 steps' : `${phase > 0 ? 1 : 0} / 2 steps`;
 $('#artifact-count').textContent = phase > 1 ? '1' : '0';
 $('#tool-count').textContent = ['3','7','8','8'][phase];
 $('#elapsed').textContent = ['06s','10s','15s','18s'][phase];
 $('#log-lines').innerHTML = logs.slice(0,Math.min(6,phase+3)).map(([time,source,message])=>`<div class="log-line"><span>${time}</span><span>INF</span><span>${source}</span><span>${message}</span></div>`).join('');
 renderDetails();
}
function setPaused(value) {
 paused = value;
 document.body.classList.toggle('paused', paused);
 $('#motion-toggle').setAttribute('aria-pressed',String(paused));
 $('#motion-toggle').textContent = paused ? '▷ Play animation' : 'Ⅱ Pause animation';
}
function selectTab(button, selector) {
 document.querySelectorAll(selector).forEach(tab => {
  const selected = tab === button;
  tab.setAttribute('aria-selected', String(selected));
  tab.tabIndex = selected ? 0 : -1;
 });
}
document.querySelectorAll('[data-view]').forEach(button => button.addEventListener('click', () => {
 view = button.dataset.view;
 selectTab(button,'[data-view]');
 document.querySelectorAll('.preview-view').forEach(panel => panel.hidden = panel.id !== `${view}-view`);
 $('#preview-number').textContent = {execution:'01',providers:'02',logs:'03'}[view];
 $('#window-label').textContent = {execution:'',providers:'— Settings',logs:'— Global Log'}[view];
}));
document.querySelectorAll('[data-detail]').forEach(button=>button.addEventListener('click',()=>{
 detail = button.dataset.detail;
 selectTab(button,'[data-detail]');
 renderDetails();
}));
document.querySelectorAll('[role=tablist]').forEach(tablist => {
 const tabs = [...tablist.querySelectorAll('[role=tab]')];
 tabs.forEach((tab,index)=>{
  tab.tabIndex = index === 0 ? 0 : -1;
  tab.addEventListener('keydown',event=>{
   let next;
   if(event.key==='ArrowRight') next=(index+1)%tabs.length;
   if(event.key==='ArrowLeft') next=(index+tabs.length-1)%tabs.length;
   if(event.key==='Home') next=0;
   if(event.key==='End') next=tabs.length-1;
   if(next!==undefined){event.preventDefault();tabs[next].focus();tabs[next].click();}
  });
 });
});
$('#run-demo').addEventListener('click',()=>{
 phase=0;ticks=0;detail='execution';
 selectTab($('[data-detail=execution]'),'[data-detail]');
 setPaused(false);render();
});
$('#motion-toggle').addEventListener('click',()=>setPaused(!paused));
reducedMotion.addEventListener('change',event=>{if(event.matches){phase=3;setPaused(true);render();}});
setPaused(paused);render();
setInterval(()=>{
 if(paused || document.hidden) return;
 ticks++;
 if(ticks >= (phase===3 ? 8 : 3)){phase=(phase+1)%4;ticks=0;render();}
},1000);
