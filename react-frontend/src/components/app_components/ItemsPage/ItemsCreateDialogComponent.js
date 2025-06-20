import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import initilization from "../../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";

const getSchemaValidationErrorsStrings = (errorObj) => {
  let errMsg = {};
  for (const key in errorObj.errors) {
    if (Object.hasOwnProperty.call(errorObj.errors, key)) {
      const element = errorObj.errors[key];
      if (element?.message) {
        errMsg[key] = element.message;
      }
    }
  }
  return Object.keys(errMsg).length
    ? errMsg
    : errorObj.message
      ? { error: errorObj.message }
      : {};
};

const ItemsCreateDialogComponent = (props) => {
  const [_entity, set_entity] = useState({});
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [isImageValid, setIsImageValid] = useState(true);
  const urlParams = useParams();

  useEffect(() => {
    let init = {
      title: "",
      type: "",
      qty: 0,
      price: 0,
      discount: 0,
      imageUrl: "",
      description: "",
      productLink: "",
    };

    if (!_.isEmpty(props?.entity)) {
      init = initilization({ ...init, ...props?.entity }, [], setError);
    }

    set_entity(init);
    setError({});
  }, [props.show]);

  const validate = () => {
    let ret = true;
    const error = {};

    if (_.isEmpty(_entity?.title)) {
      error["Title"] = `Title field is required`;
      ret = false;
    }

    if (_.isEmpty(_entity?.type)) {
      error["Type"] = `Type field is required`;
      ret = false;
    }

    if (_.isEmpty(_entity?.description)) {
      error["Description"] = "Description field is required";
      ret = false;
    }

    if (!_.isEmpty(_entity?.productLink)) {
      const isValidUrl = /^(https?:\/\/)[^\s/$.?#].[^\s]*$/i.test(
        _entity.productLink
      );
      if (!isValidUrl) {
        error["Product Link"] =
          "Product Link must be a valid URL (starting with http:// or https://)";
        ret = false;
      }
    }

    if (
      _entity?.discount !== undefined &&
      _entity?.price !== undefined &&
      _entity.discount > _entity.price
    ) {
      error["Discount"] = "Discount cannot be greater than price";
      ret = false;
    }

    if (_.isEmpty(_entity?.imageUrl)) {
      error["Images"] = "Image is required.";
      ret = false;
    }

    setError(error);
    return ret;
  };

  const handleImageUpload = async (file) => {
    if (!file) return;

    const isValid = ["image/png", "image/jpeg"].includes(file.type);
    setIsImageValid(isValid);

    if (!isValid) {
      props.alert({
        type: "error",
        title: "Invalid File",
        message: "Only PNG or JPG files are allowed.",
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "oyachess_unsigned");
    formData.append("folder", "oyachess/items");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dwfqzyxsy/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      if (data?.secure_url) {
        set_entity((prev) => ({ ...prev, imageUrl: data.secure_url }));
      } else {
        props.alert({
          type: "error",
          title: "Upload Failed",
          message: "Upload succeeded but no image URL returned.",
        });
      }
    } catch (err) {
      console.error("Upload failed:", err);
      props.alert({
        type: "error",
        title: "Upload Failed",
        message: "Image upload failed. Please try again.",
      });
    }
  };

  const onSave = async () => {
    if (!validate() || !isImageValid) {
      if (!isImageValid) {
        props.alert({
          type: "error",
          title: "Image Error",
          message: "Please upload a valid PNG or JPG image before saving.",
        });
      }
      return;
    }

    const _data = {
      title: _entity?.title,
      type: _entity?.type,
      description: _entity.description,
      qty: _entity?.qty ?? 0,
      price: _entity?.price ?? 0,
      discount: _entity?.discount ?? 0,
      imageUrl: _entity.imageUrl,
      productLink: _entity.productLink,
      createdBy: props.user._id,
      updatedBy: props.user._id,
    };

    console.log("\ud83d\udce4 Submitting to items.create:", _data);

    setLoading(true);

    try {
      const result = await client.service("items").create(_data);
      props.onHide();
      props.alert({
        type: "success",
        title: "Create info",
        message: "Info Items created successfully",
      });
      props.onCreateResult(result);
    } catch (error) {
      console.log("\u274c create() error:", error);
      setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
      props.alert({
        type: "error",
        title: "Create",
        message: "Failed to create in Items",
      });
    }

    setLoading(false);
  };

  const renderFooter = () => (
    <div className="flex justify-content-end">
      <Button
        label="Save"
        className="p-button-text no-focus-effect"
        onClick={onSave}
        loading={loading}
      />
      <Button
        label="Close"
        className="p-button-text no-focus-effect p-button-secondary"
        onClick={props.onHide}
      />
    </div>
  );

  const setValByKey = (key, val) => {
    let new_entity = { ..._entity, [key]: val };
    set_entity(new_entity);
    setError({});
  };

  return (
    <Dialog
      header="Create Items"
      visible={props.show}
      closable={false}
      onHide={props.onHide}
      modal
      style={{ width: "40vw" }}
      className="min-w-max scalein animation-ease-in-out animation-duration-1000"
      footer={renderFooter()}
      resizable={false}
    >
      <div
        className="grid p-fluid overflow-y-auto"
        style={{ maxWidth: "55vw" }}
        role="items-create-dialog-component"
      >
        <div className="col-12 md:col-6 field">
          <label htmlFor="title">Title:</label>
          <InputText
            id="title"
            className="w-full mb-3 p-inputtext-sm"
            value={_entity?.title}
            onChange={(e) => setValByKey("title", e.target.value)}
            required
          />
          <small className="p-error">
            {error["Title"] && <p className="m-0">{error["Title"]}</p>}
          </small>
        </div>

        <div className="col-12 md:col-6 field">
          <label htmlFor="type">Type:</label>
          <InputText
            id="type"
            className="w-full mb-3 p-inputtext-sm"
            value={_entity?.type}
            onChange={(e) => setValByKey("type", e.target.value)}
            required
          />
          <small className="p-error">
            {error["Type"] && <p className="m-0">{error["Type"]}</p>}
          </small>
        </div>

        <div className="col-12 field">
          <label htmlFor="description">Description:</label>
          <InputText
            id="description"
            className="w-full mb-3 p-inputtext-sm"
            value={_entity?.description}
            onChange={(e) => setValByKey("description", e.target.value)}
          />
          <small className="p-error">
            {error["Description"] && (
              <p className="m-0">{error["Description"]}</p>
            )}
          </small>
        </div>

        <div className="col-12 field">
          <label htmlFor="productLink">Product Link (optional):</label>
          <InputText
            id="productLink"
            className="w-full mb-3 p-inputtext-sm"
            value={_entity?.productLink}
            onChange={(e) => setValByKey("productLink", e.target.value)}
            placeholder="https://example.com/item"
          />
          <small className="p-error">
            {error["Link"] && (
              <p className="m-0">{error["Product Link"]}</p>
            )}
          </small>
        </div>

        <div className="col-12 md:col-6 field">
          <label htmlFor="qty">Qty:</label>
          <InputNumber
            id="qty"
            className="w-full mb-3 p-inputtext-sm"
            value={_entity?.qty}
            onValueChange={(e) => setValByKey("qty", e.value)}
          />
        </div>

        <div className="col-12 md:col-6 field">
          <label htmlFor="price">Price:</label>
          <InputNumber
            id="price"
            className="w-full mb-3"
            mode="currency"
            currency="MYR"
            locale="en-US"
            value={_entity?.price}
            onValueChange={(e) => setValByKey("price", e.value)}
          />
        </div>

        <div className="col-12 md:col-6 field">
          <label htmlFor="discount">Discount:</label>
          <InputNumber
            id="discount"
            className="w-full mb-3"
            mode="currency"
            currency="MYR"
            locale="en-US"
            value={_entity?.discount}
            onValueChange={(e) => setValByKey("discount", e.value)}
          />
        </div>

        <div className="col-12 md:col-6 field">
          <label htmlFor="image">Image (PNG or JPG):</label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={(e) => handleImageUpload(e.target.files[0])}
            className="w-full mb-1"
          />
          <small className="p-error">
            {error["Images"] && <p className="m-0">{error["Images"]}</p>}
          </small>
        </div>

        <small className="p-error">
          {Object.keys(error).length > 0 &&
            Object.entries(error).map(([key, msg], i) => (
              <p className="m-0" key={i}>
                {key}: {msg}
              </p>
            ))}
        </small>
      </div>
    </Dialog>
  );
};

const mapState = (state) => {
  const { user } = state.auth;
  return { user };
};

const mapDispatch = (dispatch) => ({
  alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(ItemsCreateDialogComponent);
