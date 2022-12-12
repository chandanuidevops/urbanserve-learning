import React, { useEffect, useState } from "react";
import {
  TextField,
  Dialog,
  DialogContent,
  Grid,
  Box,
  Select,
  MenuItem,
  InputAdornment,
  CircularProgress,
  FormHelperText,
} from "@mui/material";
import { compose } from "redux";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import actions from "../../../Stores/Users/actions";
import CloseIcon from "@mui/icons-material/Close";
import {
  StyledModalHeading,
  ModalCloseButton,
  ModalHeadContainer,
  StyledButton,
  ModalFooterContainer,
  FormLabel,
  StyledFormControl,
} from "../../../Components/StyledComponent";
import CancelButton from "../../../Components/CancelButton";
import CancelIconModal from "../../../Components/CancelIconModal";
import CancelModal from "../../../Components/CancelModal";
import { getRoles } from "../../../Stores/Roles/actions";
import useValidator from "../../../utils/useValidator";
import * as Yup from "yup";
import useShallowEqual from "./../../../utils/useShallowEqual";

const { closeAddModal, saveUser } = actions;

function UserAddModal({
  isModalOpen,
  closeAddModal,
  getRoles,
  isLoadingRoles,
  roles,
  saveUserAction,
  currentUser,
}) {
  const closeModal = closeAddModal;
  const [shallowEqual] = useShallowEqual();
  const [selectedRole, setSelectedRole] = useState("");
  const [initialValuesState, setInitialValuesState] = useState({
    name: "",
    id: "",
    email: "",
    password: "",
    role_id: "",
  });
  const {
    setValues,
    values,
    getFieldProps,
    handleChange,
    handleSubmit,
    handleBlur,
    touched,
    errors,
    clearFormState,
  } = useValidator({
    initialValues: {
      name: "",
      id: "",
      email: "",
      password: "",
      role_id: "",
    },
    onSubmit,
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email().required("Email is required"),
      role_id: Yup.string().required("Role is required"),
      password: Yup.string()
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/)
        .required("Password is required"),
    }),
  });
  function onSubmit(values) {
    saveUserAction({ formData: values });
  }

  useEffect(() => {
    if (isModalOpen) {
      getRoles();
    } else {
      clearFormState();
    }
  }, [isModalOpen]);
  useEffect(() => {
    if (currentUser.id) {
      setInitialValuesState({
        name: currentUser.name,
        id: currentUser.id,
        email: currentUser.email,
        password: "",
        role_id: currentUser.role.id,
      });
      setValues({
        name: currentUser.name,
        id: currentUser.id,
        email: currentUser.email,
        password: "",
        role_id: currentUser.role.id,
      });
      setSelectedRole(currentUser.role.id);
    } else {
      setInitialValuesState({
        name: "",
        id: "",
        email: "",
        password: "",
        role_id: "",
      });
    }
  }, [currentUser]);

  return (
    <Dialog open={isModalOpen} onClose={closeModal} maxWidth="md">
      <ModalHeadContainer>
        <StyledModalHeading>
          {currentUser.id ? "Edit" : "Add"} User
        </StyledModalHeading>
        {shallowEqual(values, initialValuesState) ? (
          <ModalCloseButton onClick={closeModal}>
            <CloseIcon />
          </ModalCloseButton>
        ) : (
          <CancelIconModal onCloses={closeModal} />
        )}
      </ModalHeadContainer>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item sm={6}>
              <FormLabel>Name</FormLabel>
              <StyledFormControl>
                <TextField
                  fullWidth
                  size="small"
                  type="text"
                  variant="outlined"
                  {...getFieldProps("name")}
                  error={errors.name && touched.name}
                  helperText={touched.name && errors.name}
                />
              </StyledFormControl>
            </Grid>
            <Grid item sm={6}>
              <FormLabel>Email</FormLabel>
              <StyledFormControl>
                <TextField
                  fullWidth
                  size="small"
                  type="email"
                  variant="outlined"
                  {...getFieldProps("email")}
                  error={errors.email && touched.email}
                  helperText={touched.email && errors.email}
                />
              </StyledFormControl>
            </Grid>
            <Grid item sm={6}>
              <FormLabel>Password</FormLabel>
              <StyledFormControl>
                <TextField
                  fullWidth
                  size="small"
                  type="password"
                  variant="outlined"
                  {...getFieldProps("password")}
                  error={errors.password && touched.password}
                  helperText={touched.password && errors.password}
                />
              </StyledFormControl>
            </Grid>
            <Grid item sm={6}>
              <FormLabel>User Role</FormLabel>
              <StyledFormControl>
                <Select
                  startAdornment={
                    isLoadingRoles && (
                      <InputAdornment position="start">
                        <CircularProgress size="1.5rem" />
                      </InputAdornment>
                    )
                  }
                  size="small"
                  onBlur={handleBlur("role_id")}
                  value={selectedRole}
                  onChange={(event, newValue) => {
                    handleChange("role_id")({
                      target: { value: event.target.value },
                    });
                    setSelectedRole(event.target.value);
                  }}
                  error={errors.role_id && touched.role_id}
                >
                  {roles.map((role) => (
                    <MenuItem key={role.id} value={role.id}>
                      {role.role_name}
                    </MenuItem>
                  ))}
                </Select>
                {errors.role_id && touched.role_id && (
                  <FormHelperText error={!!(touched.role_id && errors.role_id)}>
                    {errors.role_id}
                  </FormHelperText>
                )}
              </StyledFormControl>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <ModalFooterContainer>
        <Box style={{ marginRight: "1rem" }}>
          <form onSubmit={handleSubmit}>
            {shallowEqual(values, initialValuesState) ? (
              <CancelButton closeModal={closeModal} />
            ) : (
              <CancelModal onCloses={closeModal} />
            )}

            <StyledButton type="submit">
              {currentUser.id ? "Update" : "Save"}
            </StyledButton>
          </form>
        </Box>
      </ModalFooterContainer>
    </Dialog>
  );
}
UserAddModal.prototypes = {
  isModalOpen: PropTypes.bool,
  closeAddModal: PropTypes.func.isRequired,
};
const mapStateToProps = ({ UserReducer, RoleReducer }) => {
  return {
    isModalOpen: UserReducer.isModalOpen,
    isLoadingRoles: RoleReducer.isLoadingRoles,
    roles: RoleReducer.roles,
    currentUser: UserReducer.currentUser,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    closeAddModal: () => dispatch(closeAddModal()),
    getRoles: () => dispatch(getRoles()),
    saveUserAction: (payload) => dispatch(saveUser(payload)),
  };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect)(UserAddModal);
