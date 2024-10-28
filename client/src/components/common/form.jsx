import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const Form = ({ formControl, formData, onSubmit, setFormData, buttonText, isDisabled }) => {
  

  const returnElementBasedOnType = (element) => {
    const value = formData[element.name];

    switch (element.componentType) {
      case "input":
        return (
          <Input
            id={element.name}
            name={element.name}
            type={element.type}
            placeholder={element.placeholder}
            value={value}
            required
            onChange={(event) => {
              setFormData({
                ...formData,
                [element.name]: event.target.value,
              });
            }}
          />
        );

      case "select":
        return (
          <Select
            required
            
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [element.name]: value,
              })
            }
            value={value}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={element.label} />
            </SelectTrigger>
            <SelectContent>
              {element.options && element.options.length > 0
                ? element.options.map((o) => (
                    <SelectItem key={o.id} value={o.id}>{o.label}</SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );

      case "textarea":
        return (
          <Textarea
            value={value}
            name={element.name}
            placeholder={element.placeholder}
            id={element.id}
            required
            
            onChange={(event) => {
              setFormData({
                ...formData,
                [element.name]: event.target.value,
              });
            }}
          />
        );

      default:
        return (
          <Input
            name={element.name}
            id={element.name}
            type={element.type}
            placeholder={element.placeholder}
            value={value}
            required
            
            onChange={(event) => {
              setFormData({
                ...formData,
                [element.name]: event.target.value,
              });
            }}
          />
        );
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col">
        {formControl.map((element) => (
          <div className="w-full flex flex-col gap-3 mt-2" key={element.name}>
            <Label htmlFor={element.name}>{element.label}</Label>
            {returnElementBasedOnType(element)}
          </div>
        ))}
      </div>
      <Button type="submit" className="w-full mt-4" disabled={isDisabled}>
        {buttonText || "Submit"}
      </Button>
    </form>
  );
};

export default Form;