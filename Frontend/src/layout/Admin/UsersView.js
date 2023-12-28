//imports
import React, { useEffect, useState } from "react";

//material-ui
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TablePagination,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";

//toastify
import { ToastContainer, toast } from "react-toastify";

//axios
import axios from "axios";

function UsersView() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [showToast, setShowToast] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState({});
  const [userBanned, setUserBanned] = useState(false);
  const [usersData, setUsersData] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    getUsersData();
  }, []);

  const getUsersData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/admin/getEveryAd"
      );

      if (response.status === 200) {
        const users = response.data.users;
        setUsersData(users);
      } else {
        toast.error("Failed to load users: " + response.data.message);
      }
    } catch (error) {
      console.error("Loading users error: " + error);
      toast.error("Failed to load users: " + error.toString());
    }
  };
  const handleBanUser = async (userId) => {
    setLoadingUsers({ ...loadingUsers, [userId]: true });

    try {
      const response = await axios.post(
        "http://localhost:8080/admin/BanUser",
        {
          userId: userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setUserBanned(true);
        setTimeout(() => {
          setLoadingUsers({ ...loadingUsers, [userId]: false });
          toast.success("User Banned Successfully");

          getUsersData();
        }, 2000);
      } else {
        toast.error("Failed to Ban User: " + response.data.message);
      }
    } catch (error) {
      console.error("Banning error: " + error);
      toast.error("Failed to Ban User: " + error.toString());
    }
  };

  const handleUnBanUser = async (userId) => {
    setLoadingUsers({ ...loadingUsers, [userId]: true });

    try {
      const response = await axios.post(
        "http://localhost:8080/admin/UnBanUser",
        {
          userId: userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setUserBanned(true);
        setTimeout(() => {
          setLoadingUsers({ ...loadingUsers, [userId]: false });
          toast.success("User UnBanned Successfully");

          getUsersData();
        }, 2000);
      } else {
        toast.error("Failed to UnBan User: " + response.data.message);
      }
    } catch (error) {
      console.error("Banning error: " + error);
      toast.error("Failed to UnBan User: " + error.toString());
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          minHeight: "80vh",
          width: "114%",
        }}
      >
        <div
          style={{
            marginTop: "6em",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "100%",
            padding: "0em 2em",
          }}
        >
          <ToastContainer />
          <TableContainer
            component={Paper}
            style={{ minWidth: "70em", background: "#F2F3F3", padding: "10px" }}
          >
            <Table style={{ width: "100%" }}>
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{
                      fontWeight: "bold",
                      fontSize: "1.3em",
                      borderRight: "1px solid #ddd",
                    }}
                  >
                    ID
                  </TableCell>
                  <TableCell
                    style={{
                      fontWeight: "bold",
                      fontSize: "1.3em",
                      borderRight: "1px solid #ddd",
                    }}
                  >
                    Name
                  </TableCell>
                  <TableCell
                    style={{
                      fontWeight: "bold",
                      fontSize: "1.3em",
                      borderRight: "1px solid #ddd",
                    }}
                  >
                    Email
                  </TableCell>
                  <TableCell
                    style={{
                      fontWeight: "bold",
                      fontSize: "1.3em",
                      borderRight: "1px solid #ddd",
                    }}
                  >
                    City
                  </TableCell>
                  <TableCell
                    style={{
                      fontWeight: "bold",
                      fontSize: "1.3em",
                      borderRight: "1px solid #ddd",
                    }}
                  >
                    Phone Number
                  </TableCell>
                  <TableCell
                    style={{
                      fontWeight: "bold",
                      fontSize: "1.3em",
                      borderRight: "1px solid #ddd",
                    }}
                  >
                    Created On
                  </TableCell>
                  <TableCell
                    style={{
                      fontWeight: "bold",
                      fontSize: "1.3em",
                    }}
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {usersData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user, index) => {
                    const registrationDate = new Date(user.createdAt);
                    const formattedDate = registrationDate.toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    );
                    const id = index + 1 + page * rowsPerPage;
                    return (
                      <TableRow key={user._id}>
                        <TableCell
                          style={{
                            fontSize: "1em",
                            borderRight: "1px solid #ddd",
                          }}
                        >
                          {id}
                        </TableCell>
                        <TableCell
                          style={{
                            fontSize: "1em",
                            borderRight: "1px solid #ddd",
                          }}
                        >
                          {user.name}
                        </TableCell>
                        <TableCell
                          style={{
                            fontSize: "1em",
                            borderRight: "1px solid #ddd",
                          }}
                        >
                          {user.email}
                        </TableCell>
                        <TableCell
                          style={{
                            fontSize: "1em",
                            borderRight: "1px solid #ddd",
                          }}
                        >
                          {user.city ? user.city : "Not Provided"}
                        </TableCell>

                        <TableCell
                          style={{
                            fontSize: "1em",
                            borderRight: "1px solid #ddd",
                          }}
                        >
                          {user.phoneNumber ? user.phoneNumber : "Not Provided"}
                        </TableCell>
                        <TableCell
                          style={{
                            fontSize: "1em",
                            borderRight: "1px solid #ddd",
                          }}
                        >
                          {formattedDate}
                        </TableCell>
                        <TableCell>
                          {loadingUsers[user._id] ? (
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <CircularProgress size={24} />
                            </div>
                          ) : user.isBanned ? (
                            <Button
                              variant="outlined"
                              color="primary"
                              style={{
                                margin: "1em",
                              }}
                              onClick={() => handleUnBanUser(user._id)}
                            >
                              Unban User
                            </Button>
                          ) : (
                            <Button
                              variant="outlined"
                              color="primary"
                              style={{
                                margin: "1em",
                              }}
                              onClick={() => handleBanUser(user._id)}
                            >
                              Ban User
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[4, 8, 20]}
            component="div"
            count={usersData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            style={{ marginBottom: "1em" }}
          />
        </div>
        <footer
          style={{
            position: "fixed",
            bottom: 0,
            width: "100%",
            background: "#E7232D",
            textAlign: "center",
          }}
        >
          <Typography variant="caption" color="textSecondary">
            &copy; 2023 PAKWHEELS
          </Typography>
        </footer>
      </div>
    </>
  );
}

export default UsersView;
