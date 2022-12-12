import React, { useEffect, lazy, Suspense, useState } from "react";
import {
  CardContent,
  TableCell,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
} from "@mui/material";
import { compose } from "redux";
import { connect } from "react-redux";
import PageHeader from "../../Components/PageHeader";
import actions from "../../Stores/Users/actions";
import {
  StyledButton,
  MainBox,
  StyledCard,
  StyledTypography,
} from "../../Components/StyledComponent";
import AddIcon from "@mui/icons-material/Add";
import TableLoader from "../../Components/TableLoader";
import TableCellActions from "../../Components/TableCellActions";
import DeleteModal from "../../Components/Dialogs/DeleteModal";
import { PropTypes } from "prop-types";
import { styles } from "./styles";
const UserAddModal = lazy(() => import("./UserAddModal"));
const { getUsers, openAddModal, deleteUser, openEditModal, openViewModal } =
  actions;
function Users({
  getUsers,
  isLoadingUsers,
  users,
  isModalOpen,
  openAddModal,
  user,
  isUserSaving,
  viewUser,
  deleteUser,
  isUserDeleting,
  deletedUser,
  openEditModal,
  openViewModal,
}) {
  const [usersData, setUsersData] = useState([]);
  const [currentDeleteUser, setCurrentDeleteUser] = useState({ open: false });
  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    let allUsers = [];
    if (users.data) {
      if (users.data.length) {
        allUsers = JSON.parse(JSON.stringify(users.data));
      }
    }
    setUsersData(allUsers);
  }, [users]);

  useEffect(() => {
    if (!isUserDeleting) {
      setCurrentDeleteUser({ open: false });
    }
  }, [isUserDeleting]);

  return (
    <>
      <MainBox>
        <PageHeader
          pageTitle={"Users"}
          actions={
            <StyledButton onClick={openAddModal} endIcon={<AddIcon />}>
              Add User
            </StyledButton>
          }
        />
        <StyledCard>
          <CardContent>
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell component="th">Name & Role</TableCell>
                    <TableCell component="th">Email</TableCell>
                    <TableCell component="th">Created at</TableCell>
                    <TableCell component="th">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {isLoadingUsers || !Object.keys(users).length ? (
                    <TableLoader numOfColums={4} />
                  ) : usersData.length > 0 ? (
                    usersData.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{row.created_at}</TableCell>
                        <TableCell>
                          <TableCellActions
                            canView={true}
                            viewMethod={() => openViewModal(row)}
                            canEdit={true}
                            editMethod={() => {
                              openEditModal(row);
                            }}
                            canDelete={true}
                            deleteMethod={() => {
                              setCurrentDeleteUser({
                                id: row.id,
                                open: true,
                                title: `Delete user ${row.name}`,
                                description: (
                                  <>
                                    Performing this action will delete{" "}
                                    <StyledTypography variant="caption">
                                      {row.email}
                                    </StyledTypography>
                                    !
                                  </>
                                ),
                              });
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell>No Recard</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </StyledCard>
      </MainBox>
      <Suspense fallback={null}>
        <UserAddModal />
        <DeleteModal
          open={currentDeleteUser.open}
          details={currentDeleteUser}
          isLoading={isUserDeleting}
          deleteMethod={() => deleteUser(currentDeleteUser.id)}
          onClose={() => setCurrentDeleteUser({ open: false })}
        />
      </Suspense>
    </>
  );
}
Users.prototypes = {
  users: PropTypes.Object,
  isLoadingUsers: PropTypes.bool,
  getUsers: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool,
};
const mapStateToProps = ({ UserReducer }) => {
  return {
    isLoadingUsers: UserReducer.isLoadingUsers,
    users: UserReducer.users,
    isModalOpen: UserReducer.isModalOpen,
    user: UserReducer.user,
    isUserSaving: UserReducer.isUserSaving,
    isUserDeleting: UserReducer.isUserDeleting,
    deletedUser: UserReducer.deletedUser,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: (...args) => dispatch(getUsers(...args)),
    openAddModal: () => dispatch(openAddModal()),
    openEditModal: (item) => dispatch(openEditModal(item)),
    deleteUser: (item) => dispatch(deleteUser(item)),
    openViewModal: (data) => dispatch(openViewModal(data)),
  };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect)(Users);
