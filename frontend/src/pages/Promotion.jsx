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
  const shareUrl = `${API_URL}/product-detail/${props.productData.id}`
  const title = "Your product is inside this link :"
  const [copySuccess, setCopySuccess] = useState(false)

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
        <EmailShareButton subject={title} className="mr-4">
          <EmailIcon iconFillColor="white" round={true} size={50} />
        </EmailShareButton>
        <FacebookShareButton quote={title} className="mr-4">
          <FacebookIcon iconFillColor="white" round={true} size={50} />
        </FacebookShareButton>
        <TwitterShareButton title={title} className="mr-4">
          <TwitterIcon iconFillColor="white" round={true} size={50} />
        </TwitterShareButton>
        <WhatsappShareButton title={title} className="mr-4">
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
