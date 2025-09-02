# 📦 Vue 3 Component Library with Storybook

This repository contains a reusable **Vue 3 component library** bundled with **Storybook** for interactive documentation and testing.  
It includes common UI components such as **Dropdown**, **Input**, and **Spacing**, built with TypeScript and scoped styling.

Storybook is already set up, so you can browse and interact with components directly.

---

## 🚀 Getting Started

#### Local Development

Clone the repository:

```
git clone https://github.com/iamutkarshb/spacing-component.git 
cd spacing-component
```

```
npm install # Install dependencies:
npm run storybook #Start Storybook locally:
```

#### Production Usage

```
npm install spacing-component
```

---

## 📖 Storybook

This project uses Storybook for documentation and preview.  
Run `npm run storybook` and open [http://localhost:6006](http://localhost:6006) to explore components interactively.

Each component has its own stories under the `stories/` directory, with **controls, descriptions, and examples**.

```
# run storybook locally
npm run storybook

# build static storybook site
npm run build-storybook

# publish static storybook to github-pages (repo configured)
npm run deploy     # uses gh-pages package to publish storybook-static
```

---

## 📂 Folder Structure

```
src/
├── components/            # Vue components
│   ├── Dropdown.vue
│   ├── Input.vue
│   └── Spacing.vue
│
├── stories/               # Storybook stories for each component
│   ├── Dropdown.stories.ts
│   ├── Input.stories.ts
│   └── Spacing.stories.ts
│
├── utils/                 # Shared helper utilities
│   └── utils.ts
│
├── assets/                # Icons assets
│   └── icons/
│
├── styles/                # Global font styles
│   └── fonts.css
│
├── index.ts               # Library entry point (exports all components)
package.json

README.md
```
---

## 🧩 Available Components

### 🔽 Dropdown

- Renders a floating dropdown menu positioned relative to a target element.
- Props:
    - `title` (string): Optional header
    - `dropdownList` (array of objects): Items with `label` and extra attributes
    - `open` (boolean): Controls open/close state
    - `disabled` (boolean): Disable interaction
- Emits:
    - `selected` — fires with the clicked item

---

### ⌨️ Input

- A styled input component with support for validation and error messages.
- Props:
    - `title`, `placeholder`, `readonly`, `disabled`, `type`
    - Works with `v-model`
- Slots:
    - `error` slot for custom error rendering
- Emits:
    - `update:modelValue`
    - `blur`

---

### 📐 Spacing

- A margin and padding editor with dropdown suggestions.
- Props:
    - `value`: Current margin/padding values
    - `defaultValue`: Fallback values for margin & padding
    - `customOptions`: Custom dropdown items
    - `disableSuggestion`, `readOnlyFields`
        
- Emits:
    - `onUpdate` — returns updated spacing snapshot

---

## 📦 Usage

Install the package using command

```
npm install spacing-component
```

import library Css in App.vue file

```
import 'spacing-component/dist/spacing-component.css'
```


In your Vue 3 project, import components from the library and use them in templates:

```
<script setup lang="ts">
import { Spacing, type SpacingValueProps } from 'spacing-component'

const spacingValue: SpacingValueProps = {
	margin: {
		top: '12px',
		bottom: 'auto',
		right: 'auto',
		left: 'auto',
	},
	padding: {
		top: '12%',
		bottom: '12%',
		right: '12%',
		left: '12%',
	},
}

const onUpdate = (item: string) => {
	console.log(item)
}
</script>
  
<template>
	<Spacing :value="spacingValue" @on-update="onUpdate"> You did it! </Spacing>
</template>
<style scoped></style>
```

---
