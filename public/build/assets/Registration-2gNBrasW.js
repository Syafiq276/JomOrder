import{b as l,j as e}from"./app-BOmdqGjg.js";import{C as c}from"./CustomerLayout-DLkIzaSF.js";function p({table:t}){const{data:n,setData:r,post:o,processing:i,errors:s}=l({name:"",phone:""}),m=a=>{a.preventDefault(),o(route("customer.start",t.id))};return e.jsxs(c,{title:"Mula Pesanan",table:t,children:[e.jsxs("div",{className:"registration-page",children:[e.jsxs("div",{className:"welcome-section text-center",children:[e.jsx("div",{className:"welcome-emoji",children:"☕"}),e.jsx("h1",{className:"customer-title",children:"Selamat Datang ke Café Kak Na"}),e.jsxs("p",{className:"customer-subtitle",children:["Sila masukkan maklumat anda untuk mula memesan dari **Meja ",t.name,"**."]})]}),e.jsx("div",{className:"customer-card",children:e.jsxs("form",{onSubmit:m,children:[e.jsxs("div",{className:"customer-input-group",children:[e.jsx("label",{className:"customer-label",children:"Nama Anda (Optional)"}),e.jsx("input",{type:"text",className:"customer-input",placeholder:"Cth: Syafiq",value:n.name,onChange:a=>r("name",a.target.value)}),s.name&&e.jsx("div",{className:"error-text",children:s.name})]}),e.jsxs("div",{className:"customer-input-group",children:[e.jsx("label",{className:"customer-label",children:"No. Telefon WhatsApp"}),e.jsx("input",{type:"tel",className:"customer-input",placeholder:"Cth: 0123456789",required:!0,value:n.phone,onChange:a=>r("phone",a.target.value)}),e.jsx("p",{className:"input-hint",children:"Resit digital akan dihantar ke nombor ini secara automatik."}),s.phone&&e.jsx("div",{className:"error-text",children:s.phone})]}),e.jsx("button",{type:"submit",className:"customer-btn customer-btn--primary",disabled:i,children:i?"Memproses...":"Lihat Menu & Pesan"})]})}),e.jsx("div",{className:"info-section",children:e.jsxs("div",{className:"info-item",children:[e.jsx("span",{className:"info-icon",children:"📋"}),e.jsxs("div",{children:[e.jsx("strong",{children:"Pesan & Bayar"}),e.jsx("p",{children:"Sahkan pesanan anda di menu dan bayar di kaunter atau via QR."})]})]})})]}),e.jsx("style",{children:`
                .registration-page {
                    padding-top: 1rem;
                }
                .welcome-section {
                    margin-bottom: 2rem;
                }
                .welcome-emoji {
                    font-size: 3rem;
                    margin-bottom: 1rem;
                }
                .text-center { text-align: center; }
                .input-hint {
                    font-size: 0.7rem;
                    color: #8B7355;
                    margin-top: 0.4rem;
                }
                .error-text {
                    color: #C0392B;
                    font-size: 0.75rem;
                    font-weight: 600;
                    margin-top: 0.4rem;
                }
                .info-section {
                    margin-top: 2rem;
                }
                .info-item {
                    display: flex;
                    gap: 1rem;
                    padding: 1rem;
                    background: rgba(107, 79, 58, 0.05);
                    border-radius: 12px;
                }
                .info-icon {
                    font-size: 1.5rem;
                }
                .info-item p {
                    margin: 0.2rem 0 0;
                    font-size: 0.8rem;
                    color: #8B7355;
                    line-height: 1.4;
                }
            `})]})}export{p as default};
