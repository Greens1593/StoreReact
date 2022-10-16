import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Form, Image } from "react-bootstrap";
import { Context } from "..";

const DeviceLauncher = observer(({ foundDevice, onClick, id }) => {
  const { device } = useContext(Context);
  const brands = device.brands;
  const types = device.types;
  const foundBrand = brands.filter((brand) => brand.id === foundDevice.brandId);
  const foundType = types.filter((type) => type.id === foundDevice.typeId);

  const boxRef = React.createRef();

  const handleMouseEnter = () => {
    boxRef.current.style.border = "2px solid blue";
  };

  const handleMouseLeave = () => {
    boxRef.current.style.border = "3px white solid";
  };

  return (
    <div
      className="deviceLauncher d-flex flex-nowrap justify-content-between"
      style={{
        width: "99%",
        marginLeft: 3,
        border: "3px white solid",
        cursor: "pointer",
      }}
      border={"light"}
      ref={boxRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <Image
        width={40}
        height={40}
        src={process.env.REACT_APP_API_URL + "/" + foundDevice.img}
        alt={foundDevice.name}
        id={foundDevice.id}
      />
      <div>{foundType.map((type) => type.name)}</div>
      <div>{foundBrand.map((brand) => brand.name)}</div>
      <div>{foundDevice.name}</div>
      <Form.Check type="checkbox" id={id} />
    </div>
  );
});

export default DeviceLauncher;
