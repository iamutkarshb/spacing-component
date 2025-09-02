const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Input-BVv-sVcY.js","assets/iframe-BFjukfnC.js","assets/preload-helper-CGE4UHPU.js","assets/iframe-CN1bby2f.css","assets/_plugin-vue_export-helper-DlAUqK2U.js","assets/Input-BhOEFvjh.css"])))=>i.map(i=>d[i]);
import{_ as s}from"./preload-helper-CGE4UHPU.js";import{d as p,r,w as d}from"./iframe-BFjukfnC.js";const a=p(()=>s(()=>import("./Input-BVv-sVcY.js"),__vite__mapDeps([0,1,2,3,4,5]))),m={title:"Components/Input",component:a,tags:["autodocs"],argTypes:{title:{control:"text",description:"Accessible label for the input"},placeholder:{control:"text",description:"Placeholder text inside the input"},type:{control:{type:"select"},options:["text","number","email","password"],description:"Type of the input field"},modelValue:{control:"text",description:"The value bound via v-model"},maxLength:{control:"number",description:"Maximum number of characters allowed"},readonly:{control:"boolean",description:"Makes the input field read-only"},disabled:{control:"boolean",description:"Disables the input field"}}},i=t=>{const o=r(t.modelValue),l=r("");return d(()=>t.modelValue,n=>{o.value=n}),{components:{Input:a},setup(){return{args:t,value:o,errorMsg:l}},template:`
      <div style="width: 300px;">
        <Input
          v-bind="args"
          v-model="value"
        >
          <template #error="{ message }">
            <span style="font-weight: bold; color: darkred;">{{ message || 'Error' }}</span>
          </template>
        </Input>
        <p>Current value: {{ value }}</p>
      </div>
    `}},e=i.bind({});e.args={title:"Example Input",modelValue:"Hello World",placeholder:"Type something...",type:"text",maxLength:20,readonly:!1,disabled:!1};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`args => {
  const value = ref(args.modelValue);
  const errorMsg = ref('');
  watch(() => args.modelValue, newVal => {
    value.value = newVal;
  });
  return {
    components: {
      Input
    },
    setup() {
      return {
        args,
        value,
        errorMsg
      };
    },
    template: \`
      <div style="width: 300px;">
        <Input
          v-bind="args"
          v-model="value"
        >
          <template #error="{ message }">
            <span style="font-weight: bold; color: darkred;">{{ message || 'Error' }}</span>
          </template>
        </Input>
        <p>Current value: {{ value }}</p>
      </div>
    \`
  };
}`,...e.parameters?.docs?.source}}};const v=["Default"];export{e as Default,v as __namedExportsOrder,m as default};
