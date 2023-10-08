import React, { useState } from "react"
import "../assets/styles/ProductCard.css"
// import { Link } from "react-router-dom"
import { connect } from "react-redux"
import Axios from "axios"
import { API_URL } from "../constants/API"
import { getCartData } from "../redux/actions/cart"
import { ShareButtons } from "../pages/Promotion"
import share from "../assets/share.png"

function ProductCard(props) {
  const addToCartHandler = () => {
    // Check apakah user sudah memiliki barang tsb di cart
    Axios.get(`${API_URL}/carts/get`, {
      params: {
        userId: props.userGlobal.id,
        productId: props.productData.id,
      },
    }).then((result) => {
      // if (result.data.length) {
      //     Axios.patch(`${API_URL}/carts/edit-carts/${result.data[0].id}`, {
      //         quantity: result.data[0].quantity + 1
      //     })
      //     .then(() => {
      //         alert("Berhasil menambahkan barang");
      //         props.getCartData(props.userGlobal.id)
      //     })
      //     .catch(() => {
      //         alert("Terjadi kesalahan di server");
      //     })
      // } else {
      Axios.post(`${API_URL}/carts/add-carts`, {
        userId: props.userGlobal.id,
        productId: props.productData.id,
        price: props.productData.price,
        productName: props.productData.productName,
        productImage: props.productData.productImage,
        quantity: 1,
      })
        .then(() => {
          alert("Berhasil menambahkan barang")
          props.getCartData(props.userGlobal.id)
        })
        .catch(() => {
          alert("Terjadi kesalahan di server")
        })
      // };
    })
  }

  return (
    <div>
      <div className="card product-card">
        <img src={props.productData.productImage} alt="" />
        <div className="mt-1">
          <div>
            <Link to={`/product-detail/${props.productData.id}`}>
              <h4>{props.productData.productName}</h4>
            </Link>
            <span className="text-muted">Rp. {props.productData.price}</span>
          </div>
          <div className="d-flex flex-row justify-center align-items-center">
            <div className="col ">
              <button
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#modal"
              >
                <img
                  src={share}
                  alt="share button"
                  width={"50px"}
                  height={"50px"}
                />
              </button>
            </div>
            <div className="col ">
              <button
                onClick={addToCartHandler}
                className="btn btn-primary mt-2"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      {
        <div class="modal" tabindex="-1" id="modal">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h3 className="text-xl font-semibold text-black">
                  Share Event :{" "}
                </h3>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <ShareButtons />
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    userGlobal: state.user,
  }
}

const mapDispatchToProps = {
  getCartData,
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard)
