import baseEditForm from '../base/Base.form';

import FileEditFile from './editForm/File.edit.file';

import FileEditDisplay from './editForm/File.edit.display';

export default function(...extend) {
  return baseEditForm([
    {
      key: 'display',
      components: FileEditDisplay
    },
    {
      label: 'File',
      key: 'file',
      weight: 5,
      components: FileEditFile
    }
  ], ...extend);
}
