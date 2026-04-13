

// index.js içinde Firebase config kısmı:
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_FIREBASE_DB_URL,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const chatRef = database.ref('messages');

const input = document.getElementById('chat-input');
const nameInput = document.getElementById('user-name');
const sendBtn = document.getElementById('chat-send');
const display = document.getElementById('chat-display');

function sendMessage() {
    const name = nameInput.value.trim() || "GUEST";
    const text = input.value.trim();
    if (text) {
        chatRef.push({ name: name.toUpperCase(), text: text, timestamp: Date.now() });
        input.value = "";
    }
}
sendBtn.onclick = sendMessage;
input.onkeypress = (e) => { if (e.key === 'Enter') sendMessage(); };

chatRef.limitToLast(80).on('value', (snapshot) => {
    display.innerHTML = "";
    snapshot.forEach((child) => {
        const d = child.val();
        display.innerHTML += `<div><span style="color:red;">[${d.name}]</span>: ${d.text}</div>`;
    });
    display.scrollTop = display.scrollHeight;
});


const pupils = document.querySelectorAll('.pupil');
const eyes = document.querySelectorAll('.eye-container');
document.onmousemove = (e) => {
    pupils.forEach((p, i) => {
        const r = eyes[i].getBoundingClientRect();
        const eyeX = r.left + r.width / 2;
        const eyeY = r.top + r.height / 2;
        const angle = Math.atan2(e.clientY - eyeY, e.clientX - eyeX);
        const dist = Math.min(Math.hypot(e.clientX - eyeX, e.clientY - eyeY) / 30, 5);
        p.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px)`;
    });
};

function openAbout() { document.getElementById('about-modal').style.display = 'flex'; }
function closeAbout() { document.getElementById('about-modal').style.display = 'none'; }
function openProjects() { document.getElementById('project-modal').style.display = 'flex'; }
function closeModal() { document.getElementById('project-modal').style.display = 'none'; }

setInterval(() => {
    document.getElementById('mem-usage').innerText = Math.floor(Math.random() * 10 + 45) + "%";
}, 3000);

function updateSecurity() {
    const secBox = document.getElementById('security-live');
    if (!secBox) return;
    const ip = `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
    const status = Math.random() > 0.8 ? '<span style="color:red;">[THREAT_DETECTED]</span>' : '<span style="color:#0f0;">[SECURE]</span>';
    secBox.innerHTML = `<div>IP_SOURCE: ${ip}</div><div>STATUS: ${status}</div><div>UPLINK: ${Math.floor(Math.random() * 900 + 100)} KB/s</div>`;
}
setInterval(updateSecurity, 4000);
updateSecurity();

const logLines = ["> INITIALIZING...", "> LOADED: [OK]", "> SAT_LINK: CONNECTED", "> ACCESS: KAEL_ROOT"];
function updateLogs() {
    const logBox = document.getElementById('logs');
    if (!logBox) return;
    const line = logLines[Math.floor(Math.random() * logLines.length)];
    const div = document.createElement('div');
    div.innerText = line;
    logBox.appendChild(div);
    if (logBox.childNodes.length > 5) logBox.removeChild(logBox.childNodes[0]);
}
setInterval(updateLogs, 2500);