import {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { Header, Icon } from 'semantic-ui-react';

interface Props{
  setFiles : (file:any) => void;
}

export default function PhotoWidgetDropZone({setFiles}:Props) {

  const dzstyles = {
    border:'dashed 3px #eeee',
    bordercolor:'#eee',
    borderRadius:'5px',
    paddingTop:'30px',
    textAlign:'center' as 'center',
    hight:200
  }           

  const dzActive = {
    borderColor:'green'
  }

  const onDrop = useCallback((acceptedFiles:any) => {
    setFiles(acceptedFiles.map((file:any)=>Object.assign(file,{
      preview:URL.createObjectURL(file)
    })))
    
  },[setFiles]);
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()} style={isDragActive? {...dzstyles, ...dzstyles}:dzstyles}>
      <input {...getInputProps()} />
      <Icon name='upload' size='huge'/>
      <Header content='Drop image here'/>
    </div>
  )
}