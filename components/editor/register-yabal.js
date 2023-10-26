import * as monaco from 'monaco-editor';
import { registerRulesForLanguage } from 'monaco-ace-tokenizer';
import YabalHighlightRules from './yabal.js';

monaco.languages.register({
  id: 'yabal',
});

registerRulesForLanguage('yabal', new YabalHighlightRules());
