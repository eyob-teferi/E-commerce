import { Button } from "@/components/ui/button";
import Form from "@/components/common/form";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { useState } from "react";
import ImageUpload from "@/components/admin-view/image-upload";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, deleteProduct, getAllProducts, updateProduct } from "@/store/admin/adminProducts";
import { useToast } from "@/hooks/use-toast";
import AdminProduct from "@/components/admin-view/product-tile";

export const Products = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { products } = useSelector((state) => state.adminProducts);

  const [openProductForm, setOpenProductForm] = useState(false);

  const [imageFile, setImageFile] = useState(null);

  const [editedId, setEditedId] = useState(null);

 

 

  

  const intialState = {
    image: "",
    title: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    salePrice: "",
    totalStock: "",
  };

  const [formData, setFormData] = useState(intialState);

  const [imageLoading, setImageLoading] = useState(false);

  

  const onSubmit = (event) => {
    event.preventDefault();

    editedId !== null ? dispatch(
      updateProduct({id:editedId,formData})
    ).then((data)=>{
      console.log(data);
    if (data?.payload.success) {
      dispatch(getAllProducts());
      setImageFile(null);
      setFormData(intialState);
      setEditedId(null)
      setOpenProductForm(false);
      toast({
        title: data?.payload.message,
      });
    }
    }) :
    dispatch(
      createProduct(formData)
    ).then((data) => {
      console.log(data);
      if (data?.payload.success) {
        dispatch(getAllProducts());
        setImageFile(null);
        setFormData(intialState);
        setOpenProductForm(false);
        toast({
          title: data?.payload.message,
        });
      }
    });
  };

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  const handleDelete=(id)=>{
    dispatch(deleteProduct(id)).then((data) => {
      console.log(data);
      if (data?.payload.success) {
        dispatch(getAllProducts());
        toast({
          title: data?.payload.message,
        });
      }
    })
  }

  const isFormValid=()=> {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

  console.log(formData)
  return (
    <>
      <div className="flex justify-end w-full mb-4">
        <Button onClick={() => setOpenProductForm(!openProductForm)}>
          Add new product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products?.map((product) => (
          <AdminProduct
            key={product._id}
            product={product}
            setEditedId={setEditedId}
            setFormData={setFormData}
            setOpenProductForm={setOpenProductForm}
            handleDelete={handleDelete}
          />
        ))}
      </div>
      <Sheet
        open={openProductForm}
        onOpenChange={() =>{
          setOpenProductForm(!openProductForm);
          setEditedId(null);
          setFormData(intialState);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle className="mb-2 text-lg">{
              editedId !== null ? 'Edit Product' :'Add Product'
              }</SheetTitle>
          </SheetHeader>
          <ImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            imageLoading={imageLoading}
            setImageLoading={setImageLoading}
            // isEditMode={editedId !== null}
            setFormData={setFormData}
            formData={formData}
          />
          <Form
            formControl={addProductFormElements}
            formData={formData}
            setFormData={setFormData}
            onSubmit={onSubmit}
            buttonText={editedId !== null ? 'Edit Product' :'Add Product'}
            isDisabled={!isFormValid()}
          />
        </SheetContent>
      </Sheet>
    </>
  );
};
