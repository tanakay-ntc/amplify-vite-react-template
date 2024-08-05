import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { useEffect, useState } from 'react';
import type { Schema } from '../amplify/data/resource';
import { generateClient } from 'aws-amplify/data';
import { uploadData } from 'aws-amplify/storage';
import { DefaultStorageManagerExample } from '../src/components/Elements/upload';
import { FileList } from '../src/components/Elements/list';



const client = generateClient<Schema>();

function App() {
  //const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  useEffect(() => {
  const [file, setFile] = useState<File | undefined>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setFile(files[0]);
    }
  };

  const handleUpload = () => {
    if (file) { // file が undefined でないことを確認
      uploadData({
        path: `picture-submissions/${file.name}`,
        data: file,
      })
      alert(`${file.name}がアップロードされました。`)
  } else{
    alert(`ファイルが選択されていません。`)
  }; 
};

  return (
    <main>
      <h1> Welcome to {user?.signInDetails?.loginId}</h1>
      <button onClick={signOut}>Sign out</button>
      <DefaultStorageManagerExample/>
+     <FileList/>
    </main>       
  );
}

export default App;
