var ic=Object.defineProperty;var o=(Al,Ko)=>ic(Al,"name",{value:Ko,configurable:!0});(()=>{var Al={2410:(R,M,ee)=>{"use strict";ee.d(M,{A:o(()=>C,"A")});var oe=ee(6314),le=ee.n(oe),I=le()(function(v){return v[1]});I.push([R.id,`/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

body a {
	text-decoration: var(--text-link-decoration);
}

h3 {
	display: unset;
	font-size: unset;
	margin-block-start: unset;
	margin-block-end: unset;
	margin-inline-start: unset;
	margin-inline-end: unset;
	font-weight: unset;
}

body a:hover {
	text-decoration: underline;
}

button,
input[type='submit'] {
	color: var(--vscode-button-foreground);
	font-family: var(--vscode-font-family);
	border-radius: 2px;
	border: 1px solid transparent;
	padding: 4px 12px;
	font-size: 13px;
	line-height: 18px;
	white-space: nowrap;
	user-select: none;
}

button:not(.icon-button),
input[type='submit'] {
	background-color: var(--vscode-button-background);
}

input.select-left {
	border-radius: 2px 0 0 2px;
}

button.select-right {
	border-radius: 0 2px 2px 0;
}

button:focus,
input[type='submit']:focus {
	outline-color: var(--vscode-focusBorder);
	outline-style: solid;
	outline-width: 1px;
	outline-offset: 2px;
}

button:hover:enabled,
button:focus:enabled,
input[type='submit']:focus:enabled,
input[type='submit']:hover:enabled {
	background-color: var(--vscode-button-hoverBackground);
	cursor: pointer;
}

button.secondary {
	background-color: var(--vscode-button-secondaryBackground);
	color: var(--vscode-button-secondaryForeground);
}

button.secondary:hover:enabled,
button.secondary:focus:enabled,
input[type='submit'].secondary:focus:enabled,
input[type='submit'].secondary:hover:enabled {
	background-color: var(--vscode-button-secondaryHoverBackground);
}

textarea,
input[type='text'] {
	display: block;
	box-sizing: border-box;
	padding: 8px;
	width: 100%;
	resize: vertical;
	font-size: 13px;
	border: 1px solid var(--vscode-dropdown-border);
	background-color: var(--vscode-input-background);
	color: var(--vscode-input-foreground);
	font-family: var(--vscode-font-family);
	border-radius: 2px;
}

textarea::placeholder,
input[type='text']::placeholder {
	color: var(--vscode-input-placeholderForeground);
}

select {
	display: block;
	box-sizing: border-box;
	padding: 4px 8px;
	border-radius: 2px;
	font-size: 13px;
	border: 1px solid var(--vscode-dropdown-border);
	background-color: var(--vscode-dropdown-background);
	color: var(--vscode-dropdown-foreground);
}

textarea:focus,
input[type='text']:focus,
input[type='checkbox']:focus,
select:focus {
	outline: 1px solid var(--vscode-focusBorder);
}

input[type='checkbox'] {
	outline-offset: 1px;
}

.vscode-high-contrast input[type='checkbox'] {
	outline: 1px solid var(--vscode-contrastBorder);
}

.vscode-high-contrast input[type='checkbox']:focus {
	outline: 1px solid var(--vscode-contrastActiveBorder);
}

svg path {
	fill: var(--vscode-foreground);
}

body button:disabled,
input[type='submit']:disabled {
	opacity: 0.4;
}

body .hidden {
	display: none !important;
}

body img.avatar,
body span.avatar-icon svg {
	width: 20px;
	height: 20px;
	border-radius: 50%;
}

body img.avatar {
	vertical-align: middle;
}

.avatar-link {
	flex-shrink: 0;
}

.icon-button {
	display: flex;
	padding: 2px;
	background: transparent;
	border-radius: 4px;
	line-height: 0;
}

.icon-button:hover,
.section .icon-button:hover,
.section .icon-button:focus {
	background-color: var(--vscode-toolbar-hoverBackground);
}

.icon-button:focus,
.section .icon-button:focus {
	outline: 1px solid var(--vscode-focusBorder);
	outline-offset: unset;
}

.label .icon-button:hover,
.label .icon-button:focus {
	background-color: transparent;
}

.section-item {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.section-item .avatar-link {
	margin-right: 8px;
}

.section-item .avatar-container {
	flex-shrink: 0;
}

.section-item .login {
	width: 129px;
	flex-shrink: 0;
}

.section-item img.avatar {
	width: 20px;
	height: 20px;
}

.section-icon {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 3px;
}

.section-icon.changes svg path {
	fill: var(--vscode-list-errorForeground);
}

.section-icon.commented svg path,
.section-icon.requested svg path {
	fill: var(--vscode-list-warningForeground);
}

.section-icon.approved svg path {
	fill: var(--vscode-issues-open);
}

.reviewer-icons {
	display: flex;
	gap: 4px;
}

.push-right {
	margin-left: auto;
}

.avatar-with-author {
	display: flex;
	align-items: center;
}

.author-link {
	font-weight: 600;
	color: var(--vscode-editor-foreground);
}

.status-item button {
	margin-left: auto;
	margin-right: 0;
}

.automerge-section {
	display: flex;
}

.automerge-section,
.status-section {
	flex-wrap: wrap;
}

#status-checks .automerge-section {
	align-items: center;
	padding: 16px;
	background: var(--vscode-editorHoverWidget-background);
	border-bottom-left-radius: 3px;
	border-bottom-right-radius: 3px;
}

.automerge-section .merge-select-container {
	margin-left: 8px;
}

.automerge-checkbox-wrapper,
.automerge-checkbox-label {
	display: flex;
	align-items: center;
	margin-right: 4px;
}

.automerge-checkbox-label {
	min-width: 80px;
}

.merge-queue-title .merge-queue-pending {
	color: var(--vscode-list-warningForeground);
}

.merge-queue-title .merge-queue-blocked {
	color: var(--vscode-list-errorForeground);
}

.merge-queue-title {
	font-weight: bold;
	font-size: larger;
}

/** Theming */

.vscode-high-contrast button:not(.secondary):not(.icon-button) {
	background: var(--vscode-button-background);
}


.vscode-high-contrast input {
	outline: none;
	background: var(--vscode-input-background);
	border: 1px solid var(--vscode-contrastBorder);
}

.vscode-high-contrast button:focus {
	border: 1px solid var(--vscode-contrastActiveBorder);
}

.vscode-high-contrast button:hover {
	border: 1px dotted var(--vscode-contrastActiveBorder);
}

::-webkit-scrollbar-corner {
	display: none;
}

.labels-list {
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
}

.label {
	display: flex;
	justify-content: normal;
	padding: 0 8px;
	border-radius: 20px;
	border-style: solid;
	border-width: 1px;
	background: var(--vscode-badge-background);
	color: var(--vscode-badge-foreground);
	font-size: 11px;
	line-height: 18px;
	font-weight: 600;
}

/* split button */

.primary-split-button {
	display: flex;
	flex-grow: 1;
	min-width: 0;
	max-width: 260px;
}

button.split-left {
	border-radius: 2px 0 0 2px;
	flex-grow: 1;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}

.split {
	width: 1px;
	height: 100%;
	background-color: var(--vscode-button-background);
	opacity: 0.5;
}

button.split-right {
	border-radius: 0 2px 2px 0;
	cursor: pointer;
	width: 24px;
	height: 28px;
	position: relative;
}

button.split-right:disabled {
	cursor: default;
}

button.split-right .icon {
	pointer-events: none;
	position: absolute;
	top: 6px;
	right: 4px;
}

button.split-right .icon svg path {
	fill: unset;
}
button.input-box {
	display: block;
	height: 24px;
	margin-top: -4px;
	padding-top: 2px;
	padding-left: 8px;
	text-align: left;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	color: var(--vscode-input-foreground) !important;
	background-color: var(--vscode-input-background) !important;
}

button.input-box:active,
button.input-box:focus {
	color: var(--vscode-inputOption-activeForeground) !important;
	background-color: var(--vscode-inputOption-activeBackground) !important;
}

button.input-box:hover:not(:disabled) {
	background-color: var(--vscode-inputOption-hoverBackground) !important;
}

button.input-box:focus {
	border-color: var(--vscode-focusBorder) !important;
}

.dropdown-container {
	display: flex;
	flex-grow: 1;
	min-width: 0;
	margin: 0;
	width: 100%;
}

button.inlined-dropdown {
	width: 100%;
	max-width: 150px;
	margin-right: 5px;
	display: inline-block;
	text-align: center;
}`,""]);const C=I},3554:(R,M,ee)=>{"use strict";ee.d(M,{A:o(()=>C,"A")});var oe=ee(6314),le=ee.n(oe),I=le()(function(v){return v[1]});I.push([R.id,`/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

#app {
	display: grid;
	grid-template-columns: 1fr minmax(200px, 300px);
	column-gap: 32px;
}

#title {
	grid-column-start: 1;
	grid-column-end: 3;
	grid-row: 1;
}

#main {
	grid-column: 1;
	grid-row: 2;
	display: flex;
	flex-direction: column;
	gap: 16px;
}

#sidebar {
	display: flex;
	flex-direction: column;
	gap: 16px;
	grid-column: 2;
	grid-row: 2;
}

#project a {
	cursor: pointer;
}

a:focus,
input:focus,
select:focus,
textarea:focus,
.title-text:focus {
	outline: 1px solid var(--vscode-focusBorder);
}

.title-text {
	margin-right: 5px;
}

.title {
	display: flex;
	align-items: flex-start;
	margin: 20px 0;
	padding-bottom: 24px;
	border-bottom: 1px solid var(--vscode-list-inactiveSelectionBackground);
}

.title .pr-number {
	margin-left: 5px;
}

.loading-indicator {
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}

.comment-body li div {
	display: inline;
}

.comment-body li div.Box,
.comment-body li div.Box div {
	display: block;
}

.comment-body code,
.comment-body a,
span.lineContent {
	overflow-wrap: anywhere;
}

.comment-reactions {
	display: flex;
	flex-direction: row;
}

.comment-reactions div {
	font-size: 1.1em;
	cursor: pointer;
	user-select: none;
}

.comment-reactions .reaction-label {
	border-radius: 5px;
	border: 1px solid var(--vscode-panel-border);
	width: 14px;
}

#title:empty {
	border: none;
}

h2 {
	margin: 0;
}

body hr {
	display: block;
	height: 1px;
	border: 0;
	border-top: 1px solid #555;
	margin: 0 !important;
	padding: 0;
}

body .comment-container .avatar-container {
	margin-right: 12px;
}

body .comment-container .avatar-container a {
	display: flex;
}

body .comment-container .avatar-container img.avatar,
body .comment-container .avatar-container .avatar-icon svg {
	margin-right: 0;
}

.vscode-light .avatar-icon {
	filter: invert(100%);
}

body a.avatar-link:focus {
	outline-offset: 2px;
}

body .comment-container.comment,
body .comment-container.review {
	background-color: var(--vscode-editor-background);
}

.review-comment-container {
	width: 100%;
	max-width: 1000px;
	display: flex;
	flex-direction: column;
	position: relative;
}

body #main>.comment-container>.review-comment-container>.review-comment-header:not(:nth-last-child(2)) {
	border-bottom: 1px solid var(--vscode-editorHoverWidget-border);
}

body .comment-container .review-comment-header {
	position: relative;
	display: flex;
	width: 100%;
	box-sizing: border-box;
	padding: 8px 16px;
	color: var(--vscode-foreground);
	align-items: center;
	background: var(--vscode-editorWidget-background);
	border-top-left-radius: 3px;
	border-top-right-radius: 3px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.review-comment-header.no-details {
	border-bottom-left-radius: 3px;
	border-bottom-right-radius: 3px;
}

.description-header {
	float: right;
	height: 32px;
}

.review-comment-header .comment-actions {
	margin-left: auto;
}

.review-comment-header .pending {
	color: inherit;
	font-style: italic;
}

.comment-actions button {
	background-color: transparent;
	padding: 0;
	line-height: normal;
	font-size: 11px;
}

.comment-actions button svg {
	margin-right: 0;
	height: 14px;
}

.status-scroll {
	max-height: 220px;
	overflow-y: auto;
}

.status-check {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 12px 16px;
	border-bottom: 1px solid var(--vscode-editorHoverWidget-border);
}

.status-check-details {
	display: flex;
	align-items: center;
	gap: 8px;
}

#merge-on-github {
	margin-top: 10px;
}

.status-item {
	padding: 12px 16px;
	border-bottom: 1px solid var(--vscode-editorHoverWidget-border);
}

.status-item:first-of-type {
	background: var(--vscode-editorWidget-background);
	border-top-left-radius: 3px;
	border-top-right-radius: 3px;
}

.status-item,
.form-actions,
.ready-for-review-text-wrapper {
	display: flex;
	gap: 8px;
	align-items: center;
}

.status-item .button-container {
	margin-left: auto;
	margin-right: 0;
}

.commit-association {
	display: flex;
	font-style: italic;
	flex-direction: row-reverse;
	padding-top: 7px;
}

.commit-association span {
	flex-direction: row;
}

.email {
	font-weight: bold;
}

button.input-box {
	float: right;
}

.status-item-detail-text {
	display: flex;
	gap: 8px;
}

.status-check-detail-text {
	margin-right: 8px;
}

.status-section p {
	margin: 0;
}

.status-section .check svg path {
	fill: var(--vscode-issues-open);
}

.status-section .close svg path {
	fill: var(--vscode-errorForeground);
}

.status-section .pending svg path,
.status-section .skip svg path {
	fill: var(--vscode-list-warningForeground);
}

.merge-queue-container,
.ready-for-review-container {
	padding: 16px;
	background-color: var(--vscode-editorWidget-background);
	border-bottom-left-radius: 3px;
	border-bottom-right-radius: 3px;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.ready-for-review-icon {
	width: 16px;
	height: 16px;
}

.ready-for-review-heading {
	font-weight: 600;
}

.ready-for-review-meta {
	font-size: 0.9;
}

#status-checks {
	border: 1px solid var(--vscode-editorHoverWidget-border);
	border-radius: 4px;
}

#status-checks .label {
	display: inline-flex;
	margin-right: 16px;
}

#status-checks a {
	cursor: pointer;
}

#status-checks summary {
	display: flex;
	align-items: center;
}

#status-checks-display-button {
	margin-left: auto;
}

#status-checks .avatar-link svg {
	width: 24px;
	margin-right: 0px;
	vertical-align: middle;
}

.status-check .avatar-link .avatar-icon {
	margin-right: 0px;
}

#status-checks .merge-select-container {
	display: flex;
	align-items: center;
	background-color: var(--vscode-editorWidget-background);
	border-bottom-left-radius: 3px;
	border-bottom-right-radius: 3px;
}

#status-checks .merge-select-container>* {
	margin-right: 5px;
}

#status-checks .merge-select-container>select {
	margin-left: 5px;
}

#status-checks .branch-status-container {
	display: inline-block;
}

#status-checks .branch-status-message {
	display: inline-block;
	line-height: 100%;
	padding: 16px;
}

body .comment-container .review-comment-header>span,
body .comment-container .review-comment-header>a,
body .commit .commit-message>a,
body .merged .merged-message>a {
	margin-right: 6px;
}

body .comment-container .review-comment-container .pending-label,
body .resolved-container .outdatedLabel {
	background: var(--vscode-badge-background);
	color: var(--vscode-badge-foreground);
	font-size: 11px;
	font-weight: 600;
	border-radius: 20px;
	padding: 4px 8px;
	margin-left: 6px;
}

body .resolved-container .unresolvedLabel {
	font-style: italic;
	margin-left: 5px;
}

body .diff .diffPath {
	margin-right: 4px;
}

.comment-container form,
#merge-comment-form {
	padding: 16px;
	background-color: var(--vscode-editorWidget-background);
}

body .comment-container .comment-body,
.review-body {
	padding: 16px;
	border-top: none;
}

body .comment-container .review-comment-container .review-comment-body {
	display: flex;
	flex-direction: column;
	gap: 16px;
	border: none;
}

body .comment-container .comment-body>p,
body .comment-container .comment-body>div>p,
.comment-container .review-body>p {
	margin-top: 0;
	line-height: 1.5em;
}

body .comment-container .comment-body>p:last-child,
body .comment-container .comment-body>div>p:last-child,
.comment-container .review-body>p:last-child {
	margin-bottom: 0;
}

body {
	margin: auto;
	width: 100%;
	max-width: 1280px;
	padding: 0 32px;
	box-sizing: border-box;
}

body .hidden-focusable {
	height: 0 !important;
	overflow: hidden;
}

.comment-actions button:hover:enabled,
.comment-actions button:focus:enabled {
	background-color: transparent;
}

body button.checkedOut {
	color: var(--vscode-foreground);
	opacity: 1 !important;
	background-color: transparent;
}

body button .icon {
	width: 16px;
	height: 16px;
}

.prIcon {
	display: flex;
	border-radius: 10px;
	margin-right: 5px;
	margin-top: 18px;
}

.overview-title h2 {
	font-size: 32px;
}

.overview-title textarea {
	min-height: 50px;
}

.title-container {
	width: 100%;
}

.subtitle {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	row-gap: 12px;
}

.subtitle .avatar,
.subtitle .avatar-icon svg {
	margin-right: 6px;
}

.subtitle .author {
	display: flex;
	align-items: center;
}

.merge-branches {
	display: inline-flex;
	align-items: center;
	gap: 4px;
	flex-wrap: wrap;
}

.branch-tag {
	padding: 2px 4px;
	background: var(--vscode-editorInlayHint-background);
	color: var(--vscode-editorInlayHint-foreground);
	border-radius: 4px;
}

.subtitle .created-at {
	margin-left: auto;
	white-space: nowrap;
}

.button-group {
	display: flex;
	gap: 8px;
}

.small-button {
	display: flex;
	font-size: 11px;
	padding: 0 5px;
}

:not(.status-item)>.small-button {
	font-weight: 600;
}

#status {
	box-sizing: border-box;
	line-height: 18px;
	color: var(--vscode-button-foreground);
	border-radius: 18px;
	padding: 4px 12px;
	margin-right: 10px;
	font-weight: 600;
	display: flex;
	gap: 4px;
}

#status svg path {
	fill: var(--vscode-button-foreground);
}

.vscode-high-contrast #status {
	border: 1px solid var(--vscode-contrastBorder);
	background-color: var(--vscode-badge-background);
	color: var(--vscode-badge-foreground);
}

.vscode-high-contrast #status svg path {
	fill: var(--vscode-badge-foreground);
}

.status-badge-merged {
	background-color: var(--vscode-pullRequests-merged);
}

.status-badge-open {
	background-color: var(--vscode-pullRequests-open);
}

.status-badge-closed {
	background-color: var(--vscode-pullRequests-closed);
}

.status-badge-draft {
	background-color: var(--vscode-pullRequests-draft);
}

.section {
	padding-bottom: 24px;
	border-bottom: 1px solid var(--vscode-editorWidget-border);
	display: flex;
	flex-direction: column;
	gap: 12px;
}

.section:last-of-type {
	padding-bottom: 0px;
	border-bottom: none;
}

.section-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	cursor: pointer;
}

.section-header .section-title {
	font-weight: 600;
}

.section-placeholder {
	color: var(--vscode-descriptionForeground);
}

.assign-yourself:hover {
	cursor: pointer;
}

.section svg {
	width: 16px;
	height: 16px;
	display: block;
	margin-right: 0;
}

.section .icon-button,
.section .icon-button .icon {
	color: currentColor;
}

.icon-button-group {
	display: flex;
	flex-direction: row;
}

.section svg path {
	fill: currentColor;
}

.commit svg {
	width: 16px;
	height: auto;
	margin-right: 8px;
	flex-shrink: 0;
}

.comment-container.commit {
	border: none;
	padding: 4px 16px;
}

.comment-container.commit,
.comment-container.merged {
	box-sizing: border-box;
}

.commit,
.review,
.merged {
	display: flex;
	width: 100%;
	border: none;
	color: var(--vscode-foreground);
}

.review {
	margin: 0px 8px;
	padding: 4px 0;
}

.commit .commit-message,
.merged .merged-message {
	display: flex;
	align-items: center;
	overflow: hidden;
	flex-grow: 1;
}

.commit .commit-message .avatar-container,
.merged .merged-message .avatar-container {
	margin-right: 4px;
	flex-shrink: 0;
}

.commit-message .icon {
	padding-top: 2px;
}

.commit .avatar-container .avatar,
.commit .avatar-container .avatar-icon,
.commit .avatar-container .avatar-icon svg,
.merged .avatar-container .avatar,
.merged .avatar-container .avatar-icon,
.merged .avatar-container .avatar-icon svg {
	width: 18px;
	height: 18px;
}

.message-container {
	display: inline-grid;
}

.commit .commit-message .message,
.merged .merged-message .message {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.timeline-detail {
	display: flex;
	align-items: center;
	gap: 8px;
}

.commit .sha {
	min-width: 50px;
	font-family: var(--vscode-editor-font-family);
	margin-bottom: -2px;
}

.merged .merged-message .message,
.merged .inline-sha {
	margin: 0 4px 0 0;
}

.merged svg {
	width: 14px;
	height: auto;
	margin-right: 8px;
	flex-shrink: 0;
}

.details {
	display: flex;
	flex-direction: column;
	gap: 12px;
	width: 100%;
}

#description .comment-container {
	padding-top: 0px;
}

.comment-container {
	position: relative;
	width: 100%;
	display: flex;
	margin: 0;
	align-items: center;
	border-radius: 4px;
	border: 1px solid var(--vscode-editorHoverWidget-border);
}

.comment-container[data-type='commit'] {
	padding: 8px 0;
	border: none;
}

.comment-container[data-type='commit']+.comment-container[data-type='commit'] {
	border-top: none;
}

.comment-body .review-comment {
	box-sizing: border-box;
	border-top: 1px solid var(--vscode-editorHoverWidget-border);
}

.resolve-comment-row {
	display: flex;
	align-items: center;
	padding: 16px;
	background-color: var(--vscode-editorHoverWidget-background);
	border-top: 1px solid var(--vscode-editorHoverWidget-border);
	border-bottom-left-radius: 3px;
	border-bottom-right-radius: 3px;
}

.review-comment-container .review-comment .review-comment-header {
	padding: 16px 16px 8px 16px;
	border: none;
	background: none;
}

.review-comment-container .review-comment .comment-body {
	border: none;
	padding: 0px 16px 8px 16px;
}

.review-comment-container .review-comment .comment-body:last-of-type {
	padding: 0px 16px 16px 16px;
}

.comment-body .line {
	align-items: center;
	display: flex;
	flex-wrap: wrap;
	margin-bottom: 8px;
}

body .comment-form {
	padding: 20px 0 10px;
}

.review-comment-container .comment-form {
	margin: 0 0 0 36px;
	padding: 10px 0;
}

.task-list-item {
	list-style-type: none;
}

#status-checks textarea {
	margin-top: 10px;
}

textarea {
	min-height: 100px;
	max-height: 500px;
}

.editing-form {
	padding: 5px 0;
	display: flex;
	flex-direction: column;
	min-width: 300px;
}

.editing-form .form-actions {
	display: flex;
	gap: 8px;
	justify-content: flex-end;
}

.comment-form .form-actions>button,
.comment-form .form-actions>input[type='submit'] {
	margin-right: 0;
	margin-left: 0;
}

.primary-split-button {
	flex-grow: unset;
}

.dropdown-container {
	justify-content: right;
}

.form-actions {
	display: flex;
	justify-content: flex-end;
	padding-top: 10px;
}

#rebase-actions {
	flex-direction: row-reverse;
}

.main-comment-form>.form-actions {
	margin-bottom: 10px;
}

.details .comment-body {
	padding: 19px 0;
}

blockquote {
	display: block;
	flex-direction: column;
	margin: 8px 0;
	padding: 8px 12px;
	border-left-width: 5px;
	border-left-style: solid;
}

blockquote p {
	margin: 8px 0;
}

blockquote p:first-child {
	margin-top: 0;
}

blockquote p:last-child {
	margin-bottom: 0;
}

.comment-body a:focus,
.comment-body input:focus,
.comment-body select:focus,
.comment-body textarea:focus {
	outline-offset: -1px;
}

.comment-body hr {
	border: 0;
	height: 2px;
	border-bottom: 2px solid;
}

.comment-body h1 {
	padding-bottom: 0.3em;
	line-height: 1.2;
	border-bottom-width: 1px;
	border-bottom-style: solid;
}

.comment-body h1,
h2,
h3 {
	font-weight: normal;
}

.comment-body h1 code,
.comment-body h2 code,
.comment-body h3 code,
.comment-body h4 code,
.comment-body h5 code,
.comment-body h6 code {
	font-size: inherit;
	line-height: auto;
}

.comment-body table {
	border-collapse: collapse;
}

.comment-body table>thead>tr>th {
	text-align: left;
	border-bottom: 1px solid;
}

.comment-body table>thead>tr>th,
.comment-body table>thead>tr>td,
.comment-body table>tbody>tr>th,
.comment-body table>tbody>tr>td {
	padding: 5px 10px;
}

.comment-body table>tbody>tr+tr>td {
	border-top: 1px solid;
}

code {
	font-family: var(--vscode-editor-font-family), Menlo, Monaco, Consolas, 'Droid Sans Mono', 'Courier New', monospace, 'Droid Sans Fallback';
}

.comment-body .snippet-clipboard-content {
	display: grid;
}

.comment-body video {
	width: 100%;
	border: 1px solid var(--vscode-editorWidget-border);
	border-radius: 4px;
}

.comment-body summary {
	margin-bottom: 8px;
}

.comment-body details summary::marker {
	display: flex;
}

.comment-body details summary svg {
	margin-left: 8px;
}

.comment-body body.wordWrap pre {
	white-space: pre-wrap;
}

.comment-body .mac code {
	font-size: 12px;
	line-height: 18px;
}

.comment-body pre:not(.hljs),
.comment-body pre.hljs code>div {
	padding: 16px;
	border-radius: 3px;
	overflow: auto;
}

.timestamp,
.timestamp:hover {
	color: var(--vscode-descriptionForeground);
	white-space: nowrap;
}

.timestamp {
	overflow: hidden;
	text-overflow: ellipsis;
	padding-left: 8px;
}

/** Theming */

.comment-body pre code {
	color: var(--vscode-editor-foreground);
}

.vscode-light .comment-body pre:not(.hljs),
.vscode-light .comment-body code>div {
	background-color: rgba(220, 220, 220, 0.4);
}

.vscode-dark .comment-body pre:not(.hljs),
.vscode-dark .comment-body code>div {
	background-color: rgba(10, 10, 10, 0.4);
}

.vscode-high-contrast .comment-body pre:not(.hljs),
.vscode-high-contrast .comment-body code>div {
	background-color: var(--vscode-editor-background);
	border: 1px solid var(--vscode-panel-border);
}

.vscode-high-contrast .comment-body h1 {
	border: 1px solid rgb(0, 0, 0);
}

.vscode-high-contrast .comment-container .review-comment-header,
.vscode-high-contrast #status-checks {
	background: none;
	border: 1px solid var(--vscode-panel-border);
}

.vscode-high-contrast .comment-container .comment-body,
.vscode-high-contrast .review-comment-container .review-body {
	border: 1px solid var(--vscode-panel-border);
}

.vscode-light .comment-body table>thead>tr>th {
	border-color: rgba(0, 0, 0, 0.69);
}

.vscode-dark .comment-body table>thead>tr>th {
	border-color: rgba(255, 255, 255, 0.69);
}

.vscode-light .comment-body h1,
.vscode-light .comment-body hr,
.vscode-light .comment-body table>tbody>tr+tr>td {
	border-color: rgba(0, 0, 0, 0.18);
}

.vscode-dark .comment-body h1,
.vscode-dark .comment-body hr,
.vscode-dark .comment-body table>tbody>tr+tr>td {
	border-color: rgba(255, 255, 255, 0.18);
}

.review-comment-body .diff-container {
	border-radius: 4px;
	border: 1px solid var(--vscode-editorHoverWidget-border);
}

.review-comment-body .diff-container .review-comment-container .comment-container {
	padding-top: 0;
}

.review-comment-body .diff-container .comment-container {
	border: none;
}

.review-comment-body .diff-container .review-comment-container .review-comment-header .avatar-container {
	margin-right: 4px;
}

.review-comment-body .diff-container .review-comment-container .review-comment-header .avatar {
	width: 18px;
	height: 18px;
}

.review-comment-body .diff-container .diff {
	border-top: 1px solid var(--vscode-editorWidget-border);
	overflow: scroll;
}

.resolved-container {
	padding: 6px 12px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	background: var(--vscode-editorWidget-background);
	border-top-left-radius: 3px;
	border-top-right-radius: 3px;
}

.resolved-container .diffPath:hover {
	text-decoration: underline;
	color: var(--vscode-textLink-activeForeground);
	cursor: pointer;
}

.diff .diffLine {
	display: flex;
	font-size: 12px;
	line-height: 20px;
}

.win32 .diff .diffLine {
	font-family: var(--vscode-editor-font-family), Consolas, Inconsolata, 'Courier New', monospace;
}

.darwin .diff .diffLine {
	font-family: var(--vscode-editor-font-family), Monaco, Menlo, Inconsolata, 'Courier New', monospace;
}

.linux .diff .diffLine {
	font-family: var(--vscode-editor-font-family), 'Droid Sans Mono', Inconsolata, 'Courier New', monospace, 'Droid Sans Fallback';
}

.diff .diffLine.add {
	background-color: var(--vscode-diffEditor-insertedTextBackground);
}

.diff .diffLine.delete {
	background-color: var(--vscode-diffEditor-removedTextBackground);
}

.diff .diffLine .diffTypeSign {
	user-select: none;
	padding-right: 5px;
}

.diff .diffLine .lineNumber {
	width: 1%;
	min-width: 50px;
	padding-right: 10px;
	padding-left: 10px;
	font-size: 12px;
	line-height: 20px;
	text-align: right;
	white-space: nowrap;
	box-sizing: border-box;
	display: block;
	user-select: none;
	font-family: var(--vscode-editor-font-family);
}

.github-checkbox {
	pointer-events: none;
}

.github-checkbox input {
	color: rgb(84, 84, 84);
	opacity: 0.6;
}

/* High Contrast Mode */

.vscode-high-contrast a:focus {
	outline-color: var(--vscode-contrastActiveBorder);
}

.vscode-high-contrast .title {
	border-bottom: 1px solid var(--vscode-contrastBorder);
}

.vscode-high-contrast .diff .diffLine {
	background: none;
}

.vscode-high-contrast .resolved-container {
	background: none;
}

.vscode-high-contrast .diff-container {
	border: 1px solid var(--vscode-contrastBorder);
}

.vscode-high-contrast .diff .diffLine.add {
	border: 1px dashed var(--vscode-diffEditor-insertedTextBorder);
}

.vscode-high-contrast .diff .diffLine.delete {
	border: 1px dashed var(--vscode-diffEditor-removedTextBorder);
}

@media (max-width: 925px) {
	#app {
		display: block;
	}

	#sidebar {
		display: grid;
		column-gap: 20px;
		grid-template-columns: 50% 50%;
		padding: 0;
		padding-bottom: 24px;
	}

	.section-content {
		display: flex;
		flex-wrap: wrap;
	}

	.section-item {
		display: flex;
	}

	body .hidden-focusable {
		height: initial;
		overflow: initial;
	}

	.section-header button {
		margin-left: 8px;
		display: flex;
	}

	.section-item .login {
		width: auto;
		margin-right: 4px;
	}

	/* Hides bottom borders on bottom two sections */
	.section:nth-last-child(-n + 2) {
		border-bottom: none;
	}
}

.icon {
	width: 16px;
	height: 16px;
	font-size: 16px;
	display: flex;
}

.action-bar {
	position: absolute;
	display: flex;
	justify-content: space-between;
	z-index: 100;
	top: 9px;
	right: 9px;
}

.flex-action-bar {
	display: flex;
	justify-content: space-between;
	align-items: center;
	z-index: 100;
	margin-left: 9px;
	min-width: 42px;
}

.action-bar>button,
.flex-action-bar>button {
	margin-left: 4px;
	margin-right: 4px;
}

.title-editing-form {
	flex-grow: 1;
}

.title-editing-form>.form-actions {
	margin-left: 0;
}

/* permalinks */
.comment-body .Box p {
	margin-block-start: 0px;
	margin-block-end: 0px;
}

.comment-body .Box {
	border-radius: 4px;
	border-style: solid;
	border-width: 1px;
	border-color: var(--vscode-editorHoverWidget-border);
}

.comment-body .Box-header {
	background-color: var(--vscode-editorWidget-background);
	color: var(--vscode-disabledForeground);
	border-bottom-style: solid;
	border-bottom-width: 1px;
	padding: 8px 16px;
	border-bottom-color: var(--vscode-editorHoverWidget-border);
	border-top-left-radius: 3px;
	border-top-right-radius: 3px;
}

.comment-body .blob-num {
	word-wrap: break-word;
	box-sizing: border-box;
	border: 0 !important;
	padding-top: 0 !important;
	padding-bottom: 0 !important;
	min-width: 50px;
	font-family: var(--vscode-editor-font-family);
	font-size: 12px;
	color: var(--vscode-editorLineNumber-foreground);
	line-height: 20px;
	text-align: right;
	white-space: nowrap;
	vertical-align: top;
	cursor: pointer;
	user-select: none;
}

.comment-body .blob-num::before {
	content: attr(data-line-number);
}

.comment-body .blob-code-inner {
	tab-size: 8;
	border: 0 !important;
	padding-top: 0 !important;
	padding-bottom: 0 !important;
	line-height: 20px;
	vertical-align: top;
	display: table-cell;
	overflow: visible;
	font-family: var(--vscode-editor-font-family);
	font-size: 12px;
	word-wrap: anywhere;
	text-indent: 0;
	white-space: pre-wrap;
}

.comment-body .commit-tease-sha {
	font-family: var(--vscode-editor-font-family);
	font-size: 12px;
}

/* Suggestion */
.comment-body .blob-wrapper.data.file .d-table {
	border-radius: 4px;
	border-style: solid;
	border-width: 1px;
	border-collapse: unset;
	border-color: var(--vscode-editorHoverWidget-border);
}

.comment-body .js-suggested-changes-blob {
	border-collapse: collapse;
}

.blob-code-deletion,
.blob-num-deletion {
	border-collapse: collapse;
	background-color: var(--vscode-diffEditor-removedLineBackground);
}

.blob-code-addition,
.blob-num-addition {
	border-collapse: collapse;
	background-color: var(--vscode-diffEditor-insertedLineBackground);
}

.blob-code-marker-addition::before {
	content: "+ ";
}

.blob-code-marker-deletion::before {
	content: "- ";
}
`,""]);const C=I},6314:R=>{"use strict";R.exports=function(M){var ee=[];return ee.toString=o(function(){return this.map(function(le){var I=M(le);return le[2]?"@media ".concat(le[2]," {").concat(I,"}"):I}).join("")},"toString"),ee.i=function(oe,le,I){typeof oe=="string"&&(oe=[[null,oe,""]]);var C={};if(I)for(var v=0;v<this.length;v++){var H=this[v][0];H!=null&&(C[H]=!0)}for(var z=0;z<oe.length;z++){var q=[].concat(oe[z]);I&&C[q[0]]||(le&&(q[2]?q[2]="".concat(le," and ").concat(q[2]):q[2]=le),ee.push(q))}},ee}},4353:function(R){(function(M,ee){R.exports=ee()})(this,function(){"use strict";var M="millisecond",ee="second",oe="minute",le="hour",I="day",C="week",v="month",H="quarter",z="year",q="date",l=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,se=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,J={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},Pe=o(function(V,k,A){var ie=String(V);return!ie||ie.length>=k?V:""+Array(k+1-ie.length).join(A)+V},"$"),Oe={s:Pe,z:o(function(V){var k=-V.utcOffset(),A=Math.abs(k),ie=Math.floor(A/60),G=A%60;return(k<=0?"+":"-")+Pe(ie,2,"0")+":"+Pe(G,2,"0")},"z"),m:o(function V(k,A){if(k.date()<A.date())return-V(A,k);var ie=12*(A.year()-k.year())+(A.month()-k.month()),G=k.clone().add(ie,v),U=A-G<0,ge=k.clone().add(ie+(U?-1:1),v);return+(-(ie+(A-G)/(U?G-ge:ge-G))||0)},"t"),a:o(function(V){return V<0?Math.ceil(V)||0:Math.floor(V)},"a"),p:o(function(V){return{M:v,y:z,w:C,d:I,D:q,h:le,m:oe,s:ee,ms:M,Q:H}[V]||String(V||"").toLowerCase().replace(/s$/,"")},"p"),u:o(function(V){return V===void 0},"u")},$="en",K={};K[$]=J;var me=o(function(V){return V instanceof Z},"m"),P=o(function(V,k,A){var ie;if(!V)return $;if(typeof V=="string")K[V]&&(ie=V),k&&(K[V]=k,ie=V);else{var G=V.name;K[G]=V,ie=G}return!A&&ie&&($=ie),ie||!A&&$},"D"),_=o(function(V,k){if(me(V))return V.clone();var A=typeof k=="object"?k:{};return A.date=V,A.args=arguments,new Z(A)},"v"),S=Oe;S.l=P,S.i=me,S.w=function(V,k){return _(V,{locale:k.$L,utc:k.$u,x:k.$x,$offset:k.$offset})};var Z=function(){function V(A){this.$L=P(A.locale,null,!0),this.parse(A)}o(V,"d");var k=V.prototype;return k.parse=function(A){this.$d=function(ie){var G=ie.date,U=ie.utc;if(G===null)return new Date(NaN);if(S.u(G))return new Date;if(G instanceof Date)return new Date(G);if(typeof G=="string"&&!/Z$/i.test(G)){var ge=G.match(l);if(ge){var ve=ge[2]-1||0,de=(ge[7]||"0").substring(0,3);return U?new Date(Date.UTC(ge[1],ve,ge[3]||1,ge[4]||0,ge[5]||0,ge[6]||0,de)):new Date(ge[1],ve,ge[3]||1,ge[4]||0,ge[5]||0,ge[6]||0,de)}}return new Date(G)}(A),this.$x=A.x||{},this.init()},k.init=function(){var A=this.$d;this.$y=A.getFullYear(),this.$M=A.getMonth(),this.$D=A.getDate(),this.$W=A.getDay(),this.$H=A.getHours(),this.$m=A.getMinutes(),this.$s=A.getSeconds(),this.$ms=A.getMilliseconds()},k.$utils=function(){return S},k.isValid=function(){return this.$d.toString()!=="Invalid Date"},k.isSame=function(A,ie){var G=_(A);return this.startOf(ie)<=G&&G<=this.endOf(ie)},k.isAfter=function(A,ie){return _(A)<this.startOf(ie)},k.isBefore=function(A,ie){return this.endOf(ie)<_(A)},k.$g=function(A,ie,G){return S.u(A)?this[ie]:this.set(G,A)},k.unix=function(){return Math.floor(this.valueOf()/1e3)},k.valueOf=function(){return this.$d.getTime()},k.startOf=function(A,ie){var G=this,U=!!S.u(ie)||ie,ge=S.p(A),ve=o(function(tt,He){var F=S.w(G.$u?Date.UTC(G.$y,He,tt):new Date(G.$y,He,tt),G);return U?F:F.endOf(I)},"$"),de=o(function(tt,He){return S.w(G.toDate()[tt].apply(G.toDate("s"),(U?[0,0,0,0]:[23,59,59,999]).slice(He)),G)},"l"),Ce=this.$W,Ne=this.$M,Be=this.$D,Ue="set"+(this.$u?"UTC":"");switch(ge){case z:return U?ve(1,0):ve(31,11);case v:return U?ve(1,Ne):ve(0,Ne+1);case C:var Xe=this.$locale().weekStart||0,ot=(Ce<Xe?Ce+7:Ce)-Xe;return ve(U?Be-ot:Be+(6-ot),Ne);case I:case q:return de(Ue+"Hours",0);case le:return de(Ue+"Minutes",1);case oe:return de(Ue+"Seconds",2);case ee:return de(Ue+"Milliseconds",3);default:return this.clone()}},k.endOf=function(A){return this.startOf(A,!1)},k.$set=function(A,ie){var G,U=S.p(A),ge="set"+(this.$u?"UTC":""),ve=(G={},G[I]=ge+"Date",G[q]=ge+"Date",G[v]=ge+"Month",G[z]=ge+"FullYear",G[le]=ge+"Hours",G[oe]=ge+"Minutes",G[ee]=ge+"Seconds",G[M]=ge+"Milliseconds",G)[U],de=U===I?this.$D+(ie-this.$W):ie;if(U===v||U===z){var Ce=this.clone().set(q,1);Ce.$d[ve](de),Ce.init(),this.$d=Ce.set(q,Math.min(this.$D,Ce.daysInMonth())).$d}else ve&&this.$d[ve](de);return this.init(),this},k.set=function(A,ie){return this.clone().$set(A,ie)},k.get=function(A){return this[S.p(A)]()},k.add=function(A,ie){var G,U=this;A=Number(A);var ge=S.p(ie),ve=o(function(Ne){var Be=_(U);return S.w(Be.date(Be.date()+Math.round(Ne*A)),U)},"d");if(ge===v)return this.set(v,this.$M+A);if(ge===z)return this.set(z,this.$y+A);if(ge===I)return ve(1);if(ge===C)return ve(7);var de=(G={},G[oe]=6e4,G[le]=36e5,G[ee]=1e3,G)[ge]||1,Ce=this.$d.getTime()+A*de;return S.w(Ce,this)},k.subtract=function(A,ie){return this.add(-1*A,ie)},k.format=function(A){var ie=this;if(!this.isValid())return"Invalid Date";var G=A||"YYYY-MM-DDTHH:mm:ssZ",U=S.z(this),ge=this.$locale(),ve=this.$H,de=this.$m,Ce=this.$M,Ne=ge.weekdays,Be=ge.months,Ue=o(function(He,F,B,ne){return He&&(He[F]||He(ie,G))||B[F].substr(0,ne)},"h"),Xe=o(function(He){return S.s(ve%12||12,He,"0")},"d"),ot=ge.meridiem||function(He,F,B){var ne=He<12?"AM":"PM";return B?ne.toLowerCase():ne},tt={YY:String(this.$y).slice(-2),YYYY:this.$y,M:Ce+1,MM:S.s(Ce+1,2,"0"),MMM:Ue(ge.monthsShort,Ce,Be,3),MMMM:Ue(Be,Ce),D:this.$D,DD:S.s(this.$D,2,"0"),d:String(this.$W),dd:Ue(ge.weekdaysMin,this.$W,Ne,2),ddd:Ue(ge.weekdaysShort,this.$W,Ne,3),dddd:Ne[this.$W],H:String(ve),HH:S.s(ve,2,"0"),h:Xe(1),hh:Xe(2),a:ot(ve,de,!0),A:ot(ve,de,!1),m:String(de),mm:S.s(de,2,"0"),s:String(this.$s),ss:S.s(this.$s,2,"0"),SSS:S.s(this.$ms,3,"0"),Z:U};return G.replace(se,function(He,F){return F||tt[He]||U.replace(":","")})},k.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},k.diff=function(A,ie,G){var U,ge=S.p(ie),ve=_(A),de=6e4*(ve.utcOffset()-this.utcOffset()),Ce=this-ve,Ne=S.m(this,ve);return Ne=(U={},U[z]=Ne/12,U[v]=Ne,U[H]=Ne/3,U[C]=(Ce-de)/6048e5,U[I]=(Ce-de)/864e5,U[le]=Ce/36e5,U[oe]=Ce/6e4,U[ee]=Ce/1e3,U)[ge]||Ce,G?Ne:S.a(Ne)},k.daysInMonth=function(){return this.endOf(v).$D},k.$locale=function(){return K[this.$L]},k.locale=function(A,ie){if(!A)return this.$L;var G=this.clone(),U=P(A,ie,!0);return U&&(G.$L=U),G},k.clone=function(){return S.w(this.$d,this)},k.toDate=function(){return new Date(this.valueOf())},k.toJSON=function(){return this.isValid()?this.toISOString():null},k.toISOString=function(){return this.$d.toISOString()},k.toString=function(){return this.$d.toUTCString()},V}(),te=Z.prototype;return _.prototype=te,[["$ms",M],["$s",ee],["$m",oe],["$H",le],["$W",I],["$M",v],["$y",z],["$D",q]].forEach(function(V){te[V[1]]=function(k){return this.$g(k,V[0],V[1])}}),_.extend=function(V,k){return V.$i||(V(k,Z,_),V.$i=!0),_},_.locale=P,_.isDayjs=me,_.unix=function(V){return _(1e3*V)},_.en=K[$],_.Ls=K,_.p={},_})},8660:function(R){(function(M,ee){R.exports=ee()})(this,function(){"use strict";return function(M,ee,oe){M=M||{};var le=ee.prototype,I={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"};function C(H,z,q,l){return le.fromToBase(H,z,q,l)}o(C,"i"),oe.en.relativeTime=I,le.fromToBase=function(H,z,q,l,se){for(var J,Pe,Oe,$=q.$locale().relativeTime||I,K=M.thresholds||[{l:"s",r:44,d:"second"},{l:"m",r:89},{l:"mm",r:44,d:"minute"},{l:"h",r:89},{l:"hh",r:21,d:"hour"},{l:"d",r:35},{l:"dd",r:25,d:"day"},{l:"M",r:45},{l:"MM",r:10,d:"month"},{l:"y",r:17},{l:"yy",d:"year"}],me=K.length,P=0;P<me;P+=1){var _=K[P];_.d&&(J=l?oe(H).diff(q,_.d,!0):q.diff(H,_.d,!0));var S=(M.rounding||Math.round)(Math.abs(J));if(Oe=J>0,S<=_.r||!_.r){S<=1&&P>0&&(_=K[P-1]);var Z=$[_.l];se&&(S=se(""+S)),Pe=typeof Z=="string"?Z.replace("%d",S):Z(S,z,_.l,Oe);break}}if(z)return Pe;var te=Oe?$.future:$.past;return typeof te=="function"?te(Pe):te.replace("%s",Pe)},le.to=function(H,z){return C(H,z,this,!0)},le.from=function(H,z){return C(H,z,this)};var v=o(function(H){return H.$u?oe.utc():oe()},"d");le.toNow=function(H){return this.to(v(this),H)},le.fromNow=function(H){return this.from(v(this),H)}}})},3581:function(R){(function(M,ee){R.exports=ee()})(this,function(){"use strict";return function(M,ee,oe){oe.updateLocale=function(le,I){var C=oe.Ls[le];if(C)return(I?Object.keys(I):[]).forEach(function(v){C[v]=I[v]}),C}}})},7334:R=>{function M(ee,oe,le){var I,C,v,H,z;oe==null&&(oe=100);function q(){var se=Date.now()-H;se<oe&&se>=0?I=setTimeout(q,oe-se):(I=null,le||(z=ee.apply(v,C),v=C=null))}o(q,"later");var l=o(function(){v=this,C=arguments,H=Date.now();var se=le&&!I;return I||(I=setTimeout(q,oe)),se&&(z=ee.apply(v,C),v=C=null),z},"debounced");return l.clear=function(){I&&(clearTimeout(I),I=null)},l.flush=function(){I&&(z=ee.apply(v,C),v=C=null,clearTimeout(I),I=null)},l}o(M,"debounce"),M.debounce=M,R.exports=M},7007:R=>{"use strict";var M=typeof Reflect=="object"?Reflect:null,ee=M&&typeof M.apply=="function"?M.apply:o(function(_,S,Z){return Function.prototype.apply.call(_,S,Z)},"ReflectApply"),oe;M&&typeof M.ownKeys=="function"?oe=M.ownKeys:Object.getOwnPropertySymbols?oe=o(function(_){return Object.getOwnPropertyNames(_).concat(Object.getOwnPropertySymbols(_))},"ReflectOwnKeys"):oe=o(function(_){return Object.getOwnPropertyNames(_)},"ReflectOwnKeys");function le(P){console&&console.warn&&console.warn(P)}o(le,"ProcessEmitWarning");var I=Number.isNaN||o(function(_){return _!==_},"NumberIsNaN");function C(){C.init.call(this)}o(C,"EventEmitter"),R.exports=C,R.exports.once=me,C.EventEmitter=C,C.prototype._events=void 0,C.prototype._eventsCount=0,C.prototype._maxListeners=void 0;var v=10;function H(P){if(typeof P!="function")throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof P)}o(H,"checkListener"),Object.defineProperty(C,"defaultMaxListeners",{enumerable:!0,get:o(function(){return v},"get"),set:o(function(P){if(typeof P!="number"||P<0||I(P))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+P+".");v=P},"set")}),C.init=function(){(this._events===void 0||this._events===Object.getPrototypeOf(this)._events)&&(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},C.prototype.setMaxListeners=o(function(_){if(typeof _!="number"||_<0||I(_))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+_+".");return this._maxListeners=_,this},"setMaxListeners");function z(P){return P._maxListeners===void 0?C.defaultMaxListeners:P._maxListeners}o(z,"_getMaxListeners"),C.prototype.getMaxListeners=o(function(){return z(this)},"getMaxListeners"),C.prototype.emit=o(function(_){for(var S=[],Z=1;Z<arguments.length;Z++)S.push(arguments[Z]);var te=_==="error",V=this._events;if(V!==void 0)te=te&&V.error===void 0;else if(!te)return!1;if(te){var k;if(S.length>0&&(k=S[0]),k instanceof Error)throw k;var A=new Error("Unhandled error."+(k?" ("+k.message+")":""));throw A.context=k,A}var ie=V[_];if(ie===void 0)return!1;if(typeof ie=="function")ee(ie,this,S);else for(var G=ie.length,U=Oe(ie,G),Z=0;Z<G;++Z)ee(U[Z],this,S);return!0},"emit");function q(P,_,S,Z){var te,V,k;if(H(S),V=P._events,V===void 0?(V=P._events=Object.create(null),P._eventsCount=0):(V.newListener!==void 0&&(P.emit("newListener",_,S.listener?S.listener:S),V=P._events),k=V[_]),k===void 0)k=V[_]=S,++P._eventsCount;else if(typeof k=="function"?k=V[_]=Z?[S,k]:[k,S]:Z?k.unshift(S):k.push(S),te=z(P),te>0&&k.length>te&&!k.warned){k.warned=!0;var A=new Error("Possible EventEmitter memory leak detected. "+k.length+" "+String(_)+" listeners added. Use emitter.setMaxListeners() to increase limit");A.name="MaxListenersExceededWarning",A.emitter=P,A.type=_,A.count=k.length,le(A)}return P}o(q,"_addListener"),C.prototype.addListener=o(function(_,S){return q(this,_,S,!1)},"addListener"),C.prototype.on=C.prototype.addListener,C.prototype.prependListener=o(function(_,S){return q(this,_,S,!0)},"prependListener");function l(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,arguments.length===0?this.listener.call(this.target):this.listener.apply(this.target,arguments)}o(l,"onceWrapper");function se(P,_,S){var Z={fired:!1,wrapFn:void 0,target:P,type:_,listener:S},te=l.bind(Z);return te.listener=S,Z.wrapFn=te,te}o(se,"_onceWrap"),C.prototype.once=o(function(_,S){return H(S),this.on(_,se(this,_,S)),this},"once"),C.prototype.prependOnceListener=o(function(_,S){return H(S),this.prependListener(_,se(this,_,S)),this},"prependOnceListener"),C.prototype.removeListener=o(function(_,S){var Z,te,V,k,A;if(H(S),te=this._events,te===void 0)return this;if(Z=te[_],Z===void 0)return this;if(Z===S||Z.listener===S)--this._eventsCount===0?this._events=Object.create(null):(delete te[_],te.removeListener&&this.emit("removeListener",_,Z.listener||S));else if(typeof Z!="function"){for(V=-1,k=Z.length-1;k>=0;k--)if(Z[k]===S||Z[k].listener===S){A=Z[k].listener,V=k;break}if(V<0)return this;V===0?Z.shift():$(Z,V),Z.length===1&&(te[_]=Z[0]),te.removeListener!==void 0&&this.emit("removeListener",_,A||S)}return this},"removeListener"),C.prototype.off=C.prototype.removeListener,C.prototype.removeAllListeners=o(function(_){var S,Z,te;if(Z=this._events,Z===void 0)return this;if(Z.removeListener===void 0)return arguments.length===0?(this._events=Object.create(null),this._eventsCount=0):Z[_]!==void 0&&(--this._eventsCount===0?this._events=Object.create(null):delete Z[_]),this;if(arguments.length===0){var V=Object.keys(Z),k;for(te=0;te<V.length;++te)k=V[te],k!=="removeListener"&&this.removeAllListeners(k);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if(S=Z[_],typeof S=="function")this.removeListener(_,S);else if(S!==void 0)for(te=S.length-1;te>=0;te--)this.removeListener(_,S[te]);return this},"removeAllListeners");function J(P,_,S){var Z=P._events;if(Z===void 0)return[];var te=Z[_];return te===void 0?[]:typeof te=="function"?S?[te.listener||te]:[te]:S?K(te):Oe(te,te.length)}o(J,"_listeners"),C.prototype.listeners=o(function(_){return J(this,_,!0)},"listeners"),C.prototype.rawListeners=o(function(_){return J(this,_,!1)},"rawListeners"),C.listenerCount=function(P,_){return typeof P.listenerCount=="function"?P.listenerCount(_):Pe.call(P,_)},C.prototype.listenerCount=Pe;function Pe(P){var _=this._events;if(_!==void 0){var S=_[P];if(typeof S=="function")return 1;if(S!==void 0)return S.length}return 0}o(Pe,"listenerCount"),C.prototype.eventNames=o(function(){return this._eventsCount>0?oe(this._events):[]},"eventNames");function Oe(P,_){for(var S=new Array(_),Z=0;Z<_;++Z)S[Z]=P[Z];return S}o(Oe,"arrayClone");function $(P,_){for(;_+1<P.length;_++)P[_]=P[_+1];P.pop()}o($,"spliceOne");function K(P){for(var _=new Array(P.length),S=0;S<_.length;++S)_[S]=P[S].listener||P[S];return _}o(K,"unwrapListeners");function me(P,_){return new Promise(function(S,Z){function te(){V!==void 0&&P.removeListener("error",V),S([].slice.call(arguments))}o(te,"eventListener");var V;_!=="error"&&(V=o(function(A){P.removeListener(_,te),Z(A)},"errorListener"),P.once("error",V)),P.once(_,te)})}o(me,"once")},5228:R=>{"use strict";/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var M=Object.getOwnPropertySymbols,ee=Object.prototype.hasOwnProperty,oe=Object.prototype.propertyIsEnumerable;function le(C){if(C==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(C)}o(le,"toObject");function I(){try{if(!Object.assign)return!1;var C=new String("abc");if(C[5]="de",Object.getOwnPropertyNames(C)[0]==="5")return!1;for(var v={},H=0;H<10;H++)v["_"+String.fromCharCode(H)]=H;var z=Object.getOwnPropertyNames(v).map(function(l){return v[l]});if(z.join("")!=="0123456789")return!1;var q={};return"abcdefghijklmnopqrst".split("").forEach(function(l){q[l]=l}),Object.keys(Object.assign({},q)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}o(I,"shouldUseNative"),R.exports=I()?Object.assign:function(C,v){for(var H,z=le(C),q,l=1;l<arguments.length;l++){H=Object(arguments[l]);for(var se in H)ee.call(H,se)&&(z[se]=H[se]);if(M){q=M(H);for(var J=0;J<q.length;J++)oe.call(H,q[J])&&(z[q[J]]=H[q[J]])}}return z}},7975:R=>{"use strict";function M(I){if(typeof I!="string")throw new TypeError("Path must be a string. Received "+JSON.stringify(I))}o(M,"assertPath");function ee(I,C){for(var v="",H=0,z=-1,q=0,l,se=0;se<=I.length;++se){if(se<I.length)l=I.charCodeAt(se);else{if(l===47)break;l=47}if(l===47){if(!(z===se-1||q===1))if(z!==se-1&&q===2){if(v.length<2||H!==2||v.charCodeAt(v.length-1)!==46||v.charCodeAt(v.length-2)!==46){if(v.length>2){var J=v.lastIndexOf("/");if(J!==v.length-1){J===-1?(v="",H=0):(v=v.slice(0,J),H=v.length-1-v.lastIndexOf("/")),z=se,q=0;continue}}else if(v.length===2||v.length===1){v="",H=0,z=se,q=0;continue}}C&&(v.length>0?v+="/..":v="..",H=2)}else v.length>0?v+="/"+I.slice(z+1,se):v=I.slice(z+1,se),H=se-z-1;z=se,q=0}else l===46&&q!==-1?++q:q=-1}return v}o(ee,"normalizeStringPosix");function oe(I,C){var v=C.dir||C.root,H=C.base||(C.name||"")+(C.ext||"");return v?v===C.root?v+H:v+I+H:H}o(oe,"_format");var le={resolve:o(function(){for(var C="",v=!1,H,z=arguments.length-1;z>=-1&&!v;z--){var q;z>=0?q=arguments[z]:(H===void 0&&(H=process.cwd()),q=H),M(q),q.length!==0&&(C=q+"/"+C,v=q.charCodeAt(0)===47)}return C=ee(C,!v),v?C.length>0?"/"+C:"/":C.length>0?C:"."},"resolve"),normalize:o(function(C){if(M(C),C.length===0)return".";var v=C.charCodeAt(0)===47,H=C.charCodeAt(C.length-1)===47;return C=ee(C,!v),C.length===0&&!v&&(C="."),C.length>0&&H&&(C+="/"),v?"/"+C:C},"normalize"),isAbsolute:o(function(C){return M(C),C.length>0&&C.charCodeAt(0)===47},"isAbsolute"),join:o(function(){if(arguments.length===0)return".";for(var C,v=0;v<arguments.length;++v){var H=arguments[v];M(H),H.length>0&&(C===void 0?C=H:C+="/"+H)}return C===void 0?".":le.normalize(C)},"join"),relative:o(function(C,v){if(M(C),M(v),C===v||(C=le.resolve(C),v=le.resolve(v),C===v))return"";for(var H=1;H<C.length&&C.charCodeAt(H)===47;++H);for(var z=C.length,q=z-H,l=1;l<v.length&&v.charCodeAt(l)===47;++l);for(var se=v.length,J=se-l,Pe=q<J?q:J,Oe=-1,$=0;$<=Pe;++$){if($===Pe){if(J>Pe){if(v.charCodeAt(l+$)===47)return v.slice(l+$+1);if($===0)return v.slice(l+$)}else q>Pe&&(C.charCodeAt(H+$)===47?Oe=$:$===0&&(Oe=0));break}var K=C.charCodeAt(H+$),me=v.charCodeAt(l+$);if(K!==me)break;K===47&&(Oe=$)}var P="";for($=H+Oe+1;$<=z;++$)($===z||C.charCodeAt($)===47)&&(P.length===0?P+="..":P+="/..");return P.length>0?P+v.slice(l+Oe):(l+=Oe,v.charCodeAt(l)===47&&++l,v.slice(l))},"relative"),_makeLong:o(function(C){return C},"_makeLong"),dirname:o(function(C){if(M(C),C.length===0)return".";for(var v=C.charCodeAt(0),H=v===47,z=-1,q=!0,l=C.length-1;l>=1;--l)if(v=C.charCodeAt(l),v===47){if(!q){z=l;break}}else q=!1;return z===-1?H?"/":".":H&&z===1?"//":C.slice(0,z)},"dirname"),basename:o(function(C,v){if(v!==void 0&&typeof v!="string")throw new TypeError('"ext" argument must be a string');M(C);var H=0,z=-1,q=!0,l;if(v!==void 0&&v.length>0&&v.length<=C.length){if(v.length===C.length&&v===C)return"";var se=v.length-1,J=-1;for(l=C.length-1;l>=0;--l){var Pe=C.charCodeAt(l);if(Pe===47){if(!q){H=l+1;break}}else J===-1&&(q=!1,J=l+1),se>=0&&(Pe===v.charCodeAt(se)?--se===-1&&(z=l):(se=-1,z=J))}return H===z?z=J:z===-1&&(z=C.length),C.slice(H,z)}else{for(l=C.length-1;l>=0;--l)if(C.charCodeAt(l)===47){if(!q){H=l+1;break}}else z===-1&&(q=!1,z=l+1);return z===-1?"":C.slice(H,z)}},"basename"),extname:o(function(C){M(C);for(var v=-1,H=0,z=-1,q=!0,l=0,se=C.length-1;se>=0;--se){var J=C.charCodeAt(se);if(J===47){if(!q){H=se+1;break}continue}z===-1&&(q=!1,z=se+1),J===46?v===-1?v=se:l!==1&&(l=1):v!==-1&&(l=-1)}return v===-1||z===-1||l===0||l===1&&v===z-1&&v===H+1?"":C.slice(v,z)},"extname"),format:o(function(C){if(C===null||typeof C!="object")throw new TypeError('The "pathObject" argument must be of type Object. Received type '+typeof C);return oe("/",C)},"format"),parse:o(function(C){M(C);var v={root:"",dir:"",base:"",ext:"",name:""};if(C.length===0)return v;var H=C.charCodeAt(0),z=H===47,q;z?(v.root="/",q=1):q=0;for(var l=-1,se=0,J=-1,Pe=!0,Oe=C.length-1,$=0;Oe>=q;--Oe){if(H=C.charCodeAt(Oe),H===47){if(!Pe){se=Oe+1;break}continue}J===-1&&(Pe=!1,J=Oe+1),H===46?l===-1?l=Oe:$!==1&&($=1):l!==-1&&($=-1)}return l===-1||J===-1||$===0||$===1&&l===J-1&&l===se+1?J!==-1&&(se===0&&z?v.base=v.name=C.slice(1,J):v.base=v.name=C.slice(se,J)):(se===0&&z?(v.name=C.slice(1,l),v.base=C.slice(1,J)):(v.name=C.slice(se,l),v.base=C.slice(se,J)),v.ext=C.slice(l,J)),se>0?v.dir=C.slice(0,se-1):z&&(v.dir="/"),v},"parse"),sep:"/",delimiter:":",win32:null,posix:null};le.posix=le,R.exports=le},2551:(R,M,ee)=>{"use strict";var oe;/** @license React v16.14.0
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var le=ee(6540),I=ee(5228),C=ee(9982);function v(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}if(o(v,"u"),!le)throw Error(v(227));function H(e,t,n,r,s,c,f,h,L){var T=Array.prototype.slice.call(arguments,3);try{t.apply(n,T)}catch(re){this.onError(re)}}o(H,"ba");var z=!1,q=null,l=!1,se=null,J={onError:o(function(e){z=!0,q=e},"onError")};function Pe(e,t,n,r,s,c,f,h,L){z=!1,q=null,H.apply(J,arguments)}o(Pe,"ja");function Oe(e,t,n,r,s,c,f,h,L){if(Pe.apply(this,arguments),z){if(z){var T=q;z=!1,q=null}else throw Error(v(198));l||(l=!0,se=T)}}o(Oe,"ka");var $=null,K=null,me=null;function P(e,t,n){var r=e.type||"unknown-event";e.currentTarget=me(n),Oe(r,t,void 0,e),e.currentTarget=null}o(P,"oa");var _=null,S={};function Z(){if(_)for(var e in S){var t=S[e],n=_.indexOf(e);if(!(-1<n))throw Error(v(96,e));if(!V[n]){if(!t.extractEvents)throw Error(v(97,e));V[n]=t,n=t.eventTypes;for(var r in n){var s=void 0,c=n[r],f=t,h=r;if(k.hasOwnProperty(h))throw Error(v(99,h));k[h]=c;var L=c.phasedRegistrationNames;if(L){for(s in L)L.hasOwnProperty(s)&&te(L[s],f,h);s=!0}else c.registrationName?(te(c.registrationName,f,h),s=!0):s=!1;if(!s)throw Error(v(98,r,e))}}}}o(Z,"ra");function te(e,t,n){if(A[e])throw Error(v(100,e));A[e]=t,ie[e]=t.eventTypes[n].dependencies}o(te,"ua");var V=[],k={},A={},ie={};function G(e){var t=!1,n;for(n in e)if(e.hasOwnProperty(n)){var r=e[n];if(!S.hasOwnProperty(n)||S[n]!==r){if(S[n])throw Error(v(102,n));S[n]=r,t=!0}}t&&Z()}o(G,"xa");var U=!(typeof window=="undefined"||typeof window.document=="undefined"||typeof window.document.createElement=="undefined"),ge=null,ve=null,de=null;function Ce(e){if(e=K(e)){if(typeof ge!="function")throw Error(v(280));var t=e.stateNode;t&&(t=$(t),ge(e.stateNode,e.type,t))}}o(Ce,"Ca");function Ne(e){ve?de?de.push(e):de=[e]:ve=e}o(Ne,"Da");function Be(){if(ve){var e=ve,t=de;if(de=ve=null,Ce(e),t)for(e=0;e<t.length;e++)Ce(t[e])}}o(Be,"Ea");function Ue(e,t){return e(t)}o(Ue,"Fa");function Xe(e,t,n,r,s){return e(t,n,r,s)}o(Xe,"Ga");function ot(){}o(ot,"Ha");var tt=Ue,He=!1,F=!1;function B(){(ve!==null||de!==null)&&(ot(),Be())}o(B,"La");function ne(e,t,n){if(F)return e(t,n);F=!0;try{return tt(e,t,n)}finally{F=!1,B()}}o(ne,"Ma");var w=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,D=Object.prototype.hasOwnProperty,he={},ke={};function we(e){return D.call(ke,e)?!0:D.call(he,e)?!1:w.test(e)?ke[e]=!0:(he[e]=!0,!1)}o(we,"Ra");function ae(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}o(ae,"Sa");function mt(e,t,n,r){if(t===null||typeof t=="undefined"||ae(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}o(mt,"Ta");function be(e,t,n,r,s,c){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=s,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=c}o(be,"v");var Te={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){Te[e]=new be(e,0,!1,e,null,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];Te[t]=new be(t,1,!1,e[1],null,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(e){Te[e]=new be(e,2,!1,e.toLowerCase(),null,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){Te[e]=new be(e,2,!1,e,null,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){Te[e]=new be(e,3,!1,e.toLowerCase(),null,!1)}),["checked","multiple","muted","selected"].forEach(function(e){Te[e]=new be(e,3,!0,e,null,!1)}),["capture","download"].forEach(function(e){Te[e]=new be(e,4,!1,e,null,!1)}),["cols","rows","size","span"].forEach(function(e){Te[e]=new be(e,6,!1,e,null,!1)}),["rowSpan","start"].forEach(function(e){Te[e]=new be(e,5,!1,e.toLowerCase(),null,!1)});var pt=/[\-:]([a-z])/g;function jr(e){return e[1].toUpperCase()}o(jr,"Va"),"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(pt,jr);Te[t]=new be(t,1,!1,e,null,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(pt,jr);Te[t]=new be(t,1,!1,e,"http://www.w3.org/1999/xlink",!1)}),["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(pt,jr);Te[t]=new be(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1)}),["tabIndex","crossOrigin"].forEach(function(e){Te[e]=new be(e,1,!1,e.toLowerCase(),null,!1)}),Te.xlinkHref=new be("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0),["src","href","action","formAction"].forEach(function(e){Te[e]=new be(e,1,!1,e.toLowerCase(),null,!0)});var yt=le.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;yt.hasOwnProperty("ReactCurrentDispatcher")||(yt.ReactCurrentDispatcher={current:null}),yt.hasOwnProperty("ReactCurrentBatchConfig")||(yt.ReactCurrentBatchConfig={suspense:null});function lr(e,t,n,r){var s=Te.hasOwnProperty(t)?Te[t]:null,c=s!==null?s.type===0:r?!1:!(!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N");c||(mt(t,n,s,r)&&(n=null),r||s===null?we(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):s.mustUseProperty?e[s.propertyName]=n===null?s.type===3?!1:"":n:(t=s.attributeName,r=s.attributeNamespace,n===null?e.removeAttribute(t):(s=s.type,n=s===3||s===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}o(lr,"Xa");var Il=/^(.*)[\\\/]/,ht=typeof Symbol=="function"&&Symbol.for,sr=ht?Symbol.for("react.element"):60103,Ft=ht?Symbol.for("react.portal"):60106,fn=ht?Symbol.for("react.fragment"):60107,Yo=ht?Symbol.for("react.strict_mode"):60108,ar=ht?Symbol.for("react.profiler"):60114,Go=ht?Symbol.for("react.provider"):60109,Xo=ht?Symbol.for("react.context"):60110,Hl=ht?Symbol.for("react.concurrent_mode"):60111,Pn=ht?Symbol.for("react.forward_ref"):60112,On=ht?Symbol.for("react.suspense"):60113,Xt=ht?Symbol.for("react.suspense_list"):60120,Lt=ht?Symbol.for("react.memo"):60115,Jo=ht?Symbol.for("react.lazy"):60116,Fl=ht?Symbol.for("react.block"):60121,zl=typeof Symbol=="function"&&Symbol.iterator;function ur(e){return e===null||typeof e!="object"?null:(e=zl&&e[zl]||e["@@iterator"],typeof e=="function"?e:null)}o(ur,"nb");function fa(e){if(e._status===-1){e._status=0;var t=e._ctor;t=t(),e._result=t,t.then(function(n){e._status===0&&(n=n.default,e._status=1,e._result=n)},function(n){e._status===0&&(e._status=2,e._result=n)})}}o(fa,"ob");function zt(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case fn:return"Fragment";case Ft:return"Portal";case ar:return"Profiler";case Yo:return"StrictMode";case On:return"Suspense";case Xt:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case Xo:return"Context.Consumer";case Go:return"Context.Provider";case Pn:var t=e.render;return t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case Lt:return zt(e.type);case Fl:return zt(e.render);case Jo:if(e=e._status===1?e._result:null)return zt(e)}return null}o(zt,"pb");function ei(e){var t="";do{e:switch(e.tag){case 3:case 4:case 6:case 7:case 10:case 9:var n="";break e;default:var r=e._debugOwner,s=e._debugSource,c=zt(e.type);n=null,r&&(n=zt(r.type)),r=c,c="",s?c=" (at "+s.fileName.replace(Il,"")+":"+s.lineNumber+")":n&&(c=" (created by "+n+")"),n=`
    in `+(r||"Unknown")+c}t+=n,e=e.return}while(e);return t}o(ei,"qb");function Jt(e){switch(typeof e){case"boolean":case"number":case"object":case"string":case"undefined":return e;default:return""}}o(Jt,"rb");function Vl(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}o(Vl,"sb");function ma(e){var t=Vl(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n!="undefined"&&typeof n.get=="function"&&typeof n.set=="function"){var s=n.get,c=n.set;return Object.defineProperty(e,t,{configurable:!0,get:o(function(){return s.call(this)},"get"),set:o(function(f){r=""+f,c.call(this,f)},"set")}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:o(function(){return r},"getValue"),setValue:o(function(f){r=""+f},"setValue"),stopTracking:o(function(){e._valueTracker=null,delete e[t]},"stopTracking")}}}o(ma,"tb");function Br(e){e._valueTracker||(e._valueTracker=ma(e))}o(Br,"xb");function ti(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=Vl(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}o(ti,"yb");function Ur(e,t){var n=t.checked;return I({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n!=null?n:e._wrapperState.initialChecked})}o(Ur,"zb");function ni(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=Jt(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}o(ni,"Ab");function ri(e,t){t=t.checked,t!=null&&lr(e,"checked",t,!1)}o(ri,"Bb");function Wr(e,t){ri(e,t);var n=Jt(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?qr(e,t.type,n):t.hasOwnProperty("defaultValue")&&qr(e,t.type,Jt(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}o(Wr,"Cb");function oi(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}o(oi,"Eb");function qr(e,t,n){(t!=="number"||e.ownerDocument.activeElement!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}o(qr,"Db");function Je(e){var t="";return le.Children.forEach(e,function(n){n!=null&&(t+=n)}),t}o(Je,"Fb");function Zr(e,t){return e=I({children:void 0},t),(t=Je(t.children))&&(e.children=t),e}o(Zr,"Gb");function Dn(e,t,n,r){if(e=e.options,t){t={};for(var s=0;s<n.length;s++)t["$"+n[s]]=!0;for(n=0;n<e.length;n++)s=t.hasOwnProperty("$"+e[n].value),e[n].selected!==s&&(e[n].selected=s),s&&r&&(e[n].defaultSelected=!0)}else{for(n=""+Jt(n),t=null,s=0;s<e.length;s++){if(e[s].value===n){e[s].selected=!0,r&&(e[s].defaultSelected=!0);return}t!==null||e[s].disabled||(t=e[s])}t!==null&&(t.selected=!0)}}o(Dn,"Hb");function Qr(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(v(91));return I({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}o(Qr,"Ib");function An(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(v(92));if(Array.isArray(n)){if(!(1>=n.length))throw Error(v(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:Jt(n)}}o(An,"Jb");function ii(e,t){var n=Jt(t.value),r=Jt(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}o(ii,"Kb");function li(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}o(li,"Lb");var si={html:"http://www.w3.org/1999/xhtml",mathml:"http://www.w3.org/1998/Math/MathML",svg:"http://www.w3.org/2000/svg"};function ai(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}o(ai,"Nb");function Kr(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?ai(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}o(Kr,"Ob");var cr,Yr=function(e){return typeof MSApp!="undefined"&&MSApp.execUnsafeLocalFunction?function(t,n,r,s){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,s)})}:e}(function(e,t){if(e.namespaceURI!==si.svg||"innerHTML"in e)e.innerHTML=t;else{for(cr=cr||document.createElement("div"),cr.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=cr.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function In(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}o(In,"Rb");function Gr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}o(Gr,"Sb");var en={animationend:Gr("Animation","AnimationEnd"),animationiteration:Gr("Animation","AnimationIteration"),animationstart:Gr("Animation","AnimationStart"),transitionend:Gr("Transition","TransitionEnd")},ui={},Xr={};U&&(Xr=document.createElement("div").style,"AnimationEvent"in window||(delete en.animationend.animation,delete en.animationiteration.animation,delete en.animationstart.animation),"TransitionEvent"in window||delete en.transitionend.transition);function dr(e){if(ui[e])return ui[e];if(!en[e])return e;var t=en[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Xr)return ui[e]=t[n];return e}o(dr,"Wb");var ci=dr("animationend"),We=dr("animationiteration"),$l=dr("animationstart"),jl=dr("transitionend"),fr="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Bl=new(typeof WeakMap=="function"?WeakMap:Map);function Jr(e){var t=Bl.get(e);return t===void 0&&(t=new Map,Bl.set(e,t)),t}o(Jr,"cc");function mn(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.effectTag&1026&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}o(mn,"dc");function eo(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}o(eo,"ec");function mr(e){if(mn(e)!==e)throw Error(v(188))}o(mr,"fc");function Ul(e){var t=e.alternate;if(!t){if(t=mn(e),t===null)throw Error(v(188));return t!==e?null:e}for(var n=e,r=t;;){var s=n.return;if(s===null)break;var c=s.alternate;if(c===null){if(r=s.return,r!==null){n=r;continue}break}if(s.child===c.child){for(c=s.child;c;){if(c===n)return mr(s),e;if(c===r)return mr(s),t;c=c.sibling}throw Error(v(188))}if(n.return!==r.return)n=s,r=c;else{for(var f=!1,h=s.child;h;){if(h===n){f=!0,n=s,r=c;break}if(h===r){f=!0,r=s,n=c;break}h=h.sibling}if(!f){for(h=c.child;h;){if(h===n){f=!0,n=c,r=s;break}if(h===r){f=!0,r=c,n=s;break}h=h.sibling}if(!f)throw Error(v(189))}}if(n.alternate!==r)throw Error(v(190))}if(n.tag!==3)throw Error(v(188));return n.stateNode.current===n?e:t}o(Ul,"gc");function di(e){if(e=Ul(e),!e)return null;for(var t=e;;){if(t.tag===5||t.tag===6)return t;if(t.child)t.child.return=t,t=t.child;else{if(t===e)break;for(;!t.sibling;){if(!t.return||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}}return null}o(di,"hc");function Hn(e,t){if(t==null)throw Error(v(30));return e==null?t:Array.isArray(e)?Array.isArray(t)?(e.push.apply(e,t),e):(e.push(t),e):Array.isArray(t)?[e].concat(t):[e,t]}o(Hn,"ic");function fi(e,t,n){Array.isArray(e)?e.forEach(t,n):e&&t.call(n,e)}o(fi,"jc");var pr=null;function mi(e){if(e){var t=e._dispatchListeners,n=e._dispatchInstances;if(Array.isArray(t))for(var r=0;r<t.length&&!e.isPropagationStopped();r++)P(e,t[r],n[r]);else t&&P(e,t,n);e._dispatchListeners=null,e._dispatchInstances=null,e.isPersistent()||e.constructor.release(e)}}o(mi,"lc");function pn(e){if(e!==null&&(pr=Hn(pr,e)),e=pr,pr=null,e){if(fi(e,mi),pr)throw Error(v(95));if(l)throw e=se,l=!1,se=null,e}}o(pn,"mc");function hr(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}o(hr,"nc");function to(e){if(!U)return!1;e="on"+e;var t=e in document;return t||(t=document.createElement("div"),t.setAttribute(e,"return;"),t=typeof t[e]=="function"),t}o(to,"oc");var vr=[];function no(e){e.topLevelType=null,e.nativeEvent=null,e.targetInst=null,e.ancestors.length=0,10>vr.length&&vr.push(e)}o(no,"qc");function pi(e,t,n,r){if(vr.length){var s=vr.pop();return s.topLevelType=e,s.eventSystemFlags=r,s.nativeEvent=t,s.targetInst=n,s}return{topLevelType:e,eventSystemFlags:r,nativeEvent:t,targetInst:n,ancestors:[]}}o(pi,"rc");function hi(e){var t=e.targetInst,n=t;do{if(!n){e.ancestors.push(n);break}var r=n;if(r.tag===3)r=r.stateNode.containerInfo;else{for(;r.return;)r=r.return;r=r.tag!==3?null:r.stateNode.containerInfo}if(!r)break;t=n.tag,t!==5&&t!==6||e.ancestors.push(n),n=$n(r)}while(n);for(n=0;n<e.ancestors.length;n++){t=e.ancestors[n];var s=hr(e.nativeEvent);r=e.topLevelType;var c=e.nativeEvent,f=e.eventSystemFlags;n===0&&(f|=64);for(var h=null,L=0;L<V.length;L++){var T=V[L];T&&(T=T.extractEvents(r,t,c,s,f))&&(h=Hn(h,T))}pn(h)}}o(hi,"sc");function gr(e,t,n){if(!n.has(e)){switch(e){case"scroll":br(t,"scroll",!0);break;case"focus":case"blur":br(t,"focus",!0),br(t,"blur",!0),n.set("blur",null),n.set("focus",null);break;case"cancel":case"close":to(e)&&br(t,e,!0);break;case"invalid":case"submit":case"reset":break;default:fr.indexOf(e)===-1&&$e(e,t)}n.set(e,null)}}o(gr,"uc");var yr,Cr,wr,xr=!1,Ct=[],Tt=null,St=null,wt=null,Fn=new Map,tn=new Map,Er=[],Vt="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput close cancel copy cut paste click change contextmenu reset submit".split(" "),vi="focus blur dragenter dragleave mouseover mouseout pointerover pointerout gotpointercapture lostpointercapture".split(" ");function pa(e,t){var n=Jr(t);Vt.forEach(function(r){gr(r,t,n)}),vi.forEach(function(r){gr(r,t,n)})}o(pa,"Jc");function gi(e,t,n,r,s){return{blockedOn:e,topLevelType:t,eventSystemFlags:n|32,nativeEvent:s,container:r}}o(gi,"Kc");function Wl(e,t){switch(e){case"focus":case"blur":Tt=null;break;case"dragenter":case"dragleave":St=null;break;case"mouseover":case"mouseout":wt=null;break;case"pointerover":case"pointerout":Fn.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":tn.delete(t.pointerId)}}o(Wl,"Lc");function ut(e,t,n,r,s,c){return e===null||e.nativeEvent!==c?(e=gi(t,n,r,s,c),t!==null&&(t=jn(t),t!==null&&Cr(t)),e):(e.eventSystemFlags|=r,e)}o(ut,"Mc");function ha(e,t,n,r,s){switch(t){case"focus":return Tt=ut(Tt,e,t,n,r,s),!0;case"dragenter":return St=ut(St,e,t,n,r,s),!0;case"mouseover":return wt=ut(wt,e,t,n,r,s),!0;case"pointerover":var c=s.pointerId;return Fn.set(c,ut(Fn.get(c)||null,e,t,n,r,s)),!0;case"gotpointercapture":return c=s.pointerId,tn.set(c,ut(tn.get(c)||null,e,t,n,r,s)),!0}return!1}o(ha,"Oc");function yi(e){var t=$n(e.target);if(t!==null){var n=mn(t);if(n!==null){if(t=n.tag,t===13){if(t=eo(n),t!==null){e.blockedOn=t,C.unstable_runWithPriority(e.priority,function(){wr(n)});return}}else if(t===3&&n.stateNode.hydrate){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}o(yi,"Pc");function it(e){if(e.blockedOn!==null)return!1;var t=io(e.topLevelType,e.eventSystemFlags,e.container,e.nativeEvent);if(t!==null){var n=jn(t);return n!==null&&Cr(n),e.blockedOn=t,!1}return!0}o(it,"Qc");function lt(e,t,n){it(e)&&n.delete(t)}o(lt,"Sc");function ql(){for(xr=!1;0<Ct.length;){var e=Ct[0];if(e.blockedOn!==null){e=jn(e.blockedOn),e!==null&&yr(e);break}var t=io(e.topLevelType,e.eventSystemFlags,e.container,e.nativeEvent);t!==null?e.blockedOn=t:Ct.shift()}Tt!==null&&it(Tt)&&(Tt=null),St!==null&&it(St)&&(St=null),wt!==null&&it(wt)&&(wt=null),Fn.forEach(lt),tn.forEach(lt)}o(ql,"Tc");function $t(e,t){e.blockedOn===t&&(e.blockedOn=null,xr||(xr=!0,C.unstable_scheduleCallback(C.unstable_NormalPriority,ql)))}o($t,"Uc");function zn(e){function t(s){return $t(s,e)}if(o(t,"b"),0<Ct.length){$t(Ct[0],e);for(var n=1;n<Ct.length;n++){var r=Ct[n];r.blockedOn===e&&(r.blockedOn=null)}}for(Tt!==null&&$t(Tt,e),St!==null&&$t(St,e),wt!==null&&$t(wt,e),Fn.forEach(t),tn.forEach(t),n=0;n<Er.length;n++)r=Er[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<Er.length&&(n=Er[0],n.blockedOn===null);)yi(n),n.blockedOn===null&&Er.shift()}o(zn,"Vc");var Ci={},wi=new Map,kr=new Map,Zl=["abort","abort",ci,"animationEnd",We,"animationIteration",$l,"animationStart","canplay","canPlay","canplaythrough","canPlayThrough","durationchange","durationChange","emptied","emptied","encrypted","encrypted","ended","ended","error","error","gotpointercapture","gotPointerCapture","load","load","loadeddata","loadedData","loadedmetadata","loadedMetadata","loadstart","loadStart","lostpointercapture","lostPointerCapture","playing","playing","progress","progress","seeking","seeking","stalled","stalled","suspend","suspend","timeupdate","timeUpdate",jl,"transitionEnd","waiting","waiting"];function ro(e,t){for(var n=0;n<e.length;n+=2){var r=e[n],s=e[n+1],c="on"+(s[0].toUpperCase()+s.slice(1));c={phasedRegistrationNames:{bubbled:c,captured:c+"Capture"},dependencies:[r],eventPriority:t},kr.set(r,t),wi.set(r,c),Ci[s]=c}}o(ro,"ad"),ro("blur blur cancel cancel click click close close contextmenu contextMenu copy copy cut cut auxclick auxClick dblclick doubleClick dragend dragEnd dragstart dragStart drop drop focus focus input input invalid invalid keydown keyDown keypress keyPress keyup keyUp mousedown mouseDown mouseup mouseUp paste paste pause pause play play pointercancel pointerCancel pointerdown pointerDown pointerup pointerUp ratechange rateChange reset reset seeked seeked submit submit touchcancel touchCancel touchend touchEnd touchstart touchStart volumechange volumeChange".split(" "),0),ro("drag drag dragenter dragEnter dragexit dragExit dragleave dragLeave dragover dragOver mousemove mouseMove mouseout mouseOut mouseover mouseOver pointermove pointerMove pointerout pointerOut pointerover pointerOver scroll scroll toggle toggle touchmove touchMove wheel wheel".split(" "),1),ro(Zl,2);for(var xi="change selectionchange textInput compositionstart compositionend compositionupdate".split(" "),oo=0;oo<xi.length;oo++)kr.set(xi[oo],0);var Ei=C.unstable_UserBlockingPriority,ki=C.unstable_runWithPriority,hn=!0;function $e(e,t){br(t,e,!1)}o($e,"F");function br(e,t,n){var r=kr.get(t);switch(r===void 0?2:r){case 0:r=bi.bind(null,t,1,e);break;case 1:r=Ql.bind(null,t,1,e);break;default:r=_r.bind(null,t,1,e)}n?e.addEventListener(t,r,!0):e.addEventListener(t,r,!1)}o(br,"vc");function bi(e,t,n,r){He||ot();var s=_r,c=He;He=!0;try{Xe(s,e,t,n,r)}finally{(He=c)||B()}}o(bi,"gd");function Ql(e,t,n,r){ki(Ei,_r.bind(null,e,t,n,r))}o(Ql,"hd");function _r(e,t,n,r){if(hn)if(0<Ct.length&&-1<Vt.indexOf(e))e=gi(null,e,t,n,r),Ct.push(e);else{var s=io(e,t,n,r);if(s===null)Wl(e,r);else if(-1<Vt.indexOf(e))e=gi(s,e,t,n,r),Ct.push(e);else if(!ha(s,e,t,n,r)){Wl(e,r),e=pi(e,r,null,t);try{ne(hi,e)}finally{no(e)}}}}o(_r,"id");function io(e,t,n,r){if(n=hr(r),n=$n(n),n!==null){var s=mn(n);if(s===null)n=null;else{var c=s.tag;if(c===13){if(n=eo(s),n!==null)return n;n=null}else if(c===3){if(s.stateNode.hydrate)return s.tag===3?s.stateNode.containerInfo:null;n=null}else s!==n&&(n=null)}}e=pi(e,r,n,t);try{ne(hi,e)}finally{no(e)}return null}o(io,"Rc");var Vn={animationIterationCount:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Kl=["Webkit","ms","Moz","O"];Object.keys(Vn).forEach(function(e){Kl.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Vn[t]=Vn[e]})});function _i(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||Vn.hasOwnProperty(e)&&Vn[e]?(""+t).trim():t+"px"}o(_i,"ld");function Li(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,s=_i(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,s):e[n]=s}}o(Li,"md");var Ti=I({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function lo(e,t){if(t){if(Ti[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(v(137,e,""));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(v(60));if(!(typeof t.dangerouslySetInnerHTML=="object"&&"__html"in t.dangerouslySetInnerHTML))throw Error(v(61))}if(t.style!=null&&typeof t.style!="object")throw Error(v(62,""))}}o(lo,"od");function so(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}o(so,"pd");var Si=si.html;function Ot(e,t){e=e.nodeType===9||e.nodeType===11?e:e.ownerDocument;var n=Jr(e);t=ie[t];for(var r=0;r<t.length;r++)gr(t[r],e,n)}o(Ot,"rd");function nn(){}o(nn,"sd");function ao(e){if(e=e||(typeof document!="undefined"?document:void 0),typeof e=="undefined")return null;try{return e.activeElement||e.body}catch{return e.body}}o(ao,"td");function Ni(e){for(;e&&e.firstChild;)e=e.firstChild;return e}o(Ni,"ud");function Mi(e,t){var n=Ni(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Ni(n)}}o(Mi,"vd");function Ri(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Ri(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}o(Ri,"wd");function Pi(){for(var e=window,t=ao();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=ao(e.document)}return t}o(Pi,"xd");function Ke(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}o(Ke,"yd");var Lr="$",Oi="/$",uo="$?",co="$!",fo=null,mo=null;function Di(e,t){switch(e){case"button":case"input":case"select":case"textarea":return!!t.autoFocus}return!1}o(Di,"Fd");function po(e,t){return e==="textarea"||e==="option"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}o(po,"Gd");var ho=typeof setTimeout=="function"?setTimeout:void 0,Yl=typeof clearTimeout=="function"?clearTimeout:void 0;function vn(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break}return e}o(vn,"Jd");function Ai(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===Lr||n===co||n===uo){if(t===0)return e;t--}else n===Oi&&t++}e=e.previousSibling}return null}o(Ai,"Kd");var vo=Math.random().toString(36).slice(2),jt="__reactInternalInstance$"+vo,Tr="__reactEventHandlers$"+vo,Sr="__reactContainere$"+vo;function $n(e){var t=e[jt];if(t)return t;for(var n=e.parentNode;n;){if(t=n[Sr]||n[jt]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=Ai(e);e!==null;){if(n=e[jt])return n;e=Ai(e)}return t}e=n,n=e.parentNode}return null}o($n,"tc");function jn(e){return e=e[jt]||e[Sr],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}o(jn,"Nc");function rn(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(v(33))}o(rn,"Pd");function go(e){return e[Tr]||null}o(go,"Qd");function Dt(e){do e=e.return;while(e&&e.tag!==5);return e||null}o(Dt,"Rd");function Gl(e,t){var n=e.stateNode;if(!n)return null;var r=$(n);if(!r)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(v(231,t,typeof n));return n}o(Gl,"Sd");function Ii(e,t,n){(t=Gl(e,n.dispatchConfig.phasedRegistrationNames[t]))&&(n._dispatchListeners=Hn(n._dispatchListeners,t),n._dispatchInstances=Hn(n._dispatchInstances,e))}o(Ii,"Td");function Xl(e){if(e&&e.dispatchConfig.phasedRegistrationNames){for(var t=e._targetInst,n=[];t;)n.push(t),t=Dt(t);for(t=n.length;0<t--;)Ii(n[t],"captured",e);for(t=0;t<n.length;t++)Ii(n[t],"bubbled",e)}}o(Xl,"Ud");function yo(e,t,n){e&&n&&n.dispatchConfig.registrationName&&(t=Gl(e,n.dispatchConfig.registrationName))&&(n._dispatchListeners=Hn(n._dispatchListeners,t),n._dispatchInstances=Hn(n._dispatchInstances,e))}o(yo,"Vd");function Jl(e){e&&e.dispatchConfig.registrationName&&yo(e._targetInst,null,e)}o(Jl,"Wd");function gn(e){fi(e,Xl)}o(gn,"Xd");var xt=null,Nr=null,Mr=null;function Hi(){if(Mr)return Mr;var e,t=Nr,n=t.length,r,s="value"in xt?xt.value:xt.textContent,c=s.length;for(e=0;e<n&&t[e]===s[e];e++);var f=n-e;for(r=1;r<=f&&t[n-r]===s[c-r];r++);return Mr=s.slice(e,1<r?1-r:void 0)}o(Hi,"ae");function Bn(){return!0}o(Bn,"be");function Rr(){return!1}o(Rr,"ce");function vt(e,t,n,r){this.dispatchConfig=e,this._targetInst=t,this.nativeEvent=n,e=this.constructor.Interface;for(var s in e)e.hasOwnProperty(s)&&((t=e[s])?this[s]=t(n):s==="target"?this.target=r:this[s]=n[s]);return this.isDefaultPrevented=(n.defaultPrevented!=null?n.defaultPrevented:n.returnValue===!1)?Bn:Rr,this.isPropagationStopped=Rr,this}o(vt,"G"),I(vt.prototype,{preventDefault:o(function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():typeof e.returnValue!="unknown"&&(e.returnValue=!1),this.isDefaultPrevented=Bn)},"preventDefault"),stopPropagation:o(function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():typeof e.cancelBubble!="unknown"&&(e.cancelBubble=!0),this.isPropagationStopped=Bn)},"stopPropagation"),persist:o(function(){this.isPersistent=Bn},"persist"),isPersistent:Rr,destructor:o(function(){var e=this.constructor.Interface,t;for(t in e)this[t]=null;this.nativeEvent=this._targetInst=this.dispatchConfig=null,this.isPropagationStopped=this.isDefaultPrevented=Rr,this._dispatchInstances=this._dispatchListeners=null},"destructor")}),vt.Interface={type:null,target:null,currentTarget:o(function(){return null},"currentTarget"),eventPhase:null,bubbles:null,cancelable:null,timeStamp:o(function(e){return e.timeStamp||Date.now()},"timeStamp"),defaultPrevented:null,isTrusted:null},vt.extend=function(e){function t(){}o(t,"b");function n(){return r.apply(this,arguments)}o(n,"c");var r=this;t.prototype=r.prototype;var s=new t;return I(s,n.prototype),n.prototype=s,n.prototype.constructor=n,n.Interface=I({},r.Interface,e),n.extend=r.extend,ns(n),n},ns(vt);function es(e,t,n,r){if(this.eventPool.length){var s=this.eventPool.pop();return this.call(s,e,t,n,r),s}return new this(e,t,n,r)}o(es,"ee");function ts(e){if(!(e instanceof this))throw Error(v(279));e.destructor(),10>this.eventPool.length&&this.eventPool.push(e)}o(ts,"fe");function ns(e){e.eventPool=[],e.getPooled=es,e.release=ts}o(ns,"de");var Fi=vt.extend({data:null}),rs=vt.extend({data:null}),os=[9,13,27,32],Co=U&&"CompositionEvent"in window,yn=null;U&&"documentMode"in document&&(yn=document.documentMode);var zi=U&&"TextEvent"in window&&!yn,Vi=U&&(!Co||yn&&8<yn&&11>=yn),$i=" ",At={beforeInput:{phasedRegistrationNames:{bubbled:"onBeforeInput",captured:"onBeforeInputCapture"},dependencies:["compositionend","keypress","textInput","paste"]},compositionEnd:{phasedRegistrationNames:{bubbled:"onCompositionEnd",captured:"onCompositionEndCapture"},dependencies:"blur compositionend keydown keypress keyup mousedown".split(" ")},compositionStart:{phasedRegistrationNames:{bubbled:"onCompositionStart",captured:"onCompositionStartCapture"},dependencies:"blur compositionstart keydown keypress keyup mousedown".split(" ")},compositionUpdate:{phasedRegistrationNames:{bubbled:"onCompositionUpdate",captured:"onCompositionUpdateCapture"},dependencies:"blur compositionupdate keydown keypress keyup mousedown".split(" ")}},wo=!1;function Un(e,t){switch(e){case"keyup":return os.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"blur":return!0;default:return!1}}o(Un,"qe");function ji(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}o(ji,"re");var Bt=!1;function Bi(e,t){switch(e){case"compositionend":return ji(t);case"keypress":return t.which!==32?null:(wo=!0,$i);case"textInput":return e=t.data,e===$i&&wo?null:e;default:return null}}o(Bi,"te");function is(e,t){if(Bt)return e==="compositionend"||!Co&&Un(e,t)?(e=Hi(),Mr=Nr=xt=null,Bt=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Vi&&t.locale!=="ko"?null:t.data;default:return null}}o(is,"ue");var ls={eventTypes:At,extractEvents:o(function(e,t,n,r){var s;if(Co)e:{switch(e){case"compositionstart":var c=At.compositionStart;break e;case"compositionend":c=At.compositionEnd;break e;case"compositionupdate":c=At.compositionUpdate;break e}c=void 0}else Bt?Un(e,n)&&(c=At.compositionEnd):e==="keydown"&&n.keyCode===229&&(c=At.compositionStart);return c?(Vi&&n.locale!=="ko"&&(Bt||c!==At.compositionStart?c===At.compositionEnd&&Bt&&(s=Hi()):(xt=r,Nr="value"in xt?xt.value:xt.textContent,Bt=!0)),c=Fi.getPooled(c,t,n,r),s?c.data=s:(s=ji(n),s!==null&&(c.data=s)),gn(c),s=c):s=null,(e=zi?Bi(e,n):is(e,n))?(t=rs.getPooled(At.beforeInput,t,n,r),t.data=e,gn(t)):t=null,s===null?t:t===null?s:[s,t]},"extractEvents")},Ui={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Wi(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Ui[e.type]:t==="textarea"}o(Wi,"xe");var ss={change:{phasedRegistrationNames:{bubbled:"onChange",captured:"onChangeCapture"},dependencies:"blur change click focus input keydown keyup selectionchange".split(" ")}};function as(e,t,n){return e=vt.getPooled(ss.change,e,t,n),e.type="change",Ne(n),gn(e),e}o(as,"ze");var Wn=null,Pr=null;function us(e){pn(e)}o(us,"Ce");function Or(e){var t=rn(e);if(ti(t))return e}o(Or,"De");function cs(e,t){if(e==="change")return t}o(cs,"Ee");var xo=!1;U&&(xo=to("input")&&(!document.documentMode||9<document.documentMode));function Eo(){Wn&&(Wn.detachEvent("onpropertychange",qi),Pr=Wn=null)}o(Eo,"Ge");function qi(e){if(e.propertyName==="value"&&Or(Pr))if(e=as(Pr,e,hr(e)),He)pn(e);else{He=!0;try{Ue(us,e)}finally{He=!1,B()}}}o(qi,"He");function Zi(e,t,n){e==="focus"?(Eo(),Wn=t,Pr=n,Wn.attachEvent("onpropertychange",qi)):e==="blur"&&Eo()}o(Zi,"Ie");function ds(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Or(Pr)}o(ds,"Je");function va(e,t){if(e==="click")return Or(t)}o(va,"Ke");function fs(e,t){if(e==="input"||e==="change")return Or(t)}o(fs,"Le");var ms={eventTypes:ss,_isInputEventSupported:xo,extractEvents:o(function(e,t,n,r){var s=t?rn(t):window,c=s.nodeName&&s.nodeName.toLowerCase();if(c==="select"||c==="input"&&s.type==="file")var f=cs;else if(Wi(s))if(xo)f=fs;else{f=ds;var h=Zi}else(c=s.nodeName)&&c.toLowerCase()==="input"&&(s.type==="checkbox"||s.type==="radio")&&(f=va);if(f&&(f=f(e,t)))return as(f,n,r);h&&h(e,s,t),e==="blur"&&(e=s._wrapperState)&&e.controlled&&s.type==="number"&&qr(s,"number",s.value)},"extractEvents")},qn=vt.extend({view:null,detail:null}),ps={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function hs(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=ps[e])?!!t[e]:!1}o(hs,"Pe");function ko(){return hs}o(ko,"Qe");var Qi=0,Ki=0,Yi=!1,Gi=!1,Zn=qn.extend({screenX:null,screenY:null,clientX:null,clientY:null,pageX:null,pageY:null,ctrlKey:null,shiftKey:null,altKey:null,metaKey:null,getModifierState:ko,button:null,buttons:null,relatedTarget:o(function(e){return e.relatedTarget||(e.fromElement===e.srcElement?e.toElement:e.fromElement)},"relatedTarget"),movementX:o(function(e){if("movementX"in e)return e.movementX;var t=Qi;return Qi=e.screenX,Yi?e.type==="mousemove"?e.screenX-t:0:(Yi=!0,0)},"movementX"),movementY:o(function(e){if("movementY"in e)return e.movementY;var t=Ki;return Ki=e.screenY,Gi?e.type==="mousemove"?e.screenY-t:0:(Gi=!0,0)},"movementY")}),bo=Zn.extend({pointerId:null,width:null,height:null,pressure:null,tangentialPressure:null,tiltX:null,tiltY:null,twist:null,pointerType:null,isPrimary:null}),Cn={mouseEnter:{registrationName:"onMouseEnter",dependencies:["mouseout","mouseover"]},mouseLeave:{registrationName:"onMouseLeave",dependencies:["mouseout","mouseover"]},pointerEnter:{registrationName:"onPointerEnter",dependencies:["pointerout","pointerover"]},pointerLeave:{registrationName:"onPointerLeave",dependencies:["pointerout","pointerover"]}},vs={eventTypes:Cn,extractEvents:o(function(e,t,n,r,s){var c=e==="mouseover"||e==="pointerover",f=e==="mouseout"||e==="pointerout";if(c&&!(s&32)&&(n.relatedTarget||n.fromElement)||!f&&!c)return null;if(c=r.window===r?r:(c=r.ownerDocument)?c.defaultView||c.parentWindow:window,f){if(f=t,t=(t=n.relatedTarget||n.toElement)?$n(t):null,t!==null){var h=mn(t);(t!==h||t.tag!==5&&t.tag!==6)&&(t=null)}}else f=null;if(f===t)return null;if(e==="mouseout"||e==="mouseover")var L=Zn,T=Cn.mouseLeave,re=Cn.mouseEnter,ue="mouse";else(e==="pointerout"||e==="pointerover")&&(L=bo,T=Cn.pointerLeave,re=Cn.pointerEnter,ue="pointer");if(e=f==null?c:rn(f),c=t==null?c:rn(t),T=L.getPooled(T,f,n,r),T.type=ue+"leave",T.target=e,T.relatedTarget=c,n=L.getPooled(re,t,n,r),n.type=ue+"enter",n.target=c,n.relatedTarget=e,r=f,ue=t,r&&ue)e:{for(L=r,re=ue,f=0,e=L;e;e=Dt(e))f++;for(e=0,t=re;t;t=Dt(t))e++;for(;0<f-e;)L=Dt(L),f--;for(;0<e-f;)re=Dt(re),e--;for(;f--;){if(L===re||L===re.alternate)break e;L=Dt(L),re=Dt(re)}L=null}else L=null;for(re=L,L=[];r&&r!==re&&(f=r.alternate,!(f!==null&&f===re));)L.push(r),r=Dt(r);for(r=[];ue&&ue!==re&&(f=ue.alternate,!(f!==null&&f===re));)r.push(ue),ue=Dt(ue);for(ue=0;ue<L.length;ue++)yo(L[ue],"bubbled",T);for(ue=r.length;0<ue--;)yo(r[ue],"captured",n);return s&64?[T,n]:[T]},"extractEvents")};function gs(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}o(gs,"Ze");var on=typeof Object.is=="function"?Object.is:gs,ys=Object.prototype.hasOwnProperty;function Qn(e,t){if(on(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++)if(!ys.call(t,n[r])||!on(e[n[r]],t[n[r]]))return!1;return!0}o(Qn,"bf");var Cs=U&&"documentMode"in document&&11>=document.documentMode,_o={select:{phasedRegistrationNames:{bubbled:"onSelect",captured:"onSelectCapture"},dependencies:"blur contextmenu dragend focus keydown keyup mousedown mouseup selectionchange".split(" ")}},wn=null,Lo=null,ln=null,Ut=!1;function Dr(e,t){var n=t.window===t?t.document:t.nodeType===9?t:t.ownerDocument;return Ut||wn==null||wn!==ao(n)?null:(n=wn,"selectionStart"in n&&Ke(n)?n={start:n.selectionStart,end:n.selectionEnd}:(n=(n.ownerDocument&&n.ownerDocument.defaultView||window).getSelection(),n={anchorNode:n.anchorNode,anchorOffset:n.anchorOffset,focusNode:n.focusNode,focusOffset:n.focusOffset}),ln&&Qn(ln,n)?null:(ln=n,e=vt.getPooled(_o.select,Lo,e,t),e.type="select",e.target=wn,gn(e),e))}o(Dr,"jf");var To={eventTypes:_o,extractEvents:o(function(e,t,n,r,s,c){if(s=c||(r.window===r?r.document:r.nodeType===9?r:r.ownerDocument),!(c=!s)){e:{s=Jr(s),c=ie.onSelect;for(var f=0;f<c.length;f++)if(!s.has(c[f])){s=!1;break e}s=!0}c=!s}if(c)return null;switch(s=t?rn(t):window,e){case"focus":(Wi(s)||s.contentEditable==="true")&&(wn=s,Lo=t,ln=null);break;case"blur":ln=Lo=wn=null;break;case"mousedown":Ut=!0;break;case"contextmenu":case"mouseup":case"dragend":return Ut=!1,Dr(n,r);case"selectionchange":if(Cs)break;case"keydown":case"keyup":return Dr(n,r)}return null},"extractEvents")},So=vt.extend({animationName:null,elapsedTime:null,pseudoElement:null}),No=vt.extend({clipboardData:o(function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData},"clipboardData")}),Mo=qn.extend({relatedTarget:null});function xn(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}o(xn,"of");var Ro={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},sn={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Po=qn.extend({key:o(function(e){if(e.key){var t=Ro[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=xn(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?sn[e.keyCode]||"Unidentified":""},"key"),location:null,ctrlKey:null,shiftKey:null,altKey:null,metaKey:null,repeat:null,locale:null,getModifierState:ko,charCode:o(function(e){return e.type==="keypress"?xn(e):0},"charCode"),keyCode:o(function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},"keyCode"),which:o(function(e){return e.type==="keypress"?xn(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0},"which")}),Oo=Zn.extend({dataTransfer:null}),Do=qn.extend({touches:null,targetTouches:null,changedTouches:null,altKey:null,metaKey:null,ctrlKey:null,shiftKey:null,getModifierState:ko}),Ao=vt.extend({propertyName:null,elapsedTime:null,pseudoElement:null}),i=Zn.extend({deltaX:o(function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},"deltaX"),deltaY:o(function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},"deltaY"),deltaZ:null,deltaMode:null}),a={eventTypes:Ci,extractEvents:o(function(e,t,n,r){var s=wi.get(e);if(!s)return null;switch(e){case"keypress":if(xn(n)===0)return null;case"keydown":case"keyup":e=Po;break;case"blur":case"focus":e=Mo;break;case"click":if(n.button===2)return null;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":e=Zn;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":e=Oo;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":e=Do;break;case ci:case We:case $l:e=So;break;case jl:e=Ao;break;case"scroll":e=qn;break;case"wheel":e=i;break;case"copy":case"cut":case"paste":e=No;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":e=bo;break;default:e=vt}return t=e.getPooled(s,t,n,r),gn(t),t},"extractEvents")};if(_)throw Error(v(101));_=Array.prototype.slice.call("ResponderEventPlugin SimpleEventPlugin EnterLeaveEventPlugin ChangeEventPlugin SelectEventPlugin BeforeInputEventPlugin".split(" ")),Z();var u=jn;$=go,K=u,me=rn,G({SimpleEventPlugin:a,EnterLeaveEventPlugin:vs,ChangeEventPlugin:ms,SelectEventPlugin:To,BeforeInputEventPlugin:ls});var d=[],m=-1;function p(e){0>m||(e.current=d[m],d[m]=null,m--)}o(p,"H");function g(e,t){m++,d[m]=e.current,e.current=t}o(g,"I");var y={},E={current:y},O={current:!1},Q=y;function Y(e,t){var n=e.type.contextTypes;if(!n)return y;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var s={},c;for(c in n)s[c]=t[c];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=s),s}o(Y,"Cf");function W(e){return e=e.childContextTypes,e!=null}o(W,"L");function De(){p(O),p(E)}o(De,"Df");function je(e,t,n){if(E.current!==y)throw Error(v(168));g(E,t),g(O,n)}o(je,"Ef");function ze(e,t,n){var r=e.stateNode;if(e=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var s in r)if(!(s in e))throw Error(v(108,zt(t)||"Unknown",s));return I({},n,{},r)}o(ze,"Ff");function Ee(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||y,Q=E.current,g(E,e),g(O,O.current),!0}o(Ee,"Gf");function Ie(e,t,n){var r=e.stateNode;if(!r)throw Error(v(169));n?(e=ze(e,t,Q),r.__reactInternalMemoizedMergedChildContext=e,p(O),p(E),g(E,e)):p(O),g(O,n)}o(Ie,"Hf");var Fe=C.unstable_runWithPriority,Ze=C.unstable_scheduleCallback,st=C.unstable_cancelCallback,Ye=C.unstable_requestPaint,Se=C.unstable_now,Wt=C.unstable_getCurrentPriorityLevel,Ge=C.unstable_ImmediatePriority,Ve=C.unstable_UserBlockingPriority,ct=C.unstable_NormalPriority,Io=C.unstable_LowPriority,Xi=C.unstable_IdlePriority,ga={},Nu=C.unstable_shouldYield,Mu=Ye!==void 0?Ye:function(){},an=null,Ji=null,ws=!1,ya=Se(),Nt=1e4>ya?Se:function(){return Se()-ya};function el(){switch(Wt()){case Ge:return 99;case Ve:return 98;case ct:return 97;case Io:return 96;case Xi:return 95;default:throw Error(v(332))}}o(el,"ag");function Ca(e){switch(e){case 99:return Ge;case 98:return Ve;case 97:return ct;case 96:return Io;case 95:return Xi;default:throw Error(v(332))}}o(Ca,"bg");function En(e,t){return e=Ca(e),Fe(e,t)}o(En,"cg");function wa(e,t,n){return e=Ca(e),Ze(e,t,n)}o(wa,"dg");function xa(e){return an===null?(an=[e],Ji=Ze(Ge,Ea)):an.push(e),ga}o(xa,"eg");function qt(){if(Ji!==null){var e=Ji;Ji=null,st(e)}Ea()}o(qt,"gg");function Ea(){if(!ws&&an!==null){ws=!0;var e=0;try{var t=an;En(99,function(){for(;e<t.length;e++){var n=t[e];do n=n(!0);while(n!==null)}}),an=null}catch(n){throw an!==null&&(an=an.slice(e+1)),Ze(Ge,qt),n}finally{ws=!1}}}o(Ea,"fg");function tl(e,t,n){return n/=10,1073741821-(((1073741821-e+t/10)/n|0)+1)*n}o(tl,"hg");function It(e,t){if(e&&e.defaultProps){t=I({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n])}return t}o(It,"ig");var nl={current:null},rl=null,Ar=null,ol=null;function xs(){ol=Ar=rl=null}o(xs,"ng");function Es(e){var t=nl.current;p(nl),e.type._context._currentValue=t}o(Es,"og");function ka(e,t){for(;e!==null;){var n=e.alternate;if(e.childExpirationTime<t)e.childExpirationTime=t,n!==null&&n.childExpirationTime<t&&(n.childExpirationTime=t);else if(n!==null&&n.childExpirationTime<t)n.childExpirationTime=t;else break;e=e.return}}o(ka,"pg");function Ir(e,t){rl=e,ol=Ar=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.expirationTime>=t&&(Qt=!0),e.firstContext=null)}o(Ir,"qg");function Mt(e,t){if(ol!==e&&t!==!1&&t!==0)if((typeof t!="number"||t===1073741823)&&(ol=e,t=1073741823),t={context:e,observedBits:t,next:null},Ar===null){if(rl===null)throw Error(v(308));Ar=t,rl.dependencies={expirationTime:0,firstContext:t,responders:null}}else Ar=Ar.next=t;return e._currentValue}o(Mt,"sg");var kn=!1;function ks(e){e.updateQueue={baseState:e.memoizedState,baseQueue:null,shared:{pending:null},effects:null}}o(ks,"ug");function bs(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,baseQueue:e.baseQueue,shared:e.shared,effects:e.effects})}o(bs,"vg");function bn(e,t){return e={expirationTime:e,suspenseConfig:t,tag:0,payload:null,callback:null,next:null},e.next=e}o(bn,"wg");function _n(e,t){if(e=e.updateQueue,e!==null){e=e.shared;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}}o(_n,"xg");function ba(e,t){var n=e.alternate;n!==null&&bs(n,e),e=e.updateQueue,n=e.baseQueue,n===null?(e.baseQueue=t.next=t,t.next=t):(t.next=n.next,n.next=t)}o(ba,"yg");function Ho(e,t,n,r){var s=e.updateQueue;kn=!1;var c=s.baseQueue,f=s.shared.pending;if(f!==null){if(c!==null){var h=c.next;c.next=f.next,f.next=h}c=f,s.shared.pending=null,h=e.alternate,h!==null&&(h=h.updateQueue,h!==null&&(h.baseQueue=f))}if(c!==null){h=c.next;var L=s.baseState,T=0,re=null,ue=null,Me=null;if(h!==null){var Ae=h;do{if(f=Ae.expirationTime,f<r){var Pt={expirationTime:Ae.expirationTime,suspenseConfig:Ae.suspenseConfig,tag:Ae.tag,payload:Ae.payload,callback:Ae.callback,next:null};Me===null?(ue=Me=Pt,re=L):Me=Me.next=Pt,f>T&&(T=f)}else{Me!==null&&(Me=Me.next={expirationTime:1073741823,suspenseConfig:Ae.suspenseConfig,tag:Ae.tag,payload:Ae.payload,callback:Ae.callback,next:null}),wu(f,Ae.suspenseConfig);e:{var at=e,b=Ae;switch(f=t,Pt=n,b.tag){case 1:if(at=b.payload,typeof at=="function"){L=at.call(Pt,L,f);break e}L=at;break e;case 3:at.effectTag=at.effectTag&-4097|64;case 0:if(at=b.payload,f=typeof at=="function"?at.call(Pt,L,f):at,f==null)break e;L=I({},L,f);break e;case 2:kn=!0}}Ae.callback!==null&&(e.effectTag|=32,f=s.effects,f===null?s.effects=[Ae]:f.push(Ae))}if(Ae=Ae.next,Ae===null||Ae===h){if(f=s.shared.pending,f===null)break;Ae=c.next=f.next,f.next=h,s.baseQueue=c=f,s.shared.pending=null}}while(!0)}Me===null?re=L:Me.next=ue,s.baseState=re,s.baseQueue=Me,Rl(T),e.expirationTime=T,e.memoizedState=L}}o(Ho,"zg");function _a(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],s=r.callback;if(s!==null){if(r.callback=null,r=s,s=n,typeof r!="function")throw Error(v(191,r));r.call(s)}}}o(_a,"Cg");var Fo=yt.ReactCurrentBatchConfig,La=new le.Component().refs;function il(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:I({},t,n),e.memoizedState=n,e.expirationTime===0&&(e.updateQueue.baseState=n)}o(il,"Fg");var ll={isMounted:o(function(e){return(e=e._reactInternalFiber)?mn(e)===e:!1},"isMounted"),enqueueSetState:o(function(e,t,n){e=e._reactInternalFiber;var r=Yt(),s=Fo.suspense;r=er(r,e,s),s=bn(r,s),s.payload=t,n!=null&&(s.callback=n),_n(e,s),Nn(e,r)},"enqueueSetState"),enqueueReplaceState:o(function(e,t,n){e=e._reactInternalFiber;var r=Yt(),s=Fo.suspense;r=er(r,e,s),s=bn(r,s),s.tag=1,s.payload=t,n!=null&&(s.callback=n),_n(e,s),Nn(e,r)},"enqueueReplaceState"),enqueueForceUpdate:o(function(e,t){e=e._reactInternalFiber;var n=Yt(),r=Fo.suspense;n=er(n,e,r),r=bn(n,r),r.tag=2,t!=null&&(r.callback=t),_n(e,r),Nn(e,n)},"enqueueForceUpdate")};function Ta(e,t,n,r,s,c,f){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,c,f):t.prototype&&t.prototype.isPureReactComponent?!Qn(n,r)||!Qn(s,c):!0}o(Ta,"Kg");function Sa(e,t,n){var r=!1,s=y,c=t.contextType;return typeof c=="object"&&c!==null?c=Mt(c):(s=W(t)?Q:E.current,r=t.contextTypes,c=(r=r!=null)?Y(e,s):y),t=new t(n,c),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=ll,e.stateNode=t,t._reactInternalFiber=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=s,e.__reactInternalMemoizedMaskedChildContext=c),t}o(Sa,"Lg");function Na(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&ll.enqueueReplaceState(t,t.state,null)}o(Na,"Mg");function _s(e,t,n,r){var s=e.stateNode;s.props=n,s.state=e.memoizedState,s.refs=La,ks(e);var c=t.contextType;typeof c=="object"&&c!==null?s.context=Mt(c):(c=W(t)?Q:E.current,s.context=Y(e,c)),Ho(e,n,s,r),s.state=e.memoizedState,c=t.getDerivedStateFromProps,typeof c=="function"&&(il(e,t,c,n),s.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof s.getSnapshotBeforeUpdate=="function"||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(t=s.state,typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount(),t!==s.state&&ll.enqueueReplaceState(s,s.state,null),Ho(e,n,s,r),s.state=e.memoizedState),typeof s.componentDidMount=="function"&&(e.effectTag|=4)}o(_s,"Ng");var sl=Array.isArray;function zo(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(v(309));var r=n.stateNode}if(!r)throw Error(v(147,e));var s=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===s?t.ref:(t=o(function(c){var f=r.refs;f===La&&(f=r.refs={}),c===null?delete f[s]:f[s]=c},"b"),t._stringRef=s,t)}if(typeof e!="string")throw Error(v(284));if(!n._owner)throw Error(v(290,e))}return e}o(zo,"Pg");function al(e,t){if(e.type!=="textarea")throw Error(v(31,Object.prototype.toString.call(t)==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":t,""))}o(al,"Qg");function Ma(e){function t(b,x){if(e){var N=b.lastEffect;N!==null?(N.nextEffect=x,b.lastEffect=x):b.firstEffect=b.lastEffect=x,x.nextEffect=null,x.effectTag=8}}o(t,"b");function n(b,x){if(!e)return null;for(;x!==null;)t(b,x),x=x.sibling;return null}o(n,"c");function r(b,x){for(b=new Map;x!==null;)x.key!==null?b.set(x.key,x):b.set(x.index,x),x=x.sibling;return b}o(r,"d");function s(b,x){return b=or(b,x),b.index=0,b.sibling=null,b}o(s,"e");function c(b,x,N){return b.index=N,e?(N=b.alternate,N!==null?(N=N.index,N<x?(b.effectTag=2,x):N):(b.effectTag=2,x)):x}o(c,"f");function f(b){return e&&b.alternate===null&&(b.effectTag=2),b}o(f,"g");function h(b,x,N,j){return x===null||x.tag!==6?(x=la(N,b.mode,j),x.return=b,x):(x=s(x,N),x.return=b,x)}o(h,"h");function L(b,x,N,j){return x!==null&&x.elementType===N.type?(j=s(x,N.props),j.ref=zo(b,x,N),j.return=b,j):(j=Pl(N.type,N.key,N.props,null,b.mode,j),j.ref=zo(b,x,N),j.return=b,j)}o(L,"k");function T(b,x,N,j){return x===null||x.tag!==4||x.stateNode.containerInfo!==N.containerInfo||x.stateNode.implementation!==N.implementation?(x=sa(N,b.mode,j),x.return=b,x):(x=s(x,N.children||[]),x.return=b,x)}o(T,"l");function re(b,x,N,j,X){return x===null||x.tag!==7?(x=Mn(N,b.mode,j,X),x.return=b,x):(x=s(x,N),x.return=b,x)}o(re,"m");function ue(b,x,N){if(typeof x=="string"||typeof x=="number")return x=la(""+x,b.mode,N),x.return=b,x;if(typeof x=="object"&&x!==null){switch(x.$$typeof){case sr:return N=Pl(x.type,x.key,x.props,null,b.mode,N),N.ref=zo(b,null,x),N.return=b,N;case Ft:return x=sa(x,b.mode,N),x.return=b,x}if(sl(x)||ur(x))return x=Mn(x,b.mode,N,null),x.return=b,x;al(b,x)}return null}o(ue,"p");function Me(b,x,N,j){var X=x!==null?x.key:null;if(typeof N=="string"||typeof N=="number")return X!==null?null:h(b,x,""+N,j);if(typeof N=="object"&&N!==null){switch(N.$$typeof){case sr:return N.key===X?N.type===fn?re(b,x,N.props.children,j,X):L(b,x,N,j):null;case Ft:return N.key===X?T(b,x,N,j):null}if(sl(N)||ur(N))return X!==null?null:re(b,x,N,j,null);al(b,N)}return null}o(Me,"x");function Ae(b,x,N,j,X){if(typeof j=="string"||typeof j=="number")return b=b.get(N)||null,h(x,b,""+j,X);if(typeof j=="object"&&j!==null){switch(j.$$typeof){case sr:return b=b.get(j.key===null?N:j.key)||null,j.type===fn?re(x,b,j.props.children,X,j.key):L(x,b,j,X);case Ft:return b=b.get(j.key===null?N:j.key)||null,T(x,b,j,X)}if(sl(j)||ur(j))return b=b.get(N)||null,re(x,b,j,X,null);al(x,j)}return null}o(Ae,"z");function Pt(b,x,N,j){for(var X=null,ce=null,ye=x,Re=x=0,qe=null;ye!==null&&Re<N.length;Re++){ye.index>Re?(qe=ye,ye=null):qe=ye.sibling;var Le=Me(b,ye,N[Re],j);if(Le===null){ye===null&&(ye=qe);break}e&&ye&&Le.alternate===null&&t(b,ye),x=c(Le,x,Re),ce===null?X=Le:ce.sibling=Le,ce=Le,ye=qe}if(Re===N.length)return n(b,ye),X;if(ye===null){for(;Re<N.length;Re++)ye=ue(b,N[Re],j),ye!==null&&(x=c(ye,x,Re),ce===null?X=ye:ce.sibling=ye,ce=ye);return X}for(ye=r(b,ye);Re<N.length;Re++)qe=Ae(ye,b,Re,N[Re],j),qe!==null&&(e&&qe.alternate!==null&&ye.delete(qe.key===null?Re:qe.key),x=c(qe,x,Re),ce===null?X=qe:ce.sibling=qe,ce=qe);return e&&ye.forEach(function(Rn){return t(b,Rn)}),X}o(Pt,"ca");function at(b,x,N,j){var X=ur(N);if(typeof X!="function")throw Error(v(150));if(N=X.call(N),N==null)throw Error(v(151));for(var ce=X=null,ye=x,Re=x=0,qe=null,Le=N.next();ye!==null&&!Le.done;Re++,Le=N.next()){ye.index>Re?(qe=ye,ye=null):qe=ye.sibling;var Rn=Me(b,ye,Le.value,j);if(Rn===null){ye===null&&(ye=qe);break}e&&ye&&Rn.alternate===null&&t(b,ye),x=c(Rn,x,Re),ce===null?X=Rn:ce.sibling=Rn,ce=Rn,ye=qe}if(Le.done)return n(b,ye),X;if(ye===null){for(;!Le.done;Re++,Le=N.next())Le=ue(b,Le.value,j),Le!==null&&(x=c(Le,x,Re),ce===null?X=Le:ce.sibling=Le,ce=Le);return X}for(ye=r(b,ye);!Le.done;Re++,Le=N.next())Le=Ae(ye,b,Re,Le.value,j),Le!==null&&(e&&Le.alternate!==null&&ye.delete(Le.key===null?Re:Le.key),x=c(Le,x,Re),ce===null?X=Le:ce.sibling=Le,ce=Le);return e&&ye.forEach(function(oc){return t(b,oc)}),X}return o(at,"D"),function(b,x,N,j){var X=typeof N=="object"&&N!==null&&N.type===fn&&N.key===null;X&&(N=N.props.children);var ce=typeof N=="object"&&N!==null;if(ce)switch(N.$$typeof){case sr:e:{for(ce=N.key,X=x;X!==null;){if(X.key===ce){switch(X.tag){case 7:if(N.type===fn){n(b,X.sibling),x=s(X,N.props.children),x.return=b,b=x;break e}break;default:if(X.elementType===N.type){n(b,X.sibling),x=s(X,N.props),x.ref=zo(b,X,N),x.return=b,b=x;break e}}n(b,X);break}else t(b,X);X=X.sibling}N.type===fn?(x=Mn(N.props.children,b.mode,j,N.key),x.return=b,b=x):(j=Pl(N.type,N.key,N.props,null,b.mode,j),j.ref=zo(b,x,N),j.return=b,b=j)}return f(b);case Ft:e:{for(X=N.key;x!==null;){if(x.key===X)if(x.tag===4&&x.stateNode.containerInfo===N.containerInfo&&x.stateNode.implementation===N.implementation){n(b,x.sibling),x=s(x,N.children||[]),x.return=b,b=x;break e}else{n(b,x);break}else t(b,x);x=x.sibling}x=sa(N,b.mode,j),x.return=b,b=x}return f(b)}if(typeof N=="string"||typeof N=="number")return N=""+N,x!==null&&x.tag===6?(n(b,x.sibling),x=s(x,N),x.return=b,b=x):(n(b,x),x=la(N,b.mode,j),x.return=b,b=x),f(b);if(sl(N))return Pt(b,x,N,j);if(ur(N))return at(b,x,N,j);if(ce&&al(b,N),typeof N=="undefined"&&!X)switch(b.tag){case 1:case 0:throw b=b.type,Error(v(152,b.displayName||b.name||"Component"))}return n(b,x)}}o(Ma,"Rg");var Hr=Ma(!0),Ls=Ma(!1),Vo={},Zt={current:Vo},$o={current:Vo},jo={current:Vo};function Kn(e){if(e===Vo)throw Error(v(174));return e}o(Kn,"ch");function Ts(e,t){switch(g(jo,t),g($o,e),g(Zt,Vo),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Kr(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Kr(t,e)}p(Zt),g(Zt,t)}o(Ts,"dh");function Fr(){p(Zt),p($o),p(jo)}o(Fr,"eh");function Ra(e){Kn(jo.current);var t=Kn(Zt.current),n=Kr(t,e.type);t!==n&&(g($o,e),g(Zt,n))}o(Ra,"fh");function Ss(e){$o.current===e&&(p(Zt),p($o))}o(Ss,"gh");var Qe={current:0};function ul(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data===uo||n.data===co))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.effectTag&64)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}o(ul,"hh");function Ns(e,t){return{responder:e,props:t}}o(Ns,"ih");var cl=yt.ReactCurrentDispatcher,Rt=yt.ReactCurrentBatchConfig,Ln=0,et=null,dt=null,ft=null,dl=!1;function Et(){throw Error(v(321))}o(Et,"Q");function Ms(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!on(e[n],t[n]))return!1;return!0}o(Ms,"nh");function Rs(e,t,n,r,s,c){if(Ln=c,et=t,t.memoizedState=null,t.updateQueue=null,t.expirationTime=0,cl.current=e===null||e.memoizedState===null?Ru:Pu,e=n(r,s),t.expirationTime===Ln){c=0;do{if(t.expirationTime=0,!(25>c))throw Error(v(301));c+=1,ft=dt=null,t.updateQueue=null,cl.current=Ou,e=n(r,s)}while(t.expirationTime===Ln)}if(cl.current=vl,t=dt!==null&&dt.next!==null,Ln=0,ft=dt=et=null,dl=!1,t)throw Error(v(300));return e}o(Rs,"oh");function zr(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ft===null?et.memoizedState=ft=e:ft=ft.next=e,ft}o(zr,"th");function Vr(){if(dt===null){var e=et.alternate;e=e!==null?e.memoizedState:null}else e=dt.next;var t=ft===null?et.memoizedState:ft.next;if(t!==null)ft=t,dt=e;else{if(e===null)throw Error(v(310));dt=e,e={memoizedState:dt.memoizedState,baseState:dt.baseState,baseQueue:dt.baseQueue,queue:dt.queue,next:null},ft===null?et.memoizedState=ft=e:ft=ft.next=e}return ft}o(Vr,"uh");function Yn(e,t){return typeof t=="function"?t(e):t}o(Yn,"vh");function fl(e){var t=Vr(),n=t.queue;if(n===null)throw Error(v(311));n.lastRenderedReducer=e;var r=dt,s=r.baseQueue,c=n.pending;if(c!==null){if(s!==null){var f=s.next;s.next=c.next,c.next=f}r.baseQueue=s=c,n.pending=null}if(s!==null){s=s.next,r=r.baseState;var h=f=c=null,L=s;do{var T=L.expirationTime;if(T<Ln){var re={expirationTime:L.expirationTime,suspenseConfig:L.suspenseConfig,action:L.action,eagerReducer:L.eagerReducer,eagerState:L.eagerState,next:null};h===null?(f=h=re,c=r):h=h.next=re,T>et.expirationTime&&(et.expirationTime=T,Rl(T))}else h!==null&&(h=h.next={expirationTime:1073741823,suspenseConfig:L.suspenseConfig,action:L.action,eagerReducer:L.eagerReducer,eagerState:L.eagerState,next:null}),wu(T,L.suspenseConfig),r=L.eagerReducer===e?L.eagerState:e(r,L.action);L=L.next}while(L!==null&&L!==s);h===null?c=r:h.next=f,on(r,t.memoizedState)||(Qt=!0),t.memoizedState=r,t.baseState=c,t.baseQueue=h,n.lastRenderedState=r}return[t.memoizedState,n.dispatch]}o(fl,"wh");function ml(e){var t=Vr(),n=t.queue;if(n===null)throw Error(v(311));n.lastRenderedReducer=e;var r=n.dispatch,s=n.pending,c=t.memoizedState;if(s!==null){n.pending=null;var f=s=s.next;do c=e(c,f.action),f=f.next;while(f!==s);on(c,t.memoizedState)||(Qt=!0),t.memoizedState=c,t.baseQueue===null&&(t.baseState=c),n.lastRenderedState=c}return[c,r]}o(ml,"xh");function Ps(e){var t=zr();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e=t.queue={pending:null,dispatch:null,lastRenderedReducer:Yn,lastRenderedState:e},e=e.dispatch=za.bind(null,et,e),[t.memoizedState,e]}o(Ps,"yh");function Os(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=et.updateQueue,t===null?(t={lastEffect:null},et.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}o(Os,"Ah");function Pa(){return Vr().memoizedState}o(Pa,"Bh");function Ds(e,t,n,r){var s=zr();et.effectTag|=e,s.memoizedState=Os(1|t,n,void 0,r===void 0?null:r)}o(Ds,"Ch");function As(e,t,n,r){var s=Vr();r=r===void 0?null:r;var c=void 0;if(dt!==null){var f=dt.memoizedState;if(c=f.destroy,r!==null&&Ms(r,f.deps)){Os(t,n,c,r);return}}et.effectTag|=e,s.memoizedState=Os(1|t,n,c,r)}o(As,"Dh");function Oa(e,t){return Ds(516,4,e,t)}o(Oa,"Eh");function pl(e,t){return As(516,4,e,t)}o(pl,"Fh");function Da(e,t){return As(4,2,e,t)}o(Da,"Gh");function Aa(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}o(Aa,"Hh");function Ia(e,t,n){return n=n!=null?n.concat([e]):null,As(4,2,Aa.bind(null,t,e),n)}o(Ia,"Ih");function Is(){}o(Is,"Jh");function Ha(e,t){return zr().memoizedState=[e,t===void 0?null:t],e}o(Ha,"Kh");function hl(e,t){var n=Vr();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Ms(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}o(hl,"Lh");function Fa(e,t){var n=Vr();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Ms(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}o(Fa,"Mh");function Hs(e,t,n){var r=el();En(98>r?98:r,function(){e(!0)}),En(97<r?97:r,function(){var s=Rt.suspense;Rt.suspense=t===void 0?null:t;try{e(!1),n()}finally{Rt.suspense=s}})}o(Hs,"Nh");function za(e,t,n){var r=Yt(),s=Fo.suspense;r=er(r,e,s),s={expirationTime:r,suspenseConfig:s,action:n,eagerReducer:null,eagerState:null,next:null};var c=t.pending;if(c===null?s.next=s:(s.next=c.next,c.next=s),t.pending=s,c=e.alternate,e===et||c!==null&&c===et)dl=!0,s.expirationTime=Ln,et.expirationTime=Ln;else{if(e.expirationTime===0&&(c===null||c.expirationTime===0)&&(c=t.lastRenderedReducer,c!==null))try{var f=t.lastRenderedState,h=c(f,n);if(s.eagerReducer=c,s.eagerState=h,on(h,f))return}catch{}finally{}Nn(e,r)}}o(za,"zh");var vl={readContext:Mt,useCallback:Et,useContext:Et,useEffect:Et,useImperativeHandle:Et,useLayoutEffect:Et,useMemo:Et,useReducer:Et,useRef:Et,useState:Et,useDebugValue:Et,useResponder:Et,useDeferredValue:Et,useTransition:Et},Ru={readContext:Mt,useCallback:Ha,useContext:Mt,useEffect:Oa,useImperativeHandle:o(function(e,t,n){return n=n!=null?n.concat([e]):null,Ds(4,2,Aa.bind(null,t,e),n)},"useImperativeHandle"),useLayoutEffect:o(function(e,t){return Ds(4,2,e,t)},"useLayoutEffect"),useMemo:o(function(e,t){var n=zr();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},"useMemo"),useReducer:o(function(e,t,n){var r=zr();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e=r.queue={pending:null,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},e=e.dispatch=za.bind(null,et,e),[r.memoizedState,e]},"useReducer"),useRef:o(function(e){var t=zr();return e={current:e},t.memoizedState=e},"useRef"),useState:Ps,useDebugValue:Is,useResponder:Ns,useDeferredValue:o(function(e,t){var n=Ps(e),r=n[0],s=n[1];return Oa(function(){var c=Rt.suspense;Rt.suspense=t===void 0?null:t;try{s(e)}finally{Rt.suspense=c}},[e,t]),r},"useDeferredValue"),useTransition:o(function(e){var t=Ps(!1),n=t[0];return t=t[1],[Ha(Hs.bind(null,t,e),[t,e]),n]},"useTransition")},Pu={readContext:Mt,useCallback:hl,useContext:Mt,useEffect:pl,useImperativeHandle:Ia,useLayoutEffect:Da,useMemo:Fa,useReducer:fl,useRef:Pa,useState:o(function(){return fl(Yn)},"useState"),useDebugValue:Is,useResponder:Ns,useDeferredValue:o(function(e,t){var n=fl(Yn),r=n[0],s=n[1];return pl(function(){var c=Rt.suspense;Rt.suspense=t===void 0?null:t;try{s(e)}finally{Rt.suspense=c}},[e,t]),r},"useDeferredValue"),useTransition:o(function(e){var t=fl(Yn),n=t[0];return t=t[1],[hl(Hs.bind(null,t,e),[t,e]),n]},"useTransition")},Ou={readContext:Mt,useCallback:hl,useContext:Mt,useEffect:pl,useImperativeHandle:Ia,useLayoutEffect:Da,useMemo:Fa,useReducer:ml,useRef:Pa,useState:o(function(){return ml(Yn)},"useState"),useDebugValue:Is,useResponder:Ns,useDeferredValue:o(function(e,t){var n=ml(Yn),r=n[0],s=n[1];return pl(function(){var c=Rt.suspense;Rt.suspense=t===void 0?null:t;try{s(e)}finally{Rt.suspense=c}},[e,t]),r},"useDeferredValue"),useTransition:o(function(e){var t=ml(Yn),n=t[0];return t=t[1],[hl(Hs.bind(null,t,e),[t,e]),n]},"useTransition")},un=null,Tn=null,Gn=!1;function Va(e,t){var n=Gt(5,null,null,0);n.elementType="DELETED",n.type="DELETED",n.stateNode=t,n.return=e,n.effectTag=8,e.lastEffect!==null?(e.lastEffect.nextEffect=n,e.lastEffect=n):e.firstEffect=e.lastEffect=n}o(Va,"Rh");function $a(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,!0):!1;case 13:return!1;default:return!1}}o($a,"Th");function Fs(e){if(Gn){var t=Tn;if(t){var n=t;if(!$a(e,t)){if(t=vn(n.nextSibling),!t||!$a(e,t)){e.effectTag=e.effectTag&-1025|2,Gn=!1,un=e;return}Va(un,n)}un=e,Tn=vn(t.firstChild)}else e.effectTag=e.effectTag&-1025|2,Gn=!1,un=e}}o(Fs,"Uh");function ja(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;un=e}o(ja,"Vh");function gl(e){if(e!==un)return!1;if(!Gn)return ja(e),Gn=!0,!1;var t=e.type;if(e.tag!==5||t!=="head"&&t!=="body"&&!po(t,e.memoizedProps))for(t=Tn;t;)Va(e,t),t=vn(t.nextSibling);if(ja(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(v(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n===Oi){if(t===0){Tn=vn(e.nextSibling);break e}t--}else n!==Lr&&n!==co&&n!==uo||t++}e=e.nextSibling}Tn=null}}else Tn=un?vn(e.stateNode.nextSibling):null;return!0}o(gl,"Wh");function zs(){Tn=un=null,Gn=!1}o(zs,"Xh");var Du=yt.ReactCurrentOwner,Qt=!1;function kt(e,t,n,r){t.child=e===null?Ls(t,null,n,r):Hr(t,e.child,n,r)}o(kt,"R");function Ba(e,t,n,r,s){n=n.render;var c=t.ref;return Ir(t,s),r=Rs(e,t,n,r,c,s),e!==null&&!Qt?(t.updateQueue=e.updateQueue,t.effectTag&=-517,e.expirationTime<=s&&(e.expirationTime=0),cn(e,t,s)):(t.effectTag|=1,kt(e,t,r,s),t.child)}o(Ba,"Zh");function Ua(e,t,n,r,s,c){if(e===null){var f=n.type;return typeof f=="function"&&!ia(f)&&f.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=f,Wa(e,t,f,r,s,c)):(e=Pl(n.type,null,r,null,t.mode,c),e.ref=t.ref,e.return=t,t.child=e)}return f=e.child,s<c&&(s=f.memoizedProps,n=n.compare,n=n!==null?n:Qn,n(s,r)&&e.ref===t.ref)?cn(e,t,c):(t.effectTag|=1,e=or(f,r),e.ref=t.ref,e.return=t,t.child=e)}o(Ua,"ai");function Wa(e,t,n,r,s,c){return e!==null&&Qn(e.memoizedProps,r)&&e.ref===t.ref&&(Qt=!1,s<c)?(t.expirationTime=e.expirationTime,cn(e,t,c)):Vs(e,t,n,r,c)}o(Wa,"ci");function qa(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.effectTag|=128)}o(qa,"ei");function Vs(e,t,n,r,s){var c=W(n)?Q:E.current;return c=Y(t,c),Ir(t,s),n=Rs(e,t,n,r,c,s),e!==null&&!Qt?(t.updateQueue=e.updateQueue,t.effectTag&=-517,e.expirationTime<=s&&(e.expirationTime=0),cn(e,t,s)):(t.effectTag|=1,kt(e,t,n,s),t.child)}o(Vs,"di");function Za(e,t,n,r,s){if(W(n)){var c=!0;Ee(t)}else c=!1;if(Ir(t,s),t.stateNode===null)e!==null&&(e.alternate=null,t.alternate=null,t.effectTag|=2),Sa(t,n,r),_s(t,n,r,s),r=!0;else if(e===null){var f=t.stateNode,h=t.memoizedProps;f.props=h;var L=f.context,T=n.contextType;typeof T=="object"&&T!==null?T=Mt(T):(T=W(n)?Q:E.current,T=Y(t,T));var re=n.getDerivedStateFromProps,ue=typeof re=="function"||typeof f.getSnapshotBeforeUpdate=="function";ue||typeof f.UNSAFE_componentWillReceiveProps!="function"&&typeof f.componentWillReceiveProps!="function"||(h!==r||L!==T)&&Na(t,f,r,T),kn=!1;var Me=t.memoizedState;f.state=Me,Ho(t,r,f,s),L=t.memoizedState,h!==r||Me!==L||O.current||kn?(typeof re=="function"&&(il(t,n,re,r),L=t.memoizedState),(h=kn||Ta(t,n,h,r,Me,L,T))?(ue||typeof f.UNSAFE_componentWillMount!="function"&&typeof f.componentWillMount!="function"||(typeof f.componentWillMount=="function"&&f.componentWillMount(),typeof f.UNSAFE_componentWillMount=="function"&&f.UNSAFE_componentWillMount()),typeof f.componentDidMount=="function"&&(t.effectTag|=4)):(typeof f.componentDidMount=="function"&&(t.effectTag|=4),t.memoizedProps=r,t.memoizedState=L),f.props=r,f.state=L,f.context=T,r=h):(typeof f.componentDidMount=="function"&&(t.effectTag|=4),r=!1)}else f=t.stateNode,bs(e,t),h=t.memoizedProps,f.props=t.type===t.elementType?h:It(t.type,h),L=f.context,T=n.contextType,typeof T=="object"&&T!==null?T=Mt(T):(T=W(n)?Q:E.current,T=Y(t,T)),re=n.getDerivedStateFromProps,(ue=typeof re=="function"||typeof f.getSnapshotBeforeUpdate=="function")||typeof f.UNSAFE_componentWillReceiveProps!="function"&&typeof f.componentWillReceiveProps!="function"||(h!==r||L!==T)&&Na(t,f,r,T),kn=!1,L=t.memoizedState,f.state=L,Ho(t,r,f,s),Me=t.memoizedState,h!==r||L!==Me||O.current||kn?(typeof re=="function"&&(il(t,n,re,r),Me=t.memoizedState),(re=kn||Ta(t,n,h,r,L,Me,T))?(ue||typeof f.UNSAFE_componentWillUpdate!="function"&&typeof f.componentWillUpdate!="function"||(typeof f.componentWillUpdate=="function"&&f.componentWillUpdate(r,Me,T),typeof f.UNSAFE_componentWillUpdate=="function"&&f.UNSAFE_componentWillUpdate(r,Me,T)),typeof f.componentDidUpdate=="function"&&(t.effectTag|=4),typeof f.getSnapshotBeforeUpdate=="function"&&(t.effectTag|=256)):(typeof f.componentDidUpdate!="function"||h===e.memoizedProps&&L===e.memoizedState||(t.effectTag|=4),typeof f.getSnapshotBeforeUpdate!="function"||h===e.memoizedProps&&L===e.memoizedState||(t.effectTag|=256),t.memoizedProps=r,t.memoizedState=Me),f.props=r,f.state=Me,f.context=T,r=re):(typeof f.componentDidUpdate!="function"||h===e.memoizedProps&&L===e.memoizedState||(t.effectTag|=4),typeof f.getSnapshotBeforeUpdate!="function"||h===e.memoizedProps&&L===e.memoizedState||(t.effectTag|=256),r=!1);return $s(e,t,n,r,c,s)}o(Za,"fi");function $s(e,t,n,r,s,c){qa(e,t);var f=(t.effectTag&64)!==0;if(!r&&!f)return s&&Ie(t,n,!1),cn(e,t,c);r=t.stateNode,Du.current=t;var h=f&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.effectTag|=1,e!==null&&f?(t.child=Hr(t,e.child,null,c),t.child=Hr(t,null,h,c)):kt(e,t,h,c),t.memoizedState=r.state,s&&Ie(t,n,!0),t.child}o($s,"gi");function Qa(e){var t=e.stateNode;t.pendingContext?je(e,t.pendingContext,t.pendingContext!==t.context):t.context&&je(e,t.context,!1),Ts(e,t.containerInfo)}o(Qa,"hi");var js={dehydrated:null,retryTime:0};function Ka(e,t,n){var r=t.mode,s=t.pendingProps,c=Qe.current,f=!1,h;if((h=(t.effectTag&64)!==0)||(h=(c&2)!==0&&(e===null||e.memoizedState!==null)),h?(f=!0,t.effectTag&=-65):e!==null&&e.memoizedState===null||s.fallback===void 0||s.unstable_avoidThisFallback===!0||(c|=1),g(Qe,c&1),e===null){if(s.fallback!==void 0&&Fs(t),f){if(f=s.fallback,s=Mn(null,r,0,null),s.return=t,!(t.mode&2))for(e=t.memoizedState!==null?t.child.child:t.child,s.child=e;e!==null;)e.return=s,e=e.sibling;return n=Mn(f,r,n,null),n.return=t,s.sibling=n,t.memoizedState=js,t.child=s,n}return r=s.children,t.memoizedState=null,t.child=Ls(t,null,r,n)}if(e.memoizedState!==null){if(e=e.child,r=e.sibling,f){if(s=s.fallback,n=or(e,e.pendingProps),n.return=t,!(t.mode&2)&&(f=t.memoizedState!==null?t.child.child:t.child,f!==e.child))for(n.child=f;f!==null;)f.return=n,f=f.sibling;return r=or(r,s),r.return=t,n.sibling=r,n.childExpirationTime=0,t.memoizedState=js,t.child=n,r}return n=Hr(t,e.child,s.children,n),t.memoizedState=null,t.child=n}if(e=e.child,f){if(f=s.fallback,s=Mn(null,r,0,null),s.return=t,s.child=e,e!==null&&(e.return=s),!(t.mode&2))for(e=t.memoizedState!==null?t.child.child:t.child,s.child=e;e!==null;)e.return=s,e=e.sibling;return n=Mn(f,r,n,null),n.return=t,s.sibling=n,n.effectTag|=2,s.childExpirationTime=0,t.memoizedState=js,t.child=s,n}return t.memoizedState=null,t.child=Hr(t,e,s.children,n)}o(Ka,"ji");function Ya(e,t){e.expirationTime<t&&(e.expirationTime=t);var n=e.alternate;n!==null&&n.expirationTime<t&&(n.expirationTime=t),ka(e.return,t)}o(Ya,"ki");function Bs(e,t,n,r,s,c){var f=e.memoizedState;f===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailExpiration:0,tailMode:s,lastEffect:c}:(f.isBackwards=t,f.rendering=null,f.renderingStartTime=0,f.last=r,f.tail=n,f.tailExpiration=0,f.tailMode=s,f.lastEffect=c)}o(Bs,"li");function Ga(e,t,n){var r=t.pendingProps,s=r.revealOrder,c=r.tail;if(kt(e,t,r.children,n),r=Qe.current,r&2)r=r&1|2,t.effectTag|=64;else{if(e!==null&&e.effectTag&64)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Ya(e,n);else if(e.tag===19)Ya(e,n);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(g(Qe,r),!(t.mode&2))t.memoizedState=null;else switch(s){case"forwards":for(n=t.child,s=null;n!==null;)e=n.alternate,e!==null&&ul(e)===null&&(s=n),n=n.sibling;n=s,n===null?(s=t.child,t.child=null):(s=n.sibling,n.sibling=null),Bs(t,!1,s,n,c,t.lastEffect);break;case"backwards":for(n=null,s=t.child,t.child=null;s!==null;){if(e=s.alternate,e!==null&&ul(e)===null){t.child=s;break}e=s.sibling,s.sibling=n,n=s,s=e}Bs(t,!0,n,null,c,t.lastEffect);break;case"together":Bs(t,!1,null,null,void 0,t.lastEffect);break;default:t.memoizedState=null}return t.child}o(Ga,"mi");function cn(e,t,n){e!==null&&(t.dependencies=e.dependencies);var r=t.expirationTime;if(r!==0&&Rl(r),t.childExpirationTime<n)return null;if(e!==null&&t.child!==e.child)throw Error(v(153));if(t.child!==null){for(e=t.child,n=or(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=or(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}o(cn,"$h");var Xa,Us,Ja,eu;Xa=o(function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}},"ni"),Us=o(function(){},"oi"),Ja=o(function(e,t,n,r,s){var c=e.memoizedProps;if(c!==r){var f=t.stateNode;switch(Kn(Zt.current),e=null,n){case"input":c=Ur(f,c),r=Ur(f,r),e=[];break;case"option":c=Zr(f,c),r=Zr(f,r),e=[];break;case"select":c=I({},c,{value:void 0}),r=I({},r,{value:void 0}),e=[];break;case"textarea":c=Qr(f,c),r=Qr(f,r),e=[];break;default:typeof c.onClick!="function"&&typeof r.onClick=="function"&&(f.onclick=nn)}lo(n,r);var h,L;n=null;for(h in c)if(!r.hasOwnProperty(h)&&c.hasOwnProperty(h)&&c[h]!=null)if(h==="style")for(L in f=c[h],f)f.hasOwnProperty(L)&&(n||(n={}),n[L]="");else h!=="dangerouslySetInnerHTML"&&h!=="children"&&h!=="suppressContentEditableWarning"&&h!=="suppressHydrationWarning"&&h!=="autoFocus"&&(A.hasOwnProperty(h)?e||(e=[]):(e=e||[]).push(h,null));for(h in r){var T=r[h];if(f=c!=null?c[h]:void 0,r.hasOwnProperty(h)&&T!==f&&(T!=null||f!=null))if(h==="style")if(f){for(L in f)!f.hasOwnProperty(L)||T&&T.hasOwnProperty(L)||(n||(n={}),n[L]="");for(L in T)T.hasOwnProperty(L)&&f[L]!==T[L]&&(n||(n={}),n[L]=T[L])}else n||(e||(e=[]),e.push(h,n)),n=T;else h==="dangerouslySetInnerHTML"?(T=T?T.__html:void 0,f=f?f.__html:void 0,T!=null&&f!==T&&(e=e||[]).push(h,T)):h==="children"?f===T||typeof T!="string"&&typeof T!="number"||(e=e||[]).push(h,""+T):h!=="suppressContentEditableWarning"&&h!=="suppressHydrationWarning"&&(A.hasOwnProperty(h)?(T!=null&&Ot(s,h),e||f===T||(e=[])):(e=e||[]).push(h,T))}n&&(e=e||[]).push("style",n),s=e,(t.updateQueue=s)&&(t.effectTag|=4)}},"pi"),eu=o(function(e,t,n,r){n!==r&&(t.effectTag|=4)},"qi");function yl(e,t){switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}o(yl,"ri");function Au(e,t,n){var r=t.pendingProps;switch(t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return null;case 1:return W(t.type)&&De(),null;case 3:return Fr(),p(O),p(E),n=t.stateNode,n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),e!==null&&e.child!==null||!gl(t)||(t.effectTag|=4),Us(t),null;case 5:Ss(t),n=Kn(jo.current);var s=t.type;if(e!==null&&t.stateNode!=null)Ja(e,t,s,r,n),e.ref!==t.ref&&(t.effectTag|=128);else{if(!r){if(t.stateNode===null)throw Error(v(166));return null}if(e=Kn(Zt.current),gl(t)){r=t.stateNode,s=t.type;var c=t.memoizedProps;switch(r[jt]=t,r[Tr]=c,s){case"iframe":case"object":case"embed":$e("load",r);break;case"video":case"audio":for(e=0;e<fr.length;e++)$e(fr[e],r);break;case"source":$e("error",r);break;case"img":case"image":case"link":$e("error",r),$e("load",r);break;case"form":$e("reset",r),$e("submit",r);break;case"details":$e("toggle",r);break;case"input":ni(r,c),$e("invalid",r),Ot(n,"onChange");break;case"select":r._wrapperState={wasMultiple:!!c.multiple},$e("invalid",r),Ot(n,"onChange");break;case"textarea":An(r,c),$e("invalid",r),Ot(n,"onChange")}lo(s,c),e=null;for(var f in c)if(c.hasOwnProperty(f)){var h=c[f];f==="children"?typeof h=="string"?r.textContent!==h&&(e=["children",h]):typeof h=="number"&&r.textContent!==""+h&&(e=["children",""+h]):A.hasOwnProperty(f)&&h!=null&&Ot(n,f)}switch(s){case"input":Br(r),oi(r,c,!0);break;case"textarea":Br(r),li(r);break;case"select":case"option":break;default:typeof c.onClick=="function"&&(r.onclick=nn)}n=e,t.updateQueue=n,n!==null&&(t.effectTag|=4)}else{switch(f=n.nodeType===9?n:n.ownerDocument,e===Si&&(e=ai(s)),e===Si?s==="script"?(e=f.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=f.createElement(s,{is:r.is}):(e=f.createElement(s),s==="select"&&(f=e,r.multiple?f.multiple=!0:r.size&&(f.size=r.size))):e=f.createElementNS(e,s),e[jt]=t,e[Tr]=r,Xa(e,t,!1,!1),t.stateNode=e,f=so(s,r),s){case"iframe":case"object":case"embed":$e("load",e),h=r;break;case"video":case"audio":for(h=0;h<fr.length;h++)$e(fr[h],e);h=r;break;case"source":$e("error",e),h=r;break;case"img":case"image":case"link":$e("error",e),$e("load",e),h=r;break;case"form":$e("reset",e),$e("submit",e),h=r;break;case"details":$e("toggle",e),h=r;break;case"input":ni(e,r),h=Ur(e,r),$e("invalid",e),Ot(n,"onChange");break;case"option":h=Zr(e,r);break;case"select":e._wrapperState={wasMultiple:!!r.multiple},h=I({},r,{value:void 0}),$e("invalid",e),Ot(n,"onChange");break;case"textarea":An(e,r),h=Qr(e,r),$e("invalid",e),Ot(n,"onChange");break;default:h=r}lo(s,h);var L=h;for(c in L)if(L.hasOwnProperty(c)){var T=L[c];c==="style"?Li(e,T):c==="dangerouslySetInnerHTML"?(T=T?T.__html:void 0,T!=null&&Yr(e,T)):c==="children"?typeof T=="string"?(s!=="textarea"||T!=="")&&In(e,T):typeof T=="number"&&In(e,""+T):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(A.hasOwnProperty(c)?T!=null&&Ot(n,c):T!=null&&lr(e,c,T,f))}switch(s){case"input":Br(e),oi(e,r,!1);break;case"textarea":Br(e),li(e);break;case"option":r.value!=null&&e.setAttribute("value",""+Jt(r.value));break;case"select":e.multiple=!!r.multiple,n=r.value,n!=null?Dn(e,!!r.multiple,n,!1):r.defaultValue!=null&&Dn(e,!!r.multiple,r.defaultValue,!0);break;default:typeof h.onClick=="function"&&(e.onclick=nn)}Di(s,r)&&(t.effectTag|=4)}t.ref!==null&&(t.effectTag|=128)}return null;case 6:if(e&&t.stateNode!=null)eu(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(v(166));n=Kn(jo.current),Kn(Zt.current),gl(t)?(n=t.stateNode,r=t.memoizedProps,n[jt]=t,n.nodeValue!==r&&(t.effectTag|=4)):(n=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),n[jt]=t,t.stateNode=n)}return null;case 13:return p(Qe),r=t.memoizedState,t.effectTag&64?(t.expirationTime=n,t):(n=r!==null,r=!1,e===null?t.memoizedProps.fallback!==void 0&&gl(t):(s=e.memoizedState,r=s!==null,n||s===null||(s=e.child.sibling,s!==null&&(c=t.firstEffect,c!==null?(t.firstEffect=s,s.nextEffect=c):(t.firstEffect=t.lastEffect=s,s.nextEffect=null),s.effectTag=8))),n&&!r&&t.mode&2&&(e===null&&t.memoizedProps.unstable_avoidThisFallback!==!0||Qe.current&1?rt===Xn&&(rt=xl):((rt===Xn||rt===xl)&&(rt=El),Uo!==0&&bt!==null&&(ir(bt,gt),Lu(bt,Uo)))),(n||r)&&(t.effectTag|=4),null);case 4:return Fr(),Us(t),null;case 10:return Es(t),null;case 17:return W(t.type)&&De(),null;case 19:if(p(Qe),r=t.memoizedState,r===null)return null;if(s=(t.effectTag&64)!==0,c=r.rendering,c===null){if(s)yl(r,!1);else if(rt!==Xn||e!==null&&e.effectTag&64)for(c=t.child;c!==null;){if(e=ul(c),e!==null){for(t.effectTag|=64,yl(r,!1),s=e.updateQueue,s!==null&&(t.updateQueue=s,t.effectTag|=4),r.lastEffect===null&&(t.firstEffect=null),t.lastEffect=r.lastEffect,r=t.child;r!==null;)s=r,c=n,s.effectTag&=2,s.nextEffect=null,s.firstEffect=null,s.lastEffect=null,e=s.alternate,e===null?(s.childExpirationTime=0,s.expirationTime=c,s.child=null,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null):(s.childExpirationTime=e.childExpirationTime,s.expirationTime=e.expirationTime,s.child=e.child,s.memoizedProps=e.memoizedProps,s.memoizedState=e.memoizedState,s.updateQueue=e.updateQueue,c=e.dependencies,s.dependencies=c===null?null:{expirationTime:c.expirationTime,firstContext:c.firstContext,responders:c.responders}),r=r.sibling;return g(Qe,Qe.current&1|2),t.child}c=c.sibling}}else{if(!s)if(e=ul(c),e!==null){if(t.effectTag|=64,s=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.effectTag|=4),yl(r,!0),r.tail===null&&r.tailMode==="hidden"&&!c.alternate)return t=t.lastEffect=r.lastEffect,t!==null&&(t.nextEffect=null),null}else 2*Nt()-r.renderingStartTime>r.tailExpiration&&1<n&&(t.effectTag|=64,s=!0,yl(r,!1),t.expirationTime=t.childExpirationTime=n-1);r.isBackwards?(c.sibling=t.child,t.child=c):(n=r.last,n!==null?n.sibling=c:t.child=c,r.last=c)}return r.tail!==null?(r.tailExpiration===0&&(r.tailExpiration=Nt()+500),n=r.tail,r.rendering=n,r.tail=n.sibling,r.lastEffect=t.lastEffect,r.renderingStartTime=Nt(),n.sibling=null,t=Qe.current,g(Qe,s?t&1|2:t&1),n):null}throw Error(v(156,t.tag))}o(Au,"si");function Iu(e){switch(e.tag){case 1:W(e.type)&&De();var t=e.effectTag;return t&4096?(e.effectTag=t&-4097|64,e):null;case 3:if(Fr(),p(O),p(E),t=e.effectTag,t&64)throw Error(v(285));return e.effectTag=t&-4097|64,e;case 5:return Ss(e),null;case 13:return p(Qe),t=e.effectTag,t&4096?(e.effectTag=t&-4097|64,e):null;case 19:return p(Qe),null;case 4:return Fr(),null;case 10:return Es(e),null;default:return null}}o(Iu,"zi");function Ws(e,t){return{value:e,source:t,stack:ei(t)}}o(Ws,"Ai");var Hu=typeof WeakSet=="function"?WeakSet:Set;function qs(e,t){var n=t.source,r=t.stack;r===null&&n!==null&&(r=ei(n)),n!==null&&zt(n.type),t=t.value,e!==null&&e.tag===1&&zt(e.type);try{console.error(t)}catch(s){setTimeout(function(){throw s})}}o(qs,"Ci");function Fu(e,t){try{t.props=e.memoizedProps,t.state=e.memoizedState,t.componentWillUnmount()}catch(n){rr(e,n)}}o(Fu,"Di");function tu(e){var t=e.ref;if(t!==null)if(typeof t=="function")try{t(null)}catch(n){rr(e,n)}else t.current=null}o(tu,"Fi");function zu(e,t){switch(t.tag){case 0:case 11:case 15:case 22:return;case 1:if(t.effectTag&256&&e!==null){var n=e.memoizedProps,r=e.memoizedState;e=t.stateNode,t=e.getSnapshotBeforeUpdate(t.elementType===t.type?n:It(t.type,n),r),e.__reactInternalSnapshotBeforeUpdate=t}return;case 3:case 5:case 6:case 4:case 17:return}throw Error(v(163))}o(zu,"Gi");function nu(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.destroy;n.destroy=void 0,r!==void 0&&r()}n=n.next}while(n!==t)}}o(nu,"Hi");function ru(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}o(ru,"Ii");function Vu(e,t,n){switch(n.tag){case 0:case 11:case 15:case 22:ru(3,n);return;case 1:if(e=n.stateNode,n.effectTag&4)if(t===null)e.componentDidMount();else{var r=n.elementType===n.type?t.memoizedProps:It(n.type,t.memoizedProps);e.componentDidUpdate(r,t.memoizedState,e.__reactInternalSnapshotBeforeUpdate)}t=n.updateQueue,t!==null&&_a(n,t,e);return;case 3:if(t=n.updateQueue,t!==null){if(e=null,n.child!==null)switch(n.child.tag){case 5:e=n.child.stateNode;break;case 1:e=n.child.stateNode}_a(n,t,e)}return;case 5:e=n.stateNode,t===null&&n.effectTag&4&&Di(n.type,n.memoizedProps)&&e.focus();return;case 6:return;case 4:return;case 12:return;case 13:n.memoizedState===null&&(n=n.alternate,n!==null&&(n=n.memoizedState,n!==null&&(n=n.dehydrated,n!==null&&zn(n))));return;case 19:case 17:case 20:case 21:return}throw Error(v(163))}o(Vu,"Ji");function ou(e,t,n){switch(typeof oa=="function"&&oa(t),t.tag){case 0:case 11:case 14:case 15:case 22:if(e=t.updateQueue,e!==null&&(e=e.lastEffect,e!==null)){var r=e.next;En(97<n?97:n,function(){var s=r;do{var c=s.destroy;if(c!==void 0){var f=t;try{c()}catch(h){rr(f,h)}}s=s.next}while(s!==r)})}break;case 1:tu(t),n=t.stateNode,typeof n.componentWillUnmount=="function"&&Fu(t,n);break;case 5:tu(t);break;case 4:au(e,t,n)}}o(ou,"Ki");function iu(e){var t=e.alternate;e.return=null,e.child=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.alternate=null,e.firstEffect=null,e.lastEffect=null,e.pendingProps=null,e.memoizedProps=null,e.stateNode=null,t!==null&&iu(t)}o(iu,"Ni");function lu(e){return e.tag===5||e.tag===3||e.tag===4}o(lu,"Oi");function su(e){e:{for(var t=e.return;t!==null;){if(lu(t)){var n=t;break e}t=t.return}throw Error(v(160))}switch(t=n.stateNode,n.tag){case 5:var r=!1;break;case 3:t=t.containerInfo,r=!0;break;case 4:t=t.containerInfo,r=!0;break;default:throw Error(v(161))}n.effectTag&16&&(In(t,""),n.effectTag&=-17);e:t:for(n=e;;){for(;n.sibling===null;){if(n.return===null||lu(n.return)){n=null;break e}n=n.return}for(n.sibling.return=n.return,n=n.sibling;n.tag!==5&&n.tag!==6&&n.tag!==18;){if(n.effectTag&2||n.child===null||n.tag===4)continue t;n.child.return=n,n=n.child}if(!(n.effectTag&2)){n=n.stateNode;break e}}r?Zs(e,n,t):Qs(e,n,t)}o(su,"Pi");function Zs(e,t,n){var r=e.tag,s=r===5||r===6;if(s)e=s?e.stateNode:e.stateNode.instance,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=nn));else if(r!==4&&(e=e.child,e!==null))for(Zs(e,t,n),e=e.sibling;e!==null;)Zs(e,t,n),e=e.sibling}o(Zs,"Qi");function Qs(e,t,n){var r=e.tag,s=r===5||r===6;if(s)e=s?e.stateNode:e.stateNode.instance,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(Qs(e,t,n),e=e.sibling;e!==null;)Qs(e,t,n),e=e.sibling}o(Qs,"Ri");function au(e,t,n){for(var r=t,s=!1,c,f;;){if(!s){s=r.return;e:for(;;){if(s===null)throw Error(v(160));switch(c=s.stateNode,s.tag){case 5:f=!1;break e;case 3:c=c.containerInfo,f=!0;break e;case 4:c=c.containerInfo,f=!0;break e}s=s.return}s=!0}if(r.tag===5||r.tag===6){e:for(var h=e,L=r,T=n,re=L;;)if(ou(h,re,T),re.child!==null&&re.tag!==4)re.child.return=re,re=re.child;else{if(re===L)break e;for(;re.sibling===null;){if(re.return===null||re.return===L)break e;re=re.return}re.sibling.return=re.return,re=re.sibling}f?(h=c,L=r.stateNode,h.nodeType===8?h.parentNode.removeChild(L):h.removeChild(L)):c.removeChild(r.stateNode)}else if(r.tag===4){if(r.child!==null){c=r.stateNode.containerInfo,f=!0,r.child.return=r,r=r.child;continue}}else if(ou(e,r,n),r.child!==null){r.child.return=r,r=r.child;continue}if(r===t)break;for(;r.sibling===null;){if(r.return===null||r.return===t)return;r=r.return,r.tag===4&&(s=!1)}r.sibling.return=r.return,r=r.sibling}}o(au,"Mi");function Ks(e,t){switch(t.tag){case 0:case 11:case 14:case 15:case 22:nu(3,t);return;case 1:return;case 5:var n=t.stateNode;if(n!=null){var r=t.memoizedProps,s=e!==null?e.memoizedProps:r;e=t.type;var c=t.updateQueue;if(t.updateQueue=null,c!==null){for(n[Tr]=r,e==="input"&&r.type==="radio"&&r.name!=null&&ri(n,r),so(e,s),t=so(e,r),s=0;s<c.length;s+=2){var f=c[s],h=c[s+1];f==="style"?Li(n,h):f==="dangerouslySetInnerHTML"?Yr(n,h):f==="children"?In(n,h):lr(n,f,h,t)}switch(e){case"input":Wr(n,r);break;case"textarea":ii(n,r);break;case"select":t=n._wrapperState.wasMultiple,n._wrapperState.wasMultiple=!!r.multiple,e=r.value,e!=null?Dn(n,!!r.multiple,e,!1):t!==!!r.multiple&&(r.defaultValue!=null?Dn(n,!!r.multiple,r.defaultValue,!0):Dn(n,!!r.multiple,r.multiple?[]:"",!1))}}}return;case 6:if(t.stateNode===null)throw Error(v(162));t.stateNode.nodeValue=t.memoizedProps;return;case 3:t=t.stateNode,t.hydrate&&(t.hydrate=!1,zn(t.containerInfo));return;case 12:return;case 13:if(n=t,t.memoizedState===null?r=!1:(r=!0,n=t.child,Xs=Nt()),n!==null)e:for(e=n;;){if(e.tag===5)c=e.stateNode,r?(c=c.style,typeof c.setProperty=="function"?c.setProperty("display","none","important"):c.display="none"):(c=e.stateNode,s=e.memoizedProps.style,s=s!=null&&s.hasOwnProperty("display")?s.display:null,c.style.display=_i("display",s));else if(e.tag===6)e.stateNode.nodeValue=r?"":e.memoizedProps;else if(e.tag===13&&e.memoizedState!==null&&e.memoizedState.dehydrated===null){c=e.child.sibling,c.return=e,e=c;continue}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break;for(;e.sibling===null;){if(e.return===null||e.return===n)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}uu(t);return;case 19:uu(t);return;case 17:return}throw Error(v(163))}o(Ks,"Si");function uu(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new Hu),t.forEach(function(r){var s=Yu.bind(null,e,r);n.has(r)||(n.add(r),r.then(s,s))})}}o(uu,"Ui");var $u=typeof WeakMap=="function"?WeakMap:Map;function cu(e,t,n){n=bn(n,null),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){Ll||(Ll=!0,Js=r),qs(e,t)},n}o(cu,"Xi");function du(e,t,n){n=bn(n,null),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var s=t.value;n.payload=function(){return qs(e,t),r(s)}}var c=e.stateNode;return c!==null&&typeof c.componentDidCatch=="function"&&(n.callback=function(){typeof r!="function"&&(Sn===null?Sn=new Set([this]):Sn.add(this),qs(e,t));var f=t.stack;this.componentDidCatch(t.value,{componentStack:f!==null?f:""})}),n}o(du,"$i");var ju=Math.ceil,Cl=yt.ReactCurrentDispatcher,fu=yt.ReactCurrentOwner,nt=0,Ys=8,Ht=16,Kt=32,Xn=0,wl=1,mu=2,xl=3,El=4,Gs=5,xe=nt,bt=null,_e=null,gt=0,rt=Xn,kl=null,dn=1073741823,Bo=1073741823,bl=null,Uo=0,_l=!1,Xs=0,pu=500,pe=null,Ll=!1,Js=null,Sn=null,Tl=!1,Wo=null,qo=90,Jn=null,Zo=0,ea=null,Sl=0;function Yt(){return(xe&(Ht|Kt))!==nt?1073741821-(Nt()/10|0):Sl!==0?Sl:Sl=1073741821-(Nt()/10|0)}o(Yt,"Gg");function er(e,t,n){if(t=t.mode,!(t&2))return 1073741823;var r=el();if(!(t&4))return r===99?1073741823:1073741822;if((xe&Ht)!==nt)return gt;if(n!==null)e=tl(e,n.timeoutMs|0||5e3,250);else switch(r){case 99:e=1073741823;break;case 98:e=tl(e,150,100);break;case 97:case 96:e=tl(e,5e3,250);break;case 95:e=2;break;default:throw Error(v(326))}return bt!==null&&e===gt&&--e,e}o(er,"Hg");function Nn(e,t){if(50<Zo)throw Zo=0,ea=null,Error(v(185));if(e=Nl(e,t),e!==null){var n=el();t===1073741823?(xe&Ys)!==nt&&(xe&(Ht|Kt))===nt?ta(e):(_t(e),xe===nt&&qt()):_t(e),(xe&4)===nt||n!==98&&n!==99||(Jn===null?Jn=new Map([[e,t]]):(n=Jn.get(e),(n===void 0||n>t)&&Jn.set(e,t)))}}o(Nn,"Ig");function Nl(e,t){e.expirationTime<t&&(e.expirationTime=t);var n=e.alternate;n!==null&&n.expirationTime<t&&(n.expirationTime=t);var r=e.return,s=null;if(r===null&&e.tag===3)s=e.stateNode;else for(;r!==null;){if(n=r.alternate,r.childExpirationTime<t&&(r.childExpirationTime=t),n!==null&&n.childExpirationTime<t&&(n.childExpirationTime=t),r.return===null&&r.tag===3){s=r.stateNode;break}r=r.return}return s!==null&&(bt===s&&(Rl(t),rt===El&&ir(s,gt)),Lu(s,t)),s}o(Nl,"xj");function Ml(e){var t=e.lastExpiredTime;if(t!==0||(t=e.firstPendingTime,!_u(e,t)))return t;var n=e.lastPingedTime;return e=e.nextKnownPendingLevel,e=n>e?n:e,2>=e&&t!==e?0:e}o(Ml,"zj");function _t(e){if(e.lastExpiredTime!==0)e.callbackExpirationTime=1073741823,e.callbackPriority=99,e.callbackNode=xa(ta.bind(null,e));else{var t=Ml(e),n=e.callbackNode;if(t===0)n!==null&&(e.callbackNode=null,e.callbackExpirationTime=0,e.callbackPriority=90);else{var r=Yt();if(t===1073741823?r=99:t===1||t===2?r=95:(r=10*(1073741821-t)-10*(1073741821-r),r=0>=r?99:250>=r?98:5250>=r?97:95),n!==null){var s=e.callbackPriority;if(e.callbackExpirationTime===t&&s>=r)return;n!==ga&&st(n)}e.callbackExpirationTime=t,e.callbackPriority=r,t=t===1073741823?xa(ta.bind(null,e)):wa(r,hu.bind(null,e),{timeout:10*(1073741821-t)-Nt()}),e.callbackNode=t}}}o(_t,"Z");function hu(e,t){if(Sl=0,t)return t=Yt(),aa(e,t),_t(e),null;var n=Ml(e);if(n!==0){if(t=e.callbackNode,(xe&(Ht|Kt))!==nt)throw Error(v(327));if($r(),e===bt&&n===gt||tr(e,n),_e!==null){var r=xe;xe|=Ht;var s=Cu();do try{Wu();break}catch(h){yu(e,h)}while(!0);if(xs(),xe=r,Cl.current=s,rt===wl)throw t=kl,tr(e,n),ir(e,n),_t(e),t;if(_e===null)switch(s=e.finishedWork=e.current.alternate,e.finishedExpirationTime=n,r=rt,bt=null,r){case Xn:case wl:throw Error(v(345));case mu:aa(e,2<n?2:n);break;case xl:if(ir(e,n),r=e.lastSuspendedTime,n===r&&(e.nextKnownPendingLevel=na(s)),dn===1073741823&&(s=Xs+pu-Nt(),10<s)){if(_l){var c=e.lastPingedTime;if(c===0||c>=n){e.lastPingedTime=n,tr(e,n);break}}if(c=Ml(e),c!==0&&c!==n)break;if(r!==0&&r!==n){e.lastPingedTime=r;break}e.timeoutHandle=ho(nr.bind(null,e),s);break}nr(e);break;case El:if(ir(e,n),r=e.lastSuspendedTime,n===r&&(e.nextKnownPendingLevel=na(s)),_l&&(s=e.lastPingedTime,s===0||s>=n)){e.lastPingedTime=n,tr(e,n);break}if(s=Ml(e),s!==0&&s!==n)break;if(r!==0&&r!==n){e.lastPingedTime=r;break}if(Bo!==1073741823?r=10*(1073741821-Bo)-Nt():dn===1073741823?r=0:(r=10*(1073741821-dn)-5e3,s=Nt(),n=10*(1073741821-n)-s,r=s-r,0>r&&(r=0),r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*ju(r/1960))-r,n<r&&(r=n)),10<r){e.timeoutHandle=ho(nr.bind(null,e),r);break}nr(e);break;case Gs:if(dn!==1073741823&&bl!==null){c=dn;var f=bl;if(r=f.busyMinDurationMs|0,0>=r?r=0:(s=f.busyDelayMs|0,c=Nt()-(10*(1073741821-c)-(f.timeoutMs|0||5e3)),r=c<=s?0:s+r-c),10<r){ir(e,n),e.timeoutHandle=ho(nr.bind(null,e),r);break}}nr(e);break;default:throw Error(v(329))}if(_t(e),e.callbackNode===t)return hu.bind(null,e)}}return null}o(hu,"Bj");function ta(e){var t=e.lastExpiredTime;if(t=t!==0?t:1073741823,(xe&(Ht|Kt))!==nt)throw Error(v(327));if($r(),e===bt&&t===gt||tr(e,t),_e!==null){var n=xe;xe|=Ht;var r=Cu();do try{Uu();break}catch(s){yu(e,s)}while(!0);if(xs(),xe=n,Cl.current=r,rt===wl)throw n=kl,tr(e,t),ir(e,t),_t(e),n;if(_e!==null)throw Error(v(261));e.finishedWork=e.current.alternate,e.finishedExpirationTime=t,bt=null,nr(e),_t(e)}return null}o(ta,"yj");function Bu(){if(Jn!==null){var e=Jn;Jn=null,e.forEach(function(t,n){aa(n,t),_t(n)}),qt()}}o(Bu,"Lj");function vu(e,t){var n=xe;xe|=1;try{return e(t)}finally{xe=n,xe===nt&&qt()}}o(vu,"Mj");function gu(e,t){var n=xe;xe&=-2,xe|=Ys;try{return e(t)}finally{xe=n,xe===nt&&qt()}}o(gu,"Nj");function tr(e,t){e.finishedWork=null,e.finishedExpirationTime=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,Yl(n)),_e!==null)for(n=_e.return;n!==null;){var r=n;switch(r.tag){case 1:r=r.type.childContextTypes,r!=null&&De();break;case 3:Fr(),p(O),p(E);break;case 5:Ss(r);break;case 4:Fr();break;case 13:p(Qe);break;case 19:p(Qe);break;case 10:Es(r)}n=n.return}bt=e,_e=or(e.current,null),gt=t,rt=Xn,kl=null,Bo=dn=1073741823,bl=null,Uo=0,_l=!1}o(tr,"Ej");function yu(e,t){do{try{if(xs(),cl.current=vl,dl)for(var n=et.memoizedState;n!==null;){var r=n.queue;r!==null&&(r.pending=null),n=n.next}if(Ln=0,ft=dt=et=null,dl=!1,_e===null||_e.return===null)return rt=wl,kl=t,_e=null;e:{var s=e,c=_e.return,f=_e,h=t;if(t=gt,f.effectTag|=2048,f.firstEffect=f.lastEffect=null,h!==null&&typeof h=="object"&&typeof h.then=="function"){var L=h;if(!(f.mode&2)){var T=f.alternate;T?(f.updateQueue=T.updateQueue,f.memoizedState=T.memoizedState,f.expirationTime=T.expirationTime):(f.updateQueue=null,f.memoizedState=null)}var re=(Qe.current&1)!==0,ue=c;do{var Me;if(Me=ue.tag===13){var Ae=ue.memoizedState;if(Ae!==null)Me=Ae.dehydrated!==null;else{var Pt=ue.memoizedProps;Me=Pt.fallback===void 0?!1:Pt.unstable_avoidThisFallback!==!0?!0:!re}}if(Me){var at=ue.updateQueue;if(at===null){var b=new Set;b.add(L),ue.updateQueue=b}else at.add(L);if(!(ue.mode&2)){if(ue.effectTag|=64,f.effectTag&=-2981,f.tag===1)if(f.alternate===null)f.tag=17;else{var x=bn(1073741823,null);x.tag=2,_n(f,x)}f.expirationTime=1073741823;break e}h=void 0,f=t;var N=s.pingCache;if(N===null?(N=s.pingCache=new $u,h=new Set,N.set(L,h)):(h=N.get(L),h===void 0&&(h=new Set,N.set(L,h))),!h.has(f)){h.add(f);var j=Ku.bind(null,s,L,f);L.then(j,j)}ue.effectTag|=4096,ue.expirationTime=t;break e}ue=ue.return}while(ue!==null);h=Error((zt(f.type)||"A React component")+` suspended while rendering, but no fallback UI was specified.

Add a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display.`+ei(f))}rt!==Gs&&(rt=mu),h=Ws(h,f),ue=c;do{switch(ue.tag){case 3:L=h,ue.effectTag|=4096,ue.expirationTime=t;var X=cu(ue,L,t);ba(ue,X);break e;case 1:L=h;var ce=ue.type,ye=ue.stateNode;if(!(ue.effectTag&64)&&(typeof ce.getDerivedStateFromError=="function"||ye!==null&&typeof ye.componentDidCatch=="function"&&(Sn===null||!Sn.has(ye)))){ue.effectTag|=4096,ue.expirationTime=t;var Re=du(ue,L,t);ba(ue,Re);break e}}ue=ue.return}while(ue!==null)}_e=Eu(_e)}catch(qe){t=qe;continue}break}while(!0)}o(yu,"Hj");function Cu(){var e=Cl.current;return Cl.current=vl,e===null?vl:e}o(Cu,"Fj");function wu(e,t){e<dn&&2<e&&(dn=e),t!==null&&e<Bo&&2<e&&(Bo=e,bl=t)}o(wu,"Ag");function Rl(e){e>Uo&&(Uo=e)}o(Rl,"Bg");function Uu(){for(;_e!==null;)_e=xu(_e)}o(Uu,"Kj");function Wu(){for(;_e!==null&&!Nu();)_e=xu(_e)}o(Wu,"Gj");function xu(e){var t=bu(e.alternate,e,gt);return e.memoizedProps=e.pendingProps,t===null&&(t=Eu(e)),fu.current=null,t}o(xu,"Qj");function Eu(e){_e=e;do{var t=_e.alternate;if(e=_e.return,_e.effectTag&2048){if(t=Iu(_e),t!==null)return t.effectTag&=2047,t;e!==null&&(e.firstEffect=e.lastEffect=null,e.effectTag|=2048)}else{if(t=Au(t,_e,gt),gt===1||_e.childExpirationTime!==1){for(var n=0,r=_e.child;r!==null;){var s=r.expirationTime,c=r.childExpirationTime;s>n&&(n=s),c>n&&(n=c),r=r.sibling}_e.childExpirationTime=n}if(t!==null)return t;e!==null&&!(e.effectTag&2048)&&(e.firstEffect===null&&(e.firstEffect=_e.firstEffect),_e.lastEffect!==null&&(e.lastEffect!==null&&(e.lastEffect.nextEffect=_e.firstEffect),e.lastEffect=_e.lastEffect),1<_e.effectTag&&(e.lastEffect!==null?e.lastEffect.nextEffect=_e:e.firstEffect=_e,e.lastEffect=_e))}if(t=_e.sibling,t!==null)return t;_e=e}while(_e!==null);return rt===Xn&&(rt=Gs),null}o(Eu,"Pj");function na(e){var t=e.expirationTime;return e=e.childExpirationTime,t>e?t:e}o(na,"Ij");function nr(e){var t=el();return En(99,qu.bind(null,e,t)),null}o(nr,"Jj");function qu(e,t){do $r();while(Wo!==null);if((xe&(Ht|Kt))!==nt)throw Error(v(327));var n=e.finishedWork,r=e.finishedExpirationTime;if(n===null)return null;if(e.finishedWork=null,e.finishedExpirationTime=0,n===e.current)throw Error(v(177));e.callbackNode=null,e.callbackExpirationTime=0,e.callbackPriority=90,e.nextKnownPendingLevel=0;var s=na(n);if(e.firstPendingTime=s,r<=e.lastSuspendedTime?e.firstSuspendedTime=e.lastSuspendedTime=e.nextKnownPendingLevel=0:r<=e.firstSuspendedTime&&(e.firstSuspendedTime=r-1),r<=e.lastPingedTime&&(e.lastPingedTime=0),r<=e.lastExpiredTime&&(e.lastExpiredTime=0),e===bt&&(_e=bt=null,gt=0),1<n.effectTag?n.lastEffect!==null?(n.lastEffect.nextEffect=n,s=n.firstEffect):s=n:s=n.firstEffect,s!==null){var c=xe;xe|=Kt,fu.current=null,fo=hn;var f=Pi();if(Ke(f)){if("selectionStart"in f)var h={start:f.selectionStart,end:f.selectionEnd};else e:{h=(h=f.ownerDocument)&&h.defaultView||window;var L=h.getSelection&&h.getSelection();if(L&&L.rangeCount!==0){h=L.anchorNode;var T=L.anchorOffset,re=L.focusNode;L=L.focusOffset;try{h.nodeType,re.nodeType}catch{h=null;break e}var ue=0,Me=-1,Ae=-1,Pt=0,at=0,b=f,x=null;t:for(;;){for(var N;b!==h||T!==0&&b.nodeType!==3||(Me=ue+T),b!==re||L!==0&&b.nodeType!==3||(Ae=ue+L),b.nodeType===3&&(ue+=b.nodeValue.length),(N=b.firstChild)!==null;)x=b,b=N;for(;;){if(b===f)break t;if(x===h&&++Pt===T&&(Me=ue),x===re&&++at===L&&(Ae=ue),(N=b.nextSibling)!==null)break;b=x,x=b.parentNode}b=N}h=Me===-1||Ae===-1?null:{start:Me,end:Ae}}else h=null}h=h||{start:0,end:0}}else h=null;mo={activeElementDetached:null,focusedElem:f,selectionRange:h},hn=!1,pe=s;do try{Zu()}catch(Le){if(pe===null)throw Error(v(330));rr(pe,Le),pe=pe.nextEffect}while(pe!==null);pe=s;do try{for(f=e,h=t;pe!==null;){var j=pe.effectTag;if(j&16&&In(pe.stateNode,""),j&128){var X=pe.alternate;if(X!==null){var ce=X.ref;ce!==null&&(typeof ce=="function"?ce(null):ce.current=null)}}switch(j&1038){case 2:su(pe),pe.effectTag&=-3;break;case 6:su(pe),pe.effectTag&=-3,Ks(pe.alternate,pe);break;case 1024:pe.effectTag&=-1025;break;case 1028:pe.effectTag&=-1025,Ks(pe.alternate,pe);break;case 4:Ks(pe.alternate,pe);break;case 8:T=pe,au(f,T,h),iu(T)}pe=pe.nextEffect}}catch(Le){if(pe===null)throw Error(v(330));rr(pe,Le),pe=pe.nextEffect}while(pe!==null);if(ce=mo,X=Pi(),j=ce.focusedElem,h=ce.selectionRange,X!==j&&j&&j.ownerDocument&&Ri(j.ownerDocument.documentElement,j)){for(h!==null&&Ke(j)&&(X=h.start,ce=h.end,ce===void 0&&(ce=X),"selectionStart"in j?(j.selectionStart=X,j.selectionEnd=Math.min(ce,j.value.length)):(ce=(X=j.ownerDocument||document)&&X.defaultView||window,ce.getSelection&&(ce=ce.getSelection(),T=j.textContent.length,f=Math.min(h.start,T),h=h.end===void 0?f:Math.min(h.end,T),!ce.extend&&f>h&&(T=h,h=f,f=T),T=Mi(j,f),re=Mi(j,h),T&&re&&(ce.rangeCount!==1||ce.anchorNode!==T.node||ce.anchorOffset!==T.offset||ce.focusNode!==re.node||ce.focusOffset!==re.offset)&&(X=X.createRange(),X.setStart(T.node,T.offset),ce.removeAllRanges(),f>h?(ce.addRange(X),ce.extend(re.node,re.offset)):(X.setEnd(re.node,re.offset),ce.addRange(X)))))),X=[],ce=j;ce=ce.parentNode;)ce.nodeType===1&&X.push({element:ce,left:ce.scrollLeft,top:ce.scrollTop});for(typeof j.focus=="function"&&j.focus(),j=0;j<X.length;j++)ce=X[j],ce.element.scrollLeft=ce.left,ce.element.scrollTop=ce.top}hn=!!fo,mo=fo=null,e.current=n,pe=s;do try{for(j=e;pe!==null;){var ye=pe.effectTag;if(ye&36&&Vu(j,pe.alternate,pe),ye&128){X=void 0;var Re=pe.ref;if(Re!==null){var qe=pe.stateNode;switch(pe.tag){case 5:X=qe;break;default:X=qe}typeof Re=="function"?Re(X):Re.current=X}}pe=pe.nextEffect}}catch(Le){if(pe===null)throw Error(v(330));rr(pe,Le),pe=pe.nextEffect}while(pe!==null);pe=null,Mu(),xe=c}else e.current=n;if(Tl)Tl=!1,Wo=e,qo=t;else for(pe=s;pe!==null;)t=pe.nextEffect,pe.nextEffect=null,pe=t;if(t=e.firstPendingTime,t===0&&(Sn=null),t===1073741823?e===ea?Zo++:(Zo=0,ea=e):Zo=0,typeof ra=="function"&&ra(n.stateNode,r),_t(e),Ll)throw Ll=!1,e=Js,Js=null,e;return(xe&Ys)!==nt||qt(),null}o(qu,"Sj");function Zu(){for(;pe!==null;){var e=pe.effectTag;e&256&&zu(pe.alternate,pe),!(e&512)||Tl||(Tl=!0,wa(97,function(){return $r(),null})),pe=pe.nextEffect}}o(Zu,"Tj");function $r(){if(qo!==90){var e=97<qo?97:qo;return qo=90,En(e,Qu)}}o($r,"Dj");function Qu(){if(Wo===null)return!1;var e=Wo;if(Wo=null,(xe&(Ht|Kt))!==nt)throw Error(v(331));var t=xe;for(xe|=Kt,e=e.current.firstEffect;e!==null;){try{var n=e;if(n.effectTag&512)switch(n.tag){case 0:case 11:case 15:case 22:nu(5,n),ru(5,n)}}catch(r){if(e===null)throw Error(v(330));rr(e,r)}n=e.nextEffect,e.nextEffect=null,e=n}return xe=t,qt(),!0}o(Qu,"Vj");function ku(e,t,n){t=Ws(n,t),t=cu(e,t,1073741823),_n(e,t),e=Nl(e,1073741823),e!==null&&_t(e)}o(ku,"Wj");function rr(e,t){if(e.tag===3)ku(e,e,t);else for(var n=e.return;n!==null;){if(n.tag===3){ku(n,e,t);break}else if(n.tag===1){var r=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(Sn===null||!Sn.has(r))){e=Ws(t,e),e=du(n,e,1073741823),_n(n,e),n=Nl(n,1073741823),n!==null&&_t(n);break}}n=n.return}}o(rr,"Ei");function Ku(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),bt===e&&gt===n?rt===El||rt===xl&&dn===1073741823&&Nt()-Xs<pu?tr(e,gt):_l=!0:_u(e,n)&&(t=e.lastPingedTime,t!==0&&t<n||(e.lastPingedTime=n,_t(e)))}o(Ku,"Oj");function Yu(e,t){var n=e.stateNode;n!==null&&n.delete(t),t=0,t===0&&(t=Yt(),t=er(t,e,null)),e=Nl(e,t),e!==null&&_t(e)}o(Yu,"Vi");var bu;bu=o(function(e,t,n){var r=t.expirationTime;if(e!==null){var s=t.pendingProps;if(e.memoizedProps!==s||O.current)Qt=!0;else{if(r<n){switch(Qt=!1,t.tag){case 3:Qa(t),zs();break;case 5:if(Ra(t),t.mode&4&&n!==1&&s.hidden)return t.expirationTime=t.childExpirationTime=1,null;break;case 1:W(t.type)&&Ee(t);break;case 4:Ts(t,t.stateNode.containerInfo);break;case 10:r=t.memoizedProps.value,s=t.type._context,g(nl,s._currentValue),s._currentValue=r;break;case 13:if(t.memoizedState!==null)return r=t.child.childExpirationTime,r!==0&&r>=n?Ka(e,t,n):(g(Qe,Qe.current&1),t=cn(e,t,n),t!==null?t.sibling:null);g(Qe,Qe.current&1);break;case 19:if(r=t.childExpirationTime>=n,e.effectTag&64){if(r)return Ga(e,t,n);t.effectTag|=64}if(s=t.memoizedState,s!==null&&(s.rendering=null,s.tail=null),g(Qe,Qe.current),!r)return null}return cn(e,t,n)}Qt=!1}}else Qt=!1;switch(t.expirationTime=0,t.tag){case 2:if(r=t.type,e!==null&&(e.alternate=null,t.alternate=null,t.effectTag|=2),e=t.pendingProps,s=Y(t,E.current),Ir(t,n),s=Rs(null,t,r,e,s,n),t.effectTag|=1,typeof s=="object"&&s!==null&&typeof s.render=="function"&&s.$$typeof===void 0){if(t.tag=1,t.memoizedState=null,t.updateQueue=null,W(r)){var c=!0;Ee(t)}else c=!1;t.memoizedState=s.state!==null&&s.state!==void 0?s.state:null,ks(t);var f=r.getDerivedStateFromProps;typeof f=="function"&&il(t,r,f,e),s.updater=ll,t.stateNode=s,s._reactInternalFiber=t,_s(t,r,e,n),t=$s(null,t,r,!0,c,n)}else t.tag=0,kt(null,t,s,n),t=t.child;return t;case 16:e:{if(s=t.elementType,e!==null&&(e.alternate=null,t.alternate=null,t.effectTag|=2),e=t.pendingProps,fa(s),s._status!==1)throw s._result;switch(s=s._result,t.type=s,c=t.tag=Ju(s),e=It(s,e),c){case 0:t=Vs(null,t,s,e,n);break e;case 1:t=Za(null,t,s,e,n);break e;case 11:t=Ba(null,t,s,e,n);break e;case 14:t=Ua(null,t,s,It(s.type,e),r,n);break e}throw Error(v(306,s,""))}return t;case 0:return r=t.type,s=t.pendingProps,s=t.elementType===r?s:It(r,s),Vs(e,t,r,s,n);case 1:return r=t.type,s=t.pendingProps,s=t.elementType===r?s:It(r,s),Za(e,t,r,s,n);case 3:if(Qa(t),r=t.updateQueue,e===null||r===null)throw Error(v(282));if(r=t.pendingProps,s=t.memoizedState,s=s!==null?s.element:null,bs(e,t),Ho(t,r,null,n),r=t.memoizedState.element,r===s)zs(),t=cn(e,t,n);else{if((s=t.stateNode.hydrate)&&(Tn=vn(t.stateNode.containerInfo.firstChild),un=t,s=Gn=!0),s)for(n=Ls(t,null,r,n),t.child=n;n;)n.effectTag=n.effectTag&-3|1024,n=n.sibling;else kt(e,t,r,n),zs();t=t.child}return t;case 5:return Ra(t),e===null&&Fs(t),r=t.type,s=t.pendingProps,c=e!==null?e.memoizedProps:null,f=s.children,po(r,s)?f=null:c!==null&&po(r,c)&&(t.effectTag|=16),qa(e,t),t.mode&4&&n!==1&&s.hidden?(t.expirationTime=t.childExpirationTime=1,t=null):(kt(e,t,f,n),t=t.child),t;case 6:return e===null&&Fs(t),null;case 13:return Ka(e,t,n);case 4:return Ts(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=Hr(t,null,r,n):kt(e,t,r,n),t.child;case 11:return r=t.type,s=t.pendingProps,s=t.elementType===r?s:It(r,s),Ba(e,t,r,s,n);case 7:return kt(e,t,t.pendingProps,n),t.child;case 8:return kt(e,t,t.pendingProps.children,n),t.child;case 12:return kt(e,t,t.pendingProps.children,n),t.child;case 10:e:{r=t.type._context,s=t.pendingProps,f=t.memoizedProps,c=s.value;var h=t.type._context;if(g(nl,h._currentValue),h._currentValue=c,f!==null)if(h=f.value,c=on(h,c)?0:(typeof r._calculateChangedBits=="function"?r._calculateChangedBits(h,c):1073741823)|0,c===0){if(f.children===s.children&&!O.current){t=cn(e,t,n);break e}}else for(h=t.child,h!==null&&(h.return=t);h!==null;){var L=h.dependencies;if(L!==null){f=h.child;for(var T=L.firstContext;T!==null;){if(T.context===r&&T.observedBits&c){h.tag===1&&(T=bn(n,null),T.tag=2,_n(h,T)),h.expirationTime<n&&(h.expirationTime=n),T=h.alternate,T!==null&&T.expirationTime<n&&(T.expirationTime=n),ka(h.return,n),L.expirationTime<n&&(L.expirationTime=n);break}T=T.next}}else f=h.tag===10&&h.type===t.type?null:h.child;if(f!==null)f.return=h;else for(f=h;f!==null;){if(f===t){f=null;break}if(h=f.sibling,h!==null){h.return=f.return,f=h;break}f=f.return}h=f}kt(e,t,s.children,n),t=t.child}return t;case 9:return s=t.type,c=t.pendingProps,r=c.children,Ir(t,n),s=Mt(s,c.unstable_observedBits),r=r(s),t.effectTag|=1,kt(e,t,r,n),t.child;case 14:return s=t.type,c=It(s,t.pendingProps),c=It(s.type,c),Ua(e,t,s,c,r,n);case 15:return Wa(e,t,t.type,t.pendingProps,r,n);case 17:return r=t.type,s=t.pendingProps,s=t.elementType===r?s:It(r,s),e!==null&&(e.alternate=null,t.alternate=null,t.effectTag|=2),t.tag=1,W(r)?(e=!0,Ee(t)):e=!1,Ir(t,n),Sa(t,r,s),_s(t,r,s,n),$s(null,t,r,!0,e,n);case 19:return Ga(e,t,n)}throw Error(v(156,t.tag))},"Rj");var ra=null,oa=null;function Gu(e){if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__=="undefined")return!1;var t=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(t.isDisabled||!t.supportsFiber)return!0;try{var n=t.inject(e);ra=o(function(r){try{t.onCommitFiberRoot(n,r,void 0,(r.current.effectTag&64)===64)}catch{}},"Uj"),oa=o(function(r){try{t.onCommitFiberUnmount(n,r)}catch{}},"Li")}catch{}return!0}o(Gu,"Yj");function Xu(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.effectTag=0,this.lastEffect=this.firstEffect=this.nextEffect=null,this.childExpirationTime=this.expirationTime=0,this.alternate=null}o(Xu,"Zj");function Gt(e,t,n,r){return new Xu(e,t,n,r)}o(Gt,"Sh");function ia(e){return e=e.prototype,!(!e||!e.isReactComponent)}o(ia,"bi");function Ju(e){if(typeof e=="function")return ia(e)?1:0;if(e!=null){if(e=e.$$typeof,e===Pn)return 11;if(e===Lt)return 14}return 2}o(Ju,"Xj");function or(e,t){var n=e.alternate;return n===null?(n=Gt(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.effectTag=0,n.nextEffect=null,n.firstEffect=null,n.lastEffect=null),n.childExpirationTime=e.childExpirationTime,n.expirationTime=e.expirationTime,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{expirationTime:t.expirationTime,firstContext:t.firstContext,responders:t.responders},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}o(or,"Sg");function Pl(e,t,n,r,s,c){var f=2;if(r=e,typeof e=="function")ia(e)&&(f=1);else if(typeof e=="string")f=5;else e:switch(e){case fn:return Mn(n.children,s,c,t);case Hl:f=8,s|=7;break;case Yo:f=8,s|=1;break;case ar:return e=Gt(12,n,t,s|8),e.elementType=ar,e.type=ar,e.expirationTime=c,e;case On:return e=Gt(13,n,t,s),e.type=On,e.elementType=On,e.expirationTime=c,e;case Xt:return e=Gt(19,n,t,s),e.elementType=Xt,e.expirationTime=c,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Go:f=10;break e;case Xo:f=9;break e;case Pn:f=11;break e;case Lt:f=14;break e;case Jo:f=16,r=null;break e;case Fl:f=22;break e}throw Error(v(130,e==null?e:typeof e,""))}return t=Gt(f,n,t,s),t.elementType=e,t.type=r,t.expirationTime=c,t}o(Pl,"Ug");function Mn(e,t,n,r){return e=Gt(7,e,r,t),e.expirationTime=n,e}o(Mn,"Wg");function la(e,t,n){return e=Gt(6,e,null,t),e.expirationTime=n,e}o(la,"Tg");function sa(e,t,n){return t=Gt(4,e.children!==null?e.children:[],e.key,t),t.expirationTime=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}o(sa,"Vg");function ec(e,t,n){this.tag=t,this.current=null,this.containerInfo=e,this.pingCache=this.pendingChildren=null,this.finishedExpirationTime=0,this.finishedWork=null,this.timeoutHandle=-1,this.pendingContext=this.context=null,this.hydrate=n,this.callbackNode=null,this.callbackPriority=90,this.lastExpiredTime=this.lastPingedTime=this.nextKnownPendingLevel=this.lastSuspendedTime=this.firstSuspendedTime=this.firstPendingTime=0}o(ec,"ak");function _u(e,t){var n=e.firstSuspendedTime;return e=e.lastSuspendedTime,n!==0&&n>=t&&e<=t}o(_u,"Aj");function ir(e,t){var n=e.firstSuspendedTime,r=e.lastSuspendedTime;n<t&&(e.firstSuspendedTime=t),(r>t||n===0)&&(e.lastSuspendedTime=t),t<=e.lastPingedTime&&(e.lastPingedTime=0),t<=e.lastExpiredTime&&(e.lastExpiredTime=0)}o(ir,"xi");function Lu(e,t){t>e.firstPendingTime&&(e.firstPendingTime=t);var n=e.firstSuspendedTime;n!==0&&(t>=n?e.firstSuspendedTime=e.lastSuspendedTime=e.nextKnownPendingLevel=0:t>=e.lastSuspendedTime&&(e.lastSuspendedTime=t+1),t>e.nextKnownPendingLevel&&(e.nextKnownPendingLevel=t))}o(Lu,"yi");function aa(e,t){var n=e.lastExpiredTime;(n===0||n>t)&&(e.lastExpiredTime=t)}o(aa,"Cj");function Ol(e,t,n,r){var s=t.current,c=Yt(),f=Fo.suspense;c=er(c,s,f);e:if(n){n=n._reactInternalFiber;t:{if(mn(n)!==n||n.tag!==1)throw Error(v(170));var h=n;do{switch(h.tag){case 3:h=h.stateNode.context;break t;case 1:if(W(h.type)){h=h.stateNode.__reactInternalMemoizedMergedChildContext;break t}}h=h.return}while(h!==null);throw Error(v(171))}if(n.tag===1){var L=n.type;if(W(L)){n=ze(n,L,h);break e}}n=h}else n=y;return t.context===null?t.context=n:t.pendingContext=n,t=bn(c,f),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),_n(s,t),Nn(s,c),c}o(Ol,"bk");function ua(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}o(ua,"ck");function Tu(e,t){e=e.memoizedState,e!==null&&e.dehydrated!==null&&e.retryTime<t&&(e.retryTime=t)}o(Tu,"dk");function ca(e,t){Tu(e,t),(e=e.alternate)&&Tu(e,t)}o(ca,"ek");function da(e,t,n){n=n!=null&&n.hydrate===!0;var r=new ec(e,t,n),s=Gt(3,null,null,t===2?7:t===1?3:0);r.current=s,s.stateNode=r,ks(s),e[Sr]=r.current,n&&t!==0&&pa(e,e.nodeType===9?e:e.ownerDocument),this._internalRoot=r}o(da,"fk"),da.prototype.render=function(e){Ol(e,this._internalRoot,null,null)},da.prototype.unmount=function(){var e=this._internalRoot,t=e.containerInfo;Ol(null,e,null,function(){t[Sr]=null})};function Qo(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}o(Qo,"gk");function tc(e,t){if(t||(t=e?e.nodeType===9?e.documentElement:e.firstChild:null,t=!(!t||t.nodeType!==1||!t.hasAttribute("data-reactroot"))),!t)for(var n;n=e.lastChild;)e.removeChild(n);return new da(e,0,t?{hydrate:!0}:void 0)}o(tc,"hk");function Dl(e,t,n,r,s){var c=n._reactRootContainer;if(c){var f=c._internalRoot;if(typeof s=="function"){var h=s;s=o(function(){var T=ua(f);h.call(T)},"e")}Ol(t,f,e,s)}else{if(c=n._reactRootContainer=tc(n,r),f=c._internalRoot,typeof s=="function"){var L=s;s=o(function(){var T=ua(f);L.call(T)},"e")}gu(function(){Ol(t,f,e,s)})}return ua(f)}o(Dl,"ik");function nc(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Ft,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}o(nc,"jk"),yr=o(function(e){if(e.tag===13){var t=tl(Yt(),150,100);Nn(e,t),ca(e,t)}},"wc"),Cr=o(function(e){e.tag===13&&(Nn(e,3),ca(e,3))},"xc"),wr=o(function(e){if(e.tag===13){var t=Yt();t=er(t,e,null),Nn(e,t),ca(e,t)}},"yc"),ge=o(function(e,t,n){switch(t){case"input":if(Wr(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var s=go(r);if(!s)throw Error(v(90));ti(r),Wr(r,s)}}}break;case"textarea":ii(e,n);break;case"select":t=n.value,t!=null&&Dn(e,!!n.multiple,t,!1)}},"za"),Ue=vu,Xe=o(function(e,t,n,r,s){var c=xe;xe|=4;try{return En(98,e.bind(null,t,n,r,s))}finally{xe=c,xe===nt&&qt()}},"Ga"),ot=o(function(){(xe&(1|Ht|Kt))===nt&&(Bu(),$r())},"Ha"),tt=o(function(e,t){var n=xe;xe|=2;try{return e(t)}finally{xe=n,xe===nt&&qt()}},"Ia");function Su(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Qo(t))throw Error(v(200));return nc(e,t,null,n)}o(Su,"kk");var rc={Events:[jn,rn,go,G,k,gn,function(e){fi(e,Jl)},Ne,Be,_r,pn,$r,{current:!1}]};(function(e){var t=e.findFiberByHostInstance;return Gu(I({},e,{overrideHookState:null,overrideProps:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:yt.ReactCurrentDispatcher,findHostInstanceByFiber:o(function(n){return n=di(n),n===null?null:n.stateNode},"findHostInstanceByFiber"),findFiberByHostInstance:o(function(n){return t?t(n):null},"findFiberByHostInstance"),findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null}))})({findFiberByHostInstance:$n,bundleType:0,version:"16.14.0",rendererPackageName:"react-dom"}),oe=rc,oe=Su,oe=o(function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternalFiber;if(t===void 0)throw typeof e.render=="function"?Error(v(188)):Error(v(268,Object.keys(e)));return e=di(t),e=e===null?null:e.stateNode,e},"__webpack_unused_export__"),oe=o(function(e,t){if((xe&(Ht|Kt))!==nt)throw Error(v(187));var n=xe;xe|=1;try{return En(99,e.bind(null,t))}finally{xe=n,qt()}},"__webpack_unused_export__"),oe=o(function(e,t,n){if(!Qo(t))throw Error(v(200));return Dl(null,e,t,!0,n)},"__webpack_unused_export__"),M.render=function(e,t,n){if(!Qo(t))throw Error(v(200));return Dl(null,e,t,!1,n)},oe=o(function(e){if(!Qo(e))throw Error(v(40));return e._reactRootContainer?(gu(function(){Dl(null,null,e,!1,function(){e._reactRootContainer=null,e[Sr]=null})}),!0):!1},"__webpack_unused_export__"),oe=vu,oe=o(function(e,t){return Su(e,t,2<arguments.length&&arguments[2]!==void 0?arguments[2]:null)},"__webpack_unused_export__"),oe=o(function(e,t,n,r){if(!Qo(n))throw Error(v(200));if(e==null||e._reactInternalFiber===void 0)throw Error(v(38));return Dl(e,t,n,!1,r)},"__webpack_unused_export__"),oe="16.14.0"},961:(R,M,ee)=>{"use strict";function oe(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__=="undefined"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(oe)}catch(le){console.error(le)}}o(oe,"checkDCE"),oe(),R.exports=ee(2551)},5287:(R,M,ee)=>{"use strict";/** @license React v16.14.0
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var oe=ee(5228),le=typeof Symbol=="function"&&Symbol.for,I=le?Symbol.for("react.element"):60103,C=le?Symbol.for("react.portal"):60106,v=le?Symbol.for("react.fragment"):60107,H=le?Symbol.for("react.strict_mode"):60108,z=le?Symbol.for("react.profiler"):60114,q=le?Symbol.for("react.provider"):60109,l=le?Symbol.for("react.context"):60110,se=le?Symbol.for("react.forward_ref"):60112,J=le?Symbol.for("react.suspense"):60113,Pe=le?Symbol.for("react.memo"):60115,Oe=le?Symbol.for("react.lazy"):60116,$=typeof Symbol=="function"&&Symbol.iterator;function K(w){for(var D="https://reactjs.org/docs/error-decoder.html?invariant="+w,he=1;he<arguments.length;he++)D+="&args[]="+encodeURIComponent(arguments[he]);return"Minified React error #"+w+"; visit "+D+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}o(K,"C");var me={isMounted:o(function(){return!1},"isMounted"),enqueueForceUpdate:o(function(){},"enqueueForceUpdate"),enqueueReplaceState:o(function(){},"enqueueReplaceState"),enqueueSetState:o(function(){},"enqueueSetState")},P={};function _(w,D,he){this.props=w,this.context=D,this.refs=P,this.updater=he||me}o(_,"F"),_.prototype.isReactComponent={},_.prototype.setState=function(w,D){if(typeof w!="object"&&typeof w!="function"&&w!=null)throw Error(K(85));this.updater.enqueueSetState(this,w,D,"setState")},_.prototype.forceUpdate=function(w){this.updater.enqueueForceUpdate(this,w,"forceUpdate")};function S(){}o(S,"G"),S.prototype=_.prototype;function Z(w,D,he){this.props=w,this.context=D,this.refs=P,this.updater=he||me}o(Z,"H");var te=Z.prototype=new S;te.constructor=Z,oe(te,_.prototype),te.isPureReactComponent=!0;var V={current:null},k=Object.prototype.hasOwnProperty,A={key:!0,ref:!0,__self:!0,__source:!0};function ie(w,D,he){var ke,we={},ae=null,mt=null;if(D!=null)for(ke in D.ref!==void 0&&(mt=D.ref),D.key!==void 0&&(ae=""+D.key),D)k.call(D,ke)&&!A.hasOwnProperty(ke)&&(we[ke]=D[ke]);var be=arguments.length-2;if(be===1)we.children=he;else if(1<be){for(var Te=Array(be),pt=0;pt<be;pt++)Te[pt]=arguments[pt+2];we.children=Te}if(w&&w.defaultProps)for(ke in be=w.defaultProps,be)we[ke]===void 0&&(we[ke]=be[ke]);return{$$typeof:I,type:w,key:ae,ref:mt,props:we,_owner:V.current}}o(ie,"M");function G(w,D){return{$$typeof:I,type:w.type,key:D,ref:w.ref,props:w.props,_owner:w._owner}}o(G,"N");function U(w){return typeof w=="object"&&w!==null&&w.$$typeof===I}o(U,"O");function ge(w){var D={"=":"=0",":":"=2"};return"$"+(""+w).replace(/[=:]/g,function(he){return D[he]})}o(ge,"escape");var ve=/\/+/g,de=[];function Ce(w,D,he,ke){if(de.length){var we=de.pop();return we.result=w,we.keyPrefix=D,we.func=he,we.context=ke,we.count=0,we}return{result:w,keyPrefix:D,func:he,context:ke,count:0}}o(Ce,"R");function Ne(w){w.result=null,w.keyPrefix=null,w.func=null,w.context=null,w.count=0,10>de.length&&de.push(w)}o(Ne,"S");function Be(w,D,he,ke){var we=typeof w;(we==="undefined"||we==="boolean")&&(w=null);var ae=!1;if(w===null)ae=!0;else switch(we){case"string":case"number":ae=!0;break;case"object":switch(w.$$typeof){case I:case C:ae=!0}}if(ae)return he(ke,w,D===""?"."+Xe(w,0):D),1;if(ae=0,D=D===""?".":D+":",Array.isArray(w))for(var mt=0;mt<w.length;mt++){we=w[mt];var be=D+Xe(we,mt);ae+=Be(we,be,he,ke)}else if(w===null||typeof w!="object"?be=null:(be=$&&w[$]||w["@@iterator"],be=typeof be=="function"?be:null),typeof be=="function")for(w=be.call(w),mt=0;!(we=w.next()).done;)we=we.value,be=D+Xe(we,mt++),ae+=Be(we,be,he,ke);else if(we==="object")throw he=""+w,Error(K(31,he==="[object Object]"?"object with keys {"+Object.keys(w).join(", ")+"}":he,""));return ae}o(Be,"T");function Ue(w,D,he){return w==null?0:Be(w,"",D,he)}o(Ue,"V");function Xe(w,D){return typeof w=="object"&&w!==null&&w.key!=null?ge(w.key):D.toString(36)}o(Xe,"U");function ot(w,D){w.func.call(w.context,D,w.count++)}o(ot,"W");function tt(w,D,he){var ke=w.result,we=w.keyPrefix;w=w.func.call(w.context,D,w.count++),Array.isArray(w)?He(w,ke,he,function(ae){return ae}):w!=null&&(U(w)&&(w=G(w,we+(!w.key||D&&D.key===w.key?"":(""+w.key).replace(ve,"$&/")+"/")+he)),ke.push(w))}o(tt,"aa");function He(w,D,he,ke,we){var ae="";he!=null&&(ae=(""+he).replace(ve,"$&/")+"/"),D=Ce(D,ae,ke,we),Ue(w,tt,D),Ne(D)}o(He,"X");var F={current:null};function B(){var w=F.current;if(w===null)throw Error(K(321));return w}o(B,"Z");var ne={ReactCurrentDispatcher:F,ReactCurrentBatchConfig:{suspense:null},ReactCurrentOwner:V,IsSomeRendererActing:{current:!1},assign:oe};M.Children={map:o(function(w,D,he){if(w==null)return w;var ke=[];return He(w,ke,null,D,he),ke},"map"),forEach:o(function(w,D,he){if(w==null)return w;D=Ce(null,null,D,he),Ue(w,ot,D),Ne(D)},"forEach"),count:o(function(w){return Ue(w,function(){return null},null)},"count"),toArray:o(function(w){var D=[];return He(w,D,null,function(he){return he}),D},"toArray"),only:o(function(w){if(!U(w))throw Error(K(143));return w},"only")},M.Component=_,M.Fragment=v,M.Profiler=z,M.PureComponent=Z,M.StrictMode=H,M.Suspense=J,M.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=ne,M.cloneElement=function(w,D,he){if(w==null)throw Error(K(267,w));var ke=oe({},w.props),we=w.key,ae=w.ref,mt=w._owner;if(D!=null){if(D.ref!==void 0&&(ae=D.ref,mt=V.current),D.key!==void 0&&(we=""+D.key),w.type&&w.type.defaultProps)var be=w.type.defaultProps;for(Te in D)k.call(D,Te)&&!A.hasOwnProperty(Te)&&(ke[Te]=D[Te]===void 0&&be!==void 0?be[Te]:D[Te])}var Te=arguments.length-2;if(Te===1)ke.children=he;else if(1<Te){be=Array(Te);for(var pt=0;pt<Te;pt++)be[pt]=arguments[pt+2];ke.children=be}return{$$typeof:I,type:w.type,key:we,ref:ae,props:ke,_owner:mt}},M.createContext=function(w,D){return D===void 0&&(D=null),w={$$typeof:l,_calculateChangedBits:D,_currentValue:w,_currentValue2:w,_threadCount:0,Provider:null,Consumer:null},w.Provider={$$typeof:q,_context:w},w.Consumer=w},M.createElement=ie,M.createFactory=function(w){var D=ie.bind(null,w);return D.type=w,D},M.createRef=function(){return{current:null}},M.forwardRef=function(w){return{$$typeof:se,render:w}},M.isValidElement=U,M.lazy=function(w){return{$$typeof:Oe,_ctor:w,_status:-1,_result:null}},M.memo=function(w,D){return{$$typeof:Pe,type:w,compare:D===void 0?null:D}},M.useCallback=function(w,D){return B().useCallback(w,D)},M.useContext=function(w,D){return B().useContext(w,D)},M.useDebugValue=function(){},M.useEffect=function(w,D){return B().useEffect(w,D)},M.useImperativeHandle=function(w,D,he){return B().useImperativeHandle(w,D,he)},M.useLayoutEffect=function(w,D){return B().useLayoutEffect(w,D)},M.useMemo=function(w,D){return B().useMemo(w,D)},M.useReducer=function(w,D,he){return B().useReducer(w,D,he)},M.useRef=function(w){return B().useRef(w)},M.useState=function(w){return B().useState(w)},M.version="16.14.0"},6540:(R,M,ee)=>{"use strict";R.exports=ee(5287)},7463:(R,M)=>{"use strict";/** @license React v0.19.1
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ee,oe,le,I,C;if(typeof window=="undefined"||typeof MessageChannel!="function"){var v=null,H=null,z=o(function(){if(v!==null)try{var F=M.unstable_now();v(!0,F),v=null}catch(B){throw setTimeout(z,0),B}},"t"),q=Date.now();M.unstable_now=function(){return Date.now()-q},ee=o(function(F){v!==null?setTimeout(ee,0,F):(v=F,setTimeout(z,0))},"f"),oe=o(function(F,B){H=setTimeout(F,B)},"g"),le=o(function(){clearTimeout(H)},"h"),I=o(function(){return!1},"k"),C=M.unstable_forceFrameRate=function(){}}else{var l=window.performance,se=window.Date,J=window.setTimeout,Pe=window.clearTimeout;if(typeof console!="undefined"){var Oe=window.cancelAnimationFrame;typeof window.requestAnimationFrame!="function"&&console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills"),typeof Oe!="function"&&console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills")}if(typeof l=="object"&&typeof l.now=="function")M.unstable_now=function(){return l.now()};else{var $=se.now();M.unstable_now=function(){return se.now()-$}}var K=!1,me=null,P=-1,_=5,S=0;I=o(function(){return M.unstable_now()>=S},"k"),C=o(function(){},"l"),M.unstable_forceFrameRate=function(F){0>F||125<F?console.error("forceFrameRate takes a positive int between 0 and 125, forcing framerates higher than 125 fps is not unsupported"):_=0<F?Math.floor(1e3/F):5};var Z=new MessageChannel,te=Z.port2;Z.port1.onmessage=function(){if(me!==null){var F=M.unstable_now();S=F+_;try{me(!0,F)?te.postMessage(null):(K=!1,me=null)}catch(B){throw te.postMessage(null),B}}else K=!1},ee=o(function(F){me=F,K||(K=!0,te.postMessage(null))},"f"),oe=o(function(F,B){P=J(function(){F(M.unstable_now())},B)},"g"),le=o(function(){Pe(P),P=-1},"h")}function V(F,B){var ne=F.length;F.push(B);e:for(;;){var w=ne-1>>>1,D=F[w];if(D!==void 0&&0<ie(D,B))F[w]=B,F[ne]=D,ne=w;else break e}}o(V,"J");function k(F){return F=F[0],F===void 0?null:F}o(k,"L");function A(F){var B=F[0];if(B!==void 0){var ne=F.pop();if(ne!==B){F[0]=ne;e:for(var w=0,D=F.length;w<D;){var he=2*(w+1)-1,ke=F[he],we=he+1,ae=F[we];if(ke!==void 0&&0>ie(ke,ne))ae!==void 0&&0>ie(ae,ke)?(F[w]=ae,F[we]=ne,w=we):(F[w]=ke,F[he]=ne,w=he);else if(ae!==void 0&&0>ie(ae,ne))F[w]=ae,F[we]=ne,w=we;else break e}}return B}return null}o(A,"M");function ie(F,B){var ne=F.sortIndex-B.sortIndex;return ne!==0?ne:F.id-B.id}o(ie,"K");var G=[],U=[],ge=1,ve=null,de=3,Ce=!1,Ne=!1,Be=!1;function Ue(F){for(var B=k(U);B!==null;){if(B.callback===null)A(U);else if(B.startTime<=F)A(U),B.sortIndex=B.expirationTime,V(G,B);else break;B=k(U)}}o(Ue,"V");function Xe(F){if(Be=!1,Ue(F),!Ne)if(k(G)!==null)Ne=!0,ee(ot);else{var B=k(U);B!==null&&oe(Xe,B.startTime-F)}}o(Xe,"W");function ot(F,B){Ne=!1,Be&&(Be=!1,le()),Ce=!0;var ne=de;try{for(Ue(B),ve=k(G);ve!==null&&(!(ve.expirationTime>B)||F&&!I());){var w=ve.callback;if(w!==null){ve.callback=null,de=ve.priorityLevel;var D=w(ve.expirationTime<=B);B=M.unstable_now(),typeof D=="function"?ve.callback=D:ve===k(G)&&A(G),Ue(B)}else A(G);ve=k(G)}if(ve!==null)var he=!0;else{var ke=k(U);ke!==null&&oe(Xe,ke.startTime-B),he=!1}return he}finally{ve=null,de=ne,Ce=!1}}o(ot,"X");function tt(F){switch(F){case 1:return-1;case 2:return 250;case 5:return 1073741823;case 4:return 1e4;default:return 5e3}}o(tt,"Y");var He=C;M.unstable_IdlePriority=5,M.unstable_ImmediatePriority=1,M.unstable_LowPriority=4,M.unstable_NormalPriority=3,M.unstable_Profiling=null,M.unstable_UserBlockingPriority=2,M.unstable_cancelCallback=function(F){F.callback=null},M.unstable_continueExecution=function(){Ne||Ce||(Ne=!0,ee(ot))},M.unstable_getCurrentPriorityLevel=function(){return de},M.unstable_getFirstCallbackNode=function(){return k(G)},M.unstable_next=function(F){switch(de){case 1:case 2:case 3:var B=3;break;default:B=de}var ne=de;de=B;try{return F()}finally{de=ne}},M.unstable_pauseExecution=function(){},M.unstable_requestPaint=He,M.unstable_runWithPriority=function(F,B){switch(F){case 1:case 2:case 3:case 4:case 5:break;default:F=3}var ne=de;de=F;try{return B()}finally{de=ne}},M.unstable_scheduleCallback=function(F,B,ne){var w=M.unstable_now();if(typeof ne=="object"&&ne!==null){var D=ne.delay;D=typeof D=="number"&&0<D?w+D:w,ne=typeof ne.timeout=="number"?ne.timeout:tt(F)}else ne=tt(F),D=w;return ne=D+ne,F={id:ge++,callback:B,priorityLevel:F,startTime:D,expirationTime:ne,sortIndex:-1},D>w?(F.sortIndex=D,V(U,F),k(G)===null&&F===k(U)&&(Be?le():Be=!0,oe(Xe,D-w))):(F.sortIndex=ne,V(G,F),Ne||Ce||(Ne=!0,ee(ot))),F},M.unstable_shouldYield=function(){var F=M.unstable_now();Ue(F);var B=k(G);return B!==ve&&ve!==null&&B!==null&&B.callback!==null&&B.startTime<=F&&B.expirationTime<ve.expirationTime||I()},M.unstable_wrapCallback=function(F){var B=de;return function(){var ne=de;de=B;try{return F.apply(this,arguments)}finally{de=ne}}}},9982:(R,M,ee)=>{"use strict";R.exports=ee(7463)},5072:(R,M,ee)=>{"use strict";var oe=o(function(){var K;return o(function(){return typeof K=="undefined"&&(K=!!(window&&document&&document.all&&!window.atob)),K},"memorize")},"isOldIE")(),le=o(function(){var K={};return o(function(P){if(typeof K[P]=="undefined"){var _=document.querySelector(P);if(window.HTMLIFrameElement&&_ instanceof window.HTMLIFrameElement)try{_=_.contentDocument.head}catch{_=null}K[P]=_}return K[P]},"memorize")},"getTarget")(),I=[];function C($){for(var K=-1,me=0;me<I.length;me++)if(I[me].identifier===$){K=me;break}return K}o(C,"getIndexByIdentifier");function v($,K){for(var me={},P=[],_=0;_<$.length;_++){var S=$[_],Z=K.base?S[0]+K.base:S[0],te=me[Z]||0,V="".concat(Z," ").concat(te);me[Z]=te+1;var k=C(V),A={css:S[1],media:S[2],sourceMap:S[3]};k!==-1?(I[k].references++,I[k].updater(A)):I.push({identifier:V,updater:Oe(A,K),references:1}),P.push(V)}return P}o(v,"modulesToDom");function H($){var K=document.createElement("style"),me=$.attributes||{};if(typeof me.nonce=="undefined"){var P=ee.nc;P&&(me.nonce=P)}if(Object.keys(me).forEach(function(S){K.setAttribute(S,me[S])}),typeof $.insert=="function")$.insert(K);else{var _=le($.insert||"head");if(!_)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");_.appendChild(K)}return K}o(H,"insertStyleElement");function z($){if($.parentNode===null)return!1;$.parentNode.removeChild($)}o(z,"removeStyleElement");var q=o(function(){var K=[];return o(function(P,_){return K[P]=_,K.filter(Boolean).join(`
`)},"replace")},"replaceText")();function l($,K,me,P){var _=me?"":P.media?"@media ".concat(P.media," {").concat(P.css,"}"):P.css;if($.styleSheet)$.styleSheet.cssText=q(K,_);else{var S=document.createTextNode(_),Z=$.childNodes;Z[K]&&$.removeChild(Z[K]),Z.length?$.insertBefore(S,Z[K]):$.appendChild(S)}}o(l,"applyToSingletonTag");function se($,K,me){var P=me.css,_=me.media,S=me.sourceMap;if(_?$.setAttribute("media",_):$.removeAttribute("media"),S&&typeof btoa!="undefined"&&(P+=`
/*# sourceMappingURL=data:application/json;base64,`.concat(btoa(unescape(encodeURIComponent(JSON.stringify(S))))," */")),$.styleSheet)$.styleSheet.cssText=P;else{for(;$.firstChild;)$.removeChild($.firstChild);$.appendChild(document.createTextNode(P))}}o(se,"applyToTag");var J=null,Pe=0;function Oe($,K){var me,P,_;if(K.singleton){var S=Pe++;me=J||(J=H(K)),P=l.bind(null,me,S,!1),_=l.bind(null,me,S,!0)}else me=H(K),P=se.bind(null,me,K),_=o(function(){z(me)},"remove");return P($),o(function(te){if(te){if(te.css===$.css&&te.media===$.media&&te.sourceMap===$.sourceMap)return;P($=te)}else _()},"updateStyle")}o(Oe,"addStyle"),R.exports=function($,K){K=K||{},!K.singleton&&typeof K.singleton!="boolean"&&(K.singleton=oe()),$=$||[];var me=v($,K);return o(function(_){if(_=_||[],Object.prototype.toString.call(_)==="[object Array]"){for(var S=0;S<me.length;S++){var Z=me[S],te=C(Z);I[te].references--}for(var V=v(_,K),k=0;k<me.length;k++){var A=me[k],ie=C(A);I[ie].references===0&&(I[ie].updater(),I.splice(ie,1))}me=V}},"update")}},1440:R=>{R.exports='<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M14.12 13.9725L15 12.5L9.37924 2H7.61921L1.99847 12.5L2.87849 13.9725H14.12ZM2.87849 12.9725L8.49922 2.47249L14.12 12.9725H2.87849ZM7.98949 6H8.98799V10H7.98949V6ZM7.98949 11H8.98799V12H7.98949V11Z" fill="#C5C5C5"></path></svg>'},4439:R=>{R.exports='<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_818_123307)"><path d="M16 7.99201C16 3.58042 12.416 0 8 0C3.584 0 0 3.58042 0 7.99201C0 10.4216 1.104 12.6114 2.832 14.0819C2.848 14.0979 2.864 14.0979 2.864 14.1139C3.008 14.2258 3.152 14.3377 3.312 14.4496C3.392 14.4975 3.456 14.5614 3.536 14.6254C4.816 15.4885 6.352 16 8.016 16C9.68 16 11.216 15.4885 12.496 14.6254C12.576 14.5774 12.64 14.5135 12.72 14.4655C12.864 14.3536 13.024 14.2418 13.168 14.1299C13.184 14.1139 13.2 14.1139 13.2 14.0979C14.896 12.6114 16 10.4216 16 7.99201ZM8 14.993C6.496 14.993 5.12 14.5135 3.984 13.7143C4 13.5864 4.032 13.4585 4.064 13.3307C4.16 12.979 4.304 12.6434 4.48 12.3397C4.656 12.036 4.864 11.7642 5.12 11.5245C5.36 11.2847 5.648 11.0609 5.936 10.8851C6.24 10.7093 6.56 10.5814 6.912 10.4855C7.264 10.3896 7.632 10.3417 8 10.3417C8.592 10.3417 9.136 10.4535 9.632 10.6613C10.128 10.8691 10.56 11.1568 10.928 11.5085C11.296 11.8761 11.584 12.3077 11.792 12.8032C11.904 13.0909 11.984 13.3946 12.032 13.7143C10.88 14.5135 9.504 14.993 8 14.993ZM5.552 7.59241C5.408 7.27273 5.344 6.92108 5.344 6.56943C5.344 6.21778 5.408 5.86613 5.552 5.54645C5.696 5.22677 5.888 4.93906 6.128 4.6993C6.368 4.45954 6.656 4.26773 6.976 4.12388C7.296 3.98002 7.648 3.91608 8 3.91608C8.368 3.91608 8.704 3.98002 9.024 4.12388C9.344 4.26773 9.632 4.45954 9.872 4.6993C10.112 4.93906 10.304 5.22677 10.448 5.54645C10.592 5.86613 10.656 6.21778 10.656 6.56943C10.656 6.93706 10.592 7.27273 10.448 7.59241C10.304 7.91209 10.112 8.1998 9.872 8.43956C9.632 8.67932 9.344 8.87113 9.024 9.01499C8.384 9.28671 7.6 9.28671 6.96 9.01499C6.64 8.87113 6.352 8.67932 6.112 8.43956C5.872 8.1998 5.68 7.91209 5.552 7.59241ZM12.976 12.8991C12.976 12.8671 12.96 12.8511 12.96 12.8192C12.8 12.3237 12.576 11.8442 12.272 11.4126C11.968 10.981 11.616 10.5974 11.184 10.2777C10.864 10.038 10.512 9.83017 10.144 9.67033C10.32 9.55844 10.48 9.41459 10.608 9.28671C10.848 9.04695 11.056 8.79121 11.232 8.5035C11.408 8.21578 11.536 7.91209 11.632 7.57642C11.728 7.24076 11.76 6.90509 11.76 6.56943C11.76 6.04196 11.664 5.54645 11.472 5.0989C11.28 4.65135 11.008 4.25175 10.656 3.9001C10.32 3.56444 9.904 3.29271 9.456 3.1009C9.008 2.90909 8.512 2.81319 7.984 2.81319C7.456 2.81319 6.96 2.90909 6.512 3.1009C6.064 3.29271 5.648 3.56444 5.312 3.91608C4.976 4.25175 4.704 4.66733 4.512 5.11489C4.32 5.56244 4.224 6.05794 4.224 6.58541C4.224 6.93706 4.272 7.27273 4.368 7.59241C4.464 7.92807 4.592 8.23177 4.768 8.51948C4.928 8.80719 5.152 9.06294 5.392 9.3027C5.536 9.44655 5.696 9.57443 5.872 9.68631C5.488 9.86214 5.136 10.0699 4.832 10.3097C4.416 10.6294 4.048 11.013 3.744 11.4286C3.44 11.8601 3.216 12.3237 3.056 12.8352C3.04 12.8671 3.04 12.8991 3.04 12.9151C1.776 11.6364 0.992 9.91009 0.992 7.99201C0.992 4.13986 4.144 0.991009 8 0.991009C11.856 0.991009 15.008 4.13986 15.008 7.99201C15.008 9.91009 14.224 11.6364 12.976 12.8991Z" fill="#C5C5C5"></path></g><defs><clipPath id="clip0_818_123307"><rect width="16" height="16" fill="white"></rect></clipPath></defs></svg>'},3538:R=>{R.exports='<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M14.5 4H11V2.5l-.5-.5h-5l-.5.5V4H1.5l-.5.5v8l.5.5h13l.5-.5v-8l-.5-.5zM6 3h4v1H6V3zm8 2v.76L10 8v-.5L9.51 7h-3L6 7.5V8L2 5.71V5h12zM9 8v1H7V8h2zm-7 4V6.86l4 2.29v.35l.5.5h3l.5-.5v-.31l4-2.28V12H2z"></path></svg>'},4894:R=>{R.exports='<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" fill="#C5C5C5"></path></svg>'},407:R=>{R.exports='<svg viewBox="0 -2 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.97612 10.0719L12.3334 5.7146L12.9521 6.33332L8.28548 11L7.66676 11L3.0001 6.33332L3.61882 5.7146L7.97612 10.0719Z" fill="#C5C5C5"></path></svg>'},650:R=>{R.exports='<svg viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.97612 10.0719L12.3334 5.7146L12.9521 6.33332L8.28548 11L7.66676 11L3.0001 6.33332L3.61882 5.7146L7.97612 10.0719Z"></path></svg>'},5130:R=>{R.exports='<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.99998 8.70711L11.6464 12.3536L12.3535 11.6464L8.70708 8L12.3535 4.35355L11.6464 3.64645L7.99998 7.29289L4.35353 3.64645L3.64642 4.35355L7.29287 8L3.64642 11.6464L4.35353 12.3536L7.99998 8.70711Z" fill="#C5C5C5"></path></svg>'},2301:R=>{R.exports='<svg viewBox="0 0 16 16" version="1.1" aria-hidden="true"><path fill-rule="evenodd" d="M14 1H2c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1h2v3.5L7.5 11H14c.55 0 1-.45 1-1V2c0-.55-.45-1-1-1zm0 9H7l-2 2v-2H2V2h12v8z"></path></svg>'},5771:R=>{R.exports='<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.52 0H8.48V4.05333C9.47556 4.16 10.3111 4.58667 10.9867 5.33333C11.6622 6.08 12 6.96889 12 8C12 9.03111 11.6622 9.92 10.9867 10.6667C10.3111 11.4133 9.47556 11.84 8.48 11.9467V16H7.52V11.9467C6.52444 11.84 5.68889 11.4133 5.01333 10.6667C4.33778 9.92 4 9.03111 4 8C4 6.96889 4.33778 6.08 5.01333 5.33333C5.68889 4.58667 6.52444 4.16 7.52 4.05333V0ZM8 10.6133C8.71111 10.6133 9.31556 10.3644 9.81333 9.86667C10.3467 9.33333 10.6133 8.71111 10.6133 8C10.6133 7.28889 10.3467 6.68444 9.81333 6.18667C9.31556 5.65333 8.71111 5.38667 8 5.38667C7.28889 5.38667 6.66667 5.65333 6.13333 6.18667C5.63556 6.68444 5.38667 7.28889 5.38667 8C5.38667 8.71111 5.63556 9.33333 6.13333 9.86667C6.66667 10.3644 7.28889 10.6133 8 10.6133Z" fill="#A0A0A0"></path></svg>'},2158:R=>{R.exports='<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M6.25 9.016C6.66421 9.016 7 9.35089 7 9.76399V11.26C7 11.6731 6.66421 12.008 6.25 12.008C5.83579 12.008 5.5 11.6731 5.5 11.26V9.76399C5.5 9.35089 5.83579 9.016 6.25 9.016Z"></path><path d="M10.5 9.76399C10.5 9.35089 10.1642 9.016 9.75 9.016C9.33579 9.016 9 9.35089 9 9.76399V11.26C9 11.6731 9.33579 12.008 9.75 12.008C10.1642 12.008 10.5 11.6731 10.5 11.26V9.76399Z"></path><path d="M7.86079 1.80482C7.91028 1.8577 7.95663 1.91232 8 1.96856C8.04337 1.91232 8.08972 1.8577 8.13921 1.80482C8.82116 1.07611 9.87702 0.90832 11.0828 1.04194C12.3131 1.17827 13.2283 1.56829 13.8072 2.29916C14.3725 3.01276 14.5 3.90895 14.5 4.77735C14.5 5.34785 14.447 5.92141 14.2459 6.428L14.4135 7.26391L14.4798 7.29699C15.4115 7.76158 16 8.71126 16 9.7501V11.0107C16 11.2495 15.9143 11.4478 15.844 11.5763C15.7691 11.7131 15.6751 11.8368 15.5851 11.9416C15.4049 12.1512 15.181 12.3534 14.9801 12.5202C14.7751 12.6907 14.5728 12.8419 14.4235 12.9494C14.1842 13.1217 13.9389 13.2807 13.6826 13.4277C13.3756 13.6038 12.9344 13.8361 12.3867 14.0679C11.2956 14.5296 9.75604 15 8 15C6.24396 15 4.70442 14.5296 3.61334 14.0679C3.06559 13.8361 2.62435 13.6038 2.31739 13.4277C2.0611 13.2807 1.81581 13.1217 1.57651 12.9494C1.42716 12.8419 1.2249 12.6907 1.01986 12.5202C0.819 12.3534 0.595113 12.1512 0.414932 11.9416C0.3249 11.8368 0.230849 11.7131 0.156031 11.5763C0.0857453 11.4478 0 11.2495 1.90735e-06 11.0107L0 9.7501C0 8.71126 0.588507 7.76158 1.52017 7.29699L1.5865 7.26391L1.75413 6.42799C1.55295 5.9214 1.5 5.34785 1.5 4.77735C1.5 3.90895 1.62745 3.01276 2.19275 2.29916C2.77172 1.56829 3.68694 1.17827 4.91718 1.04194C6.12298 0.90832 7.17884 1.07611 7.86079 1.80482ZM3.0231 7.7282L3 7.8434V12.0931C3.02086 12.1053 3.04268 12.1179 3.06543 12.131C3.32878 12.2821 3.71567 12.4861 4.19916 12.6907C5.17058 13.1017 6.50604 13.504 8 13.504C9.49396 13.504 10.8294 13.1017 11.8008 12.6907C12.2843 12.4861 12.6712 12.2821 12.9346 12.131C12.9573 12.1179 12.9791 12.1053 13 12.0931V7.8434L12.9769 7.7282C12.4867 7.93728 11.9022 8.01867 11.25 8.01867C10.1037 8.01867 9.19051 7.69201 8.54033 7.03004C8.3213 6.80703 8.14352 6.55741 8 6.28924C7.85648 6.55741 7.6787 6.80703 7.45967 7.03004C6.80949 7.69201 5.89633 8.01867 4.75 8.01867C4.09776 8.01867 3.51325 7.93728 3.0231 7.7282ZM6.76421 2.82557C6.57116 2.61928 6.12702 2.41307 5.08282 2.52878C4.06306 2.64179 3.60328 2.93176 3.36975 3.22656C3.12255 3.53861 3 4.01374 3 4.77735C3 5.56754 3.12905 5.94499 3.3082 6.1441C3.47045 6.32443 3.82768 6.52267 4.75 6.52267C5.60367 6.52267 6.08903 6.28769 6.38811 5.98319C6.70349 5.66209 6.91507 5.1591 7.00579 4.43524C7.12274 3.50212 6.96805 3.04338 6.76421 2.82557ZM9.23579 2.82557C9.03195 3.04338 8.87726 3.50212 8.99421 4.43524C9.08493 5.1591 9.29651 5.66209 9.61189 5.98319C9.91097 6.28769 10.3963 6.52267 11.25 6.52267C12.1723 6.52267 12.5295 6.32443 12.6918 6.1441C12.871 5.94499 13 5.56754 13 4.77735C13 4.01374 12.8775 3.53861 12.6303 3.22656C12.3967 2.93176 11.9369 2.64179 10.9172 2.52878C9.87298 2.41307 9.42884 2.61928 9.23579 2.82557Z"></path></svg>'},7165:R=>{R.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M5.75 1a.75.75 0 00-.75.75v3c0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75v-3a.75.75 0 00-.75-.75h-4.5zm.75 3V2.5h3V4h-3zm-2.874-.467a.75.75 0 00-.752-1.298A1.75 1.75 0 002 3.75v9.5c0 .966.784 1.75 1.75 1.75h8.5A1.75 1.75 0 0014 13.25v-9.5a1.75 1.75 0 00-.874-1.515.75.75 0 10-.752 1.298.25.25 0 01.126.217v9.5a.25.25 0 01-.25.25h-8.5a.25.25 0 01-.25-.25v-9.5a.25.25 0 01.126-.217z"></path></svg>'},8440:R=>{R.exports='<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 28 28" version="1.1"><g id="surface1"><path style=" stroke:none;fill-rule:evenodd;fill:#FFFFFF;fill-opacity:1;" d="M 14 0 C 6.265625 0 0 6.265625 0 14 C 0 20.195312 4.007812 25.425781 9.574219 27.285156 C 10.273438 27.402344 10.535156 26.984375 10.535156 26.617188 C 10.535156 26.285156 10.515625 25.183594 10.515625 24.011719 C 7 24.660156 6.089844 23.152344 5.808594 22.363281 C 5.652344 21.960938 4.972656 20.722656 4.375 20.386719 C 3.886719 20.125 3.183594 19.476562 4.359375 19.460938 C 5.460938 19.441406 6.246094 20.476562 6.511719 20.894531 C 7.769531 23.011719 9.785156 22.417969 10.585938 22.050781 C 10.710938 21.140625 11.078125 20.527344 11.480469 20.175781 C 8.363281 19.828125 5.109375 18.621094 5.109375 13.265625 C 5.109375 11.742188 5.652344 10.484375 6.546875 9.503906 C 6.402344 9.152344 5.914062 7.714844 6.683594 5.792969 C 6.683594 5.792969 7.859375 5.425781 10.535156 7.226562 C 11.652344 6.914062 12.847656 6.753906 14.035156 6.753906 C 15.226562 6.753906 16.414062 6.914062 17.535156 7.226562 C 20.210938 5.410156 21.386719 5.792969 21.386719 5.792969 C 22.152344 7.714844 21.664062 9.152344 21.523438 9.503906 C 22.417969 10.484375 22.960938 11.726562 22.960938 13.265625 C 22.960938 18.636719 19.6875 19.828125 16.574219 20.175781 C 17.078125 20.613281 17.515625 21.453125 17.515625 22.765625 C 17.515625 24.640625 17.5 26.144531 17.5 26.617188 C 17.5 26.984375 17.761719 27.421875 18.460938 27.285156 C 24.160156 25.359375 27.996094 20.015625 28 14 C 28 6.265625 21.734375 0 14 0 Z M 14 0 "></path></g></svg>'},6279:R=>{R.exports='<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10 3h3v1h-1v9l-1 1H4l-1-1V4H2V3h3V2a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v1zM9 2H6v1h3V2zM4 13h7V4H4v9zm2-8H5v7h1V5zm1 0h1v7H7V5zm2 0h1v7H9V5z" fill="#cccccc"></path></svg>'},9443:R=>{R.exports='<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 4C8.35556 4 8.71111 4.05333 9.06667 4.16C9.74222 4.33778 10.3289 4.67556 10.8267 5.17333C11.3244 5.67111 11.6622 6.25778 11.84 6.93333C11.9467 7.28889 12 7.64444 12 8C12 8.35556 11.9467 8.71111 11.84 9.06667C11.6622 9.74222 11.3244 10.3289 10.8267 10.8267C10.3289 11.3244 9.74222 11.6622 9.06667 11.84C8.71111 11.9467 8.35556 12 8 12C7.64444 12 7.28889 11.9467 6.93333 11.84C6.25778 11.6622 5.67111 11.3244 5.17333 10.8267C4.67556 10.3289 4.33778 9.74222 4.16 9.06667C4.05333 8.71111 4 8.35556 4 8C4 7.64444 4.03556 7.30667 4.10667 6.98667C4.21333 6.63111 4.35556 6.29333 4.53333 5.97333C4.88889 5.36889 5.36889 4.88889 5.97333 4.53333C6.29333 4.35556 6.61333 4.23111 6.93333 4.16C7.28889 4.05333 7.64444 4 8 4Z" fill="#CCCCCC"></path></svg>'},3962:R=>{R.exports='<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.40706 15L1 13.5929L3.35721 9.46781L3.52339 9.25025L11.7736 1L13.2321 1L15 2.76791V4.22636L6.74975 12.4766L6.53219 12.6428L2.40706 15ZM2.40706 13.5929L6.02053 11.7474L14.2708 3.49714L12.5029 1.72923L4.25262 9.97947L2.40706 13.5929Z" fill="#C5C5C5"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M5.64642 12.3536L3.64642 10.3536L4.35353 9.64645L6.35353 11.6464L5.64642 12.3536Z" fill="#C5C5C5"></path></svg>'},2359:R=>{R.exports='<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.1 4.4L8.6 2H7.4L6.9 4.4L6.2 4.7L4.2 3.4L3.3 4.2L4.6 6.2L4.4 6.9L2 7.4V8.6L4.4 9.1L4.7 9.9L3.4 11.9L4.2 12.7L6.2 11.4L7 11.7L7.4 14H8.6L9.1 11.6L9.9 11.3L11.9 12.6L12.7 11.8L11.4 9.8L11.7 9L14 8.6V7.4L11.6 6.9L11.3 6.1L12.6 4.1L11.8 3.3L9.8 4.6L9.1 4.4ZM9.4 1L9.9 3.4L12 2.1L14 4.1L12.6 6.2L15 6.6V9.4L12.6 9.9L14 12L12 14L9.9 12.6L9.4 15H6.6L6.1 12.6L4 13.9L2 11.9L3.4 9.8L1 9.4V6.6L3.4 6.1L2.1 4L4.1 2L6.2 3.4L6.6 1H9.4ZM10 8C10 9.1 9.1 10 8 10C6.9 10 6 9.1 6 8C6 6.9 6.9 6 8 6C9.1 6 10 6.9 10 8ZM8 9C8.6 9 9 8.6 9 8C9 7.4 8.6 7 8 7C7.4 7 7 7.4 7 8C7 8.6 7.4 9 8 9Z" fill="#C5C5C5"></path></svg>'},459:R=>{R.exports='<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.00012 13H7.00012L7.00012 7.00001L13.0001 7.00001V6.00001L7.00012 6.00001L7.00012 3H6.00012L6.00012 6.00001L3.00012 6.00001V7.00001H6.00012L6.00012 13Z" fill="#C5C5C5"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M2.50012 2H13.5001L14.0001 2.5V13.5L13.5001 14H2.50012L2.00012 13.5V2.5L2.50012 2ZM3.00012 13H13.0001V3H3.00012V13Z" fill="#C5C5C5"></path></svg>'},27:R=>{R.exports='<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M7.50002 1C6.21445 1 4.95774 1.38123 3.88882 2.09546C2.8199 2.80969 1.98674 3.82485 1.49478 5.01257C1.00281 6.20029 0.874098 7.50719 1.1249 8.76807C1.37571 10.0289 1.99479 11.1872 2.90383 12.0962C3.81287 13.0052 4.97108 13.6243 6.23196 13.8751C7.49283 14.1259 8.79973 13.9972 9.98745 13.5052C11.1752 13.0133 12.1903 12.1801 12.9046 11.1112C13.6188 10.0423 14 8.78558 14 7.5C14 5.77609 13.3152 4.1228 12.0962 2.90381C10.8772 1.68482 9.22393 1 7.50002 1ZM7.50002 13C6.41223 13 5.34883 12.6775 4.44436 12.0731C3.53989 11.4688 2.83501 10.6097 2.41873 9.60474C2.00244 8.59974 1.89352 7.4939 2.10574 6.427C2.31796 5.36011 2.8418 4.38015 3.61099 3.61096C4.38018 2.84177 5.36013 2.31793 6.42703 2.10571C7.49392 1.89349 8.59977 2.00242 9.60476 2.4187C10.6098 2.83498 11.4688 3.53987 12.0731 4.44434C12.6775 5.34881 13 6.4122 13 7.5C13 8.95869 12.4205 10.3576 11.3891 11.389C10.3576 12.4205 8.95871 13 7.50002 13Z"></path><circle cx="7.50002" cy="7.5" r="1"></circle></svg>'},4674:R=>{R.exports='<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M6.27 10.87h.71l4.56-4.56-.71-.71-4.2 4.21-1.92-1.92L4 8.6l2.27 2.27z"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M8.6 1c1.6.1 3.1.9 4.2 2 1.3 1.4 2 3.1 2 5.1 0 1.6-.6 3.1-1.6 4.4-1 1.2-2.4 2.1-4 2.4-1.6.3-3.2.1-4.6-.7-1.4-.8-2.5-2-3.1-3.5C.9 9.2.8 7.5 1.3 6c.5-1.6 1.4-2.9 2.8-3.8C5.4 1.3 7 .9 8.6 1zm.5 12.9c1.3-.3 2.5-1 3.4-2.1.8-1.1 1.3-2.4 1.2-3.8 0-1.6-.6-3.2-1.7-4.3-1-1-2.2-1.6-3.6-1.7-1.3-.1-2.7.2-3.8 1-1.1.8-1.9 1.9-2.3 3.3-.4 1.3-.4 2.7.2 4 .6 1.3 1.5 2.3 2.7 3 1.2.7 2.6.9 3.9.6z"></path></svg>'},5064:R=>{R.exports='<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.2002 2H8.01724L7.66424 2.146L1.00024 8.81V9.517L6.18324 14.7H6.89024L9.10531 12.4853C9.65832 12.7768 10.2677 12.9502 10.8945 12.9923C11.659 13.0437 12.424 12.8981 13.1162 12.5694C13.8085 12.2407 14.4048 11.74 14.8483 11.1151C15.2918 10.4902 15.5676 9.76192 15.6492 9H15.6493C15.6759 8.83446 15.6929 8.66751 15.7003 8.5C15.6989 7.30693 15.2244 6.16311 14.3808 5.31948C14.1712 5.10988 13.9431 4.92307 13.7002 4.76064V2.5L13.2002 2ZM12.7002 4.25881C12.223 4.08965 11.7162 4.00057 11.2003 4C11.0676 4 10.9405 4.05268 10.8467 4.14645C10.7529 4.24021 10.7003 4.36739 10.7003 4.5C10.7003 4.63261 10.7529 4.75979 10.8467 4.85355C10.9405 4.94732 11.0676 5 11.2003 5C11.7241 5 12.2358 5.11743 12.7002 5.33771V7.476L8.77506 11.4005C8.75767 11.4095 8.74079 11.4194 8.72449 11.4304C8.6685 11.468 8.6207 11.5166 8.58397 11.5731C8.57475 11.5874 8.56627 11.602 8.55856 11.617L6.53624 13.639L2.06124 9.163L8.22424 3H12.7002V4.25881ZM13.7002 6.0505C14.3409 6.70435 14.7003 7.58365 14.7003 8.5C14.6955 8.66769 14.6784 8.8348 14.6493 9H14.6492C14.5675 9.58097 14.3406 10.1319 13.9894 10.6019C13.6383 11.0719 13.1743 11.4457 12.6403 11.6888C12.1063 11.9319 11.5197 12.0363 10.9346 11.9925C10.5622 11.9646 10.1982 11.8772 9.85588 11.7348L13.5542 8.037L13.7002 7.683V6.0505Z" fill="#C5C5C5"></path></svg>'},346:R=>{R.exports='<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.99008 1C4.5965 1 4.21175 1.11671 3.8845 1.33538C3.55724 1.55404 3.30218 1.86484 3.15156 2.22846C3.00094 2.59208 2.96153 2.99221 3.03832 3.37823C3.1151 3.76425 3.30463 4.11884 3.58294 4.39714C3.83589 4.65009 4.15185 4.8297 4.49715 4.91798L4.49099 10.8286C4.40192 10.8517 4.31421 10.881 4.22852 10.9165C3.8649 11.0671 3.5541 11.3222 3.33544 11.6494C3.11677 11.9767 3.00006 12.3614 3.00006 12.755C3.00006 13.2828 3.20972 13.7889 3.58292 14.1621C3.95612 14.5353 4.46228 14.745 4.99006 14.745C5.38365 14.745 5.76839 14.6283 6.09565 14.4096C6.4229 14.191 6.67796 13.8802 6.82858 13.5165C6.9792 13.1529 7.01861 12.7528 6.94182 12.3668C6.86504 11.9807 6.67551 11.6262 6.3972 11.3479C6.14426 11.0949 5.8283 10.9153 5.48299 10.827V9.745H5.48915V8.80133C6.50043 10.3332 8.19531 11.374 10.1393 11.4893C10.2388 11.7413 10.3893 11.9714 10.5825 12.1648C10.8608 12.4432 11.2154 12.6328 11.6014 12.7097C11.9875 12.7866 12.3877 12.7472 12.7513 12.5966C13.115 12.446 13.4259 12.191 13.6446 11.8637C13.8633 11.5364 13.98 11.1516 13.98 10.758C13.98 10.2304 13.7705 9.72439 13.3975 9.35122C13.0245 8.97805 12.5186 8.76827 11.991 8.76801C11.5974 8.76781 11.2126 8.88435 10.8852 9.10289C10.5578 9.32144 10.3026 9.63216 10.1518 9.99577C10.0875 10.1509 10.0434 10.3127 10.0199 10.4772C7.48375 10.2356 5.48915 8.09947 5.48915 5.5C5.48915 5.33125 5.47282 5.16445 5.48915 5V4.9164C5.57823 4.89333 5.66594 4.86401 5.75162 4.82852C6.11525 4.6779 6.42604 4.42284 6.64471 4.09558C6.86337 3.76833 6.98008 3.38358 6.98008 2.99C6.98008 2.46222 6.77042 1.95605 6.39722 1.58286C6.02403 1.20966 5.51786 1 4.99008 1ZM4.99008 2C5.18593 1.9998 5.37743 2.0577 5.54037 2.16636C5.70331 2.27502 5.83035 2.42957 5.90544 2.61045C5.98052 2.79133 6.00027 2.99042 5.96218 3.18253C5.9241 3.37463 5.82989 3.55113 5.69147 3.68968C5.55306 3.82824 5.37666 3.92262 5.18459 3.9609C4.99252 3.99918 4.79341 3.97964 4.61246 3.90474C4.4315 3.82983 4.27682 3.70294 4.168 3.54012C4.05917 3.37729 4.00108 3.18585 4.00108 2.99C4.00135 2.72769 4.1056 2.47618 4.29098 2.29061C4.47637 2.10503 4.72777 2.00053 4.99008 2ZM4.99006 13.745C4.79422 13.7452 4.60271 13.6873 4.43977 13.5786C4.27684 13.47 4.14979 13.3154 4.07471 13.1345C3.99962 12.9537 3.97988 12.7546 4.01796 12.5625C4.05605 12.3704 4.15026 12.1939 4.28867 12.0553C4.42709 11.9168 4.60349 11.8224 4.79555 11.7841C4.98762 11.7458 5.18673 11.7654 5.36769 11.8403C5.54864 11.9152 5.70332 12.0421 5.81215 12.2049C5.92097 12.3677 5.97906 12.5591 5.97906 12.755C5.9788 13.0173 5.87455 13.2688 5.68916 13.4544C5.50377 13.64 5.25237 13.7445 4.99006 13.745ZM11.991 9.76801C12.1868 9.76801 12.3782 9.82607 12.541 9.93485C12.7038 10.0436 12.8307 10.1983 12.9057 10.3791C12.9806 10.56 13.0002 10.7591 12.962 10.9511C12.9238 11.1432 12.8295 11.3196 12.6911 11.458C12.5526 11.5965 12.3762 11.6908 12.1842 11.729C11.9921 11.7672 11.7931 11.7476 11.6122 11.6726C11.4313 11.5977 11.2767 11.4708 11.1679 11.308C11.0591 11.1452 11.001 10.9538 11.001 10.758C11.0013 10.4955 11.1057 10.2439 11.2913 10.0583C11.4769 9.87266 11.7285 9.76827 11.991 9.76801Z" fill="#C5C5C5"></path></svg>'},4370:R=>{R.exports='<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.5002 4.64639L8.35388 2.5H7.64677L5.50034 4.64639L6.20744 5.35349L7.3003 4.26066V5.27972H7.28082V5.73617L7.30568 5.73717C7.30768 5.84794 7.30968 5.95412 7.31169 6.05572C7.31538 6.24322 7.33201 6.43462 7.36158 6.62994C7.39114 6.82525 7.42994 7.02056 7.47799 7.21587C7.52603 7.41119 7.59255 7.62017 7.67755 7.84283C7.83276 8.22173 8.02124 8.56548 8.24297 8.87408C8.4647 9.18267 8.70307 9.47173 8.95806 9.74127C9.21306 10.0108 9.46621 10.2764 9.71751 10.5381C9.9688 10.7999 10.1961 11.0792 10.3993 11.376C10.6026 11.6729 10.767 11.9971 10.8927 12.3487C11.0183 12.7002 11.0812 13.1045 11.0812 13.5616V14.4463H12.5003V13.5616C12.4929 13.042 12.4375 12.5792 12.334 12.1729C12.2305 11.7667 12.0882 11.3995 11.9071 11.0713C11.7261 10.7432 11.5246 10.4444 11.3029 10.1749C11.0812 9.90533 10.8502 9.64752 10.61 9.40142C10.3698 9.15533 10.1388 8.90923 9.91707 8.66314C9.69533 8.41705 9.49392 8.15533 9.31284 7.87798C9.13176 7.60064 8.98763 7.29595 8.88046 6.96392C8.77329 6.63189 8.7197 6.25494 8.7197 5.83306V5.27972H8.71901V4.27935L9.79314 5.3535L10.5002 4.64639ZM7.04245 9.74127C7.15517 9.62213 7.26463 9.49917 7.37085 9.3724C7.12665 9.01878 6.92109 8.63423 6.75218 8.22189L6.74317 8.19952C6.70951 8.11134 6.67794 8.02386 6.6486 7.93713C6.47774 8.19261 6.28936 8.43461 6.08345 8.66314C5.86172 8.90923 5.63074 9.15533 5.39053 9.40142C5.15032 9.64752 4.91935 9.90533 4.69761 10.1749C4.47588 10.4444 4.27447 10.7432 4.09338 11.0713C3.9123 11.3995 3.77002 11.7667 3.66654 12.1729C3.56307 12.5792 3.50764 13.042 3.50024 13.5616V14.4463H4.91935V13.5616C4.91935 13.1045 4.98217 12.7002 5.10782 12.3487C5.23347 11.9971 5.39792 11.6729 5.60118 11.376C5.80444 11.0792 6.03171 10.7999 6.28301 10.5381C6.53431 10.2764 6.78746 10.0108 7.04245 9.74127Z" fill="#424242"></path></svg>'},628:R=>{R.exports='<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.99976 1H6.99976V3H1.49976L0.999756 3.5V7.5L1.49976 8H6.99976V15H7.99976V8H12.4898L12.8298 7.87L15.0098 5.87V5.13L12.8298 3.13L12.4998 3H7.99976V1ZM12.2898 7H1.99976V4H12.2898L13.9198 5.5L12.2898 7ZM4.99976 5H9.99976V6H4.99976V5Z" fill="#C5C5C5"></path></svg>'},5010:R=>{R.exports='<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 7V8H8V14H7V8H1V7H7V1H8V7H14Z" fill="#C5C5C5"></path></svg>'},4268:R=>{R.exports='<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.616 4.928a2.487 2.487 0 0 1-1.119.922c-.148.06-.458.138-.458.138v5.008a2.51 2.51 0 0 1 1.579 1.062c.273.412.419.895.419 1.388.008.343-.057.684-.19 1A2.485 2.485 0 0 1 3.5 15.984a2.482 2.482 0 0 1-1.388-.419A2.487 2.487 0 0 1 1.05 13c.095-.486.331-.932.68-1.283.349-.343.79-.579 1.269-.68V5.949a2.6 2.6 0 0 1-1.269-.68 2.503 2.503 0 0 1-.68-1.283 2.487 2.487 0 0 1 1.06-2.565A2.49 2.49 0 0 1 3.5 1a2.504 2.504 0 0 1 1.807.729 2.493 2.493 0 0 1 .729 1.81c.002.494-.144.978-.42 1.389zm-.756 7.861a1.5 1.5 0 0 0-.552-.579 1.45 1.45 0 0 0-.77-.21 1.495 1.495 0 0 0-1.47 1.79 1.493 1.493 0 0 0 1.18 1.179c.288.058.586.03.86-.08.276-.117.512-.312.68-.56.15-.226.235-.49.249-.76a1.51 1.51 0 0 0-.177-.78zM2.708 4.741c.247.161.536.25.83.25.271 0 .538-.075.77-.211a1.514 1.514 0 0 0 .729-1.359 1.513 1.513 0 0 0-.25-.76 1.551 1.551 0 0 0-.68-.56 1.49 1.49 0 0 0-.86-.08 1.494 1.494 0 0 0-1.179 1.18c-.058.288-.03.586.08.86.117.276.312.512.56.68zm10.329 6.296c.48.097.922.335 1.269.68.466.47.729 1.107.725 1.766.002.493-.144.977-.42 1.388a2.499 2.499 0 0 1-4.532-.899 2.5 2.5 0 0 1 1.067-2.565c.267-.183.571-.308.889-.37V5.489a1.5 1.5 0 0 0-1.5-1.499H8.687l1.269 1.27-.71.709L7.117 3.84v-.7l2.13-2.13.71.711-1.269 1.27h1.85a2.484 2.484 0 0 1 2.312 1.541c.125.302.189.628.187.957v5.548zm.557 3.509a1.493 1.493 0 0 0 .191-1.89 1.552 1.552 0 0 0-.68-.559 1.49 1.49 0 0 0-.86-.08 1.493 1.493 0 0 0-1.179 1.18 1.49 1.49 0 0 0 .08.86 1.496 1.496 0 0 0 2.448.49z"></path></svg>'},340:R=>{R.exports='<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.38893 12.9906L6.11891 11.7205L6.78893 11.0206L8.91893 13.1506V13.8505L6.78893 15.9805L6.07893 15.2706L7.34892 14.0006H5.49892C5.17024 14.0019 4.84458 13.9381 4.54067 13.8129C4.23675 13.6878 3.96061 13.5037 3.7282 13.2713C3.49579 13.0389 3.31171 12.7627 3.18654 12.4588C3.06137 12.1549 2.99759 11.8292 2.99892 11.5006V5.95052C2.5198 5.84851 2.07944 5.61279 1.72893 5.27059C1.3808 4.91884 1.14393 4.47238 1.0479 3.98689C0.951867 3.50141 1.00092 2.9984 1.18892 2.54061C1.37867 2.08436 1.69938 1.69458 2.11052 1.42049C2.52166 1.14639 3.00479 1.00024 3.49892 1.00057C3.84188 0.993194 4.18256 1.05787 4.49892 1.19051C4.80197 1.31518 5.07732 1.49871 5.30904 1.73042C5.54075 1.96214 5.72425 2.23755 5.84892 2.54061C5.98157 2.85696 6.0463 3.19765 6.03893 3.54061C6.03926 4.03474 5.89316 4.51789 5.61906 4.92903C5.34497 5.34017 4.95516 5.6608 4.49892 5.85054C4.35057 5.91224 4.19649 5.95915 4.03893 5.99056V11.4906C4.03893 11.8884 4.19695 12.2699 4.47826 12.5512C4.75956 12.8325 5.1411 12.9906 5.53893 12.9906H7.38893ZM2.70894 4.74056C2.95497 4.90376 3.24368 4.99072 3.53893 4.99056C3.81026 4.99066 4.07654 4.91718 4.3094 4.77791C4.54227 4.63864 4.73301 4.43877 4.86128 4.19966C4.98956 3.96056 5.05057 3.69116 5.03783 3.42012C5.02508 3.14908 4.93907 2.88661 4.78893 2.6606C4.62119 2.4121 4.38499 2.21751 4.10893 2.10054C3.83645 1.98955 3.53719 1.96176 3.24892 2.02059C2.95693 2.07705 2.68852 2.2196 2.47823 2.42989C2.26793 2.64018 2.12539 2.90853 2.06892 3.20052C2.0101 3.4888 2.03792 3.78802 2.14891 4.0605C2.26588 4.33656 2.46043 4.57282 2.70894 4.74056ZM13.0389 11.0406C13.5196 11.1384 13.9612 11.3747 14.309 11.7206C14.7766 12.191 15.039 12.8273 15.0389 13.4906C15.0393 13.9847 14.8932 14.4679 14.6191 14.879C14.345 15.2902 13.9552 15.6109 13.499 15.8007C13.0416 15.9915 12.5378 16.0421 12.0516 15.946C11.5654 15.85 11.1187 15.6117 10.7683 15.2612C10.4179 14.9108 10.1795 14.4641 10.0835 13.9779C9.98746 13.4917 10.0381 12.988 10.2289 12.5306C10.4218 12.0768 10.7412 11.688 11.1489 11.4106C11.4177 11.2286 11.7204 11.1028 12.0389 11.0406V5.4906C12.0389 5.09278 11.8809 4.71124 11.5996 4.42993C11.3183 4.14863 10.9368 3.9906 10.5389 3.9906H8.68896L9.95892 5.26062L9.24896 5.97058L7.11893 3.84058V3.14063L9.24896 1.01062L9.95892 1.72058L8.68896 2.9906H10.5389C10.8676 2.98928 11.1933 3.05305 11.4972 3.17822C11.8011 3.30339 12.0772 3.48744 12.3096 3.71985C12.542 3.95226 12.7262 4.22844 12.8513 4.53235C12.9765 4.83626 13.0403 5.16193 13.0389 5.4906V11.0406ZM12.6879 14.9829C13.0324 14.9483 13.3542 14.7956 13.5989 14.5507C13.8439 14.306 13.9966 13.984 14.0313 13.6395C14.0659 13.295 13.9803 12.9492 13.7889 12.6606C13.6212 12.4121 13.385 12.2176 13.1089 12.1006C12.8365 11.9896 12.5372 11.9618 12.249 12.0206C11.957 12.0771 11.6886 12.2196 11.4783 12.4299C11.268 12.6402 11.1254 12.9086 11.069 13.2006C11.0101 13.4888 11.0379 13.7881 11.1489 14.0605C11.2659 14.3366 11.4604 14.5729 11.7089 14.7406C11.9975 14.9319 12.3434 15.0175 12.6879 14.9829Z" fill="#C5C5C5"></path></svg>'},659:R=>{R.exports='<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.61594 4.92769C5.34304 5.33899 4.95319 5.66062 4.49705 5.8497C4.34891 5.91013 4.03897 5.9881 4.03897 5.9881V10.9958C4.19686 11.027 4.35086 11.0738 4.499 11.1362C4.95513 11.3272 5.34304 11.6469 5.61789 12.0582C5.89079 12.4695 6.03699 12.9529 6.03699 13.4461C6.04478 13.7891 5.98046 14.1303 5.84791 14.446C5.72315 14.7482 5.53992 15.023 5.30796 15.255C5.07794 15.487 4.80114 15.6702 4.499 15.7949C4.18322 15.9275 3.84209 15.9918 3.49902 15.984C3.00585 15.986 2.52243 15.8398 2.11113 15.5649C1.69983 15.292 1.3782 14.9022 1.18912 14.446C1.00198 13.988 0.953253 13.485 1.04877 12.9997C1.14428 12.5143 1.38015 12.0679 1.72907 11.717C2.07799 11.374 2.51853 11.1381 2.99805 11.0367V5.94911C2.52048 5.8458 2.07994 5.61189 1.72907 5.26881C1.38015 4.91794 1.14428 4.47155 1.04877 3.98618C0.951304 3.50081 1.00004 2.99789 1.18912 2.53981C1.3782 2.08368 1.69983 1.69382 2.11113 1.42092C2.52048 1.14607 3.0039 0.999877 3.49902 0.999877C3.84014 0.99403 4.18127 1.05836 4.49705 1.18896C4.79919 1.31371 5.07404 1.49695 5.30601 1.72891C5.53797 1.96087 5.7212 2.23767 5.84596 2.53981C5.97851 2.8556 6.04284 3.19672 6.03504 3.5398C6.03699 4.03296 5.89079 4.51639 5.61594 4.92769ZM4.85962 12.7892C4.73097 12.5494 4.53994 12.3486 4.30797 12.2102C4.07601 12.0699 3.80896 11.9958 3.538 11.9997C3.24171 11.9997 2.95322 12.0855 2.70761 12.2492C2.46005 12.4168 2.26512 12.6527 2.14816 12.9295C2.03706 13.2024 2.00977 13.5006 2.06824 13.7891C2.12477 14.0796 2.26707 14.3486 2.47759 14.5591C2.68812 14.7696 2.95517 14.9119 3.24756 14.9685C3.53606 15.0269 3.8343 14.9996 4.1072 14.8885C4.38399 14.7716 4.61986 14.5766 4.7875 14.3291C4.93759 14.103 5.02336 13.8398 5.037 13.5689C5.0487 13.2979 4.98827 13.0289 4.85962 12.7892ZM2.70761 4.74056C2.95517 4.90235 3.24366 4.99006 3.538 4.99006C3.80896 4.99006 4.07601 4.91599 4.30797 4.77954C4.53994 4.63919 4.73097 4.44037 4.85962 4.2006C4.98827 3.96084 5.05065 3.69184 5.037 3.42089C5.02336 3.14994 4.93759 2.88679 4.7875 2.66067C4.61986 2.41311 4.38399 2.21818 4.1072 2.10122C3.8343 1.99011 3.53606 1.96282 3.24756 2.0213C2.95712 2.07783 2.68812 2.22013 2.47759 2.43065C2.26707 2.64118 2.12477 2.90823 2.06824 3.20062C2.00977 3.48911 2.03706 3.78735 2.14816 4.06025C2.26512 4.33705 2.46005 4.57292 2.70761 4.74056ZM13.0368 11.0368C13.5164 11.1342 13.9588 11.372 14.3058 11.7171C14.7717 12.1868 15.0348 12.8243 15.0309 13.4831C15.0329 13.9763 14.8867 14.4597 14.6119 14.871C14.339 15.2823 13.9491 15.6039 13.493 15.793C13.0368 15.984 12.532 16.0347 12.0466 15.9392C11.5612 15.8437 11.1148 15.6059 10.764 15.255C10.415 14.9041 10.1753 14.4578 10.0798 13.9724C9.98425 13.487 10.0349 12.9841 10.226 12.526C10.4189 12.0738 10.7386 11.6839 11.146 11.4071C11.4131 11.2239 11.7172 11.0991 12.0349 11.0368V7.4891H13.0368V11.0368ZM13.5943 14.5455C13.8399 14.3018 13.992 13.9802 14.0271 13.6352C14.0622 13.2921 13.9764 12.9451 13.7854 12.6566C13.6177 12.4091 13.3819 12.2141 13.1051 12.0972C12.8322 11.9861 12.5339 11.9588 12.2454 12.0173C11.955 12.0738 11.686 12.2161 11.4755 12.4266C11.2649 12.6371 11.1226 12.9042 11.0661 13.1966C11.0076 13.4851 11.0349 13.7833 11.146 14.0562C11.263 14.333 11.4579 14.5689 11.7055 14.7365C11.994 14.9275 12.339 15.0133 12.684 14.9782C13.0271 14.9431 13.3507 14.7911 13.5943 14.5455Z"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M11.6876 3.40036L10 5.088L10.7071 5.7951L12.3947 4.10747L14.0824 5.7951L14.7895 5.088L13.1019 3.40036L14.7895 1.71272L14.0824 1.00562L12.3947 2.69325L10.7071 1.00562L10 1.71272L11.6876 3.40036Z"></path></svg>'},3344:R=>{R.exports='<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M4.49705 5.8497C4.95319 5.66062 5.34304 5.33899 5.61594 4.92769C5.89079 4.51639 6.03699 4.03296 6.03504 3.5398C6.04284 3.19672 5.97851 2.8556 5.84596 2.53981C5.7212 2.23767 5.53797 1.96087 5.30601 1.72891C5.07404 1.49695 4.79919 1.31371 4.49705 1.18896C4.18127 1.05836 3.84014 0.99403 3.49902 0.999877C3.0039 0.999877 2.52048 1.14607 2.11113 1.42092C1.69983 1.69382 1.3782 2.08368 1.18912 2.53981C1.00004 2.99789 0.951304 3.50081 1.04877 3.98618C1.14428 4.47155 1.38015 4.91794 1.72907 5.26881C2.07994 5.61189 2.52048 5.8458 2.99805 5.94911V11.0367C2.51853 11.1381 2.07799 11.374 1.72907 11.717C1.38015 12.0679 1.14428 12.5143 1.04877 12.9997C0.953253 13.485 1.00198 13.988 1.18912 14.446C1.3782 14.9022 1.69983 15.292 2.11113 15.5649C2.52243 15.8398 3.00585 15.986 3.49902 15.984C3.84209 15.9918 4.18322 15.9275 4.499 15.7949C4.80114 15.6702 5.07794 15.487 5.30796 15.255C5.53992 15.023 5.72315 14.7482 5.84791 14.446C5.98046 14.1303 6.04478 13.7891 6.03699 13.4461C6.03699 12.9529 5.89079 12.4695 5.61789 12.0582C5.34304 11.6469 4.95513 11.3272 4.499 11.1362C4.35086 11.0738 4.19686 11.027 4.03897 10.9958V5.9881C4.03897 5.9881 4.34891 5.91013 4.49705 5.8497ZM4.30797 12.2102C4.53994 12.3486 4.73097 12.5494 4.85962 12.7892C4.98827 13.0289 5.0487 13.2979 5.037 13.5689C5.02336 13.8398 4.93759 14.103 4.7875 14.3291C4.61986 14.5766 4.38399 14.7716 4.1072 14.8885C3.8343 14.9996 3.53606 15.0269 3.24756 14.9685C2.95517 14.9119 2.68812 14.7696 2.47759 14.5591C2.26707 14.3486 2.12477 14.0796 2.06824 13.7891C2.00977 13.5006 2.03706 13.2024 2.14816 12.9295C2.26512 12.6527 2.46005 12.4168 2.70761 12.2492C2.95322 12.0855 3.24171 11.9997 3.538 11.9997C3.80896 11.9958 4.07601 12.0699 4.30797 12.2102ZM3.538 4.99006C3.24366 4.99006 2.95517 4.90235 2.70761 4.74056C2.46005 4.57292 2.26512 4.33705 2.14816 4.06025C2.03706 3.78735 2.00977 3.48911 2.06824 3.20062C2.12477 2.90823 2.26707 2.64118 2.47759 2.43065C2.68812 2.22013 2.95712 2.07783 3.24756 2.0213C3.53606 1.96282 3.8343 1.99011 4.1072 2.10122C4.38399 2.21818 4.61986 2.41311 4.7875 2.66067C4.93759 2.88679 5.02336 3.14994 5.037 3.42089C5.05065 3.69184 4.98827 3.96084 4.85962 4.2006C4.73097 4.44037 4.53994 4.63919 4.30797 4.77954C4.07601 4.91599 3.80896 4.99006 3.538 4.99006Z"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M15.0543 13.5C15.0543 14.8807 13.935 16 12.5543 16C11.1736 16 10.0543 14.8807 10.0543 13.5C10.0543 12.1193 11.1736 11 12.5543 11C13.935 11 15.0543 12.1193 15.0543 13.5ZM12.5543 15C13.3827 15 14.0543 14.3284 14.0543 13.5C14.0543 12.6716 13.3827 12 12.5543 12C11.7258 12 11.0543 12.6716 11.0543 13.5C11.0543 14.3284 11.7258 15 12.5543 15Z"></path><circle cx="12.5543" cy="7.75073" r="1"></circle><circle cx="12.5543" cy="3.50146" r="1"></circle></svg>'},9649:R=>{R.exports='<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.14648 6.3065L6.16649 2.2865L6.87359 2.2865L10.8936 6.3065L10.1865 7.0136L6.97998 3.8071L6.97998 5.69005C6.97998 8.50321 7.58488 10.295 8.70856 11.3953C9.83407 12.4974 11.5857 13.0101 14.13 13.0101L14.48 13.0101L14.48 14.0101L14.13 14.0101C11.4843 14.0101 9.4109 13.4827 8.00891 12.1098C6.60509 10.7351 5.97998 8.61689 5.97998 5.69005L5.97998 3.88722L2.85359 7.01361L2.14648 6.3065Z" fill="#C5C5C5"></path></svg>'},8923:R=>{R.exports='<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.7099 1.29L13.7099 4.29L13.9999 5V14L12.9999 15H3.99994L2.99994 14V2L3.99994 1H9.99994L10.7099 1.29ZM3.99994 14H12.9999V5L9.99994 2H3.99994V14ZM8 6H6V7H8V9H9V7H11V6H9V4H8V6ZM6 11H11V12H6V11Z"></path></svg>'},6855:R=>{R.exports='<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.54883 10.0781C8.00911 10.2604 8.42839 10.502 8.80664 10.8027C9.1849 11.1035 9.50846 11.4521 9.77734 11.8486C10.0462 12.2451 10.2536 12.6712 10.3994 13.127C10.5452 13.5827 10.6204 14.0612 10.625 14.5625V15H9.75V14.5625C9.75 14.0202 9.64746 13.5098 9.44238 13.0312C9.2373 12.5527 8.95475 12.1357 8.59473 11.7803C8.2347 11.4248 7.81771 11.1445 7.34375 10.9395C6.86979 10.7344 6.35938 10.6296 5.8125 10.625C5.27018 10.625 4.75977 10.7275 4.28125 10.9326C3.80273 11.1377 3.38574 11.4202 3.03027 11.7803C2.6748 12.1403 2.39453 12.5573 2.18945 13.0312C1.98438 13.5052 1.87956 14.0156 1.875 14.5625V15H1V14.5625C1 14.0658 1.07292 13.5872 1.21875 13.127C1.36458 12.6667 1.57422 12.2406 1.84766 11.8486C2.12109 11.4567 2.44466 11.1104 2.81836 10.8096C3.19206 10.5088 3.61133 10.265 4.07617 10.0781C3.87109 9.93685 3.68652 9.77279 3.52246 9.58594C3.3584 9.39909 3.2194 9.19857 3.10547 8.98438C2.99154 8.77018 2.90495 8.54232 2.8457 8.30078C2.78646 8.05924 2.75456 7.81315 2.75 7.5625C2.75 7.13867 2.82975 6.74219 2.98926 6.37305C3.14876 6.00391 3.36751 5.68034 3.64551 5.40234C3.9235 5.12435 4.24707 4.9056 4.61621 4.74609C4.98535 4.58659 5.38411 4.50456 5.8125 4.5C6.23633 4.5 6.63281 4.57975 7.00195 4.73926C7.37109 4.89876 7.69466 5.11751 7.97266 5.39551C8.25065 5.6735 8.4694 5.99707 8.62891 6.36621C8.78841 6.73535 8.87044 7.13411 8.875 7.5625C8.875 7.81315 8.84538 8.05697 8.78613 8.29395C8.72689 8.53092 8.63802 8.75879 8.51953 8.97754C8.40104 9.19629 8.26204 9.39909 8.10254 9.58594C7.94303 9.77279 7.75846 9.93685 7.54883 10.0781ZM5.8125 9.75C6.11328 9.75 6.39583 9.69303 6.66016 9.5791C6.92448 9.46517 7.15462 9.31022 7.35059 9.11426C7.54655 8.91829 7.70378 8.68587 7.82227 8.41699C7.94076 8.14811 8 7.86328 8 7.5625C8 7.26172 7.94303 6.97917 7.8291 6.71484C7.71517 6.45052 7.55794 6.22038 7.35742 6.02441C7.1569 5.82845 6.92448 5.67122 6.66016 5.55273C6.39583 5.43424 6.11328 5.375 5.8125 5.375C5.51172 5.375 5.22917 5.43197 4.96484 5.5459C4.70052 5.65983 4.4681 5.81706 4.26758 6.01758C4.06706 6.2181 3.90983 6.45052 3.7959 6.71484C3.68197 6.97917 3.625 7.26172 3.625 7.5625C3.625 7.86328 3.68197 8.14583 3.7959 8.41016C3.90983 8.67448 4.06478 8.9069 4.26074 9.10742C4.45671 9.30794 4.68913 9.46517 4.95801 9.5791C5.22689 9.69303 5.51172 9.75 5.8125 9.75ZM15 1V8H13.25L10.625 10.625V8H9.75V7.125H11.5V8.5127L12.8877 7.125H14.125V1.875H5.375V3.44727C5.22917 3.46549 5.08333 3.48828 4.9375 3.51562C4.79167 3.54297 4.64583 3.58398 4.5 3.63867V1H15Z" fill="#C5C5C5"></path></svg>'},5493:R=>{R.exports='<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.12 4.37333L8.58667 1.97333H7.41333L6.88 4.37333L6.18667 4.69333L4.21333 3.41333L3.30667 4.21333L4.58667 6.18667L4.42667 6.88L2.02667 7.41333V8.58667L4.42667 9.12L4.69333 9.92L3.41333 11.8933L4.21333 12.6933L6.18667 11.4133L6.98667 11.68L7.41333 13.9733H8.58667L9.12 11.5733L9.92 11.3067L11.8933 12.5867L12.6933 11.7867L11.4133 9.81333L11.68 9.01333L14.0267 8.58667V7.41333L11.6267 6.88L11.3067 6.08L12.5867 4.10667L11.7867 3.30667L9.81333 4.58667L9.12 4.37333ZM9.38667 1.01333L9.92 3.41333L12 2.08L14.0267 4.10667L12.5867 6.18667L14.9867 6.61333V9.38667L12.5867 9.92L14.0267 12L12 13.9733L9.92 12.5867L9.38667 14.9867H6.61333L6.08 12.5867L4 13.92L2.02667 11.8933L3.41333 9.81333L1.01333 9.38667V6.61333L3.41333 6.08L2.08 4L4.10667 1.97333L6.18667 3.41333L6.61333 1.01333H9.38667ZM10.0267 8C10.0267 8.53333 9.81333 8.99556 9.38667 9.38667C8.99556 9.77778 8.53333 9.97333 8 9.97333C7.46667 9.97333 7.00444 9.77778 6.61333 9.38667C6.22222 8.99556 6.02667 8.53333 6.02667 8C6.02667 7.46667 6.22222 7.00444 6.61333 6.61333C7.00444 6.18667 7.46667 5.97333 8 5.97333C8.53333 5.97333 8.99556 6.18667 9.38667 6.61333C9.81333 7.00444 10.0267 7.46667 10.0267 8ZM8 9.01333C8.28444 9.01333 8.51556 8.92444 8.69333 8.74667C8.90667 8.53333 9.01333 8.28444 9.01333 8C9.01333 7.71556 8.90667 7.48444 8.69333 7.30667C8.51556 7.09333 8.28444 6.98667 8 6.98667C7.71556 6.98667 7.46667 7.09333 7.25333 7.30667C7.07556 7.48444 6.98667 7.71556 6.98667 8C6.98667 8.28444 7.07556 8.53333 7.25333 8.74667C7.46667 8.92444 7.71556 9.01333 8 9.01333Z" fill="#CCCCCC"></path></svg>'},1779:R=>{R.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M17.28 7.78a.75.75 0 00-1.06-1.06l-9.5 9.5a.75.75 0 101.06 1.06l9.5-9.5z"></path><path fill-rule="evenodd" d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zM2.5 12a9.5 9.5 0 1119 0 9.5 9.5 0 01-19 0z"></path></svg>'},596:R=>{R.exports='<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M5.39804 10.8069C5.57428 10.9312 5.78476 10.9977 6.00043 10.9973C6.21633 10.9975 6.42686 10.93 6.60243 10.8043C6.77993 10.6739 6.91464 10.4936 6.98943 10.2863L7.43643 8.91335C7.55086 8.56906 7.74391 8.25615 8.00028 7.99943C8.25665 7.74272 8.56929 7.54924 8.91343 7.43435L10.3044 6.98335C10.4564 6.92899 10.5936 6.84019 10.7055 6.7239C10.8174 6.60762 10.9008 6.467 10.9492 6.31308C10.9977 6.15916 11.0098 5.99611 10.9847 5.83672C10.9596 5.67732 10.8979 5.52591 10.8044 5.39435C10.6703 5.20842 10.4794 5.07118 10.2604 5.00335L8.88543 4.55635C8.54091 4.44212 8.22777 4.24915 7.97087 3.99277C7.71396 3.73638 7.52035 3.42363 7.40543 3.07935L6.95343 1.69135C6.88113 1.48904 6.74761 1.31428 6.57143 1.19135C6.43877 1.09762 6.28607 1.03614 6.12548 1.01179C5.96489 0.987448 5.80083 1.00091 5.64636 1.05111C5.49188 1.1013 5.35125 1.18685 5.23564 1.30095C5.12004 1.41505 5.03265 1.55454 4.98043 1.70835L4.52343 3.10835C4.40884 3.44317 4.21967 3.74758 3.97022 3.9986C3.72076 4.24962 3.41753 4.44067 3.08343 4.55735L1.69243 5.00535C1.54065 5.05974 1.40352 5.14852 1.29177 5.26474C1.18001 5.38095 1.09666 5.52145 1.04824 5.67523C0.999819 5.82902 0.987639 5.99192 1.01265 6.1512C1.03767 6.31048 1.0992 6.46181 1.19243 6.59335C1.32027 6.7728 1.50105 6.90777 1.70943 6.97935L3.08343 7.42435C3.52354 7.57083 3.90999 7.84518 4.19343 8.21235C4.35585 8.42298 4.4813 8.65968 4.56443 8.91235L5.01643 10.3033C5.08846 10.5066 5.22179 10.6826 5.39804 10.8069ZM5.48343 3.39235L6.01043 2.01535L6.44943 3.39235C6.61312 3.8855 6.88991 4.33351 7.25767 4.70058C7.62544 5.06765 8.07397 5.34359 8.56743 5.50635L9.97343 6.03535L8.59143 6.48335C8.09866 6.64764 7.65095 6.92451 7.28382 7.29198C6.9167 7.65945 6.64026 8.10742 6.47643 8.60035L5.95343 9.97835L5.50443 8.59935C5.34335 8.10608 5.06943 7.65718 4.70443 7.28835C4.3356 6.92031 3.88653 6.64272 3.39243 6.47735L2.01443 5.95535L3.40043 5.50535C3.88672 5.33672 4.32775 5.05855 4.68943 4.69235C5.04901 4.32464 5.32049 3.88016 5.48343 3.39235ZM11.5353 14.8494C11.6713 14.9456 11.8337 14.9973 12.0003 14.9974C12.1654 14.9974 12.3264 14.9464 12.4613 14.8514C12.6008 14.7529 12.7058 14.6129 12.7613 14.4514L13.0093 13.6894C13.0625 13.5309 13.1515 13.3869 13.2693 13.2684C13.3867 13.1498 13.5307 13.0611 13.6893 13.0094L14.4613 12.7574C14.619 12.7029 14.7557 12.6004 14.8523 12.4644C14.9257 12.3614 14.9736 12.2424 14.9921 12.1173C15.0106 11.9922 14.9992 11.8645 14.9588 11.7447C14.9184 11.6249 14.8501 11.5163 14.7597 11.428C14.6692 11.3396 14.5591 11.2739 14.4383 11.2364L13.6743 10.9874C13.5162 10.9348 13.3724 10.8462 13.2544 10.7285C13.1364 10.6109 13.0473 10.4674 12.9943 10.3094L12.7423 9.53638C12.6886 9.37853 12.586 9.24191 12.4493 9.14638C12.3473 9.07343 12.2295 9.02549 12.1056 9.00642C11.9816 8.98736 11.8549 8.99772 11.7357 9.03665C11.6164 9.07558 11.508 9.142 11.4192 9.23054C11.3304 9.31909 11.2636 9.42727 11.2243 9.54638L10.9773 10.3084C10.925 10.466 10.8375 10.6097 10.7213 10.7284C10.6066 10.8449 10.4667 10.9335 10.3123 10.9874L9.53931 11.2394C9.38025 11.2933 9.2422 11.3959 9.1447 11.5326C9.04721 11.6694 8.99522 11.8333 8.99611 12.0013C8.99699 12.1692 9.0507 12.3326 9.14963 12.4683C9.24856 12.604 9.38769 12.7051 9.54731 12.7574L10.3103 13.0044C10.4692 13.0578 10.6136 13.1471 10.7323 13.2654C10.8505 13.3836 10.939 13.5283 10.9903 13.6874L11.2433 14.4614C11.2981 14.6178 11.4001 14.7534 11.5353 14.8494ZM10.6223 12.0564L10.4433 11.9974L10.6273 11.9334C10.9291 11.8284 11.2027 11.6556 11.4273 11.4284C11.6537 11.1994 11.8248 10.9216 11.9273 10.6164L11.9853 10.4384L12.0443 10.6194C12.1463 10.9261 12.3185 11.2047 12.5471 11.4332C12.7757 11.6617 13.0545 11.8336 13.3613 11.9354L13.5563 11.9984L13.3763 12.0574C13.0689 12.1596 12.7898 12.3322 12.5611 12.5616C12.3324 12.791 12.1606 13.0707 12.0593 13.3784L12.0003 13.5594L11.9423 13.3784C11.8409 13.0702 11.6687 12.7901 11.4394 12.5605C11.2102 12.3309 10.9303 12.1583 10.6223 12.0564Z"></path></svg>'},3027:R=>{R.exports='<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M6 6h4v4H6z"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M8.6 1c1.6.1 3.1.9 4.2 2 1.3 1.4 2 3.1 2 5.1 0 1.6-.6 3.1-1.6 4.4-1 1.2-2.4 2.1-4 2.4-1.6.3-3.2.1-4.6-.7-1.4-.8-2.5-2-3.1-3.5C.9 9.2.8 7.5 1.3 6c.5-1.6 1.4-2.9 2.8-3.8C5.4 1.3 7 .9 8.6 1zm.5 12.9c1.3-.3 2.5-1 3.4-2.1.8-1.1 1.3-2.4 1.2-3.8 0-1.6-.6-3.2-1.7-4.3-1-1-2.2-1.6-3.6-1.7-1.3-.1-2.7.2-3.8 1-1.1.8-1.9 1.9-2.3 3.3-.4 1.3-.4 2.7.2 4 .6 1.3 1.5 2.3 2.7 3 1.2.7 2.6.9 3.9.6z"></path></svg>'},7411:R=>{R.exports='<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.006 8.267L.78 9.5 0 8.73l2.09-2.07.76.01 2.09 2.12-.76.76-1.167-1.18a5 5 0 0 0 9.4 1.983l.813.597a6 6 0 0 1-11.22-2.683zm10.99-.466L11.76 6.55l-.76.76 2.09 2.11.76.01 2.09-2.07-.75-.76-1.194 1.18a6 6 0 0 0-11.11-2.92l.81.594a5 5 0 0 1 9.3 2.346z"></path></svg>'},5013:R=>{R.exports='<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.57 6.699l5.693-4.936L8.585 1 3.273 5.596l-1.51-1.832L1 4.442l1.85 2.214.72.043zM15 5H6.824l2.307-2H15v2zM6 7h9v2H6V7zm9 4H6v2h9v-2z"></path></svg>'}},Ko={};function fe(R){var M=Ko[R];if(M!==void 0)return M.exports;var ee=Ko[R]={id:R,exports:{}};return Al[R].call(ee.exports,ee,ee.exports,fe),ee.exports}o(fe,"__webpack_require__"),fe.n=R=>{var M=R&&R.__esModule?()=>R.default:()=>R;return fe.d(M,{a:M}),M},fe.d=(R,M)=>{for(var ee in M)fe.o(M,ee)&&!fe.o(R,ee)&&Object.defineProperty(R,ee,{enumerable:!0,get:M[ee]})},fe.o=(R,M)=>Object.prototype.hasOwnProperty.call(R,M),fe.nc=void 0;var lc={};(()=>{"use strict";var Ut;var R=fe(5072),M=fe.n(R),ee=fe(2410),oe={};oe.insert="head",oe.singleton=!1;var le=M()(ee.A,oe);const I=ee.A.locals||{};var C=fe(3554),v={};v.insert="head",v.singleton=!1;var H=M()(C.A,v);const z=C.A.locals||{};var q=fe(7334),l=fe(6540),se=fe(961),J=(i=>(i[i.Committed=0]="Committed",i[i.Mentioned=1]="Mentioned",i[i.Subscribed=2]="Subscribed",i[i.Commented=3]="Commented",i[i.Reviewed=4]="Reviewed",i[i.NewCommitsSinceReview=5]="NewCommitsSinceReview",i[i.Labeled=6]="Labeled",i[i.Milestoned=7]="Milestoned",i[i.Assigned=8]="Assigned",i[i.Unassigned=9]="Unassigned",i[i.HeadRefDeleted=10]="HeadRefDeleted",i[i.Merged=11]="Merged",i[i.CrossReferenced=12]="CrossReferenced",i[i.Closed=13]="Closed",i[i.Reopened=14]="Reopened",i[i.CopilotStarted=15]="CopilotStarted",i[i.CopilotFinished=16]="CopilotFinished",i[i.Other=17]="Other",i))(J||{}),Pe=Object.defineProperty,Oe=o((i,a,u)=>a in i?Pe(i,a,{enumerable:!0,configurable:!0,writable:!0,value:u}):i[a]=u,"__defNormalProp"),$=o((i,a,u)=>Oe(i,typeof a!="symbol"?a+"":a,u),"__publicField");const K=acquireVsCodeApi(),ln=class ln{constructor(a){$(this,"_commandHandler"),$(this,"lastSentReq"),$(this,"pendingReplies"),this._commandHandler=a,this.lastSentReq=0,this.pendingReplies=Object.create(null),window.addEventListener("message",this.handleMessage.bind(this))}registerCommandHandler(a){this._commandHandler=a}async postMessage(a){const u=String(++this.lastSentReq);return new Promise((d,m)=>{this.pendingReplies[u]={resolve:d,reject:m},a=Object.assign(a,{req:u}),K.postMessage(a)})}handleMessage(a){const u=a.data;if(u.seq){const d=this.pendingReplies[u.seq];if(d){u.err?d.reject(u.err):d.resolve(u.res);return}}this._commandHandler&&this._commandHandler(u.res)}};o(ln,"MessageHandler");let me=ln;function P(i){return new me(i)}o(P,"getMessageHandler");function _(){return K.getState()}o(_,"getState");function S(i){const a=_();a&&a.number&&a.number===i.number&&(i.pendingCommentText=a.pendingCommentText),i&&K.setState(i)}o(S,"setState");function Z(i){const a=K.getState();K.setState(Object.assign(a,i))}o(Z,"updateState");var te=Object.defineProperty,V=o((i,a,u)=>a in i?te(i,a,{enumerable:!0,configurable:!0,writable:!0,value:u}):i[a]=u,"context_defNormalProp"),k=o((i,a,u)=>V(i,typeof a!="symbol"?a+"":a,u),"context_publicField");const A=(Ut=class{constructor(a=_(),u=null,d=null){this.pr=a,this.onchange=u,this._handler=d,k(this,"setTitle",async m=>{const p=await this.postMessage({command:"pr.edit-title",args:{text:m}});this.updatePR({titleHTML:p.titleHTML})}),k(this,"setDescription",m=>this.postMessage({command:"pr.edit-description",args:{text:m}})),k(this,"checkout",()=>this.postMessage({command:"pr.checkout"})),k(this,"copyPrLink",()=>this.postMessage({command:"pr.copy-prlink"})),k(this,"copyVscodeDevLink",()=>this.postMessage({command:"pr.copy-vscodedevlink"})),k(this,"exitReviewMode",async()=>{if(this.pr)return this.postMessage({command:"pr.checkout-default-branch",args:this.pr.repositoryDefaultBranch})}),k(this,"gotoChangesSinceReview",()=>this.postMessage({command:"pr.gotoChangesSinceReview"})),k(this,"refresh",()=>this.postMessage({command:"pr.refresh"})),k(this,"checkMergeability",()=>this.postMessage({command:"pr.checkMergeability"})),k(this,"changeEmail",async m=>{const p=await this.postMessage({command:"pr.change-email",args:m});this.updatePR({emailForCommit:p})}),k(this,"merge",async m=>await this.postMessage({command:"pr.merge",args:m})),k(this,"openOnGitHub",()=>this.postMessage({command:"pr.openOnGitHub"})),k(this,"deleteBranch",()=>this.postMessage({command:"pr.deleteBranch"})),k(this,"revert",async()=>{this.updatePR({busy:!0});const m=await this.postMessage({command:"pr.revert"});this.updatePR({busy:!1,...m})}),k(this,"readyForReview",()=>this.postMessage({command:"pr.readyForReview"})),k(this,"addReviewers",()=>this.postMessage({command:"pr.change-reviewers"})),k(this,"changeProjects",()=>this.postMessage({command:"pr.change-projects"})),k(this,"removeProject",m=>this.postMessage({command:"pr.remove-project",args:m})),k(this,"addMilestone",()=>this.postMessage({command:"pr.add-milestone"})),k(this,"removeMilestone",()=>this.postMessage({command:"pr.remove-milestone"})),k(this,"addAssignees",()=>this.postMessage({command:"pr.change-assignees"})),k(this,"addAssigneeYourself",()=>this.postMessage({command:"pr.add-assignee-yourself"})),k(this,"addAssigneeCopilot",()=>this.postMessage({command:"pr.add-assignee-copilot"})),k(this,"addLabels",()=>this.postMessage({command:"pr.add-labels"})),k(this,"create",()=>this.postMessage({command:"pr.open-create"})),k(this,"deleteComment",async m=>{await this.postMessage({command:"pr.delete-comment",args:m});const{pr:p}=this,{id:g,pullRequestReviewId:y}=m;if(!y){this.updatePR({events:p.events.filter(Q=>Q.id!==g)});return}const E=p.events.findIndex(Q=>Q.id===y);if(E===-1){console.error("Could not find review:",y);return}const O=p.events[E];if(!O.comments){console.error("No comments to delete for review:",y,O);return}this.pr.events.splice(E,1,{...O,comments:O.comments.filter(Q=>Q.id!==g)}),this.updatePR(this.pr)}),k(this,"editComment",m=>this.postMessage({command:"pr.edit-comment",args:m})),k(this,"updateDraft",(m,p)=>{const y=_().pendingCommentDrafts||Object.create(null);p!==y[m]&&(y[m]=p,this.updatePR({pendingCommentDrafts:y}))}),k(this,"requestChanges",m=>this.submitReviewCommand("pr.request-changes",m)),k(this,"approve",m=>this.submitReviewCommand("pr.approve",m)),k(this,"submit",m=>this.submitReviewCommand("pr.submit",m)),k(this,"close",async m=>{try{const p=await this.postMessage({command:"pr.close",args:m});let g=[...this.pr.events];p.commentEvent&&g.push(p.commentEvent),p.closeEvent&&g.push(p.closeEvent),this.updatePR({events:g,pendingCommentText:"",state:p.state})}catch{}}),k(this,"removeLabel",async m=>{await this.postMessage({command:"pr.remove-label",args:m});const p=this.pr.labels.filter(g=>g.name!==m);this.updatePR({labels:p})}),k(this,"applyPatch",async m=>{this.postMessage({command:"pr.apply-patch",args:{comment:m}})}),k(this,"reRequestReview",async m=>{const{reviewers:p}=await this.postMessage({command:"pr.re-request-review",args:m}),g=this.pr;g.reviewers=p,this.updatePR(g)}),k(this,"updateBranch",async()=>{var m,p;const g=await this.postMessage({command:"pr.update-branch"}),y=this.pr;y.events=(m=g.events)!=null?m:y.events,y.mergeable=(p=g.mergeable)!=null?p:y.mergeable,this.updatePR(y)}),k(this,"dequeue",async()=>{const m=await this.postMessage({command:"pr.dequeue"}),p=this.pr;m&&(p.mergeQueueEntry=void 0),this.updatePR(p)}),k(this,"enqueue",async()=>{const m=await this.postMessage({command:"pr.enqueue"}),p=this.pr;m.mergeQueueEntry&&(p.mergeQueueEntry=m.mergeQueueEntry),this.updatePR(p)}),k(this,"openDiff",m=>this.postMessage({command:"pr.open-diff",args:{comment:m}})),k(this,"toggleResolveComment",(m,p,g)=>{this.postMessage({command:"pr.resolve-comment-thread",args:{threadId:m,toResolve:g,thread:p}}).then(y=>{y?this.updatePR({events:y}):this.refresh()})}),k(this,"setPR",m=>(this.pr=m,S(this.pr),this.onchange&&this.onchange(this.pr),this)),k(this,"updatePR",m=>(Z(m),this.pr={...this.pr,...m},this.onchange&&this.onchange(this.pr),this)),k(this,"handleMessage",m=>{var p;switch(m.command){case"pr.initialize":return this.setPR(m.pullrequest);case"update-state":return this.updatePR({state:m.state});case"pr.update-checkout-status":return this.updatePR({isCurrentlyCheckedOut:m.isCurrentlyCheckedOut});case"pr.deleteBranch":const g={};return m.branchTypes&&m.branchTypes.map(E=>{E==="local"?g.isLocalHeadDeleted=!0:(E==="remote"||E==="upstream")&&(g.isRemoteHeadDeleted=!0)}),this.updatePR(g);case"pr.enable-exit":return this.updatePR({isCurrentlyCheckedOut:!0});case"set-scroll":window.scrollTo(m.scrollPosition.x,m.scrollPosition.y);return;case"pr.scrollToPendingReview":const y=(p=document.getElementById("pending-review"))!=null?p:document.getElementById("comment-textarea");y&&(y.scrollIntoView(),y.focus());return;case"pr.submitting-review":return this.updatePR({busy:!0,lastReviewType:m.lastReviewType});case"pr.append-review":return this.appendReview(m)}}),d||(this._handler=P(this.handleMessage))}async submitReviewCommand(a,u){try{const d=await this.postMessage({command:a,args:u});return this.appendReview(d)}catch{return this.updatePR({busy:!1})}}appendReview(a){const{event:u,reviewers:d}=a,m=this.pr;if(m.busy=!1,!u){this.updatePR(m);return}m.events.filter(g=>{var y;return g.event!==J.Reviewed||((y=g.state)==null?void 0:y.toLowerCase())!=="pending"}).forEach(g=>{g.event===J.Reviewed&&g.comments.forEach(y=>y.isDraft=!1)}),d&&(m.reviewers=d),m.events=[...m.events.filter(g=>g.event===J.Reviewed?g.state!=="PENDING":g),u],u.event===J.Reviewed&&(m.currentUserReviewState=u.state),m.pendingCommentText="",m.pendingReviewType=void 0,this.updatePR(m)}async updateAutoMerge({autoMerge:a,autoMergeMethod:u}){const d=await this.postMessage({command:"pr.update-automerge",args:{autoMerge:a,autoMergeMethod:u}}),m=this.pr;m.autoMerge=d.autoMerge,m.autoMergeMethod=d.autoMergeMethod,this.updatePR(m)}postMessage(a){var u,d;return(d=(u=this._handler)==null?void 0:u.postMessage(a))!=null?d:Promise.resolve(void 0)}},o(Ut,"_PRContext"),Ut);k(A,"instance",new A);let ie=A;const U=(0,l.createContext)(ie.instance);var ge=(i=>(i[i.Query=0]="Query",i[i.All=1]="All",i[i.LocalPullRequest=2]="LocalPullRequest",i))(ge||{}),ve=(i=>(i.Approve="APPROVE",i.RequestChanges="REQUEST_CHANGES",i.Comment="COMMENT",i))(ve||{}),de=(i=>(i.Open="OPEN",i.Merged="MERGED",i.Closed="CLOSED",i))(de||{}),Ce=(i=>(i[i.Mergeable=0]="Mergeable",i[i.NotMergeable=1]="NotMergeable",i[i.Conflict=2]="Conflict",i[i.Unknown=3]="Unknown",i[i.Behind=4]="Behind",i))(Ce||{}),Ne=(i=>(i[i.AwaitingChecks=0]="AwaitingChecks",i[i.Locked=1]="Locked",i[i.Mergeable=2]="Mergeable",i[i.Queued=3]="Queued",i[i.Unmergeable=4]="Unmergeable",i))(Ne||{}),Be=(i=>(i.User="User",i.Organization="Organization",i.Mannequin="Mannequin",i.Bot="Bot",i))(Be||{});function Ue(i){switch(i){case"Organization":return"Organization";case"Mannequin":return"Mannequin";case"Bot":return"Bot";default:return"User"}}o(Ue,"toAccountType");function Xe(i){var a;return tt(i)?i.id:(a=i.specialDisplayName)!=null?a:i.login}o(Xe,"reviewerId");function ot(i){var a,u,d;return tt(i)?(u=(a=i.name)!=null?a:i.slug)!=null?u:i.id:(d=i.specialDisplayName)!=null?d:i.login}o(ot,"reviewerLabel");function tt(i){return"org"in i}o(tt,"isTeam");function He(i){return"isAuthor"in i&&"isCommenter"in i}o(He,"isSuggestedReviewer");var F=(i=>(i.Issue="Issue",i.PullRequest="PullRequest",i))(F||{}),B=(i=>(i.Success="success",i.Failure="failure",i.Neutral="neutral",i.Pending="pending",i.Unknown="unknown",i))(B||{}),ne=(i=>(i.Comment="comment",i.Approve="approve",i.RequestChanges="requestChanges",i))(ne||{}),w=(i=>(i[i.None=0]="None",i[i.Available=1]="Available",i[i.ReviewedWithComments=2]="ReviewedWithComments",i[i.ReviewedWithoutComments=3]="ReviewedWithoutComments",i))(w||{});function D(i){var a,u;const d=(a=i.submittedAt)!=null?a:i.createdAt,m=d&&Date.now()-new Date(d).getTime()<1e3*60,p=(u=i.state)!=null?u:i.event===J.Commented?"COMMENTED":void 0;let g="";if(m)switch(p){case"APPROVED":g="Pull request approved";break;case"CHANGES_REQUESTED":g="Changes requested on pull request";break;case"COMMENTED":g="Commented on pull request";break}return g}o(D,"ariaAnnouncementForReview");var he=fe(7007);const ke=new he.EventEmitter;function we(i){const[a,u]=(0,l.useState)(i);return(0,l.useEffect)(()=>{a!==i&&u(i)},[i]),[a,u]}o(we,"useStateProp");const ae=o(({className:i="",src:a,title:u})=>l.createElement("span",{className:`icon ${i}`,title:u,dangerouslySetInnerHTML:{__html:a}}),"Icon"),mt=null,be=l.createElement(ae,{src:fe(1440)}),Te=l.createElement(ae,{src:fe(4894),className:"check"}),pt=l.createElement(ae,{src:fe(1779),className:"skip"}),jr=l.createElement(ae,{src:fe(407)}),yt=l.createElement(ae,{src:fe(650)}),lr=l.createElement(ae,{src:fe(2301)}),Il=l.createElement(ae,{src:fe(5771)}),ht=l.createElement(ae,{src:fe(7165)}),sr=l.createElement(ae,{src:fe(6279)}),Ft=l.createElement(ae,{src:fe(346)}),fn=l.createElement(ae,{src:fe(4370)}),Yo=l.createElement(ae,{src:fe(659)}),ar=l.createElement(ae,{src:fe(4268)}),Go=l.createElement(ae,{src:fe(3344)}),Xo=l.createElement(ae,{src:fe(3962)}),Hl=l.createElement(ae,{src:fe(5010)}),Pn=l.createElement(ae,{src:fe(9443),className:"pending"}),On=l.createElement(ae,{src:fe(8923)}),Xt=l.createElement(ae,{src:fe(5493)}),Lt=l.createElement(ae,{src:fe(5130),className:"close"}),Jo=l.createElement(ae,{src:fe(7411)}),Fl=l.createElement(ae,{src:fe(340)}),zl=l.createElement(ae,{src:fe(9649)}),ur=l.createElement(ae,{src:fe(2359)}),fa=l.createElement(ae,{src:fe(4439)}),zt=l.createElement(ae,{src:fe(6855)}),ei=l.createElement(ae,{src:fe(5064)}),Jt=l.createElement(ae,{src:fe(628)}),Vl=l.createElement(ae,{src:fe(459)}),ma=l.createElement(ae,{src:fe(596)}),Br=l.createElement(ae,{src:fe(3027)}),ti=l.createElement(ae,{src:fe(27)}),Ur=l.createElement(ae,{src:fe(4674)}),ni=l.createElement(ae,{src:fe(2158)}),ri=l.createElement(ae,{src:fe(3538)}),Wr=l.createElement(ae,{src:fe(5013)});function oi(){const[i,a]=(0,l.useState)([0,0]);return(0,l.useLayoutEffect)(()=>{function u(){a([window.innerWidth,window.innerHeight])}return o(u,"updateSize"),window.addEventListener("resize",u),u(),()=>window.removeEventListener("resize",u)},[]),i}o(oi,"useWindowSize");const qr=o(({optionsContext:i,defaultOptionLabel:a,defaultOptionValue:u,defaultAction:d,allOptions:m,optionsTitle:p,disabled:g,hasSingleAction:y})=>{const[E,O]=(0,l.useState)(!1),Q=o(W=>{W.target instanceof HTMLElement&&W.target.classList.contains("split-right")||O(!1)},"onHideAction");(0,l.useEffect)(()=>{const W=o(De=>Q(De),"onClickOrKey");E?(document.addEventListener("click",W),document.addEventListener("keydown",W)):(document.removeEventListener("click",W),document.removeEventListener("keydown",W))},[E,O]);const Y=(0,l.useRef)();return oi(),l.createElement("div",{className:"dropdown-container",ref:Y},Y.current&&Y.current.clientWidth>375&&m&&!y?m().map(({label:W,value:De,action:je})=>l.createElement("button",{className:"inlined-dropdown",key:De,title:W,disabled:g,onClick:je,value:De},W)):l.createElement("div",{className:"primary-split-button"},l.createElement("button",{className:"split-left",disabled:g,onClick:d,value:u(),title:a()},a()),l.createElement("div",{className:"split"}),y?null:l.createElement("button",{className:"split-right",title:p,disabled:g,"aria-expanded":E,onClick:o(W=>{W.preventDefault();const De=W.target.getBoundingClientRect(),je=De.left,ze=De.bottom;W.target.dispatchEvent(new MouseEvent("contextmenu",{bubbles:!0,clientX:je,clientY:ze})),W.stopPropagation()},"onClick"),onMouseDown:o(()=>O(!0),"onMouseDown"),onKeyDown:o(W=>{(W.key==="Enter"||W.key===" ")&&O(!0)},"onKeyDown"),"data-vscode-context":i()},yt)))},"contextDropdown_ContextDropdown"),Je="\xA0",Zr=o(({children:i})=>{const a=l.Children.count(i);return l.createElement(l.Fragment,{children:l.Children.map(i,(u,d)=>typeof u=="string"?`${d>0?Je:""}${u}${d<a-1&&typeof i[d+1]!="string"?Je:""}`:u)})},"Spaced");var Dn=fe(7975),Qr=fe(4353),An=fe.n(Qr),ii=fe(8660),li=fe.n(ii),si=fe(3581),ai=fe.n(si),Kr=Object.defineProperty,cr=o((i,a,u)=>a in i?Kr(i,a,{enumerable:!0,configurable:!0,writable:!0,value:u}):i[a]=u,"lifecycle_defNormalProp"),Yr=o((i,a,u)=>cr(i,typeof a!="symbol"?a+"":a,u),"lifecycle_publicField");function In(i){return{dispose:i}}o(In,"toDisposable");function Gr(i){return In(()=>en(i))}o(Gr,"lifecycle_combinedDisposable");function en(i){for(;i.length;){const a=i.pop();a==null||a.dispose()}}o(en,"disposeAll");function ui(i,a){return a.push(i),i}o(ui,"addDisposable");const Dr=class Dr{constructor(){Yr(this,"_isDisposed",!1),Yr(this,"_disposables",[])}dispose(){this._isDisposed||(this._isDisposed=!0,en(this._disposables),this._disposables=[])}_register(a){return this._isDisposed?a.dispose():this._disposables.push(a),a}get isDisposed(){return this._isDisposed}};o(Dr,"Disposable");let Xr=Dr;var dr=Object.defineProperty,ci=o((i,a,u)=>a in i?dr(i,a,{enumerable:!0,configurable:!0,writable:!0,value:u}):i[a]=u,"utils_defNormalProp"),We=o((i,a,u)=>ci(i,typeof a!="symbol"?a+"":a,u),"utils_publicField");An().extend(li(),{thresholds:[{l:"s",r:44,d:"second"},{l:"m",r:89},{l:"mm",r:44,d:"minute"},{l:"h",r:89},{l:"hh",r:21,d:"hour"},{l:"d",r:35},{l:"dd",r:6,d:"day"},{l:"w",r:7},{l:"ww",r:3,d:"week"},{l:"M",r:4},{l:"MM",r:10,d:"month"},{l:"y",r:17},{l:"yy",d:"year"}]}),An().extend(ai()),An().updateLocale("en",{relativeTime:{future:"in %s",past:"%s ago",s:"seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",w:"a week",ww:"%d weeks",M:"a month",MM:"%d months",y:"a year",yy:"%d years"}});function $l(i,a){const u=Object.create(null);return i.filter(d=>{const m=a(d);return u[m]?!1:(u[m]=!0,!0)})}o($l,"uniqBy");function jl(...i){return(a,u=null,d)=>{const m=combinedDisposable(i.map(p=>p(g=>a.call(u,g))));return d&&d.push(m),m}}o(jl,"anyEvent");function fr(i,a){return(u,d=null,m)=>i(p=>a(p)&&u.call(d,p),null,m)}o(fr,"filterEvent");function Bl(i){return(a,u=null,d)=>{const m=i(p=>(m.dispose(),a.call(u,p)),null,d);return m}}o(Bl,"onceEvent");function Jr(i){return/^[a-zA-Z]:\\/.test(i)}o(Jr,"isWindowsPath");function mn(i,a,u=sep){return i===a?!0:(i.charAt(i.length-1)!==u&&(i+=u),Jr(i)&&(i=i.toLowerCase(),a=a.toLowerCase()),a.startsWith(i))}o(mn,"isDescendant");function eo(i,a){return i.reduce((u,d)=>{const m=a(d);return u[m]=[...u[m]||[],d],u},Object.create(null))}o(eo,"groupBy");const To=class To extends Error{constructor(a){super(`Unreachable case: ${a}`)}};o(To,"UnreachableCaseError");let mr=To;function Ul(i){return!!i.errors}o(Ul,"isHookError");function di(i){let a=!0;if(i.errors&&Array.isArray(i.errors)){for(const u of i.errors)if(!u.field||!u.value||!u.status){a=!1;break}}else a=!1;return a}o(di,"hasFieldErrors");function Hn(i){if(!(i instanceof Error))return typeof i=="string"?i:i.gitErrorCode?`${i.message}. Please check git output for more details`:i.stderr?`${i.stderr}. Please check git output for more details`:"Error";let a=i.message,u;if(i.message==="Validation Failed"&&di(i))u=i.errors.map(d=>`Value "${d.value}" cannot be set for field ${d.field} (code: ${d.status})`).join(", ");else{if(i.message.startsWith("Validation Failed:"))return i.message;if(Ul(i)&&i.errors)return i.errors.map(d=>typeof d=="string"?d:d.message).join(", ")}return u&&(a=`${a}: ${u}`),a}o(Hn,"formatError");async function fi(i){return new Promise(a=>{const u=i(d=>{u.dispose(),a(d)})})}o(fi,"asPromise");async function pr(i,a){return Promise.race([i,new Promise(u=>{setTimeout(()=>u(void 0),a)})])}o(pr,"promiseWithTimeout");function mi(i){const a=An()(i),u=Date.now();return a.diff(u,"month"),a.diff(u,"month")<1?a.fromNow():a.diff(u,"year")<1?`on ${a.format("MMM D")}`:`on ${a.format("MMM D, YYYY")}`}o(mi,"dateFromNow");function pn(i,a,u=!1){i.startsWith("#")&&(i=i.substring(1));const d=to(i);if(a){const m=vr(d.r,d.g,d.b),p=.6,g=.18,y=.3,E=(d.r*.2126+d.g*.7152+d.b*.0722)/255,O=Math.max(0,Math.min((E-p)*-1e3,1)),Q=(p-E)*100*O,Y=to(no(m.h,m.s,m.l+Q)),W=`#${no(m.h,m.s,m.l+Q)}`,De=u?`#${hr({...d,a:g})}`:`rgba(${d.r},${d.g},${d.b},${g})`,je=u?`#${hr({...Y,a:y})}`:`rgba(${Y.r},${Y.g},${Y.b},${y})`;return{textColor:W,backgroundColor:De,borderColor:je}}else return{textColor:`#${pi(d)}`,backgroundColor:`#${i}`,borderColor:`#${i}`}}o(pn,"utils_gitHubLabelColor");const hr=o(i=>{const a=[i.r,i.g,i.b];return i.a&&a.push(Math.floor(i.a*255)),a.map(u=>u.toString(16).padStart(2,"0")).join("")},"rgbToHex");function to(i){const a=/^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(i);return a?{r:parseInt(a[1],16),g:parseInt(a[2],16),b:parseInt(a[3],16)}:{r:0,g:0,b:0}}o(to,"hexToRgb");function vr(i,a,u){i/=255,a/=255,u/=255;let d=Math.min(i,a,u),m=Math.max(i,a,u),p=m-d,g=0,y=0,E=0;return p==0?g=0:m==i?g=(a-u)/p%6:m==a?g=(u-i)/p+2:g=(i-a)/p+4,g=Math.round(g*60),g<0&&(g+=360),E=(m+d)/2,y=p==0?0:p/(1-Math.abs(2*E-1)),y=+(y*100).toFixed(1),E=+(E*100).toFixed(1),{h:g,s:y,l:E}}o(vr,"rgbToHsl");function no(i,a,u){const d=u/100,m=a*Math.min(d,1-d)/100,p=o(g=>{const y=(g+i/30)%12,E=d-m*Math.max(Math.min(y-3,9-y,1),-1);return Math.round(255*E).toString(16).padStart(2,"0")},"f");return`${p(0)}${p(8)}${p(4)}`}o(no,"hslToHex");function pi(i){return(.299*i.r+.587*i.g+.114*i.b)/255>.5?"000000":"ffffff"}o(pi,"contrastColor");var hi=(i=>(i[i.Period=46]="Period",i[i.Slash=47]="Slash",i[i.A=65]="A",i[i.Z=90]="Z",i[i.Backslash=92]="Backslash",i[i.a=97]="a",i[i.z=122]="z",i))(hi||{});function gr(i,a){return i<a?-1:i>a?1:0}o(gr,"compare");function yr(i,a,u=0,d=i.length,m=0,p=a.length){for(;u<d&&m<p;u++,m++){const E=i.charCodeAt(u),O=a.charCodeAt(m);if(E<O)return-1;if(E>O)return 1}const g=d-u,y=p-m;return g<y?-1:g>y?1:0}o(yr,"compareSubstring");function Cr(i,a){return wr(i,a,0,i.length,0,a.length)}o(Cr,"compareIgnoreCase");function wr(i,a,u=0,d=i.length,m=0,p=a.length){for(;u<d&&m<p;u++,m++){let E=i.charCodeAt(u),O=a.charCodeAt(m);if(E===O)continue;const Q=E-O;if(!(Q===32&&Ct(O))&&!(Q===-32&&Ct(E)))return xr(E)&&xr(O)?Q:yr(i.toLowerCase(),a.toLowerCase(),u,d,m,p)}const g=d-u,y=p-m;return g<y?-1:g>y?1:0}o(wr,"compareSubstringIgnoreCase");function xr(i){return i>=97&&i<=122}o(xr,"isLowerAsciiLetter");function Ct(i){return i>=65&&i<=90}o(Ct,"isUpperAsciiLetter");const So=class So{constructor(){We(this,"_value",""),We(this,"_pos",0)}reset(a){return this._value=a,this._pos=0,this}next(){return this._pos+=1,this}hasNext(){return this._pos<this._value.length-1}cmp(a){const u=a.charCodeAt(0),d=this._value.charCodeAt(this._pos);return u-d}value(){return this._value[this._pos]}};o(So,"StringIterator");let Tt=So;const No=class No{constructor(a=!0){this._caseSensitive=a,We(this,"_value"),We(this,"_from"),We(this,"_to")}reset(a){return this._value=a,this._from=0,this._to=0,this.next()}hasNext(){return this._to<this._value.length}next(){this._from=this._to;let a=!0;for(;this._to<this._value.length;this._to++)if(this._value.charCodeAt(this._to)===46)if(a)this._from++;else break;else a=!1;return this}cmp(a){return this._caseSensitive?yr(a,this._value,0,a.length,this._from,this._to):wr(a,this._value,0,a.length,this._from,this._to)}value(){return this._value.substring(this._from,this._to)}};o(No,"ConfigKeysIterator");let St=No;const Mo=class Mo{constructor(a=!0,u=!0){this._splitOnBackslash=a,this._caseSensitive=u,We(this,"_value"),We(this,"_from"),We(this,"_to")}reset(a){return this._value=a.replace(/\\$|\/$/,""),this._from=0,this._to=0,this.next()}hasNext(){return this._to<this._value.length}next(){this._from=this._to;let a=!0;for(;this._to<this._value.length;this._to++){const u=this._value.charCodeAt(this._to);if(u===47||this._splitOnBackslash&&u===92)if(a)this._from++;else break;else a=!1}return this}cmp(a){return this._caseSensitive?yr(a,this._value,0,a.length,this._from,this._to):wr(a,this._value,0,a.length,this._from,this._to)}value(){return this._value.substring(this._from,this._to)}};o(Mo,"PathIterator");let wt=Mo;var Fn=(i=>(i[i.Scheme=1]="Scheme",i[i.Authority=2]="Authority",i[i.Path=3]="Path",i[i.Query=4]="Query",i[i.Fragment=5]="Fragment",i))(Fn||{});const xn=class xn{constructor(a){this._ignorePathCasing=a,We(this,"_pathIterator"),We(this,"_value"),We(this,"_states",[]),We(this,"_stateIdx",0)}reset(a){return this._value=a,this._states=[],this._value.scheme&&this._states.push(1),this._value.authority&&this._states.push(2),this._value.path&&(this._pathIterator=new wt(!1,!this._ignorePathCasing(a)),this._pathIterator.reset(a.path),this._pathIterator.value()&&this._states.push(3)),this._value.query&&this._states.push(4),this._value.fragment&&this._states.push(5),this._stateIdx=0,this}next(){return this._states[this._stateIdx]===3&&this._pathIterator.hasNext()?this._pathIterator.next():this._stateIdx+=1,this}hasNext(){return this._states[this._stateIdx]===3&&this._pathIterator.hasNext()||this._stateIdx<this._states.length-1}cmp(a){if(this._states[this._stateIdx]===1)return Cr(a,this._value.scheme);if(this._states[this._stateIdx]===2)return Cr(a,this._value.authority);if(this._states[this._stateIdx]===3)return this._pathIterator.cmp(a);if(this._states[this._stateIdx]===4)return gr(a,this._value.query);if(this._states[this._stateIdx]===5)return gr(a,this._value.fragment);throw new Error}value(){if(this._states[this._stateIdx]===1)return this._value.scheme;if(this._states[this._stateIdx]===2)return this._value.authority;if(this._states[this._stateIdx]===3)return this._pathIterator.value();if(this._states[this._stateIdx]===4)return this._value.query;if(this._states[this._stateIdx]===5)return this._value.fragment;throw new Error}};o(xn,"UriIterator");let tn=xn;function Er(i){const u=i.extensionUri.path,d=u.lastIndexOf(".");return d===-1?!1:u.substr(d+1).length>1}o(Er,"isPreRelease");const Ro=class Ro{constructor(){We(this,"segment"),We(this,"value"),We(this,"key"),We(this,"left"),We(this,"mid"),We(this,"right")}isEmpty(){return!this.left&&!this.mid&&!this.right&&!this.value}};o(Ro,"TernarySearchTreeNode");let Vt=Ro;const sn=class sn{constructor(a){We(this,"_iter"),We(this,"_root"),this._iter=a}static forUris(a=()=>!1){return new sn(new tn(a))}static forPaths(){return new sn(new wt)}static forStrings(){return new sn(new Tt)}static forConfigKeys(){return new sn(new St)}clear(){this._root=void 0}set(a,u){const d=this._iter.reset(a);let m;for(this._root||(this._root=new Vt,this._root.segment=d.value()),m=this._root;;){const g=d.cmp(m.segment);if(g>0)m.left||(m.left=new Vt,m.left.segment=d.value()),m=m.left;else if(g<0)m.right||(m.right=new Vt,m.right.segment=d.value()),m=m.right;else if(d.hasNext())d.next(),m.mid||(m.mid=new Vt,m.mid.segment=d.value()),m=m.mid;else break}const p=m.value;return m.value=u,m.key=a,p}get(a){var u;return(u=this._getNode(a))==null?void 0:u.value}_getNode(a){const u=this._iter.reset(a);let d=this._root;for(;d;){const m=u.cmp(d.segment);if(m>0)d=d.left;else if(m<0)d=d.right;else if(u.hasNext())u.next(),d=d.mid;else break}return d}has(a){const u=this._getNode(a);return!((u==null?void 0:u.value)===void 0&&(u==null?void 0:u.mid)===void 0)}delete(a){return this._delete(a,!1)}deleteSuperstr(a){return this._delete(a,!0)}_delete(a,u){const d=this._iter.reset(a),m=[];let p=this._root;for(;p;){const g=d.cmp(p.segment);if(g>0)m.push([1,p]),p=p.left;else if(g<0)m.push([-1,p]),p=p.right;else if(d.hasNext())d.next(),m.push([0,p]),p=p.mid;else{for(u?(p.left=void 0,p.mid=void 0,p.right=void 0):p.value=void 0;m.length>0&&p.isEmpty();){let[y,E]=m.pop();switch(y){case 1:E.left=void 0;break;case 0:E.mid=void 0;break;case-1:E.right=void 0;break}p=E}break}}}findSubstr(a){const u=this._iter.reset(a);let d=this._root,m;for(;d;){const p=u.cmp(d.segment);if(p>0)d=d.left;else if(p<0)d=d.right;else if(u.hasNext())u.next(),m=d.value||m,d=d.mid;else break}return d&&d.value||m}findSuperstr(a){const u=this._iter.reset(a);let d=this._root;for(;d;){const m=u.cmp(d.segment);if(m>0)d=d.left;else if(m<0)d=d.right;else if(u.hasNext())u.next(),d=d.mid;else return d.mid?this._entries(d.mid):void 0}}forEach(a){for(const[u,d]of this)a(d,u)}*[Symbol.iterator](){yield*this._entries(this._root)}*_entries(a){a&&(yield*this._entries(a.left),a.value&&(yield[a.key,a.value]),yield*this._entries(a.mid),yield*this._entries(a.right))}};o(sn,"TernarySearchTree");let vi=sn;async function pa(i,a,u){const d=[];i.replace(a,(g,...y)=>{const E=u(g,...y);return d.push(E),""});const m=await Promise.all(d);let p=0;return i.replace(a,()=>m[p++])}o(pa,"stringReplaceAsync");async function gi(i,a,u){const d=Math.ceil(i.length/a);for(let m=0;m<d;m++){const p=i.slice(m*a,(m+1)*a);await Promise.all(p.map(u))}}o(gi,"batchPromiseAll");function Wl(i){return i.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}o(Wl,"escapeRegExp");const ut=o(({date:i,href:a})=>{const u=typeof i=="string"?new Date(i).toLocaleString():i.toLocaleString();return a?l.createElement("a",{href:a,className:"timestamp",title:u},mi(i)):l.createElement("div",{className:"timestamp",title:u},mi(i))},"Timestamp"),ha=null,yi=o(({for:i})=>l.createElement(l.Fragment,null,i.avatarUrl?l.createElement("img",{className:"avatar",src:i.avatarUrl,alt:"",role:"presentation"}):l.createElement(ae,{className:"avatar-icon",src:fe(8440)})),"InnerAvatar"),it=o(({for:i,link:a=!0})=>a?l.createElement("a",{className:"avatar-link",href:i.url,title:i.url},l.createElement(yi,{for:i})):l.createElement(yi,{for:i}),"Avatar"),lt=o(({for:i,text:a=ot(i)})=>l.createElement("a",{className:"author-link",href:i.url,"aria-label":a,title:i.url},a),"AuthorLink"),ql=o(({authorAssociation:i},a=u=>`(${u.toLowerCase()})`)=>i.toLowerCase()==="user"?a("you"):i&&i!=="NONE"?a(i):null,"association");function $t(i){const{isPRDescription:a,children:u,comment:d,headerInEditMode:m}=i,{bodyHTML:p,body:g}=d,y="id"in d?d.id:-1,E="canEdit"in d?d.canEdit:!1,O="canDelete"in d?d.canDelete:!1,Q=d.pullRequestReviewId,[Y,W]=we(g),[De,je]=we(p),{deleteComment:ze,editComment:Ee,setDescription:Ie,pr:Fe}=(0,l.useContext)(U),Ze=Fe.pendingCommentDrafts&&Fe.pendingCommentDrafts[y],[st,Ye]=(0,l.useState)(!!Ze),[Se,Wt]=(0,l.useState)(!1);if(st)return l.cloneElement(m?l.createElement(kr,{for:d}):l.createElement(l.Fragment,null),{},[l.createElement(Zl,{id:y,key:`editComment${y}`,body:Ze||Y,onCancel:o(()=>{Fe.pendingCommentDrafts&&delete Fe.pendingCommentDrafts[y],Ye(!1)},"onCancel"),onSave:o(async Ve=>{try{const ct=a?await Ie(Ve):await Ee({comment:d,text:Ve});je(ct.bodyHTML),W(Ve)}finally{Ye(!1)}},"onSave")})]);const Ge=d.event===J.Commented||d.event===J.Reviewed?D(d):void 0;return l.createElement(kr,{for:d,onMouseEnter:o(()=>Wt(!0),"onMouseEnter"),onMouseLeave:o(()=>Wt(!1),"onMouseLeave"),onFocus:o(()=>Wt(!0),"onFocus")},Ge?l.createElement("div",{role:"alert","aria-label":Ge}):null,l.createElement("div",{className:"action-bar comment-actions",style:{display:Se?"flex":"none"}},l.createElement("button",{title:"Quote reply",className:"icon-button",onClick:o(()=>ke.emit("quoteReply",Y),"onClick")},lr),E?l.createElement("button",{title:"Edit comment",className:"icon-button",onClick:o(()=>Ye(!0),"onClick")},Xo):null,O?l.createElement("button",{title:"Delete comment",className:"icon-button",onClick:o(()=>ze({id:y,pullRequestReviewId:Q}),"onClick")},sr):null),l.createElement(ro,{comment:d,bodyHTML:De,body:Y,canApplyPatch:Fe.isCurrentlyCheckedOut,allowEmpty:!!i.allowEmpty,specialDisplayBodyPostfix:d.specialDisplayBodyPostfix}),u)}o($t,"CommentView");function zn(i){return i.authorAssociation!==void 0}o(zn,"isReviewEvent");const Ci={PENDING:"will review",COMMENTED:"reviewed",CHANGES_REQUESTED:"requested changes",APPROVED:"approved"},wi=o(i=>Ci[i]||"reviewed","reviewDescriptor");function kr({for:i,onFocus:a,onMouseEnter:u,onMouseLeave:d,children:m}){var p,g;const y="htmlUrl"in i?i.htmlUrl:i.url,E=(g=i.isDraft)!=null?g:zn(i)&&((p=i.state)==null?void 0:p.toLocaleUpperCase())==="PENDING",O="user"in i?i.user:i.author,Q="createdAt"in i?i.createdAt:i.submittedAt;return l.createElement("div",{className:"comment-container comment review-comment",onFocus:a,onMouseEnter:u,onMouseLeave:d},l.createElement("div",{className:"review-comment-container"},l.createElement("h3",{className:`review-comment-header${zn(i)&&i.comments.length>0?"":" no-details"}`},l.createElement(Zr,null,l.createElement(it,{for:O}),l.createElement(lt,{for:O}),zn(i)?ql(i):null,Q?l.createElement(l.Fragment,null,zn(i)&&i.state?wi(i.state):"commented",Je,l.createElement(ut,{href:y,date:Q})):l.createElement("em",null,"pending"),E?l.createElement(l.Fragment,null,l.createElement("span",{className:"pending-label"},"Pending")):null)),m))}o(kr,"CommentBox");function Zl({id:i,body:a,onCancel:u,onSave:d}){const{updateDraft:m}=(0,l.useContext)(U),p=(0,l.useRef)({body:a,dirty:!1}),g=(0,l.useRef)();(0,l.useEffect)(()=>{const Y=setInterval(()=>{p.current.dirty&&(m(i,p.current.body),p.current.dirty=!1)},500);return()=>clearInterval(Y)},[p]);const y=(0,l.useCallback)(async()=>{const{markdown:Y,submitButton:W}=g.current;W.disabled=!0;try{await d(Y.value)}finally{W.disabled=!1}},[g,d]),E=(0,l.useCallback)(Y=>{Y.preventDefault(),y()},[y]),O=(0,l.useCallback)(Y=>{(Y.metaKey||Y.ctrlKey)&&Y.key==="Enter"&&(Y.preventDefault(),y())},[y]),Q=(0,l.useCallback)(Y=>{p.current.body=Y.target.value,p.current.dirty=!0},[p]);return l.createElement("form",{ref:g,onSubmit:E},l.createElement("textarea",{name:"markdown",defaultValue:a,onKeyDown:O,onInput:Q}),l.createElement("div",{className:"form-actions"},l.createElement("button",{className:"secondary",onClick:u},"Cancel"),l.createElement("button",{type:"submit",name:"submitButton"},"Save")))}o(Zl,"EditComment");const ro=o(({comment:i,bodyHTML:a,body:u,canApplyPatch:d,allowEmpty:m,specialDisplayBodyPostfix:p})=>{var g,y;if(!u&&!a)return m?null:l.createElement("div",{className:"comment-body"},l.createElement("em",null,"No description provided."));const{applyPatch:E}=(0,l.useContext)(U),O=l.createElement("div",{dangerouslySetInnerHTML:{__html:a!=null?a:""}}),Y=((y=(g=u||a)==null?void 0:g.indexOf("```diff"))!=null?y:-1)>-1&&d&&i?l.createElement("button",{onClick:o(()=>E(i),"onClick")},"Apply Patch"):l.createElement(l.Fragment,null);return l.createElement("div",{className:"comment-body"},O,Y,p?l.createElement("br",null):null,p?l.createElement("em",null,p):null,l.createElement(xi,{reactions:i==null?void 0:i.reactions}))},"CommentBody"),xi=o(({reactions:i})=>{if(!Array.isArray(i)||i.length===0)return null;const a=i.filter(u=>u.count>0);return a.length===0?null:l.createElement("div",{className:"comment-reactions",style:{marginTop:6}},a.map((u,d)=>{const p=u.reactors||[],g=p.slice(0,10),y=p.length>10?p.length-10:0;let E="";return g.length>0&&(y>0?E=`${bi(g)} and ${y} more reacted with ${u.label}`:E=`${bi(g)} reacted with ${u.label}`),l.createElement("div",{key:u.label+d,title:E},l.createElement("span",{className:"reaction-label"},u.label),Je,u.count>1?l.createElement("span",{className:"reaction-count"},u.count):null)}))},"CommentReactions");function oo({pendingCommentText:i,state:a,hasWritePermission:u,isIssue:d,isAuthor:m,continueOnGitHub:p,currentUserReviewState:g,lastReviewType:y,busy:E}){const{updatePR:O,requestChanges:Q,approve:Y,close:W,openOnGitHub:De,submit:je}=(0,l.useContext)(U),[ze,Ee]=(0,l.useState)(!1),Ie=(0,l.useRef)(),Fe=(0,l.useRef)();ke.addListener("quoteReply",Ve=>{var ct,Io;const Xi=Ve.replace(/\n/g,`
> `);O({pendingCommentText:`> ${Xi} 

`}),(ct=Fe.current)==null||ct.scrollIntoView(),(Io=Fe.current)==null||Io.focus()});const Ze=o(Ve=>{Ve.preventDefault();const{value:ct}=Fe.current;W(ct)},"closeButton");let st=y!=null?y:g==="APPROVED"?ne.Approve:g==="CHANGES_REQUESTED"?ne.RequestChanges:ne.Comment;async function Ye(Ve){const{value:ct}=Fe.current;if(p&&Ve!==ne.Comment){await De();return}switch(Ee(!0),Ve){case ne.RequestChanges:await Q(ct);break;case ne.Approve:await Y(ct);break;default:await je(ct)}Ee(!1)}o(Ye,"submitAction");const Se=(0,l.useCallback)(Ve=>{(Ve.metaKey||Ve.ctrlKey)&&Ve.key==="Enter"&&Ye(st)},[je]);async function Wt(){await Ye(st)}o(Wt,"defaultSubmitAction");const Ge=m?{[ne.Comment]:"Comment"}:p?{[ne.Comment]:"Comment",[ne.Approve]:"Approve on github.com",[ne.RequestChanges]:"Request changes on github.com"}:Ei(d);return l.createElement("form",{id:"comment-form",ref:Ie,className:"comment-form main-comment-form",onSubmit:o(()=>{var Ve,ct;return je((ct=(Ve=Fe.current)==null?void 0:Ve.value)!=null?ct:"")},"onSubmit")},l.createElement("textarea",{id:"comment-textarea",name:"body",ref:Fe,onInput:o(({target:Ve})=>O({pendingCommentText:Ve.value}),"onInput"),onKeyDown:Se,value:i,placeholder:"Leave a comment"}),l.createElement("div",{className:"form-actions"},u||m?l.createElement("button",{id:"close",className:"secondary",disabled:ze||a!==de.Open,onClick:Ze,"data-command":"close"},d?"Close Issue":"Close Pull Request"):null,l.createElement(qr,{optionsContext:o(()=>$e(Ge,i),"optionsContext"),defaultAction:Wt,defaultOptionLabel:o(()=>Ge[st],"defaultOptionLabel"),defaultOptionValue:o(()=>st,"defaultOptionValue"),allOptions:o(()=>{const Ve=[];return Ge.approve&&Ve.push({label:Ge[ne.Approve],value:ne.Approve,action:o(()=>Ye(ne.Approve),"action")}),Ge.comment&&Ve.push({label:Ge[ne.Comment],value:ne.Comment,action:o(()=>Ye(ne.Comment),"action")}),Ge.requestChanges&&Ve.push({label:Ge[ne.RequestChanges],value:ne.RequestChanges,action:o(()=>Ye(ne.RequestChanges),"action")}),Ve},"allOptions"),optionsTitle:"Submit pull request review",disabled:ze||E,hasSingleAction:Object.keys(Ge).length===1})))}o(oo,"AddComment");function Ei(i){return i?ki:hn}o(Ei,"commentMethods");const ki={comment:"Comment"},hn={...ki,approve:"Approve",requestChanges:"Request Changes"},$e=o((i,a)=>{const u={preventDefaultContextMenuItems:!0,"github:reviewCommentMenu":!0};return i.approve&&(i.approve===hn.approve?u["github:reviewCommentApprove"]=!0:u["github:reviewCommentApproveOnDotCom"]=!0),i.comment&&(u["github:reviewCommentComment"]=!0),i.requestChanges&&(i.requestChanges===hn.requestChanges?u["github:reviewCommentRequestChanges"]=!0:u["github:reviewCommentRequestChangesOnDotCom"]=!0),u.body=a!=null?a:"",JSON.stringify(u)},"makeCommentMenuContext"),br=o(i=>{var a,u;const{updatePR:d,requestChanges:m,approve:p,submit:g,openOnGitHub:y}=useContext(PullRequestContext),[E,O]=useState(!1),Q=useRef();let Y=(a=i.lastReviewType)!=null?a:i.currentUserReviewState==="APPROVED"?ReviewType.Approve:i.currentUserReviewState==="CHANGES_REQUESTED"?ReviewType.RequestChanges:ReviewType.Comment;async function W(Ie){const{value:Fe}=Q.current;if(i.continueOnGitHub&&Ie!==ReviewType.Comment){await y();return}switch(O(!0),Ie){case ReviewType.RequestChanges:await m(Fe);break;case ReviewType.Approve:await p(Fe);break;default:await g(Fe)}O(!1)}o(W,"submitAction");async function De(){await W(Y)}o(De,"defaultSubmitAction");const je=o(Ie=>{d({pendingCommentText:Ie.target.value})},"onChangeTextarea"),ze=useCallback(Ie=>{(Ie.metaKey||Ie.ctrlKey)&&Ie.key==="Enter"&&(Ie.preventDefault(),De())},[W]),Ee=i.isAuthor?{comment:"Comment"}:i.continueOnGitHub?{comment:"Comment",approve:"Approve on github.com",requestChanges:"Request changes on github.com"}:Ei(i.isIssue);return React.createElement("span",{className:"comment-form"},React.createElement("textarea",{id:"comment-textarea",name:"body",placeholder:"Leave a comment",ref:Q,value:(u=i.pendingCommentText)!=null?u:"",onChange:je,onKeyDown:ze,disabled:E||i.busy}),React.createElement("div",{className:"comment-button"},React.createElement(ContextDropdown,{optionsContext:o(()=>$e(Ee,i.pendingCommentText),"optionsContext"),defaultAction:De,defaultOptionLabel:o(()=>Ee[Y],"defaultOptionLabel"),defaultOptionValue:o(()=>Y,"defaultOptionValue"),allOptions:o(()=>{const Ie=[];return Ee.approve&&Ie.push({label:Ee[ReviewType.Approve],value:ReviewType.Approve,action:o(()=>W(ReviewType.Approve),"action")}),Ee.comment&&Ie.push({label:Ee[ReviewType.Comment],value:ReviewType.Comment,action:o(()=>W(ReviewType.Comment),"action")}),Ee.requestChanges&&Ie.push({label:Ee[ReviewType.RequestChanges],value:ReviewType.RequestChanges,action:o(()=>W(ReviewType.RequestChanges),"action")}),Ie},"allOptions"),optionsTitle:"Submit pull request review",disabled:E||i.busy,hasSingleAction:Object.keys(Ee).length===1})))},"AddCommentSimple");function bi(i){return i.length===0?"":i.length===1?i[0]:i.length===2?`${i[0]} and ${i[1]}`:`${i.slice(0,-1).join(", ")} and ${i[i.length-1]}`}o(bi,"joinWithAnd");function Ql({canEdit:i,state:a,head:u,base:d,title:m,titleHTML:p,number:g,url:y,author:E,isCurrentlyCheckedOut:O,isDraft:Q,isIssue:Y,repositoryDefaultBranch:W}){const[De,je]=we(m),[ze,Ee]=(0,l.useState)(!1);return l.createElement(l.Fragment,null,l.createElement(_r,{title:De,titleHTML:p,number:g,url:y,inEditMode:ze,setEditMode:Ee,setCurrentTitle:je}),l.createElement(Vn,{state:a,head:u,base:d,author:E,isIssue:Y,isDraft:Q}),l.createElement(io,{isCurrentlyCheckedOut:O,isIssue:Y,canEdit:i,repositoryDefaultBranch:W,setEditMode:Ee}))}o(Ql,"Header");function _r({title:i,titleHTML:a,number:u,url:d,inEditMode:m,setEditMode:p,setCurrentTitle:g}){const{setTitle:y}=(0,l.useContext)(U);return m?l.createElement("form",{className:"editing-form title-editing-form",onSubmit:o(async Y=>{Y.preventDefault();try{const W=Y.target[0].value;await y(W),g(W)}finally{p(!1)}},"onSubmit")},l.createElement("input",{type:"text",style:{width:"100%"},defaultValue:i}),l.createElement("div",{className:"form-actions"},l.createElement("button",{type:"button",className:"secondary",onClick:o(()=>p(!1),"onClick")},"Cancel"),l.createElement("button",{type:"submit"},"Update"))):l.createElement("div",{className:"overview-title"},l.createElement("h2",null,l.createElement("span",{dangerouslySetInnerHTML:{__html:a}})," ",l.createElement("a",{href:d,title:d},"#",u)))}o(_r,"Title");function io({isCurrentlyCheckedOut:i,canEdit:a,isIssue:u,repositoryDefaultBranch:d,setEditMode:m}){const{refresh:p,copyPrLink:g,copyVscodeDevLink:y}=(0,l.useContext)(U);return l.createElement("div",{className:"button-group"},l.createElement(Kl,{isCurrentlyCheckedOut:i,isIssue:u,repositoryDefaultBranch:d}),l.createElement("button",{title:"Refresh with the latest data from GitHub",onClick:p,className:"secondary small-button"},"Refresh"),a&&l.createElement(l.Fragment,null,l.createElement("button",{title:"Rename",onClick:m,className:"secondary small-button"},"Rename"),l.createElement("button",{title:"Copy GitHub pull request link",onClick:g,className:"secondary small-button"},"Copy Link"),l.createElement("button",{title:"Copy vscode.dev link for viewing this pull request in VS Code for the Web",onClick:y,className:"secondary small-button"},"Copy vscode.dev Link")))}o(io,"ButtonGroup");function Vn({state:i,isDraft:a,isIssue:u,author:d,base:m,head:p}){const{text:g,color:y,icon:E}=_i(i,a,u);return l.createElement("div",{className:"subtitle"},l.createElement("div",{id:"status",className:`status-badge-${y}`},l.createElement("span",{className:"icon"},E),l.createElement("span",null,g)),l.createElement("div",{className:"author"},l.createElement(it,{for:d}),l.createElement("div",{className:"merge-branches"},l.createElement(lt,{for:d})," ",u?null:l.createElement(l.Fragment,null,Li(i)," into"," ",l.createElement("code",{className:"branch-tag"},m)," from ",l.createElement("code",{className:"branch-tag"},p)))))}o(Vn,"Subtitle");const Kl=o(({isCurrentlyCheckedOut:i,isIssue:a,repositoryDefaultBranch:u})=>{const{exitReviewMode:d,checkout:m}=(0,l.useContext)(U),[p,g]=(0,l.useState)(!1),y=o(async E=>{try{switch(g(!0),E){case"checkout":await m();break;case"exitReviewMode":await d();break;default:throw new Error(`Can't find action ${E}`)}}finally{g(!1)}},"onClick");return i?l.createElement(l.Fragment,null,l.createElement("button",{"aria-live":"polite",className:"checkedOut small-button",disabled:!0},Te,Je," Checked Out"),l.createElement("button",{"aria-live":"polite",title:"Switch to a different branch than this pull request branch",disabled:p,className:"small-button",onClick:o(()=>y("exitReviewMode"),"onClick")},"Checkout '",u,"'")):a?null:l.createElement("button",{"aria-live":"polite",title:"Checkout a local copy of this pull request branch to verify or edit changes",disabled:p,className:"small-button",onClick:o(()=>y("checkout"),"onClick")},"Checkout")},"CheckoutButtons");function _i(i,a,u){const d=u?Ur:Yo,m=u?ti:ar;return i===de.Merged?{text:"Merged",color:"merged",icon:Ft}:i===de.Open?a?{text:"Draft",color:"draft",icon:Go}:{text:"Open",color:"open",icon:m}:{text:"Closed",color:"closed",icon:d}}o(_i,"getStatus");function Li(i){return i===de.Merged?"merged changes":"wants to merge changes"}o(Li,"getActionText");function Ti(i){const{reviewer:a,state:u}=i.reviewState,{reRequestReview:d}=(0,l.useContext)(U),m=i.event?D(i.event):void 0;return l.createElement("div",{className:"section-item reviewer"},l.createElement("div",{className:"avatar-with-author"},l.createElement(it,{for:a}),l.createElement(lt,{for:a})),l.createElement("div",{className:"reviewer-icons"},u!=="REQUESTED"&&(tt(a)||a.accountType!==Be.Bot)?l.createElement("button",{className:"icon-button",title:"Re-request review",onClick:o(()=>d(i.reviewState.reviewer.id),"onClick")},Jo,"\uFE0F"):null,lo[u],m?l.createElement("div",{role:"alert","aria-label":m}):null))}o(Ti,"Reviewer");const lo={REQUESTED:(0,l.cloneElement)(Pn,{className:"section-icon requested",title:"Awaiting requested review"}),COMMENTED:(0,l.cloneElement)(lr,{className:"section-icon commented",Root:"div",title:"Left review comments"}),APPROVED:(0,l.cloneElement)(Te,{className:"section-icon approved",title:"Approved these changes"}),CHANGES_REQUESTED:(0,l.cloneElement)(On,{className:"section-icon changes",title:"Requested changes"})},so=o(({busy:i,baseHasMergeQueue:a})=>i?l.createElement("label",{htmlFor:"automerge-checkbox",className:"automerge-checkbox-label"},"Setting..."):l.createElement("label",{htmlFor:"automerge-checkbox",className:"automerge-checkbox-label"},a?"Merge when ready":"Auto-merge"),"AutoMergeLabel"),Si=o(({updateState:i,baseHasMergeQueue:a,allowAutoMerge:u,defaultMergeMethod:d,mergeMethodsAvailability:m,autoMerge:p,isDraft:g})=>{if(!u&&!p||!m||!d)return null;const y=l.useRef(),[E,O]=l.useState(!1),Q=o(()=>{var Y,W;return(W=(Y=y.current)==null?void 0:Y.value)!=null?W:"merge"},"selectedMethod");return l.createElement("div",{className:"automerge-section"},l.createElement("div",{className:"automerge-checkbox-wrapper"},l.createElement("input",{id:"automerge-checkbox",type:"checkbox",name:"automerge",checked:p,disabled:!u||g||E,onChange:o(async()=>{O(!0),await i({autoMerge:!p,autoMergeMethod:Q()}),O(!1)},"onChange")})),l.createElement(so,{busy:E,baseHasMergeQueue:a}),a?null:l.createElement("div",{className:"merge-select-container"},l.createElement(Nr,{ref:y,defaultMergeMethod:d,mergeMethodsAvailability:m,onChange:o(async()=>{O(!0),await i({autoMergeMethod:Q()}),O(!1)},"onChange"),disabled:E})))},"AutoMerge"),Ot=o(({mergeQueueEntry:i})=>{const a=l.useContext(U);let u,d;switch(i.state){case Ne.Mergeable:case Ne.AwaitingChecks:case Ne.Queued:{d=l.createElement("span",{className:"merge-queue-pending"},"Queued to merge..."),i.position===1?u=l.createElement("span",null,"This pull request is at the head of the ",l.createElement("a",{href:i.url},"merge queue"),"."):u=l.createElement("span",null,"This pull request is in the ",l.createElement("a",{href:i.url},"merge queue"),".");break}case Ne.Locked:{d=l.createElement("span",{className:"merge-queue-blocked"},"Merging is blocked"),u=l.createElement("span",null,"The base branch does not allow updates");break}case Ne.Unmergeable:{d=l.createElement("span",{className:"merge-queue-blocked"},"Merging is blocked"),u=l.createElement("span",null,"There are conflicts with the base branch.");break}}return l.createElement("div",{className:"merge-queue-container"},l.createElement("div",{className:"merge-queue"},l.createElement("div",{className:"merge-queue-icon"}),l.createElement("div",{className:"merge-queue-title"},d),u),l.createElement("div",{className:"button-container"},l.createElement("button",{onClick:a.dequeue},"Remove from Queue")))},"QueuedToMerge");var nn,ao=new Uint8Array(16);function Ni(){if(!nn&&(nn=typeof crypto!="undefined"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||typeof msCrypto!="undefined"&&typeof msCrypto.getRandomValues=="function"&&msCrypto.getRandomValues.bind(msCrypto),!nn))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return nn(ao)}o(Ni,"rng");const Mi=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;function Ri(i){return typeof i=="string"&&Mi.test(i)}o(Ri,"validate");const Pi=Ri;for(var Ke=[],Lr=0;Lr<256;++Lr)Ke.push((Lr+256).toString(16).substr(1));function Oi(i){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,u=(Ke[i[a+0]]+Ke[i[a+1]]+Ke[i[a+2]]+Ke[i[a+3]]+"-"+Ke[i[a+4]]+Ke[i[a+5]]+"-"+Ke[i[a+6]]+Ke[i[a+7]]+"-"+Ke[i[a+8]]+Ke[i[a+9]]+"-"+Ke[i[a+10]]+Ke[i[a+11]]+Ke[i[a+12]]+Ke[i[a+13]]+Ke[i[a+14]]+Ke[i[a+15]]).toLowerCase();if(!Pi(u))throw TypeError("Stringified UUID is invalid");return u}o(Oi,"stringify");const uo=Oi;function co(i,a,u){i=i||{};var d=i.random||(i.rng||Ni)();if(d[6]=d[6]&15|64,d[8]=d[8]&63|128,a){u=u||0;for(var m=0;m<16;++m)a[u+m]=d[m];return a}return uo(d)}o(co,"v4");const fo=co;var mo=(i=>(i[i.esc=27]="esc",i[i.down=40]="down",i[i.up=38]="up",i))(mo||{});const Di=o(({options:i,defaultOption:a,disabled:u,submitAction:d,changeAction:m})=>{const[p,g]=(0,l.useState)(a),[y,E]=(0,l.useState)(!1),O=fo(),Q=`expandOptions${O}`,Y=o(()=>{E(!y)},"onClick"),W=o(ze=>{g(ze.target.value),E(!1);const Ee=document.getElementById(`confirm-button${O}`);Ee==null||Ee.focus(),m&&m(ze.target.value)},"onMethodChange"),De=o(ze=>{if(y){const Ee=document.activeElement;switch(ze.keyCode){case 27:E(!1);const Ie=document.getElementById(Q);Ie==null||Ie.focus();break;case 40:if(!(Ee!=null&&Ee.id)||Ee.id===Q){const Fe=document.getElementById(`${O}option0`);Fe==null||Fe.focus()}else{const Fe=new RegExp(`${O}option([0-9])`),Ze=Ee.id.match(Fe);if(Ze!=null&&Ze.length){const st=parseInt(Ze[1]);if(st<Object.entries(i).length-1){const Ye=document.getElementById(`${O}option${st+1}`);Ye==null||Ye.focus()}}}break;case 38:if(!(Ee!=null&&Ee.id)||Ee.id===Q){const Fe=Object.entries(i).length-1,Ze=document.getElementById(`${O}option${Fe}`);Ze==null||Ze.focus()}else{const Fe=new RegExp(`${O}option([0-9])`),Ze=Ee.id.match(Fe);if(Ze!=null&&Ze.length){const st=parseInt(Ze[1]);if(st>0){const Ye=document.getElementById(`${O}option${st-1}`);Ye==null||Ye.focus()}}}break}}},"onKeyDown"),je=Object.entries(i).length===1?"hidden":y?"open":"";return l.createElement("div",{className:"select-container",onKeyDown:De},l.createElement("div",{className:"select-control"},l.createElement(po,{dropdownId:O,className:Object.keys(i).length>1?"select-left":"",options:i,selected:p,submitAction:d,disabled:!!u}),l.createElement("div",{className:"split"}),l.createElement("button",{id:Q,className:"select-right "+je,"aria-label":"Expand button options",onClick:Y},jr)),l.createElement("div",{className:y?"options-select":"hidden"},Object.entries(i).map(([ze,Ee],Ie)=>l.createElement("button",{id:`${O}option${Ie}`,key:ze,value:ze,onClick:W},Ee))))},"Dropdown");function po({dropdownId:i,className:a,options:u,selected:d,disabled:m,submitAction:p}){const[g,y]=(0,l.useState)(!1),E=o(async O=>{O.preventDefault();try{y(!0),await p(d)}finally{y(!1)}},"onSubmit");return l.createElement("form",{onSubmit:E},l.createElement("input",{disabled:g||m,type:"submit",className:a,id:`confirm-button${i}`,value:u[d]}))}o(po,"Confirm");const ho=o(({pr:i,isSimple:a})=>i.state===de.Merged?l.createElement("div",{className:"branch-status-message"},l.createElement("div",{className:"branch-status-icon"},a?Ft:null)," ","Pull request successfully merged."):i.state===de.Closed?l.createElement("div",{className:"branch-status-message"},"This pull request is closed."):null,"PRStatusMessage"),Yl=o(({pr:i})=>i.state===de.Open?null:l.createElement(Xl,{...i}),"DeleteOption"),vn=o(({pr:i})=>{var a;const{state:u,status:d}=i,[m,p]=(0,l.useReducer)(g=>!g,(a=d==null?void 0:d.statuses.some(g=>g.state===B.Failure))!=null?a:!1);return(0,l.useEffect)(()=>{var g;(g=d==null?void 0:d.statuses.some(y=>y.state===B.Failure))!=null&&g?m||p():m&&p()},d==null?void 0:d.statuses),u===de.Open&&(d!=null&&d.statuses.length)?l.createElement(l.Fragment,null,l.createElement("div",{className:"status-section"},l.createElement("div",{className:"status-item"},l.createElement(Bn,{state:d.state}),l.createElement("p",{className:"status-item-detail-text"},Hi(d.statuses)),l.createElement("button",{id:"status-checks-display-button",className:"secondary small-button",onClick:p,"aria-expanded":m},m?"Hide":"Show")),m?l.createElement(Mr,{statuses:d.statuses}):null)):null},"StatusChecks"),Ai=o(({pr:i})=>{const{state:a,reviewRequirement:u}=i;return!u||a!==de.Open?null:l.createElement(l.Fragment,null,l.createElement("div",{className:"status-section"},l.createElement("div",{className:"status-item"},l.createElement(Rr,{state:u.state}),l.createElement("p",{className:"status-item-detail-text"},vt(u)))))},"RequiredReviewers"),vo=o(({pr:i,isSimple:a})=>{if(!a||i.state!==de.Open||i.reviewers.length===0)return null;const u=[],d=new Set(i.reviewers);let m=i.events.length-1;for(;m>=0&&d.size>0;){const p=i.events[m];if(p.event===J.Reviewed){for(const g of d)if(p.user.id===g.reviewer.id){u.push({event:p,reviewState:g}),d.delete(g);break}}m--}return l.createElement("div",{className:"section"}," ",u.map(p=>l.createElement(Ti,{key:Xe(p.reviewState.reviewer),...p})))},"InlineReviewers"),jt=o(({pr:i,isSimple:a})=>i.isIssue?null:l.createElement("div",{id:"status-checks"},l.createElement(l.Fragment,null,l.createElement(ho,{pr:i,isSimple:a}),l.createElement(Ai,{pr:i}),l.createElement(vn,{pr:i}),l.createElement(vo,{pr:i,isSimple:a}),l.createElement(Tr,{pr:i,isSimple:a}),l.createElement(Yl,{pr:i}))),"StatusChecksSection"),Tr=o(({pr:i,isSimple:a})=>{const{create:u,checkMergeability:d}=(0,l.useContext)(U);if(a&&i.state!==de.Open)return l.createElement("div",{className:"branch-status-container"},l.createElement("form",null,l.createElement("button",{type:"submit",onClick:u},"Create New Pull Request...")));if(i.state!==de.Open)return null;const{mergeable:m}=i,[p,g]=(0,l.useState)(m);return m!==p&&m!==Ce.Unknown&&g(m),(0,l.useEffect)(()=>{const y=setInterval(async()=>{if(p===Ce.Unknown){const E=await d();g(E)}},3e3);return()=>clearInterval(y)},[p]),l.createElement("div",null,l.createElement($n,{mergeable:p,isSimple:a,isCurrentlyCheckedOut:i.isCurrentlyCheckedOut,canUpdateBranch:i.canUpdateBranch}),l.createElement(jn,{mergeable:p,isSimple:a,isCurrentlyCheckedOut:i.isCurrentlyCheckedOut,canUpdateBranch:i.canUpdateBranch}),l.createElement(Dt,{pr:{...i,mergeable:p},isSimple:a}))},"MergeStatusAndActions"),Sr=null,$n=o(({mergeable:i,isSimple:a,isCurrentlyCheckedOut:u,canUpdateBranch:d})=>{const{updateBranch:m}=(0,l.useContext)(U),[p,g]=(0,l.useState)(!1),y=o(()=>{g(!0),m().finally(()=>g(!1))},"onClick");let E=Pn,O="Checking if this branch can be merged...",Q=null;return i===Ce.Mergeable?(E=Te,O="This branch has no conflicts with the base branch."):i===Ce.Conflict?(E=Lt,O="This branch has conflicts that must be resolved.",Q="Resolve conflicts"):i===Ce.NotMergeable?(E=Lt,O="Branch protection policy must be fulfilled before merging."):i===Ce.Behind&&(E=Lt,O="This branch is out-of-date with the base branch.",Q="Update with merge commit"),a&&(E=null,i!==Ce.Conflict&&(Q=null)),l.createElement("div",{className:"status-item status-section"},E,l.createElement("p",null,O),Q&&d?l.createElement("div",{className:"button-container"},l.createElement("button",{className:"secondary",onClick:y,disabled:p},Q)):null)},"MergeStatus"),jn=o(({mergeable:i,isSimple:a,isCurrentlyCheckedOut:u,canUpdateBranch:d})=>{const{updateBranch:m}=(0,l.useContext)(U),[p,g]=(0,l.useState)(!1),y=o(()=>{g(!0),m().finally(()=>g(!1))},"update"),E=!u&&i===Ce.Conflict;return!d||E||a||i===Ce.Behind||i===Ce.Conflict||i===Ce.Unknown?null:l.createElement("div",{className:"status-item status-section"},be,l.createElement("p",null,"This branch is out-of-date with the base branch."),l.createElement("button",{className:"secondary",onClick:y,disabled:p},"Update with Merge Commit"))},"OfferToUpdate"),rn=o(({isSimple:i})=>{const[a,u]=(0,l.useState)(!1),{readyForReview:d,updatePR:m}=(0,l.useContext)(U),p=(0,l.useCallback)(async()=>{try{u(!0);const g=await d();m(g)}finally{u(!1)}},[u,d,m]);return l.createElement("div",{className:"ready-for-review-container"},l.createElement("div",{className:"ready-for-review-text-wrapper"},l.createElement("div",{className:"ready-for-review-icon"},i?null:be),l.createElement("div",null,l.createElement("div",{className:"ready-for-review-heading"},"This pull request is still a work in progress."),l.createElement("div",{className:"ready-for-review-meta"},"Draft pull requests cannot be merged."))),l.createElement("div",{className:"button-container"},l.createElement("button",{disabled:a,onClick:p},"Ready for Review")))},"ReadyForReview"),go=o(i=>{const a=(0,l.useContext)(U),u=(0,l.useRef)(),[d,m]=(0,l.useState)(null);return i.mergeQueueMethod?l.createElement("div",null,l.createElement("div",{id:"merge-comment-form"},l.createElement("button",{onClick:o(()=>a.enqueue(),"onClick")},"Add to Merge Queue"))):d?l.createElement(yo,{pr:i,method:d,cancel:o(()=>m(null),"cancel")}):l.createElement("div",{className:"automerge-section wrapper"},l.createElement("button",{onClick:o(()=>m(u.current.value),"onClick")},"Merge Pull Request"),Je,"using method",Je,l.createElement(Nr,{ref:u,...i}))},"Merge"),Dt=o(({pr:i,isSimple:a})=>{var u;const{hasWritePermission:d,canEdit:m,isDraft:p,mergeable:g}=i;if(p)return m?l.createElement(rn,{isSimple:a}):null;if(g===Ce.Mergeable&&d&&!i.mergeQueueEntry)return a?l.createElement(Ii,{...i}):l.createElement(go,{...i});if(!a&&d&&!i.mergeQueueEntry){const y=(0,l.useContext)(U);return l.createElement(Si,{updateState:o(E=>y.updateAutoMerge(E),"updateState"),...i,baseHasMergeQueue:!!i.mergeQueueMethod,defaultMergeMethod:(u=i.autoMergeMethod)!=null?u:i.defaultMergeMethod})}else if(i.mergeQueueEntry)return l.createElement(Ot,{mergeQueueEntry:i.mergeQueueEntry});return null},"PrActions"),Gl=o(()=>{const{openOnGitHub:i}=useContext(PullRequestContext);return React.createElement("button",{id:"merge-on-github",type:"submit",onClick:o(()=>i(),"onClick")},"Merge on github.com")},"MergeOnGitHub"),Ii=o(i=>{const{merge:a,updatePR:u}=(0,l.useContext)(U);async function d(p){const g=await a({title:"",description:"",method:p});u(g)}o(d,"submitAction");const m=Object.keys(xt).filter(p=>i.mergeMethodsAvailability[p]).reduce((p,g)=>(p[g]=xt[g],p),{});return l.createElement(Di,{options:m,defaultOption:i.defaultMergeMethod,submitAction:d})},"MergeSimple"),Xl=o(i=>{const{deleteBranch:a}=(0,l.useContext)(U),[u,d]=(0,l.useState)(!1);return i.isRemoteHeadDeleted!==!1&&i.isLocalHeadDeleted!==!1?l.createElement("div",null):l.createElement("div",{className:"branch-status-container"},l.createElement("form",{onSubmit:o(async m=>{m.preventDefault();try{d(!0);const p=await a();p&&p.cancelled&&d(!1)}finally{d(!1)}},"onSubmit")},l.createElement("button",{disabled:u,className:"secondary",type:"submit"},"Delete Branch...")))},"DeleteBranch");function yo({pr:i,method:a,cancel:u}){const{merge:d,updatePR:m,changeEmail:p}=(0,l.useContext)(U),[g,y]=(0,l.useState)(!1),E=i.emailForCommit;return l.createElement("div",null,l.createElement("form",{id:"merge-comment-form",onSubmit:o(async O=>{O.preventDefault();try{y(!0);const{title:Q,description:Y}=O.target,W=await d({title:Q==null?void 0:Q.value,description:Y==null?void 0:Y.value,method:a,email:E});m(W)}finally{y(!1)}},"onSubmit")},a==="rebase"?null:l.createElement("input",{type:"text",name:"title",defaultValue:Jl(a,i)}),a==="rebase"?null:l.createElement("textarea",{name:"description",defaultValue:gn(a,i)}),a==="rebase"||!E?null:l.createElement("div",{className:"commit-association"},l.createElement("span",null,"Commit will be associated with ",l.createElement("button",{className:"input-box",title:"Change email","aria-label":"Change email",disabled:g,onClick:o(()=>{y(!0),p(E).finally(()=>y(!1))},"onClick")},E))),l.createElement("div",{className:"form-actions",id:a==="rebase"?"rebase-actions":""},l.createElement("button",{className:"secondary",onClick:u},"Cancel"),l.createElement("button",{disabled:g,type:"submit",id:"confirm-merge"},a==="rebase"?"Confirm ":"",xt[a]))))}o(yo,"ConfirmMerge");function Jl(i,a){var u,d,m,p;switch(i){case"merge":return(d=(u=a.mergeCommitMeta)==null?void 0:u.title)!=null?d:`Merge pull request #${a.number} from ${a.head}`;case"squash":return(p=(m=a.squashCommitMeta)==null?void 0:m.title)!=null?p:`${a.title} (#${a.number})`;default:return""}}o(Jl,"getDefaultTitleText");function gn(i,a){var u,d,m,p;switch(i){case"merge":return(d=(u=a.mergeCommitMeta)==null?void 0:u.description)!=null?d:a.title;case"squash":return(p=(m=a.squashCommitMeta)==null?void 0:m.description)!=null?p:"";default:return""}}o(gn,"getDefaultDescriptionText");const xt={merge:"Create Merge Commit",squash:"Squash and Merge",rebase:"Rebase and Merge"},Nr=l.forwardRef(({defaultMergeMethod:i,mergeMethodsAvailability:a,onChange:u,ariaLabel:d,name:m,title:p,disabled:g},y)=>l.createElement("select",{ref:y,defaultValue:i,onChange:u,disabled:g,"aria-label":d!=null?d:"Select merge method",name:m,title:p},Object.entries(xt).map(([E,O])=>l.createElement("option",{key:E,value:E,disabled:!a[E]},O,a[E]?null:" (not enabled)")))),Mr=o(({statuses:i})=>l.createElement("div",{className:"status-scroll"},i.map(a=>l.createElement("div",{key:a.id,className:"status-check"},l.createElement("div",{className:"status-check-details"},l.createElement(Bn,{state:a.state}),l.createElement(it,{for:{avatarUrl:a.avatarUrl,url:a.url}}),l.createElement("span",{className:"status-check-detail-text"},a.workflowName?`${a.workflowName} / `:null,a.context,a.event?` (${a.event})`:null," ",a.description?`\u2014 ${a.description}`:null)),l.createElement("div",null,a.isRequired?l.createElement("span",{className:"label"},"Required"):null,a.targetUrl?l.createElement("a",{href:a.targetUrl,title:a.targetUrl},"Details"):null)))),"StatusCheckDetails");function Hi(i){const a=eo(i,d=>{switch(d.state){case B.Success:case B.Failure:case B.Neutral:return d.state;default:return B.Pending}}),u=[];for(const d of Object.keys(a)){const m=a[d].length;let p="";switch(d){case B.Success:p="successful";break;case B.Failure:p="failed";break;case B.Neutral:p="skipped";break;default:p="pending"}const g=m>1?`${m} ${p} checks`:`${m} ${p} check`;u.push(g)}return u.join(" and ")}o(Hi,"getSummaryLabel");function Bn({state:i}){switch(i){case B.Neutral:return pt;case B.Success:return Te;case B.Failure:return Lt}return Pn}o(Bn,"StateIcon");function Rr({state:i}){switch(i){case B.Pending:return On;case B.Failure:return Lt}return Te}o(Rr,"RequiredReviewStateIcon");function vt(i){const a=i.approvals.length,u=i.requestedChanges.length,d=i.count;switch(i.state){case B.Failure:return`At least ${d} approving review${d>1?"s":""} is required by reviewers with write access.`;case B.Pending:return`${u} review${u>1?"s":""} requesting changes by reviewers with write access.`}return`${a} approving review${a>1?"s":""} by reviewers with write access.`}o(vt,"getRequiredReviewSummary");const es=["copilot-pull-request-reviewer","copilot-swe-agent","Copilot"];function ts(i){const{name:a,canDelete:u,color:d}=i,m=pn(d,i.isDarkTheme,!1);return l.createElement("div",{className:"section-item label",style:{backgroundColor:m.backgroundColor,color:m.textColor,borderColor:`${m.borderColor}`,paddingRight:u?"2px":"8px"}},a,i.children)}o(ts,"Label");function ns(i){const{name:a,color:u}=i,d=gitHubLabelColor(u,i.isDarkTheme,!1);return React.createElement("li",{style:{backgroundColor:d.backgroundColor,color:d.textColor,borderColor:`${d.borderColor}`}},a,i.children)}o(ns,"LabelCreate");function Fi({reviewers:i,labels:a,hasWritePermission:u,isIssue:d,projectItems:m,milestone:p,assignees:g,canAssignCopilot:y}){const{addReviewers:E,addAssignees:O,addAssigneeYourself:Q,addAssigneeCopilot:Y,addLabels:W,removeLabel:De,changeProjects:je,addMilestone:ze,updatePR:Ee,pr:Ie}=(0,l.useContext)(U),[Fe,Ze]=(0,l.useState)(!1),st=y&&g.every(Se=>!es.includes(Se.login)),Ye=o(async()=>{const Se=await je();Ee({...Se})},"updateProjects");return l.createElement("div",{id:"sidebar"},d?"":l.createElement("div",{id:"reviewers",className:"section"},l.createElement("div",{className:"section-header",onClick:o(async()=>{const Se=await E();Ee({reviewers:Se.reviewers})},"onClick")},l.createElement("div",{className:"section-title"},"Reviewers"),u?l.createElement("button",{className:"icon-button",title:"Add Reviewers"},Xt):null),i&&i.length?i.map(Se=>l.createElement(Ti,{key:Xe(Se.reviewer),reviewState:Se})):l.createElement("div",{className:"section-placeholder"},"None yet")),l.createElement("div",{id:"assignees",className:"section"},l.createElement("div",{className:"section-header",onClick:o(async Se=>{if(Se.target.closest("#assign-copilot-btn"))return;const Ge=await O();Ee({assignees:Ge.assignees,events:Ge.events})},"onClick")},l.createElement("div",{className:"section-title"},"Assignees"),u?l.createElement("div",{className:"icon-button-group"},st?l.createElement("button",{id:"assign-copilot-btn",className:"icon-button",title:"Assign for Copilot to work on",disabled:Fe,onClick:o(async()=>{Ze(!0);try{const Se=await Y();Ee({assignees:Se.assignees,events:Se.events})}finally{Ze(!1)}},"onClick")},ni):null,l.createElement("button",{className:"icon-button",title:"Add Assignees"},Xt)):null),g&&g.length?g.map((Se,Wt)=>l.createElement("div",{key:Wt,className:"section-item reviewer"},l.createElement("div",{className:"avatar-with-author"},l.createElement(it,{for:Se}),l.createElement(lt,{for:Se})))):l.createElement("div",{className:"section-placeholder"},"None yet",Ie.hasWritePermission?l.createElement(l.Fragment,null,"\u2014",l.createElement("a",{className:"assign-yourself",onClick:o(async()=>{const Se=await Q();Ee({assignees:Se.assignees,events:Se.events})},"onClick")},"assign yourself")):null)),l.createElement("div",{id:"labels",className:"section"},l.createElement("div",{className:"section-header",onClick:o(async()=>{const Se=await W();Ee({labels:Se.added})},"onClick")},l.createElement("div",{className:"section-title"},"Labels"),u?l.createElement("button",{className:"icon-button",title:"Add Labels"},Xt):null),a.length?l.createElement("div",{className:"labels-list"},a.map(Se=>l.createElement(ts,{key:Se.name,...Se,canDelete:u,isDarkTheme:Ie.isDarkTheme},u?l.createElement("button",{className:"icon-button",onClick:o(()=>De(Se.name),"onClick")},Lt,"\uFE0F"):null))):l.createElement("div",{className:"section-placeholder"},"None yet")),Ie.isEnterprise?null:l.createElement("div",{id:"project",className:"section"},l.createElement("div",{className:"section-header",onClick:Ye},l.createElement("div",{className:"section-title"},"Project"),u?l.createElement("button",{className:"icon-button",title:"Add Project"},Xt):null),m?m.length>0?m.map(Se=>l.createElement(os,{key:Se.project.title,...Se,canDelete:u})):l.createElement("div",{className:"section-placeholder"},"None Yet"):l.createElement("a",{onClick:Ye},"Sign in with more permissions to see projects")),l.createElement("div",{id:"milestone",className:"section"},l.createElement("div",{className:"section-header",onClick:o(async()=>{const Se=await ze();Ee({milestone:Se.added})},"onClick")},l.createElement("div",{className:"section-title"},"Milestone"),u?l.createElement("button",{className:"icon-button",title:"Add Milestone"},Xt):null),p?l.createElement(rs,{key:p.title,...p,canDelete:u}):l.createElement("div",{className:"section-placeholder"},"No milestone")))}o(Fi,"Sidebar");function rs(i){const{removeMilestone:a,updatePR:u,pr:d}=(0,l.useContext)(U),m=getComputedStyle(document.documentElement).getPropertyValue("--vscode-badge-foreground"),p=pn(m,d.isDarkTheme,!1),{canDelete:g,title:y}=i;return l.createElement("div",{className:"labels-list"},l.createElement("div",{className:"section-item label",style:{backgroundColor:p.backgroundColor,color:p.textColor,borderColor:`${p.borderColor}`}},y,g?l.createElement("button",{className:"icon-button",onClick:o(async()=>{await a(),u({milestone:void 0})},"onClick")},Lt,"\uFE0F"):null))}o(rs,"Milestone");function os(i){const{removeProject:a,updatePR:u,pr:d}=(0,l.useContext)(U),m=getComputedStyle(document.documentElement).getPropertyValue("--vscode-badge-foreground"),p=pn(m,d.isDarkTheme,!1),{canDelete:g}=i;return l.createElement("div",{className:"labels-list"},l.createElement("div",{className:"section-item label",style:{backgroundColor:p.backgroundColor,color:p.textColor,borderColor:`${p.borderColor}`}},i.project.title,g?l.createElement("button",{className:"icon-button",onClick:o(async()=>{var y;await a(i),u({projectItems:(y=d.projectItems)==null?void 0:y.filter(E=>E.id!==i.id)})},"onClick")},Lt,"\uFE0F"):null))}o(os,"Project");var Co=(i=>(i[i.ADD=0]="ADD",i[i.COPY=1]="COPY",i[i.DELETE=2]="DELETE",i[i.MODIFY=3]="MODIFY",i[i.RENAME=4]="RENAME",i[i.TYPE=5]="TYPE",i[i.UNKNOWN=6]="UNKNOWN",i[i.UNMERGED=7]="UNMERGED",i))(Co||{});const Po=class Po{constructor(a,u,d,m,p,g,y){this.baseCommit=a,this.status=u,this.fileName=d,this.previousFileName=m,this.patch=p,this.diffHunks=g,this.blobUrl=y}};o(Po,"file_InMemFileChange");let yn=Po;const Oo=class Oo{constructor(a,u,d,m,p){this.baseCommit=a,this.blobUrl=u,this.status=d,this.fileName=m,this.previousFileName=p}};o(Oo,"file_SlimFileChange");let zi=Oo;var Vi=Object.defineProperty,$i=o((i,a,u)=>a in i?Vi(i,a,{enumerable:!0,configurable:!0,writable:!0,value:u}):i[a]=u,"diffHunk_defNormalProp"),At=o((i,a,u)=>$i(i,typeof a!="symbol"?a+"":a,u),"diffHunk_publicField"),wo=(i=>(i[i.Context=0]="Context",i[i.Add=1]="Add",i[i.Delete=2]="Delete",i[i.Control=3]="Control",i))(wo||{});const Do=class Do{constructor(a,u,d,m,p,g=!0){this.type=a,this.oldLineNumber=u,this.newLineNumber=d,this.positionInHunk=m,this._raw=p,this.endwithLineBreak=g}get raw(){return this._raw}get text(){return this._raw.substr(1)}};o(Do,"DiffLine");let Un=Do;function ji(i){switch(i[0]){case" ":return 0;case"+":return 1;case"-":return 2;default:return 3}}o(ji,"getDiffChangeType");const Ao=class Ao{constructor(a,u,d,m,p){this.oldLineNumber=a,this.oldLength=u,this.newLineNumber=d,this.newLength=m,this.positionInHunk=p,At(this,"diffLines",[])}};o(Ao,"DiffHunk");let Bt=Ao;const Bi=/^@@ \-(\d+)(,(\d+))?( \+(\d+)(,(\d+)?)?)? @@/;function is(i){let a=0,u=0;for(;(u=i.indexOf("\r",u))!==-1;)u++,a++;return a}o(is,"countCarriageReturns");function*ls(i){let a=0;for(;a!==-1&&a<i.length;){const u=a;a=i.indexOf(`
`,a);let m=(a!==-1?a:i.length)-u;a!==-1&&(a>0&&i[a-1]==="\r"&&m--,a++),yield i.substr(u,m)}}o(ls,"LineReader");function*Ui(i){const a=ls(i);let u=a.next(),d,m=-1,p=-1,g=-1;for(;!u.done;){const y=u.value;if(Bi.test(y)){d&&(yield d,d=void 0),m===-1&&(m=0);const E=Bi.exec(y),O=p=Number(E[1]),Q=Number(E[3])||1,Y=g=Number(E[5]),W=Number(E[7])||1;d=new Bt(O,Q,Y,W,m),d.diffLines.push(new Un(3,-1,-1,m,y))}else if(d){const E=ji(y);if(E===3)d.diffLines&&d.diffLines.length&&(d.diffLines[d.diffLines.length-1].endwithLineBreak=!1);else{d.diffLines.push(new Un(E,E!==1?p:-1,E!==2?g:-1,m,y));const O=1+is(y);switch(E){case 0:p+=O,g+=O;break;case 2:p+=O;break;case 1:g+=O;break}}}m!==-1&&++m,u=a.next()}d&&(yield d)}o(Ui,"parseDiffHunk");function Wi(i){const a=Ui(i);let u=a.next();const d=[];for(;!u.done;){const m=u.value;d.push(m),u=a.next()}return d}o(Wi,"parsePatch");function ss(i){const a=[],u=o(E=>({diffLines:[],newLength:0,oldLength:0,oldLineNumber:E.oldLineNumber,newLineNumber:E.newLineNumber,positionInHunk:0}),"newHunk");let d,m;const p=o((E,O)=>{E.diffLines.push(O),O.type===2?E.oldLength++:O.type===1?E.newLength++:O.type===0&&(E.oldLength++,E.newLength++)},"addLineToHunk"),g=o(E=>E.diffLines.some(O=>O.type!==0),"hunkHasChanges"),y=o(E=>g(E)&&E.diffLines[E.diffLines.length-1].type===0,"hunkHasSandwichedChanges");for(const E of i.diffLines)E.type===0?(d||(d=u(E)),p(d,E),y(d)&&(m||(m=u(E)),p(m,E))):(d||i.oldLineNumber===1&&(E.type===2||E.type===1))&&(d||(d=u(E)),y(d)&&(a.push(d),d=m,m=void 0),(E.type===2||E.type===1)&&p(d,E));return d&&a.push(d),a}o(ss,"splitIntoSmallerHunks");function as(i,a){const u=i.split(/\r?\n/),d=Ui(a);let m=d.next();const p=[],g=[];let y=0,E=!0;for(;!m.done;){const O=m.value;p.push(O);const Q=O.oldLineNumber;for(let Y=y+1;Y<Q;Y++)g.push(u[Y-1]);y=Q+O.oldLength-1;for(let Y=0;Y<O.diffLines.length;Y++){const W=O.diffLines[Y];if(!(W.type===2||W.type===3))if(W.type===1)g.push(W.text);else{const De=W.text;g.push(De)}}if(m=d.next(),m.done){for(let Y=O.diffLines.length-1;Y>=0;Y--)if(O.diffLines[Y].type!==2){E=O.diffLines[Y].endwithLineBreak;break}}}if(E)if(y<u.length)for(let O=y+1;O<=u.length;O++)g.push(u[O-1]);else g.push("");return g.join(`
`)}o(as,"getModifiedContentFromDiffHunk");function Wn(i){switch(i){case"removed":return GitChangeType.DELETE;case"added":return GitChangeType.ADD;case"renamed":return GitChangeType.RENAME;case"modified":return GitChangeType.MODIFY;default:return GitChangeType.UNKNOWN}}o(Wn,"getGitChangeType");async function Pr(i,a){var u;const d=[];for(let m=0;m<i.length;m++){const p=i[m],g=Wn(p.status);if(!p.patch&&g!==GitChangeType.RENAME&&g!==GitChangeType.MODIFY&&!(g===GitChangeType.ADD&&p.additions===0)){d.push(new SlimFileChange(a,p.blob_url,g,p.filename,p.previous_filename));continue}const y=p.patch?Wi(p.patch):void 0;d.push(new InMemFileChange(a,g,p.filename,p.previous_filename,(u=p.patch)!=null?u:"",y,p.blob_url))}return d}o(Pr,"parseDiff");function us({hunks:i}){return l.createElement("div",{className:"diff"},i.map((a,u)=>l.createElement(cs,{key:u,hunk:a})))}o(us,"Diff");const Or=us,cs=o(({hunk:i,maxLines:a=8})=>l.createElement(l.Fragment,null,i.diffLines.slice(-a).map(u=>l.createElement("div",{key:xo(u),className:`diffLine ${qi(u.type)}`},l.createElement(Eo,{num:u.oldLineNumber}),l.createElement(Eo,{num:u.newLineNumber}),l.createElement("div",{className:"diffTypeSign"},u._raw.substr(0,1)),l.createElement("div",{className:"lineContent"},u._raw.substr(1))))),"Hunk"),xo=o(i=>`${i.oldLineNumber}->${i.newLineNumber}`,"keyForDiffLine"),Eo=o(({num:i})=>l.createElement("div",{className:"lineNumber"},i>0?i:" "),"LineNumber"),qi=o(i=>wo[i].toLowerCase(),"getDiffChangeClass");function Zi(i){return i.event===J.Assigned||i.event===J.Unassigned}o(Zi,"isAssignUnassignEvent");const ds=o(({events:i,isIssue:a})=>{var u,d,m,p;const g=[];for(let y=0;y<i.length;y++)if(y>0&&Zi(i[y])&&Zi(g[g.length-1])){const E=g[g.length-1],O=i[y];if(E.actor.login===O.actor.login&&new Date(E.createdAt).getTime()+1e3*60*10>new Date(O.createdAt).getTime()){const Q=E.assignees||[],Y=E.unassignees||[],W=(d=(u=O.assignees)==null?void 0:u.filter(je=>!Q.some(ze=>ze.id===je.id)))!=null?d:[],De=(p=(m=O.unassignees)==null?void 0:m.filter(je=>!Y.some(ze=>ze.id===je.id)))!=null?p:[];E.assignees=[...Q,...W],E.unassignees=[...Y,...De],E.createdAt=O.createdAt}else g.push(O)}else g.push(i[y]);return l.createElement(l.Fragment,null,g.map(y=>{switch(y.event){case J.Committed:return l.createElement(fs,{key:`commit${y.id}`,...y});case J.Reviewed:return l.createElement(hs,{key:`review${y.id}`,...y});case J.Commented:return l.createElement(Ki,{key:`comment${y.id}`,...y});case J.Merged:return l.createElement(Yi,{key:`merged${y.id}`,...y});case J.Assigned:return l.createElement(Cn,{key:`assign${y.id}`,event:y});case J.Unassigned:return l.createElement(Cn,{key:`unassign${y.id}`,event:y});case J.HeadRefDeleted:return l.createElement(Gi,{key:`head${y.id}`,...y});case J.CrossReferenced:return l.createElement(Zn,{key:`cross${y.id}`,...y});case J.Closed:return l.createElement(vs,{key:`closed${y.id}`,event:y,isIssue:a});case J.Reopened:return l.createElement(gs,{key:`reopened${y.id}`,event:y,isIssue:a});case J.NewCommitsSinceReview:return l.createElement(ms,{key:`newCommits${y.id}`});case J.CopilotStarted:return l.createElement(on,{key:`copilotStarted${y.id}`,...y});case J.CopilotFinished:return l.createElement(ys,{key:`copilotFinished${y.id}`,...y});default:throw new mr(y)}}))},"Timeline"),va=null,fs=o(i=>l.createElement("div",{className:"comment-container commit"},l.createElement("div",{className:"commit-message"},Il,Je,l.createElement("div",{className:"avatar-container"},l.createElement(it,{for:i.author})),l.createElement("div",{className:"message-container"},l.createElement("a",{className:"message",href:i.htmlUrl,title:i.htmlUrl},i.message.substr(0,i.message.indexOf(`
`)>-1?i.message.indexOf(`
`):i.message.length)))),l.createElement("div",{className:"timeline-detail"},l.createElement("a",{className:"sha",href:i.htmlUrl,title:i.htmlUrl},i.sha.slice(0,7)),l.createElement(ut,{date:i.committedDate}))),"CommitEventView"),ms=o(()=>{const{gotoChangesSinceReview:i}=(0,l.useContext)(U);return l.createElement("div",{className:"comment-container commit"},l.createElement("div",{className:"commit-message"},Hl,Je,l.createElement("span",{style:{fontWeight:"bold"}},"New changes since your last Review")),l.createElement("button",{"aria-live":"polite",title:"View the changes since your last review",onClick:o(()=>i(),"onClick")},"View Changes"))},"NewCommitsSinceReviewEventView"),qn=o(i=>i.position!==null?`pos:${i.position}`:`ori:${i.originalPosition}`,"positionKey"),ps=o(i=>eo(i,a=>a.path+":"+qn(a)),"groupCommentsByPath"),hs=o(i=>{const a=ps(i.comments),u=i.state==="PENDING";return l.createElement($t,{comment:i,allowEmpty:!0},i.comments.length?l.createElement("div",{className:"comment-body review-comment-body"},Object.entries(a).map(([d,m])=>l.createElement(ko,{key:d,thread:m,event:i}))):null,u?l.createElement(Qi,null):null)},"ReviewEventView");function ko({thread:i,event:a}){var u;const d=i[0],[m,p]=(0,l.useState)(!d.isResolved),[g,y]=(0,l.useState)(!!d.isResolved),{openDiff:E,toggleResolveComment:O}=(0,l.useContext)(U),Q=a.reviewThread&&(a.reviewThread.canResolve&&!a.reviewThread.isResolved||a.reviewThread.canUnresolve&&a.reviewThread.isResolved),Y=o(()=>{if(a.reviewThread){const W=!g;p(!W),y(W),O(a.reviewThread.threadId,i,W)}},"toggleResolve");return l.createElement("div",{key:a.id,className:"diff-container"},l.createElement("div",{className:"resolved-container"},l.createElement("div",null,d.position===null?l.createElement("span",null,l.createElement("span",null,d.path),l.createElement("span",{className:"outdatedLabel"},"Outdated")):l.createElement("a",{className:"diffPath",onClick:o(()=>E(d),"onClick")},d.path),!g&&!m?l.createElement("span",{className:"unresolvedLabel"},"Unresolved"):null),l.createElement("button",{className:"secondary",onClick:o(()=>p(!m),"onClick")},m?"Hide":"Show")),m?l.createElement("div",null,l.createElement(Or,{hunks:(u=d.diffHunks)!=null?u:[]}),i.map(W=>l.createElement($t,{key:W.id,comment:W})),Q?l.createElement("div",{className:"resolve-comment-row"},l.createElement("button",{className:"secondary comment-resolve",onClick:o(()=>Y(),"onClick")},g?"Unresolve Conversation":"Resolve Conversation")):null):null)}o(ko,"CommentThread");function Qi(){const{requestChanges:i,approve:a,submit:u,pr:d}=(0,l.useContext)(U),{isAuthor:m}=d,p=(0,l.useRef)(),[g,y]=(0,l.useState)(!1);async function E(Q,Y){Q.preventDefault();const{value:W}=p.current;switch(y(!0),Y){case ne.RequestChanges:await i(W);break;case ne.Approve:await a(W);break;default:await u(W)}y(!1)}o(E,"submitAction");const O=o(Q=>{(Q.ctrlKey||Q.metaKey)&&Q.key==="Enter"&&E(Q,ne.Comment)},"onKeyDown");return l.createElement("form",null,l.createElement("textarea",{id:"pending-review",ref:p,placeholder:"Leave a review summary comment",onKeyDown:O}),l.createElement("div",{className:"form-actions"},m?null:l.createElement("button",{id:"request-changes",className:"secondary",disabled:g||d.busy,onClick:o(Q=>E(Q,ne.RequestChanges),"onClick")},"Request Changes"),m?null:l.createElement("button",{id:"approve",className:"secondary",disabled:g||d.busy,onClick:o(Q=>E(Q,ne.Approve),"onClick")},"Approve"),l.createElement("button",{disabled:g||d.busy,onClick:o(Q=>E(Q,ne.Comment),"onClick")},"Submit Review")))}o(Qi,"AddReviewSummaryComment");const Ki=o(i=>l.createElement($t,{headerInEditMode:!0,comment:i}),"CommentEventView"),Yi=o(i=>{const{revert:a,pr:u}=(0,l.useContext)(U);return l.createElement("div",{className:"comment-container commit"},l.createElement("div",{className:"commit-message"},Ft,Je,l.createElement("div",{className:"avatar-container"},l.createElement(it,{for:i.user})),l.createElement(lt,{for:i.user}),l.createElement("div",{className:"message"},"merged commit",Je,l.createElement("a",{className:"sha",href:i.commitUrl,title:i.commitUrl},i.sha.substr(0,7)),Je,"into ",i.mergeRef,Je)),u.revertable?l.createElement("div",{className:"timeline-detail"},l.createElement("button",{className:"secondary",disabled:u.busy,onClick:a},"Revert")):null,l.createElement(ut,{href:i.url,date:i.createdAt}))},"MergedEventView"),Gi=o(i=>l.createElement("div",{className:"comment-container commit"},l.createElement("div",{className:"commit-message"},l.createElement("div",{className:"avatar-container"},l.createElement(it,{for:i.actor})),l.createElement(lt,{for:i.actor}),l.createElement("div",{className:"message"},"deleted the ",i.headRef," branch",Je)),l.createElement(ut,{date:i.createdAt})),"HeadDeleteEventView"),Zn=o(i=>{const{source:a}=i;return l.createElement("div",{className:"comment-container commit"},l.createElement("div",{className:"commit-message"},l.createElement("div",{className:"avatar-container"},l.createElement(it,{for:i.actor})),l.createElement(lt,{for:i.actor}),l.createElement("div",{className:"message"},"linked ",l.createElement("a",{href:a.extensionUrl},"#",a.number)," ",a.title,Je,i.willCloseTarget?"which will close this issue":"")),l.createElement(ut,{date:i.createdAt}))},"CrossReferencedEventView");function bo(i){return i.length===0?l.createElement(l.Fragment,null):i.length===1?i[0]:i.length===2?l.createElement(l.Fragment,null,i[0]," and ",i[1]):l.createElement(l.Fragment,null,i.slice(0,-1).map(a=>l.createElement(l.Fragment,null,a,", "))," and ",i[i.length-1])}o(bo,"timeline_joinWithAnd");const Cn=o(({event:i})=>{const{actor:a}=i,u=i.assignees||[],d=i.unassignees||[],m=bo(u.map(y=>l.createElement(lt,{key:y.id,for:y}))),p=bo(d.map(y=>l.createElement(lt,{key:y.id,for:y})));let g;return u.length>0&&d.length>0?g=l.createElement(l.Fragment,null,"assigned ",m," and unassigned ",p):u.length>0?g=l.createElement(l.Fragment,null,"assigned ",m):g=l.createElement(l.Fragment,null,"unassigned ",p),l.createElement("div",{className:"comment-container commit"},l.createElement("div",{className:"commit-message"},l.createElement("div",{className:"avatar-container"},l.createElement(it,{for:a})),l.createElement(lt,{for:a}),l.createElement("div",{className:"message"},g)),l.createElement(ut,{date:i.createdAt}))},"AssignUnassignEventView"),vs=o(({event:i,isIssue:a})=>{const{actor:u,createdAt:d}=i;return l.createElement("div",{className:"comment-container commit"},l.createElement("div",{className:"commit-message"},l.createElement("div",{className:"avatar-container"},l.createElement(it,{for:u})),l.createElement(lt,{for:u}),l.createElement("div",{className:"message"},a?"closed this issue":"closed this pull request")),l.createElement(ut,{date:d}))},"ClosedEventView"),gs=o(({event:i,isIssue:a})=>{const{actor:u,createdAt:d}=i;return l.createElement("div",{className:"comment-container commit"},l.createElement("div",{className:"commit-message"},l.createElement("div",{className:"avatar-container"},l.createElement(it,{for:u})),l.createElement(lt,{for:u}),l.createElement("div",{className:"message"},a?"reopened this issue":"reopened this pull request")),l.createElement(ut,{date:d}))},"ReopenedEventView"),on=o(i=>{const{createdAt:a,onBehalfOf:u,sessionUrl:d}=i;return l.createElement("div",{className:"comment-container commit"},l.createElement("div",{className:"commit-message"},ri,Je,l.createElement("div",{className:"message"},"Copilot started work on behalf of ",l.createElement(lt,{for:u}))),d?l.createElement("div",{className:"timeline-detail"},l.createElement("a",{href:d},l.createElement("button",{className:"secondary"},"View session"))):null,l.createElement(ut,{date:a}))},"CopilotStartedEventView"),ys=o(i=>{const{createdAt:a,onBehalfOf:u}=i;return l.createElement("div",{className:"comment-container commit"},l.createElement("div",{className:"commit-message"},Wr,Je,l.createElement("div",{className:"message"},"Copilot finished work on behalf of ",l.createElement(lt,{for:u}))),l.createElement(ut,{date:a}))},"CopilotFinishedEventView"),Qn=o(i=>{const[a,u]=l.useState(window.matchMedia(i).matches);return l.useEffect(()=>{const d=window.matchMedia(i),m=o(()=>u(d.matches),"documentChangeHandler");return d.addEventListener("change",m),()=>{d.removeEventListener("change",m)}},[i]),a},"useMediaQuery"),Cs=o(i=>{const a=Qn("(max-width: 925px)");return l.createElement(l.Fragment,null,l.createElement("div",{id:"title",className:"title"},l.createElement("div",{className:"details"},l.createElement(Ql,{...i}))),a?l.createElement(l.Fragment,null,l.createElement(Fi,{...i}),l.createElement(_o,{...i})):l.createElement(l.Fragment,null,l.createElement(_o,{...i}),l.createElement(Fi,{...i})))},"Overview"),_o=o(i=>l.createElement("div",{id:"main"},l.createElement("div",{id:"description"},l.createElement($t,{isPRDescription:!0,comment:i})),l.createElement(ds,{events:i.events,isIssue:i.isIssue}),l.createElement(jt,{pr:i,isSimple:!1}),l.createElement(oo,{...i})),"Main");function wn(){(0,se.render)(l.createElement(Lo,null,i=>l.createElement(Cs,{...i})),document.getElementById("app"))}o(wn,"main");function Lo({children:i}){const a=(0,l.useContext)(U),[u,d]=(0,l.useState)(a.pr);return(0,l.useEffect)(()=>{a.onchange=d,d(a.pr)},[]),window.onscroll=q(()=>{a.postMessage({command:"scroll",args:{scrollPosition:{x:window.scrollX,y:window.scrollY}}})},200),a.postMessage({command:"ready"}),a.postMessage({command:"pr.debug",args:"initialized "+(u?"with PR":"without PR")}),u?i(u):l.createElement("div",{className:"loading-indicator"},"Loading...")}o(Lo,"Root"),addEventListener("load",wn)})()})();
