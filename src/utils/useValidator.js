import React, { useCallback, useEffect } from "react";
import deepMerge from "deepmerge";
import { isPlainObject } from "is-plain-object";
const isMergeableObject = (o) => {
  return isPlainObject(o) || o.constructor.name === "Array";
};
const combineMerge = (target, source, options) => {
  const destination = target.slice();

  source.forEach((item, index) => {
    if (typeof destination[index] === "undefined") {
      destination[index] = options.cloneUnlessOtherwiseSpecified(item, options);
    } else if (options.isMergeableObject(item)) {
      destination[index] = deepMerge(target[index], item, options);
    } else if (target.indexOf(item) === -1) {
      destination.push(item);
    }
  });
  return destination;
};
export const createMergeableObject = (str) => (value) => {
  const createObjectOrArray = (key) => (value) => {
    if (isNaN(parseInt(key))) return { [key]: value };
    else {
      const array = [];
      array[key] = value;
      return array;
    }
  };
  if (typeof str === "string" && str) {
    if (str.includes(".") || str.includes("[")) {
      str = str.replace(/\[(\w+)\]/g, ".$1"); // convert indexes to properties
      str = str.replace(/^\./, ""); // strip a leading dot
      const stages = str.split(".");
      let finalObject = createObjectOrArray(stages.pop())(value);
      for (let i = stages.length - 1; i >= 0; i--) {
        finalObject = createObjectOrArray(stages[i])(finalObject);
      }
      return finalObject;
    } else return { [str]: value };
  } else return { [str]: value };
};

const flatten = (obj = {}, prefix = "", res = {}) =>
  Object.entries(obj).reduce((r, [key, val]) => {
    const k = `${prefix}${key}`;
    const getOperator = (k) =>
      isNaN(parseInt(k.split(".").pop()))
        ? `${k}.`
        : `${k.split(".").slice(0, -1).join(".")}[${k.split(".").pop()}].`;
    if (val && typeof val === "object") {
      flatten(val, getOperator(k), r);
    } else {
      res[k] = val;
    }
    return r;
  }, res);

const getAllSelectorsFromNestedObject = (object = {}, newValues) => {
  const objectWithNewValue = flatten(object);
  for (const i in objectWithNewValue) objectWithNewValue[i] = newValues;
  return objectWithNewValue;
};
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_ERRORS":
      return {
        ...state,
        errors: action.payload,
      };
    case "SET_FIELD_TOUCHED":
      return {
        ...state,
        touched: {
          ...state.touched,
          ...action.payload,
        },
      };
    case "SUBMIT_ATTEMPT":
      return {
        ...state,
        isSubmitting: true,
        touched: getAllSelectorsFromNestedObject(state.values, true),
      };

    case "SET_VALUES":
      return {
        ...state,
        values: action.payload,
      };
    case "SET_FIELD_VALUE":
      return {
        ...state,
        values: deepMerge(state.values, action.payload, {
          arrayMerge: combineMerge,
        }),
      };
    case "SUBMIT_SUCCESS":
      return {
        ...state,
        isSubmitting: false,
      };
    case "SUBMIT_FAILURE":
      return {
        ...state,
        isSubmitting: false,
        submitError: action.payload,
      };
    case "CLEAR_STATE":
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

const useValidator = (props) => {
  if (!props.onSubmit) {
    throw new Error("You forgot to pass onSubmit to useValidator");
  }
  if (!props.validationSchema) {
    throw new Error("You forgot to pass validationSchema to useValidator");
  }
  const [state, dispatch] = React.useReducer(reducer, {
    values: props.initialValues,
    errors: {},
    touched: {},
    isSubmitting: false,
  });
  const validate = useCallback(
    (values) => {
      if (props.validate) {
      } else if (props.validationSchema) {
        try {
          props.validationSchema.validateSync(values, {
            abortEarly: false,
          });
        } catch (e) {
          const errors = {};
          if (Array.isArray(e.inner)) {
            for (const err of e.inner) {
              errors[err.path] = err.message;
            }
            return errors;
          }
          return errors;
        }
        return {};
      }
    },
    [props.validationSchema, props.validate]
  );
  const setValues = (values) => {
    dispatch({
      type: "SET_VALUES",
      payload: values,
    });
  };

  const getFieldProps = (fieldname) => ({
    value: state.values[fieldname] ?? "",
    onChange: handleChange(fieldname),
    onBlur: handleBlur(fieldname),
  });

  const handleChange = (fieldname) => (event) => {
    dispatch({
      type: "SET_FIELD_VALUE",
      payload: createMergeableObject(fieldname)(
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value
      ),
    });
  };
  const clearFormState = () => {
    dispatch({
      type: "CLEAR_STATE",
      payload: {
        values: props.initialValues,
        errors: {},
        touched: {},
      },
    });
  };
  const handleBlur = (fieldName) => (event) => {
    dispatch({
      type: "SET_FIELD_TOUCHED",
      payload: { [fieldName]: true },
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch({ type: "SUBMIT_ATTEMPT" });
    const errors = validate(state.values);
    if (!Object.keys(errors).length) {
      try {
        await props.onSubmit(state.values);
        dispatch({ type: "SUBMIT_SUCCESS" });
      } catch (submitError) {
        dispatch({ type: "SUBMIT_FAILURE", payload: submitError });
      }
    } else {
      dispatch({ type: "SET_ERRORS", payload: errors });
    }
  };
  useEffect(() => {
    if (props.validate || props.validationSchema) {
      const errors = validate(state.values);
      dispatch({ type: "SET_ERRORS", payload: errors });
    }
  }, [state.values]);

  return {
    setValues,
    getFieldProps,
    handleChange,
    handleSubmit,
    clearFormState,
    handleBlur,
    ...state,
  };
};
export default useValidator;
