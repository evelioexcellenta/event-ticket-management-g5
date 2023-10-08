import {
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
  WhatsappShareButton,
} from "react-share"
import { EmailIcon, FacebookIcon, TwitterIcon, WhatsappIcon } from "react-share"
import { API_URL } from "../constants/API"
import React, { useState } from "react"

export const ShareButtons = (props) => {
  const productId = props.productData.id
  const shareUrl = `${API_URL}/product-detail/${productId}`
  // const shareUrl = `${API_URL}/product-detail/${productId}`
  const title = "Your product is inside this link :"
  const [copySuccess, setCopySuccess] = useState(false)

  console.log(props.productData.id)
  console.log(props.productData.productName)

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 1500)
    } catch (error) {
      console.error("Failed to copy: ", error)
      setCopySuccess(false)
    }
  }
  return (
    <div>
      <span className="flex overflow-x-auto my-4">
        <EmailShareButton subject={title} className="mr-4" url={shareUrl}>
          <EmailIcon iconFillColor="white" round={true} size={50} />
        </EmailShareButton>
        <TwitterShareButton title={title} className="mr-4" url={shareUrl}>
          <TwitterIcon iconFillColor="white" round={true} size={50} />
        </TwitterShareButton>
        <WhatsappShareButton title={title} className="mr-4" url={shareUrl}>
          <WhatsappIcon iconFillColor="white" round={true} size={50} />
        </WhatsappShareButton>
      </span>
      <span className="flex justify-between items-center p-2 bg-slate-100 rounded-xl">
        <p className="mx-2">{shareUrl}</p>
        <button
          className="bg-blue-300 rounded-3xl py-2 px-4 font-medium"
          onClick={handleCopyClick}
        >
          {copySuccess ? "Copied!" : "Copy"}
        </button>
      </span>
    </div>
  )
}
