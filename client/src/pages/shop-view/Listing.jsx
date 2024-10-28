import Filter from "@/components/shop-view/Filter";
import ShoppingProducTile from "@/components/shop-view/product-tile";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import { getFilterdProducts } from "@/store/shop/shoppingProducts.js";
import { ArrowUpDownIcon } from "lucide-react";
import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const Listing = () => {
  const dispatch= useDispatch();
  const{products}=useSelector(state=>state.shoppingProducts);

  useEffect(()=>{
     dispatch(getFilterdProducts());
  },[dispatch])
  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 px-4 md:px-6">
      <Filter />
      <div className="bg-background rounded-lg w-full shadow-sm">
        <div className="flex border-b p-4 items-center justify-between">
          <h2 className=" text-lg font-extrabold">AllProducts</h2>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">{products?.length} products</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="flex items-center gap-1"
                  variant="outline"
                  size="sm"
                >
                  <ArrowUpDownIcon className="w-4 h-4"></ArrowUpDownIcon>
                  <span>Sort By</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[300px]">
                <DropdownMenuRadioGroup>
                  {sortOptions.map(({ id, label }) => (
                    <DropdownMenuRadioItem key={id} value={id} id={id}>
                      {label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {/* continue here */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
            {
              products?.map(product=><ShoppingProducTile product={product} key={product?._id} />)
            }
        </div>
      </div>
    </div>
  );
};

export default Listing;
