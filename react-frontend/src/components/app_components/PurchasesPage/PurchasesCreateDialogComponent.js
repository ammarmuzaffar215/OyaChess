import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import initilization from "../../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";

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
  return errMsg.length
    ? errMsg
    : errorObj.message
      ? { error: errorObj.message }
      : {};
};

const PurchasesCreateDialogComponent = (props) => {
  const [_entity, set_entity] = useState({});
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const urlParams = useParams();
  const [userId, setUserId] = useState([]);
  const [itemId, setItemId] = useState([]);

  useEffect(() => {
    let init = {};
    if (!_.isEmpty(props?.entity)) {
      init = initilization(
        { ...props?.entity, ...init },
        [userId, itemId],
        setError,
      );
    }
    set_entity({ ...init });
    setError({});
  }, [props.show]);

  const validate = () => {
    let ret = true;
    const error = {};

    if (!ret) setError(error);
    return ret;
  };

  const onSave = async () => {
    if (!validate()) return;
    let _data = {
      userId: _entity?.userId?._id,
      itemId: _entity?.itemId?._id,
      qty: _entity?.qty,
      total: _entity?.total,
      timestamp: _entity?.timestamp,
      createdBy: props.user._id,
      updatedBy: props.user._id,
    };

    setLoading(true);

    try {
      const result = await client.service("purchases").create(_data);
      const eagerResult = await client.service("purchases").find({
        query: {
          $limit: 10000,
          _id: { $in: [result._id] },
          $populate: [
            {
              path: "userId",
              service: "users",
              select: ["name"],
            },
            {
              path: "itemId",
              service: "items",
              select: ["title"],
            },
          ],
        },
      });
      props.onHide();
      props.alert({
        type: "success",
        title: "Create info",
        message: "Info Purchases updated successfully",
      });
      props.onCreateResult(eagerResult.data[0]);
    } catch (error) {
      console.log("error", error);
      setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
      props.alert({
        type: "error",
        title: "Create",
        message: "Failed to create in Purchases",
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    // on mount users
    client
      .service("users")
      .find({
        query: {
          $limit: 10000,
          $sort: { createdAt: -1 },
          _id: urlParams.singleUsersId,
        },
      })
      .then((res) => {
        setUserId(
          res.data.map((e) => {
            return { name: e["name"], value: e._id };
          }),
        );
      })
      .catch((error) => {
        console.log({ error });
        props.alert({
          title: "Users",
          type: "error",
          message: error.message || "Failed get users",
        });
      });
  }, []);

  useEffect(() => {
    // on mount items
    client
      .service("items")
      .find({
        query: {
          $limit: 10000,
          $sort: { createdAt: -1 },
          _id: urlParams.singleItemsId,
        },
      })
      .then((res) => {
        setItemId(
          res.data.map((e) => {
            return { name: e["title"], value: e._id };
          }),
        );
      })
      .catch((error) => {
        console.log({ error });
        props.alert({
          title: "Items",
          type: "error",
          message: error.message || "Failed get items",
        });
      });
  }, []);

  const renderFooter = () => (
    <div className="flex justify-content-end">
      <Button
        label="save"
        className="p-button-text no-focus-effect"
        onClick={onSave}
        loading={loading}
      />
      <Button
        label="close"
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

  const userIdOptions = userId.map((elem) => ({
    name: elem.name,
    value: elem.value,
  }));
  const itemIdOptions = itemId.map((elem) => ({
    name: elem.name,
    value: elem.value,
  }));

  return (
    <Dialog
      header="Create Purchases"
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
        role="purchases-create-dialog-component"
      >
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="userId">UserId:</label>
            <Dropdown
              id="userId"
              value={_entity?.userId?._id}
              optionLabel="name"
              optionValue="value"
              options={userIdOptions}
              onChange={(e) => setValByKey("userId", { _id: e.value })}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["userId"]) ? (
              <p className="m-0" key="error-userId">
                {error["userId"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="itemId">ItemId:</label>
            <Dropdown
              id="itemId"
              value={_entity?.itemId?._id}
              optionLabel="name"
              optionValue="value"
              options={itemIdOptions}
              onChange={(e) => setValByKey("itemId", { _id: e.value })}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["itemId"]) ? (
              <p className="m-0" key="error-itemId">
                {error["itemId"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="qty">Qty:</label>
            <InputNumber
              id="qty"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.qty}
              onChange={(e) => setValByKey("qty", e.value)}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["qty"]) ? (
              <p className="m-0" key="error-qty">
                {error["qty"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="total">Total:</label>
            <InputNumber
              id="total"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.total}
              onChange={(e) => setValByKey("total", e.value)}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["total"]) ? (
              <p className="m-0" key="error-total">
                {error["total"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="timestamp">Timestamp:</label>
            <Calendar
              id="timestamp"
              value={_entity?.timestamp ? new Date(_entity?.timestamp) : null}
              onChange={(e) => setValByKey("timestamp", e.value)}
              showTime
              hourFormat="24"
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["timestamp"]) ? (
              <p className="m-0" key="error-timestamp">
                {error["timestamp"]}
              </p>
            ) : null}
          </small>
        </div>
        <small className="p-error">
          {Array.isArray(Object.keys(error))
            ? Object.keys(error).map((e, i) => (
                <p className="m-0" key={i}>
                  {e}: {error[e]}
                </p>
              ))
            : error}
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

export default connect(mapState, mapDispatch)(PurchasesCreateDialogComponent);
