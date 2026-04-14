import{r as o,j as e}from"./app-BOmdqGjg.js";import{C as d}from"./CustomerLayout-DLkIzaSF.js";function p({table:n,categories:a,customer:s}){const[i,t]=o.useState(a[0]?.id);return e.jsxs(d,{title:"Menu",table:n,children:[e.jsxs("div",{className:"menu-page",children:[e.jsxs("div",{className:"user-bar",children:[e.jsxs("p",{children:["Hai, ",e.jsx("strong",{children:s.name||"Pelanggan"}),"! 👋"]}),e.jsx("span",{className:"user-phone",children:s.phone})]}),e.jsx("div",{className:"customer-categories",children:a.map(r=>e.jsx("button",{className:`cat-pill ${i===r.id?"active":""}`,onClick:()=>t(r.id),children:r.name},r.id))}),e.jsx("div",{className:"product-list",children:a.find(r=>r.id===i)?.products.map(r=>e.jsxs("div",{className:"product-item",children:[e.jsxs("div",{className:"product-info",children:[e.jsx("h3",{className:"product-name",children:r.name}),e.jsx("p",{className:"product-desc",children:r.description||"Segar dan sedap."}),e.jsxs("span",{className:"product-price",children:["RM ",parseFloat(r.price).toFixed(2)]})]}),e.jsx("div",{className:"product-action",children:e.jsxs("button",{className:"add-btn",children:[e.jsx("span",{children:"Pesan"}),e.jsx("span",{children:"+"})]})})]},r.id))}),e.jsxs("div",{className:"menu-instructions text-center",children:[e.jsx("p",{children:"Pilih menu kegemaran anda dan sampaikan kepada staff kami, atau tunggu staff kami mengambil pesanan anda. 😊"}),e.jsxs("p",{className:"highlight-text",children:["Resit digital anda akan dihantar ke WhatsApp ",s.phone," selepas bayaran."]})]})]}),e.jsx("style",{children:`
                .menu-page { padding-bottom: 2rem; }
                .user-bar {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0.8rem 1rem;
                    background: rgba(107, 79, 58, 0.05);
                    border-radius: 12px;
                    margin-bottom: 1.5rem;
                }
                .user-bar p { margin: 0; font-size: 0.9rem; }
                .user-phone { font-size: 0.75rem; color: #8B7355; font-weight: 600; }
                
                .customer-categories {
                    display: flex;
                    gap: 0.6rem;
                    overflow-x: auto;
                    padding-bottom: 1rem;
                    scrollbar-width: none;
                }
                .customer-categories::-webkit-scrollbar { display: none; }
                
                .cat-pill {
                    padding: 0.5rem 1.2rem;
                    background: #FFF;
                    border: 1px solid #E8D8C3;
                    border-radius: 50px;
                    white-space: nowrap;
                    font-size: 0.85rem;
                    font-weight: 700;
                    color: #6B4F3A;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .cat-pill.active {
                    background: #6B4F3A;
                    color: #FFF;
                    border-color: #6B4F3A;
                    box-shadow: 0 4px 10px rgba(107, 79, 58, 0.2);
                }
                
                .product-list {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }
                .product-item {
                    background: #FFF;
                    padding: 1rem;
                    border-radius: 16px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.03);
                }
                .product-name { font-size: 0.95rem; font-weight: 800; color: #6B4F3A; margin: 0 0 0.2rem; }
                .product-desc { font-size: 0.75rem; color: #8B7355; margin: 0 0 0.5rem; }
                .product-price { font-size: 0.9rem; font-weight: 900; color: #C9A15B; }
                
                .add-btn {
                    background: #FAF6F1;
                    border: 1px solid #E8D8C3;
                    color: #6B4F3A;
                    padding: 0.5rem 1rem;
                    border-radius: 12px;
                    display: flex;
                    gap: 0.5rem;
                    font-weight: 800;
                    font-size: 0.8rem;
                }
                
                .menu-instructions {
                    margin-top: 3rem;
                    padding: 1.5rem;
                    background: #FFF;
                    border-radius: 16px;
                    border: 2px dashed #E8D8C3;
                }
                .menu-instructions p {
                    font-size: 0.85rem;
                    color: #6B4F3A;
                    line-height: 1.5;
                }
                .highlight-text {
                    margin-top: 1rem !important;
                    font-weight: 700;
                    color: #C9A15B !important;
                }
                .text-center { text-align: center; }
            `})]})}export{p as default};
