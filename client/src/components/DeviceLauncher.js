import React, { useContext } from "react";
import { Image} from "react-bootstrap";
import { Context } from "..";

const DeviceLauncher = ({foundDevice}) => {
    const {device} = useContext(Context)
    const brands = device.brands
    const types = device.types
    const foundBrand = brands.filter(brand => brand.id === foundDevice.brandId)
    const foundType = types.filter(type => type.id === foundDevice.typeId)
 
    return (
        <div className="d-flex flex-nowrap justify-content-between" style={{width:480, marginLeft:3}} border={'light'}>
                <Image width={40} height={40} src={process.env.REACT_APP_API_URL + '/' + foundDevice.img} alt={foundDevice.name}/> 
                <div>{foundType.map(type => type.name)}</div>
                <div>{foundBrand.map(brand => brand.name)}</div>
                <div>{foundDevice.name}</div>
        </div>
    )
}

export default DeviceLauncher