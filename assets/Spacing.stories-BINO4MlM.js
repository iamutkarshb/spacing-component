const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Spacing-Bret4eON.js","assets/iframe-BFjukfnC.js","assets/preload-helper-CGE4UHPU.js","assets/iframe-CN1bby2f.css","assets/Dropdown-DOCW6QLJ.js","assets/_plugin-vue_export-helper-DlAUqK2U.js","assets/Dropdown-C1vN5-Xk.css","assets/Input-BVv-sVcY.js","assets/Input-BhOEFvjh.css","assets/Spacing-CRMT-E-K.css"])))=>i.map(i=>d[i]);
import{_ as p}from"./preload-helper-CGE4UHPU.js";import{d,r as i}from"./iframe-BFjukfnC.js";const a=d(()=>p(()=>import("./Spacing-Bret4eON.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9]))),m={title:"Components/Spacing",component:a,tags:["autodocs"],argTypes:{value:{control:"object",description:'Object with margin and padding. Example: { margin: { top: "12px", bottom: "auto", right: "auto", left: "auto" }, padding: { top: "12%", bottom: "12%", right: "12%", left: "12%" } }'},defaultValue:{control:"object",description:"Default values for margin and padding if value is empty"},customOptions:{control:"object",description:"Array of custom dropdown options"},disableSuggestion:{control:"object",description:"Disable suggestions dropdown for margin and padding"},readOnlyFields:{control:"object",description:"Make the input-field read-only"}}},r=o=>({components:{Spacing:a},setup(){const e=i(null);return{args:o,updatedItem:e,onUpdate:n=>{e.value=n}}},template:`
    <div style="display: flex; flex-direction: column; align-items: center; gap: 20px;">
      <Spacing v-bind="args" style="max-width: 90%" @onUpdate="onUpdate" />
      <pre style="background: #f0f0f0; padding: 10px; border-radius: 4px; max-width: 600px; width: 100%; overflow-x: auto;">
{{ updatedItem ?? 'No update yet' }}
      </pre>
    </div>
  `}),t=r.bind({});t.args={value:{margin:{top:"12px",bottom:"auto",right:"auto",left:"auto"},padding:{top:"12%",bottom:"12%",right:"12%",left:"12%"}},defaultValue:{margin:"20px",padding:"20px"},disableSuggestion:{margin:!1,padding:!1},readOnlyFields:{margin:{top:!1,bottom:!1,right:!1,left:!1},padding:{top:!1,bottom:!1,right:!1,left:!1}},customOptions:[{label:"Apply Small (8px) to All",applyToAll:!1,valueToApply:"8px"}]};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`args => ({
  components: {
    Spacing
  },
  setup() {
    const updatedItem = ref<string | null>(null);
    const onUpdate = (item: string) => {
      updatedItem.value = item;
    };
    return {
      args,
      updatedItem,
      onUpdate
    };
  },
  template: \`
    <div style="display: flex; flex-direction: column; align-items: center; gap: 20px;">
      <Spacing v-bind="args" style="max-width: 90%" @onUpdate="onUpdate" />
      <pre style="background: #f0f0f0; padding: 10px; border-radius: 4px; max-width: 600px; width: 100%; overflow-x: auto;">
{{ updatedItem ?? 'No update yet' }}
      </pre>
    </div>
  \`
})`,...t.parameters?.docs?.source}}};const c=["Default"];export{t as Default,c as __namedExportsOrder,m as default};
