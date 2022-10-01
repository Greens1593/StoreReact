import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Card } from "react-bootstrap";
import { Context } from "../index.js";

const BrandBar = observer(() => {
    const {device} = useContext(Context)
    return (
        <div className='d-flex' style={{flexWrap:'wrap'}}>
            {device.brands.map((brand) => {
        return  <Card key={brand.id}
                    style={{cursor:'pointer'}}
                    className="p-3"
                    border={brand.id === device.selectedBrand.id ? 'danger' : 'light'} 
                    onClick={()=>device.setSelectedBrand(brand)}
                >
                    {brand.name}
                </Card>})}
        </div>
    )       
})

export default BrandBar