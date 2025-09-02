import{D as r}from"./Dropdown-Bkoy_nrU.js";import{r as l,w as p}from"./iframe-G2gOgW4D.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./preload-helper-CGE4UHPU.js";const v={title:"Components/Dropdown",component:r,tags:["autodocs"],argTypes:{title:{control:"text",description:"Label or title for the dropdown"},dropdownList:{control:"array",description:"Array of items displayed in the dropdown"},disabled:{control:"boolean",description:"Disables the dropdown if true"},open:{control:"boolean",description:"Controls whether the dropdown is open"}}},c=n=>({components:{Dropdown:r},setup(){const t=l(n.open),d=l(null),s=l(null),a=()=>{t.value=!t.value},i=o=>{console.log("Selected item:",o),s.value=o};return p(()=>n.open,o=>{t.value=o}),{args:n,showDropdown:t,buttonRef:d,selectedItem:s,onItemClick:i,toggleDropdown:a}},template:`
    <div >
    <div style="display: flex; gap: 8px; align-items: center">
      <button ref="buttonRef" @click="toggleDropdown">Open Suggestions</button>
      <div v-if="selectedItem">Selected Item: {{selectedItem}}</div>
    </div>
      <Dropdown
        v-bind="args"
        :open="showDropdown"
        :target="buttonRef"
        @selected="onItemClick"
      />
    </div>
  `}),e=c.bind({});e.args={title:"Suggestions",dropdownList:[{label:"Set this value to 20px"},{label:"Set all value to this value"},{label:"Set this value to auto"},{label:"Set all values to auto"},{label:"Unset this value"},{label:"Unset all values"}],disabled:!1,open:!0};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`args => ({
  components: {
    Dropdown
  },
  setup() {
    const showDropdown = ref(args.open);
    const buttonRef = ref<HTMLElement | null>(null);
    const selectedItem = ref<string | null>(null);
    const toggleDropdown = () => {
      showDropdown.value = !showDropdown.value;
    };
    const onItemClick = (item: string) => {
      console.log('Selected item:', item);
      selectedItem.value = item;
    };
    watch(() => args.open, newVal => {
      showDropdown.value = newVal;
    });
    return {
      args,
      showDropdown,
      buttonRef,
      selectedItem,
      onItemClick,
      toggleDropdown
    };
  },
  template: \`
    <div >
    <div style="display: flex; gap: 8px; align-items: center">
      <button ref="buttonRef" @click="toggleDropdown">Open Suggestions</button>
      <div v-if="selectedItem">Selected Item: {{selectedItem}}</div>
    </div>
      <Dropdown
        v-bind="args"
        :open="showDropdown"
        :target="buttonRef"
        @selected="onItemClick"
      />
    </div>
  \`
})`,...e.parameters?.docs?.source}}};const b=["Default"];export{e as Default,b as __namedExportsOrder,v as default};
