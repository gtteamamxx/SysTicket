import { NonNullableFormBuilder } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';

export const angularEditorConfig: AngularEditorConfig = {
  editable: true,
  spellcheck: true,
  height: '300px',
  minHeight: '0px',
  maxHeight: 'auto',
  width: 'auto',
  minWidth: '0',
  translate: 'yes',
  enableToolbar: true,
  showToolbar: true,
  placeholder: 'Opis wydarzenia...',
  defaultParagraphSeparator: '',
  defaultFontName: '',
  defaultFontSize: '',
  fonts: [
    { class: 'comic-sans-ms', name: 'Comic Sans MS' },
    { class: 'arial', name: 'Arial' },
    { class: 'calibri', name: 'Calibri' },
  ],
  customClasses: undefined,
  uploadUrl: undefined,
  uploadWithCredentials: false,
  sanitize: true,
  toolbarPosition: 'top',
  toolbarHiddenButtons: [['bold', 'italic'], ['fontSize']],
};
