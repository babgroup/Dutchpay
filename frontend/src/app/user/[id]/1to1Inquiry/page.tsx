import InquiryForm from "./components/InquiryForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function InquiryPage() {
    return (
        <div className="h-full">
            <InquiryForm />
            <ToastContainer position="top-center" theme="colored" />
        </div>
    )
}