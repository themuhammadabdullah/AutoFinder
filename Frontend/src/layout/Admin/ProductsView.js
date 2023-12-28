//imports
import React, { useEffect, useState } from "react";

//material-ui
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Avatar,
  Button,
  Pagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Tab,
  Tabs,
} from "@mui/material";

//toastify
import { ToastContainer, toast } from "react-toastify";

//axios
import axios from "axios";

function ProductsView() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(3);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [editedProductName, setEditedProductName] = useState("");
  const [editedProductPrice, setEditedProductPrice] = useState("");
  const [editedProductQuantity, setEditedProductQuantity] = useState("");
  const [editedProductDescription, setEditedProductDescription] = useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [productToDeleteId, setProductToDeleteId] = useState("");
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    getAllCategories();
    getAllProducts();
  }, []);

  const getAllCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/admin/getCategory"
      );

      if (response.status === 200) {
        const categoriesData = response.data.categories;
        setCategories(categoriesData);
      } else {
        toast.error("Failed to load categories: " + response.data.message);
      }
    } catch (error) {
      console.error("Loading categories error: " + error);
      toast.error("Failed to load categories: " + error.toString());
    }
  };

  const getAllProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/admin/getProducts"
      );

      if (response.status === 200) {
        const productsData = response.data.products;
        setProducts(productsData);
      } else {
        toast.error("Failed to load products: " + response.data.message);
      }
    } catch (error) {
      console.error("Loading products error: " + error);
      toast.error("Failed to load products: " + error.toString());
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const openEditDialog = (productId) => {
    const product = products.find((p) => p._id === productId);

    if (product) {
      setSelectedProduct(product);
      setEditedProductName(product.name);
      setEditedProductPrice(product.price);
      setEditedProductQuantity(product.quantity);
      setEditedProductDescription(product.description);
      setOpenDialog(true);
    } else {
      console.error("Product not found for ID: " + productId);
    }
  };

  const openDeleteConfirmationDialog = (productId) => {
    setOpenDeleteDialog(true);
    setProductToDeleteId(productId);
  };

  const closeEditDialog = () => {
    setOpenDialog(false);
  };

  const handleSaveChanges = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/admin/editProduct",
        {
          productId: selectedProduct._id,
          name: editedProductName,
          price: editedProductPrice,
          quantity: editedProductQuantity,
          description: editedProductDescription,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Product Updated Successfully");
        getAllProducts();
      } else {
        toast.error("Failed to update product: " + response.data.message);
      }
    } catch (error) {
      console.error("Update product error: " + error);
      toast.error("Failed to update product: " + error.toString());
    }
    setOpenDialog(false);
  };

  const handleDeleteProduct = async () => {
    console.log(productToDeleteId);
    try {
      const response = await axios.post(
        "http://localhost:8080/admin/deleteProduct",
        {
          productId: productToDeleteId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Product Deleted Successfully");
        getAllProducts();
      } else {
        toast.error("Failed to delete product: " + response.data.message);
      }
    } catch (error) {
      console.error("Delete product error: " + error);
      toast.error("Failed to delete product: " + error.toString());
    }
    setOpenDeleteDialog(false);
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <div
          style={{
            padding: "1em",
            marginTop: "4em",
          }}
        >
          <Tabs
            value={activeTab}
            onChange={(event, newValue) => setActiveTab(newValue)}
            variant="scrollable"
            scrollButtons="auto"
          >
            {categories.map((category) => (
              <Tab
                key={category._id}
                style={{
                  fontSize: "1em",
                  outline: "none",
                }}
                label={category.name}
              />
            ))}
          </Tabs>

          {categories.map((category, index) => {
            const categoryProducts = products.filter(
              (product) => product.category === category._id
            );

            const startIndex = (page - 1) * rowsPerPage;
            const endIndex = startIndex + rowsPerPage;

            return activeTab === index ? (
              <div key={category._id}>
                <TableContainer
                  style={{ background: "#F2F3F3", marginTop: "1em" }}
                  component={Paper}
                >
                  <Table>
                    <ToastContainer />
                    <TableHead>
                      <TableRow>
                        <TableCell style={{ fontSize: "1em" }}>Name</TableCell>
                        <TableCell style={{ fontSize: "1em" }}>Price</TableCell>
                        <TableCell style={{ fontSize: "1em" }}>
                          Quantity
                        </TableCell>
                        <TableCell style={{ fontSize: "1em" }}>
                          Description
                        </TableCell>
                        <TableCell style={{ fontSize: "1em" }}>
                          Images
                        </TableCell>
                        <TableCell style={{ fontSize: "1em" }}>
                          Actions
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {categoryProducts
                        .slice(startIndex, endIndex)
                        .map((filteredProduct) => (
                          <TableRow key={filteredProduct._id}>
                            <TableCell>{filteredProduct.name}</TableCell>
                            <TableCell>{filteredProduct.price}</TableCell>
                            <TableCell>{filteredProduct.quantity}</TableCell>
                            <TableCell>{filteredProduct.description}</TableCell>
                            <TableCell>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                {filteredProduct.images.map(
                                  (image, imageIndex) => (
                                    <div
                                      key={imageIndex}
                                      style={{
                                        flex: "0 0 calc(35% - 5px)",
                                        marginBottom: "10px",
                                        border: "2px solid lightgrey",
                                        justifyContent: "center",
                                        textAlign: "center",
                                        padding: "5px",
                                        borderRadius: "5px",
                                        margin: "3px",
                                      }}
                                    >
                                      <img
                                        src={`http://localhost:8080/${image}`}
                                        alt={`Car Image ${imageIndex + 1}`}
                                        style={{
                                          width: "100%",
                                          maxHeight: "200px",
                                        }}
                                      />
                                    </div>
                                  )
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Button
                                style={{ margin: "1em" }}
                                variant="contained"
                                onClick={() =>
                                  openEditDialog(filteredProduct._id)
                                }
                              >
                                Edit
                              </Button>
                              <Button
                                variant="outlined"
                                onClick={() =>
                                  openDeleteConfirmationDialog(
                                    filteredProduct._id
                                  )
                                }
                              >
                                Delete
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Pagination
                  count={Math.ceil(categoryProducts.length / rowsPerPage)}
                  page={page}
                  onChange={handlePageChange}
                  variant="outlined"
                  shape="rounded"
                  size="large"
                  style={{ marginTop: "1em" }}
                />
              </div>
            ) : null;
          })}
        </div>
      </Grid>
      <Dialog
        open={openDialog}
        onClose={closeEditDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Product</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Edit the product details and click Save.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            fullWidth
            value={editedProductName}
            onChange={(e) => setEditedProductName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="price"
            label="Price"
            fullWidth
            value={editedProductPrice}
            onChange={(e) => setEditedProductPrice(e.target.value)}
          />
          <TextField
            margin="dense"
            id="quantity"
            label="Quantity"
            fullWidth
            value={editedProductQuantity}
            onChange={(e) => setEditedProductQuantity(e.target.value)}
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={editedProductDescription}
            onChange={(e) => setEditedProductDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveChanges} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Delete Product</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this product?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
            No
          </Button>
          <Button onClick={handleDeleteProduct} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default ProductsView;
