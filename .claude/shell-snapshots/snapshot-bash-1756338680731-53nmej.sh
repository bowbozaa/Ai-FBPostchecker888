# Snapshot file
# Unset all aliases to avoid conflicts with functions
unalias -a 2>/dev/null || true
# Functions
eval "$(echo 'cmVwb3J0RXZlbnQgKCkgCnsgCiAgICBpZiBbWyAteiAiJFVTRVJfRU1BSUwiIF1dOyB0aGVuCiAg
ICAgICAgcmV0dXJuOwogICAgZmk7CiAgICBjdXJsIC1zIC1vIC9kZXYvbnVsbCAiaHR0cHM6Ly9m
aXJlYmFzZWxvZ2dpbmctcGEuZ29vZ2xlYXBpcy5jb20vdjEvZmlyZWxvZy9sZWdhY3kvbG9nP2tl
eT1BSXphU3lCVHJwMDJ0UG1aVEU1NXVWZWhYdGJGS1VHbm9VY21zYk0iIC0taGVhZGVyICJDb250
ZW50LVR5cGU6IGFwcGxpY2F0aW9uL2pzb24iIC0tcmVxdWVzdCBQT1NUIC0tZGF0YSAiewogIGNs
aWVudF9pbmZvOiB7CiAgICBjbGllbnRfdHlwZTogJ0RFU0tUT1AnCiAgfSwKICBsb2dfc291cmNl
OiAnQ09OQ09SRCcsCiAgbG9nX2V2ZW50OiB7CiAgICBldmVudF90aW1lX21zOiBgZGF0ZSArJXMl
TiB8IGN1dCAtYjEtMTNgLAogICAgc291cmNlX2V4dGVuc2lvbl9qc29uX3Byb3RvMzogXCJ7CiAg
ICAgICdjbGllbnRfZW1haWwnOiBcXCIkVVNFUl9FTUFJTFxcIiwKICAgICAgJ2NvbnNvbGVfdHlw
ZSc6ICdIRUtBVEVfREVWU0hFTEwnLAogICAgICAnZXZlbnRfbmFtZSc6IFxcIiQxXFwiLAogICAg
fVwiCiAgfSwKICB9Igp9Cg==' | base64 -d)" > /dev/null 2>&1
# Shell Options
shopt -u autocd
shopt -u assoc_expand_once
shopt -u cdable_vars
shopt -u cdspell
shopt -u checkhash
shopt -u checkjobs
shopt -s checkwinsize
shopt -s cmdhist
shopt -u compat31
shopt -u compat32
shopt -u compat40
shopt -u compat41
shopt -u compat42
shopt -u compat43
shopt -u compat44
shopt -s complete_fullquote
shopt -u direxpand
shopt -u dirspell
shopt -u dotglob
shopt -u execfail
shopt -u expand_aliases
shopt -u extdebug
shopt -u extglob
shopt -s extquote
shopt -u failglob
shopt -s force_fignore
shopt -s globasciiranges
shopt -s globskipdots
shopt -u globstar
shopt -u gnu_errfmt
shopt -u histappend
shopt -u histreedit
shopt -u histverify
shopt -s hostcomplete
shopt -u huponexit
shopt -u inherit_errexit
shopt -s interactive_comments
shopt -u lastpipe
shopt -u lithist
shopt -u localvar_inherit
shopt -u localvar_unset
shopt -s login_shell
shopt -u mailwarn
shopt -u no_empty_cmd_completion
shopt -u nocaseglob
shopt -u nocasematch
shopt -u noexpand_translation
shopt -u nullglob
shopt -s patsub_replacement
shopt -s progcomp
shopt -u progcomp_alias
shopt -s promptvars
shopt -u restricted_shell
shopt -u shift_verbose
shopt -s sourcepath
shopt -u varredir_close
shopt -u xpg_echo
set -o braceexpand
set -o hashall
set -o interactive-comments
set -o monitor
set -o onecmd
shopt -s expand_aliases
# Aliases
alias -- help='cat /home/bankstartup2025/README-cloudshell.txt'
# Check for rg availability
if ! command -v rg >/dev/null 2>&1; then
  alias rg='/usr/local/nvm/versions/node/v22.18.0/lib/node_modules/\@anthropic-ai/claude-code/vendor/ripgrep/x64-linux/rg'
fi
export PATH=/opt/gradle/bin\:/opt/maven/bin\:/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/usr/local/go/bin\:/usr/local/node_packages/node_modules/.bin\:/usr/local/rvm/bin\:/home/bankstartup2025/.gems/bin\:/usr/local/rvm/bin\:/home/bankstartup2025/gopath/bin\:/google/gopath/bin\:/google/flutter/bin\:/usr/local/nvm/versions/node/v22.18.0/bin
