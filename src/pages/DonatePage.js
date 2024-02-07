import Layout from "components/layout/Layout";
import React, { useState } from "react";
import ModalImage from "react-modal-image";

const DonatePage = () => {
  const menuDonate = [
    {
      stk: "6358909092006",
      nameBank: "Mb Bank",
      qr: "https://firebasestorage.googleapis.com/v0/b/react-monkey-bogging.appspot.com/o/qrmb.jpg?alt=media&token=ffa87fd5-ceb0-4b89-b61c-96ec2a8e1005",
    },
    {
      stk: "1035772738",
      nameBank: "Vietcombank",
      qr: "https://firebasestorage.googleapis.com/v0/b/react-monkey-bogging.appspot.com/o/qr.jpg?alt=media&token=7c3d2216-e469-42ab-8bcd-05c3f89f01a7",
    },
    {
      stk: "0335010817",
      nameBank: "Momo",
      qr: "https://firebasestorage.googleapis.com/v0/b/react-monkey-bogging.appspot.com/o/qrmomo.jpg?alt=media&token=37b371ac-37ca-464f-b83e-5336d121208a",
    },
  ];
  const [linkQr, setLinkQr] = useState("");
  const [showQr, setShowQr] = useState(false);
  const handleImageClick = (event) => {
    event.stopPropagation();
  };
  return (
    <Layout>
      <div className="container">
        <div
          className={`fixed top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.1)] z-10 ${
            showQr ? "" : "hidden"
          }`}
          onClick={() => setShowQr(false)} // Ẩn QR khi click vào phần mờ bên ngoài
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-slate-200 rounded-md p-3" onClick={handleImageClick} >
          <span className="block mb-5 font-semibold text-2xl text-orange-500">
            Qr nhận tiền
          </span>
            <img src={linkQr} alt="qr code" className="object-cover"/>
            <button className="py-2 px-3 rounded-lg bg-green-500 text-white font-semibold block mx-auto mt-5" onClick={() => setShowQr(false)}>
                Đóng
            </button>
          </div>
        </div>
        <h3 className="text-3xl font-semibold mb-10">Ủng hộ</h3>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  STK
                </th>
                <th scope="col" className="px-6 py-3">
                  Ngân hàng
                </th>
                <th scope="col" className="px-6 py-3">
                  Qr
                </th>
              </tr>
            </thead>
            <tbody>
              {menuDonate.map((item, index) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={index}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.stk}
                  </th>
                  <td className="px-6 py-4">{item.nameBank}</td>
                  <td
                    className="px-6 py-4 text-blue-500"
                    onClick={() => {
                      setLinkQr(item.qr);
                      setShowQr(true);
                    }}
                  >
                    Lấy qr
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default DonatePage;
