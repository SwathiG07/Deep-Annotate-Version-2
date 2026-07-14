const fs = require('fs');

// 1. Fix about.html - remaining 2 emojis in "Why Enterprises Trust Us"
let about = fs.readFileSync('about.html', 'utf8');

about = about.replace('<h4 class="trt"><span class="tri">&#129309;</span> SLA-Backed Quality</h4>', '<h4 class="trt">SLA-Backed Quality</h4>');
about = about.replace('<h4 class="trt"><span class="tri">&#128273;</span> Secured Delivery Centers</h4>', '<h4 class="trt">Secured Delivery Centers</h4>');

// 2. Fix about.html - "Trusted & Certified" - 8 companies
// Replace emojis with clean SVG icons (or remove them and just style the text) and change font
const trustedSectionOld = `    <div class="awg">
      <div class="awb rev d1">&#127963;&#65039; T-Hub Innovation Campus</div>
      <div class="awb rev d2">&#9729;&#65039; AWS Partner Network</div>
      <div class="awb rev d3">&#129001; Google Cloud Partner</div>
      <div class="awb rev d4">&#128309; Microsoft Azure Certified</div>
      <div class="awb rev d1">&#129001; NVIDIA Preferred Partner</div>
      <div class="awb rev d2">&#128737;&#65039; ISO 9001 Process Ready</div>
      <div class="awb rev d3">&#128274; SOC2 Type II Ready</div>
      <div class="awb rev d4">&#9989; HIPAA Compliant Capable</div>
    </div>`;

const trustedSectionNew = `    <div class="awg" style="font-family: 'Inter', sans-serif;">
      <div class="awb rev d1">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #0BA8D3; margin-right: 8px;"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
        T-Hub Innovation Campus
      </div>
      <div class="awb rev d2">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #FF9900; margin-right: 8px;"><path d="M17.5 19c-2.5 2-5.5 2.5-8.5 1.5s-5.5-3.5-6.5-6.5.5-6 3-8S12 4 14.5 5.5"></path><path d="M22 2L15 8"></path><path d="M22 2l-3 7"></path></svg>
        AWS Partner Network
      </div>
      <div class="awb rev d3">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #4285F4; margin-right: 8px;"><path d="M17.5 19c-2.5 2-5.5 2.5-8.5 1.5s-5.5-3.5-6.5-6.5.5-6 3-8S12 4 14.5 5.5"></path><path d="M22 2L15 8"></path><path d="M22 2l-3 7"></path></svg>
        Google Cloud Partner
      </div>
      <div class="awb rev d4">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #00A4EF; margin-right: 8px;"><path d="M2 12h20"></path><path d="M12 2v20"></path><path d="M5 5h14v14H5z"></path></svg>
        Microsoft Azure Certified
      </div>
      <div class="awb rev d1">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #76B900; margin-right: 8px;"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
        NVIDIA Preferred Partner
      </div>
      <div class="awb rev d2">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #0BA8D3; margin-right: 8px;"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
        ISO 9001 Process Ready
      </div>
      <div class="awb rev d3">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #0BA8D3; margin-right: 8px;"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
        SOC2 Type II Ready
      </div>
      <div class="awb rev d4">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #0BA8D3; margin-right: 8px;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        HIPAA Compliant Capable
      </div>
    </div>`;

about = about.replace(trustedSectionOld, trustedSectionNew);

// Add styling for awb flex to align icons
if (!about.includes('.awb { display: flex; align-items: center;')) {
    about = about.replace('</style>', `  .awb { display: flex; align-items: center; justify-content: flex-start; }\n</style>`);
}

fs.writeFileSync('about.html', about, 'utf8');

// 3. Fix how-it-works.css to add cyan glow on the cards themselves
let hiwCss = fs.readFileSync('css/how-it-works.css', 'utf8');
hiwCss = hiwCss.replace(
    '  box-shadow: 0 4px 24px rgba(11, 168, 211, 0.05);',
    '  box-shadow: 0 0 15px rgba(11, 168, 211, 0.25), inset 0 0 20px rgba(11, 168, 211, 0.05);'
);
hiwCss = hiwCss.replace(
    '  box-shadow: 0 12px 40px rgba(11, 168, 211, 0.15);',
    '  box-shadow: 0 0 30px rgba(11, 168, 211, 0.4), inset 0 0 30px rgba(11, 168, 211, 0.1);'
);
fs.writeFileSync('css/how-it-works.css', hiwCss, 'utf8');

console.log('Fixed about emojis, logos, and how-it-works glow!');
