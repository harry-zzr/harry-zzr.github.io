const gate = document.getElementById('gate');
const site = document.getElementById('site');
let unlocked = false;
try { unlocked = sessionStorage.getItem('harry-entry') === 'yes'; } catch {}
function route() {
  const category = location.hash.slice(1);
  const empty = category === 'guides' || category === 'math';
  document.getElementById('home-view').hidden = !!category;
  document.getElementById('games-view').hidden = empty;
  document.getElementById('games-title').hidden = category !== 'games';
  document.getElementById('empty-view').hidden = !empty;
  document.getElementById('category-title').textContent = category === 'guides' ? '游戏攻略' : '数学';
  document.querySelectorAll('[data-category]').forEach(link => {
    if (link.dataset.category === category) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
}
function enter(focus) {
  gate.hidden = true;
  site.hidden = false;
  route();
  if (focus) document.getElementById('main').focus();
}
document.getElementById('gate-form').addEventListener('submit', event => {
  event.preventDefault();
  const answer = document.getElementById('answer');
  const accepted = ['炉石', '炉石传说', 'hearthstone'].includes(answer.value.trim().toLowerCase());
  if (!accepted) {
    document.getElementById('error').textContent = '答案不对，再想想？';
    answer.setAttribute('aria-invalid', 'true');
    answer.focus();
    return;
  }
  try { sessionStorage.setItem('harry-entry', 'yes'); } catch {}
  unlocked = true;
  answer.value = '';
  answer.removeAttribute('aria-invalid');
  enter(true);
});
window.addEventListener('hashchange', route);
if (unlocked) enter(false);
