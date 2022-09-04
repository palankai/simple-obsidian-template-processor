# Simple Obsidian Template Processor

**Unofficial** template processor for Obisidian plugins

## Features

- Substitution based on key-value pairs
- Built-in date and time function
- Substituting template functions with arguments
- Written in TypeScript

*I don't expect to add many more features*

## Installation

```shell
npm i simple-obsidian-template-processor
```
or
```shell
yarn add simple-obsidian-template-processor
```

## Example template and usage

```
---
created: "{{date}}"
---
{{title}}
Author: {{author}}

## Notes
```

```javascript
const fs = require('fs');
const { TemplateProcessor } = require('templateProcessor');

const templateString = fs.readFileSync('Book Template.md', {encoding:'utf8', flag:'r'});
const tp = new TemplateProcessor(templateString);
const rendered = tp.render({
    title: 'A Good Book',
    author: 'John Doe'
});

fs.writeFileSync("A Goog Book.md", rendered);
```

## Development

- requirements: nvm, yarn, node (see `.nvmrc`)
- install: `yarn install`
- before each commit: `yarn precommit` (I don't like automated hooks)

## Motivation

I have a couple of Obsidian plugins that I will write.
For those, I prefer (for the sake of simplicity) using templates that are similar to what is used in the Obsidian core Template plugin.
Furthermore, I want to use (more or less) the same templates for all kinds of notes (periodic notes, meeting notes, research).

Obsidian API doesn't seem to provide an easy way to do that.
The Obsidian template processor only provides very minimal features, but for my cases, that's just enough.
Having this package ensures not to reimplement the same template processor again
and again in different plugins.
