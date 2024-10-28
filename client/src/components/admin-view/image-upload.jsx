import React, { useRef } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { UploadCloudIcon } from "lucide-react";
import { FileIcon } from "lucide-react";
import { Button } from "../ui/button";
import { XIcon } from "lucide-react";
import { useEffect } from "react";
import axios from 'axios';
import { Skeleton } from "../ui/skeleton";

const ImageUpload = ({
  imageFile,
  setImageFile,
  imageLoading,
  setImageLoading,
  //isEditMode,
  setFormData,
}) => {


  const inupuField=useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      setImageFile(file); // Update state with the selected file
    }
  };

  const handleDragOver=(e)=>{
    e.preventDefault();
  }

  const handleDrop=(e)=>{
    e.preventDefault();
    const droppedFile= e.dataTransfer.files[0];
    if(droppedFile) setImageFile(droppedFile);

  }

  const handleRemoverImage=()=>{
    setImageFile(null);
    if(inupuField.current){
      inupuField.current.value=null
    }
  }

  const uploadImagetoCloudnary=async()=>{
    setImageLoading(true);
    const formData= new FormData();
    formData.append('my_file',imageFile)

    const response=await axios.post('http://localhost:5000/api/admin/products/upload',formData).then(res=>res.data)
    if(response.success){
      setFormData({...formData,image:response.result.url})
      setImageLoading(false)
    } 
  }

  useEffect(()=>{
    if(imageFile!== null) uploadImagetoCloudnary();
  },[imageFile])
  return (
    <div className="w-full m-auto mt-4">
      <Label className="text-lg font-semibold ">Upload Image</Label>
      <div onDragOver={handleDragOver} onDrop={handleDrop} className="border-2 border-dashed rounded-lg p-4 mt-2">
        <Input
          className="hidden"
          id="image-upload"
          type="file"
          onChange={handleImageChange}
          ref={inupuField}
         // disabled={isEditMode}
        ></Input>
        {!imageFile ? (
          <Label htmlFor='image-upload' className={` w-full   h-32 max-w-md flex flex-col items-center justify-center cursor-pointer`}>
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground" />
            <span>Drag and drop or click to upload</span>
          </Label>
        ) : (
          imageLoading ? <Skeleton className='h-10'></Skeleton> :
          <div className='flex items-center justify-between'>
            <div className="flex items-center">
              <FileIcon className="w-8 h-8 text-primary mr-2" />
            </div>
            <p className="text-sm font-medium">{imageFile.name}</p>
            <Button variant='ghost' size='icon' className='text-muted-foreground hover:text-foreground' onClick={handleRemoverImage}>
              <XIcon className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
