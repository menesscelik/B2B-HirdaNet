import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../../model/IProduct";
import requests from "../../api/request";
import { RootState } from "../../store/store";

export const fetchProducts = createAsyncThunk<IProduct[]>(
    "catalog/fetchProducts",
    async () => {
        return await requests.Catalog.list();
    }
)
export const fetchProductsForAdmin = createAsyncThunk<IProduct[]>(
    "catalog/fetchProductsForAdmin",
    async () => {
        return await requests.Catalog.listAllForAdmin();
    }
)

export const fetchProductById = createAsyncThunk<IProduct, number>(
    "catalog/fetchProductById",
    async (productId) => {
        return await requests.Catalog.details(productId);
    }
)

export const createProduct = createAsyncThunk<IProduct, any>(
    "catalog/createProduct",
    async (product) => {
        return await requests.Catalog.create(product);
    }
)

export const updateProduct = createAsyncThunk<IProduct, { id: number, product: any }>(
    "catalog/updateProduct",
    async ({ id, product }) => {
        return await requests.Catalog.update(id, product);
    }
)

export const deleteProduct = createAsyncThunk<number, number>(
    "catalog/deleteProduct",
    async (id) => {
        await requests.Catalog.delete(id);
        return id;
    }
)

const productsAdapter = createEntityAdapter<IProduct>();

const initialState = productsAdapter.getInitialState({
    status: "idle",
    isLoaded: false
});

export const catalogSlice = createSlice({
    name: "catalog",
    initialState,
    reducers: {},
    extraReducers: (builder => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.status = "pendingFetchProducts";
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            productsAdapter.setAll(state, action.payload);
            state.isLoaded = true;
            state.status = "idle";
        });
        builder.addCase(fetchProductsForAdmin.pending, (state) => {
            state.status = "pendingFetchProductsForAdmin";
        });
        builder.addCase(fetchProductsForAdmin.fulfilled, (state, action) => {
            productsAdapter.setAll(state, action.payload);
            state.isLoaded = true;
            state.status = "idle";
        });
        builder.addCase(fetchProductsForAdmin.rejected, (state) => {
            state.status = "idle";
        });
        builder.addCase(fetchProducts.rejected, (state) => {
            state.status = "idle";
        });
        builder.addCase(fetchProductById.pending, (state) => {
            state.status = "pendingFetchProductById";
        });
        builder.addCase(fetchProductById.fulfilled, (state, action) => {
            productsAdapter.upsertOne(state, action.payload);
            state.status = "idle";
        });
        builder.addCase(fetchProductById.rejected, (state) => {
            state.status = "idle";
        });
        builder.addCase(createProduct.fulfilled, (state, action) => {
            productsAdapter.addOne(state, action.payload);
        });
        builder.addCase(updateProduct.fulfilled, (state, action) => {
            productsAdapter.upsertOne(state, action.payload);
        });
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            productsAdapter.removeOne(state, action.payload);
        });
    })
})

export const {
    selectById: selectProductById,
    selectIds: selectProductIds,
    selectEntities: selectProductEntities,
    selectAll: selectAllProducts,
    selectTotal: selectTotalProducts
} = productsAdapter.getSelectors((state: RootState) => state.catalog);