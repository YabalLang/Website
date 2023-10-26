/*
* To try in Ace editor, copy and paste into the mode creator
* here : http://ace.c9.io/tool/mode_creator.html
*/

import { TextHighlightRules, DocCommentHighlightRules, oop } from 'monaco-ace-tokenizer';

/* --------------------- START ----------------------------- */
var YabalHighlightRules = function() {
   this.$rules = {
   "start" : [
      {
         "token" : ["keyword.control.asm", "source", "punctuation.curlybrace.open"],
         "regex" : "(asm)(\\s*)(\\{)",
         "push" : "assembly__1"
      },
      {
         "token" : "keyword.other",
         "regex" : "(\\breturn\\b|\\bfor\\b|\\bif\\b|\\binline\\b)"
      },
      {
         "token" : ["keyword.other", "keyword.other", "source", "variable.other", "source", "meta.brace.round"],
         "regex" : "(\\binline)?(\\bint\\b|\\bbool\\b|\\bvar\\b)(\\s+)(\\b[a-zA-Z$_][a-zA-Z0-9$_]*)(\\s*)(\\()",
         "push" : "main__1"
      },
      {
         "token" : ["keyword.other", "entity.name", "source", "variable.other", "source", "meta.brace.round"],
         "regex" : "(\\binline)?(\\b[a-zA-Z$_][a-zA-Z0-9$_]*)(\\s+)(\\b[a-zA-Z$_][a-zA-Z0-9$_]*)(\\s*)(\\()",
         "push" : "main__2"
      },
      {
         "token" : ["keyword.other", "source", "entity.name", "source", "punctuation.curlybrace.open"],
         "regex" : "(\\bstruct)(\\s+)(\\b[a-zA-Z$_][a-zA-Z0-9$_]*)(\\s*)(\\{)",
         "push" : "main__3"
      },
      {
         "token" : ["keyword.other", "source", "keyword.other"],
         "regex" : "(\\bstackalloc)(\\s+)(\\bint\\b|\\bbool\\b|\\bvar\\b)"
      },
      {
         "token" : ["keyword.other", "source", "entity.name"],
         "regex" : "(\\bstackalloc)(\\s+)(\\b[a-zA-Z$_][a-zA-Z0-9$_]*)"
      },
      {
         "token" : ["keyword.other", "source", "variable.other"],
         "regex" : "(\\bint\\b|\\bbool\\b|\\bvar\\b)(\\s+)(\\b[a-zA-Z$_][a-zA-Z0-9$_]*)"
      },
      {
         "token" : "keyword.other",
         "regex" : "(\\bint\\b|\\bbool\\b|\\bvar\\b)"
      },
      {
         "token" : ["entity.name", "source", "variable.other"],
         "regex" : "(\\b[a-zA-Z$_][a-zA-Z0-9$_]*)(\\s+)(\\b[a-zA-Z$_][a-zA-Z0-9$_]*)"
      },
      {
         "token" : "variable.other",
         "regex" : "(\\b[a-zA-Z$_][a-zA-Z0-9$_]*)"
      },
      {
         "token" : "constant.numeric",
         "regex" : "(\\b\\d+)"
      },
      {
         "token" : "punctuation.curlybrace.open",
         "regex" : "(\\{)",
         "push" : "main__4"
      },
      {
         "token" : "punctuation.squarebracket.open",
         "regex" : "(\\[)",
         "push" : "main__5"
      },
      {
         "token" : "punctuation.terminator.statement",
         "regex" : "(;)"
      },
      {
         "token" : "punctuation.definition.string.begin",
         "regex" : "(\\\")",
         "push" : "main__6"
      },
      {
         "token" : ["punctuation.definition.string.begin", "text"],
         "regex" : "(\\')([^']?)",
         "push" : "main__7"
      },
      {
         "token" : "meta.brace.round",
         "regex" : "(\\()",
         "push" : "main__8"
      },
      {
         "token" : "comment",
         "regex" : "(/\\*)",
         "push" : "multi_line_comment__1"
      },
      {
         "token" : "comment",
         "regex" : "(//.*)"
      },
      {
         "token" : "keyword.operator",
         "regex" : "(\\|\\||\\||\\^|&|%|~|<<|>>|\\+|-|\\*|/|==|\\+=|-=|\\+\\+|--|\\+\\+|--|\\*=|/=|=)"
      },
      {
         "token" : "source",
         "regex" : "(.)"
      },
      {
         defaultToken : "text",
      }
   ], 
   "assembly__1" : [
      {
         "token" : "punctuation.curlybrace.close",
         "regex" : "(\\})",
         "next" : "pop"
      },
      {
         "token" : "comment",
         "regex" : "(,.*)"
      },
      {
         "token" : ["support.function.goto-label", "punctuation.separator.colon"],
         "regex" : "(\\b[a-zA-Z$_][a-zA-Z0-9$_]*)(\\:)"
      },
      {
         "token" : ["keyword.other", "source", "punctuation.definition.variable", "variable.other"],
         "regex" : "(\\b[a-zA-Z$_][a-zA-Z0-9$_]*)(\\s+)(\\@)(\\b[a-zA-Z$_][a-zA-Z0-9$_]*)"
      },
      {
         "token" : ["keyword.other", "source", "entity.name.label"],
         "regex" : "(\\b[a-zA-Z$_][a-zA-Z0-9$_]*)(\\s+)(\\b[a-zA-Z$_][a-zA-Z0-9$_]*)"
      },
      {
         "token" : "keyword.other",
         "regex" : "(\\b[a-zA-Z$_][a-zA-Z0-9$_]*)"
      },
      {
         "token" : "constant.numeric",
         "regex" : "(\\b\\d+)"
      },
      {
         "token" : "comment",
         "regex" : "(/\\*)",
         "push" : "multi_line_comment__1"
      },
      {
         "token" : "comment",
         "regex" : "(//.*)"
      },
      {
         defaultToken : "text",
      }
   ], 
   "main__1" : [
      {
         "token" : "meta.brace.round",
         "regex" : "(\\))",
         "next" : "pop"
      },
      {
         "token" : ["keyword.other", "source", "variable.other"],
         "regex" : "(\\bint\\b|\\bbool\\b|\\bvar\\b)(\\s+)(\\b[a-zA-Z$_][a-zA-Z0-9$_]*)"
      },
      {
         "token" : ["entity.name", "source", "variable.other"],
         "regex" : "(\\b[a-zA-Z$_][a-zA-Z0-9$_]*)(\\s+)(\\b[a-zA-Z$_][a-zA-Z0-9$_]*)"
      },
      {
         "token" : ["keyword.other", "source", "punctuation.squarebracket.open", "source", "punctuation.squarebracket.close", "source", "variable.other"],
         "regex" : "(\\bint\\b|\\bbool\\b|\\bvar\\b)(\\s*)(\\[)(\\s*)(\\])(\\s+)(\\b[a-zA-Z$_][a-zA-Z0-9$_]*)"
      },
      {
         "token" : ["entity.name", "source", "punctuation.squarebracket.open", "source", "punctuation.squarebracket.close", "source", "variable.other"],
         "regex" : "(\\b[a-zA-Z$_][a-zA-Z0-9$_]*)(\\s*)(\\[)(\\s*)(\\])(\\s+)(\\b[a-zA-Z$_][a-zA-Z0-9$_]*)"
      },
      {
         "token" : "punctuation.separator.comma",
         "regex" : "(,)"
      },
      {
         "token" : "comment",
         "regex" : "(/\\*)",
         "push" : "multi_line_comment__1"
      },
      {
         "token" : "comment",
         "regex" : "(//.*)"
      },
      {
         defaultToken : "text",
      }
   ], 
   "main__2" : [
      {
         "token" : "meta.brace.round",
         "regex" : "(\\))",
         "next" : "pop"
      },
      {
         "token" : ["keyword.other", "source", "variable.other"],
         "regex" : "(\\bint\\b|\\bbool\\b|\\bvar\\b)(\\s+)(\\b[a-zA-Z$_][a-zA-Z0-9$_]*)"
      },
      {
         "token" : ["entity.name", "source", "variable.other"],
         "regex" : "(\\b[a-zA-Z$_][a-zA-Z0-9$_]*)(\\s+)(\\b[a-zA-Z$_][a-zA-Z0-9$_]*)"
      },
      {
         "token" : ["keyword.other", "source", "punctuation.squarebracket.open", "source", "punctuation.squarebracket.close", "source", "variable.other"],
         "regex" : "(\\bint\\b|\\bbool\\b|\\bvar\\b)(\\s*)(\\[)(\\s*)(\\])(\\s+)(\\b[a-zA-Z$_][a-zA-Z0-9$_]*)"
      },
      {
         "token" : ["entity.name", "source", "punctuation.squarebracket.open", "source", "punctuation.squarebracket.close", "source", "variable.other"],
         "regex" : "(\\b[a-zA-Z$_][a-zA-Z0-9$_]*)(\\s*)(\\[)(\\s*)(\\])(\\s+)(\\b[a-zA-Z$_][a-zA-Z0-9$_]*)"
      },
      {
         "token" : "punctuation.separator.comma",
         "regex" : "(,)"
      },
      {
         "token" : "comment",
         "regex" : "(/\\*)",
         "push" : "multi_line_comment__1"
      },
      {
         "token" : "comment",
         "regex" : "(//.*)"
      },
      {
         defaultToken : "text",
      }
   ], 
   "main__3" : [
      {
         "token" : "punctuation.curlybrace.close",
         "regex" : "(\\})",
         "next" : "pop"
      },
      {
         "token" : ["keyword.other", "source", "variable.other"],
         "regex" : "(\\bint\\b|\\bbool\\b|\\bvar\\b)(\\s+)(\\b[a-zA-Z$_][a-zA-Z0-9$_]*)"
      },
      {
         "token" : ["entity.name", "source", "variable.other"],
         "regex" : "(\\b[a-zA-Z$_][a-zA-Z0-9$_]*)(\\s+)(\\b[a-zA-Z$_][a-zA-Z0-9$_]*)"
      },
      {
         "token" : ["keyword.other", "source", "punctuation.squarebracket.open", "source", "punctuation.squarebracket.close", "source", "variable.other"],
         "regex" : "(\\bint\\b|\\bbool\\b|\\bvar\\b)(\\s*)(\\[)(\\s*)(\\])(\\s+)(\\b[a-zA-Z$_][a-zA-Z0-9$_]*)"
      },
      {
         "token" : ["entity.name", "source", "punctuation.squarebracket.open", "source", "punctuation.squarebracket.close", "source", "variable.other"],
         "regex" : "(\\b[a-zA-Z$_][a-zA-Z0-9$_]*)(\\s*)(\\[)(\\s*)(\\])(\\s+)(\\b[a-zA-Z$_][a-zA-Z0-9$_]*)"
      },
      {
         "token" : "punctuation.separator.comma",
         "regex" : "(,)"
      },
      {
         "token" : "comment",
         "regex" : "(/\\*)",
         "push" : "multi_line_comment__1"
      },
      {
         "token" : "comment",
         "regex" : "(//.*)"
      },
      {
         "token" : ["keyword.operator", "source", "constant.numeric"],
         "regex" : "(\\:)(\\s*)(\\d+)"
      },
      {
         defaultToken : "text",
      }
   ], 
   "main__4" : [
      {
         "token" : "punctuation.curlybrace.close",
         "regex" : "(\\})",
         "next" : "pop"
      },
      {
         "token" : ["keyword.control.asm", "source", "punctuation.curlybrace.open"],
         "regex" : "(asm)(\\s*)(\\{)",
         "push" : "assembly__1"
      },
      {
         "token" : "keyword.other",
         "regex" : "(\\breturn\\b|\\bfor\\b|\\bif\\b|\\binline\\b)"
      },
      {
         "token" : ["keyword.other", "keyword.other", "source", "variable.other", "source", "meta.brace.round"],
         "regex" : "(\\binline)?(\\bint\\b|\\bbool\\b|\\bvar\\b)(\\s+)(\\b[a-zA-Z$_][a-zA-Z0-9$_]*)(\\s*)(\\()",
         "push" : "main__1"
      },
      {
         "token" : ["keyword.other", "entity.name", "source", "variable.other", "source", "meta.brace.round"],
         "regex" : "(\\binline)?(\\b[a-zA-Z$_][a-zA-Z0-9$_]*)(\\s+)(\\b[a-zA-Z$_][a-zA-Z0-9$_]*)(\\s*)(\\()",
         "push" : "main__2"
      },
      {
         "token" : ["keyword.other", "source", "entity.name", "source", "punctuation.curlybrace.open"],
         "regex" : "(\\bstruct)(\\s+)(\\b[a-zA-Z$_][a-zA-Z0-9$_]*)(\\s*)(\\{)",
         "push" : "main__3"
      },
      {
         "token" : ["keyword.other", "source", "keyword.other"],
         "regex" : "(\\bstackalloc)(\\s+)(\\bint\\b|\\bbool\\b|\\bvar\\b)"
      },
      {
         "token" : ["keyword.other", "source", "entity.name"],
         "regex" : "(\\bstackalloc)(\\s+)(\\b[a-zA-Z$_][a-zA-Z0-9$_]*)"
      },
      {
         "token" : ["keyword.other", "source", "variable.other"],
         "regex" : "(\\bint\\b|\\bbool\\b|\\bvar\\b)(\\s+)(\\b[a-zA-Z$_][a-zA-Z0-9$_]*)"
      },
      {
         "token" : "keyword.other",
         "regex" : "(\\bint\\b|\\bbool\\b|\\bvar\\b)"
      },
      {
         "token" : ["entity.name", "source", "variable.other"],
         "regex" : "(\\b[a-zA-Z$_][a-zA-Z0-9$_]*)(\\s+)(\\b[a-zA-Z$_][a-zA-Z0-9$_]*)"
      },
      {
         "token" : "variable.other",
         "regex" : "(\\b[a-zA-Z$_][a-zA-Z0-9$_]*)"
      },
      {
         "token" : "constant.numeric",
         "regex" : "(\\b\\d+)"
      },
      {
         "token" : "punctuation.curlybrace.open",
         "regex" : "(\\{)",
         "push" : "main__4"
      },
      {
         "token" : "punctuation.squarebracket.open",
         "regex" : "(\\[)",
         "push" : "main__5"
      },
      {
         "token" : "punctuation.terminator.statement",
         "regex" : "(;)"
      },
      {
         "token" : "punctuation.definition.string.begin",
         "regex" : "(\\\")",
         "push" : "main__6"
      },
      {
         "token" : ["punctuation.definition.string.begin", "text"],
         "regex" : "(\\')([^']?)",
         "push" : "main__7"
      },
      {
         "token" : "meta.brace.round",
         "regex" : "(\\()",
         "push" : "main__8"
      },
      {
         "token" : "comment",
         "regex" : "(/\\*)",
         "push" : "multi_line_comment__1"
      },
      {
         "token" : "comment",
         "regex" : "(//.*)"
      },
      {
         "token" : "keyword.operator",
         "regex" : "(\\|\\||\\||\\^|&|%|~|<<|>>|\\+|-|\\*|/|==|\\+=|-=|\\+\\+|--|\\+\\+|--|\\*=|/=|=)"
      },
      {
         "token" : "source",
         "regex" : "(.)"
      },
      {
         defaultToken : "text",
      }
   ], 
   "main__5" : [
      {
         "token" : "punctuation.squarebracket.close",
         "regex" : "(\\])",
         "next" : "pop"
      },
      {
         "token" : ["keyword.control.asm", "source", "punctuation.curlybrace.open"],
         "regex" : "(asm)(\\s*)(\\{)",
         "push" : "assembly__1"
      },
      {
         "token" : "keyword.other",
         "regex" : "(\\breturn\\b|\\bfor\\b|\\bif\\b|\\binline\\b)"
      },
      {
         "token" : ["keyword.other", "keyword.other", "source", "variable.other", "source", "meta.brace.round"],
         "regex" : "(\\binline)?(\\bint\\b|\\bbool\\b|\\bvar\\b)(\\s+)(\\b[a-zA-Z$_][a-zA-Z0-9$_]*)(\\s*)(\\()",
         "push" : "main__1"
      },
      {
         "token" : ["keyword.other", "entity.name", "source", "variable.other", "source", "meta.brace.round"],
         "regex" : "(\\binline)?(\\b[a-zA-Z$_][a-zA-Z0-9$_]*)(\\s+)(\\b[a-zA-Z$_][a-zA-Z0-9$_]*)(\\s*)(\\()",
         "push" : "main__2"
      },
      {
         "token" : ["keyword.other", "source", "entity.name", "source", "punctuation.curlybrace.open"],
         "regex" : "(\\bstruct)(\\s+)(\\b[a-zA-Z$_][a-zA-Z0-9$_]*)(\\s*)(\\{)",
         "push" : "main__3"
      },
      {
         "token" : ["keyword.other", "source", "keyword.other"],
         "regex" : "(\\bstackalloc)(\\s+)(\\bint\\b|\\bbool\\b|\\bvar\\b)"
      },
      {
         "token" : ["keyword.other", "source", "entity.name"],
         "regex" : "(\\bstackalloc)(\\s+)(\\b[a-zA-Z$_][a-zA-Z0-9$_]*)"
      },
      {
         "token" : ["keyword.other", "source", "variable.other"],
         "regex" : "(\\bint\\b|\\bbool\\b|\\bvar\\b)(\\s+)(\\b[a-zA-Z$_][a-zA-Z0-9$_]*)"
      },
      {
         "token" : "keyword.other",
         "regex" : "(\\bint\\b|\\bbool\\b|\\bvar\\b)"
      },
      {
         "token" : ["entity.name", "source", "variable.other"],
         "regex" : "(\\b[a-zA-Z$_][a-zA-Z0-9$_]*)(\\s+)(\\b[a-zA-Z$_][a-zA-Z0-9$_]*)"
      },
      {
         "token" : "variable.other",
         "regex" : "(\\b[a-zA-Z$_][a-zA-Z0-9$_]*)"
      },
      {
         "token" : "constant.numeric",
         "regex" : "(\\b\\d+)"
      },
      {
         "token" : "punctuation.curlybrace.open",
         "regex" : "(\\{)",
         "push" : "main__4"
      },
      {
         "token" : "punctuation.squarebracket.open",
         "regex" : "(\\[)",
         "push" : "main__5"
      },
      {
         "token" : "punctuation.terminator.statement",
         "regex" : "(;)"
      },
      {
         "token" : "punctuation.definition.string.begin",
         "regex" : "(\\\")",
         "push" : "main__6"
      },
      {
         "token" : ["punctuation.definition.string.begin", "text"],
         "regex" : "(\\')([^']?)",
         "push" : "main__7"
      },
      {
         "token" : "meta.brace.round",
         "regex" : "(\\()",
         "push" : "main__8"
      },
      {
         "token" : "comment",
         "regex" : "(/\\*)",
         "push" : "multi_line_comment__1"
      },
      {
         "token" : "comment",
         "regex" : "(//.*)"
      },
      {
         "token" : "keyword.operator",
         "regex" : "(\\|\\||\\||\\^|&|%|~|<<|>>|\\+|-|\\*|/|==|\\+=|-=|\\+\\+|--|\\+\\+|--|\\*=|/=|=)"
      },
      {
         "token" : "source",
         "regex" : "(.)"
      },
      {
         defaultToken : "text",
      }
   ], 
   "main__6" : [
      {
         "token" : "punctuation.definition.string.end",
         "regex" : "(\\\")",
         "next" : "pop"
      },
      {
         defaultToken : "text",
      }
   ], 
   "main__7" : [
      {
         "token" : "punctuation.definition.string.end",
         "regex" : "(\\')",
         "next" : "pop"
      },
      {
         defaultToken : "invalid",
      }
   ], 
   "main__8" : [
      {
         "token" : "meta.brace.round",
         "regex" : "(\\))",
         "next" : "pop"
      },
      {
         "token" : "constant.numeric",
         "regex" : "(\\b\\d+)"
      },
      {
         "token" : "punctuation.separator.comma",
         "regex" : "(,)"
      },
      {
         defaultToken : "text",
      }
   ], 
   "multi_line_comment__1" : [
      {
         "token" : "comment",
         "regex" : "(\\*/)",
         "next" : "pop"
      },
      {
         defaultToken : "comment",
      }
   ]
   };
   this.normalizeRules();
   };
   /* ------------------------ END ------------------------------ */
   
    oop.inherits(YabalHighlightRules, TextHighlightRules);
    export default YabalHighlightRules;
    